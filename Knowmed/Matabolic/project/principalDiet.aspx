<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <%--<script src="css/patientDiet.js"></script>--%>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <style>
        .contnt {
            float: left;
            width: 100%;
            text-align: center;
        }

        .bdr {
            border-right: 1px solid #813939;
        }

        div#Activator span {
            width: 100%;
            display: block;
            padding: 5px;
            border: 1px solid #cdcdcd;
            margin-bottom: 5px;
            font-weight: 600;
        }

        div#Inhivator span {
            width: 100%;
            display: block;
            padding: 5px;
            border: 1px solid #cdcdcd;
            margin-bottom: 5px;
            font-weight: 600;
        }

        div#Activator1 span {
            width: 100%;
            display: block;
            padding: 5px;
            border: 1px solid #cdcdcd;
            margin-bottom: 5px;
            font-weight: 600;
        }

        div#Inhivator1 span {
            width: 100%;
            display: block;
            padding: 5px;
            border: 1px solid #cdcdcd;
            margin-bottom: 5px;
            font-weight: 600;
        }

        .heading-inn h2 {
            font-size: 20px;
            font-weight: 600;
            width: 100%;
            margin: 0;
        }

        .heading-inn {
            background: #949a9f;
            padding: 10px 0px;
            color: #fff;
            position: sticky;
            top: 0px;
        }

        .heding-div {
            padding: 0px 10px;
            max-height: 82vh;
            overflow: auto;
        }

        .heading-act {
            width: 100%;
        }

            .heading-act h3 {
                font-size: 16px;
                text-align: center;
                margin: 0;
                padding: 10px;
            }
    </style>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">

                            <input type="text" placeholder="Enter Marker" />
                            <input type="button" value="Search..." />

                        </div>
                    </div>
                </div>
            </div>
            <div class="contnt">
                <div class="row">
                    <div class="col-md-6 bdr">
                        <div class="heding-div">
                            <div class="heading-inn">
                                <h2>What To Eat</h2>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="heading-act">
                                        <h3>Activator</h3>
                                    </div>
                                    <div id="Activator">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="heading-act">
                                        <h3>Inhivator</h3>
                                    </div>
                                    <div id="Inhivator">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="heding-div">
                            <div class="heading-inn">
                                <h2>Not To Eat</h2>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="heading-act">
                                        <h3>Activator</h3>
                                    </div>
                                    <div id="Activator1">
                                       
                                    </div>

                                </div>
                                <div class="col-md-6">
                                    <div class="heading-act">
                                        <h3>Inhivator</h3>
                                    </div>
                                    <div id="Inhivator1">

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <%-- <div>
                <table class="table table-bordered table-responsive" id="tblReport">
                    <thead>

                        <th>BENEFICIAL</th>
                        <th>HARMFUL</th>
                        
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>--%>
        </div>
    </div>


    <script src="customjs/principalDiet.js"></script>
</asp:Content>

