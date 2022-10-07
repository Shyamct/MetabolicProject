var nodeId = 0;
var maxid = 0;
var pathwayId = 0;
$(function () {
    getPathwayList();
});

var getPathwayList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/flowChart.asmx/getPathwayList",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = 'http://localhost:51564/index.html';
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;
            window.localStorage.setItem("result", JSON.stringify(r.Table1));
            var row = $("#sideBar li:first").clone();
            $("#sideBar li").remove();
            $.each(r.Table, function () {
                $('.pathwayName', row).html('<i class="icon-chevron-right"></i>' + this.headName);
                $('.pathwayName', row).attr('onclick', 'getpathwayId(' + this.id + ',this)');
                $("#sideBar").append(row);
                row = $("#sideBar li:first").clone();
            });
        },
        error: function (error) {

        }
    });
}

var getpathwayId = function (id, e) {
    $("#sideBar li").removeClass('active');
    $(e).closest('li').addClass('active');
    pathwayId = id;
    getflowChart();
}

var getflowChart = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var result = [];
    $.ajax({
        type: "POST",
        url: "WebService/flowChart.asmx/getFlowchartDetails",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayId': '" + pathwayId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;
            $.each(r.Table, function () {
                result.push({
                    id: Number(this.id),
                    name: this.keyword,
                    keyid: this.keyid,
                    parent: this.parentid == '0' ? 0 : Number(this.parentid)

                });
            });
            org_chart = $('#orgChart').orgChart({
                data: result,
                showControls: true,
                allowEdit: true,
                onAddNode: function (node) {
                    nodeId = node.data.id;
                    org_chart.newNode(node.data.id);
                },
                onDeleteNode: function (node) {
                    org_chart.deleteNode(node.data.id);
                },
                onClickNode: function (node) {
                },
                newNodeText: 'Activates'

            });

        }
    });
};