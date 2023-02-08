<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <link href="customCSS/assignDisease.css" rel="stylesheet" />


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div class="main-head" style="background-color: white; height: 95vh !important;">
        <div class="row">
            <div class="assign-hd">
                <h3>Assign Menu Master</h3>
            </div>
            <div class="col-sm-6">
                <div class="asn-menu-lt">
                    <p>Assign Menu</p>
                    <div class="asign-inner">
                        <div class="row1">
                            <div class="col-sm-2">
                                <label>Select User</label>
                            </div>
                            <div class="col-sm-10">
                                <select class="form-control" id="ddlUsers">
                                    <option>-- Select User --</option>
                                </select>
                            </div>
                        </div>
                        <br>
                        <br>
                        <br>
                        <div class="row1">
                            <div class="col-sm-2">
                                <label>Parent Menu</label>
                            </div>
                            <div class="col-sm-10">
                                <select class="form-control" id="ddlParent" onchange="getSubMenuList()">
                                    <option>-- Parent Menu --</option>
                                </select>
                            </div>
                        </div>


                        <div class="tbl-menu">
                            <table class="table-responsive" id="tblMenu">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th class="chkbx"></th>
                                        <th>Sub Menu Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="btn-sav">
                            <%--<button onclick="saveMenuData()">Save</button>--%>
                            <input type="button" value="Save" onclick="saveMenuData()" />

                        </div>
                    </div>


                </div>
            </div>
            <div class="col-sm-6">
                <div class="asn-menu-lt">
                    <p>Assigned Menu List</p>
                    <div class="asign-inner">




                        <div class="tbl-menu">
                            <table class="table-responsive" id="tblUser">
                                <thead>
                                    <tr>
                                        <th class="thSr">#</th>
                                        <th class="thUser">User Name</th>
                                        <th class="thMenu">Menu Name</th>
                                        <th class="thSubMenu">Sub Menu Name</th>
                                        <th class="thAction">Action</th>
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
    <script src="customjs/assignMenu.js"></script>
</asp:Content>





