
var availableTags = [];
var selectedNutrientName = '';
var nutrientName = '';
$(document).ready(function () {

    getPathway();

    $(".btnClos").click(function () {
        $("#processModel").hide();
    })
  
    
    //getNutrientList();

    $("#tags").autocomplete({
            source: availableTags
    });

    $('#tags').on('autocompleteselect', function (i, val) {
        selectedNutrientName = val.item.value;
    });
});

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

function getNutrientList() {
    let diseaseIDs = $("#ddlPathway").val();
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        pathwayID: diseaseIDs
    }
    $.ajax({
        type: "POST",
        url: "WebService/principalDiet.asmx/getNutrientList",
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
            $.each(result.Table, function (i, val) {
                availableTags.push(val.nutrientName);
            });
        },
        error: function (error) {

        }
    });
}


var arrayProcess = [];
function getDiet() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    
    let diseaseID = $("#ddlPathway").val();

    if (diseaseID == '' || diseaseID == 0 || diseaseID=='0') {
        alert("PLZ Select Pathway");
        return;
    }

    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        pathwayID: Number(diseaseID),
        nutrientName: selectedNutrientName,
    }
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: "WebService/principalDiet.asmx/getDiet",
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

            $("#Activator").empty();
            $("#Inhivator").empty();
            $("#Activator1").empty();
            $("#Inhivator1").empty();
            $("#processActivators").empty();

            var ActivatorB = "";
            var InhibitorB = "";
            var ActivatorH = "";
            var InhibitorH = "";
            var process = '';



            var result = JSON.parse(data.d).responseValue;
            console.log("result", result);
            //$.each(result.Table1, function (i, val) {
            //    var finalData = JSON.parse(val.FinalData);

                
            //    if (val.RoleType == 'B') {
            //        $.each(finalData, function (i, vals) {
            //            //arrayProcess.push(vals.rankName);
            //            console.log(vals);
            //            if (vals.statusFor == 'Enhancer                      ') {
            //                //ActivatorB = ActivatorB + "<span tooltip="+vals.rankName+">" + vals.interactedNutrientName + (vals.affinityScore == null ? "" : "{" + vals.affinityScore + "}") + "</span>";
            //                ActivatorB = ActivatorB + "<span  data-toggle='tooltip' data-placement='bottom' title=" + vals.rankName + "  class='red-tooltip'>" + vals.colorsNutrient + (vals.affinityScore == null ? "" : "{" + vals.affinityScore + "}") + "</span>"

            //            }
            //            if (vals.statusFor == 'Inhibitor                     ') {
            //                InhibitorB = InhibitorB + "<span data-toggle='tooltip' data-placement='bottom' title=" + vals.rankName + "  class='red-tooltip'>" + vals.colorsNutrient + (vals.affinityScore == null ? "" : "{" + vals.affinityScore + "}") + "</span>";
            //            }
            //        });

            //    }


            //    if (val.RoleType == 'H') {
            //        $.each(finalData, function (i, vals) {
            //            console.log(vals);
            //            arrayProcess.push(vals.rankName);
            //            if (vals.statusFor == 'Enhancer                      ') {
            //                ActivatorH = ActivatorH + "<span title=" + vals.rankName + ">" + vals.colorsNutrient + (vals.affinityScore == null ? "" : "{" + vals.affinityScore + "}") + "</span>";
            //            }
            //            if (vals.statusFor == 'Inhibitor                     ') {

            //                InhibitorH = InhibitorH + "<span title=" + vals.rankName + ">" + vals.colorsNutrient + (vals.affinityScore == null ? "" : "{" + vals.affinityScore + "}") + "</span>";
            //            }
            //        });
            //    }
            //});

            //if (ActivatorB != null || ActivatorH != undefined || InhibitorB != null || InhibitorH != undefined) {
            //    $("#Activator").append(ActivatorB);
            //    $("#Inhivator").append(InhibitorB);
            //    $("#Activator1").append(ActivatorH);
            //    $("#Inhivator1").append(InhibitorH);
            //}



            $.each(result.Table, function (i, vals) {

                var finalData = JSON.parse(vals.processLIST);
                //var process = '';
                //$.each(finalData, function (i, values) {
                //    process = "<span>"+values.rankName+"</span>";
                //});
                //$("#processDiv").append(process);


                


                if (vals.roleType == 'B') {
                    if (vals.statusFor == 'Enhancer                      ') {
                        ActivatorB = ActivatorB + "<span style='cursor:pointer' onclick='getProcessName(" + vals.IntractedNutrientID + "," + "\"" + vals.statusFor + "\"," + "\"" + vals.roleType + "\")'>" + vals.IntractedNutrientName + "</span>";
                         }
                           
                    if (vals.statusFor == 'Inhibitor                     ') {
                        InhibitorB = InhibitorB + "<span style='cursor:pointer' onclick='getProcessName(" + vals.IntractedNutrientID + "," + "\"" + vals.statusFor + "\"," +"\"" + vals.roleType + "\")'>" + vals.IntractedNutrientName + "</span>";
                        }
                }
                if (vals.roleType == 'H') {
                    if (vals.statusFor == 'Enhancer                      ') {
                        ActivatorH = ActivatorH + "<span style='cursor:pointer' onclick='getProcessName(" + vals.IntractedNutrientID + "," + "\"" + vals.statusFor + "\"," + "\"" + vals.roleType + "\")'>" + vals.IntractedNutrientName + "</span>";
                    }
                    if (vals.statusFor == 'Inhibitor                     ') {
                        InhibitorH = InhibitorH + "<span style='cursor:pointer' onclick='getProcessName(" + vals.IntractedNutrientID + "," + "\"" + vals.statusFor + "\"," + "\"" + vals.roleType + "\")'>" + vals.IntractedNutrientName + "</span>";
                    }
                }
            });

            $("#Activator").append(ActivatorB);
            $("#Inhivator").append(InhibitorB);
            $("#Activator1").append(ActivatorH);
            $("#Inhivator1").append(InhibitorH);

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getProcessName(nutrientID, statusFor, roleType)
{
    console.log(nutrientID);
    let diseaseID = $("#ddlPathway").val();
   
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        pathwayID: Number(diseaseID),
        nutrientName: selectedNutrientName,
        intractedNutrientID: nutrientID,
        statusFor: statusFor,
        roleType: roleType
    }
    
    $.ajax({
        type: "POST",
        url: "WebService/principalDiet.asmx/getProcessList",
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
            var processName = '';
            $("#processModelDiv").html('');

            $.each(result.Table, function (index, value) {
                $("#processHeader").text('');

                var clickNutrientName = value.IntractedNutrientName;
                var processList = JSON.parse(value.processLIST);

                $.each(processList, function (i, val) {
                    processName = '<span style="padding:5px;font-size: x-large;color:black;background-color:' + val.colors + ';font-weight: bold;margin-right:5px;margin-bottom:5px;display: inline-block;border:1px solid black" >' + val.rankName + '</span>';
                    $("#processModelDiv").append(processName);
                });
                $("#processHeader").append(clickNutrientName);
                $("#processModel").show();
            });
        },
        error: function (error) {

        }
    });
}

