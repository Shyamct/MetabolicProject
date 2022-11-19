﻿
$(document).ready(function () {
    getPathway();
    $(".btnClos").click(function () {
        $("#modelDiet").hide();
    })
});

var userID = Number(UtilsCache.getSession('USERDETAILS').userid);

function getPathway() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
    }
    $.ajax({
        type: "POST",
        url: "WebService/scoringSystem.asmx/getPathway",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
           
            $("#ddlPathway option:not(:first)").remove();
            $.each(result.Table, function () {
                $("#ddlPathway").append('<option value="' + this.id + '">' + this.headName + '</option>');
            });
        },
        error: function (error) {

        }
    });
}

function getProcess() {
    pathwayID = $("#ddlPathway").val();
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
   
        obj = {
            empid: userID,
            pathwayID: pathwayID
        }
    $.ajax({
        type: "POST",
        url: "WebService/scoringSystem.asmx/getProcess",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            $("#ddlProcess option:not(:first)").remove();
            $.each(result.Table, function () {
                $("#ddlProcess").append('<option value="' + this.processID + '">' + this.rankName + '</option>');
            });
        },
        error: function (error) {

        }
    });
}



function getReport() {
    pathwayID = $("#ddlPathway").val();
    processID = $("#ddlProcess").val();
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (processID == "") {
        processID = null;
    }
    obj = {
        empid: userID ,
        pathwayID: pathwayID,
        processID: processID
    }
    $.ajax({
        type: "POST",
        url: "WebService/scoringSystem.asmx/getReport",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            $("#tblReport tbody tr").remove();

           
            var tr;
            var nutrientCentral;
            var nutrientSubCentral;
            var nutrientSpecific;

           

            if (result.Table.length > 0) {
                $.each(result.Table, function (i, val) {
                    var currentProcessID = val.processID;

                    var mainData = JSON.parse(result.Table[i].MarkerLIST);
                    var count = 0;
                    nutrientCentral = '';
                    nutrientCentral += '<ul>';
                    if (mainData != undefined || mainData != null || mainData != 0) {
                        for (var i = 0; i < mainData.length; i++) {
                            if (mainData[i].compoundType == 'Central') {

                                var nutrientID = mainData[i].nutrientID;

                                var nutrientName = mainData[i].nutrientName;
                                var roleType = mainData[i].problemWaitage;
                                var scoreType = mainData[i].scoreType;
                                var HighLow = mainData[i].HighLow;

                                var compoundTypeScore = mainData[i].compoundTypeScore;
                                var problemWaitageScore = mainData[i].problemWaitageScore;
                                var MMSScoree = mainData[i].MMSScoree;
                                var HighLowScore = mainData[i].HighLowScore;
                               
                                var compoundTypeScoreCount = parseInt(compoundTypeScore);

                                var problemWaitageScoreCount = parseInt(problemWaitageScore);
                                var MMSScoreeCount = parseInt(MMSScoree);
                                var HighLowScoreCount = parseInt(HighLowScore);

                                console.log("compoundTypeScoreCount");
                                console.log(compoundTypeScoreCount+1);


                                var finalScore = compoundTypeScoreCount + problemWaitageScoreCount + MMSScoreeCount + HighLowScoreCount;
                                nutrientCentral += '<li>' + '<span style="font-size: x-large;color:black" onclick="showDiet(' + nutrientID + ',' + currentProcessID +')">' + nutrientName + "( Marker Score=" + finalScore + ")"+'</span>'+ '<br>' +'<span style="font-size: large;">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + scoreType + "(" + MMSScoree + ")" + '<span style="font-size: large;">' + HighLow + "(" + HighLowScore + ")"+ '</span>' + '</li>';

                                 
                            }
                        }
                    }
                    nutrientCentral += '</ul>';


                    var count = 0;
                    nutrientSubCentral = '';
                    nutrientSubCentral += '<ul>';
                    if (mainData != undefined || mainData != null || mainData != 0) {
                        for (var i = 0; i < mainData.length; i++) {
                            if (mainData[i].compoundType == 'Sub Central') {
                                var nutrientID = mainData[i].nutrientID;

                                var nutrientName = mainData[i].nutrientName;
                                var roleType = mainData[i].problemWaitage;
                                var scoreType = mainData[i].scoreType;
                                var HighLow = mainData[i].HighLow;
                                var compoundTypeScore = mainData[i].compoundTypeScore;
                                var problemWaitageScore = mainData[i].problemWaitageScore;
                                var MMSScoree = mainData[i].MMSScoree;
                                var HighLowScore = mainData[i].HighLowScore;
                                count++;

                                var compoundTypeScoreCount = parseInt(compoundTypeScore);
                                var problemWaitageScoreCount = parseInt(problemWaitageScore);
                                var MMSScoreeCount = parseInt(MMSScoree);
                                var HighLowScoreCount = parseInt(HighLowScore);

                                var finalScore = compoundTypeScoreCount + problemWaitageScoreCount + MMSScoreeCount + HighLowScoreCount;

                              

                                nutrientSubCentral += '<li>' + '<span style="font-size: x-large;color:black" onclick="showDiet(' + nutrientID + ',' + currentProcessID +')">' + nutrientName + "(  Marker Score=" + finalScore + ")" + '</span>' +'<br>'+'<span style="font-size: large;">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + scoreType + "(" + MMSScoree + ")" + '<span style="font-size: large;">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '</li>';
                              
                            }
                        }
                    }
                    nutrientSubCentral += '</ul>';


                    var count = 0;
                    nutrientSpecific = '';
                    nutrientSpecific += '<ul>';
                    if (mainData != undefined || mainData != null || mainData != 0) {
                        for (var i = 0; i < mainData.length; i++) {
                            if (mainData[i].compoundType == 'Specific') {
                                var nutrientID = mainData[i].nutrientID;

                              var nutrientName = mainData[i].nutrientName;
                                var roleType = mainData[i].problemWaitage;
                                var scoreType = mainData[i].scoreType;
                                var HighLow = mainData[i].HighLow;
                                var compoundTypeScore = mainData[i].compoundTypeScore;
                                var problemWaitageScore = mainData[i].problemWaitageScore;
                                var MMSScoree = mainData[i].MMSScoree;
                                var HighLowScore = mainData[i].HighLowScore;
                                count++;

                                var compoundTypeScoreCount = parseInt(compoundTypeScore);
                               
                                var problemWaitageScoreCount = parseInt(problemWaitageScore);
                                var MMSScoreeCount = parseInt(MMSScoree);
                                var HighLowScoreCount = parseInt(HighLowScore);
                                var finalScore = compoundTypeScoreCount + problemWaitageScoreCount + MMSScoreeCount + HighLowScoreCount;

                                nutrientSpecific += '<li>' + '<span style="font-size: x-large;color:black" onclick="showDiet(' + nutrientID + ',' + currentProcessID + ')">' + nutrientName + "(  Marker Score=" + finalScore + ")" + '</span>' + '<br>' + '<span style="font-size: large;">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + scoreType + "(" + MMSScoree + ")" + '<span style="font-size: large;">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '</li>';
                            }
                        }
                    }
                    nutrientSpecific += '</ul>';


                    tr = tr + "<tr><td>" + val.rankName +  "(" + val.processScore+")" +"</td><td>" + nutrientCentral + "</td><td>" + nutrientSubCentral + "</td><td>" + nutrientSpecific + "</td></tr>";
                });
            }
            $("#tblReport tbody").append(tr);
            row = $("#tblReport thead tr").clone();

        },
        error: function (error) {

        }
    });
}

function showDiet(nutrientID, currentProcessID) {
    
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        empid: userID,
        nutrientID: nutrientID,
         processIDINT: currentProcessID,
         pathwayID: pathwayID,
    }
    $.ajax({
        type: "POST",
        url: "WebService/scoringSystem.asmx/getReportDiet",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var tr;
            $("#tblDiet tbody tr").remove();



            $.each(result.Table, function (i, val) {


                var foodList = JSON.parse(result.Table[i].foodList);
                var foodName;

                //var foodNameList = '';
                //foodNameList += '<ul>';
                //if (foodList != null ) {
                //    for (var i = 0; i < foodList.length; i++) {
                //        foodName = foodList[i].foodID;
                //        foodNameList += '<li>' + foodName + '</li>';
                //    }
                // }
                //foodNameList += '</ul>';
                //console.log(foodNameList);


                tr = tr + "<tr><td>" + (i + 1) + "</td><td>" + val.interactedNutrientName + "   " + val.interactionType + "</td></tr>";
            });

            $('#tblDiet tbody').append(tr);
            $("#modelDiet").show();
        },
        error: function (error) {

        }
    });
}