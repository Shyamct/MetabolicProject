$(document).ready(function () {
    getMarker();
});

function getMarker() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/markerPhenomenon.asmx/getMarker",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;

            $("#dllMarker option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#dllMarker").append('<option value="' + this.markerID + '">' + this.markerName + '</option>');
            });
        },
        error: function (error) {

        }
    });
}
function getPathway() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var id = $("#dllMarker").val();
    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        "markerID": id,
    };
    $.ajax({
        type: "POST",
        url: "WebService/markerPhenomenon.asmx/getPathway",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;

            $("#dllPathway option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#dllPathway").append('<option value="' + this.markerID + '">' + this.PathwayName + '</option>');
            });
        },
        error: function (error) {

        }
    });
}


function showPhenonmenonList() {
    var id = $("#dllMarker").val();

    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        "markerID": id,
    };
    $("#loader").show();

    $.ajax({
        type: "POST",
        url: "WebService/markerPhenomenon.asmx/getPhenomenonReport",
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
                var r = JSON.parse(data.d).responseValue;
            var row = $("#tblPhenomenonReport thead tr").clone();
           
             $("#tblPhenomenonReport tbody tr").remove();
                $.each(r.Table, function (i) {           
                    $('#td_SrNo', row).text(i + 1);
                    $('#td_Phenomenon', row).text(this.PhenomenonName);
                  
                    $("#tblPhenomenonReport tbody").append(row);
                    row = $("#tblPhenomenonReport tbody tr:last").clone();
                });


        },

        error: function (error) {

        }
    });
}


$("#dllMarker").select2({
    placeholder: "Select Marker",
    allowClear: true
});