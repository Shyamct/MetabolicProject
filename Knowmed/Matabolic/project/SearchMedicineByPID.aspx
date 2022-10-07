<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <style>
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
            top: 130px;
            background-color: DarkGoldenRod;
        }

        #btnNoteShow {
            top: 220px;
            background-color: #555;
        }

        .modal-xl {
            width: 1190px;
            margin: 83px auto;
        }
    </style>


    <%--    <div class="loader" style="display: none" id="divLoader"></div>--%>
    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                          
                            <input type="text" placeholder="PID" id="PID">
                            <input type="button" class="btn btn-success" value="Search" onclick="getMedication();" />
                            <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                              <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>
                        </div>
                        <div class="widget-content report">
                            <div class="row-fluid" id="showData2" style="display: none; width: 50%; overflow-y: auto;">
                                <table class="table table-bordered table-striped" id="tblMedicine">
                                    <thead>
                                        <tr>
                                            <td class="td_Medicine">Medicine</td>
                                            <td class="td_Pathway">Pathway</td>
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
            </div>
        </div>
       </div>




      <!-- Modal Description popup-->
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
                           <%--<button type="button" class="btn btn-dark" id="btnAddNew" style="font-size: 15px;margin-left: 90%;">Add New <i class="fa fa-plus"></i></button>--%>
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
        <a href="#" id="btnNote">Add Note </a>
     <a href="#" id="btnNoteShow">Show Note</a>
   </div>
    <script src="customjs/DiseaseNutrientCascadeReport.js">
    </script>
</asp:Content>




