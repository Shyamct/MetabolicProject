$(document).ready(function () {
    getDisease();
});


function getDisease() {
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

            $("#ddlDisease option:not(:first)").remove();
            $.each(result.Table, function () {
                $("#ddlDisease").append('<option value="' + this.problemID + '">' + this.headName + '</option>');
            });
        },
        error: function (error) {

        }
    });
}


function getHypothesisReport() {
    var diseaseID = $("#ddlDisease").val();
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        diseaseID: diseaseID
    }

    $("#loader").show();
    $.ajax({
        type: "POST",
        url: "WebService/eraHypothesismarker.asmx/getDiseaseWiseHypothesisReport",
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
            var tr;
            var tag ;
            $("#tblReport tbody tr").remove();


            if (result.Table.length > 0) {
                $.each(result.Table, function (i, val) {
                    var mainData = JSON.parse(result.Table[i].markerList);
                    tag = '';
                    tag += '<ol>';
                    $.each(mainData, function (i, val) {
                        tag += '<li><span>' + val.nutrientName + '</span></li>';
                    });

                    tag += '</ol>';
                    tr = tr + "<tr><td>" + (i + 1) + "</td><td>" + val.rankName + "</td><td>" + tag +"</td></tr>";
                });
            }

            $("#tblReport tbody").append(tr);
            row = $("#tblReport thead tr").clone();
           
        },
        error: function (error) {

        }
    });
}