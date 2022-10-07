<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
	<style>
		

		#cy {
			height: 90%;
			width: 100%;
			position: absolute;
			left: 0;
			top: 5%;
		}
		
	</style>
	<script src="customjs/cytoscape.min.js"></script>
	<div class="row-fluid">
		<div id="cy"></div>
	</div>
	
	<script src="customjs/code.js"></script>
</asp:Content>

