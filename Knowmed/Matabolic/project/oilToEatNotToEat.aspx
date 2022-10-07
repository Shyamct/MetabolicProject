<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

      <%--<link rel="stylesheet" href="customCSS/signalingCascadeNEW.css" />--%>
    
   <style>
       
@-webkit-keyframes blink1 {
    50%

{
    border-color: #1e8449;
}

}
td.td_nutrient {
    font-size: 14px;
    color: black;
}
td.td_percentage {
    font-size: 14px;
    color: black;
}

.blink1 {
    border: 2px white dashed;
    -webkit-animation: blink1 .5s step-end infinite alternate;
    background-color: chartreuse;
    font-weight: bold;
    /*text-transform: uppercase;*/
    padding: 3px;
}

@-webkit-keyframes blink2 {
    50% {
        border-color: #ff0000;
    }
}

.blink2 {
    border: 2px white dashed;
    -webkit-animation: blink2 .5s step-end infinite alternate;
    background-color: chartreuse;
    font-weight: bold;
    /*text-transform: uppercase;*/
    padding: 3px;
}

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


th {
    text-align: center !important;
    font-size: 12px;
}

.td_CascadeNutrient {
    text-align: center !important;
    font-size: 12px;
    font-weight: bold;
}

#tblSignaling ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

#tblSignaling li {
    padding-left: 10px;
    line-height: 32px;
}

.pieChart {
    width: 10%;
    float: right;
    cursor: pointer;
}

.commonFoodFamily {
    width: 80%;
    float: left;
    color: #1e00f6;
    cursor: pointer;
}

.commonFood {
    width: 90%;
    float: left;
    color: #1e00f6;
    cursor: pointer;
}

.uncommonFoodFamily {
    width: 100%;
    color: #8a5ea5;
    cursor: pointer;
}

.foodFamilyPanel {
    width: 100%;
    /*max-height: 40rem;
            overflow-y: auto;*/
}

.nutrientFunction {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    list-style: disc !important;
    padding-left: 2rem !important;
}

    .nutrientFunction li {
        line-height: 20px !important;
        text-align: left;
        font-size: 12px;
        font-weight: normal;
    }

.process {
    margin-top: 0.5rem !important;
    list-style: disc !important;
    padding-left: 1rem !important;
}

    .process li {
        line-height: 20px !important;
        text-align: left;
        font-size: 12px;
        font-weight: normal;
        padding-left: 0 !important;
    }

.process-name {
    text-align: left;
    font-size: 1.3rem;
    font-weight: bold;
    text-decoration: underline;
    margin-top: 1rem !important;
}

#tblCascadeCount {
    margin-top: 6%;
}

    #tblCascadeCount td {
        text-align: center;
    }

.btn-group {
    width: 13%;
    margin-left: 1%;
    margin-bottom: 10px;
}

table thead td {
    font-size: 1.5rem !important;
}

.pagination {
    display: inline-block;
}

.pagination a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    border: 1px solid #ddd;
}

    .pagination a.active {
        background-color: #4CAF50;
        color: white;
        border: 1px solid #4CAF50;
    }

    .pagination a:hover:not(.active) {
        background-color: #ddd;
    }

    .pagination a:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .pagination a:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }


.plusSymbol:after {
    position: absolute;
    font-size: 20px;
    text-align: right;
    right: 35px;
    top: 3px;
    content: '\2719';
}

.icon-info-sign:before {
    content: "\f05a";
    position: absolute;
    font-size: 20px;
    text-align: right;
    right: 5px;
    top: 7px;
    color: red;
}

.modal-body.popup-decreption {
    position: relative;
    height: 40vh !important;
    max-height: 9650px;
    padding: 15px;
    overflow-y: auto;
    overflow: auto;
    text-align: center;
}

/*#mySidenav a {
            position: absolute;
            right: 10px;
            transition: 0.3s;
            padding: 10px;
            width: 0px;
            text-decoration: none;
            font-size: 20px;
            color: white;
            border-radius: 10px 0px 0px 10px;
        }*/

/* #mySidenav a:hover {
                right: 10px;
                width: 30px;
                writing-mode: vertical-rl;
                font-size: 15px;
                text-align: center;
            }*/

#btnNote {
    top: 140px;
    background-color: DarkGoldenRod;
}

/* #btnNoteShow {
            top: 230px;
            background-color: #555;
        }*/

.modal-xl {
    width: 1190px;
    margin: 83px auto;
}

.txtSearch {
    margin-right: 94px;
}




mark {
    background: yellow;
}

    mark.current {
        background: orange;
    }

headerr {
    padding: 10px;
    width: 100%;
    background: #eee;
    position: fixed;
    top: 0;
    left: 0;
}

.content {
    height: 400px;
    overflow-y: scroll;
}

.btnAllb {
    display: none;
}

.ft-big {
    font-size: 16px !important;
}

#tblSignaling_filter label {
    margin-top: -28px !important;
}

#tblSignaling thead > tr > :nth-child(1), #tblSignaling thead > tr > :nth-child(2),
#tblSignaling thead > tr > :nth-child(4), #tblSignaling thead > tr > :nth-child(5) {
    width: 21% !important;
}



   </style>

 <%--   <script src="../../script/global.js"></script>
    <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="js/bootstrap-multiselect.js"></script>
  <%--  <script src="../../assets/js/jquery.min.js"></script>--%>
    <%--<script src="js/jquery.dataTables.min.js"></script>--%>
  <%--  <link href="css/select2.css" rel="stylesheet" />
    <script src="js/select2.js"></script>--%>

    <%--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>--%>
<%--<script src="https://ajax.googleapis.com/ajax/lib/jquery/3.5.1/jquery.min.js"></script>--%>
<%--<script src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.0/jquery.mark.js"></script>--%>--%>




     <script src="../../script/global.js"></script>
    <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="js/bootstrap-multiselect.js"></script>
  <%--  <script src="../../assets/js/jquery.min.js"></script>--%>
    <%--<script src="js/jquery.dataTables.min.js"></script>--%>
  <%--  <link href="css/select2.css" rel="stylesheet" />
    <script src="js/select2.js"></script>--%>


<script src="https://ajax.googleapis.com/ajax/lib/jquery/2.1.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.0/jquery.mark.js"></script>


    <script type="text/javascript" src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/fixedcolumns/3.2.2/js/dataTables.fixedColumns.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/jq-2.2.4/dt-1.10.13/fc-3.2.2/fh-3.1.2/r-2.1.0/sc-1.4.2/datatables.min.css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="loader" style="display: none" id="divLoader"></div>
    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">


                            <select id="ddlDisease" style="width: 12%;">
                                <option value="0">-- Select Disease --</option>
                            </select>
                            <select id="ddlProcess" style="margin-left: 1%;">
                                <option value="0">-- Select Process --</option>
                            </select>
                            <select id="ddlSignaling" style="margin-left: 1%;">
                                <option value="0">-- Select Phenomenon --</option>
                            </select>
                            <select id="ddlCascadeNutrient" style="margin-left: 1%;">
                                <option value="" selected>Select Cascade</option>
                            </select>

                             <select id="txtFood" style="width: 12%;" onchange="getNutrientListFood()">
                                <option value="">-- Food --</option>
                            </select>
                            <select id="txtFoodNutrient" style="width: 12%;">
                                <option value="">-- Interacted Nutrient --</option>
                            </select>
                            <%--      <input type="text" id="" placeholder="Interacted Nutrient" style="margin-left: 1%;" />--%>
                           
                            <%--  <input type="text" id="txtFood" placeholder="Food" style="margin-left: 1%;" />--%>
                            <input type="button" class="btn btn-success" value="Show" onclick="getSignalingCascade()" style="margin-left: 1%;" />
                            <input type="button" class="btn btn-primary" value="Refresh" onclick="RefreshSignaling()" style="margin-left: 1%;" />
                            <input type="button" class="btn btn-danger btnshowAllFoodFamily" value="Show Food Family" onclick="showAllFoodFamily()" style="margin-left: 1%; display:none" />

                            
   
                <div id="myModall">
                                      <div class="headerr">
                                        
                                        <input type="search" placeholder="Search..">
                                        <button  id="next">&darr;</button>
                                        <button id="prev">&uarr;</button>
                                          <%--Page refres--%>
                                        <button id="clear">&#10539;</button>
                                      </div>
                    </div>
         
                            
                            <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                            <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>
                           

                        </div>
                        <div class="widget-content">
                            <div class="row-fluid" style="margin-top: 0px;">
                                <div class="span8">
                                 
                                    <table class="table table-bordered table-striped" id="tblCascadeCount">
                                        <tbody>
                                            <tr>
                                                <th>Total Cascade</th>
                                                <th>Total With Interaction</th>
                                                <th>Total Without Interaction</th>
                                                <th>Total With Activators Only</th>
                                                <th>Total With Inhibitors Only</th>
                                                <th>Total With Inhibitors And Activators Both</th>
                                            </tr>
                                            <tr>
                                                <td id="total"></td>
                                                <td id="withInteractedNutrient"></td>
                                                <td id="withoutInteractedNutrient"></td>
                                                <td id="withOnlyEnhancerNutrient"></td>
                                                <td id="withOnlyInhibitorNutrient"></td>
                                                <td id="withEnhancerAndInhibitorNutrient"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                   
                                </div>
                                <div class="span1" style="border: dashed 1px black; margin-top: 1.6rem; padding-left: 1rem; padding: 0.5rem;">
                                    <h4>Note:</h4>
                                    <p><b>O - </b>Original</p>
                                    <p><b>F - </b>Filtered</p>
                                </div>
                                <div class="span3">
                                    <img style="height: 20%; float: right;" src="img/annotation.png">
                                </div>
                            </div>
                            <div class="row-fluid" id="showData" style="display: none;">
                                <table class="table table-bordered table-striped" style="margin-bottom: 0px;">
                                    <thead>
                                        <tr>
                                            <th style="width: 42%; height: 3rem; vertical-align: middle; font-size: 14px;">What To Eat</th>
                                            <th style="width: 16%; height: 3rem; vertical-align: middle; font-size: 14px;">Signaling</th>
                                            <th style="width: 42%; height: 3rem; vertical-align: middle; font-size: 14px;">Not To Eat</th>
                                        </tr>
                                    </thead>
                                </table>
                                <table class="table table-bordered table-striped data-table content" id="tblSignaling">
                                  <%--  <thead>
                                        <tr>
                                            <td class="td_ToEatActivator" style="width: 21.5%">Activators</td>
                                            <td class="td_ToEatInhibitor" style="width: 21.5%">Inhibitors</td>
                                            <td class="td_CascadeNutrient"></td>
                                            <td class="td_NotToEatActivator" style="width: 21.5%">Activators</td>
                                            <td class="td_NotToEatInhibitor" style="width: 21.5%">Inhibitors</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>--%>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="myModal" style="width: 60%; left: 20%; top: 1%!important; display: none;" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body" style="max-height: 780px!important;">
                    <table class="table table-bordered" id="tblFoodNutrientPercentage">
                        <thead>
                            <tr>
                                <td class="td_foodNutrient">NUTRIENT</td>
                                <td class="td_nutrientPercentage">PERCENTAGE</td>
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

    <div class="modal fade" id="myModal1" style="width: 60%; left: 20%; top: 1%!important; display: none;" role="dialog">
        <div class="modal-dialog" style="max-height: 1071px!important">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body" style="max-height: 780px!important;overflow-y: scroll;">
                    <table class="table table-bordered" id="tblNutrientPercentage">
                        <thead>
                            <tr>
                                <td class="td_nutrient">NUTRIENT</td>
                                <td class="td_percentage">PERCENTAGE</td>
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
                            <input type="file" id="txtImage" alt="Image" class="form-control" />
                              <%--<input type="text" id="txtOldImage" name="name"   style="display:none"/>--%>
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
    <%--Compound Nutrient--%>
      
    


 <script src="customjs/find.js"></script>
    <script src="customjs/oilToEatNotToEat.js"></script>
        
      <script src="customjs/pageDescription.js"></script>
    
       
</asp:Content>




