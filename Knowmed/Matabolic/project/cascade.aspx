<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        @-webkit-keyframes blink1 {
            50% {
                border-color: #1e8449;
            }
        } 

        .blink1 {
            border: 2px white dashed;
            -webkit-animation: blink1 .5s step-end infinite alternate;
            background-color: chartreuse;
            font-weight: bold;
            /*text-transform: uppercase;*/
            padding: 3px;
        }

        @-webkit-keyframes blink2 {
            50% {
                border-color: #ff0000;
            }
        }

        .blink2 {
            border: 2px white dashed;
            -webkit-animation: blink2 .5s step-end infinite alternate;
            background-color: chartreuse;
            font-weight: bold;
            /*text-transform: uppercase;*/
            padding: 3px;
        }

        .loader {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background: url('img/pageLoader.gif') 50% 50% no-repeat rgb(249,249,249);
            opacity: .6;
        }
    </style>
    <style>
        th {
            text-align: center !important;
            font-size: 12px;
        }

        .td_CascadeNutrient {
            text-align: center !important;
            font-size: 12px;
            font-weight: bold;
        }

        #tblSignaling ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        #tblSignaling li {
            padding-left: 10px;
            line-height: 32px;
        }

        .pieChart {
            width: 10%;
            float: right;
            cursor: pointer;
        }

        .commonFoodFamily {
            width: 90%;
            float: left;
            color: #1e00f6;
            cursor: pointer;
        }

        .uncommonFoodFamily {
            width: 100%;
            color: #8a5ea5;
            cursor: pointer;
        }

        .foodFamilyPanel {
            width: 100%;
            /*max-height: 40rem;
            overflow-y: auto;*/
        }

        .nutrientFunction {
            margin-top: 1.5rem !important;
            margin-bottom: 1.5rem !important;
            list-style: disc !important;
            padding-left: 2rem !important;
        }

            .nutrientFunction li {
                line-height: 20px !important;
                text-align: left;
                font-size: 12px;
                font-weight: normal;
            }

        .process {
            margin-top: 0.5rem !important;
            list-style: disc !important;
            padding-left: 1rem !important;
        }

            .process li {
                line-height: 20px !important;
                text-align: left;
                font-size: 12px;
                font-weight: normal;
                padding-left: 0 !important;
            }

        .process-name {
            text-align: left;
            font-size: 12px;
            font-weight: normal;
            text-decoration: underline;
            margin-top: 1rem !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="loader" style="display: none" id="divLoader"></div>
    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-info-sign"></i></span>
                            <select id="ddlDisease" onchange="getSignalingCascade()">
                                <option value="0">-- Select Disease --</option>
                            </select>
                            <select id="ddlProcess" onchange="getSignalingCascade()" style="margin-left: 1%;">
                                <option value="0">-- Select Process --</option>
                            </select>
                            <select id="ddlSignaling" onchange="getSignalingCascade()" style="margin-left: 1%;">
                                <option value="0">-- Select Phenomenon --</option>
                            </select>
                            <input type="text" id="txtCascadeNutrient" placeholder="Cascade Nutrient" onchange="getSignalingCascade()" style="margin-left: 1%;" />
                            <input type="text" id="txtFoodNutrient" placeholder="Interacted Nutrient" onchange="getSignalingCascade()" style="margin-left: 1%;" />
                            <input type="text" id="txtFood" placeholder="Food" onchange="getSignalingCascade()" style="margin-left: 1%;" />
                        </div>
                        <div class="widget-content">
                            <div class="row-fluid" style="margin-top: 0px;">
                                <div class="span12">
                                    <img style="height: 20%; float: right;" src="img/annotation.png">
                                </div>
                            </div>
                            <div class="row-fluid" id="showData" style="display: none;">
                                <table class="table table-bordered table-striped" style="margin-bottom: 0px;">
                                    <thead>
                                        <tr>
                                            <th style="width: 43%; height: 3rem; vertical-align: middle; font-size: 14px;">What To Eat</th>
                                            <th style="height: 3rem; vertical-align: middle; font-size: 14px;">Signaling</th>
                                            <th style="width: 43%; height: 3rem; vertical-align: middle; font-size: 14px;">Not To Eat</th>
                                        </tr>
                                    </thead>
                                </table>
                                <table class="table table-bordered table-striped" id="tblSignaling">
                                    <thead>
                                        <tr>
                                            <td class="td_ToEatActivator" style="width: 21.5%">Activators</td>
                                            <td class="td_ToEatInhibitor" style="width: 21.5%">Inhibitors</td>
                                            <td class="td_CascadeNutrient"></td>
                                            <td class="td_NotToEatActivator" style="width: 21.5%">Activators</td>
                                            <td class="td_NotToEatInhibitor" style="width: 21.5%">Inhibitors</td>
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

    <div class="modal fade" id="myModal" style="width: 60%; left: 20%; display: none;" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body" style="max-height: 500px!important;">
                    <table class="table table-bordered" id="tblFoodNutrientPercentage">
                        <thead>
                            <tr>
                                <td class="td_foodNutrient">NUTRIENT</td>
                                <td class="td_nutrientPercentage">PERCENTAGE</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>

    <div class="modal fade" id="myModal1" style="width: 60%; left: 20%; display: none;" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body" style="max-height: 500px!important;">
                    <table class="table table-bordered" id="tblNutrientPercentage">
                        <thead>
                            <tr>
                                <td class="td_nutrient">NUTRIENT</td>
                                <td class="td_percentage">PERCENTAGE</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <script src="customjs/cascade.js"></script>
</asp:Content>




