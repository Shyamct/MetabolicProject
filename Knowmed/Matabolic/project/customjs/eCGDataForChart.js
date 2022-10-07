$(function () {
    var height1 = ($(window).height() - $('#header').height() - 165);
    $(".container").height(height1);

    initControls();
});

// Marker Group Research URL
function initControls() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/GetECGLeadData",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;

            $("#ddlLead option").remove();
            $.each(r.Table, function () {
                $("#ddlLead").append('<option value="' + this.leadName + '">' + this.leadName + '</option>');
            });
        },
        error: function (result) {

        }
    });
}

function getECGData() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var leadName = $("#ddlLead option:selected").val().trim();
    var pid = $("#txtPID").val().trim();

    if (pid == '') {
        maketoast('error', 'Error', 'Please Enter PID !!');
        return;
    }
    if (leadName == '') {
        maketoast('error', 'Error', 'Please Select Lead Name !!');
        return;
    }

    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/GetECGDataForChart",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pid':'" + pid + "','leadName':'" + leadName + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;

            $(".table-wave-section").html(list[0].ecgTable);
        },
        error: function (error) {

        }
    });
}

function clear() {  
    location.reload(true);
}
