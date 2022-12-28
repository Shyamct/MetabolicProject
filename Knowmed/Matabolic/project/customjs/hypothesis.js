
$(document).ready(function () {
    getDisease();
    $(".btnClose").click(function () {
        $("#modelHypothesisMarker").hide();
    });
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
        diseaseID: diseaseID,
        processID: 0,
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
            $("#tblReport").show();
            $("#tblAllReport").hide();
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
            row = $("#tblReport tbody tr").clone();
           
        },
        error: function (error) {

        }
    });
}



function getAllHypothesisReport() {
  
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
    }

    $("#loader").show();
    $.ajax({
        type: "POST",
        url: "WebService/eraHypothesismarker.asmx/getALLDiseaseWiseHypothesisReport",
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
            $("#tblReport").hide();
            $("#tblAllReport").show();

            var result = JSON.parse(data.d).responseValue;
            var tr;
            var tag;
            $("#tblAllReport tbody tr").remove();


            if (result.Table.length > 0) {
                $.each(result.Table, function (i, val) {
                    var mainProcess = JSON.parse(result.Table[i].processList);
                    var pathwayID = val.problemId;
                    tag = '';
                    tag += '<ol>';
                   
                    $.each(mainProcess, function (j, val) {

                        var countMarker = val.markerCountList.length;

                        tag += '<li><span style="cursor: pointer;" onclick="getHypothesisMarker(\'' + val.id + '\' ,' + pathwayID + ',\'' + val.rankName+'\')">' + val.rankName + '(' + countMarker + ')' + '</span></li>';
                        });
                        tag += '</ol>';
                    
                    tr = tr + "<tr><td>" + (i + 1) + "</td><td>" + val.problemName + "</td><td>" + tag + "</td></tr>";
                });
            }

            $("#tblAllReport tbody").append(tr);
            row = $("#tblAllReport tbody tr").clone();

        },
        error: function (error) {

        }
    });
}

function getHypothesisMarker(processID, diseaseID,rankName) {
  
  
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        diseaseID: diseaseID,
        processID: processID,
    }

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
            var result = JSON.parse(data.d).responseValue;
        
            var tr = '';
            var markerNames = '';

            $("#tblMarker tbody tr").empty();

            $.each(result.Table, function (i, val) {

                var finalData = JSON.parse(result.Table[i].markerList);

                $.each(finalData, function (i, val) {
                    markerNames += '<li><span>' + val.nutrientName + '</span></li>';
                });
                tr = tr + "<tr><td>" + (i + 1) + "</td><td>" + markerNames + "</td></tr>";

            });
            $("#tblMarker tbody").append(tr);
            $("#tdHeader").append(rankName);
            $("#modelHypothesisMarker").show();
        },
        error: function (error) {

        }
    });
}

function prints() {
    $("#tblReport thead tr").remove();
    $(".abc").show();

    window.print();
}