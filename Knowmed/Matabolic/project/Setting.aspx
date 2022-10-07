<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="customCSS/customStyle.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">

            <div class="row-fluid">
                <div class="span4">

                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-ok"></i></span>
                            <h5>Allow Pathway</h5>
                        </div>
                        <div class="widget-content" style="overflow-y: auto;">
                            <div class="row-fluid">
                                <div class="span12" id="pathwayDiv" style="padding-left: 1rem;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span4">

                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-ok"></i></span>
                            <h5>Allow Process</h5>
                        </div>
                        <div class="widget-content" style="overflow-y: auto;">
                            <div class="row-fluid">
                                <div class="span12" id="processDiv">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span4">

                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-ok"></i></span>
                            <h5>Allow Phenomenon</h5>
                        </div>
                        <div class="widget-content" style="overflow-y: auto;">
                            <div class="row-fluid">
                                <div class="span12" id="phenomenonDiv">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script src="customjs/setting.js"></script>
</asp:Content>




