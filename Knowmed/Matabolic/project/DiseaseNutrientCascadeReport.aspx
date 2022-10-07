<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    
        <script src="../../script/global.js"></script>
    <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="js/bootstrap-multiselect.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
      <link rel="stylesheet" href="customCSS/diseaseNutrientCascadeReport.css" />
    
    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-info-sign"></i></span>
                            <div style="float: left;">
                               <%-- <h5>Select Disease</h5>--%>
                                <select id="ddlProblem" onchange="getNutrientList();">
                                </select>
                            </div>
                             <div style="float: left; margin-left: 2%">
                                <h5>Select Process</h5>
                                <select id="ddlProcess">
                                    <option value="0">-- Select Process --</option>
                                </select>
                            </div>
                             <div style="float: left; margin-left: 2%">
                                <h5>Select Phenomenon</h5>
                                <select id="ddlPhenomenon" style="max-width:300px;">
                                    <option value="0">-- Select Phenomenon --</option>
                                </select>
                            </div>
                            <div style="float: left; margin-left: 2%">
                                <h5>Select Nutrient</h5>
                                <select id="ddlNutrient" onchange="getNutrientFunctionReport();" style="max-width:300px;">
                                    <option value="0">-- Select Nutrient --</option>
                                </select>
                            </div>
                               <div>
                                <input type="button" class="btn btn-success" value="Go" style="margin-left:2rem;" onclick="getNutrientFunctionReport()" />
                            </div>
                                
                            <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                            <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>
                        </div>
                        <div class="widget-content">
                            <div id="showData1" style="overflow: auto;">
                                <div class="row-fluid" id="showData" style="display: none; margin-top: 2rem; overflow: auto">
                                    <div class="span12">
                                        <span id="nutrientName" style="float: left;"></span>
                                        <div style="float: left;">
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <td id="td_total"></td>
                                                        <td id="td_benefical" style="background-color: #98FB98"></td>
                                                        <td id="td_harmful" style="background-color: #F08080"></td>
                                                        <td id="td_toEat" style="background-color: #98FB98"></td>
                                                        <td id="td_notToEat" style="background-color: #F08080"></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div id="myTable" class="span12" style="margin-left: 0;">
                                        <table class="table table-bordered" id="tblNutrientFunction">
                                            <thead>
                                                <tr>
                                                    <td class="td_sNum"><b>S No.</b></td>
                                                    <td class="td_disease"><b>Disease</b></td>
                                                    <td class="td_pathway"><b>Pathway</b></td>
                                                    <td class="td_role"><b>Role</b></td>
                                                    <td class="td_function"><b>Function</b></td>
                                                </tr>
                                            </thead>
                                            <tbody>
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
 


    <%--   <script src="js/table2excel.js"></script>--%>
    <script src="customjs/DiseaseNutrientCascadeReport.js"></script>
         <script src="customjs/pageDescription.js"></script>
</asp:Content>

