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
                            arrList.push({
                                markerName: mainData[i].nutrientName,
                                markerScore: mainData[i].calculateMarkerScore,
                                type: mainData[i].compoundType,
                            });

                        }
                        getBestMarker();

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

                                    finalMarkerScore = Number(Number.isNaN(parseInt(calculateMarkerScore)) ? 4 : parseInt(calculateMarkerScore + 4))

                                    nutrientCentral += '<li>' + '<span id="tdMarker" onclick="getInteractionNutrient(' + nutrientID + ',' + currentProcessID + ',' + finalMarkerScore + ')">' + nutrientName + "(Score=" + finalMarkerScore + ")" + '</span>' + '<br>' + '<span id="SPNroleType">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + '<span id="SPNscoreType">' + scoreType + "(" + MMSScoree + ")" + '</span>' + '<span id="SPNhighLow">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '</li>';


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

                                    
                                    finalMarkerScore = Number(Number.isNaN(parseInt(calculateMarkerScore)) ? 3 : parseInt(calculateMarkerScore + 3))

                                    nutrientSubCentral += '<li>' + '<span id="tdMarker" onclick="getInteractionNutrient(' + nutrientID + ',' + currentProcessID + ',' + finalMarkerScore + ')">' + nutrientName + "(Score=" + finalMarkerScore +")" + '</span>' + '<br>' + '<span id="SPNroleType">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + '<span id="SPNscoreType">' + scoreType + "(" + MMSScoree + ")" + '</span>' + '<span id="SPNhighLow">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '</li>';

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

                                   
                                    finalMarkerScore = Number(Number.isNaN(parseInt(calculateMarkerScore)) ? 5 : parseInt(calculateMarkerScore + 5))

                                    nutrientSpecific += '<li>' + '<span id="tdMarker" onclick="getInteractionNutrient(' + nutrientID + ',' + currentProcessID + ',' + finalMarkerScore + ')">' + nutrientName + "(Score=" + Number(Number.isNaN(finalMarkerScore) ? 5 : finalMarkerScore) +")" + '</span>' + '<br>' + '<span id="SPNroleType">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + '<span id="SPNscoreType">' + scoreType + "(" + MMSScoree + ")" + '</span>' + '<span id="SPNhighLow">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '</li>';
                                }
                            }
                        }
                      
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

function getBestMarker() {
var arrDublicateCHK = [];

    var text = '';

    $.each(arrList, function (i, value) {
        arrDublicateCHK.push(value.markerName);


        arrList2 = [];
        arrList3 = [];

        for (var i = 0; i < arrList.length; i++) {
            if (!arrList3[arrList[i].markerName]) {
                arrList2.push(arrList[i]);
                arrList3[arrList[i].markerName] = 1;
            }
        }
    });

    var counts = {};
    arrDublicateCHK.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

    var orderScore = [];
    $.each(arrList2, function (i, value) {
        var TYPE = value.type;
        var SCORE = value.markerScore;
        var NAME = value.markerName;
        $.each(counts, function (names, countScores) {
        if (TYPE != null || TYPE != '') {
            if (TYPE == 'Specific' && NAME == names) {
                var scores = parseInt(SCORE + 5);
                var allScore = parseInt(scores * countScores);
                var FINALs = Number(Number.isNaN(allScore) ? 5 : allScore)

               orderScore.push(NAME +"(Score="+ " " + FINALs);
                orderScore.sort(
                    function (a, b) { return b.match(/\d+$/) - a.match(/\d+$/) }
                );
               
                //text += '<span>' + NAME + "(Score =" + FINALs + ")" + '</span>';
            }
            else if (TYPE == 'Central' && NAME == names) {
                var scores = parseInt(SCORE + 4);
                var allScore = parseInt(scores * countScores);
                var FINALs = Number(Number.isNaN(allScore) ? 4 : allScore)
                orderScore.push(NAME + "(Score=" + " "  + FINALs);

                orderScore.sort(
                    function (a, b) { return b.match(/\d+$/) - a.match(/\d+$/) }
                );
               // text += '<span>' + NAME + "(Score =" + FINALs + ")" + '</span>';
            }
            else if (TYPE == 'Sub Central' && NAME == names) {

                var scores = parseInt(SCORE + 3);
                var allScore = parseInt(scores * countScores);
                var FINALs = Number(Number.isNaN(allScore) ? 3 : allScore)
                orderScore.push(NAME +"(Score="+ " " + FINALs);

                orderScore.sort(
                    function (a, b) { return b.match(/\d+$/) - a.match(/\d+$/) }
                );

                //text += '<span>' + NAME + "(Score =" + FINALs + ")" + '</span>';
            }
        }
        });
    });
    var newskp;
    $.each(orderScore, function (i, val) {
       // newskp = val;
        text += '<span>' + val+")" + '</span>';

    })

      // console.log("orderScore", orderScore);


      // console.log("orderScore", orderScore);



    $("#markerDIV").html(text);
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