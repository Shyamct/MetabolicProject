<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="showData" style="overflow: auto;">
                    <iframe src="COVID-19.pdf" style="width: 100%; height: 100%"></iframe>
                </div>
               <%-- <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-info-sign"></i></span>--%>
                          <%--  <select id="ddlDisease" onchange="getPDF()">
                                <option value="0">-- Select Disease --</option>
                            </select>--%>
                          <%--  <div class="pull-right">
                                <input type="button" class="btn btn-success" value="Add PDF" onclick="addPDF()" />
                            </div>--%>
                        <%--</div>
                        <div class="widget-content">                          
                            <div class="row-fluid">
                                <div class="showData" style="overflow:auto;">
                                <iframe src="GraphPDF/COVID-19.pdf" style="width:100%; height:100%"></iframe>
                                </div>
                            </div>
                        </div>--%>
                    </div>
                </div>
            </div>
     <%--   </div>
    </div>--%>

   <%-- <div class="modal fade" id="myModal" style="width: 60%; left: 35%; display: none;" role="dialog">
        <div class="modal-dialog">--%>

            <!-- Modal content-->
           <%-- <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body" style="max-height: 400px!important;">
                    <div class="row-fluid">
                        <div class="span8">
                            <input type="file" id="filePathwayPDF" />
                        </div>
                        <div class="span4">
                            <input type="button" value="Save" onclick="savePDF();" class="btn btn-success" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>--%>

    <script src="customjs/PDF.js"></script>
</asp:Content>




