<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <style>
        .btnExport {
            margin-right: 65px;
        }

        .icon-info-sign:before {
            content: "\f05a";
            position: absolute;
            font-size: 20px;
            text-align: right;
            right: 5px;
            top: 7px;
        }

        .plusSymbol:after {
            position: absolute;
            content: '\2719';
            font-size: 20px;
            text-align: right;
            right: 35px;
            top: 3px;
        }

        .modal-body.popup-decreption {
            position: relative;
            height: 40vh !important;
            max-height: 9650px;
            padding: 15px;
            overflow-y: auto;
            overflow: auto;
            text-align: center;
        }

        #mySidenav a {
            position: absolute;
            right: 10px;
            transition: 0.3s;
            padding: 10px;
            width: 0px;
            text-decoration: none;
            font-size: 20px;
            color: white;
            border-radius: 10px 0px 0px 10px;
        }

            #mySidenav a:hover {
                right: 10px;
                width: 30px;
                writing-mode: vertical-rl;
                font-size: 15px;
                text-align: center;
            }

        #btnNote {
            top: 120px;
            background-color: DarkGoldenRod;
        }

        #btnNoteShow {
            top: 210px;
            background-color: #555;
        }

        .modal-xl {
            width: 1190px;
            margin: 83px auto;
        }
    </style>
    <div id="content" style="margin-left: 0px;">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-info-sign"></i></span>
                            <h5>Select Disease</h5>
                            <select id="ddlDisease" onchange="getProcess()">
                                <option value="0">--Select Disease--</option>
                            </select>
                            <select id="ddlProcess" onchange="getprocessWiseData()">
                                <option value="0">--Select Process--</option>
                            </select>
                            <div class="pull-right">
                                <input type="button" class="btn btn-success btnExport" value="Export" onclick="exportTable()" />
                            </div>
                            <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                            <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>
                        </div>
                        <div class="widget-content">
                            <div id="showData" style="width: 100%; overflow: auto">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  <!-- Modal Description popup-->
     <div class="modal bd-example-modal-lg" id="modalDescription" role="dialog" >
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" id="btnClosed" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Page Description</h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black">
                   
                        <table class="table table-hover fixed_header" id="tblVechileDetails">
                <thead>
                    <tr>
                         <th class="td_SrNo">Sr. No.</th> 
                        <th class="td_heading">Heading</th>
                        <th class="td_color">Color</th>
                        <th class="td_image">Image</th>
                        <th class="td_description">Description</th>
                       <%-- <th class="td_location">Location <i class="fa fa-map-marker" aria-hidden="true"></i></th>--%>
                       <%-- <th class="td_mobileNo">Mobile No. <i class="fa fa-phone" aria-hidden="true"></i></th>--%>
                        <!-- <th class="td_Action">Action</th>            -->
                    </tr>
                    
                </thead>
                <tbody>
                    
                </tbody>
            </table>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnClose" class="btn btn-default">Close</button>
                </div>
            </div>
        </div>
         
    </div>

     <!-- Button trigger modal Input -->
    <div class="modal" id="addInfoModel" role="dialog">
        <div class="modal-dialog"; style="width: max-content;">
            <!-- Modal content-->
            <div class="modal-content" style="width: max-content;">
                <div class="modal-header">
                    <button type="button" class="close" id="btnCross" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add Description</h4>
                </div>
                <div class="modal-body" id="modelBody">
                    <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <div class="form-group col-md-3">
                            <label>Add Heading </label>
                            <input type="text" id="txtHeading" class="form-control" />
                        </div>
                         <div class="form-group col-md-3">
                            <label>Upload Image </label>
                            <input type="file" id="txtImage" class="form-control" />
                        </div>
                        <div class="form-group col-md-3">
                            <label>Add Color </label>
                            <input type="color" id="txtColor" class="form-control" />
                        </div>
                      <div class="form-group col-md-3">
                            <label>Description </label>
                           <textarea id="txtDescription" rows="6" cols="32"></textarea>
                        </div>
                        <div class="form-group">
                          <%-- <button type="button" class="btn btn-dark" id="btnAddNew" style="font-size: 15px;margin-left: 90%;">Add New <i class="fa fa-plus"></i></button>--%>
                      </div>
                        </div>
                        </div>
                  </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnSave" data-dismiss="modal">Save</button>
                <button type="button" class="btn btn-success" id="btnCancel" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
    </div>

    <div class="modal bd-example-modal-xl" id="showNote" role="dialog" >
        <div class="modal-dialog modal-xl">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" id="btnNotecross" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Page Note</h4>
                </div>
                <div class="modal-body popup-Note" style="color: black">
                            <table class="table table-hover fixed_header" id="tblShowNote">
                <thead>
                    <tr>
                        
                        <th class="td_Note">Note</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnNoteCancel" class="btn btn-default">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div id="mySidenav" class="sidenav">
     <a href="#" id="btnNote">Add Note </a>
     <a href="#" id="btnNoteShow">Show Note</a>
   </div>


    <script>
        $(function () {
            getDisease();
            var height1 = ($(window).height() - $('#header').height() - 147);
            $("#showData").height(height1);

            addNote();

            $("#btnAddNew").click(function () {
                // saveDescription();
            });
            $("#moreInfo").click(function () {
                $("#modalDescription").show();
                showDescription();
            });
            $("#btnClose").click(function () {
                $("#modalDescription").hide();
            });
            $("#btnClosed").click(function () {
                $("#modalDescription").hide();
            });
            $("#addInfo").click(function () {
                $("#addInfoModel").show();

            });
            $("#btnCross").click(function () {
                $("#addInfoModel").hide();
            });
            $("#btnSave").click(function () {
                if ($("#txtDescription").val() == "") {
                    alert("Description in mandatory");
                }
                else {
                    saveDescription();
                    alert('save successfull');
                }
            });
            $("#btnCancel").click(function () {
                $("#addInfoModel").hide();
            });

            $("#btnNoteShow").click(function () {
                $("#showNote").show();
                showPageNote();
            });
            $("#btnNotecross").click(function () {
                $("#showNote").hide();
            });
            $("#btnNoteCancel").click(function () {
                $("#showNote").hide();
            });
        });




        function saveDescription() {
            var obj;
            if (!UtilsCache.getSession('USERDETAILS')) {
                window.location.href = "../../index.html";
                return;
            }
            var image = '';
            var files = $('#txtImage').get(0).files;
            if (files.length === 0) {
                var pageUrlnew = $(location).attr("href").split('/');
                var pageURL = pageUrlnew[pageUrlnew.length - 1];
                var heading = $('#txtHeading').val();
                var color = $('#txtColor').val();
                var description = $('#txtDescription').val();


                obj = {
                    "pageName": pageURL,
                    "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
                    "heading": heading,
                    "color": color,
                    "image": image,
                    "description": description
                }

                $.ajax({
                    type: "POST",
                    url: "WebService/pageDescription.asmx/insertDescription",
                    data: obj,
                    //contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        alert('save successfull');
                    },
                    error: function (data) {

                    }
                });
            }
            else {
                var imageFile = new FormData();
                imageFile.append(files[0].name, files[0]);
                var timeStamp = event.timeStamp;
                $.ajax({
                    url: "FileUploadHandler.ashx?timestamp=" + timeStamp,
                    data: imageFile,
                    processData: false,
                    contentType: false,
                    async: false,
                    type: 'POST',
                    success: function (data) {
                        console.log(data);
                        image = data[0];
                        var pageUrlnew = $(location).attr("href").split('/');
                        var pageURL = pageUrlnew[pageUrlnew.length - 1];//str.replace(/.*\/(\w+)\/?$/, '$1');//$(location).attr("href").lastIndexOf('/') + 1;

                        var heading = $('#txtHeading').val();

                        var color = $('#txtColor').val();

                        var description = $('#txtDescription').val();
                        obj = {
                            "pageName": pageURL,
                            "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
                            "heading": heading,
                            "color": color,
                            "image": image,
                            "description": description
                        }

                        $.ajax({
                            type: "POST",
                            url: "WebService/pageDescription.asmx/insertDescription",
                            data: JSON.stringify(obj),
                            contentType: "application/json;",
                            dataType: "json",
                            success: function (data) {

                            },
                            error: function (data) {

                            }
                        });
                    },
                    error: function (errorData) {
                        maketoast('error', 'Error', "there was a problem uploading the file.");
                    }
                });
            }
            $("#txtHeading").val('');
            $("#txtImage").val('');
            $("#txtColor").val('');
            $("#txtDescription").val('');
        };

        function showDescription() {
            var pageUrlnew = $(location).attr("href").split('/');
            var pageURL = pageUrlnew[pageUrlnew.length - 1];

            // var userID = "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}";
            var obj = {
                "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
                "pageName": pageURL
            };

            $.ajax({
                type: "POST",
                url: "WebService/pageDescription.asmx/showDescription",
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(obj),
                statusCode: {
                    401: function (xhr) {
                        window.location.href = "../../index.html";
                    }
                },
                success: function (data) {
                    console.log(data);
                    var r = JSON.parse(data.d).responseValue;

                    $("#tblVechileDetails tbody tr").remove();
                    var base_url = window.location.origin;
                    $.each(r.Table, function (i) {

                        var row = $("#tblVechileDetails thead tr").clone();
                        $('.td_SrNo', row).text(i + 1);
                        $('.td_heading', row).text(this.heading);
                        var colorh = '<button type="button" class="btn" style="background-color:' + this.color + '" height="5" width="10"></button>';
                        var imagePath = base_url + '/Matabolic/project/GraphPDF/' + this.image;

                        var iamgeh = '<img src="' + imagePath + '" height="50" width="50">';

                        $('.td_color', row).append(colorh);
                        $('.td_image', row).append(iamgeh);
                        $('.td_description', row).text(this.details);
                        $("#tblVechileDetails tbody").append(row);
                        row = $("#tblVechileDetails body tr:last").clone();
                    });
                },
                error: function (error) {

                }
            });
        }


        function addNote() {
            $("#btnNote").click(function () {
                var pageUrlnew = $(location).attr("href").split('/');
                var pageURL = pageUrlnew[pageUrlnew.length - 1];
                window.open("Note.aspx?" + pageURL);

            });
        }
        function showPageNote() {
            var pageUrlnew = $(location).attr("href").split('/');
            var pageURL = pageUrlnew[pageUrlnew.length - 1];

            var obj = {
                "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
                "pageName": pageURL
            };
            $.ajax({
                type: "POST",
                url: "WebService/pageDescription.asmx/showNote",
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(obj),
                statusCode: {
                    401: function (xhr) {
                        window.location.href = "../../index.html";
                    }
                },
                success: function (data) {

                    var r = JSON.parse(data.d).responseValue;
                    $("#tblShowNote tbody tr").remove();
                    $.each(r.Table, function (i) {
                        var row = $("#tblShowNote thead tr").clone();
                       

                        //var notee = '<span "' + this.note + '"></span>';

                        $('.td_Note', row).html(this.note);

                        $("#tblShowNote tbody").append(row);
                        row = $("#tblShowNote body tr:last").clone();
                    });
                },
                error: function (error) {

                }
            });
        }
        function getDisease() {
            $.ajax({
                type: "POST",
                url: "WebService/pathwayMain1.asmx/getDisease",
                contentType: 'application/json',
                dataType: 'json',
                //statusCode: {
                //	401: function (xhr) {
                //		window.location.href = "../../index.html";
                //	}
                //},
                success: function (data) {
                    var result = JSON.parse(data.d).responseValue;
                    $("#ddlDisease option:not(:first)").remove();
                    $.each(result.Table, function () {
                        $("#ddlDisease").append('<option value="' + this.id + '">' + this.headName + '</option>');

                    })
                },
                error: function (error) {

                }
            });
        };

        function getProcess() {
            $.ajax({
                type: "POST",
                url: "WebService/pathwayMain1.asmx/getProcess",
                contentType: 'application/json',
                dataType: 'json',
                data: "{'id':'" + Number($("#ddlDisease option:selected").val()) + "'}",
                //statusCode: {
                //	401: function (xhr) {
                //		window.location.href = "../../index.html";
                //	}
                //},
                success: function (data) {
                    var result = JSON.parse(data.d).responseValue;
                    $("#ddlProcess option:not(:first)").remove();
                    $.each(result.Table, function () {
                        $("#ddlProcess").append('<option value="' + this.id + '">' + this.rankName + '</option>');

                    })
                },
                error: function (error) {

                }
            });
        }

        function getprocessWiseData() {
            $.ajax({
                type: "POST",
                url: "WebService/pathwayMain1.asmx/getprocessWiseData",
                contentType: 'application/json',
                dataType: 'json',
                data: "{'id':'" + Number($("#ddlProcess option:selected").val()) + "','pathwayId':'" + Number($("#ddlDisease option:selected").val()) + "'}",
                //statusCode: {
                //	401: function (xhr) {
                //		window.location.href = "../../index.html";
                //	}
                //},
                success: function (data) {
                    var result = JSON.parse(data.d).responseValue.Table;
                    var col = ['#'];
                    for (var i = 0; i < result.length; i++) {
                        for (var key in result[i]) {
                            if (col.indexOf(key) === -1) {
                                col.push(key);
                            }
                        }
                    }

                    // CREATE DYNAMIC TABLE.
                    var table = document.createElement("table");
                    table.className = 'table table-bordered table-striped';
                    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

                    var tr = table.insertRow(-1);                   // TABLE ROW.

                    for (var i = 0; i < col.length; i++) {
                        var th = document.createElement("th");      // TABLE HEADER.
                        th.innerHTML = col[i];
                        tr.appendChild(th);
                    }

                    // ADD JSON DATA TO THE TABLE AS ROWS.
                    for (var i = 0; i < result.length; i++) {
                        tr = table.insertRow(-1);
                        for (var j = 0; j < col.length; j++) {
                            var tabCell = tr.insertCell(-1);
                            if (j == 0) {
                                tabCell.innerHTML = i + 1;
                            } else {
                                if (result[i][col[j]] == 0) {
                                    tabCell.innerHTML = '';
                                } else {
                                    tabCell.innerHTML = result[i][col[j]];
                                }
                            }

                        }
                    }

                    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
                    var divContainer = document.getElementById("showData");
                    divContainer.innerHTML = "";
                    divContainer.appendChild(table);
                    //var height = ($(window).height() - $('.navbar-fixed-top').height()) - 140;
                    //$('table').Scrollable({
                    //    ScrollHeight: height
                    //});
                    $('th').click(function () {
                        var table = $(this).parents('table').eq(0);
                        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
                        this.asc = !this.asc;
                        if (!this.asc) { rows = rows.reverse() }
                        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
                    });
                    function comparer(index) {
                        return function (a, b) {
                            var valA = getCellValue(a, index), valB = getCellValue(b, index)
                            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
                        };
                    }
                    function getCellValue(row, index) { return $(row).children('td').eq(index).text() }
                },
                error: function (error) {

                }
            });
        }

        function exportTable() {
            $("table").table2excel({
                // exclude CSS class
                exclude: ".noExl",
                name: "Worksheet Name",
                filename: "Molecule", //do not include extension
                fileext: ".xls", // file extension
                preserveColors: true

            });
        }
    </script>
</asp:Content>

