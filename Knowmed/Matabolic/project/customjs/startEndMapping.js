var mappingId = 0;
var addedMarkerList = [];

$(function () {
    var height1 = ($(window).height() - $('#header').height() - 146);
    $(".tableContent1").height(height1);
    $(".tableContent2").height(height1 - 21);

    initControls();
    getMarkerStartEndMapping();
});

// Marker Start End Mapping
function initControls() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/initControls",
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

            $("#ddlPathway option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#ddlPathway").append('<option value="' + this.id + '">' + this.headName + '</option>');
            });

            $("#ddlSection option:not(:first)").remove();
            $.each(r.Table1, function () {
                $("#ddlSection").append('<option value="' + this.id + '">' + this.sectionName + '</option>');
            });

            $("#ddlStartPoint option:not(:first)").remove();
            $.each(r.Table2, function () {
                $("#ddlStartPoint").append('<option value="' + this.id + '">' + this.startPoint + '</option>');
            });

            $("#ddlEndPoint option:not(:first)").remove();
            $.each(r.Table3, function () {
                $("#ddlEndPoint").append('<option value="' + this.id + '">' + this.endPoint + '</option>');
            });

            $("#ddlSubSection option:not(:first)").remove();
            $.each(r.Table4, function () {
                $("#ddlSubSection").append('<option value="' + this.id + '">' + this.subSectionName + '</option>');
            });

        },
        error: function (result) {

        }
    });
}

function AddMarker() {

    var markerName = $("#txtMarker").val().trim();
    var role = $("#ddlMarkerRole option:selected").val().trim();
    if (markerName == '') {
        maketoast('error', 'Error', 'Please Enter Marker');
        return false;
    }
    //if (addedMarkerList.some(data => data.markerName === markerName)) {
    //    maketoast('error', 'Error', 'Already Added');
    //    return false;
    //}
    addedMarkerList.push({
        markerName: markerName,
        role: role
    });

    $("#txtMarker").val('');
    bindMarker();
}

function editMarker(index, markerName, role) {
    deleteMarker(index);
    $("#txtMarker").val(markerName);
    $("#ddlMarkerRole").val(role);
    $("#txtMarker").focus();
}

function deleteMarker(index) {
    addedMarkerList.splice(index, 1);
    bindMarker();
}

function bindMarker() {
    var row = $("#tblMarker thead tr").clone();
    $("#tblMarker tbody tr").remove();

    $.each(addedMarkerList, function (i) {
        $(".td_Sno", row).text(i + 1);
        $(".td_Marker", row).text(this.markerName);
        $(".td_Role", row).text(this.role);
        $(".td_Action", row).html('<i class="icon-edit" style="cursor:pointer;" onclick="editMarker(' + i + ',\'' + this.markerName.trim() + '\',\'' + this.role.trim() + '\')"></i> &nbsp; | &nbsp; <i class="icon-trash" style="cursor:pointer;" onclick="deleteMarker(' + i + ')"></i>');
        $("#tblMarker tbody").append(row);
        row = $("#tblMarker thead tr").clone();
    });

    if (addedMarkerList.length > 0) {
        $("#divMarker").show();
        $("#divFinal").show();
    }
    else {
        $("#divMarker").hide();
        $("#divFinal").hide();
    }
}

function saveMarkerStartEndMapping() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var pathwayId = Number($("#ddlPathway option:selected").val());
    var sectionId = Number($("#ddlSection option:selected").val());
    //var subSectionId = Number($("#ddlSubSection option:selected").val());
    var subSectionId = 0;
    var startPointId = Number($("#ddlStartPoint option:selected").val());
    var endPointId = Number($("#ddlEndPoint option:selected").val());
    var startRole = $("#ddlStartRole option:selected").val();
    var endRole = $("#ddlEndRole option:selected").val();

    if (pathwayId == 0) {
        maketoast('error', 'Error', 'Please Select Pathway');
        return;
    }
    if (sectionId == 0) {
        maketoast('error', 'Error', 'Please Select Section');
        return;
    }
    //if (subSectionId == 0) {
    //    maketoast('error', 'Error', 'Please Select Sub Section');
    //    return;
    //}
    if (startPointId == 0) {
        maketoast('error', 'Error', 'Please Select Start Point');
        return;
    }
    if (endPointId == 0) {
        maketoast('error', 'Error', 'Please Select End Point');
        return;
    }
    if (addedMarkerList.length == 0) {
        maketoast('error', 'Error', 'Please Add Marker Name');
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/saveMarkerStartEndMapping",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + mappingId + "','pathwayId':'" + pathwayId + "','sectionId':'" + sectionId + "','subSectionId':'" + subSectionId + "','startPointId':'" + startPointId + "','endPointId':'" + endPointId + "','markerList':'" + JSON.stringify(addedMarkerList) + "','startRole':'" + startRole + "','endRole':'" + endRole + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                clear();
                getMarkerStartEndMapping();
                maketoast('success', 'Success', 'Save Successfully.');
            }
        },
        error: function (error) {
            maketoast('error', 'Error', error.responseJSON.d);
        }
    });
}

function editStartEndMapping(id) {
    mappingId = id;

    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/getMarkerStartEndMapping",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id':'" + Number(id) + "','pathwayId':'" + Number(0) + "','sectionId':'" + Number(0) + "','subSectionId':'" + Number(0) + "','startPointId':'" + Number(0) + "','endPointId':'" + Number(0) + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;
            if (list) {
                if (list.length > 0) {
                    $('#ddlPathway').val(list[0].pathwayId);
                    $('#ddlSection').val(list[0].sectionId);
                    //$('#ddlSubSection').val(list[0].subSectionId);
                    $('#ddlStartPoint').val(list[0].startPointId);
                    $('#ddlEndPoint').val(list[0].endPointId);
                    $('#ddlStartRole').val(list[0].startRole);
                    $('#ddlEndRole').val(list[0].endRole);

                    addedMarkerList = JSON.parse(list[0].markerList);
                    bindMarker();
                }
            }
        },
        error: function (error) {

        }
    });
}

function deleteStartEndMapping(id) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (confirm("Are you sure want to delete?")) {
        $.ajax({
            type: "POST",
            url: "WebService/SVGWebService.asmx/deleteStartEndMapping",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'id':'" + Number(id) + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.responseCode == 1) {
                    clear();
                    getMarkerStartEndMapping();
                    maketoast('success', 'Success', 'Delete Successfully.');
                }
            },
            error: function (error) {
                maketoast('error', 'Error', error.responseJSON.d);
            }
        });
    }
}

function getMarkerStartEndMapping() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    var pathwayId = Number($("#ddlPathway option:selected").val());
    var sectionId = Number($("#ddlSection option:selected").val());
    //var subSectionId = Number($("#ddlSubSection option:selected").val());
    var subSectionId = 0;
    var startPointId = Number($("#ddlStartPoint option:selected").val());
    var endPointId = Number($("#ddlEndPoint option:selected").val());

    $.ajax({
        type: "POST",
        url: "WebService/SVGWebService.asmx/getMarkerStartEndMapping",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id':'" + Number(0) + "','pathwayId':'" + pathwayId + "','sectionId':'" + sectionId + "','subSectionId':'" + subSectionId + "','startPointId':'" + startPointId + "','endPointId':'" + endPointId + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;

            var row = $("#tblStartEndMapping thead tr").clone();
            $("#tblStartEndMapping tbody tr").remove();
            $.each(list, function (index) {

                var markerList = JSON.parse(this.markerList);
                var markerDetailList = '<ul style="list-style-type: none; margin:0; padding:0;">';
                $.each(markerList, function (i) {
                    markerDetailList += '<li>' + this.markerName + '-(' + this.role + ')' + '</li>';
                });
                markerDetailList += '</ul>';
                //var commaSeparatedMarkerList = '';
                //$.each(markerList, function (i) {
                //    commaSeparatedMarkerList += this.markerName + ', ';
                //});

                var sectionDetailList = '<ul style="list-style-type: none; margin:0; padding:0;">';
                //sectionDetailList += '<li> <b>Section : </b>' + this.sectionName + '</li>';
                //sectionDetailList += '<li> <b>Sub Section : </b>' + this.subSectionName + '</li>';
                sectionDetailList += '<li> <b>Start Point : </b>' + this.startPoint + '-(' + this.startRole + ')' +  '</li>';
                sectionDetailList += '<li> <b>End Point : </b>' + this.endPoint + '-(' + this.endRole + ')' +  '</li>';
                sectionDetailList += '</ul>';

                $(".td_Sno", row).text(index + 1);
                $(".td_Pathway", row).text(this.pathwayName);
                $(".td_Section", row).text(this.sectionName);
                //$(".td_SubSection", row).text(this.subSectionName);
                $(".td_StartPoint", row).html(sectionDetailList);
                //$(".td_StartPoint", row).text(this.startPoint);
                //$(".td_EndPoint", row).text(this.endPoint);
                $(".td_Marker", row).html(markerDetailList);
                //$(".td_Action", row).html('<i class="icon-edit" style="cursor:pointer;" onclick="editStartEndMapping(' + this.pathwayId + ',' + this.sectionId + ',' + this.subSectionId + ',' + this.startPointId + ',' + this.endPointId + ')"></i> | <i class="icon-trash" style="cursor:pointer;" onclick="deleteStartEndMapping(' + this.pathwayId + ',' + this.sectionId + ',' + this.subSectionId + ',' + this.startPointId + ',' + this.endPointId + ')"></i>');
                $(".td_Action", row).html('<i class="icon-edit" style="cursor:pointer;" onclick="editStartEndMapping(' + this.id + ')"></i> | <i class="icon-trash" style="cursor:pointer;" onclick="deleteStartEndMapping(' + this.id + ')"></i>');
                $("#tblStartEndMapping tbody").append(row);
                row = $("#tblStartEndMapping thead tr").clone();
            });
        },
        error: function (error) {

        }
    });
}

function clear() {
    $('#ddlPathway').val(0);
    $('#ddlSection').val(0);
    $('#ddlSubSection').val(0);
    $('#ddlStartPoint').val(0);
    $('#ddlEndPoint').val(0);
    $('#txtMarker').val('');
    $('#ddlStartRole').val('');
    $('#ddlEndRole').val('');
    $('#ddlMarkerRole').val('');
    mappingId = 0;
    addedMarkerList = [];
    bindMarker();
}
