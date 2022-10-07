$(function () {
    window.location.href = "pathway2.aspx";
    //getHeadList();
   
});
var allResult = [];
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
                allResult = result.responseValue.Table;
                $.each(result.responseValue.Table, function () {
                    data.push({
                        id: this.id,
                        parent: this.parentId == "0" ? "#" : this.parentId,
                        text: this.headName
                    });
                });
                setTimeout(function () {
                    $('#rootFolder').jstree({
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
                    $('#rootFolder').on('changed.jstree', function (e, data) {
                        var new_arr = $.grep(allResult, function (n, i) {
                            return n.id == Number(data.selected[0]);
                        });
                        if (new_arr[0].svgImg != null) {
                            $('#showSVGImage').html(new_arr[0].svgImg.replace('xmlns="http://www.w3.org/2000/svg"', 'id="demoSVG"'));                         
                                //var instance = new SVGPanZoom(document.getElementById('demoSVG'), {
                                //    //eventMagnet: document.getElementById('SVGContainer')
                                //});
                       
                        } else {
                            $('#showSVGImage').html('<b>No Image to preview</b>');
                        }

                    }).jstree();
                }, 1000);

            }
        },
        error: function (error) {

        },
        failure: function (error) {

        },

    })
}

function getDetails(id) {
    alert(id);
}