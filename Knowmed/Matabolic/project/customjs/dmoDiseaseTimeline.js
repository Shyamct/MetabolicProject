

$(document).ready(function () {
    selectHeader();

    $("#btnClose").click(function () {
        $("#showFoodModel").hide();

    })
    $("#btnClosed").click(function () {
        $("#showFoodModel").hide();

    })
});


function sam(interactedNutrientID) {
    var food;

    $.ajax({
        type: "POST",
        url: "WebService/diseaseTimeline.asmx/getFoodName",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'interactedNutrientID':'" + interactedNutrientID + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {

            var r = JSON.parse(data.d).responseValue;

            //$("#modelBody tbody tr").remove();
            //$.each(r.Table, function (i, val) {
            //    console.log("values", val);
            //    alert(val.foodName);

            //    var row = $("#tblFood thead tr").clone();
            //    $("#tdSR", row).text(i + 1);
            //    $("#tdFOOD", row).text(val.foodName);
            //    $("#modelBody tbody").append(row);
            //    row = $("#modelBody body tr:last").clone();
            //});
            $("#modelBody tbody tr").remove();

            $.each(r.Table, function (i, val) {
                food = food + "<tr><td>" + (i + 1) + "</td><td>" + val.foodName + "</td></tr>";
            });

            $('#modelBody tbody').append(food);
            $("#showFoodModel").show();

        },
        error: function (error) {

        }
    });
}

function multiSelectProblem() {
    $('#ddlHeader').multiselect({
        buttonWidth: '100%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Pathway',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}

function multiSelectProcess() {
    $('#ddlRank').multiselect({
        buttonWidth: '100%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Process',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}

function selectHeader() {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $("#divloader").show();
    $.ajax({
        type: "POST",
        url: "WebService/diseaseTimeline.asmx/getDropdownHeader",
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



            $("#ddlPathway option:not(:first)").remove();
            $.each(r.Table, function (i, val) {
                $("#ddlPathway").append('<option value="' + val.id + '">' + val.headName + '</option>');
            });

            $("#ddlRank option:not(:first)").remove();
            $.each(r.Table1, function (i, val) {
                $("#ddlRank").append('<option value="' + val.rankName + '">' + val.rankName + '</option>');
            });

            bindYear('YEAR');
        },

        error: function (error) {

        }
    });
}



function bindYear(ageUnit) {
    try {
        $("#ddlAge option").remove();

        if (ageUnit == 'YEAR') {
            for (var i = 1; i <= 100; i++) {
                $("#ddlAge").append('<option value="' + i + '">' + i + '</option>');
            }
        }
        else if (ageUnit == 'MONTH') {
            for (var i = 1; i <= 12; i++) {
                $("#ddlAge").append('<option value="' + i + '">' + i + '</option>');
            }
        }
        else if (ageUnit == 'DAY') {
            for (var i = 1; i <= 30; i++) {
                $("#ddlAge").append('<option value="' + i + '">' + i + '</option>');
            }
        }
    }
    catch (exception) {
        console.log(exception.toString());
    }
}



function getStatusFor() {


}
var subTestID ;
function myReport() {

    var interactedNutrientName;
    var process;

    var rda = '';
    var tHALF = '';
    var dose1 = '';
    var dose2 = '';
    var dose3 = '';
    var dose4 = '';
    var dose5 = '';
    var dose6 = '';



    var tr;
    var pathwayID = $("#ddlPathway").val();
    var process = ($('#ddlRank').val()) ? $('#ddlRank').val().toString() : '';
    $("#loader").show();
    function countForMolecule(list, moleculeType, process) {
        var count = 0;
        if (moleculeType == 'Central') {
            count = 0;
            for (var j = 0; j < list.length; j++) {
                if (list[j].rankName == process) {
                    if (list[j].statusFor == "Central") {
                        count++;
                    }
                }
            }
        }
        else if (moleculeType == 'Sub Central') {
            count = 0;
            for (var j = 0; j < list.length; j++) {
                if (list[j].rankName == process) {
                    if (list[j].statusFor == "Sub Central") {
                        count++;
                    }
                }
            }
        }
        else if (moleculeType == 'Specific') {
            count = 0;
            for (var j = 0; j < list.length; j++) {
                if (list[j].rankName == process) {
                    if (list[j].statusFor == "Specific") {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    var markerLists;
    $.ajax({
        type: "POST",
        url: "WebService/diseaseTimeline.asmx/getReport",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayIdList':'" + pathwayID + "', 'rankList':'" + process + "', 'gender':'" + $('#ddlGender option:selected').val() + "', 'age':'" + $('#ddlAge option:selected').val() + "', 'ageUnit':'" + $('#ddlAgeUnit option:selected').val() + "', 'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {
            $("#loader").hide();
            var result = JSON.parse(data.d).responseValue;
            console.log("result", result);
            $("#tblReport tbody tr").remove();
            if (result.Table.length > 0) {
                $.each(result.Table, function (i, val) {
                    interactedNutrientName = val.interactedNutrientName;
                    interactedNutrientID = val.interactedNutrientID;

                    var rankList = JSON.parse(result.Table[i].rankList);
                    var nutrientRDAList = JSON.parse(result.Table[i].nutrientRDAList);
                    var nutrientTHalfList = JSON.parse(result.Table[i].nutrientTHalfList);

                    var nutrientTimelineList = JSON.parse(result.Table[i].nutrientTimelineList);

                    for (var m = 0; m < nutrientRDAList.length; m++) {
                        if (rda = nutrientRDAList[m].rda == 0.0) {
                            rda = "";
                        }
                        else {
                            rda = nutrientRDAList[m].rda + ' ' + nutrientRDAList[m].unitName;
                        }
                    }

                    for (var a = 0; a < nutrientTHalfList.length; a++) {
                        if (nutrientTHalfList[a].nutrientTHalfAvg == 0.0) {
                            tHALF = "";
                        }
                        else {
                            tHALF = nutrientTHalfList[a].nutrientTHalfAvg + ' ' + nutrientTHalfList[a].unitName;
                        }
                    }
                    for (var l = 0; l < nutrientTimelineList.length; l++) {
                        if (nutrientTimelineList[l].doseTime == 0.0 && nutrientTimelineList[l].predictedDoseTime == 0) {
                            dose1 = "";
                        }
                        else {
                            if (nutrientTimelineList[l].doseTime == "08:00:00" && nutrientTimelineList[l].predictedDoseTime == 1) {
                                dose1 = "Yes";
                            }
                        }

                    }
                    for (var l = 0; l < nutrientTimelineList.length; l++) {
                        if (nutrientTimelineList[l].doseTime == 0.0 && nutrientTimelineList[l].predictedDoseTime == 0) {
                            dose2 = "";
                        }
                        else {
                            if (nutrientTimelineList[l].doseTime == "10:00:00" && nutrientTimelineList[l].predictedDoseTime == 1) {
                                dose2 = "Yes";
                            }
                        }

                    }
                    for (var l = 0; l < nutrientTimelineList.length; l++) {
                        if (nutrientTimelineList[l].doseTime == 0.0 && nutrientTimelineList[l].predictedDoseTime == 0) {
                            dose3 = "";
                        }
                        else {
                            if (nutrientTimelineList[l].doseTime == "13:00:00" && nutrientTimelineList[l].predictedDoseTime == 1) {
                                dose3 = "Yes";
                            }
                        }
                    }
                    for (var l = 0; l < nutrientTimelineList.length; l++) {
                        if (nutrientTimelineList[l].doseTime == 0.0 && nutrientTimelineList[l].predictedDoseTime == 0) {
                            dose4 = "";
                        }
                        else {
                            if (nutrientTimelineList[l].doseTime == "17:00:00" && nutrientTimelineList[l].predictedDoseTime == 1) {
                                dose4 = "Yes";
                            }
                        }
                    }
                    for (var l = 0; l < nutrientTimelineList.length; l++) {
                        if (nutrientTimelineList[l].doseTime == 0.0 && nutrientTimelineList[l].predictedDoseTime == 0) {
                            dose5 = "";
                        }
                        else {
                            if (nutrientTimelineList[l].doseTime == "20:00:00" && nutrientTimelineList[l].predictedDoseTime == 1) {
                                dose5 = "Yes";
                            }
                        }

                    }
                    for (var l = 0; l < nutrientTimelineList.length; l++) {
                        if (nutrientTimelineList[l].doseTime == 0.0 && nutrientTimelineList[l].predictedDoseTime == 0) {
                            dose6 = "";
                        }
                        else {
                            if (nutrientTimelineList[l].doseTime == "23:00:00" && nutrientTimelineList[l].predictedDoseTime == 1) {
                                dose6 = "Yes";
                            }
                        }

                    }


                    var tag = 0;
                    //   tag += '<table border="1px solid black">';
                    count = rankList.length + 1;
                    for (var i = 0; i < rankList.length; i++) {
                        process = rankList[i].rankName;

                        tag += '<tr><td>' + process;
                        var central = '';
                        central += '<td><ul>';

                        var subcentral = '';
                        subcentral += '<td><ul>';
                        var specific = '';
                        specific += '<td><ul>';
                        var centralCount = 0;
                        var subCentralCount = 0;
                        var specificCount = 0;
                        var totalMarker = 0;
                        var percentage = 0;

                        var molecularWeight = '';
                        molecularWeight += '<td><ul>';
                        markerLists = JSON.parse(result.Table[i].markerList);
                       
                        for (var j = 0; j < markerLists.length; j++) {
                           
                            subTestID = markerLists[j].subtestID;
                            
                            if (process == markerLists[j].rankName) {
                                if (markerLists[j].statusFor == "Central") {

                                    var lastIndex = central.lastIndexOf('<td>');
                                    if (lastIndex == -1) {
                                    }
                                    else {
                                        var replacement = '<td style="background:#e268ed;white-space: nowrap;">';
                                        central = central.substring(0, lastIndex) + replacement + central.substring(lastIndex + 4);
                                    }
                                    // centralCount = centralCount + 1
                                    if (markerLists[j].dockingScore == undefined) {
                                        central += '<li>' + '<span onClick="skp(' + subTestID+')">'+markerLists[j].markerName +'</span>' + '<span style="font-size: 25px;color:white">' + "" +  '</li>';
                                    }
                                    else {
                                        central += '<li>' + '<span onClick="skp(' + subTestID +')">' + markerLists[j].markerName + '</span>' + '<span style="font-size: 25px;color:white">' + '(' + markerLists[j].dockingScore + ')' +  '</li>';
                                    }
                                }
                                else if (markerLists[j].statusFor == "Sub Central") {
                                    var lastIndex = subcentral.lastIndexOf('<td>');
                                    if (lastIndex == -1) {
                                    }
                                    else {
                                        var replacement = '<td style="background:#5454e8;white-space: nowrap;">';
                                        subcentral = subcentral.substring(0, lastIndex) + replacement + subcentral.substring(lastIndex + 4);
                                    }
                                    if (markerLists[j].dockingScore == undefined) {
                                        subcentral += '<li>' + '<span onClick="skp(' + subTestID +')">' + markerLists[j].markerName + '</span>'+ '<span style="font-size: 25px;color:white">' + "" +  '</li>';
                                    }
                                    else {
                                        subcentral += '<li>' + '<span onClick="skp(' + subTestID +')">' + markerLists[j].markerName + '</span>' + '<span style="font-size: 25px;color:white">' + '(' + markerLists[j].dockingScore + ')' + '</li>';
                                    }
                                }
                                else if (markerLists[j].statusFor == "Specific") {
                                    // specificCount = specificCount + 1;
                                    var lastIndex = specific.lastIndexOf('<td>');
                                    if (lastIndex == -1) {
                                    }
                                    else {
                                        var replacement = '<td style="background:#deb45b;white-space: nowrap;">';
                                        specific = specific.substring(0, lastIndex) + replacement + specific.substring(lastIndex + 4);
                                    }
                                    if (markerLists[j].dockingScore == undefined) {
                                        specific += '<li>' + '<span onClick="skp(' + subTestID +')">' + markerLists[j].markerName + '</span>' + '<span style="font-size: 25px;color:white">' + "" + '</li>';
                                    }
                                    else {
                                        specific += '<li>' + '<span onClick="skp(' + subTestID +')">' + markerLists[j].markerName + '</span>' + '<span style="font-size: 25px;color:white">' + '(' + markerLists[j].dockingScore + ')' + '</li>';
                                    }
                                }
                            }

                            molecularWeight = '';
                            molecularWeight += '<td style="white-space: nowrap;"><ul>';
                            centralCount = countForMolecule(markerLists, 'Central', process);
                            subCentralCount = countForMolecule(markerLists, 'Sub Central', process);
                            specificCount = countForMolecule(markerLists, 'Specific', process);
                            centralCal = 4 * centralCount;
                            subCenTralCal = 3 * subCentralCount;
                            specificCountCal = 5 * specificCount;
                            totalWeightage = centralCal + subCenTralCal + specificCountCal;

                            var str1 = '<li>4 * ';
                            var str2 = centralCount.toString();
                            var str3 = '= ' + centralCal.toString() + '</li>';
                            var final = str1.concat(str2, str3);
                            molecularWeight += final + '<li>3 * ' + subCentralCount + '= ' + subCenTralCal.toString() + '</li>' + '<li>5 * ' + specificCount + '= ' + specificCountCal.toString() + '</li>';
                            totalMarker = centralCount + subCentralCount + specificCount;

                            var subtotal = (totalMarker * 100) / totalWeightage;
                            var percentage = parseFloat(subtotal).toFixed(2);
                        }
                        molecularWeight += '</ul></td>';
                        specific += '</ul></td>';
                        subcentral += '</ul></td>';
                        central = central + subcentral + specific;
                        tag += central;

                        tag += '</ol></td>';
                        tag += molecularWeight;
                        tag += '<td> ' + totalMarker + ' </td>';
                        tag += '<td> ' + totalWeightage + ' </td>';
                        tag += '<td> ' + percentage + ' </td>';

                    }
                    tr = tr + "<tr><td  rowspan=" + count + ">" + '<span class="food-cell"  style="cursor: pointer;" onClick="topFood(' + interactedNutrientID + ')">' + interactedNutrientName + '</span>' + "</td><td  rowspan=" + count + ">" + rda + "</td><td rowspan=" + count + ">" + tHALF + "</td><td rowspan=" + count + ">" + dose1 + "</td><td rowspan=" + count + ">" + dose2 + "</td><td rowspan=" + count + ">" + dose3 + "</td><td rowspan=" + count + ">" + dose4 + "</td><td rowspan=" + count + ">" + dose5 + "</td><td rowspan=" + count + ">" + dose6 + "</td>" + tag + "</tr></tr>";
                });
            }

            $("#tblReport tbody").append(tr);
            row = $("#tblReport thead tr").clone();

        },
        error: function (error) {

        }
    });
}

function skp(subtestID) {
    var food = '';
    $.ajax({
        type: "POST",
        url: "http://172.16.61.6:201/API/ItemCashStoreMapping/getKitAvailableStock",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'subTestId':'" + subtestID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            $("#showTestModel").show();

            var subList = data.getAvailableStock;
           
            if (subList.length > 0) {
                for (var i = 0; i < subList.length; i++) {
                    food = food + "<tr><td>" + (i + 1) + "</td><td>" + subList[i].productionCity + "</td></tr>";
                }
              
                $('#tblTest').append(food);
            }
            
            

        },
        error: function (error) {

        }
    });
}

function topFood(interactedNutrientID) {
    var food;
    $.ajax({
        type: "POST",
        url: "WebService/diseaseTimeline.asmx/getFoodName",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'interactedNutrientID':'" + interactedNutrientID + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {

            var r = JSON.parse(data.d).responseValue;
            console.log(r);
            $("#modelBody tbody tr").remove();

            $.each(r.Table, function (i, val) {
                food = food + "<tr><td>" + (i + 1) + "</td><td>" + val.foodName + "</td></tr>";
            });

            $('#modelBody tbody').append(food);
            $("#showFoodModel").show();

        },
        error: function (error) {

        }
    });
}







//$(document).on('change', '#ddlAgeUnit', function (e) {
//    try {
//        e.preventDefault;

//        var ageUnit = $(this).val();
//        bindYear(ageUnit);
//    }
//    catch (exception) {
//        console.log(exception.toString());
//    }
//});

//$(document).on('click', '#btnShowRecord', function (e) {
//    var pathwayID = $("#ddlPathway").val();
//    console.log(pathwayID);
//    try {
//        e.preventDefault;

//        if (!UtilsCache.getSession('USERDETAILS')) {
//            window.location.href = "../../index.html";
//            return;
//        }
//  $("#loader").show();

//        $.ajax({
//            type: "POST",
//            url: "WebService/diseaseTimeline.asmx/getReport",
//            contentType: 'application/json',
//            dataType: 'json',
//            data: "{'pathwayIdList':'" + pathwayID + "', 'rankList':'" + $('#ddlRank option:selected').val() + "', 'gender':'" + $('#ddlGender option:selected').val() + "', 'age':'" + $('#ddlAge option:selected').val() + "', 'ageUnit':'" + $('#ddlAgeUnit option:selected').val() + "', 'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",

//            statusCode: {
//                401: function (xhr) {
//                    window.location.href = "../../index.html";
//                }
//            },
//            success: function (data) {
//          $("#loader").hide();

//                var r = JSON.parse(data.d).responseValue;

//                bindReportData(r.Table);
//            },

//            error: function (error) {

//            }
//        });

//    }
//    catch (exception) {
//        console.log(exception.toString());
//    }
//});
