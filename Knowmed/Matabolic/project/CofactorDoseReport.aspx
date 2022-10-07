<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
	<%--<script src="https://www.aspsnippets.com/Demos/Scripts/ScrollableTablePlugin_1.0_min.js"></script>--%>
<style>


    th {
        position: sticky;
        top: 0;
        z-index: 5;
        background: #fff;
    }

		
	</style>

    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-info-sign"></i></span>
                            <h5>Select Molecule</h5>
                            <select id="ddlMolecule" onchange="getMoleculeCountReport()">
                            </select>
                          Age:<input type="text" placeholder="Age" value="30" id="txtAge" />
                          Weight:<input type="text" placeholder="weight" value="50" id="txtWeight" />
                           Gender <select id="ddlgenger">
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </select>
                            <input type="button" class="btn" value="Go" onclick="go()"/>
                            <div class="pull-right">
                                <input type="button" class="btn btn-success" value="Export" onclick="exportTable()" />
                            </div>
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

	<script src="js/table2excel.js"></script>
	<script src="customjs/CofactorDoseReport.js"></script>
</asp:Content>

