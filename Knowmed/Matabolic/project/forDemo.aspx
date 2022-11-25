<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master"  %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
     <script src="js/bootstrap-multiselect.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet-src.js"></script>
     <style>

        .custom-menu {
            display: none;
            z-index: 1000;
            position: absolute;
            overflow: hidden;
            border: 1px solid #CCC;
            white-space: nowrap;
            font-family: sans-serif;
            background: #FFF;
            color: #333;
            border-radius: 5px;
            list-style-type: none;
            padding: 0;
        }

            .custom-menu li {
                padding: 8px 12px;
                cursor: pointer;
                border-bottom: 1px solid #ccc;
            }

                .custom-menu li:hover {
                    background-color: #DEF;
                }

        textarea {
            width: auto !important;
        }

        .red {
            background-color: #fd6300 !important;
        }

        .green {
            background-color: #20fb11 !important;
        }

        .white {
            background-color: #fff !important;
        }

        .span10 {
            width: 83% !important;
        }

        .ui-autocomplete {
            height: 55%;
            overflow: auto;
            top: 27%;
            left: 14%;
        }

        .row-highlight {
            color: red;
        }

        .icon-info-sign:before {
            content: "\f05a";
            position: absolute;
            font-size: 20px;
            text-align: right;
            right: 5px;
            top: 7px;
        }

        .plusSymbol:after {
            position: absolute;
            content: '\2719';
            font-size: 20px;
            text-align: right;
            right: 35px;
            top: 3px;
        }

        .h5, h5 {
            font-size: 14px;
            line-break: anywhere;
        }

        .modal-body.popup-decreption {
            position: relative;
            height: 40vh !important;
            max-height: 650px;
            padding: 15px;
            / overflow-y: auto; /
            overflow: auto;
            text-align: center;
        }


        .modal-xl {
            width: 1190px;
            margin: 83px auto;
        }

        .ft-big {
            font-size: 16px !important;
        }

        .multiselect-native-select {
            float: left;
            width: 35rem;
        }
    </style>
    <style>
        @media print {
            html, body, div {
                margin: 0;
                padding: 0;
                border: 0;
                font-size: 100%;
                font: inherit;
                vertical-align: baseline;
            }

                body * {
                    display: none;
                }

            #content, #myImages, #myImages * {
                display: block;
                margin: 0;
                padding: 0;
                border: 0;
                font-size: 100%;
                font: inherit;
                vertical-align: baseline;
            }

                #myImages br {
                    display: none;
                }

            img {
                page-break-inside: avoid;
                page-break-after: always;
            }
        }


        @page {
            margin: 1cm;
        }

        table tr td {
            text-align: left !important;
        }

        .searchCat {
            display: none;
        }

        .modal-body {
            position: relative;
            /*height: 650px !important;*/
            max-height: 650px;
            padding: 15px;
            overflow-y: auto;
        }

        .modelWidth {
            width: 90%;
            left: 6%;
        }


        @media only screen and (max-width: 1367px) {
            .modelWidth {
                width: 90%;
                left: 27%;
            }

            .modal-body {
                position: relative;
                height: 500px !important;
                max-height: 500px;
                padding: 15px;
                overflow-y: auto;
            }

            .modal.fade.in {
                top: 2%;
            }
        }

        #sidebar li {
            color: #fff;
        }

        #myOverviewDiv1 {
            display: none;
            position: absolute;
            background-color: white;
            z-index: 300; /* make sure its in front */
            border: solid 1px blue;
            width: 600px;
            height: 337px;
            pointer-events: none;
        }
    </style>
    <style>
        #tblMarkerDetail thead td {
            text-align: center !important;
            font-weight: bold;
            background-color: #f8f8f8;
            white-space: nowrap;
        }
    </style>
    <style type="text/css">
        /* CSS for the traditional context menu */
        .menu {
            display: none;
            position: absolute;
            opacity: 0;
            margin: 0;
            padding: 0;
            z-index: 999;
            box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
            list-style: none;
            background-color: #f5f5f5;
            /*border-radius: 4px;*/
        }

        .menu-item {
            display: block;
            position: relative;
            min-width: 180px;
            margin: 0;
            padding: 8px 8px;
            font: 12px sans-serif;
            /*color: rgba(0, 0, 0, .87);*/
            color: #000;
            cursor: pointer;
            border-bottom: solid 1px #b5b1b1;
        }

            .menu-item::before {
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                pointer-events: none;
                content: "";
                width: 100%;
                height: 100%;
                background-color: #000000;
            }

            .menu-item:hover::before {
                opacity: .06;
            }

        .menu .menu {
            top: -8px;
            left: 100%;
        }

        .show-menu, .menu-item:hover > .menu {
            display: block;
            opacity: 1;
        }

        #loader {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 11;
        }

        img {
            width: 40px;
            height: 40px;
        }


        .container, .navbar-static-top .container, .navbar-fixed-top .container, .navbar-fixed-bottom .container {
            width: 1689px;
            margin: -14px;
            margin-left: 215px;
        }


        .icon-info-sign:before {
            content: "\f05a";
            position: absolute;
            font-size: 20px;
            text-align: right;
            right: 5px;
            top: 7px;
            color:red;
        }

        .modal-body.popup-decreption {
            position: relative;
            height: 40vh !important;
            max-height: 650px;
            padding: 15px;
            overflow-y: auto;
            overflow: auto;
            text-align: center;
        }

        .plusSymbol:after {
            position: absolute;
            content: '\2719';
            font-size: 20px;
            text-align: right;
            right: 35px;
            top: 3px;
        }

        .ft-big {
            font-size: 16px !important;
        }

        .modal-xl {
            width: 1190px;
            margin: 83px auto;
        }
        h1.null {
    margin-left: 625px;
    margin-top: 194px;
    font-size: 66px;
      }

        .sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #2e363f;
  position: fixed;
  height: 100%;
  overflow: auto;
  margin-top: 20px;
}

.sidebar a {
  display: block;
  color: #fff;
  padding: 16px;
  text-decoration: none;
}
 
/*.sidebar a.active {
  background-color: #04AA6D;
  color: white;
}*/

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}
.magnifier
        {
             position: absolute;
            content: '';
            font-size: 14px;
            text-align: right;
            right: 75px;
            top: 3px;
        }

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}
.sidebar button {
    margin: 5px 0;
    font-size:16px;
}
.sidebar input {
    margin: 5px 0;
    font-size:16px;
}
.sidebar select {
    margin: 5px 0;
    font-size:16px;
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <script src="../../js/cache.js"></script>
    <script src="go.js"></script>
    <script src="https://gojs.net/latest/extensions/DoubleTreeLayout.js"></script>





      <div class="sidebar">
 <select id="ddlpathway" onchange="getpathwayId(this)" style="width: 100%;">
                    <option value="0">--Select--</option>
                </select>
     <div class="input-append">
                    <input type="text" placeholder="PID" style="width: 100%;" id="PID">
                    <span class="add-on" onclick="getPathwayWithPID()" style="background-color: #FA9600; cursor: pointer; width: 100%;">Show</span>
                    <%--<span class="add-on" onclick="getMedicineInteractionReport()" style="background-color: #FA9600">Go</span>--%>
                </div>
    <select id="mySearch" onchange="searchDiagram()" style="width: 100%;">
                    <option value="0">--Search Molecule-</option>
                </select>
    <div class="input-append">
                    <span class="add-on" style="background-color: #FA9600; padding: 2px 5px 0px; cursor: pointer; color: #fff" onclick="searchNextPrev('Prev',this)"><</span>
                    <input type="text" id="totalFind" style="width: 78%; cursor: default" readonly value="Total Result 0/0" />
                    <span class="add-on" style="background-color: #FA9600; padding: 2px 5px 0px; cursor: pointer; color: #fff; font-size: 10px;" onclick="searchNextPrev('Next',this)">></span>
                </div>
    <%-- <select id="ddlphenomenon" onchange="changePhenomenon()" style="width: 100%;">
                    <option value="0">--All Phenomenon--</option>
                </select>--%>
   <div id="divPhenomenon" class="input-append">
                <select id="ddlphenomenon" style="width: 100%;">
                    <option value="" selected>Select Phenomenon</option>
                </select>
             <span class="add-on" onclick="changePhenomenon()" style="background-color: #FA9600; cursor: pointer; width: 100%;">Show</span>

            </div>

     <select id="ddlFood" onchange="changefood()" style="width: 100%;">
                    <option value="0">--All Food--</option>
                </select>

    <select id="ddlParameter" onchange="changeParameter()" style="width: 100%;">
                    <option value="0">--All Parameter--</option>
                </select>

    <%--<div style="display: inline-block; vertical-align: top;">
                    <div id="sample1">
                        <div style="width: 200px; height: 150px" id="myOverviewDiv"></div>
                    </div>
                </div>
    <br />--%>
     <input type="button" class="btn btn-warning" id="anchTotal" style="width: 100%" value="Total: " onclick="showTotal()" />
    <input type="button" class="btn btn-warning" id="anchDiteNotInserted" style="width: 100%" value="Diet not Assign: " onclick="showNotDite()" />
      <%--<input type="button" class="btn btn-warning" id="enzymeCount" data-toggle="modal" data-target="#myEnzymeModal" style="width: 100%" value="Total Assigned Enzyme: " onclick="showAllEnzyme()" />--%>
      <input type="button" class="btn btn-warning" id="enzymeCount" data-toggle="modal" data-target="#myEnzymeModal" style="width: 100%" value="Total Assigned Enzyme: " onclick="showAllEnzyme()" />
 <input type="button" class="btn btn-primary" style="width: 100%" value="Molecule Color Codes" onclick="getMoleculeColorList()" />
    <button type="button" class="btn btn-success" style="width: 100%" onclick="viewWriteUp()">View Writeup</button>
     <%--<button type="button" class="btn btn-success" style="width: 100%" onclick="toggleLayout()">Rotate</button>--%>
    <button type="button" class="btn btn-success" style="width: 100%" onclick="viewFullScreen()">Full Screen</button>
     <input id="widthInput" value="0" style="width: 50px">
                Y : 	
				<input id="heightInput" value="0" style="width: 50px">
                <%-- <a id="pmtesing" > Clcik ME</a>--%>
                <input type="button" class="btn btn-success" style="width: 100%" onclick="createPDF()" value="Create Image" />
                <%--<button type="button" class="btn btn-success pull-right" onclick="print()">print</button>--%>	
      <a download="metabolic.jpg" class="btn btn-success" href="" id="metabolicImg" style="color: #fff; padding: 5px 0 5px 5px;">Download</a>
     <div id="wehe"></div>
     <%--<button id="btnSaveJson" type="button" class="btn btn-success" onclick="SAMP()" style="width: 100%"">Save ME</button>--%>
     <%--<button id="zoomToFit" type="button" class="btn btn-success" style="width: 100%"">Zoom To Fit</button>--%>

</div>

    <div class="container">
        <div class="row-fluid">
            <div class="span12">
                <div class="widget-box">
                    <div class="widget-title">
                           <label class="magnifier">  <input type="checkbox" onclick="showMagnifier()" /> Show Magnifier</label>
                        <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                        <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image loader -->
    <div id='loader' style='display: none;'>
        <img src='img/spinner.gif'>
    </div>

    <div id="content">
        <div class="container-fluid" style="padding: 0;">
            <div class="row-fluid" style="margin-top: 0">
                <div class="span12" id="span10">
                    <div id="sample">
                    </div>
                    <ul id="contextMenu" class="menu">
                        <li id="diet" class="menu-item">Diet <i class="icon-circle-arrow-right pull-right"></i>
                            <ul class="menu">
                                <li id="dietAdvice" class="menu-item" onclick="cxcommand(event)">Diet Advice</li>
                                <li id="dietNotRequired" class="menu-item" onclick="cxcommand(event)">Diet Not Required</li>
                              <%--  <li id="processDietNotRequired" class="menu-item" onclick="cxcommand(event)">Process Diet Not Required</li>--%>
                            </ul>
                        </li>
                        <li id="role" class="menu-item">Role <i class="icon-circle-arrow-right pull-right"></i>
                            <ul class="menu">
                                <li id="harmful" class="menu-item" onclick="cxcommand(event)">Harmful</li>
                                <li id="beneficial" class="menu-item" onclick="cxcommand(event)">Beneficial</li>
                            </ul>
                        </li>
                        <li id="fateFeeder" class="menu-item" onclick="cxcommand(event)">Fate & Feeder</li>
                        <li id="clinicalFeature" class="menu-item" onclick="cxcommand(event)">Clinical Feature</li>
                       <%-- <li id="addEnzyme" class="menu-item" onclick="cxcommand(event)">Add Enzyme</li>--%>
                        <li id="goToPathway" class="menu-item" onclick="cxcommand(event)">Go To Pathway</li>
                        <li id="checkMedicine" class="menu-item" onclick="cxcommand(event)">Check Medicine</li>
                        <%-- <li id="checkStock" class="menu-item" onclick="cxcommand(event)">Check Stock</li>--%>
                        <li id="goToDiet" class="menu-item" onclick="cxcommand(event)">Go To Diet</li>
                        <li id="details" class="menu-item">Details <i class="icon-circle-arrow-right pull-right"></i>
                            <ul class="menu">
                                <li id="markerDetails" class="menu-item" onclick="cxcommand(event)">Marker Details</li>
                                <li id="rdaDetails" class="menu-item" onclick="cxcommand(event)">RDA Details</li>
                                <li id="stockDetails" class="menu-item" onclick="cxcommand(event)">Stock Details</li>
                                <li id="machineDetails" class="menu-item" onclick="cxcommand(event)">Machine Details</li>
                            </ul>
                        </li>
                        <li id="markerType" class="menu-item">Marker Type <i class="icon-circle-arrow-right pull-right"></i>
                            <ul class="menu">
                                <li id="createCentral" class="menu-item" onclick="cxcommand(event)">Center Molecule</li>
                                <li id="createSubCentral" class="menu-item" onclick="cxcommand(event)">Sub Center Molecule</li>
                                <li id="createSpecific" class="menu-item" onclick="cxcommand(event)">Specific Molecule</li>
                                <li id="createRegulatory" class="menu-item" onclick="cxcommand(event)">Regulatory Molecule</li>
                                <li id="createReported" class="menu-item" onclick="cxcommand(event)">Reported Molecule</li>
                                <li id="availableInEra" class="menu-item" onclick="cxcommand(event)">Available In Era</li>
                            </ul>
                        </li>
                        <li id="coFactors" class="menu-item" onclick="cxcommand(event)">Get Co-Factors</li>
                        <li id="endProduct" class="menu-item" onclick="cxcommand(event)">Get End Product</li>
                        <%--<li id="breakLoop" class="menu-item" onclick="cxcommand(event)">Break Loop</li>--%>
                    </ul>
                </div>
            </div>

            <div class="row-fluid">
                <div id="myImages" style="display: none">
                </div>
            </div>

            <div class="widget-content">
                <div class="row-fluid">
                    <table class="table table-bordered table-striped" style="width: 100%">
                        <tr>
                            <th>Total</th>
                            <th>Total Unique</th>
                            <th>Total centeral</th>
                            <th>Total process</th>
                            <th>Total centeral diet not assign</th>
                            <th>Total diet not required</th>
                            <th>Total diet not assign</th>
                            <%-- <th>Total Regulatory</th>
                            <th>Total Reported</th>
                            <th>Total Available In Era</th>--%>
                        </tr>
                        <tr>
                            <td style="text-align: center!important;" id="Total"></td>
                            <td style="text-align: center!important;" id="TotalUnique"></td>
                            <td style="text-align: center!important;" id="Totalcenteral"></td>
                            <td style="text-align: center!important;" id="Totalprocess"></td>
                            <td style="text-align: center!important;" id="Totalcenteraldietnotassign"></td>
                            <td style="text-align: center!important;" id="Totaldietnotrequired"></td>
                            <td style="text-align: center!important;" id="Totaldietnotassign"></td>
                            <%--  <td style="text-align: center!important;" id="TotalRegulatory"></td>
                            <td style="text-align: center!important;" id="TotalReported"></td>
                            <td style="text-align: center!important;" id="TotalAvailableInEra"></td>--%>
                        </tr>
                    </table>
                </div>

                <div class="row-fluid">
                    <div id="showData" style="width: 100%; overflow: auto">
                    </div>
                </div>
            </div>
        </div>

    </div>


    <div class="row-fluid">
        <!-- Modal -->
        <div class="modal fade" id="myModal" style="width: 90%; left: 6%; display: none;" role="dialog">
            <div class="modal-dialog" style="width: 100rem;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                        <table class="table" border="1" rules="all">
                            <thead>
                                <tr>
                                    <th>To Eat</th>
                                    <th>Not to Eat</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="vertical-align: top; width: 50%">
                                        <ul id="td_ToEat"></ul>
                                    </td>
                                    <td style="vertical-align: top">
                                        <ul id="td_NotToEat"></ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="myModal1" style="width: 90%; left: 6%; display: none;" role="dialog">
            <div class="modal-dialog" style="width: 100rem;">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                        <div id="notfillDite"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalCoFactor" style="width: 90%; left: 6%; display: none;" role="dialog">
            <div class="modal-dialog" style="width: 100rem;">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                        <div id="divCoFactor"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="myEnzymeModal" style="width: 90%; left: 6%; display: none;" role="dialog">
            <div class="modal-dialog" style="width: 100rem;">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Assigned Enzymes List</h4>
                    </div>
                    <div class="modal-body">
                        <table id="dataTableExample1" class="table table-bordered table-striped table-hover">
                            <thead>
                                <tr class="info">
                                    <th>Pathway Name</th>
                                    <th>Molecules Name</th>

                                </tr>
                            </thead>
                            <tbody id="pathway">
                            </tbody>
                        </table>
                        <div id="notfillEnzyme"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="myChkMedcineModal" style="width: 90%; left: 6%; display: none;" role="dialog">
            <div class="modal-dialog" style="width: 100rem;">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                        <div id="notfillMedicine"></div>
                        <div id="medicineDetail"></div>

                        <div id="divOverview">
                            <h4 id="headOverview"></h4>
                            <p id="bodyOverview">
                            </p>
                        </div>

                        <%--    <div id="divWhenToUse">
                            <h4 id="headWhenToUse"></h4>
                            <ul id="ulWhenToUse">                               
                            </ul>
                            <p id="referenceWhenToUse">
                            </p>
                        </div>

                        <div id="divWhenToUse">
                            <h4 id="headWhenToUse"></h4>
                            <table class="table" border="1" rules="all">
                                <thead>
                                    <tr>
                                        <th>To Eat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>--%>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="signModel" style="width: 90%; left: 6%; display: none;" role="dialog">
            <div class="modal-dialog" style="width: 100rem;">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                        <table class="table table-bordered" id="tblSign">
                            <thead>
                                <tr>
                                    <td class="td_from">From</td>
                                    <td class="td_relation">Relation</td>
                                    <td class="td_to">to</td>
                                    <td class="td_sign">Symbol</td>
                                    <td class="td_save"></td>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade modelWidth" id="modalRelation" style="width: 90%; left: 6%; display: none;" role="dialog">
            <div class="modal-dialog" style="width: 100rem;">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Fate & Feeder</h4>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" onclick="viewFullScreenSub()">Full view</button>
                        <button type="button" class="btn btn-default" onclick="print2()">Print</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modelWidth modal fade" id="modalWriteUp" style="width: 90%; left: 6%; display: none;" role="dialog">
            <div class="modal-dialog" style="width: 100rem;">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Write Up</h4>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalFAQ" style="width: 90%; left: 6%; display: none;" role="dialog">
            <div class="modal-dialog" style="width: 100rem;">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                        <div id="divFAQ"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalWhatToDo" style="width: 90%; left: 6%; display: none;" role="dialog">
            <div class="modal-dialog" style="width: 100rem;">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                        <table class="table" border="1" rules="all">
                            <thead>
                                <tr>
                                    <th>To Do</th>
                                    <th>Not To Do</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="vertical-align: top; text-align: left!important; width: 50%">
                                        <ol id="td_ToDo"></ol>
                                    </td>
                                    <td style="vertical-align: top; text-align: left!important;">
                                        <ol id="td_NotToDo"></ol>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalToxicityDeficiency" style="width: 90%; left: 6%; display: none;" role="dialog">
            <div class="modal-dialog" style="width: 100rem;">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                        <table class="table" border="1" rules="all">
                            <thead>
                                <tr>
                                    <th>Toxicit</th>
                                    <th>Deficiency</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="vertical-align: top; text-align: left!important; width: 50%">
                                        <ol id="td_Toxicit"></ol>
                                    </td>
                                    <td style="vertical-align: top; text-align: left!important;">
                                        <ol id="td_Deficiency"></ol>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalResearchBasedQuestion" style="width: 90%; left: 6%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 100rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <div class="row-fluid">
                        <div class="span10">
                            <input type="text" placeholder="Question" id="txtResearchBasedQuestion" style="width: 100%;">
                        </div>
                        <div class="span1">
                            <input type="button" value="Save" onclick="saveResearchBasedQuestion();" class="btn btn-success" />
                        </div>
                        <div class="span1">
                            <input type="button" value="Reset" onclick="clearResearchBasedQuestion();" class="btn btn-warning" />
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="widget-content nopadding">
                                <table class="table table-bordered table-striped" id="tblResearchBasedQuestion">
                                    <thead>
                                        <tr>
                                            <td class="td_Sno">S No.</td>
                                            <td class="td_Question">Research Based Question</td>
                                            <td class="td_Action">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
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
    <div class="modal fade" id="modalMedicineInteractionReport" style="width: 90%; left: 6%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 100rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <div id="showData1" style="width: 100%; overflow: auto">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalColorCombination" style="width: 90%; left: 6%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 78%;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered" id="tblColorCombination">
                        <thead>
                            <tr>
                                <td class="td_CenterMolecule" style="text-align: center!important;">Center Molecule</td>
                                <td class="td_RegulatoryMolecule" style="text-align: center!important;">Regulatory Molecule</td>
                                <td class="td_ReportedMolecule" style="text-align: center!important;">Reported Molecule</td>
                                <td class="td_MoleculeAvailableInEra" style="text-align: center!important;">Available In Era</td>
                                <td class="td_SubCenterMolecule" style="text-align: center!important;">Sub Center Molecule</td>
                                <td class="td_SpecificMolecule" style="text-align: center!important;">Specific Molecule</td>
                                <td class="td_Color" style="text-align: center!important;">Color</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalItemStock" style="width: 90%; left: 6%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 100rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered table-striped" id="tblItemStock">
                        <thead>
                            <tr>
                                <td class="td_Item">Item Name</td>
                                <td class="td_Category">Category</td>
                                <td class="td_Quantity">Quantity</td>
                                <td class="td_StoreName">Store Name</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalTestMachineDetail" style="width: 90%; left: 6%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 100rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered table-striped" id="tblTestMachineDetail">
                        <thead>
                            <tr>
                                <td class="td_machineName">Machine Name</td>
                                <td class="td_machineLocation">Machine Location</td>
                                <td class="td_intercomNumber">Intercom Number</td>
                                <td class="td_contactPerson">Contact Person</td>
                                <td class="td_resultTime">Test Result Time</td>
                                <td class="td_itemCharge">Test Cost</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <hr />
                    <div class="row">
                        <div class="col-md-12">
                            <ul id="instruction"></ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalRDADetail" style="width: 90%; left: 6%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 110rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered table-striped" id="tblRDADetail">
                        <thead>
                            <tr>
                                <td class="td_rda">RDA</td>
                                <td class="td_peakValue">Peak Value</td>
                                <td class="td_tHalfValue">THalf Value</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade modelWidth" id="modalEndResult" style="width: 90%; left: 6%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 100rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">End Results</h4>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" onclick="viewFullScreenSub()">Full view</button>
                    <button type="button" class="btn btn-default" onclick="print2()">Print</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalMarkerDetail" style="width: 100%; left: 1%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 125rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body" style="max-height: 600px!important;">
                    <table class="table table-bordered" id="tblMarkerDetail">
                        <thead>
                            <tr>
                                <td class="td_SerialNo">S No.</td>
                                <td class="td_Phenomenon">Phenomenon</td>
                                <td class="td_Parameter">Parameter</td>
                                <td class="td_StudyLevel">StudyLevel</td>
                                <td class="td_Location">Location</td>
                                <td class="td_Meaning">Meaning</td>
                                <td class="td_CentralCompound">CentralCompound</td>
                                <td class="td_AssociatedProblem">Associated Problem</td>
                                <td class="td_ErasHypotdesis">Era's Hypotdesis</td>
                                <td class="td_StudyTreatment">Study Treatment</td>
                                <td class="td_OtderPatdwayDetails">Otder Patdway Details</td>
                                <td class="td_StudyReferenceDetails">Study Reference Details</td>
                                <td class="td_BloodBrainBarrierDetails">Blood Brain Barrier Details</td>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalTotalMolecule" style="width: 90%; left: 6%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 100rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered" id="tblTotalMolecule">
                        <thead>
                            <tr>
                                <td class="td_SNo">S No.</td>
                                <td class="td_Molecule">Molecule</td>
                                <td class="td_Count" style="text-align: center!important;">Total Count</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

     <!-- Modal Description popup-->
     
     <!-- Modal Description popup SHOW-->
     <div class="modal bd-example-modal-lg   " id="modalDescription" role="dialog" >
        <div class="modal-dialog modal-xl ">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" id="btnClosed" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Page Description</h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black;">
                   
                        <table class="table table-hover fixed_header" id="tblVechileDetails">
                <thead style="font-size:22px">
                    <tr>
                         <th class="td_SrNo ft-big" >Sr. No.</th> 
                        <th class="td_ID ft-big" style="display:none">ID</th> 
                        <th class="td_heading ft-big">Heading</th>
                        <th class="td_color ft-big">Color</th>
                        <th class="td_image ft-big">Image</th>
                        <th class="td_description ft-big">Description</th>
                       <th class="td_ActionEdit ft-big ">Action</th>       
                     
                        
                    </tr>
                    
                </thead>
                <tbody>
                    
                </tbody>
            </table>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnClose" class="btn btn-default">Close</button>
                </div>
            </div>
        </div>
         
    </div>

     <!-- Button trigger modal Input SAVE -->
    <div class="modal" id="addInfoModel" role="dialog">
        <div class="modal-dialog"; style="width: max-content;">
            <!-- Modal content-->
            <div class="modal-content" style="width: max-content;">
                <div class="modal-header">
                    <button type="button" class="close" id="btnCross" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add Description</h4>
                </div>
                <div class="modal-body" id="modelBody">
                    <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <div class="form-group col-md-3">
                            <label>Add Heading </label>
                            <input type="text" id="txtHeading" class="form-control" />
                        </div>

                        <div class="form-group col-md-3">
                            <label>Add Color </label>
                            <input type="color" id="txtColor" class="form-control" />
                        </div>
                          <div class="form-group col-md-3">
                            <label>Upload Image </label>
                            <input type="file" id="txtImage" alt="Not Image" class="form-control" />
                              <input type="text" id="txtOldImage" name="name" value=""  style="display:none"/>
                          </div>
                      <div class="form-group col-md-3">
                            <label>Description </label>
                           <textarea id="txtDescription" rows="6" cols="32"></textarea>
                        </div>
                        <div class="form-group col-md-3">
                            
                           <input type="text" id="txtId" rows="6" cols="32"  style="display:none"/>
                        </div>
                        <div class="form-group">
                          <%-- <button type="button" class="btn btn-dark" id="btnAddNew" style="font-size: 15px;margin-left: 90%;">Add New <i class="fa fa-plus"></i></button>--%>
                      </div>
                        </div>
                        </div>
                  </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnUpdate" data-dismiss="modal">Update</button>
                <button type="button" class="btn btn-primary" id="btnSave" data-dismiss="modal">Save</button>
                <button type="button" class="btn btn-success" id="btnCancel" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
    </div>













 <script src="customjs/forDemo.js"></script>
 <script src="customjs/dragZoomTool.js"></script>

    <script src="customjs/RescalingTool.js"></script>
    

</asp:Content>

