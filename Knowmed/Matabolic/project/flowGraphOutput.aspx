<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
	<link href="Flowchart/css/Clientorgchart.css" rel="stylesheet" />
	<link href="Flowchart/css/style.css" rel="stylesheet" />
	<script src="Flowchart/js/html2canvas.min.js"></script>
	<script src="Flowchart/js/clientorgchart.js"></script>
	<br />
	 <div id="chart-container"></div>
<br />
    <script src="customjs/flowGraphOutput.js"></script>
	
</asp:Content>

