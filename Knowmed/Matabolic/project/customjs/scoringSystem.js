﻿

$(document).ready(function () {
    getPathway();
    $(".btnClos").click(function () {
        $("#modelIntaretednutrient").hide();
        $("#modelFoodList").hide();
    })
    $(".btnClosfood").click(function () {
        $("#modelFoodList").hide();
    })
    $(".btnClosfood").click(function () {
        $("#modelMarkerList").hide();
    })
});

var userID = Number(UtilsCache.getSession('USERDETAILS').userid);
var finalMarkerScore = 0;


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

var arrList = [];

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
                   
                    if (mainData != undefined || mainData != null || mainData != 0) {
                        for (var i = 0; i < mainData.length; i++) {
                            //var markeScoreList = mainData[i].nutrientName;
                            //var markeScoreList = mainData[i].nutrientName;

                            arrList.push({
                                markerName: mainData[i].nutrientName,
                                markerScore: mainData[i].calculateMarkerScore,
                                type: mainData[i].compoundType,
                            });

                        }
                    }

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
                                    var calculateMarkerScore = mainData[i].calculateMarkerScore;

                                    var compoundTypeScore = mainData[i].compoundTypeScore;
                                    var problemWaitageScore = mainData[i].problemWaitageScore;
                                    var MMSScoree = mainData[i].MMSScoree;
                                    var HighLowScore = mainData[i].HighLowScore;

                                    var compoundTypeScoreCount = parseInt(compoundTypeScore);
                                    var problemWaitageScoreCount = parseInt(problemWaitageScore);
                                    var MMSScoreeCount = parseInt(MMSScoree);
                                    var HighLowScoreCount = parseInt(HighLowScore);


                                    finalMarkerScore = compoundTypeScoreCount + Number(Number.isNaN(problemWaitageScoreCount) ? 0 : problemWaitageScoreCount) + Number(Number.isNaN(MMSScoreeCount) ? 0 : MMSScoreeCount) + Number(Number.isNaN(HighLowScoreCount) ? 0 : HighLowScoreCount);
                                    //nutrientCentral += '<li>' + '<span style="font-size: x-large;color:black;cursor: pointer;" onclick="getInteractionNutrient(' + nutrientID + ',' + currentProcessID + ',' + finalMarkerScore + ')">' + nutrientName + "(  Marker Score=" + finalMarkerScore + ")" + '</span>' + '<br>' + '<span style="font-size: large;">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + '<span style="font-size: large;">' + scoreType + "(" + MMSScoree + ")" + '</span>' + '<span style="font-size: large;">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '</li>';
                                    nutrientCentral += '<li>' + '<span id="tdMarker" onclick="getInteractionNutrient(' + nutrientID + ',' + currentProcessID + ',' + finalMarkerScore + ')">' + nutrientName + "(Score=" + finalMarkerScore + " / " + calculateMarkerScore + ")" + '</span>' + '<br>' + '<span id="SPNroleType">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + '<span id="SPNscoreType">' + scoreType + "(" + MMSScoree + ")" + '</span>' + '<span id="SPNhighLow">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '</li>';


                                }
                            }
                        }
                        nutrientCentral += '</ul>';


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
                                    var calculateMarkerScore = mainData[i].calculateMarkerScore;


                                    var compoundTypeScore = mainData[i].compoundTypeScore;
                                    var problemWaitageScore = mainData[i].problemWaitageScore;
                                    var MMSScoree = mainData[i].MMSScoree;
                                    var HighLowScore = mainData[i].HighLowScore;

                                    var compoundTypeScoreCount = parseInt(compoundTypeScore);
                                    var problemWaitageScoreCount = parseInt(problemWaitageScore);
                                    var MMSScoreeCount = parseInt(MMSScoree);
                                    var HighLowScoreCount = parseInt(HighLowScore);

                                    finalMarkerScore = compoundTypeScoreCount + Number(Number.isNaN(problemWaitageScoreCount) ? 0 : problemWaitageScoreCount) + Number(Number.isNaN(MMSScoreeCount) ? 0 : MMSScoreeCount) + Number(Number.isNaN(HighLowScoreCount) ? 0 : HighLowScoreCount);


                                    nutrientSubCentral += '<li>' + '<span id="tdMarker" onclick="getInteractionNutrient(' + nutrientID + ',' + currentProcessID + ',' + finalMarkerScore + ')">' + nutrientName + "(Score=" + finalMarkerScore + " / " + calculateMarkerScore + ")" + '</span>' + '<br>' + '<span id="SPNroleType">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + '<span id="SPNscoreType">' + scoreType + "(" + MMSScoree + ")" + '</span>' + '<span id="SPNhighLow">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '</li>';

                                }
                            }
                        }
                        nutrientSubCentral += '</ul>';


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
                                    var calculateMarkerScore = mainData[i].calculateMarkerScore;


                                    var compoundTypeScore = mainData[i].compoundTypeScore;
                                    var problemWaitageScore = mainData[i].problemWaitageScore;
                                    var MMSScoree = mainData[i].MMSScoree;
                                    var HighLowScore = mainData[i].HighLowScore;

                                    var compoundTypeScoreCount = parseInt(compoundTypeScore);
                                    var problemWaitageScoreCount = parseInt(problemWaitageScore);
                                    var MMSScoreeCount = parseInt(MMSScoree);
                                    var HighLowScoreCount = parseInt(HighLowScore);

                                    finalMarkerScore = compoundTypeScoreCount + Number(Number.isNaN(problemWaitageScoreCount) ? 0 : problemWaitageScoreCount) + Number(Number.isNaN(MMSScoreeCount) ? 0 : MMSScoreeCount) + Number(Number.isNaN(HighLowScoreCount) ? 0 : HighLowScoreCount);
                                    
                                    nutrientSpecific += '<li>' + '<span id="tdMarker" onclick="getInteractionNutrient(' + nutrientID + ',' + currentProcessID + ',' + finalMarkerScore + ')">' + nutrientName + "(Score=" + finalMarkerScore + " / " + calculateMarkerScore + ")" + '</span>' + '<br>' + '<span id="SPNroleType">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + '<span id="SPNscoreType">' + scoreType + "(" + MMSScoree + ")" + '</span>' + '<span id="SPNhighLow">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '</li>';
                                }
                            }
                        }
                        nutrientSpecific += '</ul>';


                   //var name = JSON.parse(arrList)
                   
                   // console.log("arrList", arrList);

                    tr = tr + "<tr><td id='TDprocess'>" + val.rankName + "(" + val.processScore + ")" + "</td><td>" + nutrientCentral + "</td><td>" + nutrientSubCentral + "</td><td>" + nutrientSpecific + "</td></tr>";

                    });
            }
            $("#tblReport tbody").append(tr);
            row = $("#tblReport thead tr").clone();

        },
        error: function (error) {

        }
    });
}

function abc() {
    var text = '';
    $("#modelBody").html('');

    $.each(arrList, function (i, value) {
        arrList2 = [];
        arrList3 = [];

        for (var i = 0; i < arrList.length; i++) {
            if (!arrList3[arrList[i].markerName]) {
                arrList2.push(arrList[i]);
                arrList3[arrList[i].markerName] = 1;
            }
        }
    });

    $.each(arrList2, function (i, value) {

        if (value.type != null || value.type != '') {
             if (value.type == 'Specific')
             {
               var scores= parseInt(value.markerScore+5);
                text += '<span>' + value.markerName + "/" + Number(Number.isNaN(scores) ? 0 : scores) + '<br/></span>';
              }
            else if (value.type == 'Sub Central')
            {
                var scores = parseInt(value.markerScore+3);
                text += '<span>' + value.markerName + "/" + Number(Number.isNaN(scores) ? 0 : scores ) + '<br/></span>';
            }
            else if (value.type == 'Central') {
                var scores = parseInt(value.markerScore+4);
                text += '<span>' + value.markerName + "/" + Number(Number.isNaN(scores) ? 0 : scores) + '<br/></span>';
            }

        }
    });

    $("#modelBody").html(text);
    $("#modelMarkerList").show();
}

function getInteractionNutrient(nutrientID, currentProcessID, finalMarkerScore) {
    
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
         empid: userID,
         nutrientID: nutrientID,
         processIDINT: currentProcessID,
         pathwayID: pathwayID,
        finalMarkerScore: finalMarkerScore,
    }
    $.ajax({
        type: "POST",
        url: "WebService/scoringSystem.asmx/getNurientIntruction",
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
         
            var text = '';
            $("#Interactednutrient").html('');

            $.each(result.Table, function (i, val) {
                 text += '<span id="NutrientInruction" style="padding:5px;cursor: pointer;font-size: x-large;color:black;font-weight: bold;margin-right:5px;margin-bottom:5px;display: inline-block;cursor: pointer;"  onclick="getFoodlist(' + val.interactedNutrientID + ')">' + val.interactedNutrientName + val.interactionType + val.markerScore+ '</span>';
            });
            $("#Interactednutrient").html(text);
            $("#modelIntaretednutrient").show();
        },
        error: function (error) {

        }
    });
}

function getFoodlist(interactedNutrientID) {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        empid: userID,
        interactedNutrientID: interactedNutrientID,
    }
    $.ajax({
        type: "POST",
        url: "WebService/scoringSystem.asmx/getFoodlist",
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
            var text='';

            $("#foodBody").html('');
            $.each(result.Table, function (i, val) {
                text += '<span class="foodName">' + val.foodName +  "   "+ "(" + val.nutrientValue + val.unit+")"+'</span>';
            });
            $("#foodBody").html(text);

            $("#modelFoodList").show();
        },
        error: function (error) {

        }
    });
}