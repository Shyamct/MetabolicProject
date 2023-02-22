
var HORIZONTAL = true;
var pathwayId = 0;
var phenomenonID = 0;
var phenomenonIDs = '';
var phenomenonIDm = '';
var parameter = 0;
var groupID = 0;
var urlPathwayId = 0;
var moleculeName = "";
var rankNo = 0;
var notfillDite = "";
var allEnzyme = "";
var medicineID = 0;
var pid = 0;
var drugGiven;
var varSetTimeOut;
// These parameters need to be set before defining the templates.
var MINLENGTH = 20;  // this controls the minimum length of any swimlane
var MINBREADTH = 20;  // this controls the minimum breadth of any non-collapsed swimlane
var userLoginID = 0;
var nodeObj = '';
var froRandomColor ;
//var pageName = '';

// some shared functions



$(document).ready(function () {
    setBg();
    var url = window.location.href;
    pageName = getPageName(url);



    pathwayId = getParameterByName('pathwayID', url);
    urlPathwayId = pathwayId;
    moleculeName = getParameterByName('moleculeName', url);
    phenomenonID = getParameterByName('phenomenonID', url);


    phenomenonIDm = getParameterByName('phenomenonIDs', url);
    //console.log(phenomenonIDm);
    groupID = getParameterByName('groupID', url);
    medicineID = getParameterByName('medicineID', url);
    pid = getParameterByName('pid', url);
    rankNo = getParameterByName('rankNo', url);

    if (pid > 0) {
        $('#PID').val(pid);
    }
    $("#btnUpdate").hide();
    $("#btnAddNew").click(function () {
        // saveDescription();
    });
    $("#moreInfo").click(function () {
        $("#modalDescription").show();
        showDescription();
    });
    $("#btnClose").click(function () {
        $("#modalDescription").hide();
    });
    $("#btnClosed").click(function () {
        $("#modalDescription").hide();
    });
    $("#addInfo").click(function () {
        $("#addInfoModel").show();

    });
    $("#btnCross").click(function () {
        $("#addInfoModel").hide();
    });
    $("#btnSave").click(function () {
        if ($("#txtDescription").val() == "") {
            alert("Description in mandatory");
        }
        else {
            saveDescription();
            alert('save successfull');
        }
    });
    $("#btnUpdate").click(function () {
        updateDescription();

    });
    $("#btnCancel").click(function () {
        $("#addInfoModel").hide();
    });

});

const setBg = () => {
    froRandomColor = Math.floor(Math.random() * 16777215).toString(16);
    //document.body.style.backgroundColor = "#" + randomColor;
    //color.innerHTML = "#" + randomColor;
}

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
    sz.width = Math.max(sz.width, sz.width);
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

function closeLoader() {
    $("#loader").hide();
}




function init(data, data1) {
   

    var count = 1;
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this

    var $ = go.GraphObject.make;
    myDiagram =
        $(go.Diagram, "myDiagramDiv",

            {
                // install the RescalingTool as a mouse-down tool

                // have mouse wheel events zoom in and out instead of scroll up and down
                "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,

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
                "undoManager.isEnabled": true, // enable undo & redo
                "AnimationFinished": function (e) {
                    if (count == 1) { console.log('Complete'); closeLoader(); count++; }

                }
            });

    // install the RescalingTool as a mouse-down tool
    myDiagram.toolManager.mouseDownTools.add(new RescalingTool());

    // This is the actual HTML context menu:
    var cxElement = document.getElementById("contextMenu");
    // an HTMLInfo object is needed to invoke the code to set up the HTML cxElement
    var myContextMenu = $(go.HTMLInfo, {

        show: showContextMenu,
        hide: hideContextMenu
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
    function theNationFlagConverter(imgIcon) {
      
       return "img/icons/" + imgIcon + ".png";
       
    }

    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            {
                // rotatingTool: new SpotRotatingTool(),
                rotatable: true, locationSpot: go.Spot.Center,
                // when the user clicks on a Node, highlight all Links coming out of the node
                // and all of the Nodes at the other ends of those Links.
                click: function (e, node, arrayURL) {
                    // highlight all Links and Nodes coming out of a given Node
                    var diagram = node.diagram;
                  
                    diagram.startTransaction("highlightUpcomnColor");
                    diagram.startTransaction("highlight2");
                    // remove any previous highlighting
                    diagram.clearHighlighteds();
                    // for each Link coming out of the Node, set Link.isHighlighted
                    node.findLinksOutOf().each(function (l) { l.isHighlighted = true; });
               
                    node.findLinksOutOf().each(function (l) { l.isHighlighted2 = true; });
                
                    // for each Node destination for the Node, set Node.isHighlighted
                    node.findNodesOutOf().each(function (n) { n.isHighlighted = true; });
                 
                    node.findNodesOutOf().each(function (n) { n.isHighlighted2 = true; });
                   
                    diagram.commitTransaction("highlight");
                    diagram.commitTransaction("highlight2");
                }
            },


            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "Rectangle",
                { portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true },
                //  new go.Binding("fill", "color"),
                new go.Binding("fill", "", function (node) { return (node.eraHypothesis == 1 ? "#EC6F01" : node.color); }),
                //new go.Binding("stroke", "", function (node) { return (node.paperURL != undefined ? "#" + froRandomColor : "black"); }),

                new go.Binding("stroke", "", function (node) { return (node.paperURL != undefined ? node.paperColor: "black"); }),

                //new go.Binding("fill", "highlight", function (v) { return v ? "pink" : "color"; }),

                new go.Binding("stroke", "highlight", function (v) { return v ? "red" : "black"; }),
                new go.Binding("stroke", "highlight1", function (v) { return v ? "green" : "black"; }),
                new go.Binding("stroke", "highlight2", function (v) { return v ? "Green" : "black"; }),
                new go.Binding("strokeWidth", "highlight", function (v) { return v ? 10 : 1; }),
                new go.Binding("strokeWidth", "highlight1", function (v) { return v ? 10 : 1; }),

                new go.Binding("strokeWidth", "highlight2", function (v) { return v ? 10 : 1; }),
                new go.Binding("stroke", "isHighlighted", function (h) { return h ? "#39FF14" : "black"; }),
                new go.Binding("stroke", "isHighlighted1", function (h) { return h ? "#39FF14" : "black"; }),
                new go.Binding("stroke", "isHighlighted2", function (h) { return h ? "Green" : "black"; })
                    .ofObject()
            ),
            {
                toolTip:  // define a tooltip for each node that displays the color as text
                    $("ToolTip",
                        $(go.TextBlock, { margin: 4 },
                            new go.Binding("text", "description"))
                    )  // end of Adornment
            },

            $(go.Panel, "Table",
                $(go.Picture,  // flag image, only visible if a nation is specified
                    {
                        row: 0, column: 0, visible: false,
                        //desiredSize: "imgIcon", function(iconType) { return (iconType == 2 ? new go.Size(100, 100) : new go.Size(30, 30));}
                    },
                    new go.Binding("desiredSize", "imgIcon", function (iconType) { return (iconType == 2 ? new go.Size(100, 100) : new go.Size(30, 30)); }),
                    new go.Binding("source", "imgIcon", theNationFlagConverter),
                    new go.Binding("visible", "imgIcon", function (nat) { return nat !== undefined; }),

                ),

                $(go.TextBlock, { row: 0, column: 1, font: "bold 20pt sans-serif", margin: 6 },
                  //  new go.Binding("desiredSize", "eraHypothesis", function (eraHypothesis) { return (eraHypothesis == 1 ? new go.Size(300, 300) : new go.Size(100, 100)); }),
                    new go.Binding("text")),
            ),

            { dragComputation: stayInGroup },
            {
                contextMenu: myContextMenu   // define a context menu for each node
                //$("ContextMenu",  // that has one button
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Diet Advice", { margin: 5 }),
                //        { click: getEat }, new go.Binding("visible", "isDiet")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Center Molecule", { margin: 5 }),
                //        { click: SetCenterMolecule },
                //        new go.Binding("visible", "isCenterMolecule")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Remove Center Molecule", { margin: 5 }),
                //        { click: SetCenterMolecule },
                //        new go.Binding("visible", "isRemoveCenterMolecule")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Regulatory Molecule", { margin: 5 }),
                //        { click: SetCenterMolecule },
                //        new go.Binding("visible", "isRegulatoryMolecule")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Remove Regulatory Molecule", { margin: 5 }),
                //        { click: SetCenterMolecule },
                //        new go.Binding("visible", "isRemoveRegulatoryMolecule")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Reported Molecule", { margin: 5 }),
                //        { click: SetCenterMolecule },
                //        new go.Binding("visible", "isReportedMolecule")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Remove Reported Molecule", { margin: 5 }),
                //        { click: SetCenterMolecule },
                //        new go.Binding("visible", "isRemoveReportedMolecule")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Available In Era", { margin: 5 }),
                //        { click: SetCenterMolecule },
                //        new go.Binding("visible", "isMoleculeAvailableInEra")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Not Available In Era", { margin: 5 }),
                //        { click: SetCenterMolecule },
                //        new go.Binding("visible", "isRemoveMoleculeAvailableInEra")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Diet Not Required", { margin: 5 }),
                //        { click: setDietRequired },
                //        new go.Binding("visible", "isDiet")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Process Diet Not Required", { margin: 5 }),
                //        { click: setDietRequired },
                //        new go.Binding("visible", "isDiet")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Harmful", { margin: 5 }),
                //        { click: setDietRequired },
                //        new go.Binding("visible", "isDiet")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Beneficial", { margin: 5 }),
                //        { click: setDietRequired },
                //        new go.Binding("visible", "isDiet")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Fate & Feeder", { margin: 5 }),
                //        { click: getkeywordRelation }),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Clinical Features", { margin: 5 }),
                //        { click: getClinicalFeatures }),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Add Enzyme", { margin: 5 }),
                //        { click: SetEnzyme },
                //        new go.Binding("visible", "isAddEnzyme")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Go To Pathway", { margin: 5 }),
                //        { click: GoToPathway }),
                //    //$("ContextMenuButton",
                //    //    $(go.TextBlock, "Remove Enzyme", { margin: 5 }),
                //    //    { click: SetEnzyme },
                //    //    new go.Binding("visible", "isRemoveAddEnzyme")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Check Medicine", { margin: 5 }),
                //        { click: chkMedicine },
                //        new go.Binding("visible", "isChkMedicine")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Check Stock", { margin: 5 }),
                //        { click: getItemStock }),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Go To Diet", { margin: 5 }),
                //        { click: goToDiet }),                       
                //    //$("ContextMenuButton",
                //    //    $(go.TextBlock, "Sample Paper", { margin: 5 }),
                //    //    { click: goToSamplePaper },
                //    //    new go.Binding("visible", "isSamplePaper")),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Marker Details", { margin: 5 }),
                //        { click: getMarkerDetail }),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "RDA Details", { margin: 5 }),
                //        { click: getRDADetail }),
                //    $("ContextMenuButton",
                //        $(go.TextBlock, "Get End Product", { margin: 5 }),
                //        { click: getMyGraphData })


                //    // more ContextMenuButtons would go here
                //)  // end Adornment
            } // limit dragging of Nodes to stay within the containing Group, defined above
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
                        columnSpacing: 7,
                        layerSpacing: 50,
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
                            font: "bold 18pt sans-serif", editable: false, margin: new go.Margin(2, 0, 0, 0), overflow: go.TextBlock.OverflowClip /* the default value */,
                            width: HORIZONTAL ? 140 : 400
                        },
                        new go.Binding("text", "text").makeTwoWay())
                ),
                $("SubGraphExpanderButton", { margin: 5 })  // but this remains always visible!
            ),  // end Horizontal Panel


            $(go.Panel, "Auto",

                // the lane consisting of a background Shape and a Placeholder representing the subgraph
                $(go.Shape, "Rectangle",  // this is the resized object
                    // { name: "SHAPE", fill: $(go.Brush, "Linear", { 0.0: "white", 1.0: "red", start: go.Spot.Right, end: go.Spot.Left }) },
                    { name: "SHAPE", fill: "white" },
                    new go.Binding("fill", "color", function (h) { return $(go.Brush, "Linear", { 0.0: "white", 1.0: h == '#57A7N8' ? 'green' : h, start: go.Spot.Right, end: go.Spot.Left }) }),
                    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
                $(go.Placeholder,
                    { padding: 12, alignment: go.Spot.TopLeft }),
                $(go.TextBlock,  // this TextBlock is only seen when the swimlane is collapsed
                    {
                        name: "LABEL",
                        font: "bold 18pt sans-serif", editable: false,
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
            $(go.Panel, "Horizontal",
                { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.Bottom },
                $("Button", { click: getWriteUp }, $(go.TextBlock, "Write up", { font: "bold 13pt sans-serif", textAlign: "center" })),
                $("Button", { click: getToDoNotToDo }, $(go.TextBlock, "To do", { font: "bold 15pt sans-serif", textAlign: "center" })),
                $("Button", { click: getFAQ }, $(go.TextBlock, "FAQ", { font: "bold 15pt sans-serif", textAlign: "center" })),
                $("Button", { click: getResearchBasedQuestionModal }, $(go.TextBlock, "Research-Based-Question", { font: "bold 15pt sans-serif", textAlign: "center" })),
                //$("Button", { click: getMeaning }, $(go.TextBlock, "Meaning", { font: "bold 10pt sans-serif", textAlign: "left" })),
            )
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
                        { font: "bold 20pt sans-serif", editable: false, margin: new go.Margin(2, 0, 0, 0) },
                        new go.Binding("text").makeTwoWay())
                ),
                $(go.Placeholder,
                    { row: HORIZONTAL ? 0 : 1, column: HORIZONTAL ? 1 : 0 })
            )
        ));
    shyamReverse(data, data1)
    myDiagram.linkTemplate =
        $(go.Link,
            { routing: go.Link.AvoidsNodes, corner: 5, curve: go.Link.JumpOver },
            { relinkableFrom: true, relinkableTo: true },
            $(go.Shape,
                // the Shape.stroke color depends on whether Link.isHighlighted is true
               // new go.Binding("stroke", "isHighlighted", function (h) { return h ? "Black" : "Black"; })
                   // .ofObject(),

                //new go.Binding("stroke", "isHighlighted", function (arrayURL) { return console.log(arrayURL[0].URL); })
                new go.Binding("stroke", "isHighlighted", function (highlightUpcomnColor) { return (highlightUpcomnColor == false ? "black" : "black"); })
                    .ofObject(),

                // the Shape.strokeWidth depends on whether Link.isHighlighted is true
                new go.Binding("strokeWidth", "isHighlighted", function (h) { return h ? 5 :2; })
                    .ofObject()),
            $(go.Shape, { toArrow: "Standard", strokeWidth: 1 },
                // the Shape.fill color depends on whether Link.isHighlighted is true
                new go.Binding("fill", "isHighlighted", function (h) { return h ? "black" : "black"; })
                    .ofObject()),

            //new go.Binding("fill", "isHighlighted", function (node) { return (node.paperURL == node.paperURL ? "Black" : "#FF1493"); })
            //    .ofObject(),

            $(go.Panel, "Auto",  // this whole Panel is a link label
                $(go.Shape, "Diamond", { width: 40, height: 40, fill: "yellow", stroke: "gray" }, new go.Binding("fill", "fillD")),
                $(go.TextBlock, { margin: 1, font: "bold 20px Helvetica, bold Arial, sans-serif" },
                    new go.Binding("text", "text"))
            )
        );
    // define some sample graphs in some of the lanes
    myDiagram.model = new go.GraphLinksModel(data, data1);

    myDiagram.contextMenu = myContextMenu;
    //var slider = document.getElementById("levelSlider");
    //slider.addEventListener('change', reexpand);
    //slider.addEventListener('input', reexpand);
    // We don't want the div acting as a context menu to have a (browser) context menu!
    cxElement.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        return false;
    }, false);

    function hideCX() {
        if (myDiagram.currentTool instanceof go.ContextMenuTool) {
            myDiagram.currentTool.doCancel();
        }
    }

    function showContextMenu(obj, diagram, tool) {
       
        // Show only the relevant buttons given the current state.
        var cmd = diagram.commandHandler;
        var hasMenuItem = false;
        function maybeShowItem(elt, pred) {
            if (pred) {
               // elt.style.display = "block";
                hasMenuItem = true;
            } else {
                elt.style.display = "none";
            }
        }
        nodeObj = obj;
        changeItemText(nodeObj);

       


        maybeShowItem(document.getElementById("Diet"), obj !== null);
        maybeShowItem(document.getElementById("Role"), obj !== null);
        maybeShowItem(document.getElementById("Details"), obj !== null);
        maybeShowItem(document.getElementById("MarkerType"), obj !== null);

        //maybeShowItem(document.getElementById("PatientDietInteke"), obj !== null);
       // maybeShowItem(document.getElementById("role"), obj !== null);
        //maybeShowItem(document.getElementById("fateFeeder"), obj !== null);
        //maybeShowItem(document.getElementById("clinicalFeature"), obj !== null);
        //// not use    maybeShowItem(document.getElementById("addEnzyme"), obj !== null);
        //maybeShowItem(document.getElementById("goToPathway"), obj !== null);
        //maybeShowItem(document.getElementById("checkMedicine"), obj !== null);
        //// not use     maybeShowItem(document.getElementById("checkStock"), obj !== null);
        //maybeShowItem(document.getElementById("goToDiet"), obj !== null);
       // maybeShowItem(document.getElementById("details"), obj !== null);
        //maybeShowItem(document.getElementById("markerType"), obj !== null);
        //maybeShowItem(document.getElementById("coFactors"), obj !== null);
        //maybeShowItem(document.getElementById("endProduct"), obj !== null);
        //maybeShowItem(document.getElementById("aboutPatient"), obj !== null);
        //maybeShowItem(document.getElementById("addNew"), obj !== null);


        // Now show the whole context menu element
        if (hasMenuItem) {
            cxElement.classList.add("show-menu");

            // we don't bother overriding positionContextMenu, we just do it here:
            var mousePt = diagram.lastInput.viewPoint;
            cxElement.style.left = mousePt.x + 5 + "px";
            cxElement.style.top = mousePt.y + "px";
        }

        // Optional: Use a `window` click listener with event capture to
        //           remove the context menu if the user clicks elsewhere on the page
        window.addEventListener("click", hideCX, true);
    }


    function hideContextMenu() {
        cxElement.classList.remove("show-menu");
        // Optional: Use a `window` click listener with event capture to
        //           remove the context menu if the user clicks elsewhere on the page
        window.removeEventListener("click", hideCX, true);
        //nodeObj = '';
    }


    //function reexpand(e) {
    //    myDiagram.commit(diag => {
    //        var level = parseInt(document.getElementById("levelSlider").value);
    //        diag.findTopLevelGroups().each(g => expandGroups(g, 0, level))
    //    }, "reexpand");
    //}
    //function expandGroups(g, i, level) {
    //    if (!(g instanceof go.Group)) return;
    //    g.isSubGraphExpanded = i < level;
    //    g.memberParts.each(m => expandGroups(m, i + 1, level))
    //}
    window.addEventListener('DOMContentLoaded', init);
    // force all lanes' layouts to be performed
    relayoutLanes();
    // reexpand();
    //var myOverview =
    //    $(go.Overview, "myOverviewDiv",
    //        { observed: myDiagram });

} // end init
var arrayFROM = [];
var arrayTO = [];
function shyamReverse(dataShyam, data1Shyam) {
    /*arrayTO("D", linkFromTO);*/
    $.each(data1Shyam, function (i, val) {
    });
}

// This is the general menu command handler, parameterized by the name of the command.
function cxcommand(event, val) {
    
    if (val === undefined) val = event.currentTarget.id;
    var diagram = myDiagram;
    var innerText = event.currentTarget.innerHTML;
  
    switch (val) {
        case "DietAdvice": getEat(nodeObj); break;
        case "dietNotRequired": setDietRequired(nodeObj, innerText); break;
        case "processDietNotRequired": setDietRequired(nodeObj, innerText); break;
        case "Harmful": setDietRequired(nodeObj, innerText); break;
        case "Beneficial": setDietRequired(nodeObj, innerText); break;
        //case "PatientDietInteke": setDietRequired(nodeObj, innerText); break;
        case "FateFeeder": getkeywordRelation(nodeObj); break;
        case "ClinicalFeature": getClinicalFeatures(nodeObj); break;
        //case "addEnzyme": SetEnzyme(nodeObj); break;
        case "GoToPathway": GoToPathway(nodeObj); break;
        case "CheckMedicine": chkMedicine(nodeObj); break;
        case "GoToDiet": goToDiet(nodeObj); break;
        case "GetCoFactor": getCoFactors(nodeObj); break;

        case "MarkerDetails": getMarkerDetail(nodeObj); break;
        case "RDADetails": getRDADetail(nodeObj); break;
        case "GetEndProduct": getMyGraphData(nodeObj); break;

        case "StoreDetails": getItemStock(nodeObj); break;
        case "MachineDetails": getTestMachineDetail(nodeObj); break;
        case "createCentral": SetCenterMolecule(nodeObj, innerText); break;
        case "removeCentral": SetCenterMolecule(nodeObj, innerText); break;
        case "createSubCentral": SetCenterMolecule(nodeObj, innerText); break;
        case "removeSubCentral": SetCenterMolecule(nodeObj, innerText); break;
        case "createSpecific": SetCenterMolecule(nodeObj, innerText); break;
        case "removeSpecific": SetCenterMolecule(nodeObj, innerText); break;

        case "createDoubleSub": SetCenterMolecule(nodeObj, innerText); break;
        case "removeDoubleSub": SetCenterMolecule(nodeObj, innerText); break;
        case "createTripleSub": SetCenterMolecule(nodeObj, innerText); break;
        case "removeTripleSub": SetCenterMolecule(nodeObj, innerText); break;

        case "createRegulatory": SetCenterMolecule(nodeObj, innerText); break;
        case "removeRegulator": SetCenterMolecule(nodeObj, innerText); break;
        case "createReported": SetCenterMolecule(nodeObj, innerText); break;
        case "removeReported": SetCenterMolecule(nodeObj, innerText); break;
        case "availableInEra": SetCenterMolecule(nodeObj, innerText); break;
        case "notAvailableInEra": SetCenterMolecule(nodeObj, innerText); break;
        case "PatientDietInteke": aboutPatientAchivement(nodeObj); break;
        case "AddNew": Final(nodeObj); break;

    }
    diagram.currentTool.stopTool();
}

// A custom command, for changing the color of the selected node(s).
function changeColor(diagram, color) {
    // Always make changes in a transaction, except when initializing the diagram.
    diagram.startTransaction("change color");
    diagram.selection.each(function (node) {
        if (node instanceof go.Node) {  // ignore any selected Links and simple Parts
            // Examine and modify the data, not the Node directly.
            var data = node.data;
            // Call setDataProperty to support undo/redo as well as
            // automatically evaluating any relevant bindings.
            diagram.model.setDataProperty(data, "color", color);
        }
    });
    diagram.commitTransaction("change color");
}

function changeItemText(obj) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;
    if (nodedata.isCenterMolecule) {
        $("#createCentral").html('Center Molecule');
        $("#createRegulatory").show();
    } else {
        $("#createCentral").html('Remove Center Molecule');
        $("#createRegulatory").hide();
    }

    if (nodedata.isCenterMoleculePriority) {
        $("#createSubCentral").html('Sub Center Molecule');
        $("#createRegulatory").show();
    } else {
        $("#createSubCentral").html('Remove Sub Center Molecule');
        $("#createRegulatory").hide();
    }
    if (nodedata.isRegulatoryMolecule) {
        $("#createRegulatory").html('Regulatory Molecule');
        $("#createCentral").show();
    } else {
        $("#createRegulatory").html('Remove Regulatory Molecule');
        $("#createCentral").hide();
    }
    if (nodedata.isReportedMolecule) {
        $("#createReported").html('Reported Molecule');
    } else {
        $("#createReported").html('Remove Reported Molecule');
    }
    if (nodedata.isMoleculeAvailableInEra) {
        $("#availableInEra").html('Available In Era');
    } else {
        $("#availableInEra").html('Not Available In Era');
    }
    if (nodedata.isSpecificMolecule) {
        $("#createSpecific").html('Specific Molecule');
    } else {
        $("#createSpecific").html('Remove Specific Molecule');
    }
    if (nodedata.isDoubleMolecule) {
        $("#createDoubleSub").html('Double Sub Central Molecule');
    } else {
        $("#createDoubleSub").html('Remove Double Sub Central Molecule');
    }
    if (nodedata.isTripleMolecule) {
        $("#createTripleSub").html('Triple Sub Central Molecule');
    } else {
        $("#createTripleSub").html('Remove Triple Sub Central Molecule');
    }
};


var searchNode = [];
var currentIntex = 0;

function changePhenomenon() {
    myDiagram.div = null;
    phenomenonID = 0;
    getDetails();
}

function searchDiagram() {  // called by button
    var input = $('#mySearch option:selected').val();//  document.getElementById("mySearch");
    if (input == '0') {
        clearTimeout(varSetTimeOut);
        $("#totalFind").val("Total Result= 0");
        //return
    }
    searchNode = [];
    currentIntex = 0;
    myDiagram.commit(function (d) {  // this Diagram
        // iterate over all nodes in Diagram			
        d.nodes.each(function (node) {
            if (input != '0' && node.data.text.toLowerCase() == input.toLowerCase()) {
                searchNode.push(myDiagram.findNodeForData(node.data));

            } else {
                if (node.data.highlight == true) {
                    myDiagram.model.commit(function (m) {
                        m.set(node.data, "highlight", !node.data.highlight);
                    }, "asas");
                }
            }
        });
    }, "flash");

    $("#totalFind").val("Total Result= 1/" + searchNode.length);
    if (searchNode.length == 0) {
        $("#totalFind").val("Total Result= 0");
        $('.searchCat').hide();
        clearTimeout(varSetTimeOut);
        return;
    } else {
        myDiagram.centerRect(searchNode[0].actualBounds);
        $('.searchCat').show();
        $('.searchCat:first').attr('disabled', 'disabled');
    }
    function flash1() {
        for (var i = 0, len = searchNode.length; i < len; i++) {
            myDiagram.model.commit(function (m) {
                m.set(searchNode[i].data, "highlight", !searchNode[i].data.highlight);
            }, "asas");
        }
    }
    function loop1() {
        varSetTimeOut = setTimeout(function () {
            if (searchNode.length == 0) {
                clearTimeout(varSetTimeOut);
                return;
            }
            flash1();
            loop1();
        }, 1000);
    }
    loop1();
}

function searchNextPrev(type, e) {
    if (searchNode.length > 0) {
        if (type == 'Prev') {
            currentIntex--;

        } else {
            currentIntex++;
        }
        $('.searchCat').removeAttr('disabled');
        if (searchNode.length == currentIntex) {
            $('.searchCat:last').attr('disabled', 'disabled');
        } else if (currentIntex == 0) {
            $('.searchCat:first').attr('disabled', 'disabled');
        }
        $("#totalFind").val("Total Result= " + currentIntex + "/" + searchNode.length);
        myDiagram.centerRect(searchNode[currentIntex].actualBounds);
 

    }
}

var searchMed = [];
function getMedication() {
    //$('#mySearch').val(0);
    //var isfind = true;

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getMedication",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'PID': '" + $('#PID').val() + "','pathwayid':'" + pathwayId + "','id':'" + Number(medicineID) + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
           
            //drugGiven = result.Table;
            //function flash() {
            //    myDiagram.model.commit(function (m) {
            //        for (var i = 0; i < drugGiven.length; i++) {
            //            var data = myDiagram.findNodeForKey(drugGiven[i].keyword).data;
            //            log(data);
            //            //if (data.length > 0) {
            //            if (data) {
            //                m.set(data, "highlight2");
            //                m.set(data, "highlight2", !data.highlight);
            //                //m.set(data, "highlight", !data.highlight);
            //                if (isfind) {
            //                    //myDiagram.centerRect(data.actualBounds);
            //                    isfind = false;
            //                }
            //            }
            //        }

            //    }, "flash");

            //}
            //function loop() {
            //    setTimeout(function () { flash(); loop(); }, 500);
            //}
            //loop();

        }, error: function (error) {

        }
    });

}
function SAMP() {
    //save();
    //load();
    //alert();
}


function save() {
    document.getElementById("sample").value = myDiagram.model.toJson().text;
    myDiagram.isModified = true;

    //load();
}

function load() {
    myDiagram.model = document.getElementById("sample").value;
    myDiagram.delayInitialization(relayoutDiagram);

}

function getRandomLightColor() {
    color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function SetCenterMolecule(obj, innerText) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/SetCenterMolecule",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + nodedata.text + "','groupId':'" + nodedata.group + "','pathwayid':'" + pathwayId + "','empid':'" + userLoginID + "','prefix':'" + innerText + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {

            maketoast('success', 'Success', 'Save Successfully.');
        },
        error: function (error) {

        }
    });
}

function aboutPatientAchivement(obj) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;
    //console.log("nodedata", nodedata);
    let today = new Date().toISOString().slice(0, 10)
    var tr;
  
    var tag;
    var pid = $('#PID').val();
    if (pid == 0 || pid == null || pid=="") {
        alert("PLZ Enter PID..");
        return;
    }
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/aboutPatientAchivement",
        contentType: 'application/json',
        dataType: 'json',
      
        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "','DiseaseID': '" + $("#ddlpathway").val() + "','intakeDate': '" + today + "','PID': '" + $('#PID').val() + "','nutrientName': '" + nodedata.text + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {

            var r = JSON.parse(data.d).responseValue;
            $("#modeltblAboutPatient").modal('show');
            $("#tblAboutPatient tbody tr").remove();

           
            if (r.Table.length > 0) {
                $.each(r.Table, function (i, val) {
                    var mainData = JSON.parse(r.Table[i].ABCLIST);
                    tag = '';
                    tag += '<ul>';
                    
                    $.each(mainData, function (i, val) {

                        var aaa = val.ingredientName;
                        tag += '<li> <span>' + aaa + '</span> <span>' + val.nutrientValue + " " + val.unitName +'</span></li>';
                    });
                    
                    tag += '</ul>'; 
                    tr = tr + "<tr><td>" + (i + 1) + "</td><td class='' >" + val.foodName + "  " + tag + "</td><td>" + val.foodQuantity + " " + val.foodUnit + "</td><td>" + val.nutrientValue + " " + val.nutrientUnit + "</td><td>" + val.givenTime + "</td><td>" + val.adviceTime + "</td></tr>";
                });
            }

            $("#tblAboutPatient tbody").append(tr);
            row = $("#tblAboutPatient thead tr").clone();
        },


    });
}






function givenDietOnPID() {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var pid = $('#PID').val();
    if (pid == 0 || pid == null || pid == "") {
        alert("PLZ Enter PID..");
        return;
    }

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/givenDrugPID",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'PID': '" + $('#PID').val() + "','DiseaseID': '" + $("#ddlpathway").val() + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {

            var r = JSON.parse(data.d).responseValue;
            $("#test").modal('show');
            
            $("#ddlDate option:not(:first)").remove();
            $.each(r.Table1, function () {
                var isSelected = "";

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                currentDate = dd + '/' + mm + '/' + yyyy;


                if (currentDate == this.DateDemo) {
                    isSelected = "selected";
                }
                $("#ddlDate").append('<option value="' + this.DateDemo + '" ' + isSelected + '>' + this.DateDemo + '</option>');
                getDrugWiseReport();

            });

           // abcdss(this);
          
            
        },
        error: function (error) {
        }
    });
}



function getDrugWiseReport() {
    var forDates = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    forDates = $('#ddlDate').val();
    var tr;
   
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

  
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getDate",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'DateDemo': '" + forDates + "','PID': '" + $('#PID').val() + "','DiseaseID': '" + $("#ddlpathway").val() + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {

            var r = JSON.parse(data.d).responseValue;
           
            $("#abc tbody tr").remove();
            if (r.Table.length > 0) {
                $.each(r.Table, function (i, val) {
                    tr = tr + "<tr><td>" + (i + 1) + "</td><td>" + val.drugName + "</td><td>" + val.dosageForm + "</td><td>" + val.doseStrength + " " + val.doseUnit + "</td><td>" + val.GivenTime + "</td><td>" + val.AdviceTime + "</td></tr>";
                });
            }

            $("#abc tbody").append(tr);
            row = $("#abc thead tr").clone();
        },
        error: function (error) {
        }
    });
}




var relationNames;
function getMoleculeHeader() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $("#modelMolecule").modal('show');
    $.ajax({
        type: "POST",
        url: "WebService/markerRoleMatrix.asmx/getNutrientHeader",
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

            $("#moleculeBind option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#moleculeBind").append(`<option    value="${this.nutrientName}"> ${this.nutrientName}</option>`);
            });

            $("#relationBind option:not(:first)").remove();
            $.each(r.Table1, function (i, val) {
                // $("#relationBind").append(`<option    value="${this.proportionSign}"> ${this.relationName}</option>`);
                $("#relationBind").append('<option value="' + val.proportionSign + '">' + val.relationName + '</option>');
            });
        },

        error: function (error) {

        }
    });
}

var nodedata;
function Final(obj) {
    getMoleculeHeader();
    var contextmenu = obj.part;
    nodedata = contextmenu.data;
    
}

function funAddNew() {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/saveMolecule",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'fromkey': '" + nodedata.text + "','toKey':'" + ddlmolecule + "','relation':'" + ddlRelation + "','pathwayid':'" + pathwayId + "','relationNames':'" + relationNames + "','receptorIds':'" + nodedata.group + "','groupID':'" + nodedata.groupID + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {

            maketoast('success', 'Success', 'Save Successfully.');
        },
        error: function (error) {

        }
    });
}

var ddlmolecule;
var ddlRelation;

function getMoleculeList() {
    ddlmolecule = $("#moleculeBind").val();
    ddlRelation = $("#relationBind").val();
    relationNames = $("#relationBind option:selected").text();

    // console.log(ddlmolecule);
    funAddNew();
}


function saveRowIDDB() {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/saveRowId",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + nodedata.__gohashid + "',}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {

            maketoast('success', 'Success', 'Save Successfully.');
        },
        error: function (error) {

        }
    });
}


function SetEnzyme(obj) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/SetEnzyme",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + nodedata.text + "','groupId':'" + nodedata.group + "','pathwayid':'" + pathwayId + "','empid':'" + userLoginID + "','prefix':'" + obj.elt(1).text + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            getEnzyme($("#ddlpathway option:selected").val());
            maketoast('success', 'Success', 'Save Successfully.');
        },
        error: function (error) {
            //alert("not inserted");
            //alert(error.responseJSON.d);
            maketoast('warning', 'Warning', error.responseJSON.d);
        }
    });
}

function getEat(obj) {

    var contextmenu = obj.part;
    var nodedata = contextmenu.data;
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    var ignoreWord = ['High ', 'Low ', 'Increased ', 'Decreased ', 'Downregulated ', 'Overempression '];

    var newText = '';
    for (var h = 0; h < ignoreWord.length; h++) {
        if ((nodedata.text).indexOf(ignoreWord[h]) != -1) {
            newText = nodedata.text.split(ignoreWord[h])[1];
            break;
        }

    };
    if (newText == '') {
        newText = nodedata.text;
    }

    $('#myModal').modal('show');
    $('.modal-title').text(nodedata.text);

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getEat",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + newText + "','pathwayid':'" + pathwayId + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var whatToEat = result.Table;
            var ToEat = "";
            var notToEat = "";
            $.each(whatToEat, function () {
                if (this.roleType == 'H') {
                    if (this.coFactorRole == 'I') {
                        ToEat += '<li id="nut_' + this.nutrientID + '">' + this.nutrientName + '</li>';
                    } else {
                        notToEat += '<li>' + this.nutrientName + '</li>';
                    }

                } else if (this.roleType == 'B') {
                    if (this.coFactorRole == 'E') {
                        ToEat += '<li id="nut_' + this.nutrientID + '">' + this.nutrientName + '</li>';
                    } else {
                        notToEat += '<li>' + this.nutrientName + '</li>';
                    }
                }
            });
            $("#td_ToEat").html(ToEat);
            $("#td_NotToEat").html(notToEat);


            $.each(result.Table1, function () {
                if (this.roleType == 'H') {
                    if (this.coFactorRole == 'E') {
                        if ($('#nut_' + this.nutrientID)) {
                            $('#nut_' + this.nutrientID).css('color', 'red').attr('title', this.Effected);
                        }
                    }

                } else if (this.roleType == 'B') {
                    if (this.coFactorRole == 'I') {
                        if ($('#nut_' + this.nutrientID)) {
                            $('#nut_' + this.nutrientID).css('color', 'red').attr('title', this.Effected);
                        }
                    }
                }
            });
        },
        error: function (error) {

        }
    });
};

function setDietRequired(obj, innerText) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;
    //var dietRequiredText = obj.elt(1);  // the TextBlock
    var dietRequiredText = innerText;  // the TextBlock

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/setDietRequired",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + nodedata.text + "','groupId':'" + nodedata.group + "','pathwayid':'" + pathwayId + "','dietRequired':'" + dietRequiredText + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            maketoast('success', 'Success', 'Save Successfully.');
        },
        error: function (error) {

        }
    });
};
var muNodes;
var selectedPathwayId = 0;
var relations;
var node;

function getDetails(id) {
    //alert(myPhenomenonID);
    if (id) {
        pathwayId = id;
    }
    if (urlPathwayId != $("#ddlpathway option:selected").val()) {
        phenomenonID = 0;
    }

    if (phenomenonID == 0) {
        phenomenonIDs = $('#ddlphenomenon').val();
    }

    if (phenomenonIDm != 0) {
        phenomenonIDs = phenomenonIDm;
    }
    parameter = $('#ddlParameter option:selected').val();
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getsampleGraph",
        contentType: 'application/json',
        data: "{'pathwayid': '" + pathwayId + "','empid':'" + userLoginID + "','keyId':'" + Number(phenomenonID) + "','receptorIds':'" + phenomenonIDs + "','groupID':'" + Number(groupID) + "','parameterID':'" + $("#ddlParameter option:selected").val() + "','rankNo':'" + Number(rankNo) + "'}",
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            $("#isSymbole").show();
            var result = JSON.parse(data.d);
            var finalArray = [];
            var linkData = [];


            var allNode = result.responseValue.Table;
            var allrelation = result.responseValue.Table1;
             node = JSON.parse(allNode[0].mainNode);

            relations = allrelation[0].linkNode;
          
            $('#mySearch option:not(:first)').remove();
            var usedNames = [];
            $.each(node, function () {
                if (usedNames.indexOf(this.text.toLowerCase()) == -1) {
                    $('#mySearch').append('<option value="' + this.text + '">' + this.text + '</option>');
                    usedNames.push(this.text.toLowerCase());
                }
            });

            var pool = result.responseValue.Table4;

            if (pool.length > 0) {
                for (var j = 0, len = pool.length; j < len; j++) {
                    node.push({ key: pool[j].rank, text: pool[j].rankName, isGroup: true, category: 'Pool' });
                }
            }
            else {

                closeLoader();
                $("#myDiagramDiv").html("<h1 class='null'>  Data Not Avilable!  </h1>");
            }


            var group = result.responseValue.Table2;
            for (var i = 0, len = group.length; i < len; i++) {
                node.push({ key: group[i].receptorId, text: group[i].nutrientName, isGroup: true, group: group[i].rank, color: group[i].color || getRandomLightColor(), description: (group[i].description || "") })
            }
            var linkData = JSON.parse(allrelation[0].linkNode);
            var aa = result.responseValue.Table3;
             muNodes = node;

            $("#anchDiteNotInserted").val('Diet not Assign: ' + aa.length + '/' + JSON.parse(allNode[0].mainNode).length);
            notfillDite = aa;
           

            ///////////////////////////////////////////////

            $("#sample1").empty();
            $("#sample1").append('<div style="width: 200px; height: 150px" id="myOverviewDiv"></div>');
            setTimeout(function () {

                init(node, linkData);
            }, 1000);

            setTimeout(function () {
                myDiagram.zoomToFit();
            }, 1000);

            setTimeout(function () {
                if (moleculeName != null && moleculeName != '') {
                    $('#mySearch').val(moleculeName).change();
                }

            }, 1000);

            setTimeout(function () {

                if ($('#PID').val().trim() != '') {
                    getMedication();
                }
                else {
                    if (isEmpty(moleculeName)) {
                        loop();
                    }
                }

                var isfind = true;
                var drugGiven = result.responseValue.Table9;
                function flash() {
                    myDiagram.model.commit(function (m) {
                        for (var i = 0; i < drugGiven.length; i++) {

                            var data = myDiagram.findNodeForKey(drugGiven[i].keyword).data;
                            if (data) {
                                m.set(data, "highlight", !data.highlight);
                                if (isfind) {
                                    isfind = false;
                                }
                            }
                        }

                    }, "flash");
                }
                function loop() {
                    setTimeout(function () { flash(); loop(); }, 500);
                }
            
                //var drugGiven1 = node;
                //function flash1() {
                //    myDiagram.model.commit(function (m) {
                //        for (var i = 0; i < node.length; i++) {
                //            if (node[i].eraHypothesis != null && node[i].eraHypothesis != 0 && node[i].eraHypothesis != undefined) {
                //                for (var i = 0; i < drugGiven1.length; i++) {
                //                    var data = myDiagram.findNodeForKey(node[i].eraHypothesis).data;
                //                    if (data) {
                //                        m.set(data, "highlight", !data.highlight);
                //                        if (isfind) {
                //                            isfind = false;
                //                        }
                //                    }
                //                }
                //            }
                //        }
                //    }, "flash");
                //}
                //function loop() {
                //    setTimeout(function () { flash();   (); }, 500);
                //}
                //function loop() {
                //    setTimeout(function () { flash(); loop(); }, 500);
                //}


            }, 10000);


            eraHypothesis();

            var report = result.responseValue.Table5[0];

            $('#Total').html(report.total);
            $('#Totalcenteral').html('<a>' + report.totalCenter + ' (B=' + report.CB + ' H=' + report.CH + ')</a>');
            $('#TotalUnique').html('<a>' + report.totalUnique + '</a>');
            $('#Totalprocess').html('<a>' + report.totalProcess + '</a>');
            $('#Totalcenteraldietnotassign').html('<a>' + report.totalCenterDietNotAssign + '</a>');
            $('#Totaldietnotrequired').html('<a>' + report.totalDietNotRequired + '</a>');
            $('#Totaldietnotassign').html('<a>' + report.totalNotAssign + '</a>');
            //$('#TotalRegulatory').html('<a>' + report.totalRegulatory + '</a>');
            //$('#TotalReported').html('<a>' + report.totalReported + '</a>');
            //$('#TotalAvailableInEra').html('<a>' + report.totalAvailableInEra + '</a>');

            $("#anchTotal").val('Total: ' + report.totalUnique);

            if (selectedPathwayId != 0 && selectedPathwayId != pathwayId) {
                $('#divPhenomenon').empty();
                $('#divPhenomenon').append('<select id="ddlphenomenon"> <option value="" selected>Select Phenomenon</option> </select>');
            }

            if ($("#ddlphenomenon option").length == 1) {
                selectedPathwayId = pathwayId;
                var phenomenonList = result.responseValue.Table6;
                $.each(phenomenonList, function () {
                    $("#ddlphenomenon").append('<option value="' + this.id + '">' + this.pathwayName + '</option>');
                });
                if (phenomenonIDs != null && phenomenonIDs != '') {
                    $('#ddlphenomenon').val(phenomenonIDs);
                }
            }
            if (!$('#ddlphenomenon').prop("multiple")) {
                $('#ddlphenomenon').prop("multiple", "multiple");
                multiSelectDisease();
                $("#ddlphenomenon").multiselect("clearSelection");
            }

            var parameterList = result.responseValue.Table8;
            $.each(parameterList, function () {
                $("#ddlParameter").append('<option value="' + this.id + '">' + this.parameterName + '</option>');
            });
            $('#ddlParameter').val(parameter);

            nutrientCategoryCountReport(result.responseValue.Table7);

        },
        error: function (error) {

        }, complete: function () {

        }
    });

}





function eraHypothesis() {
    setTimeout(function () {
        node = muNodes;
        var isfind = true;
        for (var i = 0; i < node.length; i++) {
            if (node[i].eraHypothesis != null) {
                //console.log("nodenodenode", node);
                loop();
            }
        }
        function flash() {
            myDiagram.model.commit(function (m) {
                for (var i = 0; i < node.length; i++) {
                    if (node[i].eraHypothesis != null || node[i].eraHypothesis != 0 || node[i].eraHypothesis != undefined) {
                    //if (node[i].eraHypothesis ==1) {
                        for (var i = 0; i < node.length; i++) {
                            if (node[i].eraHypothesis == 1) {
                              var data = myDiagram.findNodeForKey(node[i].key).data;
                              if (data) {
                                m.set(data, "highlight1", !data.highlight1);
                                if (isfind) {
                                    isfind = false;
                                }
                               }
                            }
                        }
                    }
                }
            }, "flash");
        }
        function loop() {
            setTimeout(function () { flash(); loop(); }, 500);
        }
    }, 10000);
}




function showTotal() {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getTotal",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayId': '" + pathwayId + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $("#tblTotalMolecule thead tr").clone();
            $("#tblTotalMolecule tbody tr").remove();
            $.each(result.Table, function (index) {
                $(".td_SNo", row).text(index + 1);
                $(".td_Molecule", row).text(this.keyword);
                $(".td_Count", row).text(this.Total);

                $("#tblTotalMolecule tbody").append(row);
                row = $("#tblTotalMolecule thead tr").clone();
            });


            $("#modalTotalMolecule").modal('show');
            $('#modalTotalMolecule .modal-title').text('Total Molecule');
        },
        error: function (error) {

        }
    });
}

var getpathwayId = function (e) {
    
    $("#sample").empty();
    $("#levelSlider").val(0);
    $("#ddlphenomenon option:not(:first)").remove();
    var height = ($(window).height() - $('#header').height()) - 80;
    //var width = ($(window).width() - 1000);
    //console.log("width", width);
    // $("#sample").append('<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: ' + height + 'px;"></div><div id="myOverviewDiv1"></div>');
    $("#sample").append('<div id="myDiagramDiv" style="border: solid 2px black; width:100%; height: ' + height + 'px;"></div><div id="myOverviewDiv1"></div>');
    getDetails($("#ddlpathway option:selected").val());
    getEnzyme($("#ddlpathway option:selected").val());
};

var getPathwayList = function () {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/flowchart.asmx/getPathwayList",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'empid': '" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;

            //var row = $("#sidebar ul li:first").clone();
            $("#ddlpathway option:not(:first)").remove();
            $("#ddlFood option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#ddlpathway").append('<option value="' + this.id + '">' + this.headName + '</option>');
                // $('.pathwayName', row).attr('onclick', 'getpathwayId(' + this.id + ',this)');

            });
            $("#ddlFood option:not(:first)").remove();
            $.each(r.Table4, function () {
                $("#ddlFood").append('<option value="' + this.id + '">' + this.foodName + '</option>');
                // $('.pathwayName', row).attr('onclick', 'getpathwayId(' + this.id + ',this)');

            });

            if (pathwayId != null && pathwayId != '') {
                $('#ddlpathway').val(pathwayId);
                getpathwayId();
            }

        },
        error: function (error) {

        }
    });
};

var showNotDite = function () {
    $('#myModal1').modal('show');
    var aa = notfillDite;
    $('#myModal1 .modal-title').text('');
    $("#notfillDite").html('');
    var text = '';
    for (var j = 0, len = aa.length; j < len; j++) {
        text += '<span style="padding:5px;background-color:#D1DDE4;margin-right:5px;margin-bottom:5px;display: inline-block;cursor: pointer;" onclick="getKeyword(\'' + aa[j].keyword + '\')">' + aa[j].keyword + '</span>';
    }
    $("#notfillDite").html(text);
};

function getKeyword(item) {
    myDiagram.commit(function (d) {
        d.nodes.each(function (node) {
            if (node.data.text === item) {
                var node1 = myDiagram.findNodeForData(node.data);
                myDiagram.centerRect(node1.actualBounds);
                myDiagram.select(node1);
            }
        });
    }, "decrease scale");
}

$(function () {
    var height1 = ($(window).height() - $('#header').height() - 11);
    $("#content").attr('style', 'min-height:' + height1 + 'px');


    if (!UtilsCache.getSession('USERDETAILS')) {
        userLoginID = 1;
    } else {
        userLoginID = Number(UtilsCache.getSession('USERDETAILS').userid);
    }

    getPathwayList();
});

function getNotsigned() {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $('#signModel').modal('show');
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getNotsigned",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayid': '" + pathwayId + "','empid':'" + userLoginID + "'}",
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
                $('.td_sign', row).html('<select><option>∝</option><option>1/∝</option><option>E</option><option>I</option><option>P</option><option>S</option><option>↑</option><option>↓</option></select>');
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
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $('#signModel').modal('show');
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/saveSymbole",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + id + "','keyword':'" + symbole + "','empid':'" + userLoginID + "'}",
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

function print() {
    var width = parseInt(document.getElementById('widthInput').value);
    var height = parseInt(document.getElementById('heightInput').value);
    if (isNaN(width)) width = 100;
    if (isNaN(height)) height = 100;
    width = Math.max(width, 50);
    height = Math.max(height, 50);
    var imgDiv = document.getElementById('myImages');
    imgDiv.innerHTML = '';
    var db = myDiagram.documentBounds.copy();
    var boundswidth = db.width;
    var boundsheight = db.height;
    var imgWidth = width;
    var imgHeight = height;
    var p = db.position.copy();
    for (var i = 0; i < boundsheight; i += imgHeight) {
        for (var j = 0; j < boundswidth; j += imgWidth) {
            img = myDiagram.makeImage({
                scale: 1,
                position: new go.Point(p.x + j, p.y + i),
                size: new go.Size(imgWidth, imgHeight)
            });
            img.className = 'images';
            imgDiv.appendChild(img);
            imgDiv.appendChild(document.createElement('br')); getkeywordRelation
        }
    }
    var divToPrint = document.getElementById('myImages');
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();

    newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');

    newWin.document.close();
    setTimeout(function () { newWin.close(); }, 10);
}

function getkeywordRelation(obj) {

    var contextmenu = obj.part;
    var nodedata = contextmenu.data;
    var text = nodedata.text;  // the TextBlock
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    //$('#signModel').modal('show');
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getkeywordRelation",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayid': '" + pathwayId + "','keyword':'" + nodedata.text + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var leftNode = result.Table;
            var rightNode = result.Table1;
            var leftNodeChild = result.Table2;
            var rightNOdeChild = result.Table3;
            var node = [{ "key": 'Root', "text": nodedata.text, "color": "#A570AD" }];
            for (var i = 0, ln = leftNode.length; i < ln; i++) {
                node.push({
                    "key": leftNode[i].fromkey.toLowerCase() + '_' + leftNode[i].keyValue, "text": leftNode[i].fromkey.toLowerCase(), "relation": leftNode[i].relationSign, "fillD": (leftNode[i].relationSign == '∝' ? 'yellow' : 'red'), "parent": 'Root', "dir": "left", "color": leftNode[i].color
                });
            }

            for (var k = 0, lnk = leftNodeChild.length; k < lnk; k++) {
                node.push({ "key": leftNodeChild[k].fromkey.toLowerCase() + '_' + leftNodeChild[k].keyValue, "text": leftNodeChild[k].fromkey.toLowerCase(), "relation": leftNodeChild[k].relationSign, "fillD": (leftNodeChild[k].relationSign == '∝' ? 'yellow' : 'red'), "parent": leftNodeChild[k].tokey.toLowerCase() + '_' + leftNodeChild[k].keyValue, "color": leftNodeChild[k].color });
            }

            for (var j = 0, lnj = rightNode.length; j < lnj; j++) {
                node.push({ "key": rightNode[j].tokey.toLowerCase() + '_' + rightNode[j].keyValue, "text": rightNode[j].tokey.toLowerCase(), "relation": rightNode[j].relationSign, "fillD": (rightNode[j].relationSign == '∝' ? 'yellow' : 'red'), "parent": 'Root', "dir": "right", "color": rightNode[j].color });
            }

            for (var l = 0, lnkl = rightNOdeChild.length; l < lnkl; l++) {
                node.push({ "key": rightNOdeChild[l].tokey.toLowerCase() + '_' + rightNOdeChild[l].keyValue, "text": rightNOdeChild[l].tokey.toLowerCase(), "relation": rightNOdeChild[l].relationSign, "fillD": (rightNOdeChild[l].relationSign == '∝' ? 'yellow' : 'red'), "parent": rightNOdeChild[l].fromKey.toLowerCase() + '_' + rightNOdeChild[l].keyValue, "color": rightNOdeChild[l].color });
            }
            var obj = {
                "someProperty": "someValue",
                "nodes": node,
                "someOtherProperty": 123
            };
            $("#modalRelation").modal('show');
            //var height1 = $('#modalRelation .modal-body').height() - 10;
            $('#modalRelation .modal-body').empty();
            $('#modalRelation .modal-body').append('<div id="divDubleTree" style="background-color: #fff; border: solid 1px black; width: 100%;height: 650px !important;"></div>');

            initDubleTree(obj);

        },
        error: function (error) {

        }
    });
}

function initDubleTree(obj) {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    // Within this function override the definition of '$' from jQuery:
    var $ = go.GraphObject.make;  // for conciseness in defining templates in this function

    divDubleTree =
        $(go.Diagram, "divDubleTree",
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

    divDubleTree.nodeTemplate =
        $(go.Node, "Auto",
            { isShadowed: true },


            // define the node's outer shape
            $(go.Shape, "RoundedRectangle",
                { fill: graygrad, stroke: "#D8D8D8" },  // default fill is gray
                new go.Binding("fill", "color")),
            // define the node's text
            $(go.TextBlock,
                { margin: 5, font: "bold 11px Helvetica, bold Arial, sans-serif" },
                new go.Binding("text", "text"))
        );

    divDubleTree.linkTemplate =
        $(go.Link,
            // the whole link panel
            { selectable: false },
            $(go.Shape),
            $(go.Panel, "Auto",  // this whole Panel is a link label
                $(go.Shape, "Diamond", { width: 30, height: 30, fill: "yellow", stroke: "gray" }, new go.Binding("fill", "fillD")),
                $(go.TextBlock, { margin: 1, font: "bold 12px Helvetica, bold Arial, sans-serif" },
                    new go.Binding("text", "relation"))
            ));  // the link shape   




    load1(obj);
}

function load1(jsondata) {
    divDubleTree.model = new go.TreeModel(jsondata["nodes"]);
}

function print2() {
    var width = parseInt(document.getElementById('widthInput').value);
    var height = parseInt(document.getElementById('heightInput').value);
    if (isNaN(width)) width = 100;
    if (isNaN(height)) height = 100;
    width = Math.max(width, 50);
    height = Math.max(height, 50);
    var imgDiv = document.getElementById('myImages');
    imgDiv.innerHTML = '';
    var db = divDubleTree.documentBounds.copy();
    var boundswidth = db.width;
    var boundsheight = db.height;
    var imgWidth = width;
    var imgHeight = height;
    var p = db.position.copy();
    for (var i = 0; i < boundsheight; i += imgHeight) {
        for (var j = 0; j < boundswidth; j += imgWidth) {
            img = divDubleTree.makeImage({
                scale: 1,
                position: new go.Point(p.x + j, p.y + i),
                size: new go.Size(imgWidth, imgHeight)
            });
            img.className = 'images';
            imgDiv.appendChild(img);
            imgDiv.appendChild(document.createElement('br'));
        }
    }
    var divToPrint = document.getElementById('myImages');
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); }, 10);
}

function toggleLayout() {
    if (HORIZONTAL) {
        HORIZONTAL = false;
    } else {
        HORIZONTAL = true;
    }
    myDiagram.div = null;
    getDetails();
}

function viewFullScreen(show) {
    if (show === undefined) show = !isFullScreen();
    canvas = document.getElementById("myDiagramDiv");
    if (show) {
        if (canvas.requestFullscreen) canvas.requestFullscreen();
        else if (canvas.webkitRequestFullScreen) canvas.webkitRequestFullScreen();
        else if (canvas.mozRequestFullScreen) canvas.mozRequestFullScreen();
        else if (canvas.msRequestFullscreen) canvas.msRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
}

function viewFullScreenSub(show) {
    if (show === undefined) show = !isFullScreen();
    //canvas = document.getElementById("divDubleTree");
    canvas = document.getElementById("divMyDubleTree");
    if (show) {
        if (canvas.requestFullscreen) canvas.requestFullscreen();
        else if (canvas.webkitRequestFullScreen) canvas.webkitRequestFullScreen();
        else if (canvas.mozRequestFullScreen) canvas.mozRequestFullScreen();
        else if (canvas.msRequestFullscreen) canvas.msRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
}

function isFullScreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
}

function getWriteUp(e, button) {
    var node = button.part.data;
    $('#myModal1').modal('show');
    $('#myModal1 .modal-title').text('Writeup of ' + node.text);

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getWriteUpById",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayid': '" + pathwayId + "','empid':'" + userLoginID + "','id':'" + node.key + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;
            $('#notfillDite').html('');
            $.each(result, function () {
                $('#notfillDite').append('<p>' + (this.writeUp.replace(/↑/g, "")).replace(/↓/g, '') + '</p>');
            })

        },
        error: function (error) {

        }
    });
}

function viewWriteUp() {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getWriteUpModalData",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayId': '" + pathwayId + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            $('#modalWriteUp .modal-body').html('');
            var mainDiv = '<div>';
            $.each(result.Table, function () {
                mainDiv += '<div onclick="$(\'#ddlphenomenon\').val(' + this.receptorId + ').change();" data-dismiss="modal" style="cursor:pointer;">' + this.keyword + (this.orginalWriteUp.replace(/↑/g, "")).replace(/↓/g, '') + '</div><br />';
            });
            mainDiv += '</div>';

            $("#modalWriteUp").modal('show');
            //var height1 = $('#modalWriteUp .modal-body').height() - 10;
            $('#modalWriteUp .modal-body').empty();
            $('#modalWriteUp .modal-body').append(mainDiv);
        },
        error: function (error) {

        }
    });
}

function getFAQ(e, button) {

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var node = button.part.data;
    $('#modalFAQ').modal('show');
    $('#modalFAQ .modal-title').text('FAQ for ' + node.text);

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getFAQ",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayid': '" + pathwayId + "','empid':'" + userLoginID + "','id':'" + node.key + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;
            $('#divFAQ').html('');
            $.each(result, function () {

                $('#divFAQ').append('<h5>' + this.question + '</h5><p>' + this.answer + '</p><br />');
            });
        },
        error: function (error) {

        }
    });
}

function getToDoNotToDo(e, button) {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var node = button.part.data;

    $('#modalWhatToDo').modal('show');
    $('#modalWhatToDo .modal-title').text('To do and Not to do for ' + node.text);

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getToDoNotToDo",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayid': '" + pathwayId + "','empid':'" + userLoginID + "','id':'" + node.key + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var toDoNotToDoList = result.Table;
            $('#td_ToDo').html('');
            $('#td_NotToDo').html('');
            $.each(toDoNotToDoList, function () {
                if (this.toDo != null) {
                    $("#td_ToDo").append('<li>' + this.toDo + '</li>');
                }
                if (this.notToDo != null) {
                    $("#td_NotToDo").append('<li>' + this.notToDo + '</li>');
                }
            });
        },
        error: function (error) {

        }
    });
}

function getClinicalFeatures(obj) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $('#modalToxicityDeficiency').modal('show');
    $('#modalToxicityDeficiency .modal-title').text('Toxicity & Deficiency of ' + nodedata.text);

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getClinicalFeatures",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + nodedata.text + "','pathwayid':'" + pathwayId + "','id':'" + nodedata.group + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var toxicitDeficiencyList = result.Table;
            $('#td_Toxicit').html('');
            $('#td_Deficiency').html('');
            $.each(toxicitDeficiencyList, function () {
                if (this.toxicityEffect != null) {
                    $("#td_Toxicit").append('<li>' + this.toxicityEffect + '</li>');
                }
                if (this.deficiencyEffect != null) {
                    $("#td_Deficiency").append('<li>' + this.deficiencyEffect + '</li>');
                }

            });
        },
        error: function (error) {

        }
    });
}

var myOverview1 = null;
function showMagnifier() {
    var myOverviewDiv1 = document.getElementById("myOverviewDiv1");
    if (myOverview1 === null || myOverviewDiv1.style.display === "none") {
        // show DIV
        myOverviewDiv1.style.display = "inline";
        myOverviewDiv1.style.left = "0px";
        myOverviewDiv1.style.top = (myDiagram.div.scrollHeight - myOverviewDiv1.scrollHeight) + "px";
        if (myOverview1 !== null) return;
        // create Overview
        myOverview1 =
            go.GraphObject.make(go.Overview, myOverviewDiv1,  // the HTML DIV element for the Overview
                {
                    scrollMode: go.Diagram.InfiniteScroll,
                    "box.visible": false,
                    observed: myDiagram,   // tell it which Diagram to show
                    // disable normal Overview functionality to make it act as a magnifying glass:
                    initialScale: 20,  // zoom in even more than normal
                    autoScale: go.Diagram.None,  // don't show whole observed Diagram
                    hasHorizontalScrollbar: false,  // don't show any scrollbars
                    hasVerticalScrollbar: false
                });
        // disable all mouse-down tools
        myOverview1.toolManager.mouseDownTools.each(function (t) { t.isEnabled = false; });
        // handle mouse moves within the Overview by redirecting the events to the myDiagram
        myOverview1.doMouseMove = function () {
            var pt = myOverview.lastInput.documentPoint.copy();
            var e = myDiagram.lastInput;
            e.documentPoint = pt;
            e.viewPoint = myDiagram.transformDocToView(e.documentPoint);
            myDiagram.toolManager.doMouseMove();
        };
        // implement the magnifying glass functionality, to have the Overview show part of the Diagram where the mouse is
        myDiagram.toolManager.doMouseMove = function () {
            go.ToolManager.prototype.doMouseMove.call(myDiagram.toolManager);
            var myOverviewDiv1 = document.getElementById("myOverviewDiv1");
            if (myOverviewDiv1.style.display !== "none") {
                var e = myDiagram.lastInput;
                var osize = myOverview1.viewportBounds.size;
                myOverview1.position = new go.Point(e.documentPoint.x - osize.width / 2, e.documentPoint.y - osize.height / 2);
                myOverviewDiv1.style.left = (e.viewPoint.x - myOverviewDiv1.scrollWidth / 2) + "px";
                myOverviewDiv1.style.top = (e.viewPoint.y - myOverviewDiv1.scrollHeight / 2) + "px";
            }
        };
    } else {

        myOverviewDiv1.style.display = "none";
    }
}

function myCallback(blob) {
    var url = window.URL.createObjectURL(blob);
    var filename = "myBlobFile.png";

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    // IE 11
    if (window.navigator.msSaveBlob !== undefined) {
        window.navigator.msSaveBlob(blob, filename);
        return;
    }

    document.body.appendChild(a);
    requestAnimationFrame(function () {
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });
}

function makeBlob() {
    var blob = myDiagram.makeImageData({ background: "white", returnType: "blob", callback: myCallback });
}

function changefood() {

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/flowChart.asmx/getNutrient",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + $("#ddlFood option:selected").val() + "','pathwayid':'" + pathwayId + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {

            var result = JSON.parse(data.d).responseValue;
            if (result.length > 0 && $("#ddlFood option:selected").val() != '0') {
                blink(result);
            } else {
                clearTimeout(varSetTimeOut);
                myDiagram.commit(function (d) {  // this Diagram
                    // iterate over all nodes in Diagram			
                    d.nodes.each(function (node) {
                        if (node.data.highlight == true) {
                            myDiagram.model.commit(function (m) {
                                m.set(node.data, "highlight", !node.data.highlight);
                            }, "asas");
                        }
                    });
                }, "flash");
            }

        },
        error: function (error) {

        }
    });

}

function blink(result) {
    var isfind1 = true;
    function flash2() {
        myDiagram.model.commit(function (m) {
            for (var i = 0; i < result.length; i++) {
                var data = myDiagram.findNodeForKey(result[i].keyword);
                m.set(data.data, "highlight", !data.data.highlight);
                if (isfind1) {
                    // myDiagram.centerRect(searchNode[currentIntex].actualBounds);
                    myDiagram.centerRect(data.actualBounds);
                    isfind1 = false;
                }

            }

        }, "flash123");
    }
    function loop2() {
        varSetTimeOut = setTimeout(function () { flash2(); loop2(); }, 500);
    }
    loop2();
}


function getMeaning() {
    alert();
}




function getEnzyme(id) {

    //if (urlPathwayId != $("#ddlpathway option:selected").val()) {
    //    pathwayId = 0;
    //}
    //else {
    //    pathwayId = $("#ddlpathway option:selected").val();
    //}
    if (!id) {
        id = 0;
    }
    $("#dataTableExample1").find("tbody").empty();
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getEnzyme",
        contentType: 'application/json',
        data: "{'pathwayid': '" + id + "','empid':'" + userLoginID + "'}",
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            $("#isSymbole").show();
            var result = JSON.parse(data.d);
            var aa = result.responseValue.Table;
            //$("#anchDiteNotInserted").val('Diet not Assign: ' + aa.length + '/' + JSON.parse(allNode[0].mainNode).length);
            allEnzyme = aa;

            var tbody = $('#dataTableExample1');

            var table = tbody.length ? tbody : $('#dataTableExample1');
            var abcd = [];

            var jsonArray = [];
            $.each(aa, function (i) {


                var jsonArray = (JSON.parse(aa[i].molecule));

                var moleculeData = []
                $.each(jsonArray, function (j) {

                    moleculeData.push('<span style="padding:5px;background-color:#D1DDE4;margin-bottom:5px;display: inline-block;cursor: pointer;" onclick="getKeyword(\'' + jsonArray[j].molecule + '\')">' + jsonArray[j].molecule + '</span><span style="padding:5px;background-color:red;color:#fff;margin-right:5px;margin-bottom:5px;display: inline-block;cursor: pointer;" value="' + jsonArray[j].id + '" onClick="removeEnzyme(this)"><i class="fa fa-trash">X</i></span>');

                });
                $('#pathway').append('<tr><td>' + aa[i].pathwayName + '</td><td>' + moleculeData + '</td></tr>');

            });

            if (result.responseValue.Table && result.responseValue.Table.length > 0) {
                $("#enzymeCount").val('Total Assigned Enzyme: ' + result.responseValue.Table[0].moleculeCount);
            }

            setTimeout(function () {

            }, 1000);

            setTimeout(function () {

            }, 1000);

        },
        error: function (error) {

        }, complete: function () {

        }
    });

}

function removeEnzyme(span) {
    value = span.getAttribute('value');

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/deleteEnzyme",
        contentType: 'application/json',
        data: "{'id': '" + value + "'}",
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {

            maketoast('success', 'Success', 'Deleted Successfully.');
            getEnzyme($("#ddlpathway option:selected").val());

            setTimeout(function () {

            }, 1000);

            setTimeout(function () {

            }, 1000);

        },
        error: function (error) {

        }, complete: function () {

        }
    });

}
function chkMedicine(obj) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;

    //alert(nodedata.text);

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getMedicine",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + nodedata.text + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var medicineList = result.Table;

            $('#myChkMedcineModal').modal('show');

            $('#myChkMedcineModal .modal-title').text('Medicine');
            $("#notfillMedicine").html('');
            var text = '';
            if (medicineList.length > 0) {
                $.each(medicineList, function () {
                    text += '<span style="padding:5px;background-color:#D1DDE4;margin-right:5px;margin-bottom:5px;display: inline-block;cursor: pointer;" title="' + this.effectType + '" onclick="getMedicineDetail(\'' + this.medicineID + '\')">' + this.medicineName + '</span>';
                });
            } else {
                text = '<span>Not Found</span>';
            }

            $("#medicineDetail").html('');
            $("#notfillMedicine").html(text);
        },
        error: function (error) {

        }
    });
}

function getMedicineDetail(medicineID) {

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "http://182.156.200.179:330/medicineReport",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({ 'medicineId': medicineID, 'userId': 2 }),
        headers: {
            "Content-Type": "application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoic2FkZGFtIiwibGFzdE5hbWUiOm51bGwsImVtYWlsSWQiOm51bGwsIm1vYmlsZU5vIjoiODk2MDI1MzEzMyIsImNvdW50cnkiOiJJTkRJQSIsInppcENvZGUiOiIyMjYwMjAiLCJvY2N1cGF0aW9uSWQiOjEsImFnZSI6bnVsbCwiZ2VuZGVyIjpudWxsLCJoZWlnaHRJbkZlZXQiOm51bGwsImhlaWdodEluSW5jaCI6bnVsbCwid2VpZ2h0IjpudWxsLCJwYWNrYWdlTmFtZSI6IkZyZWUiLCJpYXQiOjE1NjMwMTM4MDUsImV4cCI6MTU5NDU0OTgwNX0.l220lljQyTXmDPD-gyU53H4vV-I1GDPociKcp2qrWe8"
        },
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = data.responseValue;

            var medicineDetailHTML = '';
            if (result && result.length) {

                for (var i = 0; i < result.length; i++) {
                    var body = result[i].body;
                    var heading = '<h4><u>' + result[i].heading + '</u></h4>';

                    var bodyHTML = '';
                    if (result[i].headingId == 1) {
                        bodyHTML += body;
                    }
                    else if (result[i].headingId == 2) {
                        var innerBody = '';

                        if (result[i].body && result[i].body.length > 0) {
                            innerBody += '<ul>';
                            for (var j = 0; j < result[i].body.length; j++) {
                                bodyHTML += '<li>' + result[i].body[j].whenToUse + '</li>';
                            }
                            innerBody += '</ul>';
                        }

                        bodyHTML += innerBody + '<b>Reference :</b> ' + result[i].reference;
                    }
                    else if (result[i].headingId == 3) {
                        var innerBodyDose = '';

                        if (result[i].body[0].adultDose && result[i].body[0].adultDose.length > 0) {

                            innerBodyDose += '<h5> Adult Dose </h5>';
                            innerBodyDose += '<table class="table table-bordered" style="width: 100%"> <tr> <th>Ailment</th> <th>Route</th> <th>Dose</th> <th>Weight</th> <th>Age</th> </tr>';

                            var adultDose = result[i].body[0].adultDose;
                            for (var l = 0; l < adultDose.length; l++) {
                                innerBodyDose += '<tr> <td>' + adultDose[l].ailment + '</td> <td>' + adultDose[l].route + '</td> <td>' + adultDose[l].dose + '</td> <td>' + adultDose[l].weight + '</td> <td>' + adultDose[l].age + '</td> </tr>';
                            }

                            innerBodyDose += '</table > ';
                        }

                        if (result[i].body[0].pediatricDose && result[i].body[0].pediatricDose.length > 0) {

                            innerBodyDose += '<h5> Pediatric Dose </h5>';
                            innerBodyDose += '<table class="table table-bordered" style="width: 100%"> <tr> <th>Ailment</th> <th>Route</th> <th>Dose</th> <th>Weight</th> <th>Age</th> </tr>';

                            var pediatricDose = result[i].body[0].pediatricDose;
                            for (var l = 0; l < pediatricDose.length; l++) {
                                innerBodyDose += '<tr> <td>' + pediatricDose[l].ailment + '</td> <td>' + pediatricDose[l].route + '</td> <td>' + pediatricDose[l].dose + '</td> <td>' + pediatricDose[l].weight + '</td> <td>' + pediatricDose[l].age + '</td> </tr>';
                            }

                            innerBodyDose += '</table > ';
                        }
                        innerBodyDose += '</div>';

                        bodyHTML += innerBodyDose + ' <b>Reference :</b> ' + result[i].reference;
                    }
                    else if (result[i].headingId == 4) {
                        var innerBodySideEffect = '';

                        if (result[i].body && result[i].body.length > 0) {

                            for (var l = 0; l < result[i].body.length; l++) {
                                innerBodySideEffect += result[i].body[l].sideEffects + ', ';
                            }
                        }

                        bodyHTML += innerBodySideEffect + '<br /> <b>Reference :</b> ' + result[i].reference;
                    }
                    else if (result[i].headingId == 6) {
                        var innerBodyConcerns = '';

                        if (result[i].body && result[i].body.length > 0) {

                            for (var l = 0; l < result[i].body.length; l++) {
                                innerBodyConcerns += result[i].body[l].text + ' - ' + result[i].body[l].value + '<br />';
                            }
                        }

                        bodyHTML += innerBodyConcerns;
                    }
                    else if (result[i].headingId == 8) {
                        var innerBodyPrecautions = '';

                        if (result[i].body && result[i].body.length > 0) {

                            for (var l = 0; l < result[i].body.length; l++) {
                                innerBodyPrecautions += result[i].body[l].precautions + '<br />';
                            }
                        }

                        bodyHTML += innerBodyPrecautions + ' <b>Reference :</b> ' + result[i].reference;
                    }
                    else if (result[i].headingId == 5) {
                        var innerBodyInteractions = '';

                        if (result[i].body && result[i].body.length > 0) {

                            $.each(result[i].body, function (i) {

                                if (this.interactionWithMedicineGroup && this.interactionWithMedicineGroup.length > 0) {
                                    $.each(this.interactionWithMedicineGroup, function (j) {
                                        innerBodyInteractions += this.interactionWithMedicineGroup + '<br />';
                                    });
                                }
                                if (this.interactionWithAddiquate && this.interactionWithAddiquate.length > 0) {
                                    $.each(this.interactionWithAddiquate, function (j) {
                                        innerBodyInteractions += this.interactionWithAddiquate + '<br />';
                                    });
                                }
                                if (this.interactionWithMedicine && this.interactionWithMedicine.length > 0) {
                                    $.each(this.interactionWithMedicine, function (j) {
                                        innerBodyInteractions += this.interactionWithMedicine + '<br />';
                                    });
                                }
                                if (this.interactionWithNurient && this.interactionWithNurient.length > 0) {
                                    $.each(this.interactionWithNurient, function (j) {
                                        innerBodyInteractions += this.interactionWithNurient + '<br />';
                                    });
                                }
                                if (this.interactionWithProblem && this.interactionWithProblem.length > 0) {
                                    $.each(this.interactionWithProblem, function (j) {
                                        innerBodyInteractions += this.interactionWithProblem + '<br />';
                                    });
                                }

                            });
                        }

                        bodyHTML += innerBodyInteractions + ' <b>Reference :</b> ' + result[i].reference;
                    }
                    else if (result[i].headingId == 7) {
                        bodyHTML += body + '<br /> <b>Reference :</b> ' + result[i].reference;
                    }

                    medicineDetailHTML += '<div class="row-fluid">' + heading + bodyHTML + '</div>';
                }
            }

            $("#medicineDetail").html(medicineDetailHTML);
        },
        error: function (error) {

        }
    });
}

var researchBasedQuestionID = 0;
var researchProcess = 0;
var researchPhenomenonID = 0;
var researchPhenomenonName = '';

function saveResearchBasedQuestion() {
    var researchQuestion = $('#txtResearchBasedQuestion').val();
    if (researchQuestion == '') {
        maketoast('error', 'Error', 'Please Enter Question');
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/flowDiagram.asmx/saveResearchBasedQuestion",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + researchBasedQuestionID + "','diseaseID': '" + pathwayId + "','phenomenonID':'" + researchPhenomenonID + "','process':'" + researchProcess + "','process':'" + researchProcess + "','questionText':'" + researchQuestion + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                clearResearchBasedQuestion();
                getResearchBasedQuestionModal();
                maketoast('success', 'Success', 'Save Successfully.');
            }
        },
        error: function (error) {

        }
    });
}

function GoToPathway(obj) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;
    var pageLocation = '../project/pathway2.aspx?pathwayID=' + pathwayId + '&groupID=' + nodedata.groupID;
    //window.location.href = pageLocation;
    window.open(pageLocation);
}

function getResearchBasedQuestionModal(e, button, id) {
    if (button) {
        var node = button.part.data;
        researchBasedQuestionID = id == null ? 0 : id;
        researchProcess = node.group.replace('_', '');
        researchPhenomenonID = node.key;
        researchPhenomenonName = node.text;
    }

    $('#modalResearchBasedQuestion').modal('show');
    $('#modalResearchBasedQuestion .modal-title').text('Research Based Question ' + researchPhenomenonName);

    $.ajax({
        type: "POST",
        url: "WebService/flowDiagram.asmx/getResearchBasedQuestionList",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + researchBasedQuestionID + "','diseaseID': '" + pathwayId + "','phenomenonID':'" + researchPhenomenonID + "','process':'" + researchProcess + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;

            var row = $("#tblResearchBasedQuestion thead tr").clone();
            $("#tblResearchBasedQuestion tbody tr").remove();
            $.each(list, function (index) {
                $(".td_Sno", row).text(index + 1);
                $(".td_Question", row).text(this.questionText);
                $(".td_Action", row).html('<i class="icon-edit" style="cursor:pointer;" onclick="editResearchBasedQuestion(' + this.id + ',' + this.processID + ',' + this.pathwayID + ',' + this.diseaseID + ')"></i> | <i class="icon-trash" style="cursor:pointer;"  onclick="deleteResearchBasedQuestion(' + this.id + ')"></i>');
                $("#tblResearchBasedQuestion tbody").append(row);
                row = $("#tblResearchBasedQuestion thead tr").clone();
            });
        },
        error: function (error) {

        }
    });
}

function editResearchBasedQuestion(id) {
    researchBasedQuestionID = id;

    $.ajax({
        type: "POST",
        url: "WebService/flowDiagram.asmx/getResearchBasedQuestionList",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id': '" + researchBasedQuestionID + "','diseaseID': '" + pathwayId + "','phenomenonID':'" + researchPhenomenonID + "','process':'" + researchProcess + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var list = JSON.parse(data.d).responseValue.Table;
            if (list) {
                if (list.length > 0) {
                    $('#txtResearchBasedQuestion').val(list[0].questionText);
                }
            }
        },
        error: function (error) {

        }
    });
}

function deleteResearchBasedQuestion(id) {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (confirm("Are you sure want to delete?")) {
        $.ajax({
            type: "POST",
            url: "WebService/flowDiagram.asmx/deleteResearchBasedQuestion",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'id': '" + id + "','empid':'" + userLoginID + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.responseCode == 1) {
                    clearResearchBasedQuestion();
                    getResearchBasedQuestionModal();
                    maketoast('success', 'Success', 'Delete Successfully.');
                }
            },
            error: function (error) {

            }
        });
    }
}

function clearResearchBasedQuestion() {
    $('#txtResearchBasedQuestion').val('');
    researchBasedQuestionID = 0;
}

$(function () {
    // when the modal is closed
    $('#modalResearchBasedQuestion').on('hidden.bs.modal', function () {
        $('#txtResearchBasedQuestion').val('');
        researchBasedQuestionID = 0;
        researchProcess = 0;
        researchDiseaseID = 0;
        researchPhenomenonID = 0;
        researchPhenomenonName = '';
    });
});

function nutrientCategoryCountReport(nutrientCategoryCountList) {

    var result = nutrientCategoryCountList;

    var col = [];
    for (var i = 0; i < result.length; i++) {
        for (var key in result[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.className = 'table table-bordered table-striped';
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i].split('$')[0].replace('z1-', '');
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < result.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {

            var tabCell = tr.insertCell(-1);

            if (result[i][col[j]] == 0 || result[i][col[j]] == null) {
                tabCell.innerHTML = '';
            } else {
                tabCell.innerHTML = '<a href="javascript:;" onclick="getNutrientFromCategory(this,\'' + col[j].replace('z1-', '') + '\')">' + (result[i][col[j]]) + '</a>';
            }
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function getNutrientFromCategory(obj, nutrientCategory) {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $('#myModal1').modal('show');
    $('#myModal1 .modal-title').text('');
    $("#notfillDite").html('');

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getNutrientFromCategory",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayid': '" + pathwayId + "','nutrientCategory': '" + nutrientCategory + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var text = '';
            for (var j = 0, len = result.length; j < len; j++) {
                text += '<span style="padding:5px;background-color:#D1DDE4;margin-right:5px;margin-bottom:5px;display: inline-block;cursor: pointer;" onclick="getKeyword(\'' + result[j].keyword + '\')">' + result[j].keyword + '</span>';
            }
            $("#notfillDite").html(text);

        },
        error: function (error) {

        }
    });
}

function getMedicineInteractionReport() {

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $('#modalMedicineInteractionReport').modal('show');
    $('#modalMedicineInteractionReport .modal-title').text('');

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getMedicineInteractionReport",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pid': '" + $('#PID').val().trim() + "','pathwayid':'" + pathwayId + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var medicineInteractionList = result.Table;

            var col = [];
            for (var i = 0; i < medicineInteractionList.length; i++) {
                for (var key in medicineInteractionList[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");
            table.className = 'table table-bordered table-striped';
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < 4; i++) {
                var th = document.createElement("th");      // TABLE HEADER.                
                if (i == 0) {
                    th.innerHTML = 'Medicine';
                    tr.appendChild(th);
                }
                else if (i == 1) {
                    th.innerHTML = 'Phenomenon';
                    tr.appendChild(th);
                }
                else if (i == 2) {
                    th.innerHTML = 'To Eat';
                    tr.appendChild(th);
                }
                else if (i == 3) {
                    th.innerHTML = 'Not To Eat';
                    tr.appendChild(th);
                }
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < medicineInteractionList.length; i++) {
                tr = table.insertRow(-1);
                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    if (j == 0) {
                        tabCell.innerHTML = medicineInteractionList[i][col[j]];
                    }
                    else if (j == 1) {
                        var phenomenonList = JSON.parse(medicineInteractionList[i][col[j]]);
                        if (phenomenonList) {
                            if (phenomenonList.length > 0) {
                                var phenomenonListItem = '<ul>';
                                for (var k = 0, len = phenomenonList.length; k < len; k++) {
                                    phenomenonListItem += '<li>' + phenomenonList[k].phenomenon + '</li>';
                                }
                                phenomenonListItem += '</ul>';
                                tabCell.innerHTML = phenomenonListItem;
                            }
                        }
                    }
                    else if (j == 2) {
                        var beneficialNutrientList = JSON.parse(medicineInteractionList[i][col[j]]);
                        if (beneficialNutrientList) {
                            if (beneficialNutrientList.length > 0) {
                                var beneficialNutrientListItem = '';
                                for (var l = 0, len1 = beneficialNutrientList.length; l < len1; l++) {

                                    beneficialNutrientListItem += '<span style="padding:5px;background-color:#D1DDE4;margin-right:5px;margin-bottom:5px;display: inline-block;cursor: pointer;" onclick="getKeyword(\'' + beneficialNutrientList[l].nutrientName + '\')">' + beneficialNutrientList[l].nutrientName + '</span>';
                                }

                                tabCell.innerHTML = beneficialNutrientListItem;
                            }
                        }
                    }
                    else if (j == 3) {
                        var harmfullNutrientList = JSON.parse(medicineInteractionList[i][col[j]]);
                        if (harmfullNutrientList) {
                            if (harmfullNutrientList.length > 0) {
                                var harmfullNutrientListItem = '';
                                for (var m = 0, len2 = harmfullNutrientList.length; m < len2; m++) {

                                    harmfullNutrientListItem += '<span style="padding:5px;background-color:#D1DDE4;margin-right:5px;margin-bottom:5px;display: inline-block;cursor: pointer;" onclick="getKeyword(\'' + harmfullNutrientList[m].nutrientName + '\')">' + harmfullNutrientList[m].nutrientName + '</span>';
                                }

                                tabCell.innerHTML = harmfullNutrientListItem;
                            }
                        }
                    }
                }
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showData1");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);

        },
        error: function (error) {

        }
    });
}

function getMoleculeColorList() {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getMoleculeColorList",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $("#tblColorCombination thead tr").clone();
            $("#tblColorCombination tbody tr").remove();
            $.each(result.Table, function (index) {
                $(".td_CenterMolecule", row).html(this.isCenterMolecule === 1 ? '&#10004;' : '');
                $(".td_RegulatoryMolecule", row).html(this.isDoubleMolecule === 1 ? '&#10004;' : '');
                $(".td_ReportedMolecule", row).html(this.isTripleMolecule === 1 ? '&#10004;' : '');
                $(".td_MoleculeAvailableInEra", row).html(this.isMoleculeAvailableInEra === 1 ? '&#10004;' : '');
                $(".td_SubCenterMolecule", row).html(this.isCenterMoleculePriority === 1 ? '&#10004;' : '');
                $(".td_SpecificMolecule", row).html(this.isSpecificMolecule === 1 ? '&#10004;' : '');
                $(".td_Color", row).html('<div style="height: 25px; background-color:' + this.color + '"></div>');

                $("#tblColorCombination tbody").append(row);
                row = $("#tblColorCombination thead tr").clone();
            });


            $("#modalColorCombination").modal('show');
            $('#modalColorCombination .modal-title').text('Color Codes');
        },
        error: function (error) {

        }
    });
}

function goToDiet(obj) {

    var contextmenu = obj.part;
    var nodedata = contextmenu.data;
    var pageLocation = '../project/signalingCascade.aspx?pathwayId=' + pathwayId + '&cascadeName=' + nodedata.text;
    window.open(pageLocation);
    //window.location.href = pageLocation;
}

function goToSamplePaper(obj) {

    var contextmenu = obj.part;
    var nodedata = contextmenu.data;
    window.open(nodedata.samplePaper);
}

function getRDADetail(obj) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/signalingCascade.asmx/getMarkerDetail",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'cascadeName': '" + nodedata.text + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $($("#tblRDADetail thead tr")[0]).clone();
            $("#tblRDADetail tbody tr").remove();

            $.each(result.Table, function (index) {
                $(".td_rda", row).html(this.rda);
                $(".td_peakValue", row).text(this.nutrientPeakValue);
                $(".td_tHalfValue", row).text(this.nutrientTHalfValue);

                $("#tblRDADetail tbody").append(row);
                row = $("#tblRDADetail thead tr").clone();
            });

            $("#modalRDADetail").modal('show');
            $('#modalRDADetail .modal-title').text('Marker RDA Details');
        },
        error: function (error) {

        }
    });
}

function getMarkerDetail(obj) {

    var contextmenu = obj.part;
    var nodedata = contextmenu.data;
    console.log("G", nodedata);
    var tr;
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        method: "Post",
        url: 'WebService/SVGWebService.asmx/getMarkerDetails',
        dataType: 'json',
        data: "{'pathwayId':'" + pathwayId + "','markerName':'" + nodedata.text + "','receptorID':'" + nodedata.group + "','empid':'" + userLoginID + "'}",
        contentType: 'application/json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d).responseValue;



            $("#modalMarkerDetail").modal('show');
            //var row = $("#modelPID thead tr").clone();
            $("#modalMarkerDetail tbody tr").remove();


            if (result != null) {
                if (result.Table.length > 0) {
                    $.each(result.Table, function (i, val) {

                        tr = tr + "<tr><td>" + val.nutrientName + "</td><td>" + val.processname + "</td><td>" + val.lavel + "</td><td>" + val.highLow + "</td><td>" + val.harmfulbeneficial + "</td><td>" + val.compoundType + "</td><td>" + val.researchYear + "</td><td>" + val.meaning + "</td><td>" + val.eraHypothesis + "</td><td>" + val.studyReferenceDetailsURL + "</td><td>" + val.studyTreatmentDetailsMedicine + "</td></tr>";
                    });
                }
            }
            $("#modalMarkerDetail tbody").append(tr);
            row = $("#modalMarkerDetail thead tr").clone();
            //var row = $("#tblMarkerDetail thead tr:first").clone();
            //$("#tblMarkerDetail tbody tr").remove();
            //$.each(result.Table, function (i) {
            //    $('.td_SerialNo', row).text((i + 1) + '.');

            //    var phenomenonName = `${this.phenomenonName == null ? "_" : this.phenomenonName}`;
            //    $('.td_Phenomenon', row).text(phenomenonName);
            //    //var parameterName = `${this.parameterName == null ? "_" : this.parameterName}`;
            //    //$('.td_Parameter', row).text(parameterName);
            //    var studyLevel = `${this.studyLevel == null ? "_" : this.studyLevel}`;
            //    $('.td_StudyLevel', row).text(studyLevel);
            //    //var location = `${this.location == "" ? "_" : this.location}`;
            //    //$('.td_Location', row).text(location);
            //    var meaning = `${this.meaning == null ? "_" : this.meaning}`;
            //    $('.td_Meaning', row).text(meaning);
            //    //var centralCompoundName = `${this.centralCompoundName == null ? "_" : this.centralCompoundName}`;
            //    //$('.td_CentralCompound', row).text(centralCompoundName);
            //    var associatedProblemName = `${this.associatedProblemName == "" ? "_" : this.associatedProblemName}`;
            //    $('.td_AssociatedProblem', row).text(associatedProblemName);
            //    var erashypothesis = `${this.erashypothesis == "" ? "_" : this.erashypothesis}`;
            //    $('.td_ErasHypotdesis', row).text(erashypothesis);
            //    var studyTreatmentDetails = `${this.studyTreatmentDetails == null ? "_" : this.studyTreatmentDetails}`;
            //    $('.td_StudyTreatment', row).html(studyTreatmentDetails);
            //    var otherPathwayDetails = `${this.otherPathwayDetails == null ? "_" : this.otherPathwayDetails}`;
            //    $('.td_OtderPatdwayDetails', row).html(otherPathwayDetails);
            //    var studyReferenceDetails = `${this.studyReferenceDetails == null ? "_" : this.studyReferenceDetails}`;
            //    $('.td_StudyReferenceDetails', row).html(studyReferenceDetails);
            //    var transporterDetails = `${this.transporterDetails == "" ? "_" : this.transporterDetails}`;
            //    $('.td_BloodBrainBarrierDetails', row).html(transporterDetails);

            //    $("#tblMarkerDetail tbody").append(row);
            //    row = $("#tblMarkerDetail thead tr:first").clone();
            //});

            //$('#modalMarkerDetail').modal('show');

        }, error: function (error) {

        }
    });
}

function getMyGraphData(obj) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;
    var rankNo = 0;

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    //$('#signModel').modal('show');
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getMyGraphData",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayId': '" + pathwayId + "','keyword':'" + nodedata.text + "','keyId':'" + nodedata.group + "','rankNo':'" + rankNo + "','empid':'" + userLoginID + "'}",
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

           // var height1 = $('#modalEndResult .modal-body').height() - 10;
            $('#modalEndResult .modal-body').empty();
            //$('#modalEndResult .modal-body').append('<div id="divMyDubleTree" style="background-color: #fff; border: solid 1px black; width: 100%; height:' + height1 + 'px;"></div>');
            $('#modalEndResult .modal-body').append('<div id="divMyDubleTree" style="background-color: #fff; border: solid 1px black; width: 100%; height: 650px !important;"></div>');

            initMyDubleTree(mainNode);
            $("#modalEndResult").modal('show');



        },
        error: function (error) {

        }
    });
}

function getItemStock(obj) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getItemStock",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + nodedata.text + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $("#tblItemStock thead tr").clone();
            $("#tblItemStock tbody tr").remove();
            $.each(result.Table, function (index) {
                $(".td_Item", row).text(this.item);
                $(".td_Category", row).text(this.category);
                $(".td_Quantity", row).text(this.quantity);
                $(".td_StoreName", row).text(this.storeName);

                $("#tblItemStock tbody").append(row);
                row = $("#tblItemStock thead tr").clone();
            });


            $("#modalItemStock").modal('show');
            $('#modalItemStock .modal-title').text('Item Stock');
        },
        error: function (error) {

        }
    });
}

function getTestMachineDetail(obj) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getTestMachineDetail",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + nodedata.text + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $("#tblTestMachineDetail thead tr").clone();
            $("#tblTestMachineDetail tbody tr").remove();

            var instruction = '';
            $.each(result.Table, function (index) {
                $(".td_machineName", row).text(this.machineName);
                $(".td_machineLocation", row).text(this.machineLocation);
                $(".td_intercomNumber", row).text(this.intercomNumber);
                $(".td_contactPerson", row).text(this.contactPerson);
                $(".td_resultTime", row).text(this.resultTime);
                $(".td_itemCharge", row).text(this.itemCharge);

                if (this.instruction) {
                    instruction += '<li>' + this.instruction + '</li>';
                }

                $("#tblTestMachineDetail tbody").append(row);
                row = $("#tblTestMachineDetail thead tr").clone();
            });

            $("#instruction").html(instruction);

            $("#modalTestMachineDetail").modal('show');
            $('#modalTestMachineDetail .modal-title').text('Machine Details');
        },
        error: function (error) {

        }
    });
}

function getCoFactors(obj) {
    var contextmenu = obj.part;
    var nodedata = contextmenu.data;

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getCoFactors",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + nodedata.text + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var title = 'Co-Factors of ' + nodedata.text;
            $('#modalCoFactor').modal('show');
            $('#modalCoFactor .modal-title').text(title);
            $("#divCoFactor").html('');
            var text = '';
            for (var j = 0, len = result.Table.length; j < len; j++) {
                text += '<span style="padding:5px;background-color:#D1DDE4;margin-right:5px;margin-bottom:5px;display: inline-block;">' + result.Table[j].coFactor + '</span>';
            }
            $("#divCoFactor").html(text);

        },
        error: function (error) {

        }
    });
}

function initMyDubleTree(mainNode) {

    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates in this function

    divMyDubleTree =
        $(go.Diagram, "divMyDubleTree",
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

    divMyDubleTree.nodeTemplate =
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

    //divMyDubleTree.linkTemplate =
    //    $(go.Link,  // the whole link panel
    //        { selectable: false },
    //        $(go.Shape),
    //        $(go.Panel, "Auto",  // this whole Panel is a link label
    //            $(go.Shape, "Diamond", { width: 30, height: 30, fill: "yellow", stroke: "gray" }, new go.Binding("fill", "fillD")),
    //            $(go.TextBlock, { margin: 1, font: "bold 12px Helvetica, bold Arial, sans-serif" },
    //                new go.Binding("text", "relation"))
    //        ));  // the link shape   

    divMyDubleTree.linkTemplate =
        $(go.Link,  // the whole link panel
            { selectable: false },
            $(go.Shape));  // the link shape


    // create the model for the double tree; could be eiher TreeModel or GraphLinksModel
    divMyDubleTree.model = new go.TreeModel(mainNode);

}

function createPDF() {

    var width = parseInt(document.getElementById('widthInput').value);
    var height = parseInt(document.getElementById('heightInput').value);
    var db = myDiagram.documentBounds.copy();
    var boundswidth = parseInt(db.width);
    var boundsheight = parseInt(db.height);
    $("#wehe").empty();
    $("#wehe").append("<p>Width : " + boundswidth + "<br>Height : " + boundsheight + "</h4>");
    img = myDiagram.makeImage({
        scale: 1,
        background: "AntiqueWhite",
        type: "image/jpeg",
        position: new go.Point(width, height),
        size: new go.Size(2000, 2000)
    });
    var str64 = img.src;
    $('#metabolicImg').attr("href", str64);
}

function changeParameter() {
    myDiagram.div = null;
    phenomenonID = 0;
    getDetails();

    //var chkPhenomenonID = '';
    //$(":checkbox:checked").each(function () {
    //    var checked = $(this).val();
    //    chkPhenomenonID += checked + ',';
    //});
    //alert(chkPhenomenonID);
}

//function Phenomenon() {

//    $("#sdata tbody input[type=checkbox]:checked").each(function (i) {

//        tr = tr + "<tr><td>" + (i + 1) + "</td><td class='stdId'>" + row.cells[1].innerHTML + "</td><td>" + row.cells[2].innerHTML + "</td><td>" + row.cells[3].innerHTML + "</td></tr>";
//    });
//    $("#showstudent").append(tr);
//}




function multiSelectDisease() {
    $('#ddlphenomenon').multiselect({
        buttonWidth: '63%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Phenomenon',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}


$(document).on('click', '#btnSaveJson', function (e) {

    if (typeof myDiagram !== 'undefined') {
        var nodedata = JSON.parse(myDiagram.model.toJson()).nodeDataArray;
        var receptorArr = [];
        $.each(nodedata, function (i, val) {
            if (Number.isInteger(val.key)) {
                receptorArr.push(val);
            }
        });

    }

});

var headerID;
function getPathwayWithPID() {
    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var pid = $('#PID').val();
    if (pid == 0 || pid == null || pid == "") {
        alert("PLZ Enter PID..");
        return;
    }

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getMedication",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'PID': '" + $('#PID').val() + "','pathwayid':'" + pathwayId + "','id':'" + Number(medicineID) + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
           $("#modelPID").modal('show');
            //var row = $("#modelPID thead tr").clone();
            $("#modelPID tbody tr").remove();

            var pathwayID;
            var head;
            var tr;
            var tag ;
            if (result.Table1.length > 0) {
                $.each(result.Table1, function (i, val) {
                    var mainData = JSON.parse(result.Table1[i].FinalData);
                    tag = '';
                   tag += '<ul>';
                    for (var i = 0; i < mainData.length; i++) {
                        pathwayID = mainData[i].pathwayId;
                         head = mainData[i].headName;
                        var aaa = mainData[i].keyword;
                        tag += '<li>' + aaa + '</li>';
                    }
                    tag += '</ul>';
                    tr = tr + "<tr><td class='onPathway' onclick='samp(" + pathwayID + ")'>" + head + "</td><td>" + tag + "</td></tr>";
                });
            }

            $("#modelPID tbody").append(tr);
            row = $("#modelPID thead tr").clone();

        },
        error: function (error) {

        }
    });
}

var getNutrientInteck = function () {
    var diseaseID = $("#ddlpathway").val();
    var pid = $('#PID').val();

    if (userLoginID != 1 && !UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    if ($("#ddlpathway option:selected").val() == null || $("#ddlpathway option:selected").val() == '--Select--' || $("#ddlpathway option:selected").val() == 0) {
        alert('Please Select Disease');
        return;
    }

    if (pid == 0 || pid == null || pid == "") {
        alert("PLZ Enter PID..");
        return;
    }
    var text = '';
    $("#data").html('');

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/pIDInteckNutrient",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'DiseaseID':'" + diseaseID + "','PID':'" + pid + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            $('#nutrientModel').modal('show');
            var result = JSON.parse(data.d).responseValue;
            //console.log(result);
            $.each(result.Table, function (i, val) {
                if (val.achievedRDAPercentage > 75) {
                    text += '<span id="skp" style="padding:5px;background-color:#90EE90;color:black;font-weight: bold;margin-right:5px;margin-bottom:5px;display: inline-block;cursor: pointer;" onclick="aboutNutrientDATA(\'' + val.markerId + '\')">' + val.nutrientName + '</span>';
                }
                else if (val.achievedRDAPercentage < 75 && val.achievedRDAPercentage > 50) {
                    text += '<span id="skp" style="padding:5px;background-color:#FFFFE0;color:black;font-weight: bold;margin-right:5px;margin-bottom:5px;display: inline-block;cursor: pointer;" onclick="aboutNutrientDATA(\'' + val.markerId + '\')">' + val.nutrientName + '</span>';
                }
                else if (val.achievedRDAPercentage < 50 && val.achievedRDAPercentage > 1) {
                    text += '<span id="skp" style="padding:5px;background-color:#FF7F7F ;color:black;font-weight: bold;margin-right:5px;margin-bottom:5px;display: inline-block;cursor: pointer;" onclick="aboutNutrientDATA(\'' + val.markerId + '\')">' + val.nutrientName + '</span>';
                }
                else {
                    text += '<span id="skp" style="padding:5px;background-color:#b3b39f;color:black;font-weight: bold;margin-right:5px;margin-bottom:5px;display: inline-block;cursor: pointer;">' + val.nutrientName + '</span>';
                }
            });

            $("#data").html(text);
            
        },
        error: function (error) {

        }
    });

};




function aboutNutrientDATA(id) {
    var diseaseID = $("#ddlpathway").val();
    var pid = $('#PID').val();
    var ID = id;
    var tr;
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/pIDInteckNutrient",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'DiseaseID':'" + diseaseID + "','PID':'" + pid + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            $('#nutrientDATA').modal('show');
            var result = JSON.parse(data.d).responseValue;
            $("#tblnutrientDATA tbody tr").remove();
          
            $.each(result.Table, function (i, val) {
                if (ID == val.markerId) {
                    if (val.target != null) {
                    tr = tr + "<tr><td>" + val.target + "</td><td>" + val.achievedNutrientValue + "</td><td>" + val.achievedRDAPercentage + '  %' + "</td></tr>";
                    }
                }
            });
            $("#tblnutrientDATA tbody").append(tr);
            row = $("#tblnutrientDATA thead tr").clone();
        },
        error: function (error) {

        }
    });

}

function samp(val) {
    $("#ddlpathway").val(val); 
    getpathwayId(val);
    $("#modelPID").modal('hide');
    $("#PID").val('');
}
