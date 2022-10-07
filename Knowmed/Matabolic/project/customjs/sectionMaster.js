$(function () {    
    var height1 = ($(window).height() - $('#header').height() - 206);
    $(".tableContent").height(height1);

    getSection();
    //getSubSection();
    getStartPoint();
    getEndPoint();
});

// Section Master
var sectionID = 0;
function saveSection() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var sectionName = $('#txtSection').val().trim();
    if (sectionName == '') {
        maketoast('error', 'Error', 'Please Enter Section Name');
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/saveSection",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + sectionID + "','sectionName':'" + sectionName + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {   
                clear();
                getSection();                
                maketoast('success', 'Success', 'Save Successfully.');
            }
        },
        error: function (error) {
            maketoast('error', 'Error', error.responseJSON.d);
        }
    });
}

function editSection(id) {
    sectionID = id;

    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/getSection",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + sectionID + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;
            if (list) {
                if (list.length > 0) {
                    $('#txtSection').val(list[0].sectionName);
                }
            }
        },
        error: function (error) {

        }
    });
}

function deleteSection(id) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (confirm("Are you sure want to delete?")) {
        $.ajax({
            type: "POST",
            url: "WebService/SVGWebService.asmx/deleteSection",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'id': '" + id + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.responseCode == 1) { 
                    clear();
                    getSection();
                    maketoast('success', 'Success', 'Delete Successfully.');
                }
            },
            error: function (error) {
                maketoast('error', 'Error', error.responseJSON.d);
            }
        });
    }
}

function getSection() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/getSection",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + sectionID + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;

            var row = $("#tblSection thead tr").clone();
            $("#tblSection tbody tr").remove();
            $.each(list, function (index) {
                $(".td_Sno", row).text(index + 1);
                $(".td_Section", row).text(this.sectionName);
                $(".td_Action", row).html('<i class="icon-edit" style="cursor:pointer;" onclick="editSection(' + this.id + ')"></i> | <i class="icon-trash" style="cursor:pointer;"  onclick="deleteSection(' + this.id + ')"></i>');
                $("#tblSection tbody").append(row);
                row = $("#tblSection thead tr").clone();
            });
        },
        error: function (error) {

        }
    });
}

// Sub Section Master
var subSectionID = 0;
function saveSubSection() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var subSectionName = $('#txtSubSection').val().trim();
    if (subSectionName == '') {
        maketoast('error', 'Error', 'Please Enter Sub-Section Name');
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/saveSubSection",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + subSectionID + "','subSectionName':'" + subSectionName + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                clear();
                getSubSection();
                maketoast('success', 'Success', 'Save Successfully.');
            }
        },
        error: function (error) {
            maketoast('error', 'Error', error.responseJSON.d);
        }
    });
}

function editSubSection(id) {
    subSectionID = id;

    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/getSubSection",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + subSectionID + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;
            if (list) {
                if (list.length > 0) {
                    $('#txtSubSection').val(list[0].subSectionName);
                }
            }
        },
        error: function (error) {

        }
    });
}

function deleteSubSection(id) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (confirm("Are you sure want to delete?")) {
        $.ajax({
            type: "POST",
            url: "WebService/SVGWebService.asmx/deleteSubSection",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'id': '" + id + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.responseCode == 1) {
                    clear();
                    getSubSection();
                    maketoast('success', 'Success', 'Delete Successfully.');
                }
            },
            error: function (error) {
                maketoast('error', 'Error', error.responseJSON.d);
            }
        });
    }
}

function getSubSection() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/getSubSection",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + subSectionID + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;

            var row = $("#tblSubSection thead tr").clone();
            $("#tblSubSection tbody tr").remove();
            $.each(list, function (index) {
                $(".td_Sno", row).text(index + 1);
                $(".td_SubSection", row).text(this.subSectionName);
                $(".td_Action", row).html('<i class="icon-edit" style="cursor:pointer;" onclick="editSubSection(' + this.id + ')"></i> | <i class="icon-trash" style="cursor:pointer;"  onclick="deleteSubSection(' + this.id + ')"></i>');
                $("#tblSubSection tbody").append(row);
                row = $("#tblSubSection thead tr").clone();
            });
        },
        error: function (error) {

        }
    });
}

// Start Point Master
var startPointID = 0;
function saveStartPoint() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var startPoint = $('#txtStartPoint').val().trim();
    if (startPoint == '') {
        maketoast('error', 'Error', 'Please Enter Start Point');
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/saveStartPoint",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + startPointID + "','startPoint':'" + startPoint + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                clear();
                getStartPoint();               
                maketoast('success', 'Success', 'Save Successfully.');
            }
        },
        error: function (error) {
            console.log(error);
            maketoast('error', 'Error', error.responseJSON.d);
        }
    });
}

function editStartPoint(id) {
    startPointID = id;

    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/getStartPoint",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + startPointID + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;
            if (list) {
                if (list.length > 0) {
                    $('#txtStartPoint').val(list[0].startPoint);
                }
            }
        },
        error: function (error) {

        }
    });
}

function deleteStartPoint(id) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (confirm("Are you sure want to delete?")) {
        $.ajax({
            type: "POST",
            url: "WebService/SVGWebService.asmx/deleteStartPoint",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'id': '" + id + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.responseCode == 1) {
                    clear();
                    getStartPoint();                    
                    maketoast('success', 'Success', 'Delete Successfully.');
                }
            },
            error: function (error) {
                maketoast('error', 'Error', error.responseJSON.d);
            }
        });
    }
}

function getStartPoint() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/getStartPoint",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + startPointID + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;

            var row = $("#tblStartPoint thead tr").clone();
            $("#tblStartPoint tbody tr").remove();
            $.each(list, function (index) {
                $(".td_Sno", row).text(index + 1);
                $(".td_StartPoint", row).text(this.startPoint);
                $(".td_Action", row).html('<i class="icon-edit" style="cursor:pointer;" onclick="editStartPoint(' + this.id + ')"></i> | <i class="icon-trash" style="cursor:pointer;"  onclick="deleteStartPoint(' + this.id + ')"></i>');
                $("#tblStartPoint tbody").append(row);
                row = $("#tblStartPoint thead tr").clone();
            });
        },
        error: function (error) {

        }
    });
}

// End Point Master
var endPointID = 0;
function saveEndPoint() {
    var endPoint = $('#txtEndPoint').val().trim();
    if (endPoint == '') {
        maketoast('error', 'Error', 'Please Enter End Point');
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/saveEndPoint",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + endPointID + "','endPoint':'" + endPoint + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                clear();
                getEndPoint();                
                maketoast('success', 'Success', 'Save Successfully.');
            }
        },
        error: function (error) {
            maketoast('error', 'Error', error.responseJSON.d);
        }
    });
}

function editEndPoint(id) {
    endPointID = id;

    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/getEndPoint",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + endPointID + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;
            if (list) {
                if (list.length > 0) {
                    $('#txtEndPoint').val(list[0].endPoint);
                }
            }
        },
        error: function (error) {

        }
    });
}

function deleteEndPoint(id) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (confirm("Are you sure want to delete?")) {
        $.ajax({
            type: "POST",
            url: "WebService/SVGWebService.asmx/deleteEndPoint",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'id': '" + id + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.responseCode == 1) {
                    clear();
                    getEndPoint();                    
                    maketoast('success', 'Success', 'Delete Successfully.');
                }
            },
            error: function (error) {
                maketoast('error', 'Error', error.responseJSON.d);
            }
        });
    }
}

function getEndPoint() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/getEndPoint",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + endPointID + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;

            var row = $("#tblEndPoint thead tr").clone();
            $("#tblEndPoint tbody tr").remove();
            $.each(list, function (index) {
                $(".td_Sno", row).text(index + 1);
                $(".td_EndPoint", row).text(this.endPoint);
                $(".td_Action", row).html('<i class="icon-edit" style="cursor:pointer;" onclick="editEndPoint(' + this.id + ')"></i> | <i class="icon-trash" style="cursor:pointer;"  onclick="deleteEndPoint(' + this.id + ')"></i>');
                $("#tblEndPoint tbody").append(row);
                row = $("#tblEndPoint thead tr").clone();
            });
        },
        error: function (error) {

        }
    });
}

function activeDiv(e) {
    $('.active-div').css('box-shadow', '');
    $(e).css('box-shadow', '10px 3px 20px rgba(0,0,0,0.3)');
}

function clear() {
    $('#txtSection').val('');
    $('#txtSubSection').val('')
    $('#txtStartPoint').val('');
    $('#txtEndPoint').val('');
    sectionID = 0;
    subSectionID = 0;
    startPointID = 0;
    endPointID = 0;
}
