<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" AutoEventWireup="true"%>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
     <link href="customCSS/markerPhenomenon.css"  rel="stylesheet"/>
    <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
     <script src="../../script/global.js"></script>
    <script src="js/bootstrap-multiselect.js"></script>
    <script src="../../assets/js/jquery-ui.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <style>
       
      
        </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
     <div id="content">
        <div class="container-fluid">
          <div class="row p-5 bg-dark">
            <div class="col-md-3 d-flex">
              
              <label for="input-id" class="">Select Marker</label>
              <select id="dllMarker" class="form-control" onchange="getPathway();">
                <option value="" selected>--Select Marker--</option>
              </select>
              
            </div>
            <%--<div class="col-md-3 d-flex">
                <label for="input-id" class="">Select Pathway</label>
              <select id="dllPathway" class="form-control">
                <option value="" selected>--Select Pathway--</option>
              </select>
            </div>--%>
            <div class="col-md-3">

            </div>
            <div class="col-md-3">
                <button type="button" class="btn btn-primary btnProcess" onclick="showPhenonmenonList();">Process</button>
            </div>
          </div>
          <div class="row  p-5">
            <div class="col-md-12">
              
              <div class="table-responsive">
                <table class="table table-hover table-bordered" id="tblPhenomenonReport">
                  <thead>
                  <tr>
                        <th id="td_SrNo" >Sr. No.</th> 
                        <th id="td_Phenomenon">Process</th>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </table>
              </div>
              
            </div>
          </div> 
        </div>
    </div>
     <div id='loader' style='display: none;'>
        <img src='img/spinner.gif'>
    </div>
    <script src="customjs/markerPhenomenonReport.js"></script>
</asp:Content>

