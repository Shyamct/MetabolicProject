<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
      <script src="../../script/global.js"></script>
    <script src="js/bootstrap-multiselect.js"></script>
    <script src="../../assets/js/jquery-ui.js"></script>
    <script src="../../assets/js/jquery.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
     
<%--<nav>
    <ul class="mainH">  </ul>

</nav>--%>
 
    
 <script src="customjs/ShyamMaster.js"></script>
<style>
a {
  text-decoration: none;
}

nav {
  font-family: monospace;
}

mainH{

}

ul {
  background: darkorange;
  list-style: none;
  margin: 0;
  padding-left: 0;
}

li {
  color: #fff;
  background: darkorange;
  display: block;
  float: left;
  padding: 1rem;
  position: relative;
  text-decoration: none;
  transition-duration: 0.5s;
}
  
li a {
  color: #fff;
}

li:hover {
  background: red;
  cursor: pointer;
}

ul li ul {
  background: orange;
  visibility: hidden;
  opacity: 0;
  min-width: 5rem;
  position: absolute;
  transition: all 0.5s ease;
  margin-top: 1rem;
  left: 0;
  display: none;
}

ul li:hover > ul,
ul li ul:hover {
  visibility: visible;
  opacity: 1;
  display: block;
}

ul li ul li {
  clear: both;
  width: 100%;
}
</style>
</asp:Content>

