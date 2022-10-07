var pageName = '';

function saveDescription() {
    var obj;
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var files = $('#txtImage').get(0).files;
    var image = (files.length > 0) ? uploadImage(files) : '';
    var pageURL = pageName;
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

    $("#txtHeading").val('');
    $("#txtImage").val('');
    $("#txtColor").val('');
    $("#txtDescription").val('');
};

function showDescription() {
    var pageURL = pageName;
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

            var r = JSON.parse(data.d).responseValue;

            $("#tblVechileDetails tbody tr").remove();
            var base_url = window.location.origin;
            $.each(r.Table, function (i) {

                var row = $("#tblVechileDetails thead tr").clone();
                $('.td_SrNo', row).text(i + 1);
                $('.td_ID', row).val(this.id);


                $('.td_heading', row).text(this.heading);
                var colorh = (this.color == '#000000') ? '' : `<div  style="background-color:${this.color};height:50px;width:50px" ></div>`;


                var imagePath = base_url + `/Matabolic/project/GraphPDF/${this.image}`;

                var iamgeh = (this.image == '') ? `<img src="${base_url}/Matabolic/project/GraphPDF/defaultImage.png" alt="no image" height="50" width="50">` : '<img src="' + imagePath + '" height="50" width="50">';
                var description = this.details.replace(/ /g, "_");
                var heading = this.heading.replace(/ /g, "_");
                $('.td_color', row).html(colorh);
                $('.td_image', row).html(iamgeh);
                $('.td_description', row).text(this.details);

                $('.td_ActionEdit', row).html(`<i class="icon-trash" onClick=deleteDescription(${this.id})></i > &nbsp;<i class="icon-edit" onClick=editDescription(${this.id},"${this.color}","${this.image}","${heading}","${description}")></i >`);


                $("#tblVechileDetails tbody").append(row);
                row = $("#tblVechileDetails body tr:last").clone();
            });
        },
        error: function (error) {

        }
    });
}

function editDescription(editId, color = null, image = null, heading = null, details = null) {

    details = details.replace(/_/g, " ");
    heading = heading.replace(/_/g, " ");



    $("#btnUpdate").show();
    $("#btnSave").hide();

    $('#txtHeading').val(heading);
    $('#txtColor').val(color);
    $('#txtId').val(editId);
    $('#txtDescription').val(details);
    $("#addInfoModel").show();

}

function updateDescription() {
    var files = $('#txtImage').get(0).files;
    var image = (files.length > 0) ? uploadImage(files) : '';

    var Id = $('#txtId').val();
    var heading = $('#txtHeading').val();
    var Color = $('#txtColor').val();

    var Detail = $('#txtDescription').val();


    var obj23 = {
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "id": Id,
        "image": image,
        "heading": heading,
        "color": Color,
        "description": Detail
    };
    console.log(obj23);

    $.ajax({
        type: "POST",
        url: "WebService/pageDescription.asmx/updatePageDescription",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj23),
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {
            alert('Data Update Successfull');
            $("#addInfoModel").hide();
        },
        error: function (data) {

        }
    });

    $("#txtHeading").val('');
    $("#txtImage").val('');
    $("#txtColor").val('');
    $("#txtDescription").val('');
}

function deleteDescription(rowID) {

    var obj = {
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "id": rowID,
        "status": "0"
    };
    $.ajax({
        type: "POST",
        url: "WebService/pageDescription.asmx/deletePageDescription",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            showDescription();

        },
        error: function (error) {

        }
    });
}