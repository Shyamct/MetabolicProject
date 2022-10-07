
function saveDescription() {
    var obj;
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var image = '';
    var files = $('#txtImage').get(0).files;
    if (files.length === 0) {
        var pageUrlnew = $(location).attr("href").split('/');
        var pageURL = pageUrlnew[pageUrlnew.length - 1];
        var heading = $('#txtHeading').val();
        var color = $('#txtColor').val();
        var description = $('#txtDescription').val();


        obj = {
            "pageName": pageURL,
            "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
            "heading": heading,
            "color": color,
            "image": image,
            "description": description
        }

        $.ajax({
            type: "POST",
            url: "WebService/pageDescription.asmx/insertDescription",
            data: obj,
            //contentType: "application/json;",
            dataType: "json",
            success: function (data) {
                alert('save successfull');
            },
            error: function (data) {

            }
        });
    }
    else {
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
                console.log(data);
                image = data[0];
                var pageUrlnew = $(location).attr("href").split('/');
                var pageURL = pageUrlnew[pageUrlnew.length - 1];//str.replace(/.*\/(\w+)\/?$/, '$1');//$(location).attr("href").lastIndexOf('/') + 1;

                var heading = $('#txtHeading').val();

                var color = $('#txtColor').val();

                var description = $('#txtDescription').val();
                obj = {
                    "pageName": pageURL,
                    "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
                    "heading": heading,
                    "color": color,
                    "image": image,
                    "description": description
                }

                $.ajax({
                    type: "POST",
                    url: "WebService/pageDescription.asmx/insertDescription",
                    data: JSON.stringify(obj),
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {

                    },
                    error: function (data) {

                    }
                });
            },
            error: function (errorData) {
                maketoast('error', 'Error', "there was a problem uploading the file.");
            }
        });
    }
    $("#txtHeading").val('');
    $("#txtImage").val('');
    $("#txtColor").val('');
    $("#txtDescription").val('');
};

function showDescription() {
    var pageUrlnew = $(location).attr("href").split('/');
    var pageURL = pageUrlnew[pageUrlnew.length - 1];

    // var userID = "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}";
    var obj = {
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "pageName": pageURL
    };

    $.ajax({
        type: "POST",
        url: "WebService/pageDescription.asmx/showDescription",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            console.log(data);
            var r = JSON.parse(data.d).responseValue;

            $("#tblVechileDetails tbody tr").remove();
            var base_url = window.location.origin;
            $.each(r.Table, function (i) {

                var row = $("#tblVechileDetails thead tr").clone();
                $('.td_SrNo', row).text(i + 1);
                $('.td_heading', row).text(this.heading);
                var colorh = '<button type="button" class="btn" style="background-color:' + this.color + '" height="5" width="10"></button>';
                var imagePath = base_url + '/Matabolic/project/GraphPDF/' + this.image;

                var iamgeh = '<img src="' + imagePath + '" height="50" width="50">';

                $('.td_color', row).append(colorh);
                $('.td_image', row).append(iamgeh);
                $('.td_description', row).text(this.details);
                $("#tblVechileDetails tbody").append(row);
                row = $("#tblVechileDetails body tr:last").clone();
            });
        },
        error: function (error) {

        }
    });
}



function addNote() {
    $("#btnNote").click(function () {
        var pageUrlnew = $(location).attr("href").split('/');
        var pageURL = pageUrlnew[pageUrlnew.length - 1];
        window.open("Note.aspx?" + pageURL);
    });
}
function showPageNote() {
    var pageUrlnew = $(location).attr("href").split('/');
    var pageURL = pageUrlnew[pageUrlnew.length - 1];

    var obj = {
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "pageName": pageURL
    };
    $.ajax({
        type: "POST",
        url: "WebService/pageDescription.asmx/showNote",
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
            $("#tblShowNote tbody tr").remove();
            $.each(r.Table, function (i) {
                var row = $("#tblShowNote thead tr").clone();
              

                //var notee = '<span "' + this.note + '"></span>';

                $('.td_Note', row).html(this.note);

                $("#tblShowNote tbody").append(row);
                row = $("#tblShowNote body tr:last").clone();
            });
        },
        error: function (error) {
        }
    });
}

$(function () {
    getPathway();
    var height1 = ($(window).height() - $('#header').height() - 206);
    $(".tab-pane").height(height1);


    $("#btnNoteShow").click(function () {
        $("#showNote").show();
        showPageNote();
    });
    $("#btnNotecross").click(function () {
        $("#showNote").hide();
    });
    $("#btnNoteCancel").click(function () {
        $("#showNote").hide();
    });



    $("#btnAddNew").click(function () {
        // saveDescription();
    });
    $("#moreInfo").click(function () {
        $("#modalDescription").show();
        showDescription();
    });
    $("#btnClose").click(function () {
        $("#modalDescription").hide();
    });
    $("#btnClosed").click(function () {
        $("#modalDescription").hide();
    });
    $("#addInfo").click(function () {
        $("#addInfoModel").show();

    });
    $("#btnCross").click(function () {
        $("#addInfoModel").hide();
    });
    $("#btnSave").click(function () {
        if ($("#txtDescription").val() == "") {
            alert("Description in mandatory");
        }
        else {
            saveDescription();
            alert('save successfull');
        }
    });
    $("#btnCancel").click(function () {
        $("#addInfoModel").hide();
    });
});

var getPathway = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var obj = {
        userID: UtilsCache.getSession('USERDETAILS').userid
    };
    $.ajax({
        type: "POST",
        url: "WebService/ActivitiesApproval.asmx/getDiseasePathway",
        data: JSON.stringify(obj),
        contentType: 'application/json',
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            $("#ddlPathway option:not(:first)").remove();
            $.each(result, function () {
                $("#ddlPathway").append('<option value="' + this.id + '">' + this.headName + '</option>');
            });
        },
        error: function (error) {
            window.location.href = "../../index.html";
        }
    });

};

var getPathwayActivities = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    var obj = {
        pathwayID: $('#ddlPathway option:selected').val(),
        approveStatus: $('#ddlType option:selected').val(),
        userID: UtilsCache.getSession('USERDETAILS').userid
    };
    $.ajax({
        type: "POST",
        url: "WebService/ActivitiesApproval.asmx/getActivitiesForApproval",
        data: JSON.stringify(obj),
        contentType: 'application/json',
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;

            var row = $("#tblWriteUp thead tr").clone();
            $("#tblWriteUp tbody tr").remove();
            $.each(r.Table, function (index) {
                $(".td_UserName-WriteUp", row).text(this.userName);
                $(".td_WriteUp", row).text(this.orginalWriteUp);
                $(".td_Phenomenon", row).text(this.pathwayName);
                $(".td_Parameter", row).text(this.parameterName);
                $(".td_Rank", row).text(this.rank);
                $(".td_RankName", row).text(this.rankName);
                if (this.rankName) {
                    $(".td_ApproveRank", row).html('<input type="checkbox" datakey="rank" value="' + this.rankMasterID + '" onchange="approveActivity(this)"' + this.isRankChecked + ' />');
                }
                else {
                    $(".td_ApproveRank", row).html('');
                }
                $(".td_Sno", row).text(this.sno);
                $(".td_Approve-WriteUp", row).html('<input type="checkbox" datakey="writeUp" value="' + this.id + '" onchange="approveActivity(this)"' + this.isChecked + ' />');
                $("#tblWriteUp tbody").append(row);
                row = $("#tblWriteUp thead tr").clone();
            });

            var row = $("#tblCentralMolecule thead tr").clone();
            $("#tblCentralMolecule tbody tr").remove();
            $.each(r.Table1, function (index) {
                $(".td_UserName-CentralMolecule", row).text(this.userName);
                $(".td_CentralMolecule", row).text(this.molecule);
                $(".td_Phenomenon-CentralMolecule", row).text(this.pathwayName);
                $(".td_Approve-CentralMolecule", row).html('<input type="checkbox" datakey="centerMolecule" value="' + this.id + '" onchange="approveActivity(this)"' + this.isChecked + ' />');
                $("#tblCentralMolecule tbody").append(row);
                row = $("#tblCentralMolecule thead tr").clone();
            });

            var row = $("#tblDietNotRequired thead tr").clone();
            $("#tblDietNotRequired tbody tr").remove();
            $.each(r.Table2, function (index) {
                $(".td_UserName-DietNotRequired", row).text(this.userName);
                $(".td_Keyword", row).text(this.keyword);
                $(".td_DietType", row).text(this.dietType);
                $(".td_Approve-DietNotRequired", row).html('<input type="checkbox" datakey="dietNotRequired" value="' + this.id + '" onchange="approveActivity(this)"' + this.isChecked + ' />');
                $("#tblDietNotRequired tbody").append(row);
                row = $("#tblDietNotRequired thead tr").clone();
            });

            var row = $("#tblSetEnzyme thead tr").clone();
            $("#tblSetEnzyme tbody tr").remove();
            $.each(r.Table3, function (index) {
                $(".td_UserName-SetEnzyme", row).text(this.userName);
                $(".td_Molecule-SetEnzyme", row).text(this.molecule);
                $(".td_Phenomenon-SetEnzyme", row).text(this.pathwayName);
                $(".td_Approve-SetEnzyme", row).html('<input type="checkbox" datakey="setEnzyme" value="' + this.id + '" onchange="approveActivity(this)"' + this.isChecked + ' />');
                $("#tblSetEnzyme tbody").append(row);
                row = $("#tblSetEnzyme thead tr").clone();
            });
        },
        error: function (error) {
            window.location.href = "../../index.html";
        }
    });

};

var approveActivity = function (e) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var isChecked = $(e).is(":checked") ? 1 : 0;
    var obj = {
        id: $(e).val(),
        activityName: $(e).attr('datakey'),
        approveStatus: isChecked,
        userID: UtilsCache.getSession('USERDETAILS').userid
    };
    $.ajax({
        type: "POST",
        url: "WebService/ActivitiesApproval.asmx/approveActivity",
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
                getPathwayActivities();
                if (isChecked == 1) {
                    maketoast('success', 'Success', 'Approved.');
                }
                if (isChecked == 0) {
                    maketoast('success', 'Success', 'Disapproved.');
                }
            }
        },
        error: function (error) {
            maketoast('error', 'Error', error.responseJSON.d);
        }
    });

};
