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
            top: 15px;
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
  top: 160px;
  background-color: DarkGoldenRod;
}
#btnNoteShow {
  top: 250px;
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
                    <div class="row-fluid">
                        <div class="span2">
                            <select id="ddlPathway" onchange="getPathwayActivities()">
                                <option>--Select Disease--</option>
                            </select>
                        </div>
                        <div class="span2">
                            <select id="ddlType" onchange="getPathwayActivities()">
                                <option value="0">Not Approved</option>
                                <option value="1">Approved</option>
                                <option value="2">Both</option>
                            </select>
                        </div>
                    </div>

                    <div class="widget-box">
                        <div class="widget-title">
                            <ul class="nav nav-tabs">
                                <li class="active"><a data-toggle="tab" href="#tab1">Approve WriteUp</a></li>
                                <li><a data-toggle="tab" href="#tab2">Approve Central Molecule</a></li>
                                <li><a data-toggle="tab" href="#tab3">Approve Diet Not Required</a></li>
                                <li><a data-toggle="tab" href="#tab4">Approve setEnzyme</a></li>
                                <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                                   <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>




                                <%--<li><a data-toggle="tab" href="#tab5">Approve Rank Name</a></li>--%>
                            </ul>
                        </div>
                        <div class="widget-content tab-content">
                            <div id="tab1" class="tab-pane active">
                                <table class="table table-bordered table-striped" id="tblWriteUp">
                                    <thead>
                                        <tr>
                                            <td class="td_UserName-WriteUp">User Name</td>
                                            <td class="td_WriteUp">WriteUp</td>
                                            <td class="td_Phenomenon">Phenomenon</td>
                                            <td class="td_Parameter">Parameter</td>
                                            <td class="td_Rank" style="width: 26px; text-align: center;">Rank</td>
                                            <td class="td_RankName">Rank Name</td>
                                            <td class="td_ApproveRank" style="width: 70px; text-align: center;">Approve Rank</td>
                                            <td class="td_Sno" style="width: 26px; text-align: center;">S.No.</td>
                                            <td class="td_Approve-WriteUp" style="width: 42px; text-align: center;">Approve</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div id="tab2" class="tab-pane">
                                <table class="table table-bordered table-striped" id="tblCentralMolecule">
                                    <thead>
                                        <tr>
                                            <td class="td_UserName-CentralMolecule">User Name</td>
                                            <td class="td_CentralMolecule">Central Molecule</td>
                                            <td class="td_Phenomenon-CentralMolecule">Phenomenon</td>
                                            <td class="td_Approve-CentralMolecule" style="text-align: center;">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div id="tab3" class="tab-pane">
                                <table class="table table-bordered table-striped" id="tblDietNotRequired">
                                    <thead>
                                        <tr>
                                            <td class="td_UserName-DietNotRequired">User Name</td>
                                            <td class="td_Keyword">Keyword</td>
                                            <td class="td_DietType">Type</td>
                                            <td class="td_Approve-DietNotRequired">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div id="tab4" class="tab-pane">
                                <table class="table table-bordered table-striped" id="tblSetEnzyme">
                                    <thead>
                                        <tr>
                                            <td class="td_UserName-SetEnzyme">User Name</td>
                                            <td class="td_Molecule-SetEnzyme">Molecule</td>
                                            <td class="td_Phenomenon-SetEnzyme">Phenomenon</td>
                                            <td class="td_Approve-SetEnzyme">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
<%--                            <div id="tab5" class="tab-pane">
                                <table class="table table-bordered table-striped" id="tblRank">
                                    <thead>
                                        <tr>
                                            <td class="td_UserName">User Name</td>
                                            <td class="td_RankNo">Rank No</td>
                                            <td class="td_RankName">Rank Name</td>
                                            <td class="td_Action">Action</td>
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
    <script src="customjs/activitiesApproval.js"></script>
</asp:Content>

