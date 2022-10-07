<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">	
	<style>
		text{
			cursor: pointer
		}
		
	</style>
	<link href="assets/dist/themes/default/style.min.css" rel="stylesheet" />
	<div class="row-fluid">
		<div class="span3">
			<div id="rootFolder" class="" style="margin-top:1em; height:350px;"></div>
		</div>
		<div class="span9 text-center" style="border: 1px solid #dcdcdc;padding:10px; height:500px; position: relative;" id="showSVGImage"></div>
	</div><script src="js/SVGPanZoom.js"></script>
	<script src="customjs/dashboad.js"></script>


</asp:Content>

