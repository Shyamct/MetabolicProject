<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="js/bootstrap-multiselect.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <style>
        th {
            position: sticky;
            top: 0;
            z-index: 5;
            background: #fff;
        }

        .btnExport {
            margin-right: 65px;
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
            right: 10px;
            transition: 0.3s;
            padding: 10px;
            width: 0px;
            text-decoration: none;
            font-size: 20px;
            color: white;
            border-radius: 10px 0px 0px 10px;
        }

            #mySidenav a:hover {
                right: 10px;
                width: 30px;
                writing-mode: vertical-rl;
                font-size: 15px;
                text-align: center;
            }

        #btnNote {
            top: 120px;
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

    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-info-sign"></i></span>
                            <h5>Select Pathway</h5>
                            <div class="span2">
                                <select id="ddlMolecule" onchange="getProcessReceptor()">
                                </select>
                            </div>
                            <div class="span2" id="divProcess">
                            </div>
                            &nbsp;&nbsp; 
                            <div class="span2" id="divReceptor">
                            </div>
                            &nbsp;&nbsp;                          
                            Age :
                            <input type="text" placeholder="Age" value="30" id="txtAge" />
                            Weight :
                            <input type="text" placeholder="weight" value="50" id="txtWeight" />
                            Gender 
                            <select id="ddlgenger">
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </select>
                            <input type="button" class="btn btn-default" value="Go" onclick="go()" />
                            <div class="pull-right btnExport">
                                <input type="button" class="btn btn-success" value="Export" onclick="exportTable()" />
                            </div>
                             <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                            <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>
                        </div>
                        <div class="widget-content">
                            <div id="showData" style="width: 100%; overflow: auto">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="myModal" style="width: 60%; left: 20%; display: none;" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                        <div class="row-fluid">
                            <div id="myTable" class="span12">
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


    <script src="js/table2excel.js"></script>
    <script src="customjs/MoleculeCountReport.js"></script>

</asp:Content>

