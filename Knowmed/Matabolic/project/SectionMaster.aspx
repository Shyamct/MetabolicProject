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

                    <div class="widget-box active-div" onclick="activeDiv(this);">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-ok"></i></span>
                            <h5>Section Master</h5>
                        </div>
                        <div class="widget-content" style="overflow-y: auto;">
                            <div class="row-fluid">
                                <div class="span10">
                                    <input type="text" placeholder="Section Name" id="txtSection" style="width: 96%;">
                                </div>
                                <div class="span2">
                                    <input type="button" value="Save" onclick="saveSection();" class="btn btn-success pull-right" />
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="widget-content nopadding tableContent">
                                        <table class="table table-bordered table-striped" id="tblSection">
                                            <thead>
                                                <tr>
                                                    <td class="td_Sno">S No.</td>
                                                    <td class="td_Section">Section Name</td>
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
                <div class="span3" style="display: none;">

                    <div class="widget-box active-div" onclick="activeDiv(this);">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-ok"></i></span>
                            <h5>Sub-Section Master</h5>
                        </div>
                        <div class="widget-content" style="overflow-y: auto;">
                            <div class="row-fluid">
                                <div class="span10">
                                    <input type="text" placeholder="Sub-Section Name" id="txtSubSection" style="width: 96%;">
                                </div>
                                <div class="span2">
                                    <input type="button" value="Save" onclick="saveSubSection();" class="btn btn-success pull-right" />
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="widget-content nopadding tableContent">
                                        <table class="table table-bordered table-striped" id="tblSubSection">
                                            <thead>
                                                <tr>
                                                    <td class="td_Sno">S No.</td>
                                                    <td class="td_SubSection">Sub-Section Name</td>
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
                <div class="span4">

                    <div class="widget-box active-div" onclick="activeDiv(this);">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-ok"></i></span>
                            <h5>Start Point</h5>
                        </div>
                        <div class="widget-content" style="overflow-y: auto;">
                            <div class="row-fluid">
                                <div class="span10">
                                    <input type="text" placeholder="Start Point" id="txtStartPoint" style="width: 96%;">
                                </div>
                                <div class="span2">
                                    <input type="button" value="Save" onclick="saveStartPoint();" class="btn btn-success pull-right" />
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="widget-content nopadding tableContent">
                                        <table class="table table-bordered table-striped" id="tblStartPoint">
                                            <thead>
                                                <tr>
                                                    <td class="td_Sno">S No.</td>
                                                    <td class="td_StartPoint">Start Point</td>
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
                <div class="span4">

                    <div class="widget-box active-div" onclick="activeDiv(this);">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-ok"></i></span>
                            <h5>End Point</h5>
                        </div>
                        <div class="widget-content" style="overflow-y: auto;">
                            <div class="row-fluid">
                                <div class="span10">
                                    <input type="text" placeholder="End Point" id="txtEndPoint" style="width: 96%;">
                                </div>
                                <div class="span2">
                                    <input type="button" value="Save" onclick="saveEndPoint();" class="btn btn-success pull-right" />
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="widget-content nopadding tableContent">
                                        <table class="table table-bordered table-striped" id="tblEndPoint">
                                            <thead>
                                                <tr>
                                                    <td class="td_Sno">S No.</td>
                                                    <td class="td_EndPoint">End Point</td>
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
        </div>
    </div>

    <script src="customjs/sectionMaster.js"></script>
</asp:Content>




