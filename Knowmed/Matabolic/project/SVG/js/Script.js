$(document).ready(function () {

    txtSearch.focus();

    txtSearch.change(function () {
        stopHighlight();
        txtSearchFood.val('');
        if (!isEmpty(txtSearch.val().trim())) {
            searchedText = txtSearch.val();
            if (!markerList.some(data => compareString(data.marker, searchedText))) {
                markerList.push({
                    marker: searchedText
                });
            }
            searchText();
            searchNext();
        }
    });

    txtSearchFood.change(function () {
        stopHighlight();
        txtSearch.val('');
        if (!isEmpty(txtSearchFood.val())) {
            searchedFoodText = txtSearchFood.val();
            funSearchedFood();
        }
    });

    // Initialize default color.
    localStorage.setItem("arrowColor", colorPicker.val());
    colorPicker.change(function () {
        localStorage.setItem("arrowColor", colorPicker.val());
    });

    $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");

        if ($(this).attr('data-action') == 'study') {
            getMarkerDetails();
        }
        else if ($(this).attr('data-action') == 'glossary') {
            getMarkerGlossaryDetail();
        }
        else if ($(this).attr('data-action') == 'rda') {
            getRdaDetails();
        }
        else if ($(this).attr('data-action') == 'ecg') {
            getECGComparison();
        }
        else if ($(this).attr('data-action') == 'machine') {
            getTestMachineDetail();
        }
        else if ($(this).attr('data-action') == 'stock') {
            getItemStock();
        }

    });

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        getPatientInvestigation();
    });

    getMarkerRelation();

});

function sectionSubSectionChange() {
    //stopHighlight();
    _svgGroup = _svgObject.querySelectorAll('g');
    if (ddlSection.val() > 0) {
        var sectionId = sectionPrefix + ddlSection.find('option:selected').text().toLowerCase().trim().replaceAll(' ', '');
        $.each(_svgGroup, function () {
            var g = this;
            if (isValidSection(g) && g.id.toLowerCase().includes(sectionId)) {
                _svgGroup = g.querySelectorAll('g');
                return false;
            }
        });
    }
    searchText();
    searchNext();
}

document.getElementById('svgObject').addEventListener("load", function () {
    _svgObject = this.getSVGDocument();
    _svgGroup = _svgObject.querySelectorAll('g');
    extractText();
    addArrowEvent();

    $(_svgObject).bind("contextmenu", function (event) {

        // Avoid the real one
        event.preventDefault();

        markerName = '';
        arrResearchURL = [];
        $("li.url").remove();

        if (compareString(event.target.tagName, 'text')) {
            var parent = event.target.parentNode;
            while ((parent) && !isValidTextGroup(parent)) {
                parent = parent.parentNode;
            }
            markerName = extractGroupText(parent);
            getMarkerUrlList(markerName, parent);

            var _html = '<li class="url"><ul>';
            $.each(arrResearchURL, function (i) {
                _html += '<li><a href="' + this.url + '" target="_blank">' + this.url + '</a></li>';
            });
            _html += '</ul></li>';

            $(".custom-menu").prepend(_html);

            var y = event.pageY;
            var x = event.pageX;

            // Show contextmenu
            $(".custom-menu").finish().toggle(100).

                // In the right position (the mouse)
                css({
                    top: y + "px",
                    left: x + "px"
                });
        }

    });

    // If the document is clicked somewhere
    $(_svgObject).bind("mousedown", function (e) {

        // If the clicked element is not the menu
        if (!$(e.target).parents(".custom-menu").length > 0) {

            // Hide it
            $(".custom-menu").hide(100);
        }
        markerName = '';
    });

    $(_svgObject).bind("dblclick", function () {
        stopHighlight();
        if (compareString(event.target.tagName, 'text')) {
            var parent = event.target.parentNode;
            while ((parent) && !isValidTextGroup(parent)) {
                parent = parent.parentNode;
            }
            markerName = extractGroupText(parent);
            if (!isEmpty(markerName)) {
                highlightSameGroup(markerName, parent);
            }
            else {
                alert("Please double-click on any marker !!");
            }
        }
    });

    $(_svgObject.querySelectorAll('a')).click(function (e) {
        e.preventDefault();
    });

});

// If the menu element is clicked
$(".custom-menu li").click(function () {

    // This is the triggered action name
    switch ($(this).attr("data-action")) {

        // A case for each action. Your actions here
        case "getMarkerDetail": getMarkerDetails(); break;
        case "goToDiet": goToDiet(); break;
        case "searchKeyword": searchKeyword(); break;
    }

    // Hide it after the action was triggered
    $(".custom-menu").hide(100);

    $('.modal-title').text(' Details of - [ ' + markerName + ' ]');
});

function highlightSameGroup(marker, obj) {
    $.each(markerURLList, function () {
        //if (compareString(this.nutrientName, marker) && isGroupInSameSection(obj, this.rankName.toLowerCase().trim())) {
        if (compareString(this.nutrientName, marker)) {
            if (this.hasOwnProperty('referenceURLList')) {
                var list = JSON.parse(this.referenceURLList);
                $.each(list, function () {
                    if (!isEmpty(this.url) && !arrResearchURL.some(data => compareString(data.url, this.url))) {
                        arrResearchURL.push({
                            url: this.url
                        });
                    }
                });
            }
        }
    });
    $.each(arrResearchURL, function () {
        var markerURL = this.url;
        $.each(markerURLList, function () {
            //if (isGroupInSameSection(obj, this.rankName.toLowerCase().trim())) {
            //if (compareString(this.nutrientName, text)) {
            if (this.hasOwnProperty('referenceURLList')) {
                var list = JSON.parse(this.referenceURLList);

                if (list && list.some(data => compareString(data.url, markerURL))) {
                    var nutrient = this.nutrientName.toLowerCase();
                    if (autoCompleteList.some(data => compareString(data.label, nutrient))) {
                        markerList.push({
                            marker: nutrient
                        });
                    }
                }
            }
            //}
        });
    });
    if (!isEmptyValue(markerList)) {
        $.each(_svgGroup, function () {
            var g = this;
            if (isValidTextGroup(g)) {
                var tagText = extractGroupText(g);
                if (!isEmpty(tagText)) {
                    $.each(markerList, function () {
                        if (compareString(tagText, this.marker)) {
                            startHighlight(g);
                        }
                    });
                }
            }
        });
    }
}

function getAnchorURL(obj) {
    if (obj && compareString(obj.nodeName, 'a')) {
        return obj.getAttribute('xlink:href');
    }
    else {
        return '';
    }
}

function getMarkerUrlList(text, obj) {
    $.each(markerURLList, function () {
        //if (compareString(this.nutrientName, text) && isGroupInSameSection(obj, this.rankName.toLowerCase().trim())) {
        if (compareString(this.nutrientName, text)) {
            if (this.hasOwnProperty('referenceURLList')) {
                var list = JSON.parse(this.referenceURLList);
                $.each(list, function () {
                    if (!isEmpty(this.url) && !arrResearchURL.some(data => compareString(data.url, this.url))) {
                        arrResearchURL.push({
                            url: this.url
                        });
                    }
                });
            }
        }
    });
}

function compareString(str1, str2) {
    if (str1.toLowerCase().trim() == str2.toLowerCase().trim()) {
        return true;
    }
    else {
        return false;
    }
}

function extractGroupText(obj) {
    if (obj && $(obj).has('text')) {
        var textTag = obj.querySelectorAll('text');
        var className = $(textTag[0]).attr('class');
        var tagText = $(textTag[0]).html().trim();
        for (var i = 1; i < textTag.length; i++) {
            var nextTextTag = $(textTag[i]);
            var nextText = nextTextTag.html().trim();
            if (!isEmpty(nextText) && !tagText.includes(nextText) && nextTextTag.attr('class') == className) {
                tagText += ' ' + nextText;
            }
        }
        return tagText;
    }
    else {
        return '';
    }
}

function searchText() {
    $.each(markerList, function () {
        var marker = this.marker;
        if (relation.length > 0) {
            $.each(relation, function (i) {
                var list = JSON.parse(this.markerList);
                var section = this.sectionName.toLowerCase().trim();
                if (list.some(data => compareString(data.markerName, marker))) {
                    startList.push({
                        start: this.startPoint.toLowerCase().trim(),
                        section: section
                    });
                    endList.push({
                        end: this.endPoint.toLowerCase().trim(),
                        section: section
                    });
                }
            });
        }
    });
    $.each(_svgGroup, function () {
        var g = this;
        if (isValidTextGroup(g)) {
            var tagText = extractGroupText(g);
            if (!isEmpty(tagText)) {
                $.each(markerList, function () {
                    if (compareString(tagText, this.marker)) {
                        startHighlight(g);
                        textCount += 1;
                        gTagArray.push(g);
                    }
                });
                $.each(startList, function () {
                    if (compareString(tagText, this.start) && isGroupInSameSection(g, this.section)) {
                        startHighlight(g, this.section);
                    }
                });
                $.each(endList, function () {
                    if (compareString(tagText, this.end) && isGroupInSameSection(g, this.section)) {
                        startHighlight(g, this.section);
                    }
                });
            }
        }
    });
}

function searchNext() {
    if (currentIndex >= gTagArray.length) {
        currentIndex = 0;
    }
    currentIndex += 1;
    if (gTagArray.length > 0) {
        gTagArray[currentIndex - 1].scrollIntoView(false);

        lblCount.html(currentIndex + '/' + textCount);
    }
}

function isGroupInSameSection(obj, section) {
    var sectionId = sectionPrefix + section.replaceAll(' ', '');
    if (isValidSection(obj.parentNode) && obj.parentNode.id.toLowerCase().includes(sectionId)) {
        return true;
    }
    else {
        return false;
    }
}

function startHighlight(obj, section) {
    var rect = obj.querySelector('rect');
    var path = obj.querySelector('path');
    var polygon = obj.querySelector('polygon');

    if (section) {
        if (rect) {
            if (isStartEndPointWithRole(rect) == 'H') {
                rect.classList.add("blink-Harmful");
            }
            else if (isStartEndPointWithRole(rect) == 'B') {
                rect.classList.add("blink-Beneficial");
            }
            else if (isStartEndPointWithRole(obj) == 'H') {
                rect.classList.add("blink-Harmful");
            }
            else if (isStartEndPointWithRole(obj) == 'B') {
                rect.classList.add("blink-Beneficial");
            }
            //else if (isStartEndPointWithRole(rect) == 'NA' || isStartEndPointWithRole(obj) == 'NA') {
            else {
                rect.classList.add("blink-Common");
            }
        }
        if (path) {
            if (isStartEndPointWithRole(path) == 'H') {
                path.classList.add("blink-Harmful");
            }
            else if (isStartEndPointWithRole(path) == 'B') {
                path.classList.add("blink-Beneficial");
            }
            else if (isStartEndPointWithRole(obj) == 'H') {
                path.classList.add("blink-Harmful");
            }
            else if (isStartEndPointWithRole(obj) == 'B') {
                path.classList.add("blink-Beneficial");
            }
            //else if (isStartEndPointWithRole(path) == 'NA' || isStartEndPointWithRole(obj) == 'NA') {
            else {
                path.classList.add("blink-Common");
            }
        }
        if (polygon) {
            if (isStartEndPointWithRole(polygon) == 'H') {
                polygon.classList.add("blink-Harmful");
            }
            else if (isStartEndPointWithRole(polygon) == 'B') {
                polygon.classList.add("blink-Beneficial");
            }
            else if (isStartEndPointWithRole(obj) == 'H') {
                polygon.classList.add("blink-Harmful");
            }
            else if (isStartEndPointWithRole(obj) == 'B') {
                polygon.classList.add("blink-Beneficial");
            }
            //else if (isStartEndPointWithRole(polygon) == 'NA' || isStartEndPointWithRole(obj) == 'NA') {
            else {
                polygon.classList.add("blink-Common");
            }
        }
    } else {
        if (rect) {
            if (checkMarkerRole(rect) == 'H') {
                rect.classList.add("blink-Harmful");
            }
            else if (checkMarkerRole(rect) == 'B') {
                rect.classList.add("blink-Beneficial");
            }
            else if (checkMarkerRole(obj) == 'H') {
                rect.classList.add("blink-Harmful");
            }
            else if (checkMarkerRole(obj) == 'B') {
                rect.classList.add("blink-Beneficial");
            }
            //else if (checkMarkerRole(rect) == 'NA' || checkMarkerRole(obj) == 'NA') {
            else {
                rect.classList.add("blink-Common");
            }
        }
        if (path) {
            if (checkMarkerRole(path) == 'H') {
                path.classList.add("blink-Harmful");
            }
            else if (checkMarkerRole(path) == 'B') {
                path.classList.add("blink-Beneficial");
            }
            else if (checkMarkerRole(obj) == 'H') {
                path.classList.add("blink-Harmful");
            }
            else if (checkMarkerRole(obj) == 'B') {
                path.classList.add("blink-Beneficial");
            }
            //else if (checkMarkerRole(path) == 'NA' || checkMarkerRole(obj) == 'NA') {
            else {
                path.classList.add("blink-Common");
            }
        }
        if (polygon) {
            if (checkMarkerRole(polygon) == 'H') {
                polygon.classList.add("blink-Harmful");
            }
            else if (checkMarkerRole(polygon) == 'B') {
                polygon.classList.add("blink-Beneficial");
            }
            else if (checkMarkerRole(obj) == 'H') {
                polygon.classList.add("blink-Harmful");
            }
            else if (checkMarkerRole(obj) == 'B') {
                polygon.classList.add("blink-Beneficial");
            }
            //else if (checkMarkerRole(polygon) == 'NA' || checkMarkerRole(obj) == 'NA') {
            else {
                polygon.classList.add("blink-Common");
            }
        }
    }
}

function checkMarkerRole(obj) {
    if ($(obj).attr('id')) {
        var objId = obj.id.toLowerCase();
        if (objId.includes(harmfulPrefix)) {
            return 'H';
        }
        else if (objId.includes(beneficialPrefix)) {
            return 'B';
        }
        else {
            return 'NA';
        }
    }
    else {
        return 'NA';
    }
}

function isStartEndPointWithRole(obj) {
    if ($(obj).attr('id')) {
        var objId = obj.id.toLowerCase();
        if (objId.includes(startPrefix) || objId.includes(endPrefix)) {
            if (objId.includes(harmfulPrefix)) {
                return 'H';
            }
            else if (objId.includes(beneficialPrefix)) {
                return 'B';
            }
            else {
                return 'NA';
            }
        }
        else {
            return 'NA';
        }
    }
    else {
        return 'NA';
    }
}

function isValidTextGroup(obj) {
    if ($(obj).attr('id') && compareString(obj.id.substr(0, 4), groupPrefix)) {
        return true;
    }
    else {
        return false;
    }
}

function isValidSection(obj) {
    if ($(obj).attr('id') && compareString(obj.id.substr(0, 4), sectionPrefix)) {
        return true;
    }
    else {
        return false;
    }
}

function stopHighlight() {
    var g = _svgObject.querySelectorAll('g');
    $.each(g, function () {
        if (isValidTextGroup(this)) {
            if ($(this).has('text')) {
                var rect = this.querySelector('rect');
                var path = this.querySelector('path');
                var polygon = this.querySelector('polygon');
                if (rect) {
                    rect.classList.remove("blink-Harmful");
                    rect.classList.remove("blink-Beneficial");
                    rect.classList.remove("blink-Common");
                }
                if (path) {
                    path.classList.remove("blink-Harmful");
                    path.classList.remove("blink-Beneficial");
                    path.classList.remove("blink-Common");
                }
                if (polygon) {
                    polygon.classList.remove("blink-Harmful");
                    polygon.classList.remove("blink-Beneficial");
                    polygon.classList.remove("blink-Common");
                }
            }
        }
    });

    markerList = [];
    startList = [];
    endList = [];
    gTagArray = [];
    arrResearchURL = [];
    currentIndex = 0;
    textCount = 0;
    lblCount.html('');
}

// Code for generating autocomplete list.
function extractText() {
    $.each(_svgGroup, function () {
        var g = this;
        if (isValidTextGroup(g)) {
            var tagText = extractGroupText(g);
            if (!isEmpty(tagText) && !autoCompleteList.some(data => compareString(data.label, tagText))) {
                autoCompleteList.push({
                    label: tagText,
                    value: tagText
                });
            }
        }
    });
    txtSearch.autocomplete({
        source: autoCompleteList
    });
}

function addArrowEvent() {
    $.each(_svgGroup, function (i) {
        var path = this.querySelectorAll('path');
        if (path.length === 1) {
            $(path).css("cursor", "pointer");
            $(path).attr("onclick", "changeArrowColor(this);");
        }
    });
}

// Backend function for data

// Relation for getting start and end point for the node searched.
function getMarkerRelation() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var sectionId = ddlSection.val();
    var subSectionId = ddlSubSection.val();
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

            $("#ddlSection option:not(:first)").remove();
            if (r.Table1 && r.Table1.length > 0) {
                $.each(r.Table1, function () {
                    ddlSection.append('<option value="' + this.id + '">' + this.sectionName + '</option>');
                });
            }
            ddlSection.val(sectionId);

            $("#ddlSubSection option:not(:first)").remove();
            if (r.Table2 && r.Table2.length > 0) {
                $.each(r.Table2, function () {
                    ddlSubSection.append('<option value="' + this.id + '">' + this.subSectionName + '</option>');
                });
            }
            ddlSubSection.val(subSectionId);

            var foodAutoCompleteList = [];
            $.each(r.Table3, function () {
                foodAutoCompleteList.push({
                    label: this.foodName,
                    value: this.foodName
                });
            });

            txtSearchFood.autocomplete({
                source: foodAutoCompleteList
            });

            markerURLList = r.Table4;
        },
        error: function (error) {

        }
    });
}

function funSearchedFood() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var foodName = txtSearchFood.val();
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

            $.each(r.Table1, function (i) {
                var nutrient = this.nutrientName.toLowerCase();
                if (autoCompleteList.some(data => compareString(data.label, nutrient))) {
                    markerList.push({
                        marker: nutrient
                    });
                }
            });
            searchText();
            searchNext();
        },
        error: function (error) {

        }
    });
}

function getMarkerDetails() {

    if (isEmpty(markerName)) {
        alert("Please right-click on any marker !!");
        return;
    }
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        method: "Post",
        url: '../WebService/SVGWebService.asmx/getMarkerDetails',
        dataType: 'json',
        data: "{'pathwayId':'" + pathwayId + "','markerName':'" + markerName + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        contentType: 'application/json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d).responseValue;

            var row = $("#tblMarkerDetail thead tr:first").clone();
            $("#tblMarkerDetail tbody tr").remove();
            $.each(result.Table, function (i) {
                $('.td_SerialNo', row).text((i + 1) + '.');
                $('.td_Phenomenon', row).text(this.phenomenonName);
                $('.td_Parameter', row).text(this.parameterName);
                $('.td_StudyLevel', row).text(this.studyLevel);
                $('.td_Location', row).text(this.location);
                $('.td_Meaning', row).text(this.meaning);
                $('.td_CentralCompound', row).text(this.centralCompoundName);
                $('.td_AssociatedProblem', row).text(this.associatedProblemName);
                $('.td_ErasHypotdesis', row).text(this.erashypothesis);
                $('.td_StudyTreatment', row).html(this.studyTreatmentDetails);
                $('.td_OtderPatdwayDetails', row).html(this.otherPathwayDetails);
                $('.td_StudyReferenceDetails', row).html(this.studyReferenceDetails);
                $('.td_BloodBrainBarrierDetails', row).html(this.transporterDetails);

                $("#tblMarkerDetail tbody").append(row);
                row = $("#tblMarkerDetail thead tr:first").clone();
            });

            $("#tblMarkerRDADetail tbody tr").remove();

            $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
            $("div.bhoechie-tab>div.bhoechie-tab-content").eq(0).addClass("active");
            $("div.bhoechie-tab-menu>div.list-group>a").removeClass("active");
            $("div.bhoechie-tab-menu>div.list-group>a").eq(0).addClass("active");

            $("#modalNav").modal('show');

        }, error: function (error) {

        }
    });
}

function getRdaDetails() {

    if (isEmpty(markerName)) {
        alert("Please right-click on any marker !!");
        return;
    }
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "../WebService/signalingCascade.asmx/getMarkerDetail",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'cascadeName': '" + markerName + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $($("#tblMarkerRDADetail thead tr")[0]).clone();
            $("#tblMarkerRDADetail tbody tr").remove();

            $.each(result.Table, function (index) {
                $(".td_rda", row).html(this.rda);
                $(".td_peakValue", row).text(this.nutrientPeakValue);
                $(".td_tHalfValue", row).text(this.nutrientTHalfValue);

                $("#tblMarkerRDADetail tbody").append(row);
                row = $("#tblMarkerRDADetail thead tr").clone();
            });

        },
        error: function (error) {

        }
    });
}

var getPatientInvestigation = function () {

    var pid = (!isEmpty(txtPID.val())) ? txtPID.val() : 0;
    if (pid == 0) {
        alert("Please Enter PID !!");
        return;
    }
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "../WebService/SVGWebService.asmx/getPatientInvestigation",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pid': '" + pid + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;

            $("#wrapper").toggleClass("toggled");

            var html = '<table class="table table-bordered table-striped">';
            html += '<thead><tr><th>Investigation</th><th>Result</th></tr></thead>';
            html += '<tbody>';

            $.each(result, function (index) {
                html += '<tr style="cursor:pointer;" onclick="searchTextResult(this)" data-key="' + this.nutrientName + '"><td>' + this.subTestName + '</td><td>' + this.result + ' ' + this.unitName + '</td></tr>';
            });

            html += '</tbody></table>';

            $('#investigationResultDiv').html(html);
        },
        error: function (error) {

        }
    });
};

function searchTextResult(e) {
    var cell = $(e);
    var nutrientName = cell.attr('data-key');
    if (!isEmpty(nutrientName)) {
        txtSearch.val(nutrientName);
        txtSearch.change();
    }
}

function goToDiet() {
    if (isEmpty(markerName)) {
        alert("Please right-click on any marker !!");
        return;
    }
    var pageLocation = '../signalingCascade.aspx?pathwayId=' + pathwayId + '&cascadeName=' + markerName;
    window.open(pageLocation);
}

function searchKeyword() {
    if (isEmpty(markerName)) {
        alert("Please right-click on any marker !!");
        return;
    }
    var pageLocation = 'https://www.google.com/search?q=' + markerName;
    window.open(pageLocation);
}

function getECGComparison() {

    var pid = (!isEmpty(txtPID.val())) ? txtPID.val() : 0;
    var leadName = (ddlLead.val()) ? ddlLead.val() : 'I';
    if (pid == 0) {
        alert("Please Enter PID !!");
        return;
    }
    if (isEmpty(markerName)) {
        alert("Please right-click on any marker !!");
        return;
    }
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "../WebService/SVGWebService.asmx/getECGComparison",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'markerName': '" + markerName + "','leadName': '" + leadName + "','pid': '" + pid + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var ecgComparisonData = result.Table;
            var levelList = result.Table1;
            var patientRecord = result.Table2;

            var col = [];
            for (var i = 0; i < ecgComparisonData.length; i++) {
                var key = ecgComparisonData[i].subTestName + ' <span>(' + ecgComparisonData[i].result + ' ' + ecgComparisonData[i].unitName + ')' + '</span><span style="font-weight:normal; margin-left: 1rem;"> (' + ecgComparisonData[i].sampleCollectionDateTime + ') </span>';
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }

            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");
            table.className = 'table table-bordered table-striped';
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i].split('$')[0];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.

            tr = table.insertRow(-1);
            for (var i = 0; i < ecgComparisonData.length; i++) {

                var ecgLeadData = JSON.parse(ecgComparisonData[i].ecgLeadData);

                var html = '<table class="myTable marginTop1rem">';
                html += '<thead><tr><th>ECG Data <span style="font-weight:normal; margin-left: 1rem;"> (' + ecgComparisonData[i].createdDate + ') </span></th></tr></thead>';
                html += '<tbody>';
                html += '<tr><td> PAmp : ' + ecgLeadData[0].PAmpV + ' ' + ecgLeadData[0].PAmpU + '</td></tr>';
                html += '<tr><td> QAmp : ' + ecgLeadData[0].QAmpV + ' ' + ecgLeadData[0].QAmpU + '</td></tr>';
                html += '<tr><td> RAmp : ' + ecgLeadData[0].RAmpV + ' ' + ecgLeadData[0].RAmpU + '</td></tr>';
                html += '<tr><td> SAmp : ' + ecgLeadData[0].SAmpV + ' ' + ecgLeadData[0].SAmpU + '</td></tr>';
                html += '<tr><td> STJAmp : ' + ecgLeadData[0].STJAmpV + ' ' + ecgLeadData[0].STJAmpU + '</td></tr>';
                html += '<tr><td> STMAmp : ' + ecgLeadData[0].STMAmpV + ' ' + ecgLeadData[0].STMAmpU + '</td></tr>';
                html += '<tr><td> STEAmp : ' + ecgLeadData[0].STEAmpV + ' ' + ecgLeadData[0].STEAmpU + '</td></tr>';
                html += '<tr><td> TAmp : ' + ecgLeadData[0].TAmpV + ' ' + ecgLeadData[0].TAmpU + '</td></tr>';
                html += '<tr><td> TAmpMax : ' + ecgLeadData[0].TAmpMaxV + ' ' + ecgLeadData[0].TAmpMaxU + '</td></tr>';
                html += '<tr><td> PAmpMax : ' + ecgLeadData[0].PAmpMaxV + ' ' + ecgLeadData[0].PAmpMaxU + '</td></tr>';
                html += '<tr><td> QDur : ' + ecgLeadData[0].QDurV + ' ' + ecgLeadData[0].QDurU + '</td></tr>';
                html += '<tr><td> RDurV :' + ecgLeadData[0].RDurV + ' ' + ecgLeadData[0].RDurU + '</td></tr>';
                html += '<tr><td> SDur : ' + ecgLeadData[0].SDurV + ' ' + ecgLeadData[0].SDurU + '</td></tr>';
                html += '</tbody></table>';

                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = html;
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("divECGComparison");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);


            if ($("#ddlLead option").length == 0) {
                $.each(levelList, function () {
                    $("#ddlLead").append('<option value="' + this.leadName + '">' + this.leadName + '</option>');
                });
                $("#ddlLead").val(leadName);
            }

            $('#td_Name').html('Patient Name : <span style="font-weight:normal;">' + patientRecord[0].patientName + '</span>');
            $('#td_AgeGender').html('Age/Gender : <span style="font-weight:normal;">' + patientRecord[0].age + ' ' + patientRecord[0].ageUnit + ' / ' + patientRecord[0].gender + '</span>');
            $('#td_Ward').html('Ward : <span style="font-weight:normal;">' + patientRecord[0].wardName + '</span>');

        },
        error: function (error) {

        }
    });
}

function getItemStock() {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (isEmpty(markerName)) {
        alert("Please right-click on any marker !!");
        return;
    }
    $.ajax({
        type: "POST",
        url: "../WebService/pathwayMain1.asmx/getItemStock",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + markerName + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $("#tblItemStock thead tr").clone();
            $("#tblItemStock tbody tr").remove();
            $.each(result.Table, function (index) {
                $(".td_Item", row).text(this.item);
                $(".td_Category", row).text(this.category);
                $(".td_Quantity", row).text(this.quantity);
                $(".td_StoreName", row).text(this.storeName);

                $("#tblItemStock tbody").append(row);
                row = $("#tblItemStock thead tr").clone();
            });

        },
        error: function (error) {

        }
    });
}

function getTestMachineDetail() {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (isEmpty(markerName)) {
        alert("Please right-click on any marker !!");
        return;
    }
    
    $.ajax({
        type: "POST",
        url: "../WebService/pathwayMain1.asmx/getTestMachineDetail",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + markerName + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $("#tblTestMachineDetail thead tr").clone();
            $("#tblTestMachineDetail tbody tr").remove();

            var instruction = '';
            $.each(result.Table, function (index) {
                $(".td_machineName", row).text(this.machineName);
                $(".td_machineLocation", row).text(this.machineLocation);
                $(".td_intercomNumber", row).text(this.intercomNumber);
                $(".td_contactPerson", row).text(this.contactPerson);
                $(".td_resultTime", row).text(this.resultTime);
                $(".td_itemCharge", row).text(this.itemCharge);

                if (this.instruction) {
                    instruction += '<li>' + this.instruction + '</li>';
                } 

                $("#tblTestMachineDetail tbody").append(row);
                row = $("#tblTestMachineDetail thead tr").clone();
            });

            $("#instruction").html(instruction);            

        },
        error: function (error) {

        }
    });
}
function getMarkerGlossaryDetail() {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (isEmpty(markerName)) {
        alert("Please right-click on any marker !!");
        return;
    }
    $.ajax({
        type: "POST",
        url: "../WebService/SVGWebService.asmx/getMarkerGlossaryDetail",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'markerName': '" + markerName + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $("#tblMarkerGlossaryDetail thead tr").clone();
            $("#tblMarkerGlossaryDetail tbody tr").remove();
            $.each(result.Table, function (index) {
                $(".td_nutrientType", row).text(this.nutrientType);
                $(".td_nutrientCategory", row).text(this.nutrientCategory);
                $(".td_tagName", row).text(this.tagName);
                $(".td_molecularWeight", row).text(this.molecularWeight);
                $(".td_synonymNorthEast", row).text(this.synonymNorthEast);
                $(".td_synonymRural", row).text(this.synonymRural);
                $(".td_hyperName", row).text(this.hyperName);
                $(".td_description", row).text(this.description);

                $("#tblMarkerGlossaryDetail tbody").append(row);
                row = $("#tblMarkerGlossaryDetail thead tr").clone();
            });

        },
        error: function (error) {

        }
    });
}