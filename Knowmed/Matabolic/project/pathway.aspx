<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
	<style>
		select {
			margin-top: 10px;
		}

		table thead td {
			font-weight: bold;
			background-color: #fff;
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
<div class="span10" id="divrelationShip" style="display:none">
			
	<div class="row-fluid">
		<div class="span12">
			<div class="span6">
				<table class="table table-bordered table-hover" id="tblStepBefore">
					<thead>
						<tr>
							<td class="td_keyword">Object</td>
							<td class="td_relation">Relationship</td>
							<td class="td_cause">In Presence of</td>
							<td class="td_action">Delete</td>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<div class="row-fluid">
				<select id="ddlKeywordbefore">
					<option value="0">--Select Object--</option>
				</select>
				<select id="ddlRelationshipbefore">
					<option value="0">--Select Relationship--</option>					
				</select>
				<select id="ddlcausebefore" multiple style="width:300px">
							
				</select>
				<i class="icon-plus-sign" onclick="AddStepBefore()"></i>Add 1 Setp before
			</div>
			<div class="row-fluid">

				<div style="margin-left: 7%; cursor:pointer">
					<select id="ddlCenterObject" onchange="getExistingKeyword()">
						<option value="0">--Select Object--</option>
					</select>
				</div>
			</div>
			<div class="row-fluid">
				<select id="ddlRelationshipAfter">
					<option value="0">--Select Relationship--</option>					
				</select>
				<select id="ddlKeywordAfter">
					<option value="0">--Select Object--</option>
				</select>
				<select id="ddlcauseAfter" multiple style="width:300px">
									
				</select>
				<i class="icon-plus-sign" onclick="AddStepAfter()"></i>Add 1 Setp After
			</div>

		</div>
	</div>
	<div class="row-fluid">
		<div class="span12">
			<div class="span6">
				<table class="table table-bordered" id="tblStepAfter">
					<thead>
						<tr>
							<td class="td_keyword">Object</td>
							<td class="td_relation">Relationship</td>
							<td class="td_cause">In Presence of</td>
							<td class="td_action">Delete</td>

						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span6">
			<center>
			<input type="button" value="Save" class="btn btn-success" onclick="save()" />
		</center>
		</div>
	</div>
</div>
	</div>
	<script src="customjs/pathway.js"></script>
</asp:Content>

