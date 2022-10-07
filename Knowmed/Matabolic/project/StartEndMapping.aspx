<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .full-width {
            width: 100%;
        }

        .row-fluid {
            margin-bottom: 1rem;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">

            <div class="row-fluid">
                <div class="span6">

                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-ok"></i></span>
                            <h5>Marker Start End Mapping</h5>
                        </div>
                        <div class="widget-content tableContent1" style="overflow-y: auto;">
                            <div class="row-fluid">
                                <div class="span6">
                                    <select id="ddlPathway" class="full-width" onchange="getMarkerStartEndMapping();">
                                        <option value="0">--Select Pathway--</option>
                                    </select>
                                </div>
                                <div class="span6">
                                    <select id="ddlSection" class="full-width" onchange="getMarkerStartEndMapping();">
                                        <option value="0">--Select Section--</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row-fluid">
                            <%--    <div class="span6" style="display:none;">
                                    <select id="ddlSubSection" class="full-width" onchange="getMarkerStartEndMapping();">
                                        <option value="0">--Select Sub Section--</option>
                                    </select>
                                </div>--%>
                                <div class="span4">
                                    <select id="ddlStartPoint" class="full-width" onchange="getMarkerStartEndMapping();">
                                        <option value="0">--Select Start Point--</option>
                                    </select>
                                </div>
                                <div class="span2">
                                    <select id="ddlStartRole" class="full-width">
                                        <option value="">--Select Role--</option>
                                        <option value="B">Beneficial</option>
                                        <option value="H">Harmful</option>
                                    </select>
                                </div>
                                 <div class="span4">
                                    <select id="ddlEndPoint" class="full-width" onchange="getMarkerStartEndMapping();">
                                        <option value="0">--Select End Point--</option>
                                    </select>
                                </div>
                                <div class="span2">
                                    <select id="ddlEndRole" class="full-width">
                                        <option value="">--Select Role--</option>
                                        <option value="B">Beneficial</option>
                                        <option value="H">Harmful</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row-fluid">                               
                                <div class="span6">
                                    <input type="text" placeholder="Marker Name" id="txtMarker" class="full-width">
                                    <%-- <select id="ddlMarker" class="full-width">
                                        <option value="0">--Select Marker--</option>
                                    </select>--%>
                                </div>
                                <div class="span2">
                                    <select id="ddlMarkerRole" class="full-width">
                                        <option value="">--Select Role--</option>
                                        <option value="B">Beneficial</option>
                                        <option value="H">Harmful</option>
                                    </select>
                                </div>
                                 <div class="span1" style="margin-bottom: 1rem;">
                                    <input type="button" class="btn btn-xs btn-info pull-right" onclick="AddMarker()" value="Add" />
                                </div>
                            </div>                            
                            <div class="row-fluid" id="divMarker" style="display: none;">
                                <div class="span12">
                                    <div class="widget-content nopadding">
                                        <table class="table table-bordered table-striped" id="tblMarker">
                                            <thead>
                                                <tr>
                                                    <td class="td_Sno" style="width: 7rem!important;">S No.</td>
                                                    <td class="td_Marker">Marker</td>
                                                    <td class="td_Role">Role</td>
                                                    <td class="td_Action" style="width: 7rem!important;">Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid" id="divFinal" style="display: none; margin-top: 20px;">
                                <div class="span6">
                                    <input type="button" value="Save" onclick="saveMarkerStartEndMapping();" class="btn btn-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="span6">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-ok"></i></span>
                            <h5>Marker Start End Mapping</h5>
                        </div>
                        <div class="widget-content" style="overflow-y: auto;">
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="widget-content nopadding tableContent2">
                                        <table class="table table-bordered table-striped" id="tblStartEndMapping">
                                            <thead>
                                                <tr>
                                                    <td class="td_Sno" style="width: 7rem!important;">S No.</td>
                                                    <td class="td_Pathway">Pathway</td>
                                                    <td class="td_Section">Section</td>
                                                  <%--  <td class="td_SubSection">Sub Section</td>--%>
                                                    <td class="td_StartPoint">Start / End</td>
                                                    <%-- <td class="td_EndPoint">End Point</td>--%>
                                                    <td class="td_Marker">Marker</td>
                                                    <td class="td_Action" style="width: 7rem!important;">Action</td>
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

    <script src="customjs/startEndMapping.js"></script>

</asp:Content>




