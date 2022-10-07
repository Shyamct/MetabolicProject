<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        @-webkit-keyframes blink1 {
            50% {
                border-color: #1e8449;
            }
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

    </style>
    <style>
        th {
            text-align: center !important;
            font-size: 12px;
        }

        .td_CascadeNutrient {
            text-align: center !important;
            font-size: 12px;
            font-weight: bold;
        }

        #signalingDiv ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        #signalingDiv li {
            padding-left: 10px;
            line-height: 32px;
        }

        .pieChart {
            width: 10%;
            float: right;
            cursor: pointer;
        }

        .commonFoodFamily {
            width: 90%;
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
            font-size: 12px;
            font-weight: normal;
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
    </style>
    <style>
        /* The container */
        .check-container {
            display: block;
            position: relative;
            padding-left: 35px;
            margin-bottom: 5px;
            cursor: pointer;
            font-size: 12px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: auto;
        }

            /* Hide the browser's default checkbox */
            .check-container input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }

        /* Create a custom checkbox */
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 20px;
            width: 20px;
            background-color: #eee;
        }

        /* On mouse-over, add a grey background color */
        .check-container:hover input ~ .checkmark {
            background-color: #ccc;
        }

        /* When the checkbox is checked, add a blue background */
        .check-container input:checked ~ .checkmark {
            background-color: #7fb4e2;
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
            content: "";
            position: absolute;
            display: none;
        }

        /* Show the checkmark when checked */
        .check-container input:checked ~ .checkmark:after {
            display: block;
        }

        /* Style the checkmark/indicator */
        .check-container .checkmark:after {
            left: 6px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
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
        
        #mySidenav a {
  position: absolute;
  right:10px;
  transition: 0.3s;
  padding: 10px;
  width: 0px;
  text-decoration: none;
  font-size: 20px;
  color: white;
  border-radius: 10px 0px 0px 10px;
}
#mySidenav a:hover {
  right:10px;
  width:30px;
   writing-mode: vertical-rl;
     font-size:15px;
      text-align:center;
}
#btnNote {
  top: 115px;
  background-color: DarkGoldenRod;
}
#btnNoteShow {
  top: 210px;
  background-color: #555;
}
 .modal-xl {
    width: 1190px;
    margin: 83px auto;
}
    </style>

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
                            <input type="text" placeholder="PID" id="txtPID" style="margin-left: 1%;">
                            <input type="button" value="Go" onclick="getDiseaseList();" />
                                <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                            <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>
                            <%--    <select id="ddlDisease" style="margin-left: 1%;">
                                <option value="">Select Disease</option>
                            </select>
                            <input type="button" value="Go" onclick="getProcessList();" />
                            <select id="ddlProcess" style="margin-left: 1%;">
                                <option value="" selected>Select Process</option>
                            </select>
                            <input type="button" value="Go" onclick="getCentralMoleculeList();" />
                            <select id="ddlCentralMolecule" style="margin-left: 1%;">
                                <option value="" selected>Select Central Molecule</option>
                            </select>
                            <input type="button" class="btn btn-success" value="Search" onclick="getCentralMoleculeReport();" style="margin-left: 1%;" />
                             <input type="button" class="btn btn-primary" value="Refresh" onclick="Refresh()" style="margin-left: 1%;" />--%>
                        </div>
                        <div class="widget-content report">

                            <div class="row-fluid" id="filterDiv" style="display: none;">
                                <div class="span3">
                                    <h4>Pathway </h4>
                                    <div id="pathwayDiv" style="max-height: 12rem; padding-left: 1rem; overflow-y: auto;">
                                    </div>
                                </div>
                                <div class="span3">
                                    <h4>Process </h4>
                                    <div id="processDiv" style="max-height: 12rem; padding-left: 1rem; overflow-y: auto;">
                                    </div>
                                </div>
                                <div class="span3">
                                    <h4>Central Molecule </h4>
                                    <div id="centralMoleculeDiv" style="max-height: 12rem; padding-left: 1rem; overflow-y: auto;">
                                    </div>
                                </div>
                                <div class="span3" id="buttons" style="margin-top: 12rem; display: none;">
                                    <input type="button" class="btn btn-success" value="Show" onclick="getCentralMoleculeReport();" style="margin-left: 1%;" />
                                    <input type="button" class="btn btn-primary" value="Refresh" onclick="Refresh()" style="margin-left: 1%;" />
                                </div>
                            </div>
                            <hr />

                            <div class="row-fluid" id="showData" style="display: none;">
                                <table class="table table-bordered table-striped" style="margin-bottom: 0px;">
                                    <thead>
                                        <tr>
                                            <th style="width: 43%; height: 3rem; vertical-align: middle; font-size: 14px;">What To Eat</th>
                                            <th style="height: 3rem; vertical-align: middle; font-size: 14px;">Central Molecule</th>
                                            <th style="width: 43%; height: 3rem; vertical-align: middle; font-size: 14px;">Not To Eat</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div id="signalingDiv">
                                </div>
                            </div>
                            <%--<table class="table table-bordered table-striped" id="tblSignaling">
                                    <thead>
                                        <tr>
                                            <td class="td_ToEatActivator" style="width: 21.5%">Activators</td>
                                            <td class="td_ToEatInhibitor" style="width: 21.5%">Inhibitors</td>
                                            <td class="td_CascadeNutrient"></td>
                                            <td class="td_NotToEatActivator" style="width: 21.5%">Activators</td>
                                            <td class="td_NotToEatInhibitor" style="width: 21.5%">Inhibitors</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="myModal" style="width: 60%; left: 20%; display: none;" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body" style="max-height: 500px!important;">
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

    <div class="modal fade" id="myModal1" style="width: 60%; left: 20%; display: none;" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body" style="max-height: 500px!important;">
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

       <!-- Modal Description popup-->
     <div class="modal bd-example-modal-lg" id="modalDescription" role="dialog" >
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" id="btnClosed" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Page Description</h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black">
                   
                        <table class="table table-hover fixed_header" id="tblVechileDetails">
                <thead>
                    <tr>
                         <th class="td_SrNo">Sr. No.</th> 
                        <th class="td_heading">Heading</th>
                        <th class="td_color">Color</th>
                        <th class="td_image">Image</th>
                        <th class="td_description">Description</th>
                       <%-- <th class="td_location">Location <i class="fa fa-map-marker" aria-hidden="true"></i></th>--%>
                       <%-- <th class="td_mobileNo">Mobile No. <i class="fa fa-phone" aria-hidden="true"></i></th>--%>
                        <!-- <th class="td_Action">Action</th>            -->
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

     <!-- Button trigger modal Input -->
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
                      </div>
                        </div>
                        </div>
                  </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnSave" data-dismiss="modal">Save</button>
                <button type="button" class="btn btn-success" id="btnCancel" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
    </div>

     <div class="modal bd-example-modal-xl" id="showNote" role="dialog" >
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
                      <%--   <th class="td_srNo">Sr. No.</th> --%>
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
    </div>

    <div id="mySidenav" class="sidenav">
     <a href="#" id="btnNote" onclick="addNote();">Add Note </a>
     <a href="#" id="btnNoteShow">Show Note</a>
        </div>
    <script src="customjs/patientDiet.js"></script>
</asp:Content>




