$(document).ready(function () {

    $('#txtSearch').focus();

    // Check for searched text is changed, if yes then reload.
    $('#txtSearch').keyup(function () {
        if ($('#txtSearch').val().toLowerCase().trim() !== searchedText) {
            stopHighlight();
        }
    });

    $('#txtSearch').change(function () {
        if (!isEmpty($('#txtSearch').val().trim())) {
            searchedText = $('#txtSearch').val().toLowerCase().trim();
            searchText(searchedText);
        }
    });

    $('#txtSearchFood').change(function () {
        if (!isEmpty($('#txtSearchFood').val())) {
            searchedFoodText = $('#txtSearchFood').val().toLowerCase().trim();
            funSearchedFood();
        }
    });

    getMarkerRelation()

});

document.getElementById('svgObject').addEventListener("load", function () {
    _svgObject = this.getSVGDocument();
    _svgGroup = _svgObject.querySelectorAll('g');

    extractText();
});

function searchText(text) {

    $.each(_svgGroup, function () {
        if (isValidTextGroup(this)) {
            if ($(this).has('text')) {
                var textTag = this.querySelectorAll('text');
                var className = $(textTag[0]).attr('class');
                var tagText = $(textTag[0]).html().trim();
                for (var i = 1; i < textTag.length; i++) {
                    var nextTextTag = $(textTag[i]);
                    var nextText = nextTextTag.html().trim();
                    if (!tagText.includes(nextText) && nextText != '' && nextTextTag.attr('class') == className) {
                        tagText += ' ' + nextText;
                    }
                }

                if (tagText.toLowerCase().trim() == text) {
                    var textRect = this.querySelector('rect');
                    textRect.classList.add("blinkRect");
                }
            }
        }
    });
}

function isValidTextGroup(obj) {
    if ($(obj).attr('id') && obj.id != firstLayer && obj.id.substr(0, 4).toLowerCase().trim() == groupPrefix.toLowerCase().trim()) {
        return true;
    }
    else {
        return false;
    }
}

function stopHighlight() {
    $.each(_svgGroup, function () {
        if (isValidTextGroup(this)) {
            if ($(this).has('text')) {
                var textRect = this.querySelector('rect');
                textRect.classList.remove("blinkRect");
            }
        }
    });
}

// Code for generating autocomplete list.
function extractText() {

    $.each(_svgGroup, function () {
        if (isValidTextGroup(this)) {
            if ($(this).has('text')) {
                var textTag = this.querySelectorAll('text');
                var className = $(textTag[0]).attr('class');
                var tagText = $(textTag[0]).html().trim();
                for (var i = 1; i < textTag.length; i++) {
                    var nextTextTag = $(textTag[i]);
                    var nextText = nextTextTag.html().trim();
                    if (!tagText.includes(nextText) && nextText != '' && nextTextTag.attr('class') == className) {
                        tagText += ' ' + nextText;
                    }
                }

                if (!autoCompleteList.some(data => data.label.toLowerCase() == tagText.toLowerCase())) {
                    autoCompleteList.push({
                        label: tagText,
                        value: tagText
                    });
                }
            }
        }
    });

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



// Backend function for data

// Relation for getting start and end point for the node searched.
function getMarkerRelation() {

    alert(UtilsCache)
    log(UtilsCache);
    log(UtilsCache.getSession('USERDETAILS'));
    //if (!UtilsCache.getSession('USERDETAILS')) {
    //    window.location.href = "../../index.html";
    //    alert('found')
    //    return;
    //}
    //var sectionId = $("#ddlSection option:selected").val();
    //var subSectionId = $("#ddlSubSection option:selected").val();
    //$.ajax({
    //    type: "POST",
    //    url: "../../WebService/SVGWebService.asmx/getMarkerRelation",
    //    contentType: 'application/json',
    //    dataType: 'json',
    //    data: "{'pathwayId': '" + Number(pathwayId) + "','sectionId': '" + Number(sectionId) + "','subSectionId': '" + Number(subSectionId) + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
    //    statusCode: {
    //        401: function (xhr) {
    //            window.location.href = "../../index.html";
    //        }
    //    },
    //    success: function (data) {
    //        var r = JSON.parse(data.d).responseValue;

    //        relation = r.Table;  // List of markers along with start point and end point.
    //        markerGroupList = r.Table3;

    //        $("#ddlSection option:not(:first)").remove();
    //        if (r.Table1 && r.Table1.length > 0) {
    //            $.each(r.Table1, function () {
    //                $("#ddlSection").append('<option value="' + this.id + '">' + this.sectionName + '</option>');
    //            });
    //        }
    //        $("#ddlSection").val(sectionId);

    //        $("#ddlSubSection option:not(:first)").remove();
    //        if (r.Table2 && r.Table2.length > 0) {
    //            $.each(r.Table2, function () {
    //                $("#ddlSubSection").append('<option value="' + this.id + '">' + this.subSectionName + '</option>');
    //            });
    //        }
    //        $("#ddlSubSection").val(subSectionId);

    //        var foodAutoCompleteList = [];
    //        $.each(r.Table3, function () {
    //            foodAutoCompleteList.push({
    //                label: this.foodName,
    //                value: this.foodName
    //            });
    //        });

    //        console.log(r.Table3);
    //        $('#txtSearchFood').autocomplete({
    //            source: foodAutoCompleteList
    //        });
    //    },
    //    error: function (error) {

    //    }
    //});
}

function funSearchedFood() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var foodName = $('#txtSearchFood').val();
    $.ajax({
        type: "POST",
        url: "../../WebService/SVGWebService.asmx/getSubSection",
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
                if (autoCompleteList.some(data => data.label.toLowerCase() == nutrient)) {
                    searchText(nutrient);
                }
            });

        },
        error: function (error) {

        }
    });
}
