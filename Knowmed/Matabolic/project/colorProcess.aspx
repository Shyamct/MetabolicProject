<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
     <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>jQuery UI Autocomplete - Default functionality</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="content" style="margin-left: 0px;" >
        <div class="container-fluid" id="containterMAIN">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box WBheader">
                        <div class="widget-title WTheader">
                             <h3> Process Color Master</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="contnt">
               <div class="col-md-12">
                   <table id="tblProcess" style="width: 100%;">
                       <thead>
                           <th>SR NO.</th>
                           <th>Process Name</th>
                           <th>Color</th>
                           <th>Action</th>
                       </thead>
                       <tbody>

                       </tbody>
                   </table>
                </div>
                </div>
            </div>
        </div>
    
      <div class="modal" id="modelColor" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
           <div class="modal-header">
                        <h4 class="modal-title">Update Color</h4>
                    </div>
        <div class="modal-body">
         <input type="color" id="txtColor" class="form-control" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default colorBtn" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-default" onclick="updateColors()" data-dismiss="modal">Save</button>
        </div>
      </div>
    </div>
  </div>
    <script src="customjs/colorProcess.js"></script>
</asp:Content>

