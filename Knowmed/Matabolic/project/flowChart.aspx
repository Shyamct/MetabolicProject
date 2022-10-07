<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
	<link href="http://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
	<link href="Flowchart/css/jquery.orgchart.css" rel="stylesheet" />
	<style type="text/css">
		#orgChart {
			width: auto;
			height: auto;
		}

		#orgChartContainer {
			overflow: auto;
			background: #eeeeee;
		}
	</style>
	<div class="row-fluid">
		<div class="span2">
			<ul id="sideBar" class="nav nav-list bs-docs-sidenav nav-collapse collapse">
				<li>
					<a href="javascript:;" class="pathwayName">
						
						</a>
				</li>				
			</ul>
		</div>
		<div class="span10">
			<div id="orgChartContainer">
				<div id="orgChart"></div>
			</div>
		</div>
	</div>

	<script src="Flowchart/js/jquery.orgchart.js"></script>
    <script src="customjs/flowChart.js"></script>

</asp:Content>

