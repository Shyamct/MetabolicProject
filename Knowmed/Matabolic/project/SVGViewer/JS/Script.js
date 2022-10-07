import { repeat } from "angular-ui-bootstrap";

$(document).ready(function () {

    $('#txtSearch').focus();

    // Check for searched text is changed, if yes then reload.
    $('#txtSearch').keyup(function () {
        if (!isEmpty(searchedText) && $('#txtSearch').val().toLowerCase().trim() !== searchedText) {
            location.reload(true);
        }
    });

    $('#txtSearch').change(function () {
        if (!isEmpty($('#txtSearch').val())) {
            searchedText = $('#txtSearch').val().toLowerCase().trim();
            searchText();
        }
    });

    $('#txtSearchFood').change(function () {
        if (!isEmpty($('#txtSearchFood').val())) {
            searchedFoodText = $('#txtSearchFood').val().toLowerCase().trim();
            funSearchedFood();
        }
    });
       
    // Initialize default color.
    localStorage.setItem("arrowColor", $('#colorPicker').val());
    $('#colorPicker').change(function () {
        localStorage.setItem("arrowColor", $('#colorPicker').val());
    });
    
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);

        $("#toggleIcon").toggleClass("fa fa-angle-double-down fa fa-angle-double-up")
        $("#wrapper").toggleClass("toggled");

        if (isIE11) {
            if ($("#wrapper").hasClass("toggled")) {
                $('#sidebar-wrapper').css("margin-left", "-268px")
            } else {
                $('#sidebar-wrapper').css("margin-left", "-250px")
            }
        }
    });
        
    getMarkerRelation();

});

function funSearchedFood() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var foodName = $('#txtSearchFood').val();
    //console.log(fooddName); 
    //console.log($('#txtSearchFood')); 
    $.ajax({
        type: "POST",
        url: "../WebService/SVGWebService.asmx/getSubSection",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayId': '" + Number(pathwayId) + "','foodName': '" + foodName + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;

            console.log(r.Table); 
            console.log(r.Table1); 

            if (_svgText && _svgText.length > 0) {
                $.each(_svgText, function (i) {

                    var textTag = this;
                    if (r.Table1.some(data => data.nutrientName.toLowerCase().trim() == textTag.textContent.toLowerCase().trim())) {

                        var svgObjectFirstParent = this.parentNode;
                        var svgObjectSecondParent = this.parentNode.parentNode;
                        var svgObjectThirdParent = this.parentNode.parentNode.parentNode;

                        manipulateObject(svgObjectFirstParent, '');
                        manipulateObject(svgObjectSecondParent, '');
                        manipulateObject(svgObjectThirdParent, '');
                    }
                });
            }

            searchNext();
        },
        error: function (error) {

        }
    });
}

function sectionSubSectionChange() {
    if (!isEmpty(searchedText)) {
        location.reload(true);
    }
}

// Relation for getting start and end point for the node searched.
function getMarkerRelation() {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var sectionId = $("#ddlSection option:selected").val();
    var subSectionId = $("#ddlSubSection option:selected").val();
    $.ajax({
        type: "POST",
        url: "../WebService/SVGWebService.asmx/getMarkerRelation",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayId': '" + Number(pathwayId) + "','sectionId': '" + Number(sectionId) + "','subSectionId': '" + Number(subSectionId) + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;

            relation = r.Table;  // List of markers along with start point and end point.
            markerGroupList = r.Table3;

            $("#ddlSection option:not(:first)").remove();
            if (r.Table1 && r.Table1.length > 0) {
                $.each(r.Table1, function () {
                    $("#ddlSection").append('<option value="' + this.id + '">' + this.sectionName + '</option>');
                });
            }
            $("#ddlSection").val(sectionId);

            $("#ddlSubSection option:not(:first)").remove();
            if (r.Table2 && r.Table2.length > 0) {
                $.each(r.Table2, function () {
                    $("#ddlSubSection").append('<option value="' + this.id + '">' + this.subSectionName + '</option>');
                });
            }
            $("#ddlSubSection").val(subSectionId);

            var foodAutoCompleteList = [];
            $.each(r.Table3, function () {
                foodAutoCompleteList.push({
                    label: this.foodName,
                    value: this.foodName
                });
            });

            $('#txtSearchFood').autocomplete({
                source: foodAutoCompleteList
            });
        },
        error: function (error) {

        }
    });
}

// Marker detail report.
function getMarkerReport() {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "../WebService/SVGWebService.asmx/getMarkerReport",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'markerName': '" + searchedText + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;

            var row = $("#tblMarkerReport thead tr:first").clone();
            $("#tblMarkerReport tbody tr").remove();
            $.each(r.Table, function () {
                $('.td_Section', row).text(this.sectionName);
                $('.td_SubSection', row).text(this.subSectionName);
                $('.td_Count', row).text(this.itemCount);
                $("#tblMarkerReport tbody").append(row);
                row = $("#tblMarkerReport thead tr:first").clone();
            });
            $('#modalMarker').modal('show');

        },
        error: function (error) {

        }
    });
}

// Start Text Searching.
function searchText() {

    if (isEmpty(searchedText)) {
        alert("Please enter any text to search !!");
        return;
    }

    var groupSubGroupList = []; // List to store all groups based on Section or SubSection.

    if ($("#ddlSubSection option:selected").val() > 0) {
        var subSectionGroupId = subSectionPrefix + $("#ddlSubSection option:selected").text().trim().replace(' ', '');

        $.each(_svgGroup, function (i) {

            if ($(this).attr('id') && $(this).attr('id').toLowerCase().trim().startsWith(subSectionGroupId.toLowerCase())) {

                if (!groupSubGroupList.some(data => data.gTag === this)) {
                    groupSubGroupList.push({
                        gTag: this,
                    });
                }
            }
        });
    }
    else if ($("#ddlSubSection option:selected").val() == 0 && $("#ddlSection option:selected").val() > 0) {
        var sectionGroupId = sectionPrefix + $("#ddlSection option:selected").text().trim().replace(' ', '');

        $.each(_svgGroup, function (i) {

            if ($(this).attr('id') && $(this).attr('id').toLowerCase().startsWith(sectionGroupId.toLowerCase())) {

                if (!groupSubGroupList.some(data => data.gTag === this)) {
                    groupSubGroupList.push({
                        gTag: this,
                    });
                }
            }
        });
    }

    if ($("#ddlSection option:selected").val() > 0 || $("#ddlSubSection option:selected").val() > 0) {
        if (groupSubGroupList && groupSubGroupList.length > 0) {
            $.each(groupSubGroupList, function (i) {

                filterObjectToHighlight(this.gTag);
            });
        }

        var commonElementList = [];
        $.each(_svgPath, function (i) {

            if ($(this).attr('id') && $(this).attr('id').toLowerCase().startsWith(commonMarkerPrefix.toLowerCase())) {

                if (!commonElementList.some(data => data.gTag === this)) {
                    commonElementList.push({
                        gTag: this.parentNode.parentNode,
                    });
                }
            }
        });
        $.each(_svgRect, function (i) {

            if ($(this).attr('id') && $(this).attr('id').toLowerCase().startsWith(commonMarkerPrefix.toLowerCase())) {

                if (!commonElementList.some(data => data.gTag === this)) {
                    commonElementList.push({
                        gTag: this.parentNode.parentNode,
                    });
                }
            }
        });
        $.each(_svgPolygon, function (i) {

            if ($(this).attr('id') && $(this).attr('id').toLowerCase().startsWith(commonMarkerPrefix.toLowerCase())) {

                if (!commonElementList.some(data => data.gTag === this)) {
                    commonElementList.push({
                        gTag: this.parentNode.parentNode,
                    });
                }
            }
        });

        if (commonElementList && commonElementList.length > 0) {
            $.each(commonElementList, function (i) {

                filterObjectToHighlight(this.gTag);
            });
        }

    }
    else {
        filterObjectToHighlight(_svgObject);
    }

    searchNext();
}

function filterObjectToHighlight(object) {

    //var textTags = object.querySelectorAll(svgTextTag); _svgText

    var startList = [];
    var endList = [];
    if (relation && relation.length > 0) {
        $.each(relation, function (i) {

            var markerList = JSON.parse(this.markerList);
            if (markerList.some(data => data.markerName.toLowerCase().trim().indexOf(searchedText) !== -1)) {

                if (!startList.some(data => data.start.toLowerCase() === this.startPoint.toLowerCase())) {
                    startList.push({
                        start: this.startPoint
                    });
                }
                if (!endList.some(data => data.end.toLowerCase() === this.endPoint.toLowerCase())) {
                    endList.push({
                        end: this.endPoint
                    });
                }
            }
        });
    }

    if (_svgText && _svgText.length > 0) {
        $.each(_svgText, function (i) {

            var textTag = this;
            if (textTag.textContent.toLowerCase().trim().indexOf(searchedText) !== -1) {

                var svgObjectFirstParent = this.parentNode;
                var svgObjectSecondParent = this.parentNode.parentNode;
                var svgObjectThirdParent = this.parentNode.parentNode.parentNode;

                manipulateObject(svgObjectFirstParent, '');
                manipulateObject(svgObjectSecondParent, '');
                manipulateObject(svgObjectThirdParent, '');
            }

            // To Highlight Start Points.
            if (startList && startList.length > 0) {
                $.each(startList, function (i) {

                    if (textTag.textContent.toLowerCase().trim() === this.start.toLowerCase().trim()) {
                        var firstStartParent = textTag.parentNode;
                        var secondStartParent = textTag.parentNode.parentNode;
                        var thirdStartParent = textTag.parentNode.parentNode.parentNode;

                        manipulateObject(firstStartParent, startFlag);
                        manipulateObject(secondStartParent, startFlag);
                        manipulateObject(thirdStartParent, startFlag);
                    }
                });
            }

            // To Highlight End Points.
            if (endList && endList.length > 0) {
                $.each(endList, function (i) {

                    if (textTag.textContent.toLowerCase().trim() === this.end.toLowerCase().trim()) {
                        var firstEndParent = textTag.parentNode;
                        var secondEndParent = textTag.parentNode.parentNode;
                        var thirdEndParent = textTag.parentNode.parentNode.parentNode;

                        manipulateObject(firstEndParent, endFlag);
                        manipulateObject(secondEndParent, endFlag);
                        manipulateObject(thirdEndParent, endFlag);
                    }
                });
            }
        });
    }
}

function manipulateObject(svgObject, flag) {

    if (!isEmpty(svgObject) && svgObject.nodeName !== svgDocument && $(svgObject).attr('id') && svgObject.id !== firstLayer && svgObject.id.substr(0, 4) === groupPrefix) {

        var path = svgObject.querySelector(svgPathTag);
        var rect = svgObject.querySelector(svgRectTag);
        var polygon = svgObject.querySelector(svgPolygonTag);

        var role = '';
        var isCountable = false;
        var isTextColorChange = false;

        checkElementToHighlight(path);
        checkElementToHighlight(rect);
        checkElementToHighlight(polygon);

        function checkElementToHighlight(element) {

            if (!isEmpty(element) && $(element).attr('id')) {
                if ($(element).has('animate').length === 0) {
                    if (flag === startFlag) {

                        if ($(element).attr('id').startsWith(commonStartPrefix)) {

                            if ($("#ddlSubSection option:selected").val() > 0) {
                                var subSection = $("#ddlSubSection option:selected").text().trim();

                                $.each(relation, function (i) {
                                    if (this.subSectionName.toLowerCase().trim() == subSection.toLowerCase().trim()) {

                                        var markerList = JSON.parse(this.markerList);
                                        if (markerList.some(data => data.markerName.toLowerCase().trim().indexOf(searchedText) !== -1)) {

                                            role = this.startRole == 'H' ? harmfulPrefix : this.startRole == 'B' ? beneficialPrefix : '';

                                            return false;
                                        }
                                    }
                                });
                            }

                            animateElement(element, role);
                            isTextColorChange = true;
                        }
                        else {
                            if (element.id.substr(0, 4) === startPrefix) {
                                role = element.id.substr(4, 4);
                                animateElement(element, role);
                                isTextColorChange = true;
                            }
                        }
                    }
                    else if (flag === endFlag) {

                        if ($(element).attr('id').startsWith(commonEndPrefix)) {

                            if ($("#ddlSubSection option:selected").val() > 0) {
                                var subSection = $("#ddlSubSection option:selected").text().trim();

                                $.each(relation, function (i) {
                                    if (this.subSectionName.toLowerCase().trim() == subSection.toLowerCase().trim()) {

                                        var markerList = JSON.parse(this.markerList);
                                        if (markerList.some(data => data.markerName.toLowerCase().trim().indexOf(searchedText) !== -1)) {

                                            role = this.endRole == 'H' ? harmfulPrefix : this.endRole == 'B' ? beneficialPrefix : '';

                                            return false;
                                        }
                                    }
                                });
                            }

                            animateElement(element, role);
                            isTextColorChange = true;
                        }
                        else {

                            if (element.id.substr(0, 4) === endPrefix) {
                                role = element.id.substr(4, 4);
                                animateElement(element, role);
                                isTextColorChange = true;
                            }
                        }
                    }
                    else {
                        if ($(element).attr('id').startsWith(commonMarkerPrefix)) {

                            if ($("#ddlSubSection option:selected").val() > 0) {
                                var subSection = $("#ddlSubSection option:selected").text().trim();

                                $.each(relation, function (i) {
                                    if (this.subSectionName.toLowerCase().trim() == subSection.toLowerCase().trim()) {

                                        var markerList = JSON.parse(this.markerList);
                                        if (markerList.some(data => data.markerName.toLowerCase().trim().indexOf(searchedText) !== -1)) {

                                            $.each(markerList, function (i) {
                                                if (this.markerName.toLowerCase().trim().indexOf(searchedText) !== -1) {
                                                    role = this.role == 'H' ? harmfulPrefix : this.role == 'B' ? beneficialPrefix : '';

                                                    return false;
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                        else if ($(element).attr('id').startsWith(commonStartPrefix)) {

                            if ($("#ddlSubSection option:selected").val() > 0) {
                                var subSection = $("#ddlSubSection option:selected").text().trim();

                                $.each(relation, function (i) {
                                    if (this.subSectionName.toLowerCase().trim() == subSection.toLowerCase().trim()) {

                                        if (this.startPoint.toLowerCase().trim().indexOf(searchedText) !== -1) {
                                            role = this.startRole == 'H' ? harmfulPrefix : this.startRole == 'B' ? beneficialPrefix : '';

                                            return false;
                                        }
                                    }
                                });
                            }
                        }
                        else if ($(element).attr('id').startsWith(commonEndPrefix)) {

                            if ($("#ddlSubSection option:selected").val() > 0) {
                                var subSection = $("#ddlSubSection option:selected").text().trim();

                                $.each(relation, function (i) {
                                    if (this.subSectionName.toLowerCase().trim() == subSection.toLowerCase().trim()) {

                                        if (this.endPoint.toLowerCase().trim().indexOf(searchedText) !== -1) {
                                            role = this.endRole == 'H' ? harmfulPrefix : this.endRole == 'B' ? beneficialPrefix : '';

                                            return false;
                                        }
                                    }
                                });
                            }
                        }
                        else {
                            role = (element.id.substr(0, 4) == startPrefix || element.id.substr(0, 4) == endPrefix) ? element.id.substr(4, 4) : element.id.substr(0, 4);
                        }

                        animateElement(element, role);
                        isCountable = true;
                        isTextColorChange = true;
                    }
                }
            }
        }

        if (isCountable) {
            textCount++;
            gTagArray.push(svgObject);
        }
        if (isTextColorChange) {
            $(svgObject.querySelectorAll(svgTextTag)).css("fill", "white");
        }
    }
}

// Start Highlight Block.
function animateElement(element, role) {

    var animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animate.setAttribute("attributeType", "XML");
    animate.setAttribute("attributeName", "fill");
    if (role === harmfulPrefix) {
        animate.setAttribute("values", harmfulColor);
    }
    else if (role === beneficialPrefix) {
        animate.setAttribute("values", beneficialColor);
    }
    else {
        animate.setAttribute("values", defaultColor);
    }
    animate.setAttribute("dur", "0.9s");
    animate.setAttribute("repeatCount", "indefinite");

    element.appendChild(animate);
}

// Hightlight next element with different color. 
function searchNext() {
  
    currentIndex++;
    if (currentIndex === gTagArray.length) {

        if ($(gTagArray[currentIndex - 1]).has("animate").length > 0) {
            $(gTagArray[currentIndex - 1].querySelectorAll("animate")).attr("values", previousColor);
        }
        currentIndex = 0;
    }
    if (gTagArray && gTagArray.length > 0) {
        gTagArray[currentIndex].scrollIntoView(false);

        if (currentIndex > 0) {
            if ($(gTagArray[currentIndex - 1]).has("animate").length > 0) {
                $(gTagArray[currentIndex - 1].querySelectorAll("animate")).attr("values", currentColor);
            }
        }
        if ($(gTagArray[currentIndex]).has("animate").length > 0) {

            currentColor = gTagArray[currentIndex].querySelector("animate").getAttribute("values");
            previousColor = (currentIndex === 0) ? currentColor : gTagArray[currentIndex - 1].querySelector("animate").getAttribute("values");

            if (currentColor == harmfulColor) {
                $(gTagArray[currentIndex].querySelectorAll("animate")).attr("values", currentHarmfulColor);
            }
            else if (currentColor == beneficialColor) {
                $(gTagArray[currentIndex].querySelectorAll("animate")).attr("values", currentBeneficialColor);
            }
            else if (currentColor == defaultColor) {
                $(gTagArray[currentIndex].querySelectorAll("animate")).attr("values", currentDefaultColor);
            }
        }

        $('#divCount').show();
        $('#lblCount').html(currentIndex + 1 + '/' + textCount);
    }
}

// Document Load Function Start.
document.getElementById(mainSVGObject).addEventListener("load", function () {
    _svgObject = this.getSVGDocument();
    _svgGroup = _svgObject.querySelectorAll(svgGroupTag);
    _svgText = _svgObject.querySelectorAll(svgTextTag);
    _svgPath = _svgObject.querySelectorAll(svgPathTag);
    _svgRect = _svgObject.querySelectorAll(svgRectTag);
    _svgPolygon = _svgObject.querySelectorAll(svgPolygonTag);

    // Apply function in every arrow to highlight its path.
    if (_svgGroup && _svgGroup.length > 0) {
        $.each(_svgGroup, function (i) {

            var path = this.querySelectorAll(svgPathTag);
            if (path.length === 1) {
                $(path).css("cursor", "pointer");
                $(path).attr("onclick", "changeArrowColor(this);");
            }
        });
    }

    extractText();

    setTimeout(function () {
        $(_svgText).bind("dblclick", function () {

            let clickedAnchorTag = this.parentNode;
            let clickedResearchURL = '';
            if (clickedAnchorTag.nodeName == 'a') {
                clickedResearchURL = clickedAnchorTag.getAttribute('xlink:href');
            }

            if (clickedResearchURL != '') {
                $.each(_svgText, function (i) {
                    let anchorTag = this.parentNode;
                    let researchURL = '';
                    if (anchorTag.nodeName == 'a') {
                        researchURL = anchorTag.getAttribute('xlink:href');
                    }
                    if (clickedResearchURL == researchURL) {

                        var svgObjectFirstParent = this.parentNode;
                        var svgObjectSecondParent = this.parentNode.parentNode;
                        var svgObjectThirdParent = this.parentNode.parentNode.parentNode;

                        manipulateObject(svgObjectFirstParent, '');
                        manipulateObject(svgObjectSecondParent, '');
                        manipulateObject(svgObjectThirdParent, '');
                    }

                });
            }

        });

        // Trigger action when the contexmenu is about to be shown        
        $(_svgText).bind("contextmenu", function (event) {

            // Avoid the real one
            event.preventDefault();

            var targetText = '';
            if (event.target.tagName.toLowerCase() === 'text') {
                targetText = event.target.childNodes[0].textContent;
            }

            var arrResearchURL = [];
            $.each(_svgText, function (i) {

                if (this.textContent == targetText) {

                    let anchorTag = this.parentNode;
                    let researchURL = '';

                    if (anchorTag.nodeName == 'a') {
                        researchURL = anchorTag.getAttribute('xlink:href');

                        if (arrResearchURL.length == 0) {
                            arrResearchURL.push({
                                url: researchURL
                            });
                        }
                        else if (!arrResearchURL.some(data => data.url == researchURL)) {
                            arrResearchURL.push({
                                url: researchURL
                            });
                        }
                    }
                }
            });

            var _html = '<ul>';
            $.each(arrResearchURL, function (i) {
                _html += '<li><a href="' + this.url + '" target="_blank">' + this.url + '</a></li>';
            });
            _html += '</ul>';

            $("ul").find("[data-action]").html(_html); 
            

            // Show contextmenu
            $(".custom-menu").finish().toggle(100).

                // In the right position (the mouse)
                css({
                    top: event.pageY + "px",
                    left: event.pageX + "px"
                });
        });


        // If the document is clicked somewhere
        $(_svgObject).bind("mousedown", function (e) {

            // If the clicked element is not the menu
            if (!$(e.target).parents(".custom-menu").length > 0) {

                // Hide it
                $(".custom-menu").hide(100);
            }
        });


        // If the menu element is clicked
        //$(".custom-menu li").click(function () {

        //    // This is the triggered action name
        //    switch ($(this).attr("data-action")) {

        //        // A case for each action. Your actions here
        //        case "getMarkerDetail": getMarkerDetails(); break;
        //        case "getRDADetail": getRDADetail(); break;
        //        case "goToDiet": goToDiet(); break;
        //        case "getECGComparison": getECGComparison(); break;
        //    }

        //    // Hide it AFTER the action was triggered
        //    $(".custom-menu").hide(100);

        //    $('.modal-title').text(targetText);
        //    targetText = '';

        //});




        $(_svgObject.querySelectorAll('a')).click(function (e) {
            e.preventDefault();
        });
        

    }, 100);

});

function highlightMarkerGroup(text) {
    $.each(markerGroupList, function () {
        let markerList = JSON.parse(this.addedMarkerList);
        if (markerList.some(data => data.markerName.toLowerCase().trim() == text.toLowerCase().trim())) {

            $.each(markerList, function () {

                let markerName = this.markerName.toLowerCase().trim();

                if (_svgText && _svgText.length > 0) {
                    $.each(_svgText, function (i) {

                        var textTag = this;
                        if (textTag.textContent.toLowerCase().trim().indexOf(markerName) !== -1) {

                            var svgObjectFirstParent = this.parentNode;
                            var svgObjectSecondParent = this.parentNode.parentNode;
                            var svgObjectThirdParent = this.parentNode.parentNode.parentNode;

                            manipulateObject(svgObjectFirstParent, '');
                            manipulateObject(svgObjectSecondParent, '');
                            manipulateObject(svgObjectThirdParent, '');
                        }

                    });
                }

                //}

            });

        }
    });
}

// Code for generating autocomplete list.
var autoCompleteList = [];
function extractText() {

    if (_svgText && _svgText.length > 0) {
        $.each(_svgText, function (i) {
            var textArray;
            if (this.textContent.indexOf(',') > -1) {
                textArray = this.textContent.split(',');
            }
            if (textArray && textArray.length > 0) {
                for (var j = 0; j < textArray.length; j++) {
                    var separatedText = textArray[j].replace(":", "").replace("↑", "").replace("↓", "").trim();
                    if (!isEmpty(separatedText) && separatedText.length > 3 && !autoCompleteList.some(data => data.label.toLowerCase() === separatedText.toLowerCase())) {
                        autoCompleteList.push({
                            label: separatedText,
                            value: separatedText
                        });
                    }
                }
            }
            else {
                var textContent = this.textContent.replace(":", "").replace("↑", "").replace("↓", "").trim();
                if (!isEmpty(textContent) && textContent.length > 3 && !autoCompleteList.some(data => data.label.toLowerCase() === textContent.toLowerCase())) {
                    autoCompleteList.push({
                        label: textContent,
                        value: textContent
                    });
                }
            }
        });
    }

    $('#txtSearch').autocomplete({
        source: autoCompleteList
    });
}


// Event fire on mouse scroll. 
window.onscroll = function () { fixHeader() };

var header = document.getElementById("main-head");
var sticky = header.offsetTop;

function fixHeader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}





