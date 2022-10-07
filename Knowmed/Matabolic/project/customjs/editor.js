$(function () {

    getHeadList();
});

var data = [];
var baseUrl = "WebService/HeadMaster.asmx/";
var getHeadList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        method: "Post",
        url: baseUrl + 'getHeadList',
        dataType: 'json',
        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        contentType: 'application/json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                $.each(result.responseValue.Table, function () {
                    data.push({
                        id: this.id,
                        parent: this.parentId == "0" ? "#" : this.parentId,
                        text: this.headName
                    });
                });
                setTimeout(function () {
                    $('#svgedit').contents().find('#jstree_demo').jstree({
                        "core": {
                            "animation": 0,
                            "check_callback": true,
                            'force_text': true,
                            "themes": { "stripes": true },
                            'data': data
                        },
                        "types": {
                            "#": { "max_children": 1, "max_depth": 4, "valid_children": ["root"] },
                            "root": { "icon": "/static/3.3.7/assets/images/tree_icon.png", "valid_children": ["default"] },
                            "default": { "valid_children": ["default", "file"] },
                            "file": { "icon": "glyphicon glyphicon-file", "valid_children": [] }
                        }
                    });
                }, 2000);

            }
        },
        error: function (error) {

        },
        failure: function (error) {

        },

    })
}

window.saveSVGImge = function () {
    var obj = {
        id: $('#svgedit').contents().find('#jstree_demo').jstree("get_selected")[0],
        svgImage: localStorage.getItem('svgImage'),
        empid: Number(UtilsCache.getSession('USERDETAILS').userid)
    }
    $.ajax({
        method: "Post",
        url: baseUrl + 'saveSVGImge',
        dataType: 'json',
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                $('#svgedit').contents().find('#myModal').hide();
                maketoast('success', 'Success', 'Save Successfully.');
            }
        }, statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        error: function (error) {

        },
        failure: function (error) {

        },

    });
};

window.OpenSvgImage = function() {
    var obj = {
        id: $('#svgedit').contents().find('#jstree_demo').jstree("get_selected")[0],
        empid: Number(UtilsCache.getSession('USERDETAILS').userid)
    }
    $.ajax({
        method: "Post",
        url: baseUrl + 'OpenSvgImage',
        dataType: 'json',
        data: JSON.stringify(obj),
        contentType: 'application/json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function(response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                if (result.responseValue[0].svgImg != null) {
                    $('#svgedit').contents().find('#myModal').hide();
                    console.log(result);
                    var svgImage = result.responseValue[0].svgImg;
                    var frame = document.getElementById('svgedit');
                    var svgCanvas = new embedded_svg_edit(frame);
                    svgCanvas.setSvgString(svgImage);
                } else {
                    maketoast('denger', 'Warning', 'File Not found.');
                }

                //maketoast('success', 'Success', 'Save Successfully.');
            } else {
                maketoast('denger', 'Warning', 'File Not found.');
            }
        },
        error: function(error) {

        },
        failure: function(error) {

        },

    });
};
$(document).bind('keydown', 'ctrl+s', function(e) {
    e.preventDefault();   
    return false;
});
$(document).bind('keydown', 'ctrl+o', function(e) {
    e.preventDefault();   
    return false;
});

window.addTextContent = function (e) {
    var frame = document.getElementById('svgedit');
    var svgCanvas = new embedded_svg_edit(frame);
    console.log($(e));
    svgCanvas.setTextContent($(e).find("option:selected").text());
    svgCanvas.changeSelectedAttribute('onclick', 'getDetails(' + $(e).val()+')');    
}