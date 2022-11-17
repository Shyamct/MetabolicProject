<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">


    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">

                            <select id="ddlPathway" onchange="getProcess()" style="width: 12%;">
                                <option value="" selected>Select Pathway</option>
                            </select>

                            <select id="ddlProcess" style="width: 12%;">
                                <option value="" selected>Select Process</option>
                            </select>

                            <input type="button" onclick="getReport()" value="SHOW" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tblDiv">
            <table class="table table-bordered table-responsive" id="tblReport">
                <thead>
                    <td class="commons Process">Process</td>
                    <td class="commons Central">Central</td>
                    <td class="commons SCentral">Sub Central</td>
                    <td class="commons Specfic">Specfic</td>
                    <td class="commons Score">Final Score</td>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>


    <script src="customjs/scoringSystem.js"></script>
</asp:Content>

