$(document).ready(function () {
    getAllProcess();
    $(".colorBtn").click(function () {
        $("#modelColor").hide();
    })
});

function getAllProcess() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
    }
    $.ajax({
        type: "POST",
        url: "WebService/processColor.asmx/getProcessData",
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
            var rows = '';
            $("#tblProcess tbody tr").remove();

            if (result.Table.length > 0) {
                $.each(result.Table, function (i, val) {
                    rows = rows + "<tr><td>" + (i + 1) + "</td><td>" + val.rankName + "</td><td>" + '<div  style="background-color:' + val.colors + ';height:30px;width:70px" ></div>' + "</td><td>" + '<i class="fa fa-pencil-square-o btnEditIcon" onClick="getProcessID( ' + val.id + ')"></i>' + "</td></tr>";
                });
            }
            $("#tblProcess tbody").append(rows);
            row = $("#tblProcess tbody tr").clone();
        },
        error: function (error) {

        }
    });
}

var ProcessID;
function getProcessID(processId)
{
    $("#modelColor").show();
    ProcessID = processId
}


function updateColors() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        processID: ProcessID,
        colors: $('#txtColor').val()
    }
    $.ajax({
        type: "POST",
        url: "WebService/processColor.asmx/updateProcessColor",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            getAllProcess();

            $("#modelColor").hide();
        },
        error: function (error) {

        }
    });
}