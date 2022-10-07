// photos from flickr with creative commons license
$(function () {
    getPathwayGraph();
   // generateGraph();
})
function getPathwayGraph() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var pathwayId = 130;
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain.asmx/getPathwayGraph",
        contentType: 'application/json',
        data: "{'pathwayid':'" + pathwayId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d);
            var graphNodes = [];
            var graphEdge = [];
            if (result.responseCode == 1) {
                $.each(result.responseValue.Table, function () {
                    graphNodes.push({ data: { id: this.id, name: this.keyword } });
                });
                $.each(result.responseValue.Table1, function () {
                    if (this.role == 'Before') {
                        graphEdge.push({ data: { source: this.toKey, target: this.fromKey, name: this.relation } });
                    } else {
                        graphEdge.push({ data: { source: this.fromKey, target: this.toKey, name: this.relation} });
                    }
                  
                });
                generateGraph(graphNodes, graphEdge);
            }
        },
        error: function (error) {

        }
    });


}

var generateGraph = function (graphNodes, graphEdge) {

    console.log(graphNodes);
    console.log(graphEdge);
    var cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        autounselectify: true,
        style: cytoscape.stylesheet()
            .selector('node').css({               
                'width': '200px',
                'height':'50px',
                'background-fit': 'cover',
                'border-color': '#000',
                'border-width': 1,
                'border-opacity': 0.5,
                "text-valign": "center",
                "text-halign": "center",
                'content': 'data(name)',
                'shape': 'roundrectangle',
                'background-color': '#f08080',
                'text-wrap': 'wrap',
                'text-max-width': '200px',
            })
            .selector('edge').css({
                'curve-style': 'bezier',
                'width': 2,
                'target-arrow-shape': 'triangle',
                'line-color': 'grey',
                'target-arrow-color': 'grey',
                'arrow-scale':'2',
                'content': 'data(name)',

            }),

        elements: {
            nodes: graphNodes,
            edges: graphEdge,
            ready: function () {
                var cy = this;
                cy.nodeResize({
                    isResizable: function (node) {
                        return false;
                    },
                })
            }
        },

        layout: {
            name: 'breadthfirst',
            directed: true,
            padding: 5
        }
    }); // cy init

    //cy.on('tap', 'node', function () {
    //    var nodes = this;
    //    var tapped = nodes;
    //    var food = [];

    //    nodes.addClass('eater');

    //    for (; ;) {
    //        var connectedEdges = nodes.connectedEdges(function (el) {
    //            return !el.target().anySame(nodes);
    //        });

    //        var connectedNodes = connectedEdges.targets();

    //        Array.prototype.push.apply(food, connectedNodes);

    //        nodes = connectedNodes;

    //        if (nodes.empty()) { break; }
    //    }

    //    var delay = 0;
    //    var duration = 500;
    //    for (var i = food.length - 1; i >= 0; i--) {
    //        (function () {
    //            var thisFood = food[i];
    //            var eater = thisFood.connectedEdges(function (el) {
    //                return el.target().same(thisFood);
    //            }).source();

    //            thisFood.delay(delay, function () {
    //                eater.addClass('eating');
    //            }).animate({
    //                position: eater.position(),
    //                css: {
    //                    'width': 10,
    //                    'height': 10,
    //                    'border-width': 0,
    //                    'opacity': 0
    //                }
    //            }, {
    //                    duration: duration,
    //                    complete: function () {
    //                        thisFood.remove();
    //                    }
    //                });

    //            delay += duration;
    //        })();
    //    } // for

    //}); // on tap
}

