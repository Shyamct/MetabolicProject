<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <%--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>--%>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <script src="../../script/global.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>
     <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="js/bootstrap-multiselect.js"></script>
     <script src="../../js/table2excel.js"></script>



    <style>
        table#tblReport thead tr td {
    position: STICKY;
    top: 0;
    z-index: 111;
}
        td.commons.MWeightage {
    width: 170px !important;
}
        td.commons.Process {
    width: 241px;
}
        td.commons.Central {
    width: 241px;
}
td.commons.SCentral {
    width: 241px;
}
td.commons.Specfic {
    width: 241px;
}
td.commons.NCentral {
    width: 241px;
}
td.commons.NSCentral {
    width: 241px;
}
td.commons.NSpecfic {
    width: 241px;
}

/*        table#tblReport {
    display: block;
    overflow-x: auto;
}*/
        #tblReport {
  /* Not required only for visualizing */
  border-collapse: collapse;
  width: 100%;
}

#tblReport thead tr th {
  /* Important */
  background-color: red;
  position: sticky;
  z-index: 100;
  top: 0;
}
  
.tblDiv {
    width: 100%;
    overflow-x: scroll;
    height: 788px;
}
td {
  /* Not required only for visualizing */
  padding: 1em;
}



        /*.rotate-table-grid th span {
            transform-origin: 0 50%;
            transform: rotate(-90deg);
            white-space: nowrap;
            display: block;
            position: absolute;
            bottom: 0;
            left: 50%;
        }*/
   
        td.commons {
    font-size: initial !important;
    color: black !important;
}
        td.commons.Central {
    background-color: #e10dbd;
    color: white !important;
}
          td.commons.SCentral {
    background-color: #2d1ed4;
    color: white !important;
}
             td.commons.Specfic {
    background-color: #ed9c1a;
    color: white !important;
}
                 td.commons.NCentral {
   background: linear-gradient(to left, #ffffff 30%, #ff4d4d 100%);
    color: black !important;
}
          td.commons.NSCentral {
    background: linear-gradient(to left, #ffffff 30%, #ff4d4d 100%);
    color: black !important;
}
             td.commons.NSpecfic {
   background: linear-gradient(to left, #ffffff 30%, #ff4d4d 100%);
    color: black !important;
}
        td.interactedNutrient {
    font-size: 25px;
    text-align: center !important;
    color: black;
}
       td {
    font-size: medium;
    color: black;
}
        #loader {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 11;
}
       span.td_Test {
    color: red;
    font-size: x-large;
    background-color: chartreuse;
    font-weight: bold;
    }

 @-webkit-keyframes blinker {
  from {opacity: 1.0;}
  to {opacity: 0.0;}
}
.td_Test{
	text-decoration: blink;
	-webkit-animation-name: blinker;
	-webkit-animation-duration: 0.6s;
	-webkit-animation-iteration-count:infinite;
	-webkit-animation-timing-function:ease-in-out;
	-webkit-animation-direction: alternate;
}

        img {
            width: 45px;
            height: 45px;
        }
    span.disease-span {
    font-size: 34px;
    color: blueviolet;
}
    .modal-body {
            position: relative;
            /*height: 650px !important;*/
            max-height: 650px;
            padding: 15px;
            overflow-y: auto;
        }

        .modelWidth {
            width: 90%;
            left: 6%;
        }


        @media only screen and (max-width: 1367px) {
            .modelWidth {
                width: 90%;
                left: 27%;
            }

            .modal-body {
                position: relative;
                height: 500px !important;
                max-height: 500px;
                padding: 15px;
                overflow-y: auto;
            }

            .modal.fade.in {
                top: 2%;
            }
        }
        .modal-body {
    position: relative;
    height: 651px !important;
    max-height: 664px;
    padding: 15px;
    overflow-y: auto;
}
        table#tblReport {
    background-color: antiquewhite;
}
        td.setBackGroundColorCond:not(:empty) {
            color:red;
    /* Styles */
}
     td#tdSR {
    font-size: initial;
}
     td#tdFOOD{
    font-size: initial;
}
 td#tdQuantity{
    font-size: initial;
}


td.comn {
    font-size: 18px !important;
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
                           <%-- <div class="span2">
                                <select id="ddlPathway"></select>
                            </div>--%>
                            <select id="ddlPathway" onchange="RANKNAME()" style="width: 12%;" >
                                <option value="" selected>Select pathway</option>
                            </select>

                            <select id="ddlRank" style="width: 12%;">
                                <option value="" selected>Select Process</option>
                            </select>

                            <select id="ddlGender" style="width: 12%;">
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </select>

                             <select id="ddlAgeUnit" style="width: 12%;">
                                <option value="YEAR">YEAR</option>
                                <option value="MONTH">MONTH</option>
                                <option value="DAY">DAY</option>
                            </select>

                            <select id="ddlAge" style="width: 12%;">
                            </select>

                            <input id="btnShowRe" type="button" class="btn btn-primary" onclick="myReport()" value="Show" style="margin-left: 1%;" />

                            <button style="font-size:19px;margin-left: 469px;margin-top: 1px;" class="btnPrint" onclick="print_current_page()">Print <i class="fa fa-print"></i></button>
                            <button style="font-size:19px;margin-left: 7px" class="btnExcel" onclick="export_current_page()">Excel <i class="fa fa-file-excel-o"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <%--<div class="row-fluid" id="showData">
                <table class="table table-bordered table-striped data-table content" id="tblTimelineReport">
                </table>
            </div>--%>
             <div class="col-md-12">
               <div class="row-fluid" id="showData">
                
              </div>
            </div>
        </div>

    </div>
      
       
        


     <div class="modal bd-example-modal-lg" id="showFoodModel" role="dialog" >
        <div class="modal-dialog modal-xl ">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" id="btnClosed" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Food Name</h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black;">
                   
                 <table class="table" id="modelBody">
                <thead >
                    <tr>
                         <td id="tdSR">Sr. No.</td> 
                         <td id="tdFOOD">Food Name</td> 
                         <td id="tdQuantity">Quantity</td> 
                    </tr>
                    
                </thead>
                  <tbody>
                    
                  </tbody>
                 </table>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnClose" class="btn btn-default">Close</button>
                </div>
            </div>
        </div>
         
    </div>


       <div class="modal bd-example-modal-lg" id="showTestModel" role="dialog" >
        <div class="modal-dialog modal-xl ">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close btnClos"  data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Test Name</h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black;">
                   
                 <table class="table" >
                <thead >
                    <tr>
                         <td class="comn">Sr. No.</td> 
                         <td class="comn" id="tdtest">Test Name</td>
                         <td class="comn">Brand Name</td> 
                         <td class="comn">Store Name</td> 
                    </tr>
                    
                </thead>
                  <tbody id="tblTest">
                    
                  </tbody>
                 </table>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btnClos">Close</button>
                </div>
            </div>
        </div>
         
    </div>


    <div class="tblDiv">
  <table class="table table-bordered table-responsive" id="tblReport">
                        <thead>
                            <td id="td_PathwayID" style="display:none">interactedNutrientID</td>
                             <td class="commons" >Active Compound</td>
                             <td class="commons RDA">RDA</td>
                             <td class="commons Thalf">T - Half</td>
                             <td class="commons">08:00 AM</td>
                             <td class="commons">10:00 AM</td>
                             <td class="commons">01:00 PM</td>
                             <td class="commons">05:00 PM</td>
                             <td class="commons">08:00 PM</td>
                             <td class="commons">11:00 PM</td>
                             <td class="commons Process" >Process</td>
                             <td class="commons Central" >TO Eat Central</td>
                             <td class="commons SCentral">TO Eat Sub Central</td>
                             <td class="commons Specfic" >TO Eat Specfic</td>

                            <td class="commons NCentral" >Not TO Eat Central</td>
                             <td class="commons NSCentral">Not TO Eat Sub Central</td>
                             <td class="commons NSpecfic" >Not TO Eat Specfic</td>

                             <td class="commons MWeightage">Marker Weightage</td>
                             <td class="commons">Total Marker</td>
                             <td class="commons" >Total Weightage</td>
                             <td class="commons">Percentage</td>
                             

                        </thead>
                        <tbody>
                        </tbody>
 </table>
          </div>
               

    <script src="customjs/diseaseTimeLine.js"></script>
     <script>
         function print_current_page() {
            window.print();
         }
         function export_current_page() {
             $("#tblReport").table2excel({
                 exclude: ".noExl",// exclude CSS class
                 name: "diseaseTimeLineReport",
                 filename: "diseaseTimeLinereport",//do not include extension
                 fileext: ".xls" // file extension
             });
         }

     </script>
</asp:Content>

