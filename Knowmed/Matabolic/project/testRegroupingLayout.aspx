<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="go.js"></script>
    <script src="../../script/global.js"></script>
    <script id="code">
        function init() {
            if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
            var $ = go.GraphObject.make;

            myDiagram =
                $(go.Diagram, "myDiagramDiv",
                    {
                        // when a drag-drop occurs in the Diagram's background, make it a top-level node
                        mouseDrop: function (e) { finishDrop(e, null); },
                        layout:  // Diagram has simple horizontal layout
                            $(go.GridLayout,
                                { wrappingWidth: Infinity, alignment: go.GridLayout.Position, cellSize: new go.Size(1, 1) }),
                        "commandHandler.archetypeGroupData": { isGroup: true, text: "Group", horiz: false },
                        "undoManager.isEnabled": true
                    });

            // The one template for Groups can be configured to be either layout out its members
            // horizontally or vertically, each with a different default color.

            function makeLayout(horiz) {  // a Binding conversion function
                if (horiz) {
                    return $(go.GridLayout,
                        {
                            wrappingWidth: Infinity, alignment: go.GridLayout.Position,
                            cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                        });
                } else {
                    return $(go.GridLayout,
                        {
                            wrappingColumn: 1, alignment: go.GridLayout.Position,
                            cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                        });
                }
            }

            function defaultColor(horiz) {  // a Binding conversion function
                return horiz ? "#FFDD33" : "#33D3E5";
            }

            function defaultFont(horiz) {  // a Binding conversion function
                return horiz ? "bold 18px sans-serif" : "bold 16px sans-serif";
            }

            // this function is used to highlight a Group that the selection may be dropped into
            function highlightGroup(e, grp, show) {
                if (!grp) return;
                e.handled = true;
                if (show) {
                    // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
                    // instead depend on the DraggingTool.draggedParts or .copiedParts
                    var tool = grp.diagram.toolManager.draggingTool;
                    var map = tool.draggedParts || tool.copiedParts;  // this is a Map
                    // now we can check to see if the Group will accept membership of the dragged Parts
                    if (grp.canAddMembers(map.toKeySet())) {
                        grp.isHighlighted = true;
                        return;
                    }
                }
                grp.isHighlighted = false;
            }

            // Upon a drop onto a Group, we try to add the selection as members of the Group.
            // Upon a drop onto the background, or onto a top-level Node, make selection top-level.
            // If this is OK, we're done; otherwise we cancel the operation to rollback everything.
            function finishDrop(e, grp) {
                var ok = (grp !== null
                    ? grp.addMembers(grp.diagram.selection, true)
                    : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
                if (!ok) e.diagram.currentTool.doCancel();
            }

            //myDiagram.linkTemplate =
            //    $(go.Link,
            //        { routing: go.Link.Orthogonal, corner: 10 },
            //        $(go.Shape, { strokeWidth: 2 }),
            //        $(go.Shape, { toArrow: "OpenTriangle" }),
            //        $(go.TextBlock,
            //            {
            //                margin: 7,
            //                editable: false,
            //                font: "bold 13px sans-serif",
            //                opacity: 0.75,
            //                stroke: "#404040"
            //            })
            //    );

            //myDiagram.linkTemplate =
            //    $(go.Link,
            //        { routing: go.Link.AvoidsNodes },  // link route should avoid nodes
            //        $(go.Shape),
            //        $(go.Shape, { toArrow: "Standard" })
            //    );
            myDiagram.linkTemplate =
                $(go.Link,
                    { routing: go.Link.AvoidsNodes, corner: 5, curve: go.Link.JumpOver },
                    { relinkableFrom: true, relinkableTo: true },
                    $(go.Shape,
                        new go.Binding("fill", "color"),
                        // the Shape.stroke color depends on whether Link.isHighlighted is true
                        new go.Binding("stroke", "isHighlighted", function (h) { return h ? "red" : "black"; })
                            .ofObject(),
                        // the Shape.strokeWidth depends on whether Link.isHighlighted is true
                        new go.Binding("strokeWidth", "isHighlighted", function (h) { return h ? 5 : 1; })
                            .ofObject()),
                    $(go.Shape, { toArrow: "Standard", strokeWidth: 2 },
                        // the Shape.fill color depends on whether Link.isHighlighted is true
                        new go.Binding("fill", "isHighlighted", function (h) { return h ? "red" : "black"; })
                            .ofObject()),
                    $(go.Panel, "Auto",  // this whole Panel is a link label
                        $(go.Shape, "Diamond", { width: 35, height: 35, fill: "yellow", stroke: "gray" }, new go.Binding("fill", "fillD")),
                        $(go.TextBlock, { margin: 1, font: "bold 14px Helvetica, bold Arial, sans-serif", overflow: go.TextBlock.OverflowClip },
                            new go.Binding("text", "text"))
                    )
                );

            myDiagram.groupTemplate =
                $(go.Group, "Auto",
                    {
                        background: "transparent",
                        ungroupable: true,
                        resizable: true,
                      
                        // highlight when dragging into the Group
                        mouseDragEnter: function (e, grp, prev) { highlightGroup(e, grp, true); },
                        mouseDragLeave: function (e, grp, next) { highlightGroup(e, grp, false); },
                        computesBoundsAfterDrag: true,
                        // when the selection is dropped into a Group, add the selected Parts into that Group;
                        // if it fails, cancel the tool, rolling back any changes
                        mouseDrop: finishDrop,
                        handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
                        // Groups containing Groups lay out their members horizontally
                        layout: $(go.TreeLayout,
                            { angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal, isRealtime: false })
                    },
                    new go.Binding("layout", "horiz", makeLayout),
                    //new go.Binding("background", "isHighlighted", function (h) {
                    //    return h ? "rgba(255,0,0,0.2)" : "transparent";
                    //}).ofObject(),
                    $(go.Shape, "Rectangle",
                        { fill: null, stroke: defaultColor(false), strokeWidth: 2 },
                        //new go.Binding("stroke", "horiz", defaultColor),
                        new go.Binding("stroke", "strokeColor")
                    ),
                    $(go.Panel, "Vertical",  // title above Placeholder
                        $(go.Panel, "Horizontal",  // button next to TextBlock
                            { stretch: go.GraphObject.Horizontal, background: defaultColor(false) },
                            new go.Binding("background", "horiz", defaultColor),
                            new go.Binding("background", "color"),
                            $("SubGraphExpanderButton",
                                {
                                    alignment: go.Spot.Right, margin: 5
                                },
                                new go.Binding("visible", "isVisible")),
                            $(go.TextBlock,
                                {
                                    alignment: go.Spot.Left,
                                    editable: false,
                                    margin: 5,
                                    font: defaultFont(false),
                                    opacity: 0.75,  // allow some color to show through
                                    stroke: "#404040"
                                },
                                new go.Binding("font", "horiz", defaultFont),
                                new go.Binding("text", "text").makeTwoWay())
                        ),  // end Horizontal Panel
                        new go.Binding("background", "isHighlighted"),
                        $(go.Placeholder,
                            { padding: 5, alignment: go.Spot.TopLeft })
                    )  // end Vertical Panel
                );
            var graygrad = $(go.Brush, "Linear", { 0: "#F5F5F5", 1: "#F1F1F1" });
            myDiagram.nodeTemplate =
                $(go.Node, "Auto",
                    { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
                        mouseDrop: function (e, node) { finishDrop(e, node.containingGroup); },
                        click: function (e, node) {
                            // highlight all Links and Nodes coming out of a given Node
                            var diagram = node.diagram;
                            diagram.startTransaction("highlight");
                            // remove any previous highlighting
                            diagram.clearHighlighteds();
                            // for each Link coming out of the Node, set Link.isHighlighted
                            node.findLinksOutOf().each(function (l) { l.isHighlighted = true; });
                            // for each Node destination for the Node, set Node.isHighlighted
                            node.findNodesOutOf().each(function (n) { n.isHighlighted = true; });
                            diagram.commitTransaction("highlight");
                        }
                    },
                    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                    $(go.Shape, "RoundedRectangle",
                        { fill: graygrad, stroke: "black", strokeWidth: 2 },
                        new go.Binding("fill", "color")),
                    $(go.TextBlock,
                        {
                            row: 0,
                            column: 1,
                            margin: 5,
                            editable: false,
                            font: "bold 13px sans-serif",
                            opacity: 0.75,
                            stroke: "#404040"
                        },
                        new go.Binding("text", "text").makeTwoWay())
                );

            // initialize the Palette and its contents
            //myPalette =
            //    $(go.Palette, "myPaletteDiv",
            //        {
            //            nodeTemplateMap: myDiagram.nodeTemplateMap,
            //            groupTemplateMap: myDiagram.groupTemplateMap
            //        });

            //myPalette.model = new go.GraphLinksModel([
            //    { text: "lightgreen", color: "#ACE600" },
            //    { text: "yellow", color: "#FFDD33" },
            //    { text: "lightblue", color: "#33D3E5" },
            //    { isGroup: true, text: "H Group", horiz: true },
            //    { isGroup: true, text: "V Group", horiz: false }
            //]);

            myDiagram.click = function (e) {
                e.diagram.commit(function (d) { d.clearHighlighteds(); }, "no highlighteds");
            };

            var slider = document.getElementById("levelSlider");
            slider.addEventListener('change', reexpand);
            slider.addEventListener('input', reexpand);

            load();
        }

        function reexpand(e) {
            myDiagram.commit(function (diag) {
                var level = parseInt(document.getElementById("levelSlider").value);
                diag.findTopLevelGroups().each(function (g) { expandGroups(g, 0, level); })
            }, "reexpand");
        }

        function expandGroups(g, i, level) {
            if (!(g instanceof go.Group)) return;
            g.isSubGraphExpanded = i < level;
            g.memberParts.each(function (m) {
                expandGroups(m, i + 1, level);
            })
        }

        // save a model to and load a model from JSON text, displayed below the Diagram
        function save() {
            document.getElementById("mySavedModel").value = myDiagram.model.toJson();
            myDiagram.isModified = false;
        }

        function load() {
            var height1 = ($(window).height() - $('#header').height() - 20);
            $("#myDiagramDiv").height(height1);
            var nodeDataArray = []
            var linkDataArray = []
            var url = window.location.href;
            var pathwayId = getParameterByName('id', url);
            pathwayId = pathwayId === "" ? 73 : pathwayId;
            $.ajax({
                type: "POST",
                url: "WebService/pathwayMain.asmx/regroupingLayoutData",
                contentType: 'application/json',
                dataType: 'json',
                data: "{'pathwayid':'" + pathwayId + "'}",
                statusCode: {
                    401: function (xhr) {
                        window.location.href = "../../index.html";
                    }
                },
                success: function (response) {
                    var result = JSON.parse(response.d);
                    if (result.responseCode == 1) {
                        nodeDataArray.push(JSON.parse(result.responseValue.Table[0].resultJSON));
                        linkDataArray.push(JSON.parse(result.responseValue.Table[0].resultFlowRelation));
                        //console.log(result.responseValue.Table[0].resultJSON);
                        // console.log(JSON.parse(result.responseValue.Table[0].resultJSON));
                        var objectValue = {
                            "class": "go.GraphLinksModel",
                            "nodeDataArray": nodeDataArray[0],
                            "linkDataArray": linkDataArray[0]
                        }
                        //myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
                        myDiagram.model = go.Model.fromJson(objectValue);
                    }
                },
                error: function (error) {

                }
            });


        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <body onload="init()">
        <div id="sample" style="min-height: 220px">
            <div style="width: 100%; display: flex; justify-content: space-between">
                <%--<div id="myPaletteDiv" style="width: 130px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black; display: none"></div>--%>
                <div id="myDiagramDiv" style="flex-grow: 1; border: solid 1px black"></div>
            </div>
            <div id="levelSlider"></div>
        </div>
    </body>
</asp:Content>

