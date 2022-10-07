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
                            <span class="icon"><i class="icon-info-sign"></i></span>
                            <div style="float: left;">
                                <h5>Select Molecule</h5>
                                <select id="ddlDisease" onchange="getNutrientDetailList();">
                                    <option value="0">-- Select Disease --</option>
                                </select>
                            </div>
                            <div style="float: left; margin-left: 2%">
                                <h5>Select Nutrient</h5>
                                <select id="ddlFood" onchange="getNutrientAndFoodReport();">
                                    <option value="0">-- Select Food --</option>
                                </select>
                            </div>
                            <%--  <div class="pull-right">
                                <input type="button" class="btn btn-success" value="Export" onclick="exportTable()" />
                            </div>--%>
                        </div>
                        <div class="widget-content">
                            <div id="showData1" style="overflow: auto;">
                                <div id="showNutrient" class="row-fluid" style="display: none; margin-top: 2rem; overflow: auto;">
                                    <table class="table table-bordered" id="myNutrientTable">
                                        <thead>
                                            <tr>
                                                <td class="td_sNo"><b>S No.</b></td>
                                                <td class="td_cascadeNutrient"><b>Cascade / Nutrient</b></td>
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

    <script src="customjs/DiseaseNutrientCascadeReport.js"></script>
</asp:Content>

