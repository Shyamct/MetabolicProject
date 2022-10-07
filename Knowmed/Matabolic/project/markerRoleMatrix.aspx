<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" AutoEventWireup="true"  %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
  <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
  <link href="customCSS/markerRoleMatrix.css"  rel="stylesheet"/>
    <%--<script src="select2.min.js"></script>--%>
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
              
              
              <select id="dllNutrient" class="form-control">
                <option value="" selected>--Select Nutrient--</option>
              </select>
              
            </div>
            <div class="col-md-3 d-flex">
                  <button type="button" class="btn btn-primary btnMarker" onclick="showMarkerBaseMatrixReport();">Show Marker</button>
            </div>
            <div class="col-md-3  d-flex">
              <select id="dllPhenomenon" class="form-control">
                <option value="" selected>--Select Process--</option>
              </select></div>
            <div class="col-md-3  d-flex">
                <button type="button" class="btn btn-primary btnPhenomenon" onclick="showPhenonmenonBaseMatrixReport();">Show Process</button>
            </div>
          </div>
          <div class="row  p-5">
            <div class="col-md-12">
              
              <div id="divMatrix">
                
              </div>
              
            </div>
          </div> 
        </div>
    </div>
     <div id='loader' style='display: none;'>
        <img src='img/spinner.gif'>
    </div>
    <script src="customjs/markerRoleMatrix.js"></script>
</asp:Content>

