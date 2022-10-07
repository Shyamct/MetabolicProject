<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
	<link href="https://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
	<%--<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>--%>
	<script src="js/jointer.min.js"></script>
		<%--<script src="https://anseki.github.io/leader-line/js/leader-line.min.js"></script>--%>
	<style>
		.parent {
			display: table;
		}

		.child {
			display: table-cell;
			vertical-align: middle;
			/*padding-left: 20px;*/
			padding: 10px;
			white-space: nowrap;
		}

		#svgContainer {
			z-index: -10;
			position: absolute;
			background-color: transparent;
			/*opacity: 0.5;*/
		}
	</style>

	<style>
		.test {
			border: 1px solid #ff0000;
			margin-bottom: 10px;
			min-height: 150px;
			/*width: 100%;*/
			overflow: auto;
		}
	</style>
	<div class="row-fluid">
		<div class="span2">
			<ul id="sideBar" class="nav nav-list bs-docs-sidenav nav-collapse collapse">
				<li>
					<a href="javascript:;" class="pathwayName"></a>
				</li>
			</ul>
		</div>
		<div class="span10" id="span10" style="display: none">
			<div id="aa">
				<div id="svgContainer"></div>
				<div id="divrReceptor">
					<div class="test parent">
					</div>
				</div>
			</div>
		</div>
	</div>
    <script src="customjs/test.js"></script>
</asp:Content>



