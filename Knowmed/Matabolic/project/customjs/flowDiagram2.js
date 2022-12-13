var pathwayId = 0;
var groupID = 0;
var sampleTags = [];
var updateId = 0;
var highlight = [];
var pageName = '';
function saveDescription() {
    var obj;
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var files = $('#txtImage').get(0).files;
    var image = (files.length > 0) ? uploadImage(files) : '';
    var pageURL = pageName;
    var heading = $('#txtHeading').val();
    var color = $('#txtColor').val();
    var description = $('#txtDescription').val();
    obj = {
        "pageName": pageURL,
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "heading": heading,
        "color": color,
        "image": image,
        "description": description
    }

    $.ajax({
        type: "POST",
        url: "WebService/pageDescription.asmx/insertDescription",
        data: JSON.stringify(obj),
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {

        },
        error: function (data) {
        }
    });

    $("#txtHeading").val('');
    $("#txtImage").val('');
    $("#txtColor").val('');
    $("#txtDescription").val('');



};
function showDescription() {

    var pageURL = pageName;


    var obj = {
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "pageName": pageURL
    };
    $.ajax({
        type: "POST",
        url: "WebService/pageDescription.asmx/showDescription",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {

            var r = JSON.parse(data.d).responseValue;

            $("#tblVechileDetails tbody tr").remove();
            var base_url = window.location.origin;
            $.each(r.Table, function (i) {

                var row = $("#tblVechileDetails thead tr").clone();
                $('.td_SrNo', row).text(i + 1);
                $('.td_ID', row).val(this.id);


                $('.td_heading', row).text(this.heading);
                var colorh = (this.color == '#000000') ? '' : `<div  style="background-color:${this.color};height:50px;width:50px" ></div>`;


                var imagePath = base_url + `/Matabolic/project/GraphPDF/${this.image}`;

                var iamgeh = (this.image == '') ? `<img src="${base_url}/Matabolic/project/GraphPDF/defaultImage.png" alt="no image" height="50" width="50">` : '<img src="' + imagePath + '" height="50" width="50">';
                var description = this.details.replace(/ /g, "_");
                var heading = this.heading.replace(/ /g, "_");
                $('.td_color', row).html(colorh);
                $('.td_image', row).html(iamgeh);
                $('.td_description', row).text(this.details);

                $('.td_ActionEdit', row).html(`<i class="icon-trash" onClick=deleteDescription(${this.id})></i > &nbsp;<i class="icon-edit" onClick=editDescription(${this.id},"${this.color}","${this.image}","${heading}","${description}")></i >`);


                $("#tblVechileDetails tbody").append(row);
                row = $("#tblVechileDetails body tr:last").clone();
            });
        },
        error: function (error) {

        }
    });
}

function editDescription(editId, color = null, image = null, heading = null, details = null) {

    details = details.replace(/_/g, " ");
    heading = heading.replace(/_/g, " ");



    $("#btnUpdate").show();
    $("#btnSave").hide();

    $('#txtHeading').val(heading);
    $('#txtColor').val(color);
    $('#txtId').val(editId);
    $('#txtDescription').val(details);
    $("#addInfoModel").show();

}

function updateDescription() {
    var files = $('#txtImage').get(0).files;
    var image = (files.length > 0) ? uploadImage(files) : '';

    var Id = $('#txtId').val();
    var heading = $('#txtHeading').val();
    var Color = $('#txtColor').val();

    var Detail = $('#txtDescription').val();


    var obj23 = {
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "id": Id,
        "image": image,
        "heading": heading,
        "color": Color,
        "description": Detail
    };


    $.ajax({
        type: "POST",
        url: "WebService/pageDescription.asmx/updatePageDescription",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj23),
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {
            alert('Data Update Successfull');
            $("#addInfoModel").hide();
        },
        error: function (data) {

        }
    });

    $("#txtHeading").val('');
    $("#txtImage").val('');
    $("#txtColor").val('');
    $("#txtDescription").val('');
}

function deleteDescription(rowID) {

    var obj = {
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "id": rowID,
        "status": "0"
    };
    $.ajax({
        type: "POST",
        url: "WebService/pageDescription.asmx/deletePageDescription",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            showDescription();

        },
        error: function (error) {

        }
    });
}


$(document).ready(function () {

    var url = window.location.href;
    pageName = getPageName(url);
    //log('From page ==== ' + pageName);
    //addNote();
    //getDiseaseList();


    $("#btnUpdate").hide();

    $("#btnAddNew").click(function () {
        // saveDescription();
    });
    $("#moreInfo").click(function () {
        $("#modalDescription").show();
        showDescription();
    });
    $("#btnClose").click(function () {
        $("#modalDescription").hide();
    });
    $("#btnClosed").click(function () {
        $("#modalDescription").hide();
    });
    $("#addInfo").click(function () {
        $("#addInfoModel").show();

    });
    $("#btnCross").click(function () {
        $("#addInfoModel").hide();
    });

    $("#btnSave").click(function () {
        if ($("#txtDescription").val() == "") {
            alert("Description in mandatory");
        }
        else {
            saveDescription();
            alert('save successfull');
        }
    });

    $("#btnUpdate").click(function () {
        updateDescription();

    });


    $("#btnCancel").click(function () {
        $("#addInfoModel").hide();
    });


    $("#btnNoteCancel").click(function () {
        $("#showNote").hide();
    });

    var url = window.location.href;
    pathwayId = getParameterByName('pathwayID', url);
    groupID = getParameterByName('groupID', url);
    //-----------------------Test---------------
    $("#btnTestId").click(function () {
        //getAllPathwayId();
        var myArray = [];
        var myString = '';
        $(":checkbox:checked").each(function () {
            var checked = $(this).val();

            myString += checked + ',';

        });

        var PathwayId_array = myArray.toString();
        var FinalArray = myString.replace(/,\s*$/, "");

        var count_length = myArray.length;
        var phenomenon = $("#ddlReceptor option:selected").text();
        var writeUp = $('#mytextarea').val().replace(/[\@$*#]/gi, '').replace(/,/g, ' ');
        var receptorId = $("#ddlReceptor option:selected").val();
        var orginalWriteUp = $('#mytextarea').val();
        for (var i = 0; i < count_length; i++) {
            //alert("hello");
        }

        $.ajax({
            type: "POST",
            url: "WebService/flowDiagram.asmx/TestSave",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'myArray':'" + FinalArray + "','count_length':'" + JSON.stringify(count_length) + "','phenomenon':'" + JSON.stringify(phenomenon) + "','writeUp':'" + JSON.stringify(writeUp) + "','receptorId':'" + JSON.stringify(receptorId) + "','orginalWriteUp':'" + JSON.stringify(orginalWriteUp) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.responseCode == 1) {
                    // $("#removeConfirmationTags").tagit("removeAll");
                    // $("#removeConfirmationTags").val('');
                    $("#ddlReceptor").val(0);
                    $("#ddlParameter").val(0);
                    //getWriteUp(PathwayId_array);
                    //$("#preview").append('<div class="span12" style="border-bottom: 1px solid #eae5e5;"><div class="span11">' + writeUp + '</div><div class="span1"><i class="icon-edit"></i></div></div>');
                    //maketoast('success', 'Success', 'Save Successfully.');
                    alert("Data Save succesfully");
                }
            },
            error: function (error) {

                maketoast('error', 'Error', JSON.parse(error.responseText).d);
            }
        });
    });
});

$(function () {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    function split(val) {
        return val.split(/ \s*/);
    }

    function extractLast(term) {
        return split(term).pop();
    }
    tagState = highlight;
    $("#mytextarea").autocomplete({
        minLength: 2,
        autoFocus: true,
        source: function (request, response) {

            //var results = [],
            selectionStart = this.element[0].selectionStart;
            term = extractLast(request.term.substring(0, selectionStart));
            var filteredArray = $.map(tagState, function (item) {
                //if (item.original.startsWith(term)) {
                return {
                    label: item.original,
                    value: item.original
                };
                //} else {
                //   return null;
                //}

            });
            response($.ui.autocomplete.filter(filteredArray, term));
        },
        focus: function () {
            return false;
        },
        select: function (event, ui) {
            var terms = split(this.value.substring(0, this.selectionStart));
            terms.pop();  // remove the current input
            terms.push(ui.item.value);        // add the selected item
            this.value =
                $.trim(terms.join(" ") + this.value.substring(this.selectionStart)) + " ";
            return false;
        }
    }).on("keydown", function (event) {
        if (event.keyCode === $.ui.keyCode.TAB) {
            event.preventDefault();
            return;
        }

    });
    var height = ($(window).height() - $('#header').height() - 11);
    $("#content").attr('style', 'min-height:' + height + 'px');


});
function multiSelectDisease() {
    $('#ddlDisease').multiselect({
        buttonWidth: '100%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Pathway',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}
function checkKey() {
    $('textarea').highlightWithinTextarea('update');
    $('textarea').highlightWithinTextarea({
        highlight: highlight
    });
}

$(function () {

    getPathwayList();
    if (pathwayId != null && pathwayId != '' && groupID != null && groupID != '') {
        getpathwayId(pathwayId);
    }
});

var getPathwayList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/flowChart.asmx/getPathwayList",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;
            var row = $("#sidebar ul li:first").clone();
            $("#sidebar ul li").remove();
            $.each(r.Table, function () {
                $('.pathwayName', row).html('<i class="icon icon-home"></i><span>' + this.headName + '</span>');
                $('.pathwayName', row).attr('onclick', 'getpathwayId(' + this.id + ',this)');
                $("#sidebar ul").append(row);
                row = $("#sidebar ul li:first").clone();
            });


            $("#ddlDisease option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#ddlDisease").append('<option value="' + this.id + '">' + this.headName + '</option>');
            });
            if (!$('#ddlDisease').prop("multiple")) {
                $('#ddlDisease').prop("multiple", "multiple");
                multiSelectDisease();
                $("#ddlDisease").multiselect("clearSelection");
            }


            $.each(r.Table1, function () {
                if (this.keyword.match(/^[ A-Za-z0-9_-]+$/)) {
                    var aa = "\\b" + this.keyword.toLowerCase() + "\\b";
                    highlight.push({
                        highlight: new RegExp(aa, 'ig'),
                        className: 'red',
                        original: this.keyword.toLowerCase()
                    });
                    highlight.push({
                        highlight: new RegExp('↑' + aa, 'ig'),
                        className: 'red',
                        original: '↑' + this.keyword.toLowerCase()
                    });
                    highlight.push({
                        highlight: new RegExp('↓' + aa, 'ig'),
                        className: 'red',
                        original: '↓' + this.keyword.toLowerCase()
                    });
                }

            });
            $.each(r.Table2, function () {
                if (this.relationName.match(/^[ A-Za-z0-9_-]+$/)) {
                    var aa = "\\b" + this.relationName.toLowerCase() + "\\b";
                    highlight.push({
                        highlight: new RegExp(aa, 'ig'),
                        className: 'green',
                        original: this.relationName.toLowerCase()
                    });
                }
            });
            $("#ddlReceptor option:not(:first)").remove();
            $.each(r.Table3, function () {
                $("#ddlReceptor").append('<option value="' + this.id + '">' + this.pathwayName + '</option>');

            });
            $("#ddlParameter option:not(:first)").remove();
            $.each(r.Table5, function () {
                $("#ddlParameter").append('<option value="' + this.id + '">' + this.parameterName + '</option>');

            });

            highlight.push({
                highlight: '.',
                className: 'white',
                original: '.'
            }, {
                highlight: 'further',
                className: 'white',
                original: 'further'
            }, {
                highlight: 'and',
                className: 'white',
                original: 'and'
            });
        },
        error: function (error) {

        }

    });
};

var getpathwayId = function (id, e) {
    //$("#span10").show();
    $(".pathwayName").closest('li').removeClass('active');
    $(e).closest('li').addClass('active');
    pathwayId = id;
    $("#tblWriteUp").show();
    getWriteUp(id);
};

function getWriteUp(id) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/flowDiagram.asmx/getWriteUp",
        contentType: 'application/json',
        data: "{'id':'" + id + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $("#tblWriteUp thead tr").clone();
            var myRow = '';
            $("#tblWriteUp tbody tr").remove();
            $.each(result, function (index) {
                /*console.log(result);*/

                $(".td_goTo", row).html('<a href = "../project/proportion.aspx?pathwayID=' + this.pathwayId + '&groupID=' + this.groupId + '" ><i class="icon-external-link"></i> </a>');
                /* $(".td_Disease", row).text(this.pathwayName);*/
                $(".td_WriteUp", row).text(this.orginalWriteUp);
                $(".td_Receptor", row).text(this.keyword);
                $(".td_Parameter", row).text(this.parameterName);
                $(".td_check", row).html('<input type="checkbox" id="chk_' + this.id + '" onchange="addReceptorToUpdate(' + this.id + ')" style="width:20px" />');
                $(".td_rank", row).html('<input type="number" id="txt_' + this.id + '" disabled="true" onchange="updateRank(' + this.pathwayId + ',this.value)" style="width:50px"  value="' + this.rank + '"/>');
                $(".td_sno", row).html('<input type="number" onchange="update(' + this.id + ',\'' + this.rank + '\', this.value)" style="width:50px"  value="' + this.sno + '"/>');
                $(".td_action", row).html('<i class="icon-edit" onclick="Delete(' + this.id + ',this,' + this.receptorId + ',' + this.parameterID + ', ' + this.pathwayId + ') "></i> <input type="checkbox" id="chkID" value=' +  this.id + '/>');
                if (this.groupId == groupID) {
                    row.addClass("row-highlight");
                    myRow = $(row.children()[6]).find('input');
                }
                $(".td_overWrite", row).html('<input type="button" id="btn_Override" onClick="overWriteDisease()" value="OverWrite"/>');
                $("#tblWriteUp tbody").append(row);
                row = $("#tblWriteUp thead tr").clone();
            });

        },
        error: function (error) {

        }
    });
}

var save = function () {

    //================== Start Save Code=====================================
    var res = [];
    var nutrientList = [];
    var node = $('.hwt-content mark').length;
    for (var i = 0; i < node; i++) {
        var cdiv = $('.hwt-content mark:eq(' + i + ')');
        if (cdiv.attr('class') == 'red') {
            if (cdiv.text().indexOf('↑') > -1) {
                nutrientList.push({
                    nutrientName: cdiv.text().replace('↑', ''),
                    roleType: 'B'
                });
            } else if (cdiv.text().indexOf('↓') > -1) {
                nutrientList.push({
                    nutrientName: cdiv.text().replace('↓', ''),
                    roleType: 'H'
                });
            }

            res.push('@' + cdiv.text().replace('↑', '').replace('↓', ''));
        }
        if (cdiv.attr('class') == 'green') {
            res.push('*' + cdiv.text());
        }
        if (cdiv.attr('class') == 'white') {
            res.push(cdiv.text());
        }
        if ($('.hwt-content mark:eq(' + i + ') mark').length > 0) {
            i = i + $('.hwt-content mark:eq(' + i + ') mark').length;
        }
    }
    //if (!UtilsCache.getSession('USERDETAILS')) {
    //    window.location.href = "../../index.html";
    //    return;
    //}
    if ($("#ddlReceptor option:selected").val() == '0') {
        alert('Please Select phenomenon');
        return;
    }
    var orginalWriteUp = $('#mytextarea').val();
    var writeUp = $('#mytextarea').val().replace(/[\@$*#]/gi, '').replace(/,/g, ' ');

    //var res = $('#mytextarea').val().replace(/\./g, ' . ').split(' ');
    ////console.log($('#mytextarea').val().replace(/\./g, ' .'));
    var finalArr = [];
    var keysFrom = [];
    var keysTo = [];
    var relation = [];
    var types = "";
    var causeWord = "";
    var isBefore = true;
    var fromString = "";
    var toString = "";
    var count = 0;
    var countIndex = 0;
    var nextIndex = 0;
    var objectCount = -1;

    for (var i = 0; i < res.length; i++) {
        if (res[i].toLowerCase().trim() != 'further') {
            if (res[i].toLowerCase().trim() != '.') {
                if (res[i].toLowerCase().trim() != 'and') {
                    if (res[i].indexOf('@') > -1) {
                        if (isBefore) {
                            fromString += res[i].replace(/[\@$*#]/gi, '').replace(/_/g, ' ').trim() + '~';
                            //keysFrom.push(res[i].replace(/[\@$*#]/gi, ''));
                        } else {
                            toString += res[i].replace(/[\@$*#]/gi, '').replace(/_/g, ' ').trim() + '~';
                            //keysTo.push(res[i].replace(/[\@$*#]/gi, ''));
                        }
                    } else if (res[i].indexOf('#') > -1) {
                        types += res[i].replace(/[\@$*#]/gi, '').replace(/_/g, ' ').trim() + ',';
                    } else if (res[i].indexOf('*') > -1) {
                        count++;
                        nextIndex = i;
                        if (count > 1) {
                            i = countIndex;
                            count = 0;
                            pushArray();
                        } else {
                            keysFrom.push(fromString.substr(0, fromString.length - 1));
                            isBefore = false;
                            relation.push(res[i].replace(/[\@$*#]/gi, '').replace(/_/g, ' ').trim());
                        }
                        countIndex = nextIndex;
                    }
                    else if (res[i].indexOf('$') > -1) {
                        causeWord += res[i].replace(/[\@$*#]/gi, '').replace(/_/g, ' ').trim() + ",";
                    }
                } else {
                    if (isBefore) {
                        keysFrom.push(fromString.substr(0, fromString.length - 1));
                        fromString = "";
                    } else {
                        keysTo.push(toString.substr(0, toString.length - 1));
                        toString = "";
                    }
                }
            } else {
                pushArray();
            }
        } else {
            pushArray();
        }

        function pushArray() {
            if (toString != "") {
                keysTo.push(toString.substr(0, toString.length - 1));
            }

            for (var h = 0; h < keysFrom.length; h++) {
                for (var j = 0; j < keysTo.length; j++) {
                    var rel = "";
                    if (relation[0].toLowerCase().trim() == 'by enzyme') {
                        var rel = finalArr[objectCount].relation;
                        finalArr[objectCount].relation = relation[0];
                        finalArr[objectCount].toKey = keysTo[j]
                    }

                    finalArr.push({
                        fromKey: relation[0].toLowerCase().trim() == 'by enzyme' ? keysTo[j] : keysFrom[h],
                        toKey: relation[0].toLowerCase().trim() == 'by enzyme' ? keysFrom[h] : keysTo[j],
                        type: types,
                        relation: rel == "" ? relation[0] : rel,
                        cause: causeWord
                    });
                    objectCount++;
                }
            };

            keysFrom = [];
            keysTo = [];
            relation = [];
            types = "";
            causeWord = "";
            isBefore = true;
            fromString = "";
            toString = "";
        }
    }

    if (toString != "") {
        keysTo.push(toString.substr(0, toString.length - 1));
    }

    //============For Multiple Disease Selection ===================

    for (var i = 0; i < keysFrom.length; i++) {
        for (var j = 0; j < keysTo.length; j++) {
            var rel = "";
            if (relation[0].toLowerCase().trim() == 'by enzyme') {
                var rel = finalArr[objectCount].relation;
                finalArr[objectCount].relation = relation[0];
                finalArr[objectCount].toKey = keysTo[j]
            }
            finalArr.push({
                fromKey: relation[0].toLowerCase().trim() == 'by enzyme' ? keysTo[j] : keysFrom[i],
                toKey: relation[0].toLowerCase().trim() == 'by enzyme' ? keysFrom[i] : keysTo[j],
                type: types,
                relation: rel == "" ? relation[0] : rel,
                cause: causeWord
            });
            objectCount++;
        }
    }


    var myArray = [];
    var myString = '';
    $(":checkbox:checked").each(function () {
        var checked = $(this).val();

        myString += checked + ',';

    });
    var FinalArray = myString.replace(/,\s*$/, "");
    var obj = {
        pathwayId: pathwayId,//pathway_id,     
        receptorId: $("#ddlReceptor option:selected").val(),
        writeUp: writeUp,
        orginalWriteUp: orginalWriteUp,
        updateId: updateId,
        parameterID: $("#ddlParameter option:selected").val()
    };
    $.ajax({
        type: "POST",
        url: "WebService/flowDiagram.asmx/insert",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'dataValue':'" + JSON.stringify(obj) + "','arrObj':'" + JSON.stringify(finalArr) + "','arrNutrientList':'" + JSON.stringify(nutrientList) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "','pathway_array':'" + FinalArray + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                // $("#removeConfirmationTags").tagit("removeAll");
                // $("#removeConfirmationTags").val('');
                $("#ddlReceptor").val(0);
                $("#ddlParameter").val(0);

                $("#ddlDisease").val(0);
                //getWriteUp(FinalArray);
                //$("#preview").append('<div class="span12" style="border-bottom: 1px solid #eae5e5;"><div class="span11">' + writeUp + '</div><div class="span1"><i class="icon-edit"></i></div></div>');
                maketoast('success', 'Success', 'Save Successfully.');
                $("#mytextarea").val('');
                checkKey();
                $("#tblWriteUp").show();
            }
            else if (result.responseCode == 2) {

                maketoast('error', 'Error', 'Data Already Exist.');
            }
        },
        error: function (error) {
        }
    });


    //================End ======================
};

var Delete = function (id, e, receptorId, parameterId, pathwayId) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var data = pathwayId.toString();
    var dataarray = data.split(",");
    $("#ddlDisease").val(dataarray);
    $("#ddlDisease").multiselect("refresh");

    $('#mytextarea').val($(e).closest('tr').find('.td_WriteUp').text());

    checkKey();
    $("#ddlReceptor").val(receptorId);
    $("#ddlParameter").val(parameterId);

    if (confirm("Are you sure want to delete?")) {
        $.ajax({
            type: "POST",
            url: "WebService/flowDiagram.asmx/Delete",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'id':'" + id + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.responseCode == 1) {
                    getWriteUp(pathwayId);
                    //maketoast('success', 'Success', 'Delete Successfully.');
                }
            },
            error: function (error) {

            }
        });
    }
};

function DeleteMULTIPLE() {
    var myString = '';
    $("input[id='chkID']:checked").each(function () {
        var checked = $(this).val();
        myString += checked + ',';
    });

   

    var FinalArray = myString.replace(/\//g, "");
    if (FinalArray == null || FinalArray == '' || FinalArray == '0') {
        alert('Please Select Checked Checkbox');
        return;
    }
    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        "ids": FinalArray
    };

    $.ajax({
        type: "POST",
        url: "WebService/flowDiagram.asmx/deleteMultipleWriteUp",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            
            alert("Delete Sucessfull ...");

        },
        error: function (error) {

        }
    });

};

var update = function (id, rank, sn) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/flowDiagram.asmx/updateSNO",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id':'" + id + "','sno':'" + sn + "','pathwayId':'" + pathwayId + "','rank':'" + rank + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                getWriteUp(pathwayId);
                //maketoast('success', 'Success', 'Delete Successfully.');
            }
        },
        error: function (error) {

        }
    });
};

var writeUpIDs = '';
var addReceptorToUpdate = function (id) {

    if ($('#chk_' + id).prop("checked") == true) {
        writeUpIDs = writeUpIDs + id + ',';
        $('#txt_' + id).prop("disabled", false);
    }
    else {
        writeUpIDs = writeUpIDs.replace(id + ',', '');
        $('#txt_' + id).prop("disabled", true);
    }
};

var updateRank = function (pathwayId, rank) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (writeUpIDs != '') {
        $.ajax({
            type: "POST",
            url: "WebService/flowDiagram.asmx/updateRank",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'id':'" + writeUpIDs + "','rank':'" + rank + "','pathwayId':'" + pathwayId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.responseCode == 1) {
                    getWriteUp(pathwayId);
                    writeUpIDs = '';
                }
            },
            error: function (error) {
                writeUpIDs = '';
            }
        });
    }
    else {
        getWriteUp(pathwayId);
        writeUpIDs = '';
    }
};

function getRank() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $('#rankModel').modal('show');
    $.ajax({
        type: "POST",
        url: "WebService/flowDiagram.asmx/getRank",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayId':'" + pathwayId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var rankNoList = result.Table;
            var rankNameList = result.Table1;

            var row = $("#tblRank thead tr:first").clone();
            $("#tblRank tbody tr").remove();
            $.each(rankNoList, function () {
                $('.td_rank', row).text(this.rankNo);
                $('.td_rankName', row).html('<select id="ddl_rankName' + this.rankNo + '" style="width: 90%;"></select>');
                $('.td_save', row).html('<button type="button" class="btn btn-success" onclick="saveRank(this,' + this.id + ')">Save</button>&nbsp;&nbsp;<button type="button" class="btn btn-warning" onclick="saveRank(this,' + this.id + ')">Delete</button>');
                $("#tblRank tbody").append(row);
                row = $("#tblRank thead tr:first").clone();
            });

            setTimeout(function () {
                $.each(rankNoList, function () {
                    var rankNo = this.rankNo;
                    var rankName = this.rankName;
                    $('#ddl_rankName' + rankNo + ' option').remove();
                    $('#ddl_rankName' + rankNo).append('<option value = "0">--Select--</option>');
                    $.each(rankNameList, function () {
                        $('#ddl_rankName' + rankNo).append('<option value="' + this.rankName + '">' + this.rankName + '</option>');
                    });
                    if (rankName != null && rankName != '') {
                        $('#ddl_rankName' + rankNo).val(rankName);
                    }
                    else {
                        $('#ddl_rankName' + rankNo).val('0');
                    }
                });

            }, 0);

        },
        error: function (error) {

        }
    });
}

var saveRank = function (e, id) {
    var actionButtonText = $(e).html();
    var rankNo = $(e).closest('tr').find('.td_rank').text();
    var rankName = $(e).closest('tr').find('.td_rankName select option:selected').val();
    if (actionButtonText == 'Save') {
        if (rankName == '0') {
            maketoast('error', 'Error', 'Please Select Rank');
        }
        else {
            if (rankName != '') {
                if (!UtilsCache.getSession('USERDETAILS')) {
                    window.location.href = "../../index.html";
                    return;
                }
                $.ajax({
                    type: "POST",
                    url: "WebService/flowDiagram.asmx/saveRank",
                    contentType: 'application/json',
                    dataType: 'json',
                    data: "{'rankID':'" + id + "','rank':'" + rankNo + "','rankName':'" + rankName + "','pathwayId':'" + pathwayId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
                    statusCode: {
                        401: function (xhr) {
                            window.location.href = "../../index.html";
                        }
                    },
                    success: function (response) {
                        var result = JSON.parse(response.d);
                        if (result.responseCode == 1) {
                            if (id == 0) {
                                $(e).attr("onclick", "saveRank(this," + result.responseValue[0].id + ")");
                            }
                            maketoast('success', 'Success', 'Save Successfully.');
                        }
                    },
                    error: function (error) {
                        maketoast('error', 'Error', JSON.parse(error.responseText).d);
                    }
                });
            }
        }
    }
    else if (actionButtonText == 'Delete') {
        if (rankName == '0' && id == 0) {
            maketoast('error', 'Error', 'No Rank To Delete');
        }
        else if (confirm("Are you sure want to delete?")) {
            $.ajax({
                type: "POST",
                url: "WebService/flowDiagram.asmx/DeleteRank",
                contentType: 'application/json',
                dataType: 'json',
                data: "{'rankID':'" + id + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
                statusCode: {
                    401: function (xhr) {
                        window.location.href = "../../index.html";
                    }
                },
                success: function (response) {
                    var result = JSON.parse(response.d);
                    if (result.responseCode == 1) {
                        getRank();
                        maketoast('success', 'Success', 'Deleted Successfully.');
                    }
                },
                error: function (error) {
                    maketoast('error', 'Error', JSON.parse(error.responseText).d);
                }
            });
        }
    }
};


var getMaster = function () {
    $.ajax({
        type: "POST",
        url: "WebService/flowDiagram.asmx/getMaster",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id':'" + $('#ddlReceptor option:selected').val() + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d).responseValue[0];
            $('#mytextarea').val(result.writeUp);
            checkKey();
            $('.hwt-backdrop .hwt-content').html(result.orginalWriteUp);

        },
        error: function (error) {

            maketoast('error', 'Error', JSON.parse(error.responseText).d);
        }
    });
};











