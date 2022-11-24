<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
     <style>
        span#NutrientInruction {
    padding: 4px 5px !important;
    border: 1px solid #ddd;
    background: #f1ebeb;
    border-radius: 5px;
    font-size: 16px !important;
    font-weight: 600 !important;
}
         span.foodName {
             padding: 3px !important;
             border: 5px solid #ddd;
             background: #f1ebeb;
             border-radius: 5px;
             font-size:15px;
         }
         div#foodBody {
    display: grid;
    grid-gap: 1px;
    grid-template-columns: repeat(5, 1fr);
}
         td.commons{
             font-size: large !important;
             color: black !important;
         }
       td.commons Process{
             font-size: medium;
              color: black;
         }
    </style>

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
                    <td class="commons Central">Central (Score=4)</td>
                    <td class="commons SCentral">Sub Central (Score=3)</td>
                    <td class="commons Specfic">Specfic (Score=5)</td>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>



    <div class="modal bd-example-modal-lg" id="modelIntaretednutrient" role="dialog" >
        <div class="modal-dialog modal-xl ">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close btnClos"  data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Interacted Nutrient Name </h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black;overflow-y: scroll!important;">
                  <div id="Interactednutrient"></div> 
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btnClos">Close</button>
                </div>
            </div>
        </div>
         
    </div>



     <div class="modal bd-example-modal-lg" id="modelFoodList" role="dialog">
        <div class="modal-dialog modal-xl" style="max-width: 1000px ; margin: 30px auto;width: 100% !important;">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close btnClosfood"  data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Food Name </h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black;overflow-y: scroll!important;height: 70vh !important;">
                  <div id="foodBody"></div> 
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btnClosfood">Close</button>
                </div>
            </div>
        </div>
         
    </div>
    <script src="customjs/scoringSystem.js"></script>
</asp:Content>

