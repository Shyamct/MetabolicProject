<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../../script/global.js"></script>
    <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="js/bootstrap-multiselect.js"></script>
    <script src="../../assets/js/jquery-ui.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

      <link rel="stylesheet" href="customCSS/margedProportion.css" />
    <script src="../../js/cache.js"></script>
    <script src="go.js"></script>
    <script src="https://gojs.net/latest/extensions/DoubleTreeLayout.js"></script>


    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box" style="margin-top: 0;">
                        <div class="widget-title">
                           
                            <div class="span2">
                                <select id="ddlpathway"></select>
                            </div>
                            <div class="span1">
                                <input type="button" class="btn btn-default" value="Go" onclick="getpathwayId()" />
                            </div>
                            <div class="span2">
                                <select id="mySearch" onchange="searchDiagram()" style="width: 100%;">
                                    <option value="0">--Search Molecule-</option>
                                </select>
                            </div>
                            <div class="span3">
                                <div class="span6">
                                    <div class="input-append">
                                        <span class="add-on" style="background-color: #FA9600; padding: 2px 5px 0px; cursor: pointer; color: #fff" onclick="searchNextPrev('Prev',this)"><</span>
                                        <input type="text" id="totalFind" style="width: 60%; cursor: default" readonly value="Total Result 0/0" />
                                        <span class="add-on" style="background-color: #FA9600; padding: 2px 5px 0px; cursor: pointer; color: #fff" onclick="searchNextPrev('Next',this)">></span>
                                    </div>
                                </div>
                                <div class="span6">
                                    <label>
                                        <input type="checkbox" onclick="showMagnifier()" />
                                        Show Magnifier
                                    </label>

                                </div>

                            </div>
                            <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                              <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>

                        </div>
                        <div id="progressbar" class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated progress-label"></div>
                        </div>

                    </div>
                </div>
                <div class="widget-content" style="padding: 2px;">
                    <div class="row-fluid" id="divGraph">
                        <div class="span12">
                            <div id="sample">
                            </div>
                        </div>
                    </div>
                    <%--<h1>lksahdoiwhefoiergk</h1>--%>
                    <div class="row-fluid" id="divTotalCount" style="display: none;">
                        <%--<div class="row-fluid">--%>
                        <table class="table table-bordered table-striped" style="width: 100%">
                            <tr>
                                <th>Total</th>
                                <th>Total Unique</th>
                                <th>Total centeral</th>
                                <th>Total process</th>
                                <th>Total centeral diet not assign</th>
                                <th>Total diet not required</th>
                                <th>Total diet not assign</th>
                            </tr>
                            <tr>
                                <td style="text-align: center!important;" id="Total"></td>
                                <td style="text-align: center!important;" id="TotalUnique"></td>
                                <td style="text-align: center!important;" id="Totalcenteral"></td>
                                <td style="text-align: center!important;" id="Totalprocess"></td>
                                <td style="text-align: center!important;" id="Totalcenteraldietnotassign"></td>
                                <td style="text-align: center!important;" id="Totaldietnotrequired"></td>
                                <td style="text-align: center!important;" id="Totaldietnotassign"></td>
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
    </div>
    <!-- Image loader -->
    <div id='loader' style='display: none;'>
        <img src='img/spinner.gif'>
    </div>

    <div class="modal fade" id="modalPathwayName" role="dialog">
        <div class="modal-dialog" style="width: 43rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body" style="background-color: #a9cc9a;">
                    <div id="divPathway">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

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
 



         <div id="content5">
        <div class="container-fluid" style="padding: 0;">
            <div class="row-fluid" style="margin-top: 0">
             
                   
                    <ul id="contextmenu" class="menu">
                        <li class="menu-item" id="report">Report <i class="icon-circle-arrow-right pull-right"></i>
                            <ul class="menu">
                                 <li id="dietAdvice" class="menu-item" onclick="cxcommand(event)">Diet Advice</li>
                                    <li id="goToPathway" class="menu-item" onclick="cxcommand(event)">Go To Pathway</li>
                                <li id="goToDiet" class="menu-item" onclick="cxcommand(event)">Go To Diet</li>
                                  <li id="markerDetails" class="menu-item" onclick="cxcommand(event)">Marker Details</li>
                                <li id="rdaDetails" class="menu-item" onclick="cxcommand(event)">RDA Details</li>
                                <li id="stockDetails" class="menu-item" onclick="cxcommand(event)">Stock Details</li>
                                <li id="machineDetails" class="menu-item" onclick="cxcommand(event)">Machine Details</li>
                                 <li id="coFactors" class="menu-item" onclick="cxcommand(event)">Get Co-Factors</li>
                                  <li id="endProduct" class="menu-item" onclick="cxcommand(event)">Get End Product</li>
                                 <li id="checkMedicine" class="menu-item" onclick="cxcommand(event)">Check Medicine</li>
                                <li id="fateFeeder" class="menu-item" onclick="cxcommand(event)">Fate & Feeder</li>
                        <%-- <li id="checkStock" class="menu-item" onclick="cxcommand(event)">Check Stock</li>--%>
                                 <li id="clinicalFeature" class="menu-item" onclick="cxcommand(event)">Clinical Feature</li>
                       <%-- <li id="addEnzyme" class="menu-item" onclick="cxcommand(event)">Add Enzyme</li>--%>
                                  </ul>
                        </li>

                         <li class="menu-item" id="save">Save <i class="icon-circle-arrow-right pull-right"></i>
                            <ul class="menu">
                                  <li id="dietNotRequired" class="menu-item" onclick="cxcommand(event)">Diet Not Required</li>
                                <li id="createCentral" class="menu-item" onclick="cxcommand(event)">Center Molecule</li>
                                <li id="createSubCentral" class="menu-item" onclick="cxcommand(event)">Sub Center Molecule</li>
                                <li id="createSpecific" class="menu-item" onclick="cxcommand(event)">Specific Molecule</li>
                                <li id="createRegulatory" class="menu-item" onclick="cxcommand(event)">Regulatory Molecule</li>
                                <li id="createReported" class="menu-item" onclick="cxcommand(event)">Reported Molecule</li>
                                <li id="availableInEra" class="menu-item" onclick="cxcommand(event)">Available In Era</li>
                                 </ul>
                                  <%--  <li id="processDietNotRequired" class="menu-item" onclick="cxcommand(event)">Process Diet Not Required</li>--%>
                          </li>
                    </ul>
                </div>
            
        </div>
    </div>
     

     <div id="content2">
        <div class="container-fluid" style="padding: 0;">
            <div class="row-fluid" style="margin-top: 0">
               
                    
                    <ul id="pahhwayBody" class="menu">
                        <%--<li id="coFactorss" class="menu-item" onclick="cxcommands(event)">Pathway Name</li>--%>
                    </ul>
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


    <script src="customjs/mergedProportion.js"></script>
    <script src="customjs/pageDescription.js"></script>
</asp:Content>

