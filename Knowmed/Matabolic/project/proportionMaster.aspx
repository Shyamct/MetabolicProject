<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <style>
         #content {
        margin-left:0px !important;
        }
    </style>
    <script src="../../js/cache.js"></script>
    <script src="go.js"></script>
    <script src="https://gojs.net/latest/extensions/DoubleTreeLayout.js"></script>
    
    <div id="content">
        <div class="container-fluid" style="padding: 0;">            
            <div class="row-fluid" style="margin-top: 0">               
                <div class="span12" id="span10">                   
                    <div id="sample">
                    </div>
                </div>
                <input type="button" class="btn btn-danger" value="Assign Symbol" onclick="getNotsigned()" />
            </div>
            <div class="row-fluid">
                <div id="myImages" style="display: none">
                </div>
            </div>
        </div>

        <div class="modal fade" id="signModel" style="width: 60%; left: 20%; display: none;" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                        <table class="table table-bordered" id="tblSign">
                            <thead>
                                <tr>
                                    <td class="td_from">From</td>
                                    <td class="td_relation">Relation</td>
                                    <td class="td_to">to</td>
                                    <td class="td_sign">Symbol</td>
                                    <td class="td_save"></td>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    <script src="customjs/proportionMaster.js"></script>
</asp:Content>

