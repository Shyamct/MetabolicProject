<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" AutoEventWireup="true"  %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"    ></script>
<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
     <style>
           #loader {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 11;
}
           table#tblReport tr td {
    font-size: 14px;
    line-height: 26px;
}
table#tblReport tr th {
    font-size: 15px;
}

 .abc tr td {
    font-size: 14px;
    line-height: 26px;
}
 .abc tr th {
    font-size: 15px;
}
 table#tblAllReport tr th {
    font-size: 16px;
    color: #000;
}
 table#tblAllReport tr td {
    font-size: 14px;
    padding: 5px 0px;
    line-height: 25px;
}
 table#tblMarker tr td {
    font-size: 14px;
    padding: 5px 10px;
    line-height: 25px;
}  
 .scoreDiv table tr th {
    position: sticky;
    z-index: 111;
    top: 0px;
    background: #b8bbbb !important;
    color: #000;
}
.scoreDiv {
    max-height: 78vh;
    overflow: auto;
    padding: 0 15px;
}
.tblallmrk {
    float: left;
    width: 100%;
}



</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <div id='loader' style='display: none;'>
        <img src='img/spinner.gif'>
    </div>

    <div id="content" style="margin-left: 0px; min-height: 95vh;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title" style="padding: 10px;height: auto;background: #fbfafa;">

                            <select id="ddlDisease"  style="width: 12%;border: 1px solid #ddd;padding: 5px 10px;border-radius: 5px;margin-right: 10px;font-size: 15px;height: 34px;">
                                <option value="" selected>Select Disease</option>
                            </select>

                            <input type="button" onclick="getHypothesisReport()" value="SHOW"  style="height: 31px; background:#fa9600;color: #fff;font-weight: 600;border: none;padding: 5px 15px;border-radius: 5px;" />
                            <input type="button" onclick="getAllHypothesisReport()" value="ALL Disease"  style="height: 31px; background:#fa9600;color: #fff;font-weight: 600;border: none;padding: 5px 15px;border-radius: 5px;" />

                            <input type="button" onclick="prints()" value="PRINT" / style="height: 31px; float: right;background: #d12020;color: #fff;font-weight: 600;border: none;padding: 5px 15px;border-radius: 5px;">

                           <%--  <div class="col-md-1" runat="server" id="divPrintBtn">
                         <input type="button" value="Print" id="btnPrint"  onclick="PrintDiv();" />
                          </div>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       <div class="container-fluid ">
           
 <table class="table table-bordered table-responsive abc" style="display:none">
                <thead>
                    <tr>
                    <th style="text-align: left;" width="5%">Sr No.</th>
                    <th style="text-align: left;" width="26%">Process</th>
                    <th style="text-align: left;" width="69%">Marker</th>
                    </tr>
                    
                </thead>

            </table>
           <div class="tblallmrk">
            <table class="table table-bordered table-responsive" id="tblReport">
                <thead>
                    <tr>
                     <th style="text-align: left;" width="5%">Sr No.</th>
                    <th style="text-align: left;" width="20%">Process</th>
                    <th style="text-align: left;" width="75%">Marker</th>
                    </tr>
                    
                </thead>

                <tbody>
                </tbody>
            </table>
</div>


               <div class="tblallmrk">
           <table class="table table-bordered table-responsive" id="tblAllReport" style="display:none">
                <thead>
                    <tr>
                     <th style="text-align: left;" width="5%">Sr No.s</th>
                    <th style="text-align: left;" width="20%">Disease Name</th>
                    <th style="text-align: left;" width="75%">Process Name</th>
                    </tr>
                    
                </thead>

                <tbody>
                </tbody>
            </table>
        </div>
    </div>
   </div>

        <div class="modal bd-example-modal-lg" id="modelHypothesisMarker" role="dialog">
        <div class="modal-dialog modal-xl" style="max-width: 1000px ; margin: 30px auto;width: 100% !important;">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close btnClose"  data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="tdHeader" style="color: black"> </h4>
                </div>
                <div class="modal-body scoreDiv">
                  <%--<div id="scoreBody"></div>--%> 
                    <table class="table table-bordered table-responsive" id="tblMarker">
                        <thead>  <tr>
                            <th style="font-size:18px;text-align:left"> Marker Name</th>
                        </tr>  </thead>
                        <tbody>

                        </tbody>
                    </table>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btnClose">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script src="customjs/hypothesis.js"></script>
</asp:Content>

