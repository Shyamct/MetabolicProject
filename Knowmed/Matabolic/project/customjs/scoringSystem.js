

$(document).ready(function () {
    getPathway();
    $(".btnClos").click(function () {
        $("#modelIntaretednutrient").hide();
        $("#modelFoodList").hide();
    })
    $(".btnClosfood").click(function () {
        $("#modelFoodList").hide();
        $("#modelScore").hide();
    })
    $(".btnClosfood").click(function () {
        $("#modelMarkerList").hide();
    })
    $(".editBtnCancel").click(function () {
        $("#modelEdit").hide();
    })
    $(".editBtnSave").click(function () {
        $("#modelEdit").hide();
    })
    $(".btnCloseTest").click(function () {
        $("#modelTestMarker").hide();
    })
    
    $(".btnCloseTest").click(function () {
        $("#vitalScore").hide();
    })
});

var userID = Number(UtilsCache.getSession('USERDETAILS').userid);
var finalMarkerScore = 0;

function multiSelectDisease() {
    $('#ddlPathway').multiselect({
        includeSelectAllOption: true,
        nonSelectedText: 'Select Disease',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}
var DiseaseNAme =[];
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
           
            //$("#ddlPathway option:not(:first)").remove();
            //$.each(result.Table, function () {
            //    $("#ddlPathway").append('<option value="' + this.id + '">' + this.headName + '</option>');
            //});
            
            $("#ddlPathway option:not(:first)").remove();

            $.each(result.Table, function () {
                
                    $("#ddlPathway").append('<option value="' + this.id + '">' + this.headName + '</option>');
              });
           
                $('#ddlPathway').prop("multiple", "multiple");
                multiSelectDisease();
                $("#ddlPathway").multiselect("clearSelection");
           
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
    var diseaseID = pathwayID.toString();
    
        obj = {
            empid: userID,
            pathwayID: diseaseID,
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
var arrTestMarkerList = [];

function getReport() {
    
    var pathwayID = $("#ddlPathway").val();
    
   var  processID = $("#ddlProcess").val();
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var diseaseID = pathwayID.toString();
    if (diseaseID == "" || diseaseID == 0) {
        alert("PlZ select pathway");
        return;
    }
    if (processID == "") {
        processID = null;
    }
    obj = {
        empid: userID ,
        pathwayID: diseaseID,
        processID: processID
    }
    $("#loader").show();
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
            $("#loader").hide();

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
                                    processSCORE: val.processScore,
                                    pathwayNAME: val.pathwayName,
                                });
                            }
                         // getBestMarker();
                            //getMarkerWithScore();

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
                                    var studyForName = mainData[i].studyForName;
                                    var studyForScore = mainData[i].studyForScore;
                                    var researchYear = mainData[i].researchYear;
                                    var researchYearScore = mainData[i].researchYearScore;

                                    finalMarkerScore = Number(Number.isNaN(parseInt(calculateMarkerScore)) ? (4 + val.processScore) : parseInt((calculateMarkerScore + 4 + val.processScore)))

                                    nutrientCentral += '<li>' + '<span id="tdMarker" onclick="getInteractionNutrient(' + nutrientID + ',' + currentProcessID + ',' + finalMarkerScore + ',' + '\'' + nutrientName + '\')">' + nutrientName + "(Score=" + finalMarkerScore + ")" + '</span>' + '<br>' + '<span id="SPNroleType">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + '<span id="SPNscoreType">' + scoreType + "(" + MMSScoree + ")" + '</span>' + '<span id="SPNhighLow">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '<span id="studyForName">' + studyForName + "(" + studyForScore + ")" + '</span>' + '<span id="researchYear">' + researchYear + "(" + researchYearScore + ")" + '</span>'+'</li>';


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
                                    var studyForName = mainData[i].studyForName;
                                    var studyForScore = mainData[i].studyForScore;
                                    var researchYear = mainData[i].researchYear;
                                    var researchYearScore = mainData[i].researchYearScore;

                                    finalMarkerScore = Number(Number.isNaN(parseInt(calculateMarkerScore)) ? (3 + val.processScore) : parseInt((calculateMarkerScore + 3 + val.processScore)))

                                    nutrientSubCentral += '<li>' + '<span id="tdMarker" onclick="getInteractionNutrient(' + nutrientID + ',' + currentProcessID + ',' + finalMarkerScore + ',' + '\'' + nutrientName + '\')">' + nutrientName + "(Score=" + finalMarkerScore + ")" + '</span>' + '<br>' + '<span id="SPNroleType">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + '<span id="SPNscoreType">' + scoreType + "(" + MMSScoree + ")" + '</span>' + '<span id="SPNhighLow">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '<span id="studyForName">' + studyForName + "(" + studyForScore + ")" + '</span>' + '<span id="researchYear">' + researchYear + "(" + researchYearScore + ")" + '</span>'+'</li>';

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
                                    var studyForName  = mainData[i].studyForName ;
                                    var studyForScore = mainData[i].studyForScore;
                                    var researchYear = mainData[i].researchYear;
                                    var researchYearScore = mainData[i].researchYearScore;


                                    finalMarkerScore = Number(Number.isNaN(parseInt(calculateMarkerScore)) ? (5 + val.processScore) : parseInt((calculateMarkerScore + 5 + val.processScore)))

                                    nutrientSpecific += '<li>' + '<span id="tdMarker" onclick="getInteractionNutrient(' + nutrientID + ',' + currentProcessID + ',' + finalMarkerScore + ',' + '\'' + nutrientName + '\')">' + nutrientName + "(Score=" + Number(Number.isNaN(finalMarkerScore) ? 5 : finalMarkerScore) + ")" + '</span>' + '<br>' + '<span id="SPNroleType">' + roleType + "(" + problemWaitageScore + ")" + '</span>' + '<span id="SPNscoreType">' + scoreType + "(" + MMSScoree + ")" + '</span>' + '<span id="SPNhighLow">' + HighLow + "(" + HighLowScore + ")" + '</span>' + '<span id="studyForName">' + studyForName + "(" + studyForScore + ")" + '</span>' + '<span id="researchYear">' + researchYear + "(" + researchYearScore + ")" + '</span>'+'</li>';
                                }
                            }
                        }
                        nutrientSpecific += '<ul>';/// ME optional

                        tr = tr + "<tr><td style='color:black !important;font-size: large !important;'>" + val.pathwayName + "</td><td id='TDprocess'>" + val.rankName + "(" + val.processScore + ")" + "</td><td>" + nutrientCentral + "</td><td>" + nutrientSubCentral + "</td><td>" + nutrientSpecific + "</td></tr>";
                    });
                }
                $("#tblReport tbody").append(tr);
                row = $("#tblReport thead tr").clone();




            var bindMarker = '';
            $.each(result.Table1, function (i, val) {
               
                    bindMarker += "<p style='font-size:larger;' onclick='goTODietreport(\"" + val.nutrientName + "\")'>" + val.pathwayName + ']' + val.nutrientNameColor + '[' + val.FinalNutrientSCORE + ']' + "</p>";
            });
            $("#markerDIV").html(bindMarker);

            $.each(result.Table2, function (i, val) {
             
                arrTestMarkerList.push({
                    pathwayName: val.pathwayName,
                    markerName: val.nutrientName,
                    categoryName: val.categoryName,
                    testName: val.displayName
                    
                })
            });
        },
        error: function (error) {

        }
    });
}







function getTestMarker() {
    $("#modelTestMarker").show();

    $("#testMarker tbody tr").remove();
    let testNutrient = '';
    $.each(arrTestMarkerList, function (i, val) {
        testNutrient += "<tr><td>" + val.pathwayName + "</td><td>" + val.markerName + "</td><td>" + val.categoryName + "</td><td>" + val.testName + "</td></tr>"
    });
   
    $("#testMarker tbody").append(testNutrient);
    row = $("#testMarker thead tr").clone();

}




function goTODietreport(Nutrientname)
{
    var PID = $("#txtPID").val();
    if (PID == null || PID == undefined || PID=="") {
        alert("ENTER PID");
        return;
    }
    //var pathID = $("#ddlPathway").val();

    window.location.href = "../project/principalDiet.aspx?PID=" + PID + "&markerName=" + (Nutrientname.trim()) + "";
}


function getInteractionNutrient(nutrientID, currentProcessID, finalMarkerScore, nutrientName) {

    var diseaseID = pathwayID.toString();
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $("#intretectedHeader").append(nutrientName);
    obj = {
         empid: userID,
         nutrientID: nutrientID,
         processIDINT: currentProcessID,
        pathwayID: diseaseID[0],
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


function getScore() {
    var pathwayID = $("#ddlPathway").val();

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var diseaseID = pathwayID.toString();
    if (diseaseID == "" || diseaseID == 0) {
        alert("PlZ select pathway");
        return;
    }
    obj = {
        //empid: userID,
        empid: userID,
        pathwayID: diseaseID
    }
    $.ajax({
        type: "POST",
       // url: "WebService/scoringSystem.asmx/getOnlyScore",
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
            var tr = '';
          
            $("#tblScore tbody tr").empty();
            
            $.each(result.Table, function (i, val) {  
                tr = tr + "<tr><td>" + val.headName + "</td><td>" + val.rankName + "</td><td>" + val.processScore + "</td><td>" + '<i class="fa fa-pencil-square-o btnEditIcon" onClick="scoreEDIT( \'' + val.rankName + '\' ,'+ val.processScore + ')"></i>' + "</td></tr>";
            });   
            $("#tblScore tbody").append(tr);
            $("#modelScore").show();
        },
        error: function (error) {

        }
    });
}

 var  rankName;

function scoreEDIT(rank, score) {
    rankName = rank;
   $("#txtScore").val(score)
    $("#modelEdit").show();
}
function saveScore() {

    var score = $("#txtScore").val();
    var pathwayID = $("#ddlPathway").val();

    var diseaseID = pathwayID.toString();
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        empid: userID,
        score: score,
        rankName: rankName,
        pathwayID: diseaseID,
    }
    $.ajax({
        type: "POST",
        url: "WebService/scoringSystem.asmx/updateScore",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
        
            getScore();

        },
        error: function (error) {
        }
    });
}

function getVitalScore() {
    let PID = $("#txtPID").val();

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (PID == null || PID == undefined || PID == "") {
        alert("ENTER PID");
        return;
    }

    obj = {
        empid: userID,
        PID: PID
    }
    $.ajax({
        type: "POST",
        url: "WebService/scoringSystem.asmx/getVitalScore",
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
            var tr = '';
            $("#vitalScore tbody tr").empty();

            $.each(result.Table, function (i, val) {
                tr = tr + "<tr><td>" + (i + 1) + "</td><td>" + val.vitalName + "</td><td>" + val.vmValue + "</td><td>" + val.score + "</td></tr>";
            });
            $("#vitalScore tbody").append(tr);
            $("#vitalScore").show();
        },
        error: function (error) {

        }
    });

}