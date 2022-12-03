<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <%--<script src="css/patientDiet.js"></script>--%>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
     <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <style>
   .contnt {
    float: left;
    width: 100%;
    text-align: center;
}
   .bdr {
    border-right: 1px solid #813939;
}
         </style>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

      <div id="content" style="margin-left: 0px;">
       <div class="container-fluid" >
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                           
                            <input type="text" placeholder="Enter Marker"/>
                            <input type="button"  value="Search..." />

                        </div>
                    </div>
                </div>
            </div>
           <div class="contnt">
           <div class="row">
               <div class="col-md-6 bdr">
                   <div class="heding-div">
                   <h2>abc</h2>
               </div>
                   </div>
                <div class="col-md-6">
                     <div class="heding-div">
                   <h2>abc</h2> 
                     </div>
               </div>
               </div>
           </div>
        </div>
        </div>

    <script src="customjs/principalDiet.js"></script>
</asp:Content>

