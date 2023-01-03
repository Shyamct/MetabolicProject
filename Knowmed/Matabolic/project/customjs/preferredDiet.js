
var availableTags = [];
var selectedNutrientName = '';

$(document).ready(function () {

    var url = window.location.href;
    pageName = getPageName(url);
    pathwayID = getParameterByName('pathwayID', url);
    nutrientName = getParameterByName('markerName', url);
    getDietMain();
    //getDiet();
    //getPathway();
    //getNutrientList();

    //$("#tags").autocomplete({
    //        source: availableTags
    //});

    //$('#tags').on('autocompleteselect', function (i, val) {
    //    selectedNutrientName = val.item.value;
    //});
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
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
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


function getDietMain() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $("#txtNutrientName").append(nutrientName);

    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        pathwayID: Number(pathwayID),
        nutrientName: nutrientName,
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

            $("#toEAT").empty();
            $("#notTOEAT").empty();

            var toEat = '';
            var notToEat = '';
            var result = JSON.parse(data.d).responseValue;

            $.each(result.Table2, function (i, val) {
                if (val.isFoodTobeGiven == 1) {
                    toEat = toEat + "<span>" + val.foodName + "</span><br/>";
                }
                if (val.isFoodTobeGiven == 0) {
                    notToEat = notToEat + "<span>" + val.foodName + "</span><br/>";
                }
            });
            if (toEat != null || toEat != undefined) {

                $("#toEAT").append(toEat);
                $("#notTOEAT").append(notToEat);
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getDiet() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    //pathwayID: $("#ddlPathway").val(),
    //    nutrientName: selectedNutrientName
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        pathwayID: Number(pathwayID),
        nutrientName: nutrientName,
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

            var ActivatorB = "";
            var InhibitorB = "";
            var ActivatorH = "";
            var InhibitorH = "";




            var result = JSON.parse(data.d).responseValue;


            $.each(result.Table1, function (i, val) {
                var finalData = JSON.parse(val.FinalData);

                if (val.RoleType == 'B') {

                    $.each(finalData, function (i, vals) {
                        if (vals.statusFor == 'Enhancer                      ') {
                            ActivatorB = ActivatorB + "<span>" + vals.interactedNutrientName + (vals.affinityScore == null ? "" : "{" + vals.affinityScore + "}") + "</span>";
                        }
                        if (vals.statusFor == 'Inhibitor                     ') {
                            InhibitorB = InhibitorB + "<span>" + vals.interactedNutrientName + (vals.affinityScore == null ? "" : "{" + vals.affinityScore + "}") + "</span>";
                        }
                    });

                }


                if (val.RoleType == 'H') {


                    $.each(finalData, function (i, vals) {
                        if (vals.statusFor == 'Enhancer                      ') {
                            ActivatorH = ActivatorH + "<span>" + vals.interactedNutrientName + (vals.affinityScore == null ? "" : "{" + vals.affinityScore + "}") + "</span>";

                        }
                        if (vals.statusFor == 'Inhibitor                     ') {

                            InhibitorH = InhibitorH + "<span>" + vals.interactedNutrientName + (vals.affinityScore == null ? "" : "{" + vals.affinityScore + "}") + "</span>";
                        }
                    });

                }




            });
            if (ActivatorB != null || ActivatorH != undefined || InhibitorB != null || InhibitorH != undefined) {
                $("#Activator").append(ActivatorB);
                $("#Inhivator").append(InhibitorB);
                $("#Activator1").append(ActivatorH);
                $("#Inhivator1").append(InhibitorH);
            }



        },
        error: function (error) {
            console.log(error);
        }
    });
}