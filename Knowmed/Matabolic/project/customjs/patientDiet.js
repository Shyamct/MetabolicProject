
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
    var h = ($(window).height() - $('#header').height() - 146);
    $(".widget-content").css("min-height", h);

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
});
function addNote() {
    $("#btnNote").click(function () {
        var pageUrlnew = $(location).attr("href").split('/');
        var pageURL = pageUrlnew[pageUrlnew.length - 1];
        window.open("Note.aspx?" + pageURL);
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
                //$('.td_srNo', row).text(i + 1);

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
    if ($('#txtPID').val().trim() != '') {
        $.ajax({
            type: "POST",
            url: "WebService/diseaseNutrientCascadeReport.asmx/getDiseaseList",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'pid':'" + $('#txtPID').val().trim() + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (data) {
                var result = JSON.parse(data.d).responseValue;
                $('#filterDiv').show();

                var pathwayHTML = '';

                if (result.Table.length > 0) {

                    $.each(result.Table, function (i) {

                        pathwayHTML += '<label class="check-container">' + this.problemName + ' <input type="checkbox" reference="0" dataKey="pathway" value="' + this.problemID + '" onclick="getProcessList();" ' + this.isChecked + '> <span class="checkmark"></span> </label>';
                    });
                }
                $('#pathwayDiv').html(pathwayHTML);
                getProcessList();

            },
            error: function (error) {

            },
            failure: function (error) {

            }
        });
    }
};

var getProcessList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    var disease = '';
    $('#pathwayDiv input:checked').each(function () {
        disease += $(this).val() + ',';
    });
    obj = {
        diseaseIDs: disease,
    };
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getProcessList",
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

            var processHTML = '';

            if (result.Table.length > 0) {

                $.each(result.Table, function (i) {

                    processHTML += '<label class="check-container">' + this.rankName + ' <input type="checkbox" reference="0" dataKey="pathway" value="' + this.rankNo + '" onclick="getCentralMoleculeList();" ' + this.isChecked + '> <span class="checkmark"></span> </label>';
                });
            }
            $('#processDiv').html(processHTML);
            getCentralMoleculeList();

        },
        error: function (error) {

        },
        failure: function (error) {

        }
    });
};

var getCentralMoleculeList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    var disease = process = '';
    $('#pathwayDiv input:checked').each(function () {
        disease += $(this).val() + ',';
    });
    $('#processDiv input:checked').each(function () {
        process += $(this).val() + ',';
    });
    obj = {
        diseaseIDs: disease,
        process: process
    };

    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getCentralMoleculeList",
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

            var centralMoleculeHTML = '';

            if (result.Table.length > 0) {
                $('#buttons').show();

                $.each(result.Table, function (i) {

                    centralMoleculeHTML += '<label class="check-container">' + this.nutrientName + ' <input type="checkbox" reference="0" dataKey="pathway" value="' + this.nutrientID + '" ' + this.isChecked + '> <span class="checkmark"></span> </label>';
                });
            }
            $('#centralMoleculeDiv').html(centralMoleculeHTML);

        },
        error: function (error) {

        },
        failure: function (error) {

        }
    });
};

var getCentralMoleculeReport = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $("#divLoader").show();

    var disease = process = cascadeNutrient = '';
    $('#pathwayDiv input:checked').each(function () {
        disease += $(this).val() + ',';
    });
    $('#processDiv input:checked').each(function () {
        process += $(this).val() + ',';
    });
    $('#centralMoleculeDiv input:checked').each(function () {
        cascadeNutrient += $(this).val() + ',';
    });

    obj = {
        diseaseIDs: disease,
        process: process,
        cascadeNutrient: cascadeNutrient
    };
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getCentralMoleculeReport",
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

            $('#showData').show();
            $("#signalingDiv").html('');

            if (result.Table && result.Table.length > 0) {
                for (var d = 0; d < result.Table.length; d++) {

                    var diseaseHTML = '<h4>' + result.Table[d].diseaseName + '</h4>';
                    var diseaseID = result.Table[d].diseaseID;

                    diseaseHTML += '<table class="table table-bordered table-striped"> <thead> <tr> <td class="td_ToEatActivator" style="width: 21.5%">Activators</td> <td class="td_ToEatInhibitor" style="width: 21.5%">Inhibitors</td> <td class="td_CascadeNutrient"></td> <td class="td_NotToEatActivator" style="width: 21.5%">Activators</td> <td class="td_NotToEatInhibitor" style="width: 21.5%">Inhibitors</td> </tr> </thead><tbody>';

                    var cascadeList = JSON.parse(result.Table[d].cascadeList);
                    if (cascadeList.length > 0) {

                        var toEatActivatorList = toEatActivatorFoodList = toEatInhibitorList = toEatInhibitorFoodList = notToEatActivatorList = notToEatActivatorFoodList = notToEatInhibitorList = notToEatInhibitorFoodList = cascadeNutrient = '';

                        $.each(cascadeList, function (i) {

                            var processList = '';
                            var phenomenonList = '';

                            var processList = '';
                            var phenomenonList = '';

                            if (this.hasOwnProperty("processList")) {

                                if (this.processList) {
                                    processList += '<div class="process-name"> Process </div><ul class="process">';
                                    var list = JSON.parse(this.processList);
                                    $.each(list, function (i) {
                                        processList += '<li>' + this.rankName + '</li>';
                                    });
                                    processList += '</ul>';
                                }
                            }

                            cascadeNutrient = '<span style="cursor:pointer;" dataKey="' + this.nutrientID + '" onclick="getNutrientFunction(this)">' + this.nutrientName + '</span>' + processList + phenomenonList;

                            if (this.hasOwnProperty("interactedElement")) {

                                toEatActivatorList = toEatActivatorFoodList = toEatInhibitorList = toEatInhibitorFoodList = notToEatActivatorList = notToEatActivatorFoodList = notToEatInhibitorList = notToEatInhibitorFoodList = '<ul>';

                                var interactedElementList = JSON.parse(this.interactedElement);

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

                                                        var pieChart = '<div class="pieChart" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                        foodFamilyHTMLList1 += '<li><div><div class="commonFoodFamily" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + nutrientID1 + '" onclick="getFood(this)">' + this.ffName + '</div>' + pieChart + '</div></li>';
                                                    }
                                                    else {
                                                        foodFamilyHTMLList1 += '<li><div class="uncommonFoodFamily" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + nutrientID1 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                                    }
                                                });

                                                foodFamilyHTMLList1 += '</ul>';
                                            }

                                            toEatActivatorList += '<li><div style="width:100%"><span class="blink1">' + this.ieName + '</span></div><div class="foodFamilyPanel">' + foodFamilyHTMLList1 + '</div></li>';
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

                                                        var pieChart = '<div class="pieChart" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                        foodFamilyHTMLList2 += '<li><div><div class="commonFoodFamily" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + nutrientID2 + '" onclick="getFood(this)">' + this.ffName + '</div>' + pieChart + '</div></li>';
                                                    }
                                                    else {
                                                        foodFamilyHTMLList2 += '<li><div class="uncommonFoodFamily" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + nutrientID2 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                                    }
                                                });

                                                foodFamilyHTMLList2 += '</ul>';
                                            }

                                            toEatInhibitorList += '<li><div style="width:100%"><span class="blink1">' + this.ieName + '</span></div><div class="foodFamilyPanel">' + foodFamilyHTMLList2 + '</div></li>';
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

                                                        var pieChart = '<div class="pieChart" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                        foodFamilyHTMLList3 += '<li><div><div class="commonFoodFamily" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + nutrientID3 + '" onclick="getFood(this)">' + this.ffName + '</div>' + pieChart + '</div></li>';
                                                    }
                                                    else {
                                                        foodFamilyHTMLList3 += '<li><div class="uncommonFoodFamily" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + nutrientID3 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                                    }
                                                });

                                                foodFamilyHTMLList3 += '</ul>';
                                            }

                                            notToEatActivatorList += '<li><div style="width:100%"><span class="blink2">' + this.ieName + '</span></div><div class="foodFamilyPanel">' + foodFamilyHTMLList3 + '</div></li>';
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

                                                        var pieChart = '<div class="pieChart" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                                        foodFamilyHTMLList4 += '<li><div><div class="commonFoodFamily" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + nutrientID4 + '" onclick="getFood(this)">' + this.ffName + '</div>' + pieChart + '</div></li>';
                                                    }
                                                    else {
                                                        foodFamilyHTMLList4 += '<li><div class="uncommonFoodFamily" diseaseID="' + diseaseID + '" dataKey="' + this.ffID + '-' + nutrientID4 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                                    }
                                                });

                                                foodFamilyHTMLList4 += '</ul>';
                                            }

                                            notToEatInhibitorList += '<li><div style="width:100%"><span class="blink2">' + this.ieName + '</span></div><div class="foodFamilyPanel">' + foodFamilyHTMLList4 + '</div></li>';
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

                            }

                            diseaseHTML += '<tr> <td class="td_ToEatActivator">' + toEatActivatorFoodList + toEatActivatorList + '</td> <td class="td_ToEatInhibitor">' + toEatInhibitorFoodList + toEatInhibitorList + '</td> <td class="td_CascadeNutrient">' + cascadeNutrient + '</td> <td class="td_NotToEatActivator">' + notToEatActivatorFoodList + notToEatActivatorList + '</td> <td class="td_NotToEatInhibitor">' + notToEatInhibitorFoodList + notToEatInhibitorList + '</td> </tr>';
                        });

                        diseaseHTML += '</tbody> </table>';

                    }

                    $("#signalingDiv").append(diseaseHTML);
                }
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
};

var getNutrientFunction = function (e) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    if ($(e).parent().has('ul[class="nutrientFunction"]').length === 0) {
        $.ajax({
            type: "POST",
            url: "WebService/cascade.asmx/getNutrientFunction",
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
    var diseaseID = foodFamilyDiv.attr('diseaseID');

    if (foodFamilyDiv.parent().parent().has('ul').length === 0) {
        $("#divLoader").show();
        $.ajax({
            type: "POST",
            url: "WebService/cascade.asmx/getFood",
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

                            foodHTMLList += '<li><div diseaseID="' + diseaseID + '" dataKey="' + this.foodID + '-' + this.foodName + '" onclick="getFoodDetails(this)"><div class="commonFoodFamily" diseaseID="' + diseaseID + '" dataKey="' + this.foodID + '" onclick=getFoodDetails(this)>' + this.foodName + ' (' + this.foodNutrientValue + ' mg/100g)' + '</div>' + pieChart + '</div></li>';
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
    var diseaseID = $(e).attr('diseaseID');

    var cascadeNutrient = '';
    $('#centralMoleculeDiv input:checked').each(function () {
        cascadeNutrient += $(this).val() + ',';
    });

    $.ajax({
        type: "POST",
        url: "WebService/signalingCascade.asmx/getFoodDetails",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'foodID':'" + foodID + "','diseaseID':'" + diseaseID + "','cascadeNutrient':'" + cascadeNutrient + "','isFiltered':'1','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
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

var getFoodFamilyDetails = function (e) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var dataArray = $(e).attr('dataKey').split('-');
    var foodFamilyID = dataArray[0];
    var foodFamilyName = dataArray[1];
    var diseaseID = $(e).attr('diseaseID');

    var cascadeNutrient = '';
    $('#centralMoleculeDiv input:checked').each(function () {
        cascadeNutrient += $(this).val() + ',';
    });

    obj = {
        diseaseID: diseaseID,
        foodFamilyID: foodFamilyID,
        process: 0,
        receptorID: 0,
        cascadeNutrient: cascadeNutrient,
        isFiltered: 1
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

function Refresh() {
    window.location = '../project/patientDiet.aspx';
}