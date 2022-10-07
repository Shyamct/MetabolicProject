<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
      <link rel="stylesheet" href="customCSS/cascadeNutrientReport.css" />
    
        <script src="../../script/global.js"></script>
    <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="js/bootstrap-multiselect.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="loader" style="display: none" id="divLoader"></div>
    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-info-sign"></i></span>
                            <div style="float: left;">
                                <select id="ddlDisease">
                                    <option value="0">-- Select Disease --</option>
                                </select>
                            </div>
                            <div style="float: left; width: 230px; margin-left: 1%;" id="rankDiv">
                                <select id="ddlRank">
                                    <option value="" selected>Select Process</option>
                                </select>
                            </div>
                            <div style="float: left; margin-left: 1%;">
                                <select id="ddlSearchType" onchange="getSearchFilters()">
                                    <option value="1">Cascade</option>
                                    <option value="2">Interacted Nutrient</option>
                                </select>
                            </div>
                            <div style="float: left; margin-left: 1%;" id="roleTypeDiv">
                                <select id="ddlRoleType">
                                    <option value="A">All</option>
                                    <option value="B">Beneficial</option>
                                    <option value="H">Harmful</option>
                                </select>
                            </div>
                            <div style="float: left; margin-left: 1%;" id="interactionPresenceDiv">
                                <select id="ddlInteractionPresence">
                                    <option value="2">All</option>
                                    <option value="1">With Interaction</option>
                                    <option value="0">Without Interaction</option>
                                </select>
                            </div>
                            <div style="float: left; margin-left: 1%; display: none;" id="interactionTypeDiv">
                                <select id="ddlInteractionType">
                                    <option value="A">All</option>
                                    <option value="N">Nutrient</option>
                                    <option value="F">Food</option>
                                </select>
                            </div>
                            <div style="float: left; margin-left: 1%;">
                                <select id="ddlInteractedNutrientType">
                                    <option value="-1">All</option>
                                    <option value="9">Activator</option>
                                    <option value="10">Inhibitor</option>
                                    <option value="910">Both</option>
                                    <option value="0">Interaction</option>
                                </select>
                            </div>
                            <div style="float: left; margin-left: 1%;">
                                <input type="button" class="btn btn-success" value="Show" onclick="getCascadeReport()" />
                            </div>
                                <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                            <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>
                            <%--  <div class="pull-right">
                                <input type="button" class="btn btn-success" value="Export" onclick="exportTable()" />
                            </div>--%>
                        </div>
                        <div class="widget-content">
                            <div class="report">
                                <div class="row-fluid" id="showCascadeNutrient" style="display: none; margin-top: 0px;">
                                    <div class="span8 report" style="overflow-y: auto;">
                                        <table class="table table-bordered table-striped" id="tblCascade">
                                            <thead>
                                                <tr>
                                                    <td class="td_sNo" style="width: 10%">#</td>
                                                    <td class="td_cascadeNutrient">Cascade Nutrient</td>
                                                    <td class="td_effectType" style="width: 20%">Type</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="span4">
                                        <table class="table table-bordered table-striped" id="tblCascadeCount">
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>Count</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Total Cascade</td>
                                                    <td id="total"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Beneficial</td>
                                                    <td id="totalBeneficial"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Harmful</td>
                                                    <td id="totalHarmful"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Cascade With Interaction</td>
                                                    <td id="totalWithInteraction"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Cascade Without Interaction</td>
                                                    <td id="totalWithoutInteraction"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Cascade With Activators Only</td>
                                                    <td id="totalInteractionWithActivator"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Cascade With Inhibitors Only</td>
                                                    <td id="totalInteractionWithInhibitor"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Cascade With Inhibitors And Activators Both</td>
                                                    <td id="totalInteractionWithInhibitorAndActivator"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="row-fluid" id="showInteractedNutrient" style="display: none; margin-top: 0px;">
                                    <div class="span9 report" style="overflow: auto;">
                                        <table class="table table-bordered" id="tblInteractedNutrient">
                                            <thead>
                                                <tr>
                                                    <td class="td_sNo" style="width: 10%">#</td>
                                                    <td class="td_cascadeNutrient">Cascade Nutrient</td>
                                                    <td class="td_interactedElement">Interacted Element</td>
                                                    <td class="td_interactionWith">Interaction With</td>
                                                    <td class="td_nutrientType">Interaction Type</td>
                                                    <td class="td_reference">Reference</td>
                                                    <td class="td_url">URL</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="span3">
                                        <table class="table table-bordered table-striped" id="tblInteractedNutrientCount">
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>Count</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Total Interacted Element</td>
                                                    <td id="totalInteractedElement"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Activator</td>
                                                    <td id="totalActivator"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Inhibitor</td>
                                                    <td id="totalInhibitor"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Interaction</td>
                                                    <td id="totalInteractionWithoutEffect"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Interacted Nutrient</td>
                                                    <td id="totalNutrient"></td>
                                                </tr>
                                                <tr>
                                                    <td>Total Interacted Food</td>
                                                    <td id="totalFood"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <!-- Modal Description popup-->
<div class="modal bd-example-modal-lg" id="modalDescription" role="dialog" >
        <div class="modal-dialog modal-xl ">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close close" id="btnClosed" data-dismiss="modal">&times;</button>
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
 

    <%-- <!-- Button trigger modal Input -->
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
                            <label>Upload Image </label>
                            <input type="file" id="txtImage" class="form-control" />
                        </div>
                        <div class="form-group col-md-3">
                            <label>Add Color </label>
                            <input type="color" id="txtColor" class="form-control" />
                        </div>
                      <div class="form-group col-md-3">
                            <label>Description </label>
                           <textarea id="txtDescription" rows="6" cols="32"></textarea>
                        </div>
                        <div class="form-group">
                          <%-- <button type="button" class="btn btn-dark" id="btnAddNew" style="font-size: 15px;margin-left: 90%;">Add New <i class="fa fa-plus"></i></button>--%>
                     <%-- </div>
                        </div>
                        </div>
                  </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnSave" data-dismiss="modal">Save</button>
                <button type="button" class="btn btn-success" id="btnCancel" data-dismiss="modal">Cancel</button>--%>
<%--            <<%--/div>
        </div>
    </div>
    </div>--%>--%>
     <%--<div class="modal bd-example-modal-xl" id="showNote" role="dialog" >
        <div class="modal-dialog modal-xl">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" id="btnNotecross" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Page Note</h4>
                </div>
                <div class="modal-body popup-Note" style="color: black">
                            <table class="table table-hover fixed_header" id="tblShowNote">
                <thead>
                    <tr>
                        
                        <th class="td_Note">Note</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnNoteCancel" class="btn btn-default">Close</button>
                </div>
            </div>
        </div>
    </div>--%>
    <%--<div id="mySidenav" class="sidenav">
     <a href="#" id="btnNote" onclick="addNote();">Add Note </a>
     <a href="#" id="btnNoteShow">Show Note</a>
   </div>--%>--%>
    <script src="js/table2excel.js"></script>
   
    <script src="customjs/DiseaseNutrientCascadeReport.js"></script>
     <script src="customjs/pageDescription.js"></script>
            
</asp:Content>
