<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
   <%-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">--%>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
     <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <link href="customCSS/assignDisease.css"  rel="stylesheet" />


    <style>

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">


  <div class="main-head" style="background-color:white;">
   <div class="row">
    <div class="assign-hd"><h3>Assign Disease Master</h3></div>
    <div class="col-sm-6">
        <div class="asn-menu-lt">
            <p>Assign Disease</p>
            <div class="asign-inner">
            <div class="row1">
                <div class="col-sm-2">
                    <label>Select User</label>
                </div>
                <div class="col-sm-10">
                    <select class="form-control" id="ddlUser">
                        <option>-- Select User --</option>
                    </select>
                </div>
            </div>

            <div class="tbl-menu">
               <table class="table-responsive" id="tblDisease">
                   <thead>
                       <tr>
                       <th>#</th>
                       <th class="chkbx"><input type="checkbox"></th>
                       <th>Disease Name</th>
                    </tr>
                   </thead>
                   <tbody>
                       
               
                   </tbody>
               </table>
            </div>
            <div class="btn-sav">
                <%--<button dblclick="saveDisease()">Save</button>--%>
                <input type="button" onclick="saveDiseaseUser()" value="Save" />
            </div>
</div>


        </div>
    </div>
    <div class="col-sm-6">
        <div class="asn-menu-lt">
            <p>Assigned Disease List</p>
                <div class="asign-inner">

                <%--<div class="row1 ui-widget">
                    <div class="col-sm-12">
                        <div class="ass-sear">
                        <i> <input type="text" class="form-control" id="txtSearch" placeholder="Search For..."></i>
                        <div class="ass-sear-in">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        </div>
                    </div>
                    </div>
                </div>--%>
                <div class="tbl-menu">
                    <table class="table-responsive" id="tblUser">
                        <thead>
                            <tr>
                            <th class="thSr">#</th>
                            <th class="thMenu">Disease Name</th>
                            <th class="thUser">User Name</th>
                            <th class="thAction">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                           <%-- <tr>
                                <td>1</td>
                                <td>Metabolic</td>
                                <td>Shyam Kumar Prajapati</td>
                                <td> <div class="actn-del"><i class="fa fa-trash" aria-hidden="true"></i></div></td>
                            </tr>--%>
                            
                        </tbody>
                    </table>
                </div>
               </div>
        </div>
    </div>
    
</div>
    </div>

    <script src="customjs/assignDisease.js"></script>
</asp:Content>

