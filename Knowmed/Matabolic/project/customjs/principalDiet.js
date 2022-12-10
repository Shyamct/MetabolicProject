
var availableTags = [];
var selectedNutrientName = '';

$(document).ready(function () {
    getPathway();
    getNutrientList();
   
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




function getDiet() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        pathwayID: $("#ddlPathway").val(),
        nutrientName: selectedNutrientName
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

           
            var ActivatorB='';
            var InhibitorB='';
            var ActivatorH='';
            var InhibitorH='';
           
            var result = JSON.parse(data.d).responseValue;
            console.log("result", result);

            $.each(result.Table, function (i, val) {

                if (val.roleType == 'B') {

                    if (val.INAVtype == 'Enhancer') {
                        ActivatorB = ActivatorB + "<span>" + val.interactedNutrientName + (val.dockingScore == null ? "" : "{" + val.dockingScore + "}") + "</span>";
                    }                    
                    if (val.INAVtype == 'Inhibitor')
                    {
                        InhibitorB = InhibitorB + "<span>" + val.interactedNutrientName + (val.dockingScore == null ? "" : "{" + val.dockingScore + "}")+ "</span>";
                    }

                }


                if (val.roleType == 'B') {

                    if (val.INAVtype == 'Enhancer') {
                        ActivatorH = ActivatorH + "<span>" + val.interactedNutrientName + (val.dockingScore == null ? "" : "{" + val.dockingScore + "}") + "</span>";
                    }

                    if (val.INAVtype == 'Inhibitor') {
                        InhibitorH = InhibitorH + "<span>" + val.interactedNutrientName + (val.dockingScore == null ? "" : "{" + val.dockingScore+"}" )+ "</span>";
                    }
                }
                   
               

                //if (val.roleType == 'H') {
                //    if (val.interactedNutrientName == null || val.interactedNutrientName == undefined) {
                //    }
                //    else {
                //        HARMFUL = HARMFUL + "<span>" + val.interactedNutrientName + "</span>";
                //    }
                //}
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