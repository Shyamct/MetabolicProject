var HORIZONTAL = true;
var pathwayId = 0;
var phenomenonID = 0;
var urlPathwayId = 0;
var moleculeName = "";
var notfillDite = "";
var allEnzyme = "";
var drugGiven;
var varSetTimeOut;
// These parameters need to be set before defining the templates.
var MINLENGTH = 20;  // this controls the minimum length of any swimlane
var MINBREADTH = 20;  // this controls the minimum breadth of any non-collapsed swimlane

// some shared functions

$(document).ready(function () {
    var url = window.location.href;
    urlPathwayId = pathwayId;
    getpathwayId();

});

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
            if (HORIZONTAL) {
                len = Math.max(len, sz.width);
            } else {
                len = Math.max(len, sz.height);
            }

        }
    });
    if (HORIZONTAL) {
        return new go.Size(len, NaN);
    } else {
        return new go.Size(NaN, len);
    }
}

// compute the minimum size for a particular Lane Group
function computeLaneSize(lane) {
    // assert(lane instanceof go.Group && lane.category !== "Pool");
    var sz = computeMinLaneSize(lane);
    if (lane.isSubGraphExpanded) {
        var holder = lane.placeholder;
        if (holder !== null) {
            var hsz = holder.actualBounds;
            if (HORIZONTAL) {
                sz.height = Math.max(sz.height, hsz.height);
            } else {
                sz.width = Math.max(sz.width, hsz.width);
            }

        }
    }
    // minimum breadth needs to be big enough to hold the header
    var hdr = lane.findObject("HEADER");
    sz.width = Math.max(sz.width, hsz.width);
    if (hdr !== null) {
        if (HORIZONTAL) {
            sz.height = Math.max(sz.height, hdr.actualBounds.height);
        } else {
            sz.width = Math.max(sz.width, hdr.actualBounds.width);
        }
    }
    return sz;
}

// determine the minimum size of a Lane Group, even if collapsed
function computeMinLaneSize(lane) {
    if (HORIZONTAL) {
        if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);
        return new go.Size(MINLENGTH, MINBREADTH);
    } else {
        if (!lane.isSubGraphExpanded) return new go.Size(1, MINLENGTH);
        return new go.Size(MINBREADTH, MINLENGTH);
    }
}


// define a custom ResizingTool to limit how far one can shrink a lane Group
function LaneResizingTool() {
    go.ResizingTool.call(this);
}

go.Diagram.inherit(LaneResizingTool, go.ResizingTool);

LaneResizingTool.prototype.isLengthening = function () {
    if (HORIZONTAL) {
        return (this.handle.alignment === go.Spot.Right);
    } else {
        return (this.handle.alignment === go.Spot.Bottom);
    }
};

LaneResizingTool.prototype.computeMinSize = function () {
    var lane = this.adornedObject.part;
    // assert(lane instanceof go.Group && lane.category !== "Pool");
    var msz = computeMinLaneSize(lane);  // get the absolute minimum size
    if (this.isLengthening()) {  // compute the minimum length of all lanes
        var sz = computeMinPoolSize(lane.containingGroup);
        if (HORIZONTAL) {
            msz.width = Math.max(msz.width, sz.width);
        } else {
            msz.height = Math.max(msz.height, sz.height);
        }
    } else {  // find the minimum size of this single lane
        var sz = computeLaneSize(lane);
        if (HORIZONTAL) {
            msz.width = Math.max(msz.width, sz.width);
        } else {
            msz.height = Math.max(msz.height, sz.height);
        }
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
                if (HORIZONTAL) {
                    shape.width = newr.width;
                } else {
                    shape.height = newr.height;
                }
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
    this.cellSize = new go.Size(0, 0);
    this.wrappingColumn = HORIZONTAL ? 1 : Infinity;
    this.wrappingWidth = Infinity;
    this.isRealtime = false;  // don't continuously layout while dragging
    this.alignment = go.GridLayout.Position;
    this.spacing = new go.Size(0, 0);
    // This sorts based on the location of each Group.
    // This is useful when Groups can be moved up and down in order to change their order.
    this.comparer = function (a, b) {
        if (HORIZONTAL) {
            var ay = a.location.y;
            var by = b.location.y;
            if (isNaN(ay) || isNaN(by)) return 0;
            if (ay < by) return -1;
            if (ay > by) return 1;
        } else {
            var ax = a.location.x;
            var bx = b.location.x;
            if (isNaN(ax) || isNaN(bx)) return 0;
            if (ax < bx) return -1;
            if (ax > bx) return 1;
        }
        return 0;
    };
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
                    if (HORIZONTAL) {
                        shape.width = (isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width));
                        shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
                    } else {
                        shape.width = (!isNaN(shape.width)) ? Math.max(shape.width, sz.width) : sz.width;
                        shape.height = (isNaN(shape.height) ? minsize.height : Math.max(shape.height, minsize.height));
                    }
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


function init(data, data1) {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;
    myDiagram =
        $(go.Diagram, "myDiagramDiv",
            {
                // use a custom ResizingTool (along with a custom ResizeAdornment on each Group)
                //resizingTool: new LaneResizingTool(),
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
                "commandHandler.copiesGroupKey": false,
                // automatically re-layout the swim lanes after dragging the selection
                "SelectionMoved": relayoutDiagram,  // this DiagramEvent listener is
                "SelectionCopied": relayoutDiagram, // defined above
                "animationManager.isEnabled": true,
                // enable undo & redo
                "undoManager.isEnabled": false
            });


    // this is a Part.dragComputation function for limiting where a Node may be dragged
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
            { // when the user clicks on a Node, highlight all Links coming out of the node
                // and all of the Nodes at the other ends of those Links.
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
            $(go.Shape, "Rectangle",
                { portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true },
                new go.Binding("fill", "color"),
                //new go.Binding("fill", "highlight", function (v) { return v ? "pink" : "color"; }),
                new go.Binding("stroke", "highlight", function (v) { return v ? "red" : "blue"; }),
                new go.Binding("strokeWidth", "highlight", function (v) { return v ? 5 : 1; }),
                new go.Binding("stroke", "isHighlighted", function (h) { return h ? "red" : "black"; })
                    .ofObject()
            ),
            {
                toolTip:  // define a tooltip for each node that displays the color as text
                    $("ToolTip",
                        $(go.TextBlock, { margin: 4 },
                            new go.Binding("text", "description"))
                    )  // end of Adornment
            },
            $(go.TextBlock, { font: "bold 20pt sans-serif", margin: 2 },
                new go.Binding("text")),
            { dragComputation: stayInGroup },
            //{
            //    contextMenu:     // define a context menu for each node
            //        $("ContextMenu",  // that has one button
            //            $("ContextMenuButton",
            //                $(go.TextBlock, "Diet Advice", { margin: 5 }),
            //                { click: getEat }, new go.Binding("visible", "isDiet")),
            //            $("ContextMenuButton",
            //                $(go.TextBlock, "Center Molecule", { margin: 5 }),
            //                { click: SetCenterMolecule },
            //                new go.Binding("visible", "isCenterMolecule")
            //            ),
            //            $("ContextMenuButton",
            //                $(go.TextBlock, "Remove Center Molecule", { margin: 5 }),
            //                { click: SetCenterMolecule },
            //                new go.Binding("visible", "isRemoveCenterMolecule")
            //            ),
            //            $("ContextMenuButton",
            //                $(go.TextBlock, "Diet Not Required", { margin: 5 }),
            //                { click: setDietRequired },
            //                new go.Binding("visible", "isDiet")),
            //            $("ContextMenuButton",
            //                $(go.TextBlock, "Process Diet Not Required", { margin: 5 }),
            //                { click: setDietRequired },
            //                new go.Binding("visible", "isDiet")),
            //            $("ContextMenuButton",
            //                $(go.TextBlock, "Harmful", { margin: 5 }),
            //                { click: setDietRequired },
            //                new go.Binding("visible", "isDiet")),
            //            $("ContextMenuButton",
            //                $(go.TextBlock, "Beneficial", { margin: 5 }),
            //                { click: setDietRequired },
            //                new go.Binding("visible", "isDiet")),
            //            $("ContextMenuButton",
            //                $(go.TextBlock, "Fate & Feeder", { margin: 5 }),
            //                { click: getkeywordRelation }),
            //            $("ContextMenuButton",
            //                $(go.TextBlock, "Clinical Features", { margin: 5 }),
            //                { click: getClinicalFeatures }),
            //            $("ContextMenuButton",
            //                $(go.TextBlock, "Add Enzyme", { margin: 5 }),
            //                { click: SetEnzyme },
            //                new go.Binding("visible", "isAddEnzyme")),
            //            //$("ContextMenuButton",
            //            //    $(go.TextBlock, "Remove Enzyme", { margin: 5 }),
            //            //    { click: SetEnzyme },
            //            //    new go.Binding("visible", "isRemoveAddEnzyme")),
            //            $("ContextMenuButton",
            //                $(go.TextBlock, "Check Medicine", { margin: 5 }),
            //                { click: chkMedicine },
            //                new go.Binding("visible", "isChkMedicine")
            //            )


            //            // more ContextMenuButtons would go here
            //        )  // end Adornment
            //} // limit dragging of Nodes to stay within the containing Group, defined above
        );

    function groupStyle() {  // common settings for both Lane and Pool Groups
        if (HORIZONTAL) {
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
        } else {
            return [
                {
                    layerName: "Background",  // all pools and lanes are always behind all nodes and links
                    background: "transparent",  // can grab anywhere in bounds
                    movable: true, // allows users to re-order by dragging
                    copyable: false,  // can't copy lanes or pools
                    avoidable: false,  // don't impede AvoidsNodes routed Links
                    minLocation: new go.Point(-Infinity, NaN),  // only allow horizontal movement
                    maxLocation: new go.Point(Infinity, NaN)
                },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
            ];
        }
    }

    // hide links between lanes when either lane is collapsed
    function updateCrossLaneLinks(group) {
        group.findExternalLinksConnected().each(function (l) {
            l.visible = (l.fromNode.isVisible() && l.toNode.isVisible());
        });
    }

    // each Group is a "swimlane" with a header on the left and a resizable lane on the right
    myDiagram.groupTemplate =
        $(go.Group, HORIZONTAL ? "Horizontal" : "Vertical", groupStyle(),
            {
                defaultStretch: go.GraphObject.Horizontal,
                selectionObjectName: "SHAPE",  // selecting a lane causes the body of the lane to be highlit, not the label
                resizable: true, resizeObjectName: "SHAPE",  // the custom resizeAdornmentTemplate only permits two kinds of resizing
                layout: $(go.LayeredDigraphLayout,  // automatically lay out the lane's subgraph
                    {
                        isInitial: false,  // don't even do initial layout
                        isOngoing: false,  // don't invalidate layout when nodes or links are added or removed
                        direction: HORIZONTAL ? 0 : 90,
                        columnSpacing: 1,
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
                    if (HORIZONTAL) {
                        if (grp.isSubGraphExpanded) {
                            shp.height = grp._savedBreadth;
                        } else {
                            grp._savedBreadth = shp.height;
                            shp.height = NaN;
                        }
                    } else {
                        if (grp.isSubGraphExpanded) {
                            shp.width = grp._savedBreadth;
                        } else {
                            grp._savedBreadth = shp.width;
                            shp.width = NaN;
                        }
                    }
                    updateCrossLaneLinks(grp);
                }
            },
            new go.Binding("isSubGraphExpanded", "expanded").makeTwoWay(),
            // the lane header consisting of a Shape and a TextBlock
            $(go.Panel, "Horizontal",

                {
                    name: "HEADER",
                    angle: 0,  // maybe rotate the header to read sideways going up
                    alignment: go.Spot.Center

                },

                $(go.Panel, "Horizontal",  // this is hidden when the swimlane is collapsed
                    new go.Binding("visible", "isSubGraphExpanded").ofObject(),
                    $(go.Shape, "Diamond",
                        { width: 8, height: 8, fill: "white" },
                        new go.Binding("fill", "color")),
                    $(go.TextBlock,  // the lane label
                        {
                            font: "bold 13pt sans-serif", editable: false, margin: new go.Margin(2, 0, 0, 0), overflow: go.TextBlock.OverflowClip /* the default value */,
                            width: HORIZONTAL ? 140 : 400
                        },
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
                        font: "bold 13pt sans-serif", editable: false,
                        angle: HORIZONTAL ? 0 : 90, alignment: go.Spot.TopLeft, margin: new go.Margin((HORIZONTAL ? 2 : 4), 0, 0, (HORIZONTAL ? 4 : 2))
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
                    alignment: HORIZONTAL ? go.Spot.Right : go.Spot.Bottom,
                    desiredSize: HORIZONTAL ? new go.Size(7, 50) : new go.Size(50, 7),
                    fill: "lightblue", stroke: "dodgerblue",
                    cursor: HORIZONTAL ? "col-resize" : "row-resize"

                },
                new go.Binding("visible", "", function (ad) {
                    if (ad.adornedPart === null) return false;
                    return ad.adornedPart.isSubGraphExpanded;
                }).ofObject()),
            $(go.Shape,  // for changing the breadth of a lane
                {
                    alignment: HORIZONTAL ? go.Spot.Bottom : go.Spot.Right,
                    desiredSize: new go.Size(50, 7),
                    fill: "lightblue", stroke: "dodgerblue",
                    cursor: HORIZONTAL ? "row-resize" : "col-resize"
                },
                new go.Binding("visible", "", function (ad) {
                    if (ad.adornedPart === null) return false;
                    return ad.adornedPart.isSubGraphExpanded;
                }).ofObject())
        );


    myDiagram.groupTemplate.selectionAdornmentTemplate =
        $(go.Adornment, "Spot",
            $(go.Panel, "Auto",
                $(go.Shape, { stroke: "dodgerblue", strokeWidth: 2, fill: null }),
                $(go.Placeholder)
            ),
            //$(go.Panel, "Horizontal",
            //    { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.Bottom },
            //    $("Button", { click: getWriteUp }, $(go.TextBlock, "Write up", { font: "bold 10pt sans-serif", textAlign: "center" })),
            //    $("Button", { click: getToDoNotToDo }, $(go.TextBlock, "To do", { font: "bold 10pt sans-serif", textAlign: "center" })),
            //    $("Button", { click: getFAQ }, $(go.TextBlock, "FAQ", { font: "bold 10pt sans-serif", textAlign: "center" })),
            //)
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
                    { row: 0, column: 0, angle: HORIZONTAL ? 270 : 0 },
                    $(go.TextBlock,
                        { font: "bold 16pt sans-serif", editable: false, margin: new go.Margin(2, 0, 0, 0) },
                        new go.Binding("text").makeTwoWay())
                ),
                $(go.Placeholder,
                    { row: HORIZONTAL ? 0 : 1, column: HORIZONTAL ? 1 : 0 })
            )
        ));

    myDiagram.linkTemplate =
        $(go.Link,
            { routing: go.Link.AvoidsNodes, corner: 5, curve: go.Link.JumpOver },
            { relinkableFrom: true, relinkableTo: true },
            $(go.Shape,
                // the Shape.stroke color depends on whether Link.isHighlighted is true
                new go.Binding("stroke", "isHighlighted", function (h) { return h ? "red" : "black"; })
                    .ofObject(),
                // the Shape.strokeWidth depends on whether Link.isHighlighted is true
                new go.Binding("strokeWidth", "isHighlighted", function (h) { return h ? 5 : 1; })
                    .ofObject()),
            $(go.Shape, { toArrow: "Standard", strokeWidth: 0 },
                // the Shape.fill color depends on whether Link.isHighlighted is true
                new go.Binding("fill", "isHighlighted", function (h) { return h ? "red" : "black"; })
                    .ofObject()),
            $(go.Panel, "Auto",  // this whole Panel is a link label
                $(go.Shape, "Diamond", { width: 40, height: 40, fill: "yellow", stroke: "gray" }, new go.Binding("fill", "fillD")),
                $(go.TextBlock, { margin: 1, font: "bold 16px Helvetica, bold Arial, sans-serif" },
                    new go.Binding("text", "text"))
            )
        );
    // define some sample graphs in some of the lanes
    myDiagram.model = new go.GraphLinksModel(data, data1);
    // force all lanes' layouts to be performed
    relayoutLanes();
    var myOverview =
        $(go.Overview, "myOverviewDiv",
            { observed: myDiagram });
} // end init


function getDetails(id) {
  
    $.ajax({
        type: "POST",
        url: "WebService/writeUpMaster.asmx/getsampleGraph",
        contentType: 'application/json',
        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            $("#isSymbole").show();
            var result = JSON.parse(data.d);
            console.log(result);

            var finalArray = [];
            var linkData = [];
            var allNode = result.responseValue.Table;
            var allrelation = result.responseValue.Table1;
            var node = JSON.parse(allNode[0].mainNode);
            var pool = result.responseValue.Table3;
            //for (var j = 0, len = pool.length; j < len; j++) {
            node.push({ key: "Master", text:"Master Proportion", isGroup: true, category: 'Pool' });
            //}
            var group = result.responseValue.Table2;
            for (var i = 0, len = group.length; i < len; i++) {
                node.push({ key: group[i].receptorId, text: group[i].nutrientName, group: 'Master', isGroup: true,  color: group[i].color || getRandomLightColor(), description: (group[i].description || "") })
            }
            var linkData = JSON.parse(allrelation[0].linkNode);
           
            setTimeout(function () {
               // $("#divLoader").show();
                init(node, linkData);
            }, 1000);

            //setTimeout(function () {
            //    if (moleculeName != null && moleculeName != '') {
            //        $('#mySearch').val(moleculeName).change();
            //    }

            //    $("#divLoader").hide();
            //}, 1000);
        },
        error: function (error) {

        }, complete: function () {

            $("#divLoader").hide();
        }
    });

}

var getpathwayId = function (e) {
    $("#sample ").empty();   
    var height = ($(window).height() - $('#header').height()) - 20;
    $("#sample").append('<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: ' + height + 'px;"></div><div id="myOverviewDiv1"></div>');
    getDetails();
};

function getNotsigned() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $('#signModel').modal('show');
    $.ajax({
        type: "POST",
        url: "WebService/writeUpMaster.asmx/getNotsigned",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var row = $("#tblSign thead tr:first").clone();
            $("#tblSign tbody tr").remove();
            $.each(result.Table, function () {
                $('.td_from', row).text(this.fromkey);
                $('.td_relation', row).text(this.relation);
                $('.td_to', row).text(this.tokey);
                $('.td_sign', row).html('<select><option>∝</option><option>1/∝</option></select>');
                $('.td_save', row).html('<button type="button" class="btn btn-success" onclick="saveSymbol(this,' + this.id + ')">Save</button>');
                $("#tblSign tbody").append(row);
                row = $("#tblSign thead tr:first").clone();
            });

        },
        error: function (error) {

        }
    });
}

function saveSymbol(e, id) {
    var symbole = $(e).closest('tr').find('.td_sign select option:selected').val();
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $('#signModel').modal('show');
    $.ajax({
        type: "POST",
        url: "WebService/writeUpMaster.asmx/saveSymbole",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + id + "','keyword':'" + symbole + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            maketoast('success', 'Success', 'Save Successfully.');
            $(e).closest('tr').remove();
        },
        error: function (error) {

        }
    });
}
