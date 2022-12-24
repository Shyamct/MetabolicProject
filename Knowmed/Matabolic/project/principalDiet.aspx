<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <%--<script src="css/patientDiet.js"></script>--%>
    <%-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>--%>
    <script src="../../script/global.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>jQuery UI Autocomplete - Default functionality</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="/resources/demos/style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>

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
            border: 1px solid black;
            background: white;
            padding: 10px 0px;
            color: Black;
            position: sticky;
            top: 0px;
            z-index: 1;
        }

        .heding-div {
            max-height: 82vh;
            overflow-y: auto;
            overflow-x: hidden;
            min-height: 83vh;
        }

        .heading-act {
            border: 1px solid black;
            width: 100%;
            position: sticky;
            top: 42px;
            z-index: 1;
            background: #adada7;
            color: black;
        }

            .heading-act h3 {
                font-size: 16px;
                text-align: center;
                margin: 0;
                padding: 10px;
            }

        #loader {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 11;
        }

        .contnt {
            padding-left: 15px;
        }

        input.btnsrch {
            background: #FA9600;
            border: 1px solid #FA9600;
            padding: 4px 8px;
            margin-left: 7px;
            border-radius: 3px;
            color: #fff;
            font-size: 13px;
            font-weight: 600;
        }
    </style>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id='loader' style='display: none;'>
        <img src='img/spinner.gif'>
    </div>

    <div id="content" style="margin-left: 0px;" >
        <div class="container-fluid" id="GFG">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <input type="button" onclick="print()" value="PRINT" />
                           

                           <%-- <select id="ddlPathway" style="width: 12%;">
                                <option value="" selected>Select Pathway</option>
                            </select>

                            <input type="text" id="tags" placeholder="Enter Marker" />

                            <input type="button" onclick="getDiet()" value="Search" class="btnsrch" />--%>

                        </div>
                    </div>
                </div>
            </div>
            <div class="contnt">
                <div class="row" >
                    <div class="col-md-6 bdr">
                        <div class="heding-div">
                            <div class="heading-inn">
                                <h2>What To Eat</h2>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="heading-act">
                                        <h3>Activators</h3>
                                    </div>
                                    <div id="Activator">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="heading-act">
                                        <h3>Inhibitor</h3>
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
                                        <h3>Activators </h3>
                                    </div>
                                    <div id="Activator1">
                                    </div>

                                </div>
                                <div class="col-md-6">
                                    <div class="heading-act">
                                        <h3>Inhibitor</h3>
                                    </div>
                                    <div id="Inhivator1">
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
        function print() {
            var divContents = document.getElementById("GFG").innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>To Eat not To Eat</title>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(divContents);
            frameDoc.document.write('<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />')
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
        }
    </script>
    <script src="customjs/principalDiet.js"></script>
</asp:Content>

