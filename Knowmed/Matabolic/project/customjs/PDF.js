
$(function () {
    var height1 = ($(window).height() - $('#header').height() - 149);
    $(".widget-content").height(height1);
    getDiseaseList();
    getAllPDF();
});

var getDiseaseList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    //var userID = Number(UtilsCache.getSession('USERDETAILS').userid);
    var userID = 1;
    $.ajax({
        type: "POST",
        url: "WebService/flowchart.asmx/getPathwayList",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'empid': '" + userID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;

            $("#ddlpathway option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#ddlpathway").append('<option value="' + this.id + '">' + this.headName + '</option>');
            });
        },
        error: function (error) {

        }
    });
};

var uploadPDF = function () {

    if ($('#ddlpathway option:selected').val() == 0) {
        maketoast('error', 'Error', "Please Select Pathway.");
        return;
    }
    var files = $('#fuPathwayPDF').get(0).files;
    if (files.length == 0) {
        maketoast('error', 'Error', "Please Upload File.");
        return;
    }

    var imageFile = new FormData();
    imageFile.append(files[0].name, files[0]);
    var timeStamp = event.timeStamp;
    $.ajax({
        url: "FileUploadHandler.ashx?timestamp=" + timeStamp,
        data: imageFile,
        processData: false,
        contentType: false,
        async: false,
        type: 'POST',
        success: function (data) {
            savePDF(data);
        },
        error: function (errorData) {
            maketoast('error', 'Error', "there was a problem uploading the file.");
        }
    });
}

var savePDF = function (fileName) {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if ($('#ddlpathway option:selected').val() == 0) {
        maketoast('error', 'Error', "Please Select Pathway.");
        return;
    }
    var obj = {
        pathwayID: $('#ddlpathway option:selected').val(),
        fileName: fileName[0],
        userID: UtilsCache.getSession('USERDETAILS').userid
    };
    $.ajax({
        type: "POST",
        url: "WebService/ActivitiesApproval.asmx/savePDF",
        data: JSON.stringify(obj),
        contentType: 'application/json',
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                getAllPDF();
                maketoast('success', 'Success', "Saved Successfully.");
            }
        },
        error: function (error) {
            maketoast('error', 'Error', error.responseJSON.d);
        }
    });
};

var getAllPDF = function () {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var obj = {
        pathwayID: $('#ddlDisease option:selected').val(),
        userID: UtilsCache.getSession('USERDETAILS').userid
    };
    $.ajax({
        type: "POST",
        url: "WebService/ActivitiesApproval.asmx/getAllPDF",
        data: JSON.stringify(obj),
        contentType: 'application/json',
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;
            if (result.length > 0) {

                console.log(result);
                var pdfListHTML = '';
                $("#pdfPreview").html('');
                var pdfList = result;
                if (pdfList && pdfList.length > 0) {
                    for (var i = 0; i < pdfList.length; i++) {
                        if (i % 4 === 0) {
                            pdfListHTML += '<div class="row-fluid" style="margin-bottom:30px;">';
                        }
                        pdfListHTML += '<div class="span3"><embed src="../project/GraphPDF/' + pdfList[i].pdfName + '" width="400" height="275" type="application/pdf"><a target="_blank" href="web/viewer.html?pdf=' + pdfList[i].pdfName + '&pathwayId=' + pdfList[i].id + '"><div style="text-transform: uppercase; margin-top:10px; font-weight:bold;">' + pdfList[i].headName + '</div></a></div>';
                        if ((i + 1) % 4 === 0) {
                            pdfListHTML += '</div>';
                        }
                    }

                    $("#pdfPreview").html(pdfListHTML);
                }
            }
        },
        error: function (error) {
            window.location.href = "../../index.html";
        }
    });
};
