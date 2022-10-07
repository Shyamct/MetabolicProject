
$(function () {
    getflowChart();
});

var getflowChart = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var employees = [];
    $.ajax({
        type: "POST",
        url: "WebService/flowChart.asmx/getFlowchartDetails",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayId': 73,'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;
            $.each(r.Table, function () {
                employees.push({
                    name: Number(this.id),
                    title: this.keyword,
                    keyid: this.keyid,
                    manager: this.parentid == '0' ? null : Number(this.parentid)
                });
            });

            var hash = {};
            var root;

            for (var i = 0; i < employees.length; i++) {
                var employee = employees[i];
                hash[employee.name] = {
                    name: employee.name, manager: employee.manager, title: employee.title, children: []
                };
            }
            for (var i = 0; i < employees.length; i++) {
                var employee = hash[employees[i].name];
                var manager = hash[employee.manager];
                if (manager) {
                    manager.children.push(employee);
                } else {
                    root = employee;
                }
            }

            $('#chart-container').orgchart({
                'data': root,
                'nodeContent': 'title'
            });
            //console.log(root);
        }
    });
};