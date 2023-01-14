
var availableTags = [];
var selectedNutrientName = '';

$(document).ready(function () {

    var url = window.location.href;
    pageName = getPageName(url);
    //pathwayID = getParameterByName('pathwayID', url);
    PID = getParameterByName('PID', url);
    nutrientName = getParameterByName('markerName', url);
    getDietMain();
 
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
        nutrientName: nutrientName,
        PID: PID,
    }
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: "WebService/principalDiet.asmx/getPIDDiet",
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

            $.each(result.Table, function (i, val) {
                if (val.isFoodTobeGiven == 1) {
                    toEat = toEat + "<span>" + val.foodName + "</span><br/>";
                }
                if (val.isFoodTobeGiven == 0)
                {
                    notToEat = notToEat + "<span>" + val.foodName + "</span><br/>";
                }
            });
            if (toEat != null || toEat != undefined) {

                $("#toEAT").append(toEat);
                $("#notTOEAT").append(notToEat);
            }

        },
        error: function (error) {
            //console.log(error);
        }
    });
}

