
//$(function () {
//	getPathwayGraph();
//});
var pathwayId = 0;
$(function () {
    getPathwayList();
});
var getpathwayId = function (id, e) {
    $("#span10").show();
    $("#sideBar li").removeClass('active');
    $(e).closest('li').addClass('active');
    $(".test:not(:first)").remove();
    $(".test").empty();
    $("svg").remove();
    var row = $("#aa").clone();
    $("#aa").remove();
    $("#span10").append(row);
    pathwayId = id;
    getPathwayGraph(id);
};

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
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;
            var row = $("#sideBar li:first").clone();
            $("#sideBar li").remove();
            $.each(r.Table, function () {
                $('.pathwayName', row).html('<i class="icon-chevron-right"></i>' + this.headName);
                $('.pathwayName', row).attr('onclick', 'getpathwayId(' + this.id + ',this)');
                $("#sideBar").append(row);
                row = $("#sideBar li:first").clone();
            });
            $("#ddlReceptor option:not(:first)").remove();
            $.each(r.Table1, function () {
                $("#ddlReceptor").append('<option value="' + this.id + '">' + this.keyword + '</option>');
            });
        },
        error: function (error) {

        }
    });
}

function getPathwayGraph(id) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var pathwayId = id;
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain.asmx/getPathwayGraph",
        contentType: 'application/json',
        data: "{'pathwayid': '" + pathwayId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d);
            var row = $(".test:first");
            $.each(result.responseValue.Table, function () {
                $(row).attr("id", "rec_" + this.receptorId);
                $("#divrReceptor").append(row);
                row = $(".test:first").clone();

            });

            $.each(result.responseValue.Table1, function () {
                var htm = '<div class="child" sno="' + this.sNo + '"><div id="' + this.fromKey.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "") + '"  style="padding:5px;border:1px solid #000; display:inline-block;">' + this.fromKey + '</div></div>';
                var output = this.List_Output.split(",");
                htm += '<div class="child" sno="' + this.sNo + '">';
                if (output.length > 0) {
                    for (var i = 0; i < output.length; i++) {
                        htm += '<div id="' + output[i].toLowerCase().replace(/[^a-zA-Z0-9]+/g, "") + '"  style="padding:5px;border:1px solid #000; display:inline-block;;margin:13px">' + output[i] + '</div>';
                        if ((i + 1) != output.length) {
                            htm += '<br />';
                        }

                    };
                } else {
                    htm += '<div id="' + this.List_Output.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "") + '"  style="padding:5px;border:1px solid #000;display:inline-block;margin:13px">' + this.List_Output + '</div>';
                }
                htm += '</div>';
                $("#rec_" + this.receptorId).append(htm);

                $('[id]').each(function () {
                    $('[id="' + this.id + '"]:gt(0)').remove();
                });

                $(".child:empty").remove();


            });

            //var paths = [];
            function getRandomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
            //setTimeout(function () {
            //	$.each(result.responseValue.Table2, function () {
            //		var from = this.fromKey.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
            //		var to = this.tokey.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
            //		console.log(from, to);
            //		paths.push({ start: '#' + from, end: '#' + to, stroke: getRandomColor() });

            //	});


            //	$("#svgContainer").HTMLSVGconnect({
            //		paths: paths,
            //		orientation: "auto",
            //		strokeWidth: 2,

            //	});

            //}, 1000)

            setTimeout(function () {
                $.each(result.responseValue.Table2, function () {
                    var fromkey = this.fromKey.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
                    var tokey = this.tokey.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
                    if (fromkey != tokey) {
                        var startElement = document.getElementById(fromkey),
                            endElement = document.getElementById(tokey);
                        var line = new LeaderLine(startElement, endElement, {
                            color: this.colorCode || getRandomColor(),
                            //middleLabel: this.relation,
                            size: 2,
                            //path: 'grid'
                        });
                        //document.getElementById(fromkey).addEventListener('scroll', AnimEvent.add(function () {
                        //	line.position();
                        //}), false);

                        var shown = true;
                        document.getElementById(fromkey).addEventListener('click', function (event) {
                            shown = !shown;
                            line[shown ? 'show' : 'hide']('draw');

                            //event.target.textContent = shown ? 'hide' : 'show';
                        }, false);
                        new LeaderLine(
                            LeaderLine.mouseHoverAnchor(startElement, 'draw', { style: { backgroundImage: null, backgroundColor: 'transparent', padding: '5px 5px 5px 5px' } }),
                            endElement,
                            { color: 'red', dash: { animation: true }, middleLabel: this.relation },
                        );
                    }



                });
            }, 1000);
        },
        error: function (error) {

        }
    });


};