<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master"%>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
 <%-- <%--<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">--%>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <%--<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>--%>
  <script src="https://cdn.jsdelivr.net/npm/leader-line-new@1.1.9/leader-line.min.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

  <style>
.btn {
  width: 30px;
  height: 30px;
  background: #FFF;
  border: 1px solid #005bac;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  color: #005bac;
   padding: 15px 10px 5px; 
  padding: 4px 7px 5px;
  position: fixed;
  text-align: center;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
	transition: all 0.3s ease;
  z-index: 1;
}
.btn:hover {
  background: #eef;
}

.zoom {
    bottom: 930px;
}

.zoom-out {
    bottom: 930px;
     float: left; 
    margin-left: 79px;
}
.zoom-init {
  bottom: 930px;
  margin-left: 156px;
}
      
      .row2 {
        width: 100%;
        
  /* width: 100%; */
  display: flex;
  flex-direction: row;
  
  
  /* justify-content: center; */
}
.block {
  /* width: 100%; */
  margin-right: 10%;
}
.block2 {
  /* width: 100%; */
  /* height: 500px; */
  /* height: 100vh; */
    overflow-x: auto;
    white-space: nowrap;
  /* margin-right: 10%; */
  align-items: center;
  
}

.block3 {
  /* width: 100%; */
  /* height: 100vh;
  width: 100vw; */
    display: inline-block;
   
    
}
.block3 {
    animation-duration: 4s;
  /* animation-iteration-count: infinite; */
  animation-name: example;
}
.block3Full {
  /* width: 100%; */
  height: 90vh;
  width: 100vw;
    display: inline-block;
    animation-duration: 4s;
  /* animation-iteration-count: infinite; */
  animation-name: example;
 
}

body{
overflow-x: scroll;
}
.myGroup {

    display: inline-block;
   
}
.myGroup2 {

display: inline-grid;
/* opacity: 0;
            transition: opacity 3s; */
/* transition: transform .8s cubic-bezier(0.42, 0, 0.15, 1.4); */
/* border:1px solid #fff; */

}
/*@keyframes example {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
     }
}*/
.nodes {
    border:1px solid #fff;
    width: fit-content;
    height: fit-content;
    /* padding: 10px; */
    display: inline-block;
    margin: 10px;
    animation-name: example;
  /* animation-duration: 10s; */
  animation-iteration-count: 3;
  
  
   
}
.nodes .specific {
 
    animation-name: example;
  /* animation-duration: 10s; */
  animation-iteration-count: 3;
  
   
}
.nodes4 {
    border:1px solid #fff;
    width: fit-content;
    height: fit-content;
    padding: 10px;
    position: relative;
}
.nodes5 {
    border:1px solid #fff;
    width: fit-content;
    height: fit-content;
    padding: 10px;
    position: relative;
}
.nodes6 {
    border:1px solid #fff;
    width: fit-content;
    height: fit-content;
    padding: 10px;
    position: relative;
}
.block {
    animation-duration: 4s;
  /* animation-iteration-count: infinite; */
  animation-name: example;
}
.block4 {
    animation-duration: 4s;
  /* animation-iteration-count: infinite; */
  animation-name: example;
}
/* .block3 {
  width: 300px;
  height: 500px;
  
  /* margin-right: 10%; */
  /* align-items: center;
} */
.container2 {
  width: 100%;
  height: 90vh;
  -webkit-transition: background-color 2s ease-out;
  -moz-transition: background-color 2s ease-out;
  -o-transition: background-color 2s ease-out;
  transition: background-color 2s ease-out;
 
}

    #headerm {
  position: absolute;
}
  .widget-title  ul {
    position: relative;
    top: 200px; left: 200px; 
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.widget-title li {
    position: absolute;
    -webkit-transition: all 2s linear;
    -moz-transition: all 2s linear;
    transition: all 2s linear;
}
  </style>


  <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                             <select id="ddlpathway">
                              <option value="" selected>--Select Marker--</option>
                             </select>
                           <ul>
                            <a class="btn zoom"><i class="fas fa-search-plus"></i></a>
                            <a class="btn zoom-out"><i class="fas fa-search-minus"></i></a>
                            <a class="btn zoom-init"><i class="fas fa-recycle"></i></a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
 </div>
 </div>


<%--<div class="container2">
    <div class="row2" id="row1"> </div>
</div>--%>
    <div class="container2" id="headerm">
    <div class="row2" id="row1"> </div>
</div>


 <script src="customjs/htmlProportion.js"></script>

</asp:Content>

