<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="css/patientDiet.js"></script>
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

    <script src="customjs/patientDiet.js"></script>
</asp:Content>

