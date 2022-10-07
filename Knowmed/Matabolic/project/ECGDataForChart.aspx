<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <style>
        .full-width {
            width: 100%;
        }

        .row-fluid {
            margin-bottom: 1rem;
        }

        .img-waves img {
            width: 100%;
        }

        .table-wave-section {
            margin-top: 10px;
            overflow-x: auto;
            overflow-y: auto;
            height: 54vh;
        }

        .table-wave {
            border-collapse: collapse;
            width: 100%;
        }

            .table-wave th {
                /* padding: 2px;   */
                font-size: 12px;
                text-align: center;
                border: 1px solid rgba(0, 0, 0, 0.226);
            }

            .table-wave td {
                /* padding: 2px;   */
                font-size: 12px;
                text-align: center;
                border: 1px solid rgba(0, 0, 0, 0.226);
            }

        .bg-green {
            background: green;
            color: white;
        }

        .bg-red {
            background: red;
            color: white;
        }

        .entire-br-none {
            border: 1px double transparent;
        }

        .main-tr:hover {
            background: #4caf5030 !important;
        }

        .main-tr:nth-child(odd) {
            background: #f2f2f2;
        }

        .bg-pr {
            background: #bc3305;
            color: white
        }

        .bg-qt {
            background: #1c4695;
            color: white;
        }

        .bg-date {
            background: #c1c1c1;
        }

        .fix-th th {
            position: sticky;
            top: -2px;
        }
    </style>


    <div class="container">
        <div class="img-waves">
            <img src="assets/images/waves.jpg" /></div>
        <hr>
       
        <div class="col-md-2">
            <select id="ddlLead" onchange="getECGData();">
                <option value="I">I</option>
            </select>
        </div>
        <div class="col-md-10">
            <input type="text" id="txtPID" placeholder="PID" onchange="getECGData();" />
        </div>
        <div class="table-wave-section">
           
        </div>
    </div>

    <script src="customjs/eCGDataForChart.js"></script>
</asp:Content>




