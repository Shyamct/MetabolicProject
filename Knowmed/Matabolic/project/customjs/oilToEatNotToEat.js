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


function chkToggle() {
    var step_nbr = 10000000;
    var min_nbr = 100;
    $('.btnAllb').show();
    $('#tblSignaling ul').each(function () {
        var LiN = $(this).find('li').length;
        if (LiN > 10) {
            $('li', this).eq(10).nextAll().hide().addClass('toggleable');
            //$(this).append('<li class="more"><input id="btnShowAll" type="button" value="SHOW ALL" onclick="sssToggle()"></li>');
        }
    });
    $('#tblSignaling ul').on('click', '.more', function () {
        var aa = $('#tblSignaling ul li:visible').length;

        if ($(this).hasClass('less')) {

            $(this).prevAll('li:not(.toggleable)').slice(0, step_nbr).addClass('toggleable').hide();

            if ($('li:visible').length <= (min_nbr)) {
                $(this).text('More...').removeClass('less');
            }

        } else {
            $(this).siblings('li.toggleable').slice(0, step_nbr).removeClass('toggleable').show();

            if ($('li.toggleable').length == 0) {
                $(this).text('Less...').addClass('less');
            }
        }


    });
}


$(function () {

    var h = ($(window).height() - $('#header').height() - 124);
    $(".widget-content").css("min-height", h);

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
        $("#btnUpdate").text('Save');
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

    $("#btnUpdate").click(function () {
        updateDescription();
    });



    $("#saveNote").click(function () {
        saveNote();
        // alert('save successfull');
    });
    $(".closed").click(function () {
        $("#modalNutrient").hide();
    });


});

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

//var pageSizef = 1;
var process = phenomenon = 0;
var cascadeNutrientFilter = '';

var getSignalingCascade = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    $("#showData").show();
    $("#tblCascadeCount").show();
    $("#divLoader").show();

    process = $('#ddlProcess option:selected').val();
    phenomenon = $('#ddlSignaling option:selected').val();
    obj = {
        diseaseID: $('#ddlDisease option:selected').val(),
        process: $('#ddlProcess option:selected').val(),
        receptorID: $('#ddlSignaling option:selected').val(),
        cascadeNutrient: $('#ddlCascadeNutrient').val() == null ? '' : $('#ddlCascadeNutrient').val().toString(),
        interactedNutrient: $('#txtFoodNutrient option:selected').val(),
        foodFamily: $('#txtFood option:selected').val(),
        pathwayId: pathwayId,
        cascadeName: cascadeName,
    };

    cascadeNutrientFilter = $('#ddlCascadeNutrient').val() == null ? '' : $('#ddlCascadeNutrient').val().toString();

    if ($('#ddlDisease option:selected').val() > 0 || !isEmpty(pathwayId)) {
        $.ajax({
            type: "POST",
            url: "WebService/signalingCascade.asmx/getOilSignalingCascade",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'dataArray':'" + JSON.stringify(obj) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },

            success: function (data) {

                $("#divLoader").hide();
                $(".btnshowAllFoodFamily").show();

                var result = JSON.parse(data.d).responseValue;
                var dockingScoreList = result.Table4;
                finalRecord = result.Table;

                if (finalRecord.length > 0) {

                    createMainTable(finalRecord, dockingScoreList);

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
                    $.each(finalRecord, function (i) {
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

                    $("#showData").hide();
                    $("#tblCascadeCount").hide();

                }
                getFoodNutrientList();

            },
            error: function (error) {
               
                $("#showData").hide();
                $("#tblCascadeCount").hide();
            }, complete: function () {
               // $(".commonFoodFamily").click();
                $("#divLoader").hide();
            }
        });

    }
};


function showAllFoodFamily() {
    $(".commonFoodFamily").click();
}




var createMainTable = function (finalRecord, dockingScoreList) {   
    try {
        var TableData = finalRecord;
        var objDock = dockingScoreList;

        $('#tblSignaling').DataTable({
            // obj: objDock,
            aaData: TableData,
            destroy: true,
            searching: false,
            paging: true,
            ordering: false,
            info: true,
            "aaSorting": [],
            dom: '<"top"Bfl>rt<"bottom"ip>',
            lengthMenu: [[10, 25, 50, 100, 200, 500, - 1], [10, 25, 50, 100, 200, 500, "All"]],
            columns: [
                {
                    data: null,
                    title: "Activators",
                    orderable: false,
                    render: function (data, type, row) {

                        var interactedElementList = JSON.parse(row.interactedElement);
                        var toEatActivatorList = toEatActivatorFoodList = '<ul>';

                        var labels = '<div style="float:right;margin-right: 6%;font-size: 1rem;font-weight: bold;">O</div> <div style="float:right;margin-right: 7%;font-size: 1rem;font-weight: bold;">F</div>';
                        if (interactedElementList && interactedElementList.length > 0) {
                            $.each(interactedElementList, function (i) {
                                if (this.toEat === 'BE') {
                                    if (this.ieType === 'N') {

                                        var foodFamilyHTMLList1 = '';
                                        var nutrientID1 = this.ieID;

                                        if (this.hasOwnProperty("foodFamilyList")) {

                                            foodFamilyHTMLList1 = '<ul>';
                                            var foodFamilyList1 = this.foodFamilyList;

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

                                        var Dock = getDockingScore(nutrientID1, row.nutrientID, objDock);
                                        if (foodFamilyHTMLList1 != '') {
                                            toEatActivatorList += '<li><div style="width:100%"><span class="blink1" ' + this.ieID +'>' + this.ieName + '</span>' + Dock + eatCount + labels + '</div><div class="foodFamilyPanel">' + foodFamilyHTMLList1 + '</div></li>';
                                        }
                                        }
                                    else if (this.ieType === 'F') {
                                        toEatActivatorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                                    }
                                }
                            });
                        }
                        toEatActivatorList += '</ul>';
                        toEatActivatorFoodList += '</ul>';

                        return toEatActivatorList + toEatActivatorFoodList;
                    }
                },
                {
                    data: null,
                    title: "Inhibitors",
                    orderable: false,
                    render: function (data, type, row) {
                        var interactedElementList = JSON.parse(row.interactedElement);
                        var toEatInhibitorList = toEatInhibitorFoodList = '<ul>';

                        var labels = '<div style="float:right;margin-right: 6%;font-size: 1rem;font-weight: bold;">O</div> <div style="float:right;margin-right: 7%;font-size: 1rem;font-weight: bold;">F</div>';
                        if (interactedElementList && interactedElementList.length > 0) {
                            $.each(interactedElementList, function (i) {
                                if (this.toEat === 'HI') {
                                    if (this.ieType === 'N') {

                                        var foodFamilyHTMLList2 = '';
                                        var nutrientID2 = this.ieID;

                                        if (this.hasOwnProperty("foodFamilyList")) {

                                            foodFamilyHTMLList2 = '<ul>';
                                            var foodFamilyList2 = this.foodFamilyList;


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

                                        var Dock = getDockingScore(nutrientID2, row.nutrientID, objDock);
                                        if (foodFamilyHTMLList2 != '') {
                                            toEatInhibitorList += '<li><div style="width:100%"><span class="blink1" ' + this.ieID +'>' + this.ieName + '</span>' + Dock + eatCount1 + labels + '</div><div class="foodFamilyPanel">' + foodFamilyHTMLList2 + '</div></li>';
                                        }
                                        }
                                    else if (this.ieType === 'F') {
                                        toEatInhibitorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                                    }
                                }
                            });
                        }
                        toEatInhibitorList += '</ul>';
                        toEatInhibitorFoodList += '</ul>';

                        return toEatInhibitorList + toEatInhibitorFoodList;
                    }
                },
                {
                    data: null,
                    title: "",
                    orderable: false,
                    render: function (data, type, row) {
                        var roleCount = '<div style="font-weight: 100;"> ( Benefical-<b>' + row.beneficialCount + '</b>, Harmful-<b>' + row.harmfulCount + '</b> ) </div>';
                        var processList = '';
                        if (row.processList) {
                            processList += '<div class="process-name"> Function </div><ul class="process">';
                            var list = JSON.parse(row.processList);
                            $.each(list, function (i) {
                                processList += '<li>' + this.rankName + '</li>';
                            });
                            processList += '</ul>';
                        }

                        var phenomenonList = '';
                        if (row.pathwayList) {
                            phenomenonList += '<div class="process-name"> Phenomenon </div><ul class="process">';
                            var list1 = JSON.parse(row.pathwayList);
                            $.each(list1, function (i) {
                                phenomenonList += '<li>' + this.pathwayName + '</li>';
                            });
                            phenomenonList += '</ul>';
                        }

                        var link = '../project/test4.aspx?pathwayID=' + row.pathwayId + '&moleculeName=' + row.keyword;

                        var cascadeNutrient = '<a href="' + link + '" target="_blank"><span style="cursor:pointer;color:blue;font-size:large;margin-left: 82px;" dataKey="' + row.nutrientID + '" onclick="getNutrientFunction(this)">' + row.nutrientName + '</span></a>' + roleCount + processList + phenomenonList;

                        return cascadeNutrient;
                    }
                },
                {
                    data: null,
                    title: "Activators",
                    orderable: false,
                    render: function (data, type, row) {
                        var interactedElementList = JSON.parse(row.interactedElement);
                        var notToEatActivatorList = notToEatActivatorFoodList = '<ul>';

                        var labels = '<div style="float:right;margin-right: 6%;font-size: 1rem;font-weight: bold;">O</div> <div style="float:right;margin-right: 7%;font-size: 1rem;font-weight: bold;">F</div>';
                        if (interactedElementList && interactedElementList.length > 0) {
                            $.each(interactedElementList, function (i) {
                                if (this.toEat === 'HE') {
                                    if (this.ieType === 'N') {

                                        var foodFamilyHTMLList3 = '';
                                        var nutrientID3 = this.ieID;

                                        if (this.hasOwnProperty("foodFamilyList")) {

                                            foodFamilyHTMLList3 = '<ul>';
                                            var foodFamilyList3 = this.foodFamilyList;

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

                                        var Dock = getDockingScore(nutrientID3, row.nutrientID, objDock);
                                        if (foodFamilyHTMLList3 != '') {
                                            notToEatActivatorList += '<li><div style="width:100%"><span class="blink2" ' + this.ieID+'>' + this.ieName + '</span>' + Dock + eatCount2 + labels + '</div><div class="foodFamilyPanel">' + foodFamilyHTMLList3 + '</div></li>';
                                        }
                                        }
                                    else if (this.ieType === 'F') {
                                        notToEatActivatorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                                    }
                                }
                            });
                        }
                        notToEatActivatorList += '</ul>';
                        notToEatActivatorFoodList += '</ul>';

                        return notToEatActivatorList + notToEatActivatorFoodList;
                    }
                },
                {
                    data: null,
                    title: "Inhibitors",
                    orderable: false,
                    render: function (data, type, row) {
                        var interactedElementList = JSON.parse(row.interactedElement);

                        var notToEatInhibitorList = notToEatInhibitorFoodList = '<ul>';

                        var labels = '<div style="float:right;margin-right: 6%;font-size: 1rem;font-weight: bold;">O</div> <div style="float:right;margin-right: 7%;font-size: 1rem;font-weight: bold;">F</div>';
                        if (interactedElementList && interactedElementList.length > 0) {
                            $.each(interactedElementList, function (i) {
                                if (this.toEat === 'BI') {
                                    if (this.ieType === 'N') {

                                        var foodFamilyHTMLList4 = '';
                                        var nutrientID4 = this.ieID;

                                        if (this.hasOwnProperty("foodFamilyList")) {

                                            foodFamilyHTMLList4 = '<ul>';
                                            var foodFamilyList4 = this.foodFamilyList;

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

                                        var Dock = getDockingScore(nutrientID4, row.nutrientID, objDock);
                                        if (foodFamilyHTMLList4 != '') {

                                            notToEatInhibitorList += '<li><div style="width:100%"><span class="blink2" ' + this.ieID +' ">' + this.ieName + '</span>' + Dock + eatCount3 + labels + '</div><div class="foodFamilyPanel">' + foodFamilyHTMLList4 + '</div></li>';
                                        }
                                        }
                                    else if (this.ieType === 'F') {
                                        notToEatInhibitorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                                    }
                                }
                            });
                        }
                        notToEatInhibitorList += '</ul>';
                        notToEatInhibitorFoodList += '</ul>';

                        return notToEatInhibitorList + notToEatInhibitorFoodList;
                    }
                }
            ]
        });
    }
    catch (ex) {
        console.log(ex.toString());
    }
};

function getDockingScore(interactedNutrient, nutrient, dockingScoreList) {
    try {
        var returnMessage = '';
        if (interactedNutrient && dockingScoreList && dockingScoreList.length > 0) {
            $.each(dockingScoreList, function (index, value) {

                if ((value.nutrientID == nutrient) && (value.interactedElementID == interactedNutrient)) {
                    if (value.dockingScore > -1) {
                        returnMessage = '<div class="dockingRange" style="background-color:red;color:black;width: 40px;">' + value.dockingScore + '</div>';
                    }
                    else if (value.dockingScore < -1 && value.dockingScore > -2) {
                        returnMessage = '<div class="dockingRange" style="background-color:red;color:black;width: 40px;">' + value.dockingScore + '</div>';
                    }
                    else if (value.dockingScore < -2 && value.dockingScore > -3) {
                        returnMessage = '<div class="dockingRange" style="background-color:#ADD8E6;color:black;width: 40px;">' + value.dockingScore + '</div>';
                    }
                    else if (value.dockingScore < -3 && value.dockingScore > -4) {
                        returnMessage = '<div class="dockingRange" style="background-color:#00008B;color:white;width: 40px;">' + value.dockingScore + '</div>';
                    }
                    else if (value.dockingScore < -4 && value.dockingScore > -5) {
                        returnMessage = '<div class="dockingRange" style="background-color:#FFFF99;color:black;width: 40px;">' + value.dockingScore + '</div>';
                    }
                    else if (value.dockingScore < -5 && value.dockingScore > -6) {
                        returnMessage = '<div class="dockingRange" style="background-color: #FFFF99;color:black;width: 40px;">' + value.dockingScore + '</div>';
                    }
                    else if (value.dockingScore < -6 && value.dockingScore > -7) {
                        returnMessage = '<div class="dockingRange" style="background-color: #8B8000;color:black;width: 40px;">' + value.dockingScore + '</div>';
                    }
                    else if (value.dockingScore < -7 && value.dockingScore > -8) {
                        returnMessage = '<div class="dockingRange" style="background-color: #90EE90;color:black;width: 40px;">' + value.dockingScore + '</div>';
                    }
                    else if (value.dockingScore > -8) {
                        returnMessage = '<div class="dockingRange" style="background-color:#006400;color:black;width: 40px;">' + value.dockingScore + '</div>';
                    }
                    return false;
                }
                else {
                    returnMessage = '';
                }
            });
        }

        return returnMessage;
    }
    catch (ex) {
        console.log(ex.toString());
    }
}

//dataTableFiltters();
//function dataTableFiltters() {

//    $('.data-table').dataTable({
//        "bJQueryUI": true,
//        "sPaginationType": "full_numbers",
//        "iDisplayLength": 1,
//        "aLengthMenu": [[1, 5, 10, 20, 50, 100, 200, 9999999], [1, 5, 10, 20, 50, 100, 200, "All"]],
//        "sDom": '<""l>t<"F"fp>'
//    });

//    $('select[name="tblSignaling_length"]').change(function () {

//        pageSizef = $(this).val();

//        $("#ddlCascadeNutrient").empty();
//        getSignalingCascade();

//    });

//}

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

                foodHTMLList = '';
                if (result.length > 0) {

                    foodHTMLList += '<ul>';
                    $.each(result, function (i) {

                        if (this.isCommon) {

                            var pieChart = '<div class="pieChart"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.badNutrientPercent + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';
                            if (this.foodNutrientValue > 0) {
                                foodHTMLList += '<li><div dataKey="' + this.foodID + '-' + this.foodName + '" onclick="getFoodDetails(this)"><div class="commonFood" dataKey="' + this.foodID + '" onclick=getFoodDetails(this)>' + this.foodName + ' (' + this.foodNutrientValue + ' mg/100g)' + '</div>' + pieChart + '</div></li>';
                            }
                            }
                        else {
                            if (this.foodNutrientValue > 0) {
                                foodHTMLList += '<li><div class="uncommonFoodFamily">' + this.foodName + ' (' + this.foodNutrientValue + ' mg/100g)' + '</div></li>';
                            }
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
                //$(".td_nutrientPercentage", row).text(this.nutrientPercentage + ' %');
                $(".td_nutrientPercentage", row).text(this.thisNutrientValue + this.unitName + '/100g' + ' (' + this.nutrientPercentage + '%)');

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
                
                $(".td_percentage", row).text(this.thisNutrientValue + this.unitName + '/100g' + ' (' + this.nutrientPercentage + '%)');

               // $(".td_percentage", row).text(this.nutrientPercentage + ' %');
                $(row).css('background-color', this.rowColor);
                $("#tblNutrientPercentage tbody").append(row);
                row = $("#tblNutrientPercentage thead tr").clone();
                console.log("hhhhhhhh", result)
            });
        },
        error: function (error) {

        }
    });
    $('#myModal1').modal('show');
    $('.modal-title').text(foodFamilyName);
};
//$('.data-table').on('length.dt', function (e, settings, len) {
//    alert('New page length: ' + len);
//});





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
                $("#txtFood").append('<option value="' + this.id + '">' + this.foodFamily + '</option>');
            });
            //$("#txtFood").select2();


            

            //$("#txtFoodNutrient option:not(:first)").remove();
            //$.each(r.Table1, function () {
            //    $("#txtFoodNutrient").append('<option value="' + this.id + '">' + this.NutrientNames + '</option>');
            //});
            //$("#txtFoodNutrient").select2();


        },
        error: function (error) {

        }
    });
};






var getNutrientListFood = function () {
    
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/signalingCascade.asmx/getNutrientListFood",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'foodIDS':'" + Number($("#txtFood").val()) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;
            
            $("#txtFoodNutrient option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#txtFoodNutrient").append('<option value="' + this.id + '">' + this.nutrientName + '</option>');
            });


        },
        error: function (error) {

        }
    });
}



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




function compareString(str1, str2) {
    return str1.toLowerCase().trim() == str2.toLowerCase().trim();
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