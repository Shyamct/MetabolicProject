<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .full-width {
            width: 100%;
        }
    </style>
    <script src="../../script/global.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-ok"></i></span>
                            <h5>Marker Report</h5>

                            <input type="button" value="Marker Report" title="Marker Report" onclick="getMarkerReport();" style="float: right" />
                            <input id="txtSearch" style="float: right; margin-right: 1rem; width: 20%;">
                        </div>
                        <div class="widget-content main" style="overflow-y: auto;">
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="widget-content nopadding">

                                        <table class="table table-bordered table-striped" id="tblMarkerReport">
                                            <thead>
                                                <tr>
                                                    <td class="td_Section">Section</td>
                                                    <td class="td_SubSection">Sub Section</td>
                                                    <td class="td_Count">Count</td>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(function () {
            var height1 = ($(window).height() - $('#header').height() - 146);
            $(".main").height(height1);
        });

        function getMarkerReport() {

            if (!UtilsCache.getSession('USERDETAILS')) {
                window.location.href = "../../index.html";
                return;
            }
            var searchedText = $('#txtSearch').val().trim();
            //if (isEmpty(searchedText)) {
            //    maketoast('error', 'Error', 'Please Enter Marker');
            //    return false;
            //}
            $.ajax({
                type: "POST",
                url: "WebService/SVGWebService.asmx/getMarkerReport",
                contentType: 'application/json',
                dataType: 'json',
                data: "{'markerName': '" + searchedText + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
                statusCode: {
                    401: function (xhr) {
                        window.location.href = "../../index.html";
                    }
                },
                success: function (data) {
                    var r = JSON.parse(data.d).responseValue;

                    var row = $("#tblMarkerReport thead tr:first").clone();
                    $("#tblMarkerReport tbody tr").remove();
                    $.each(r.Table, function () {
                        $('.td_Section', row).text(this.sectionName);
                        $('.td_SubSection', row).text(this.subSectionName);
                        $('.td_Count', row).text(this.itemCount);
                        $("#tblMarkerReport tbody").append(row);
                        row = $("#tblMarkerReport thead tr:first").clone();
                    });
                    //$('#modalMarker').modal('show');

                },
                error: function (error) {

                }
            });
        }
    </script>

</asp:Content>




