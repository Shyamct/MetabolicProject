<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"    ></script>
<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>

     <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="js/bootstrap-multiselect.js"></script>
    <script src="../../js/table2excel.js"></script>
     <style>
           #loader {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 11;
}

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
}  div#scoreBody {
    display: grid;
    grid-gap: 1px;
    grid-template-columns: repeat(5, 1fr);
    color:black;
    font-weight:600;
}
         th.commons{
             font-size: large !important;
             color: black !important;
         }
     /*..............*/
     .my-div td {
    color: black;
    font-size: 16px;
}
     .my-div {
    box-sizing: border-box;
    width: 100%;
    margin: auto;
    height: 811px;
    overflow: auto;
}
     .my-div table, th {
    position: sticky;
    top: 0;
}

     .my-div th {
    letter-spacing: 0px;
    color: #343434;
    opacity: 1;
}
     .my-div td {
    letter-spacing: 0px;
    color: #2D2D2D;
    opacity: 1;
}

 td#TDprocess {
    letter-spacing: 0px;
    color: #2D2D2D;
    opacity: 1;
    font-size: 17px;
}
 .span12 input {
    background: #FA9600 0% 0% no-repeat padding-box;
    text-align: center;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    border: 1px solid #fff;
    padding: 5px 15px;
    
}
  span#tdMarker {
    letter-spacing: 0px;
    color: #2D2D2D;
    opacity: 1;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer; 
}
 .my-div span {
    margin: 0 3px;
    
}
 span#SPNroleType {
background: #ECECEC 0% 0% no-repeat padding-box;
border-radius: 5px;
opacity: 1;
    color: #9D9D9D;  
    font-size: 13px;
      
}

 span#SPNscoreType {
     background: #D9E8DA 0% 0% no-repeat padding-box;
border-radius: 5px;
opacity: 1;
    letter-spacing: 0px;
    color: #228126;   
    font-size: 13px;
}
 span#SPNhighLow {
     background: #FCE1DE 0% 0% no-repeat padding-box;
border-radius: 5px; 
    opacity: 1;
    color: #CB1E1E;  
    font-size: 13px;
}

.tblhed {
    display: flex;
    gap: 15px;
}
.tblhedin {
    border: 1px solid #cdcdcd;
    padding: 10px;
}
h3.tblheh3 {
    font-size: large;
    text-align: center;
    background: #fff;
    padding: 10px 58px !important;
    margin-top: 2px;
    border: 1px solid #ddd;
    color: black;
    font-weight: 600;
}
div#markerDIV span {
    font-size: 14px;
    font-weight: 600;
    color: #2d2d2d;
    padding: 4px 4px;
    border: 1px solid #cdcdcd;
    margin: 3px;
    display: inline-block;
    box-shadow: 0px 2px 10px #ccc;
    width: 97%;
}
div#markerDIV {
    max-height: 78vh;
    overflow: auto;
}
.scoreDiv table tr th {
   background: #eeeeee!important;
    font-size: 18px;
    color: #000;
    position: sticky;
    z-index: 1111;
    top: -16px !important;
}
.btnEditIcon {
    color: #0e870e;
    padding: 5px;
    cursor: pointer;
    background: #d8e5d8;
    font-weight: 600;
    border-radius: 4px;
    font-size: 16px;
}
.scoreDiv table tr td {
    font-size: 14px;
    color: #000;
    font-weight: 500;
}
.scoreDiv {
    max-height: 83vh;
    overflow-y: auto;
}
button.btnClosscore {
    background: red;
    color: #fff;
    border-radius: 5px;
    border: 1px solid red;
}
button.btnClosscore:hover {
    background: #fff;
    color: #eb0909;
    border: 1px solid #eb0909;
    font-weight: 600;
}

button.btnClosfoodt {
     background: red;
    color: #fff;
    border-radius: 50%;
    border: 1px solid red;
    height: 27px;
    width: 27px;
    line-height: 13px;
    padding: 5px;
    font-size: 22px;
    opacity: 1;
}
button.btnClosfoodt:hover {
    background: #fff;
    color: #eb0909;
    border: 1px solid #eb0909;
    font-weight: 600;
}
input#txtPID {
    width: 102px;
    font-size: 12px;
}
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div id='loader' style='display: none;'>
        <img src='img/spinner.gif'>
    </div>
    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">

                            <select id="ddlPathway" onchange="getProcess()" style="width: 12%;">
                                <option value="" selected>Select Disease</option>
                            </select>

                            <select id="ddlProcess" style="width: 12%;">
                                <option value="" selected>Select Process</option>
                            </select>

                            <input type="button" onclick="getReport()" value="SHOW" />
                            <input type="button" onclick="getScore()" value="SHOW SCORE" />
                            <input type="button" onclick="print()" value="PRINT" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tblhed" id="GFG">
            <div class="tblhedin" style="width:70%"> 
                <div class="tblDiv my-div">
            <table class="table table-bordered table-responsive" id="tblReport">
                <thead>
                    <th class="commons Diease">Disease Name</th>
                    <th class="commons Process">Process</th>
                    <th class="commons Central">Central (Score=4)</th>
                    <th class="commons SCentral">Sub Central (Score=3)</th>
                    <th class="commons Specfic">Specfic (Score=5)</th>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div></div>
            
            <div class="tblhedin"  style="width:30%" id="markerTbls">
               
                <h3 class="tblheh3">
                      <input type="text" maxlength="10" id="txtPID" placeholder="Enter PID"/>
                    Marker 
                            <input type="button" onclick="printMerker()" value="PRINT" />
                    <input type="button" onclick="getCommonMarker()" value="Common" />
                </h3>
                <div id="markerDIV">

                </div>
            </div>
        </div>
       
       
    </div>



    <div class="modal bd-example-modal-lg" id="modelIntaretednutrient" role="dialog" >
        <div class="modal-dialog modal-xl ">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close btnClos"  data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="intretectedHeader">  </h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black;overflow-y: scroll!important;height: 70vh !important;">
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

     <div class="modal bd-example-modal-lg" id="modelScore" role="dialog">
        <div class="modal-dialog modal-xl" style="max-width: 1000px ; margin: 30px auto;width: 100% !important;">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close btnClosfoodt"  data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Process Score</h4>
                </div>
                <div class="modal-body scoreDiv">
                  <%--<div id="scoreBody"></div>--%> 
                    <table class="table table-bordered table-responsive" id="tblScore">
                        <thead>
                        <tr>
                            <th>Disease Name</th>
                            <th>Process Name</th>
                            <th>Score</th>
                            <th>Edit</th>
                        </tr>
                            </thead>
                        <tbody>

                        </tbody>
                    </table>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btnClosfood btnClosscore">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modelEdit" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-body">
         <input type="number"  id="txtScore" class="form-control"/>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default editBtnCancel" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-default editBtnSave" onclick="saveScore()" data-dismiss="modal">Save</button>
        </div>
      </div>
    </div>
  </div>
    




       <div class="modal bd-example-modal-lg" id="modelCommonMarker" role="dialog">
        <div class="modal-dialog modal-xl" style="max-width: 1000px ; margin: 30px auto;width: 80% !important;">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close btnmodelCommonMarker"  data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Common Marker </h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black;overflow-y: scroll!important;height: 70vh !important;">
                  <div id="commonmarker"></div> 
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btnmodelCommonMarker">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        function print() {
            var divContents = document.getElementById("GFG").innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>Scoring System</title>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(divContents);
            frameDoc.document.write('<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />')
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
        }
        function printMerker() {
            var divContents = document.getElementById("markerTbls").innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>Only Marker</title>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(divContents +'<br/>');
            frameDoc.document.write('<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />')
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
        }
    </script>
    <script src="customjs/scoringSystem.js"></script>
</asp:Content>

