<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">
</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">

            <div class="row-fluid">
                <div class="span12">

                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-ok"></i></span>
                            <h5>Pathway PDF</h5>
                            <div class="span5">                               
                            </div>
                            <div class="span2">
                                <select id="ddlpathway">
                                    <option value="0">--Select Pathway--</option>
                                </select>
                            </div>
                            <div class="span2">
                                <input type="file" id="fuPathwayPDF" />
                            </div>
                            <div class="span1 pull-right">
                                <input type="button" class="btn btn-primary" value="Submit" onclick="uploadPDF();" />
                            </div>
                        </div>
                        <div class="widget-content" style="overflow-y: auto; width: 100%;">
                            <div id="pdfPreview">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="customjs/PDF.js"></script>
</asp:Content>




