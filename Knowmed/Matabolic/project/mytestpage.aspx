<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

      <script src="go.js"></script>
   <%-- <script src="https://gojs.net/latest/extensions/DoubleTreeLayout.js"></script>--%>
    <script>
        $(document).ready(function () {
            //$("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
            //    e.preventDefault();
            //    $(this).siblings('a.active').removeClass("active");
            //    $(this).addClass("active");
            //    var index = $(this).index();
            //    $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
            //    $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
            //});

            //$('#btnShow').on('click', function () {
            //    $("#modalNav").modal('show');
            //    $('#modalNav .modal-title').text('Calcium Details');
            //});

        });



    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

 <%--   <style>
        /*  bhoechie tab */
        div.bhoechie-tab-container {
            /*z-index: 10;*/
            background-color: #ffffff;
            padding: 0 !important;
            border-radius: 4px;
            -moz-border-radius: 4px;
            border: 1px solid #ddd;
            /*margin-top: 20px;
            margin-left: 50px;*/
            -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
            box-shadow: 0 6px 12px rgba(0,0,0,.175);
            -moz-box-shadow: 0 6px 12px rgba(0,0,0,.175);
            background-clip: padding-box;
            /*opacity: 0.97;*/
            filter: alpha(opacity=97);
        }

        div.bhoechie-tab-menu {
            padding-right: 0;
            padding-left: 0;
            padding-bottom: 0;
        }

            div.bhoechie-tab-menu div.list-group {
                margin-bottom: 0;
            }

                div.bhoechie-tab-menu div.list-group > a {
                    margin-bottom: 0;
                }

                    div.bhoechie-tab-menu div.list-group > a .glyphicon,
                    div.bhoechie-tab-menu div.list-group > a .fa {
                        color: #5A55A3;
                    }

                    div.bhoechie-tab-menu div.list-group > a:first-child {
                        border-top-right-radius: 0;
                        -moz-border-top-right-radius: 0;
                    }

                    div.bhoechie-tab-menu div.list-group > a:last-child {
                        border-bottom-right-radius: 0;
                        -moz-border-bottom-right-radius: 0;
                    }

                    div.bhoechie-tab-menu div.list-group > a.active,
                    div.bhoechie-tab-menu div.list-group > a.active .glyphicon,
                    div.bhoechie-tab-menu div.list-group > a.active .fa {
                        background-color: #5A55A3;
                        background-image: #5A55A3;
                        color: #ffffff;
                    }

                        div.bhoechie-tab-menu div.list-group > a.active:after {
                            content: '';
                            position: absolute;
                            left: 100%;
                            top: 50%;
                            margin-top: -13px;
                            border-left: 0;
                            border-bottom: 13px solid transparent;
                            border-top: 13px solid transparent;
                            border-left: 10px solid #5A55A3;
                        }

        div.bhoechie-tab-content {
            background-color: #ffffff;
            /* border: 1px solid #eeeeee; */
            padding-left: 20px;
            padding-top: 10px;
        }

        div.bhoechie-tab div.bhoechie-tab-content:not(.active) {
            display: none;
        }
    </style>--%>

    <%-- <script id="code">

        $(document).ready(function () {

            var userLoginID = 1;
            var pathwayId = 87;
            var keyword = 'Interleukin 6';
            var keyId = 560;
            var rankNo = 2;

            $.ajax({
                type: "POST",
                url: "WebService/pathwayMain1.asmx/getMyGraphData",
                contentType: 'application/json',
                dataType: 'json',
                 data: "{'pathwayId': '" + pathwayId + "','keyword':'" + keyword + "','keyId':'" + keyId + "','rankNo':'" + rankNo + "','empid':'" + userLoginID + "'}",
                statusCode: {
                    401: function (xhr) {
                        window.location.href = "../../index.html";
                    }
                },
                success: function (data) {
                    var result = JSON.parse(data.d).responseValue.Table;
                    if (result && result.length > 0) {
                        var mainNode = JSON.parse(result[0].mainNode);
                    }

                    //var obj = {
                    //    "someProperty": "someValue",
                    //    "nodes": mainNode,
                    //    "someOtherProperty": 123
                    //};

                    console.log(mainNode);
                    init(mainNode);
                },
                error: function (error) {

                }
            });

                        
            //init();
        });




        function init(mainNode) {
            if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
            var $ = go.GraphObject.make;  // for conciseness in defining templates in this function

            myDiagram =
                $(go.Diagram, "myDiagramDiv",
                    {
                        layout: $(DoubleTreeLayout,
                            {
                                //vertical: true,  // default directions are horizontal
                                // choose whether this subtree is growing towards the right or towards the left:
                                directionFunction: function (n) { return n.data && n.data.dir !== "left"; }
                                // controlling the parameters of each TreeLayout:
                                //bottomRightOptions: { nodeSpacing: 0, layerSpacing: 20 },
                                //topLeftOptions: { alignment: go.TreeLayout.AlignmentStart },
                            })
                    });

            // define all of the gradient brushes
            var graygrad = $(go.Brush, "Linear", { 0: "#F5F5F5", 1: "#F1F1F1" });
            var bluegrad = $(go.Brush, "Linear", { 0: "#CDDAF0", 1: "#91ADDD" });
            var yellowgrad = $(go.Brush, "Linear", { 0: "#FEC901", 1: "#FEA200" });
            var lavgrad = $(go.Brush, "Linear", { 0: "#EF9EFA", 1: "#A570AD" });


               // create the model for the double tree; could be eiher TreeModel or GraphLinksModel
            //var mainNode = ([
            //    { key: "Root", color: lavgrad },
            //    { key: "Left1", parent: "Root", dir: "left", color: bluegrad },
            //    { key: "leaf1", parent: "Left1" },
            //    { key: "leaf2", parent: "Left1" },
            //    { key: "Left2", parent: "Left1", color: bluegrad },
            //    { key: "leaf3", parent: "Left2" },
            //    { key: "leaf4", parent: "Left2" },
            //    { key: "leaf5", parent: "leaf4" },
            //    { key: "leaf5", parent: "Left1" },
            //    { key: "Right1", parent: "Root", dir: "right", color: yellowgrad },
            //    { key: "Right2", parent: "Right1", color: yellowgrad },
            //    { key: "leaf11", parent: "Right2" },
            //    { key: "leaf12", parent: "Right2" },
            //    { key: "leaf13", parent: "Right2" },
            //    { key: "leaf14", parent: "Right1" },
            //    { key: "leaf15", parent: "Right1" },
            //    { key: "leaf15", parent: "Right3" },
            //    { key: "leaf15", parent: "leaf1" },
            //    { key: "Right3", parent: "Root", dir: "right", color: yellowgrad },
            //    { key: "leaf16", parent: "Right3" },
            //    { key: "leaf17", parent: "Right3" }
            //]);


            myDiagram.nodeTemplate =
                $(go.Node, "Auto",
                    { isShadowed: true },
                    // define the node's outer shape
                    $(go.Shape, "RoundedRectangle",
                        { fill: graygrad, stroke: "#D8D8D8" },  // default fill is gray
                        new go.Binding("fill", "color")),
                    // define the node's text
                    $(go.TextBlock,
                        { margin: 5, font: "bold 11px Helvetica, bold Arial, sans-serif" },
                        new go.Binding("text", "key"))
                );

            myDiagram.linkTemplate =
                $(go.Link,  // the whole link panel
                    { selectable: false },
                    $(go.Shape));  // the link shape

            // create the model for the double tree; could be eiher TreeModel or GraphLinksModel
            myDiagram.model = new go.TreeModel(mainNode);
        }
    </script>


    <div id="sample">
        <div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 900px"></div>
        <p>
            This sample displays a diagram of two trees sharing a single root node growing in opposite directions.
    The immediate child data of the ROOT node have a "dir" property
    that describes the direction that subtree should grow.
        </p>
        <p>
            The <a>Diagram.layout</a> is an instance of the <a>DoubleTreeLayout</a> extension layout,
    defined in <a href="../extensions/DoubleTreeLayout.js">extensions/DoubleTreeLayout.js</a>.
    The layout requires a <a>DoubleTreeLayout.directionFunction</a> predicate to decide for a child node
    of the root node which way the subtree should grow.
        </p>
    </div>--%>

     <script id="code">
        // These parameters need to be set before defining the templates.
        var MINLENGTH = 200;  // this controls the minimum length of any swimlane
        var MINBREADTH = 20;  // this controls the minimum breadth of any non-collapsed swimlane

        // some shared functions

        // this may be called to force the lanes to be laid out again
        function relayoutLanes() {
            myDiagram.nodes.each(function (lane) {
                if (!(lane instanceof go.Group)) return;
                if (lane.category === "Pool") return;
                lane.layout.isValidLayout = false;  // force it to be invalid
            });
            myDiagram.layoutDiagram();
        }

        // this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again
        function relayoutDiagram() {
            myDiagram.layout.invalidateLayout();
            myDiagram.findTopLevelGroups().each(function (g) { if (g.category === "Pool") g.layout.invalidateLayout(); });
            myDiagram.layoutDiagram();
        }

        // compute the minimum size of a Pool Group needed to hold all of the Lane Groups
        function computeMinPoolSize(pool) {
            // assert(pool instanceof go.Group && pool.category === "Pool");
            var len = MINLENGTH;
            pool.memberParts.each(function (lane) {
                // pools ought to only contain lanes, not plain Nodes
                if (!(lane instanceof go.Group)) return;
                var holder = lane.placeholder;
                if (holder !== null) {
                    var sz = holder.actualBounds;
                    len = Math.max(len, sz.width);
                }
            });
            return new go.Size(len, NaN);
        }

        // compute the minimum size for a particular Lane Group
        function computeLaneSize(lane) {
            // assert(lane instanceof go.Group && lane.category !== "Pool");
            var sz = computeMinLaneSize(lane);
            if (lane.isSubGraphExpanded) {
                var holder = lane.placeholder;
                if (holder !== null) {
                    var hsz = holder.actualBounds;
                    sz.height = Math.ceil(Math.max(sz.height, hsz.height));
                }
            }
            // minimum breadth needs to be big enough to hold the header
            var hdr = lane.findObject("HEADER");
            if (hdr !== null) sz.height = Math.ceil(Math.max(sz.height, hdr.actualBounds.height));
            return sz;
        }

        // determine the minimum size of a Lane Group, even if collapsed
        function computeMinLaneSize(lane) {
            if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);
            return new go.Size(MINLENGTH, MINBREADTH);
        }


        // define a custom ResizingTool to limit how far one can shrink a lane Group
        function LaneResizingTool() {
            go.ResizingTool.call(this);
        }
        go.Diagram.inherit(LaneResizingTool, go.ResizingTool);

        LaneResizingTool.prototype.isLengthening = function () {
            return (this.handle.alignment === go.Spot.Right);
        };

        LaneResizingTool.prototype.computeMinSize = function () {
            var lane = this.adornedObject.part;
            // assert(lane instanceof go.Group && lane.category !== "Pool");
            var msz = computeMinLaneSize(lane);  // get the absolute minimum size
            if (this.isLengthening()) {  // compute the minimum length of all lanes
                var sz = computeMinPoolSize(lane.containingGroup);
                msz.width = Math.max(msz.width, sz.width);
            } else {  // find the minimum size of this single lane
                var sz = computeLaneSize(lane);
                msz.width = Math.max(msz.width, sz.width);
                msz.height = Math.max(msz.height, sz.height);
            }
            return msz;
        };

        LaneResizingTool.prototype.resize = function (newr) {
            var lane = this.adornedObject.part;
            if (this.isLengthening()) {  // changing the length of all of the lanes
                lane.containingGroup.memberParts.each(function (lane) {
                    if (!(lane instanceof go.Group)) return;
                    var shape = lane.resizeObject;
                    if (shape !== null) {  // set its desiredSize length, but leave each breadth alone
                        shape.width = newr.width;
                    }
                });
            } else {  // changing the breadth of a single lane
                go.ResizingTool.prototype.resize.call(this, newr);
            }
            relayoutDiagram();  // now that the lane has changed size, layout the pool again
        };
        // end LaneResizingTool class


        // define a custom grid layout that makes sure the length of each lane is the same
        // and that each lane is broad enough to hold its subgraph
        function PoolLayout() {
            go.GridLayout.call(this);
            this.cellSize = new go.Size(1, 1);
            this.wrappingColumn = 1;
            this.wrappingWidth = Infinity;
            this.isRealtime = false;  // don't continuously layout while dragging
            this.alignment = go.GridLayout.Position;
            // This sorts based on the location of each Group.
            // This is useful when Groups can be moved up and down in order to change their order.
            this.comparer = function (a, b) {
                var ay = a.location.y;
                var by = b.location.y;
                if (isNaN(ay) || isNaN(by)) return 0;
                if (ay < by) return -1;
                if (ay > by) return 1;
                return 0;
            };
            this.boundsComputation = function (part, layout, rect) {
                part.getDocumentBounds(rect);
                rect.inflate(-1, -1);  // negative strokeWidth of the border Shape
                return rect;
            }
        }
        go.Diagram.inherit(PoolLayout, go.GridLayout);

        PoolLayout.prototype.doLayout = function (coll) {
            var diagram = this.diagram;
            if (diagram === null) return;
            diagram.startTransaction("PoolLayout");
            var pool = this.group;
            if (pool !== null && pool.category === "Pool") {
                // make sure all of the Group Shapes are big enough
                var minsize = computeMinPoolSize(pool);
                pool.memberParts.each(function (lane) {
                    if (!(lane instanceof go.Group)) return;
                    if (lane.category !== "Pool") {
                        var shape = lane.resizeObject;
                        if (shape !== null) {  // change the desiredSize to be big enough in both directions
                            var sz = computeLaneSize(lane);
                            shape.width = (isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width));
                            shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
                            var cell = lane.resizeCellSize;
                            if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) shape.width = Math.ceil(shape.width / cell.width) * cell.width;
                            if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) shape.height = Math.ceil(shape.height / cell.height) * cell.height;
                        }
                    }
                });
            }
            // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
            go.GridLayout.prototype.doLayout.call(this, coll);
            diagram.commitTransaction("PoolLayout");
        };
        // end PoolLayout class


        function init() {
            if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
            var $ = go.GraphObject.make;

            myDiagram =
                $(go.Diagram, "myDiagramDiv",
                    {
                        // use a custom ResizingTool (along with a custom ResizeAdornment on each Group)
                        resizingTool: new LaneResizingTool(),
                        // use a simple layout that ignores links to stack the top-level Pool Groups next to each other
                        layout: $(PoolLayout),
                        // don't allow dropping onto the diagram's background unless they are all Groups (lanes or pools)
                        mouseDragOver: function (e) {
                            if (!e.diagram.selection.all(function (n) { return n instanceof go.Group; })) {
                                e.diagram.currentCursor = 'not-allowed';
                            }
                        },
                        mouseDrop: function (e) {
                            if (!e.diagram.selection.all(function (n) { return n instanceof go.Group; })) {
                                e.diagram.currentTool.doCancel();
                            }
                        },
                        // a clipboard copied node is pasted into the original node's group (i.e. lane).
                        "commandHandler.copiesGroupKey": true,
                        // automatically re-layout the swim lanes after dragging the selection
                        "SelectionMoved": relayoutDiagram,  // this DiagramEvent listener is
                        "SelectionCopied": relayoutDiagram, // defined above
                        "animationManager.isEnabled": false,
                        // enable undo & redo
                        "undoManager.isEnabled": true
                    });

            // this is a Part.dragComputation function for limiting where a Node may be dragged
            // use GRIDPT instead of PT if DraggingTool.isGridSnapEnabled and movement should snap to grid
            function stayInGroup(part, pt, gridpt) {
                // don't constrain top-level nodes
                var grp = part.containingGroup;
                if (grp === null) return pt;
                // try to stay within the background Shape of the Group
                var back = grp.resizeObject;
                if (back === null) return pt;
                // allow dragging a Node out of a Group if the Shift key is down
                if (part.diagram.lastInput.shift) return pt;
                var p1 = back.getDocumentPoint(go.Spot.TopLeft);
                var p2 = back.getDocumentPoint(go.Spot.BottomRight);
                var b = part.actualBounds;
                var loc = part.location;
                // find the padding inside the group's placeholder that is around the member parts
                var m = grp.placeholder.padding;
                // now limit the location appropriately
                var x = Math.max(p1.x + m.left, Math.min(pt.x, p2.x - m.right - b.width - 1)) + (loc.x - b.x);
                var y = Math.max(p1.y + m.top, Math.min(pt.y, p2.y - m.bottom - b.height - 1)) + (loc.y - b.y);
                return new go.Point(x, y);
            }

            myDiagram.nodeTemplate =
                $(go.Node, "Auto",
                    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                    $(go.Shape, "Rectangle",
                        { fill: "white", portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true }),
                    $(go.TextBlock, { margin: 5 },
                        new go.Binding("text", "key")),
                    { dragComputation: stayInGroup } // limit dragging of Nodes to stay within the containing Group, defined above
                );

            function groupStyle() {  // common settings for both Lane and Pool Groups
                return [
                    {
                        layerName: "Background",  // all pools and lanes are always behind all nodes and links
                        background: "transparent",  // can grab anywhere in bounds
                        movable: true, // allows users to re-order by dragging
                        copyable: false,  // can't copy lanes or pools
                        avoidable: false,  // don't impede AvoidsNodes routed Links
                        minLocation: new go.Point(NaN, -Infinity),  // only allow vertical movement
                        maxLocation: new go.Point(NaN, Infinity)
                    },
                    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
                ];
            }

            // hide links between lanes when either lane is collapsed
            function updateCrossLaneLinks(group) {
                group.findExternalLinksConnected().each(function (l) {
                    l.visible = (l.fromNode.isVisible() && l.toNode.isVisible());
                });
            }

            // each Group is a "swimlane" with a header on the left and a resizable lane on the right
            myDiagram.groupTemplate =
                $(go.Group, "Horizontal", groupStyle(),
                    {
                        selectionObjectName: "SHAPE",  // selecting a lane causes the body of the lane to be highlit, not the label
                        resizable: true, resizeObjectName: "SHAPE",  // the custom resizeAdornmentTemplate only permits two kinds of resizing
                        layout: $(go.LayeredDigraphLayout,  // automatically lay out the lane's subgraph
                            {
                                isInitial: false,  // don't even do initial layout
                                isOngoing: false,  // don't invalidate layout when nodes or links are added or removed
                                direction: 0,
                                columnSpacing: 10,
                                layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
                            }),
                        computesBoundsAfterDrag: true,  // needed to prevent recomputing Group.placeholder bounds too soon
                        computesBoundsIncludingLinks: false,  // to reduce occurrences of links going briefly outside the lane
                        computesBoundsIncludingLocation: true,  // to support empty space at top-left corner of lane
                        handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
                        mouseDrop: function (e, grp) {  // dropping a copy of some Nodes and Links onto this Group adds them to this Group
                            if (!e.shift) return;  // cannot change groups with an unmodified drag-and-drop
                            // don't allow drag-and-dropping a mix of regular Nodes and Groups
                            if (!e.diagram.selection.any(function (n) { return n instanceof go.Group; })) {
                                var ok = grp.addMembers(grp.diagram.selection, true);
                                if (ok) {
                                    updateCrossLaneLinks(grp);
                                } else {
                                    grp.diagram.currentTool.doCancel();
                                }
                            } else {
                                e.diagram.currentTool.doCancel();
                            }
                        },
                        subGraphExpandedChanged: function (grp) {
                            var shp = grp.resizeObject;
                            if (grp.diagram.undoManager.isUndoingRedoing) return;
                            if (grp.isSubGraphExpanded) {
                                shp.height = grp._savedBreadth;
                            } else {
                                grp._savedBreadth = shp.height;
                                shp.height = NaN;
                            }
                            updateCrossLaneLinks(grp);
                        }
                    },
                    new go.Binding("isSubGraphExpanded", "expanded").makeTwoWay(),
                    // the lane header consisting of a Shape and a TextBlock
                    $(go.Panel, "Horizontal",
                        {
                            name: "HEADER",
                            angle: 270,  // maybe rotate the header to read sideways going up
                            alignment: go.Spot.Center
                        },
                        $(go.Panel, "Horizontal",  // this is hidden when the swimlane is collapsed
                            new go.Binding("visible", "isSubGraphExpanded").ofObject(),
                            $(go.Shape, "Diamond",
                                { width: 8, height: 8, fill: "white" },
                                new go.Binding("fill", "color")),
                            $(go.TextBlock,  // the lane label
                                { font: "bold 13pt sans-serif", editable: true, margin: new go.Margin(2, 0, 0, 0) },
                                new go.Binding("text", "text").makeTwoWay())
                        ),
                        $("SubGraphExpanderButton", { margin: 5 })  // but this remains always visible!
                    ),  // end Horizontal Panel
                    $(go.Panel, "Auto",  // the lane consisting of a background Shape and a Placeholder representing the subgraph
                        $(go.Shape, "Rectangle",  // this is the resized object
                            { name: "SHAPE", fill: "white" },
                            new go.Binding("fill", "color"),
                            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
                        $(go.Placeholder,
                            { padding: 12, alignment: go.Spot.TopLeft }),
                        $(go.TextBlock,  // this TextBlock is only seen when the swimlane is collapsed
                            {
                                name: "LABEL",
                                font: "bold 13pt sans-serif", editable: true,
                                angle: 0, alignment: go.Spot.TopLeft, margin: new go.Margin(2, 0, 0, 4)
                            },
                            new go.Binding("visible", "isSubGraphExpanded", function (e) { return !e; }).ofObject(),
                            new go.Binding("text", "text").makeTwoWay())
                    )  // end Auto Panel
                );  // end Group

            // define a custom resize adornment that has two resize handles if the group is expanded
            myDiagram.groupTemplate.resizeAdornmentTemplate =
                $(go.Adornment, "Spot",
                    $(go.Placeholder),
                    $(go.Shape,  // for changing the length of a lane
                        {
                            alignment: go.Spot.Right,
                            desiredSize: new go.Size(7, 50),
                            fill: "lightblue", stroke: "dodgerblue",
                            cursor: "col-resize"
                        },
                        new go.Binding("visible", "", function (ad) {
                            if (ad.adornedPart === null) return false;
                            return ad.adornedPart.isSubGraphExpanded;
                        }).ofObject()),
                    $(go.Shape,  // for changing the breadth of a lane
                        {
                            alignment: go.Spot.Bottom,
                            desiredSize: new go.Size(50, 7),
                            fill: "lightblue", stroke: "dodgerblue",
                            cursor: "row-resize"
                        },
                        new go.Binding("visible", "", function (ad) {
                            if (ad.adornedPart === null) return false;
                            return ad.adornedPart.isSubGraphExpanded;
                        }).ofObject())
                );

            myDiagram.groupTemplateMap.add("Pool",
                $(go.Group, "Auto", groupStyle(),
                    { // use a simple layout that ignores links to stack the "lane" Groups on top of each other
                        layout: $(PoolLayout, { spacing: new go.Size(0, 0) })  // no space between lanes
                    },
                    $(go.Shape,
                        { fill: "white" },
                        new go.Binding("fill", "color")),
                    $(go.Panel, "Table",
                        { defaultColumnSeparatorStroke: "black" },
                        $(go.Panel, "Horizontal",
                            { column: 0, angle: 270 },
                            $(go.TextBlock,
                                { font: "bold 16pt sans-serif", editable: true, margin: new go.Margin(2, 0, 0, 0) },
                                new go.Binding("text").makeTwoWay())
                        ),
                        $(go.Placeholder,
                            { column: 1 })
                    )
                ));

            myDiagram.linkTemplate =
                $(go.Link,
                    { routing: go.Link.AvoidsNodes, corner: 5 },
                    { relinkableFrom: true, relinkableTo: true },
                    $(go.Shape),
                    $(go.Shape, { toArrow: "Standard" })
                );

            // define some sample graphs in some of the lanes
            myDiagram.model = new go.GraphLinksModel(
                [ // node data
                    { key: "Pool1", text: "Calcium", isGroup: true, category: "Pool", horiz: false },
                    { key: "Pool2", text: "Pool2", isGroup: true, category: "Pool", horiz: false },
                    { key: "Lane1", text: "Lane1", isGroup: true, group: "Pool1", color: "lightblue", horiz: false },
                    { key: "Lane2", text: "Fate & Feeder", isGroup: true, group: "Pool1", color: "white", horiz: false },
                    { key: "Lane3", text: "Lane3", isGroup: true, group: "Pool1", color: "lightyellow", horiz: false },
                    { key: "Lane4", text: "Lane4", isGroup: true, group: "Pool1", color: "orange", horiz: false },
                    { key: "oneA", group: "Lane1" },
                    { key: "oneB", group: "Lane1" },
                    { key: "oneC", group: "Lane1" },
                    { key: "oneD", group: "Lane1" },
                    { key: "twoA", group: "Lane2" },
                    { key: "twoB", group: "Lane2" },
                    { key: "twoC", group: "Lane2" },
                    { key: "twoD", group: "Lane2", color: "orange" },
                    { key: "twoE", group: "Lane2" },
                    { key: "twoF", group: "Lane2" },
                    { key: "twoG", group: "Lane2" },
                    { key: "fourA", group: "Lane4" },
                    { key: "fourB", group: "Lane4" },
                    { key: "fourC", group: "Lane4" },
                    { key: "fourD", group: "Lane4" },
                    { key: "Lane5", text: "Lane5", isGroup: true, group: "Pool2", color: "lightyellow", horiz: false },
                    { key: "Lane6", text: "Lane6", isGroup: true, group: "Pool2", color: "lightgreen", horiz: false },
                    { key: "fiveA", group: "Lane5" },
                    { key: "sixA", group: "Lane6" }
                ],
                [ // link data
                    { from: "oneA", to: "oneB" },
                    { from: "oneA", to: "oneC" },
                    { from: "oneB", to: "oneD" },
                    { from: "oneC", to: "oneD" },
                    { from: "twoA", to: "twoB" },
                    { from: "twoA", to: "twoC" },
                    { from: "twoA", to: "twoF" },
                    { from: "twoB", to: "twoD" },
                    { from: "twoC", to: "twoD" },
                    { from: "twoD", to: "twoG" },
                    { from: "twoE", to: "twoG" },
                    { from: "twoF", to: "twoG" },
                    { from: "twoF", to: "twoD" },
                    { from: "fourA", to: "fourB" },
                    { from: "fourB", to: "fourC" },
                    { from: "fourC", to: "fourD" }
                ]);
            // force all lanes' layouts to be performed
            relayoutLanes();
        }  // end init

        // Show the diagram's model in JSON format
        function save() {
            document.getElementById("mySavedModel").value = myDiagram.model.toJson();
            myDiagram.isModified = false;
        }
        function load() {
            myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
            myDiagram.delayInitialization(relayoutDiagram);
        }
    </script>

     <body onload="init()">
        <div id="sample">
            <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 700px;"></div>
        </div>
    </body>


   <%-- <div class="container">
        <div class="row">

            <input type="button" class="btn btn-success" value="Show" id="btnShow" />

            <div class="modal fade" id="modalNav" style="width: 90%; left: 6%; display: none;" role="dialog">
                <div class="modal-dialog" style="width: 100rem;">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title"></h4>
                        </div>
                        <div class="modal-body">
                             <div class="col-md-12 bhoechie-tab-container">
                            <div class="col-md-3 bhoechie-tab-menu">
                                <div class="list-group">
                                    <a href="#" class="list-group-item active text-center">
                                        <h5>Flight</h5>
                                    </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h5>Train</h5>
                                    </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h5>Hotel</h5>
                                    </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h5>Restaurant</h5>
                                    </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h5>Credit Card</h5>
                                    </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h5>Train</h5>
                                    </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h5>Hotel</h5>
                                    </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h5>Restaurant</h5>
                                    </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h5>Credit Card</h5>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-9 bhoechie-tab">
                                <div class="bhoechie-tab-content active">
                                    tab 1
                                </div>
                                <div class="bhoechie-tab-content">
                                    tab 2
                                </div>
                                <div class="bhoechie-tab-content">
                                    tab 3
                                </div>
                                <div class="bhoechie-tab-content">
                                    tab 4
                                </div>
                                <div class="bhoechie-tab-content">
                                    tab 5
                                </div>
                                <div class="bhoechie-tab-content">
                                    tab 6
                                </div>
                                <div class="bhoechie-tab-content">
                                    tab 7
                                </div>
                                <div class="bhoechie-tab-content">
                                    tab 8
                                </div>
                                <div class="bhoechie-tab-content">
                                    tab 9
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>--%>

</asp:Content>

