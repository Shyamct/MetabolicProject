var pathwayId = 0;
var cascadeName = '';

function multiSelect() {
    $('#ddlCascadeNutrient').multiselect({
        buttonWidth: '13%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Cascade',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}
function multiSelectFood() {
    $('#ddlFoodFamily').multiselect({
        buttonWidth: '13%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Food',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}
function addNote() {
    $("#btnNote").click(function () {
        var pageUrlnew = $(location).attr("href").split('/');
        var pageURL = pageUrlnew[pageUrlnew.length - 1];
        window.open("Note.aspx?" + pageURL);
    });
}

function saveDescription() {
    var obj;
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var image = '';
    var files = $('#txtImage').get(0).files;
    if (files.length === 0) {
        var pageUrlnew = $(location).attr("href").split('/');
        var pageURL = pageUrlnew[pageUrlnew.length - 1];
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
            data: obj,
            //contentType: "application/json;",
            dataType: "json",
            success: function (data) {
                alert('save successfull');
            },
            error: function (data) {

            }
        });
    }
    else {
        var imageFile = new FormData();
        imageFile.append(files[0].name, files[0]);
        var timeStamp = event.timeStamp;
        $.ajax({
            url: "FileUploadHandler.ashx?timestamp=" + timeStamp,
            data: imageFile,
            processData: false,
            contentType: false,
            async: false,
            type: 'POST',
            success: function (data) {
                console.log(data);
                image = data[0];
                var pageUrlnew = $(location).attr("href").split('/');
                var pageURL = pageUrlnew[pageUrlnew.length - 1];//str.replace(/.*\/(\w+)\/?$/, '$1');//$(location).attr("href").lastIndexOf('/') + 1;

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
            },
            error: function (errorData) {
                maketoast('error', 'Error', "there was a problem uploading the file.");
            }
        });
    }
    $("#txtHeading").val('');
    $("#txtImage").val('');
    $("#txtColor").val('');
    $("#txtDescription").val('');
};

function showDescription() {
    var pageUrlnew = $(location).attr("href").split('/');
    var pageURL = pageUrlnew[pageUrlnew.length - 1];

    // var userID = "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}";
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
            console.log(data);
            var r = JSON.parse(data.d).responseValue;

            $("#tblVechileDetails tbody tr").remove();
            var base_url = window.location.origin;
            $.each(r.Table, function (i) {

                var row = $("#tblVechileDetails thead tr").clone();
                $('.td_SrNo', row).text(i + 1);
                $('.td_heading', row).text(this.heading);
                var colorh = '<button type="button" class="btn" style="background-color:' + this.color + '" height="5" width="10"></button>';
                var imagePath = base_url + '/Matabolic/project/GraphPDF/' + this.image;

                var iamgeh = '<img src="' + imagePath + '" height="50" width="50">';

                $('.td_color', row).append(colorh);
                $('.td_image', row).append(iamgeh);
                $('.td_description', row).text(this.details);
                $("#tblVechileDetails tbody").append(row);
                row = $("#tblVechileDetails body tr:last").clone();
            });
        },
        error: function (error) {

        }
    });
}

$(function () {
    var h = ($(window).height() - $('#header').height() - 124);
    $(".widget-content").css("min-height", h);
    hhhhhh();
    getDiseaseList();

    $("#tblCascadeCount").hide();

    var url = window.location.href;
    pathwayId = getParameterByName('pathwayId', url);
    cascadeName = getParameterByName('cascadeName', url);

    if (isEmpty(pathwayId)) {
        pathwayId = 0;
    }
    if (isEmpty(cascadeName)) {
        cascadeName = '';
    }

    if (!isEmpty(pathwayId) && !isEmpty(cascadeName)) {
        getSignalingCascade();
    }
    
});



var hhhhhh = function (){
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
    $("#btnCancel").click(function () {
        $("#addInfoModel").hide();
    });

    $("#btnNoteShow").click(function () {
        $("#showNote").show();
        showPageNote();
    });
    $("#btnNotecross").click(function () {
        $("#showNote").hide();
    });
    $("#btnNoteCancel").click(function () {
        $("#showNote").hide();
    });
}
function showPageNote() {
    var pageUrlnew = $(location).attr("href").split('/');
    var pageURL = pageUrlnew[pageUrlnew.length - 1];

    var obj = {
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "pageName": pageURL
    };
    $.ajax({
        type: "POST",
        url: "WebService/pageDescription.asmx/showNote",
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
            $("#tblShowNote tbody tr").remove();
            $.each(r.Table, function (i) {
                var row = $("#tblShowNote thead tr").clone();
               

                //var notee = '<span "' + this.note + '"></span>';

                $('.td_Note', row).html(this.note);

                $("#tblShowNote tbody").append(row);
                row = $("#tblShowNote body tr:last").clone();
            });
        },
        error: function (error) {

        }
    });
}
var getDiseaseList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/signalingCascade.asmx/getDisease",
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
            $("#ddlDisease option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#ddlDisease").append('<option value="' + this.problemID + '">' + this.problemName + '</option>');
            });
            //$("#ddlDisease").select2();

            $("#ddlFoodGroup option:not(:first)").remove();
            $.each(r.Table1, function () {
                $("#ddlFoodGroup").append('<option value="' + this.id + '">' + this.groupname + '</option>');
            });
        },
        error: function (error) {

        }
    });
};

var process = phenomenon = 0;
var cascadeNutrientFilter = '';
var getSignalingCascade = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $("#divLoader").show();
    $("#showData").show();
    $("#tblCascadeCount").show();

    process = $('#ddlProcess option:selected').val();
    phenomenon = $('#ddlSignaling option:selected').val();

    obj = {
        diseaseID: $('#ddlDisease option:selected').val(),
        process: $('#ddlProcess option:selected').val(),
        receptorID: $('#ddlSignaling option:selected').val(),
        cascadeNutrient: $('#ddlCascadeNutrient').val().toString(),
        interactedNutrient: $('#txtFoodNutrient option:selected').val(),
        foodFamily: $('#txtFood option:selected').val(),
        pathwayId: pathwayId,
        cascadeName: cascadeName,
    };
    cascadeNutrientFilter = $('#ddlCascadeNutrient').val().toString();

    if ($('#ddlDisease option:selected').val() > 0 || !isEmpty(pathwayId)) {
        $.ajax({
            type: "POST",
            url: "WebService/signalingCascade.asmx/getSignalingCascade",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'dataArray':'" + JSON.stringify(obj) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },

            success: function (data) {
                var result = JSON.parse(data.d).responseValue;

                var cascadeList = result.Table;
                if (cascadeList.length > 0) {

                    var row = $("#tblSignaling thead tr").clone();
                    $("#tblSignaling tbody tr").remove();
                    $.each(cascadeList, function (i) {
                        var interactedElementList = JSON.parse(this.interactedElement);

                        var toEatActivatorList = toEatActivatorFoodList = toEatInhibitorList = toEatInhibitorFoodList = notToEatActivatorList = notToEatActivatorFoodList = notToEatInhibitorList = notToEatInhibitorFoodList = '<ul>';

                        var labels = '<div style="float:right;margin-right: 6%;font-size: 1rem;font-weight: bold;">O</div> <div style="float:right;margin-right: 7%;font-size: 1rem;font-weight: bold;">F</div>';
                        $.each(interactedElementList, function (i) {
                            if (this.toEat === 'BE') {
                                if (this.ieType === 'N') {

                                    var foodFamilyHTMLList1 = '';

                                    if (this.hasOwnProperty("foodFamilyList")) {

                                        foodFamilyHTMLList1 = '<ul>';
                                        var foodFamilyList1 = this.foodFamilyList;
                                        var nutrientID1 = this.ieID;

                                        $.each(foodFamilyList1, function (i) {

                                            if (this.isCommon) {

                                                var pieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this, 1)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                var originalPieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this, 0)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.fbnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                foodFamilyHTMLList1 += '<li><div style="margin-top: 1.4rem;"><div class="commonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID1 + '" onclick="getFood(this)">' + this.ffName + '</div>' + originalPieChart + pieChart + '</div></li>';
                                            }
                                            else {
                                                foodFamilyHTMLList1 += '<li><div class="uncommonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID1 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                            }
                                        });

                                        foodFamilyHTMLList1 += '</ul>';
                                    }

                                    var eatCount = '<div style="font-weight: 100;"> ( To Eat-<b>' + this.eatCount + '</b>, Not To Eat-<b>' + this.notEatCount + '</b> ) </div>';

                                    toEatActivatorList += '<li><div style="width:100%"><span class="blink1">' + this.ieName + '</span>' + eatCount + labels + '</div><div class="foodFamilyPanel">' + foodFamilyHTMLList1 + '</div></li>';
                                }
                                else if (this.ieType === 'F') {
                                    toEatActivatorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                                }
                            }
                            else if (this.toEat === 'HI') {
                                if (this.ieType === 'N') {

                                    var foodFamilyHTMLList2 = '';

                                    if (this.hasOwnProperty("foodFamilyList")) {

                                        foodFamilyHTMLList2 = '<ul>';
                                        var foodFamilyList2 = this.foodFamilyList;
                                        var nutrientID2 = this.ieID;

                                        $.each(foodFamilyList2, function (i) {

                                            if (this.isCommon) {

                                                var pieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this, 1)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                var originalPieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this, 0)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.fbnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                foodFamilyHTMLList2 += '<li><div style="margin-top: 1.4rem;"><div class="commonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID2 + '" onclick="getFood(this)">' + this.ffName + '</div>' + originalPieChart + pieChart + '</div></li>';
                                            }
                                            else {
                                                foodFamilyHTMLList2 += '<li><div class="uncommonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID2 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                            }
                                        });

                                        foodFamilyHTMLList2 += '</ul>';
                                    }

                                    var eatCount1 = '<div style="font-weight: 100;"> ( To Eat-<b>' + this.eatCount + '</b>, Not To Eat-<b>' + this.notEatCount + '</b> ) </div>';

                                    toEatInhibitorList += '<li><div style="width:100%"><span class="blink1">' + this.ieName + '</span>' + eatCount1 + labels + '</div><div class="foodFamilyPanel">' + foodFamilyHTMLList2 + '</div></li>';
                                }
                                else if (this.ieType === 'F') {
                                    toEatInhibitorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                                }
                            }
                            else if (this.toEat === 'HE') {
                                if (this.ieType === 'N') {

                                    var foodFamilyHTMLList3 = '';

                                    if (this.hasOwnProperty("foodFamilyList")) {

                                        foodFamilyHTMLList3 = '<ul>';
                                        var foodFamilyList3 = this.foodFamilyList;
                                        var nutrientID3 = this.ieID;

                                        $.each(foodFamilyList3, function (i) {

                                            if (this.isCommon) {

                                                var pieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this, 1)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                var originalPieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this, 0)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.fbnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                foodFamilyHTMLList3 += '<li><div style="margin-top: 1.4rem;"><div class="commonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID3 + '" onclick="getFood(this)">' + this.ffName + '</div>' + originalPieChart + pieChart + '</div></li>';
                                            }
                                            else {
                                                foodFamilyHTMLList3 += '<li><div class="uncommonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID3 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                            }
                                        });

                                        foodFamilyHTMLList3 += '</ul>';
                                    }

                                    var eatCount2 = '<div style="font-weight: 100;"> ( To Eat-<b>' + this.eatCount + '</b>, Not To Eat-<b>' + this.notEatCount + '</b> ) </div>';

                                    notToEatActivatorList += '<li><div style="width:100%"><span class="blink2">' + this.ieName + '</span>' + eatCount2 + labels + '</div><div class="foodFamilyPanel">' + foodFamilyHTMLList3 + '</div></li>';
                                }
                                else if (this.ieType === 'F') {
                                    notToEatActivatorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                                }
                            }
                            else if (this.toEat === 'BI') {
                                if (this.ieType === 'N') {

                                    var foodFamilyHTMLList4 = '';

                                    if (this.hasOwnProperty("foodFamilyList")) {

                                        foodFamilyHTMLList4 = '<ul>';
                                        var foodFamilyList4 = this.foodFamilyList;
                                        var nutrientID4 = this.ieID;

                                        $.each(foodFamilyList4, function (i) {

                                            if (this.isCommon) {

                                                var pieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this, 1)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                var originalPieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this, 0)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.fbnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                foodFamilyHTMLList4 += '<li><div style="margin-top: 1.4rem;"><div class="commonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID4 + '" onclick="getFood(this)">' + this.ffName + '</div>' + originalPieChart + pieChart + '</div></li>';
                                            }
                                            else {
                                                foodFamilyHTMLList4 += '<li><div class="uncommonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID4 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                            }
                                        });

                                        foodFamilyHTMLList4 += '</ul>';
                                    }

                                    var eatCount3 = '<div style="font-weight: 100;"> ( To Eat-<b>' + this.eatCount + '</b>, Not To Eat-<b>' + this.notEatCount + '</b> ) </div>';

                                    notToEatInhibitorList += '<li><div style="width:100%"><span class="blink2">' + this.ieName + '</span>' + eatCount3 + labels + '</div><div class="foodFamilyPanel">' + foodFamilyHTMLList4 + '</div></li>';
                                }
                                else if (this.ieType === 'F') {
                                    notToEatInhibitorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                                }
                            }
                        });

                        toEatActivatorList += '</ul>';
                        toEatActivatorFoodList += '</ul>';
                        toEatInhibitorList += '</ul>';
                        toEatInhibitorFoodList += '</ul>';
                        notToEatActivatorList += '</ul>';
                        notToEatActivatorFoodList += '</ul>';
                        notToEatInhibitorList += '</ul>';
                        notToEatInhibitorFoodList += '</ul>';

                        var cascadeNutrient = '';
                        var processList = '';
                        var phenomenonList = '';
                        var isMarker = false;
                        var roleCount = '<div style="font-weight: 100;"> ( Benefical-<b>' + this.beneficialCount + '</b>, Harmful-<b>' + this.harmfulCount + '</b> ) </div>';

                        if (this.processList) {
                            isMarker = true;

                            processList += '<div class="process-name"> Function </div><ul class="process">';
                            var list = JSON.parse(this.processList);
                            $.each(list, function (i) {
                                processList += '<li>' + this.rankName + '</li>';
                            });
                            processList += '</ul>';
                        }

                        if (this.pathwayList) {
                            phenomenonList += '<div class="process-name"> Phenomenon </div><ul class="process">';
                            var list1 = JSON.parse(this.pathwayList);
                            $.each(list1, function (i) {
                                phenomenonList += '<li>' + this.pathwayName + '</li>';
                            });
                            phenomenonList += '</ul>';
                        }

                        var link = '../project/test4.aspx?pathwayID=' + this.pathwayId + '&moleculeName=' + this.keyword;
                        //var link = '../project/web/viewer.html?pathwayID=' + this.pathwayId + '&moleculeName=' + this.keyword;

                        //if (isMarker) {
                        cascadeNutrient = '<a href="' + link + '" target="_blank"><span style="cursor:pointer;" dataKey="' + this.nutrientID + '" onclick="getNutrientFunction(this)">' + this.nutrientName + '</span></a>' + roleCount + processList + phenomenonList;
                        //}
                        //else {
                        //    cascadeNutrient = '<span style="cursor:pointer;" dataKey="' + this.nutrientID + '" onclick="getNutrientFunction(this)">' + this.nutrientName + '</span>' + roleCount + processList + phenomenonList;
                        //}


                        $(".td_ToEatActivator", row).html(toEatActivatorFoodList + toEatActivatorList);
                        $(".td_ToEatInhibitor", row).html(toEatInhibitorFoodList + toEatInhibitorList);
                        $(".td_CascadeNutrient", row).html(cascadeNutrient);
                        $(".td_NotToEatActivator", row).html(notToEatActivatorFoodList + notToEatActivatorList);
                        $(".td_NotToEatInhibitor", row).html(notToEatInhibitorFoodList + notToEatInhibitorList);
                        $("#tblSignaling tbody").append(row);
                        row = $("#tblSignaling thead tr").clone();
                    });
                    //---------- Datatable Code----------------//
                    $('.data-table').dataTable({
                        "bJQueryUI": true,
                        "sPaginationType": "full_numbers",
                        "iDisplayLength": 100,
                        "aLengthMenu": [[100, 200, 500, -1], [100, 200, 500, "All"]],
                        "sDom": '<""l>t<"F"fp>'
                    });
                    //---------- End Datatable Code-------------//

                    $("#ddlSignaling option:not(:first)").remove();
                    $.each(result.Table1, function (i) {
                        $("#ddlSignaling").append('<option value="' + this.receptorId + '">' + this.pathwayName + '</option>');
                    });
                    $("#ddlSignaling").val(phenomenon);

                    $("#ddlProcess option:not(:first)").remove();
                    $.each(result.Table2, function (i) {
                        $("#ddlProcess").append('<option value="' + this.rank + '">' + this.rankName + '</option>');
                    });
                    $("#ddlProcess").val(process);


                    $.each(result.Table3, function (i) {

                        $('#total').text(this.total);
                        $('#withInteractedNutrient').text(this.withInteractedNutrient);
                        $('#withoutInteractedNutrient').text(this.withoutInteractedNutrient);
                        $('#withOnlyEnhancerNutrient').text(this.withOnlyEnhancerNutrient);
                        $('#withOnlyInhibitorNutrient').text(this.withOnlyInhibitorNutrient);
                        $('#withEnhancerAndInhibitorNutrient').text(this.withEnhancerAndInhibitorNutrient);
                    });

                    $("#ddlCascadeNutrient option").remove();
                    $.each(cascadeList, function (i) {
                        $('#ddlCascadeNutrient').append($('<option value="' + this.nutrientID + '">' + this.nutrientName + '</option>'));
                    });
                    $('#ddlCascadeNutrient').prop("multiple", "multiple");
                    multiSelect();
                    if (cascadeNutrientFilter == '') {
                        $("#ddlCascadeNutrient").multiselect("clearSelection");
                    }

                    $("#ddlCascadeNutrient").val(cascadeNutrientFilter);

                    if (result.Table4 && result.Table4[0].length > 0) {
                        $("#ddlDisease").val(result.Table4[0].diseaseID);
                    }
                }

                else {
                    maketoast('error', 'Error', 'No Data Found.');
                    $("#divLoader").hide();
                    $("#showData").hide();
                    $("#tblCascadeCount").hide();
                }
                getFoodNutrientList();
            },
            error: function (error) {
                $("#divLoader").hide();
                $("#showData").hide();
                $("#tblCascadeCount").hide();

            }, complete: function () {
                $("#divLoader").hide();
            }
        });
    }
};

var getNutrientFunction = function (e) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    if ($(e).parent().has('ul[class="nutrientFunction"]').length === 0) {
        $.ajax({
            type: "POST",
            url: "WebService/signalingCascade.asmx/getNutrientFunction",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'nutrientID':'" + $(e).attr("dataKey") + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (data) {
                var result = JSON.parse(data.d).responseValue.Table;

                var functionHTMLList = '';
                if (result.length > 0) {
                    functionHTMLList += '<ul class="nutrientFunction">';

                    $.each(result, function () {
                        functionHTMLList += '<li>' + this.nutrientFunction + '</li>';
                    });
                    functionHTMLList += '</ul>';
                }
                $(e).after(functionHTMLList);
            },
            error: function (error) {

            }
        });
    } else {
        $(e).parent().children()[1].remove();
    }
};

var getFood = function (e) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var foodFamilyDiv = $(e);
    var dataArray = foodFamilyDiv.attr('dataKey').split('-');
    var foodFamilyID = dataArray[0];
    var nutrientID = dataArray[1];
    var diseaseID = $('#ddlDisease option:selected').val();

    if (foodFamilyDiv.parent().parent().has('ul').length === 0) {
        $("#divLoader").show();
        $.ajax({
            type: "POST",
            url: "WebService/signalingCascade.asmx/getFood",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'foodFamilyID':'" + foodFamilyID + "','nutrientID':'" + nutrientID + "','diseaseID':'" + diseaseID + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (data) {
                var result = JSON.parse(data.d).responseValue.Table;
                console.log(result);

                foodHTMLList = '';
                if (result.length > 0) {

                    foodHTMLList += '<ul>';
                    $.each(result, function (i) {

                        if (this.isCommon) {

                            var pieChart = '<div class="pieChart"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.badNutrientPercent + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                            foodHTMLList += '<li><div dataKey="' + this.foodID + '-' + this.foodName + '" onclick="getFoodDetails(this)"><div class="commonFood" dataKey="' + this.foodID + '" onclick=getFoodDetails(this)>' + this.foodName + ' (' + this.foodNutrientValue + ' mg/100g)' + '</div>' + pieChart + '</div></li>';
                        }
                        else {
                            foodHTMLList += '<li><div class="uncommonFoodFamily">' + this.foodName + ' (' + this.foodNutrientValue + ' mg/100g)' + '</div></li>';
                        }
                    });

                    foodHTMLList += '</ul>';
                    foodFamilyDiv.parent().after(foodHTMLList);
                }
                else {
                    $("#divLoader").hide();
                }
            },
            error: function (error) {
                $("#divLoader").hide();
            }, complete: function () {
                $("#divLoader").hide();
            }
        });
    }
    else {
        foodFamilyDiv.parent().parent().children()[1].remove();
    }
};

var getFoodDetails = function (e) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var dataArray = $(e).attr('dataKey').split('-');
    var foodID = dataArray[0];
    var foodName = dataArray[1];
    var cascadeNutrient = $('#ddlCascadeNutrient').val().toString();
    var isFiltered = 0;

    $.ajax({
        type: "POST",
        url: "WebService/signalingCascade.asmx/getFoodDetails",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'foodID':'" + foodID + "','diseaseID':'" + $('#ddlDisease option:selected').val() + "','cascadeNutrient':'" + cascadeNutrient + "','isFiltered':'" + isFiltered + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;

            var row = $("#tblFoodNutrientPercentage thead tr").clone();
            $("#tblFoodNutrientPercentage tbody tr").remove();
            $.each(result, function () {
                $(".td_foodNutrient", row).text(this.interactedNutrientName);
                $(".td_nutrientPercentage", row).text(this.nutrientPercentage + ' %');
                $(row).css('background-color', this.rowColor);
                $("#tblFoodNutrientPercentage tbody").append(row);
                row = $("#tblFoodNutrientPercentage thead tr").clone();
            });

        },
        error: function (error) {

        }
    });
    $('#myModal').modal('show');
    $('.modal-title').text(foodName);
};


var getFoodFamilyDetails = function (e, isFiltered) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    var dataArray = $(e).attr('dataKey').split('-');
    var foodFamilyID = dataArray[0];
    var foodFamilyName = dataArray[1];
    obj = {
        diseaseID: $('#ddlDisease option:selected').val(),
        foodFamilyID: foodFamilyID,
        process: $('#ddlProcess option:selected').val(),
        receptorID: $('#ddlSignaling option:selected').val(),
        cascadeNutrient: $('#ddlCascadeNutrient').val().toString(),
        isFiltered: isFiltered
    };

    $.ajax({
        type: "POST",
        url: "WebService/signalingCascade.asmx/getFoodFamilyDetails",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'dataArray':'" + JSON.stringify(obj) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;

            var row = $("#tblNutrientPercentage thead tr").clone();
            $("#tblNutrientPercentage tbody tr").remove();
            $.each(result, function () {
                $(".td_nutrient", row).text(this.interactedNutrientName);
                $(".td_percentage", row).text(this.nutrientPercentage + ' %');
                $(row).css('background-color', this.rowColor);
                $("#tblNutrientPercentage tbody").append(row);
                row = $("#tblNutrientPercentage thead tr").clone();
            });
        },
        error: function (error) {

        }
    });
    $('#myModal1').modal('show');
    $('.modal-title').text(foodFamilyName);
};

var getFoodNutrientList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/signalingCascade.asmx/getFoodNutrientList",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'diseaseID':'" + Number($('#ddlDisease option:selected').val()) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;

            $("#txtFood option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#txtFood").append('<option value="' + this.foodFamily + '">' + this.foodFamily + '</option>');
            });
            //$("#txtFood").select2();

            $("#txtFoodNutrient option:not(:first)").remove();
            $.each(r.Table1, function () {
                $("#txtFoodNutrient").append('<option value="' + this.nutrientName + '">' + this.nutrientName + '</option>');
            });
            //$("#txtFoodNutrient").select2();


        },
        error: function (error) {

        }
    });
};

var foodFamilyFilter = '';
var count = 0;
var getFoods = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        diseaseID: $('#ddlDisease option:selected').val(),
        foodGroupID: $('#ddlFoodGroup option:selected').val()
    };
    foodFamilyFilter = $('#ddlFoodFamily').val().toString();
    if ($('#ddlDisease option:selected').val() > 0) {
        $.ajax({
            type: "POST",
            url: "WebService/signalingCascade.asmx/getFoods",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'dataArray':'" + JSON.stringify(obj) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (data) {
                var result = JSON.parse(data.d).responseValue.Table;

                $("#ddlFoodFamily option").remove();
                $.each(result, function (i) {
                    $('#ddlFoodFamily').append($('<option value="' + this.id + '">' + this.foodFamily + '</option>'));
                });

                count++;
                if (count < 2) {
                    $('#ddlFoodFamily').prop("multiple", "multiple");
                    multiSelectFood();
                }
                //if (foodFamilyFilter == '') {
                $("#ddlFoodFamily").multiselect("clearSelection");
                //}

                $("#ddlFoodFamily").val(foodFamilyFilter);
            },
            error: function (error) {

            }
        });
    }
};

var SearchFoodPresence = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        diseaseID: $('#ddlDisease option:selected').val(),
        foodFamily: $('#ddlFoodFamily').val().toString()
    };

    if ($('#ddlDisease option:selected').val() > 0) {
        $("#divLoader").show();

        $.ajax({
            type: "POST",
            url: "WebService/signalingCascade.asmx/getFoodReport",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'dataArray':'" + JSON.stringify(obj) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (data) {
                var result = JSON.parse(data.d).responseValue.Table;

                if (result && result.length > 0) {
                    $("#showDataFood").show();
                    $("#divLoader").hide();

                    var topHeader = ["Marker", "Food"];
                    $.each(result, function (i) {

                        var interactedNutrientList = JSON.parse(result[i].interactedNutrients);
                        if (interactedNutrientList && interactedNutrientList.length > 0) {
                            $.each(interactedNutrientList, function (j) {

                                if (!topHeader.includes(interactedNutrientList[j].interactedNutrientName)) {
                                    topHeader.push(interactedNutrientList[j].interactedNutrientName);
                                }
                            });
                        }
                    });

                    // CREATE DYNAMIC TABLE.
                    var table = document.createElement("table");
                    table.className = 'table table-bordered table-striped';
                    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

                    var tr = table.insertRow(-1);                   // TABLE ROW.

                    for (var i = 0; i < topHeader.length; i++) {
                        var th = document.createElement("th");      // TABLE HEADER.                       
                        th.innerHTML = topHeader[i];
                        tr.appendChild(th);
                    }
                    $(tr).attr('style', 'white-space: nowrap');

                    // ADD JSON DATA TO THE TABLE AS ROWS.
                    for (var i = 0; i < result.length; i++) {
                        tr = table.insertRow(-1);

                        var nutrientHTML = '<ul>';
                        var cascadeNutrientList = JSON.parse(result[i].cascadeNutrients);
                        if (cascadeNutrientList && cascadeNutrientList.length > 0) {
                            $.each(cascadeNutrientList, function (j) {
                                nutrientHTML += '<li>' + cascadeNutrientList[j].nutrientName + ' ' + cascadeNutrientList[j].interactionType + '</li>';
                            });
                        }
                        nutrientHTML += '</ul>';

                        var tabCell = tr.insertCell(-1);
                        var tabCell1 = tr.insertCell(-1);

                        tabCell.innerHTML = nutrientHTML;
                        tabCell1.innerHTML = result[i].foodFamily;

                        var interactedNutrientList = JSON.parse(result[i].interactedNutrients);

                        for (var k = 2; k < topHeader.length; k++) {
                            var tabCell = tr.insertCell(-1);

                            if (interactedNutrientList && interactedNutrientList.length > 0) {
                                if (interactedNutrientList.some(data => data.interactedNutrientName === topHeader[k])) {
                                    tabCell.innerHTML = '&#10004;';
                                }
                                else {
                                    tabCell.innerHTML = '&nbsp;';
                                }
                            }
                            else {
                                tabCell.innerHTML = '&nbsp;';
                            }
                        }
                    }

                    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
                    var divContainer = document.getElementById("showDataFood");
                    divContainer.innerHTML = "";
                    divContainer.appendChild(table);

                }
                else {
                    $("#showDataFood").hide();
                    $("#divLoader").hide();
                }
            },
            error: function (error) {
                $("#showDataFood").hide();
                $("#divLoader").hide();
            }
        });
    }
};

function Refresh() {
    window.location = '../project/FoodPresenceReport.aspx';
}
function RefreshSignaling() {
    window.location = '../project/signalingCascade.aspx';
}

//var printDiv = function (divName) {

//    var printContents = document.getElementById(divName).innerHTML;
//    var popupWin = window.open('', '_blank', 'width=300,height=300');
//    popupWin.document.open();
//    popupWin.document.write('<html><head> <script src="assets/js/angular.min.js"></script></head><body onload="window.print()">' + printContents + '</body></html>');
//    popupWin.document.close();


    //var css = ' <link href="customCSS/signalingCascade.css" rel="stylesheet" />';
    //docprint = window.open("");
    //docprint.document.write('<html><head>' + css + '<title>Print</title>');
    //docprint.document.write('</head><body>');
    //docprint.document.write($('#' + showData).html());
    //docprint.document.write('</body></html>');
    //popupWin.document.close();
//};