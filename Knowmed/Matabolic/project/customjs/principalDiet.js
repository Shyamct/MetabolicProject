

$(document).ready(function () {
    getDiet();
});

//var userID = Number(UtilsCache.getSession('USERDETAILS').userid);

function getDiet() {

    
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
    }


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

            var tr;
            var HARMFUL;
            var BENEFICIAL;
            var ActivatorB;
            var InhibitorB;
            var ActivatorH;
            var InhibitorH;
           
            var result = JSON.parse(data.d).responseValue;
        
            $.each(result.Table, function (i, val) {

                if (val.roleType == 'B') {

                    if (val.INAVtype == 'Enhancer') {
                        ActivatorB = ActivatorB + "<span>" + val.interactedNutrientName + "</span>";
                    }
                    
                    if (val.INAVtype == 'Inhibitor')
                    {
                            console.log("yyyyy", val.interactedNutrientName);
                            InhibitorB = InhibitorB + "<span>" + val.interactedNutrientName + "</span>";
                    }
                }


                if (val.roleType == 'B') {

                    if (val.INAVtype == 'Enhancer') {
                        ActivatorH = ActivatorH + "<span>" + val.interactedNutrientName + "</span>";
                    }

                    if (val.INAVtype == 'Inhibitor') {
                        console.log("yyyyy", val.interactedNutrientName);
                        InhibitorH = InhibitorH + "<span>" + val.interactedNutrientName + "</span>";
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