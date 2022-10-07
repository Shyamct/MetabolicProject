<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../../script/global.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>
        
    <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="js/bootstrap-multiselect.js"></script>
    <script src="../../js/table2excel.js"></script>
   <%--<script src="js/table2excel.js"></script>--%>
    <script src="../../assets/js/highcharts.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
  <link id="table_style" href="customCSS/markerDietActivator.css" rel="stylesheet" />

    <style>
    .pointer {cursor: pointer;}
        th {
            position: sticky;
            top: 0;
            z-index: 5;
        }
        
/*        tr:last-child {
  height:100%;
  background-color:brown;
 position:sticky;
}*/
        .td_ChangeQuantity {
            width: 50% !important;
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

        .description {
            text-align: left;
        }

        .plusSymbol:after {
            position: absolute;
            content: '\2719';
            font-size: 20px;
            text-align: right;
            right: 35px;
            top: 3px;
        }

        img {
            width: 28px;
            height: 28px;
        }

        .h5, h5 {
            font-size: 14px;
            line-break: anywhere;
        }

        .modal-body.popup-decreption {
            position: relative;
            height: 60vh !important;
            max-height: 650px;
            padding: 15px;
            overflow-y: auto; 
            overflow: auto;
        }

       
        

       

        .modal-xl {
            width: 1190px;
            margin: 83px auto;
        }
        /* #loader {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 11;
            width: 32px;
            height: 32px;
        }*/
        .loader {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background: url('img/pageLoader.gif') 50% 50% no-repeat rgb(249,249,249);
            opacity: .6;
        }

        #btnExel {
            margin-left: -92px;
            display: none;
        }
          #tblMarkerDetail thead td {
            text-align: center !important;
        }
          .ft-big{
    font-size:16px !important;
}

        #sudo {
            margin-left: 10px;
        }
    </style>
    <style>
      
    </style>

    <div class="loader" style="display: none" id="divLoader">
    </div>
    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-info-sign"></i></span>
                            <h5>Marker Diet Activator Report</h5>
                            <div class="span2">
                                <select id="ddlPathway">
                                    <option value="" selected>Select Pathway</option>
                                </select>
                            </div>
                            <div class="span2">
                                <select id="ddlProcess">
                                    <option value="" selected>Select Process</option>
                                </select>
                            </div>
                            <div class="span2">
                                <select id="ddlPhenomenon">
                                    <option value="" selected>Select Phenomenon</option>
                                </select>
                            </div>
                            <div class="span1">
                                <input id="txtPid" placeholder="PID" style="margin-top: 5px;">
                            </div>
                            <div class="span1">
                                <input type="date" id="txtFromDate" style="background-color: white; cursor: default; margin-top: 5px;" />
                            </div>
                            <div class="span1">
                                <input type="button" class="btn btn-success pull-left" value="Show" onclick="getMarkerDietReport()" />
                            </div>
                             <div class="span1">

                         <input type="button" class="btn btn-info pull-left" id="btnExel" value="ExportToExcel">
                         <input type="button" class="btn btn-warning pull-left" id="sudo" value="Print !" onclick="print_current_page()" />

                            </div>
                            
                     
           
        
                            <%--  <div class="span1" style="width: 8%;">
                                <input type="button" class="btn btn-danger pull-right" value="Show Achievement" onclick="getNutrientAchievement('')" />
                            </div>--%>
                        </div>
                      
                        <div class="widget-content">
                            <div id="showData" style="width: 100%; overflow: auto">
                            </div>
                        </div>
                        <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                              <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>
                    </div>
                </div>
            </div>
            </div>
              
        
    </div>

 
    <%--  <div class="col-md-11">
        <h4 style="color: white;">Marker Diet Activator Report</h4>
    </div>
    <div class="col-md-1">
        <span class="icon pull-right"><i class="icon-info-sign" onclick="getPageInfo();" title="Get Page Information" style="color:white;"></i></span>--%>
    <%--<input type="button" value="info" onclick="getPageInfo();" />--%>
    <%--  </div>
    <hr />
    <div class="col-md-2">
        <select id="ddlProblem" onchange="getPhenomenonList();">--%>
    <%-- <option value="" selected>Select Pathway</option>--%>
    <%--  </select>
    </div>
    <div class="col-md-2" id="divProcess">
    </div>
    <div class="col-md-2" id="divPhenomenon">
    </div>   
    <div class="col-md-1">
        <input id="txtPid" placeholder="PID" style="float: right; margin-top: 5px; width: 100%;">
    </div>
    <div class="col-md-2">
        <input type="date" id="txtFromDate" style="background-color: white; cursor: default; margin-top: 5px; width: 19rem;" />       
        <input type="button" class="btn btn-success pull-right" value="Go" onclick="getMarkerDietReport()" />       
    </div>
    <div class="col-md-1">
        <input type="button" id="print" class="btn btn-warning pull-right" value="Print" />
    </div>--%>
    <%-- <div class="col-md-1">
        <span class="icon-share" style="color: white;">
            <input type="button" class="btn btn-link" onclick="tableToExcel('markerTable', 'W3C Example Table')" style="color: white;" value="Export to Excel" />
        </span>
   </div>--%>
    <%-- <div class="col-md-2 pull-right">
        
        <input type="button" class="btn btn-danger pull-right" value="Show Achievement" onclick="getNutrientAchievement('')" />
    </div>

    <div id="showData1" style="width: 100%; overflow: auto;">
        <div class="canvas_div_pdf" id="showData" style="width: 100%;">
        </div>
    </div>--%>

    <%--<div id="content" style="margin-left: 0px;">--%>


    <%--     <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid" style="margin-top: 0px;">
                        
                        <hr />
                    </div>
                    <div class="row-fluid" style="width: 100%;">
                        
                    </div>
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-info-sign"></i></span>
                            <h5>Marker Diet Report</h5>
                            <div class="span3 pull-right">
                                <input type="button" id="print" class="btn btn-danger pull-right" value="Print" />
                            </div>
                        </div>
                        <div class="widget-content">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>--%>

    <!-- Modal -->
    <div class="modal fade" id="modalMarkerDiet" style="width: 100%; left: 1%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 100rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body" style="max-height: 600px!important; overflow-y: auto;">
                    <table class="table table-bordered" id="tblMarkerDiet">
                        <thead>
                            <tr>
                                <td class="td_SNo">S No.</td>
                                <td class="td_Food">Food List</td>
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

    <div class="modal fade" id="modalPageDescription" style="width: 100%; left: 1%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 100rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Marker Diet Activator Report</h4>
                </div>
                <div class="modal-body" style="max-height: 600px!important; overflow-y: auto;">
                    <div class="col-md-12" id="divPageDescription">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalNav" style="width: 90%; left: 5%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 100%;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <div class="col-md-12 bhoechie-tab-container">
                        <div class="col-md-1 bhoechie-tab-menu">
                            <div class="list-group">
                                <a href="#" data-action="achievement" class="list-group-item active text-center">
                                    <h5>Achievement-RDA</h5>
                                </a>
                                <a href="#" data-action="rda" class="list-group-item text-center">
                                    <h5>Timeline Graph</h5>
                                </a>
                                <a href="#" data-action="end" class="list-group-item text-center">
                                    <h5>End Result</h5>
                                </a>
                                <a href="#" data-action="fullRda" class="list-group-item text-center">
                                    <h5>Peak/Thalf & RDA Detail</h5>
                                </a>
                                <a href="#" data-action="stock" class="list-group-item text-center">
                                    <h5>Stock Detail</h5>
                                </a>
                                <a href="#" data-action="temprature" class="list-group-item text-center">
                                    <h5>Cooking Temprature</h5>
                                </a>
                                <a href="#" data-action="machine" class="list-group-item text-center">
                                    <h5>Machine Detail</h5>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-11 bhoechie-tab">
                            <div class="bhoechie-tab-content active">
                                <div class="col-md-12 contentDiv">
                                    <div class="col-md-12 col-sm-12 noPadding">
                                        <label class="boldtext">Achievement-RDA</label>
                                    </div>
                                    <div class="col-md-12 marginTop1rem" id="divAchievementRDA">
                                    </div>
                                </div>
                            </div>
                            <div class="bhoechie-tab-content">
                                <div class="col-md-12 contentDiv">
                                    <div class="col-md-2">
                                        <label class="boldtext" style="float: left;">Date</label>
                                        <input type="date" id="txtDate" style="background-color: white; cursor: default; float: right;" />
                                    </div>
                                    <div class="col-md-2">
                                        <input type="button" class="btn btn-warning" value="Show" onclick="getRdaGraph()" />
                                    </div>
                                    <div class="col-md-12 col-sm-12 marginTop1rem margin01rem fullHeight" id="contentFood">
                                    </div>
                                    <div class="col-md-12 col-sm-12 marginTop1rem margin01rem fullHeight" id="contentSuppliment">
                                    </div>
                                    <div class="col-md-12 col-sm-12 marginTop1rem marginBottom1rem noPadding">
                                        <div class="col-md-3"></div>
                                        <div class="col-md-5" id="divRdaGraph">
                                        </div>
                                        <div class="col-md-3"></div>
                                    </div>
                                </div>
                            </div>
                            <%-- <div class="bhoechie-tab-content">
                                <div class="col-md-12 contentDiv">
                                    <div class="col-md-12 col-sm-12 noPadding">
                                        <label class="boldtext clsPeakThalf"></label>
                                    </div>
                                    <div class="col-md-6 marginTop1rem" id="divPeakThalf">
                                    </div>
                                </div>
                            </div>--%>
                            <div class="bhoechie-tab-content">
                                <div class="col-md-12 contentDiv">
                                    <div class="col-md-12 col-sm-12 noPadding">
                                        <label class="boldtext clsEndResult"></label>
                                    </div>
                                    <div class="col-md-12 marginTop1rem" id="divEndResult">
                                    </div>
                                </div>
                            </div>
                            <div class="bhoechie-tab-content">
                                <div class="col-md-12 contentDiv noPadding">
                                    <div class="col-md-12 col-sm-12 noPadding">
                                        <label class="boldtext">RDA Detail</label>
                                    </div>
                                    <table class="table table-bordered table-striped" id="tblMarkerRDADetail">
                                        <thead>
                                            <tr>
                                                <td class="td_peakValue">Peak Value</td>
                                                <td class="td_tHalfValue">THalf Value</td>
                                                <td class="td_rda">RDA</td>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="bhoechie-tab-content">
                                <div class="col-md-12 contentDiv noPadding">
                                    <div class="col-md-12 col-sm-12 noPadding">
                                        <label class="boldtext">Stock Details</label>
                                    </div>
                                    <div class="col-md-12 marginBottom2rem marginTop1rem noPadding">
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
                                </div>
                            </div>
                            <div class="bhoechie-tab-content">
                                <div class="col-md-12 contentDiv noPadding">
                                    <div class="col-md-12 col-sm-12 noPadding">
                                        <label class="boldtext">Cooking Temprature</label>
                                    </div>
                                    <div class="col-md-12 marginBottom2rem marginTop1rem noPadding">
                                        <table class="table table-bordered table-striped" id="tblCookingTemprature">
                                            <thead>
                                                <tr>
                                                    <td class="td_foodName">Food Name</td>
                                                    <td class="td_cookingMethod">Cooking Method</td>
                                                    <td class="td_cookingTimeMinutes">Cooking Time (Min)</td>
                                                    <td class="td_cookingTemperature">Cooking Temperature</td>
                                                    <td class="td_statusFor">Effect</td>
                                                    <td class="td_variationAmountPercentage">Variation Amount Percentage</td>
                                                    <td class="td_variationAmount">Variation Amount</td>
                                                    <td class="td_remark">Remark</td>
                                                    <td class="td_reference">Reference</td>
                                                    <td class="td_url">URL</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="bhoechie-tab-content">
                                <div class="col-md-12 contentDiv noPadding">
                                    <div class="col-md-12 col-sm-12 noPadding">
                                        <label class="boldtext">Machine Detail</label>
                                    </div>
                                    <div class="col-md-12 marginBottom2rem marginTop1rem noPadding">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalDietCreator" style="width: 100%; left: 1%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 140rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body" style="max-height: 600px!important; overflow-y: auto;">
                    <div class="row-fluid">
                        <div class="col-md-8">
                            <table class="table table-bordered" id="tblDietCreator">
                                <thead>
                                    <tr>
                                        <td class="td_SNo">S No.</td>
                                        <td class="td_Food">Food Name</td>
                                        <td class="td_FoodQuantity">Given Food Quantity</td>
                                        <td class="td_ChangeQuantity">Changed Food Quantity</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-md-4" id="pieDiv">
                        </div>
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
                    <tr style="background-color:darkgray !important">
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
 




    <%--About  Food Click Report--%>
    <div class="modal bd-example-modal-lg" id="modelNutrient" role="dialog" >
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close btnhideNutrient"  data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black">
                   
               <table class="table table-hover fixed_header" id="tblnutrient">
                 <thead class="thead-dark">
                    <tr>
                         <th class="td_sNo">S.no.</th> 
                        <th class="td_marker">Marker</th>
                        <th class="td_nutrients"><span class="cls-foodName"></span> rich nutrients<hr>Not to eat</th>
                        <th class="td_persent">Amount of Nutrient persent in <span class="cls-foodName"></span></th>
                        <th class="td_effects">Effects</th>
                    </tr>
                 </thead>
                <tbody>
                </tbody>
              </table>


                     <table class="table table-hover fixed_header" id="tblFood">
                 <thead class="thead-dark">
                    <tr>
                         <th class="td_sNo">S.no.</th> 
                        <th class="td_marker">Marker</th>
                        <th class="td_nutrients"><span class="cls-foodName"></span> rich nutrients<hr>To eat</th>
                        <th class="td_persent">Amount of Nutrient persent in <span class="cls-foodName"></span></th>
                        <th class="td_effects">Effects</th>
                    </tr>
                 </thead>
                <tbody>
                </tbody>
              </table>



                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btnhideNutrient">Close</button>
                </div>
            </div>
        </div>
    </div>


       <%--About  Nutrient Click Report--%>
    <div class="modal bd-example-modal-lg" id="modelFood" role="dialog" >
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close btnhideNutrient"  data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black">
                   
               <table class="table table-hover fixed_header" id="tblNutrientNotToEat">
                 <thead class="thead-dark">
                    <tr>
                         <th class="td_sNo">S.no.</th> 
                        <th class="td_marker">Marker</th>
                        <th class="td_nutrients"><span class="cls-foodName"></span> rich nutrients<hr>Not to eat</th>
                        <th class="td_persent">Amount of Nutrient persent in <span class="cls-foodName"></span></th>
                        <th class="td_effects">Effects</th>
                    </tr>                   
                 </thead>
                <tbody>
                </tbody>
              </table>
                    <%--// Start TO Eat Table--%>
                   <table class="table table-hover fixed_header" id="tblNutrientToEat" >
                 <thead class="thead-dark">
                    <tr>
                         <th class="td_sNo">S.no.</th> 
                        <th class="td_marker">Marker</th>
                        <th class="td_nutrients"><span class="cls-foodName"></span> rich nutrients<hr>To eat</th>
                        <th class="td_persent">Amount of Nutrient persent in <span class="cls-foodName"></span></th>
                        <th class="td_effects">Effects</th>
                    </tr>
                    
                 </thead>
                <tbody>
                </tbody>
              </table>
                     <%--// End TO Eat Table--%>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btnhideNutrient">Close</button>
                </div>
            </div>
        </div>
    </div>


   <%--KIT STOCK MODEL--%>
    <div class="modal bd-example-modal-lg itemStockHide" id="modalItemStock"  role="dialog">
        <div class="modal-dialog" style="width: 100rem;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered table-striped" id="tblItemStocks">
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
                    <button type="button" class="btn btn-default itemStockHide" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <script src="customjs/moleculeDietActivators.js"></script>
        <script src="customjs/pageDescription.js"></script>
</asp:Content>

