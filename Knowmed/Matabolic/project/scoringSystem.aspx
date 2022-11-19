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
                    <td class="commons Central">Central (Score=4)</td>
                    <td class="commons SCentral">Sub Central (Score=3)</td>
                    <td class="commons Specfic">Specfic (Score=5)</td>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>



    <div class="modal bd-example-modal-lg" id="modelDiet" role="dialog" >
        <div class="modal-dialog modal-xl ">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close btnClos"  data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Diet </h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black;">
                   
                 <table class="table" id="tblDiet">
                <thead >
                    <tr>
                         <td class="comn">Sr. No.</td> 
                         <td class="comn">Nutrient Interacted Name</td> 
                         <td class="comn">Nutrient Interacted Type</td> 
                    </tr>
                </thead>
                  <tbody >
                    
                  </tbody>
                 </table>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btnClos">Close</button>
                </div>
            </div>
        </div>
         
    </div>


    <script src="customjs/scoringSystem.js"></script>
</asp:Content>

