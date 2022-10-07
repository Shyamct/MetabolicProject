﻿//import { setTimeout } from "timers";

var oldDiseaseIds = receptorIds = processIds = oldProcessIds = '';
$(document).ready(function () {
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

function multiSelectDisease() {
    $('#ddlMolecule').multiselect({
        buttonWidth: '100%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Pathway',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}
function multiSelectReceptor() {
    $('#ddlReceptor').multiselect({
        buttonWidth: '100%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Receptor',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}
function multiSelectProcess() {
    $('#ddlProcess').multiselect({
        buttonWidth: '100%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Process',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}

function go() {

    getMoleculeCountReport();

}

function getMoleculeCountReport() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    };
    receptorIds = ($('#ddlReceptor').val()) ? $('#ddlReceptor').val().toString() : '';
    processIds = ($('#ddlProcess').val()) ? $('#ddlProcess').val().toString() : '';

    $("#showData").empty();
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getMoleculeCountReport",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'ids':'" + $('#ddlMolecule').val().toString() + "','processIds':'" + processIds + "','receptorIds':'" + receptorIds + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "','age':'" + $("#txtAge").val() + "','weight':'" + $("#txtWeight").val() + "','gender':'" + $("#ddlgenger option:selected").val() + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;
            var centralMoleculeList = JSON.parse(data.d).responseValue.Table1;
            var processList = JSON.parse(data.d).responseValue.Table2;
            var receptorList = JSON.parse(data.d).responseValue.Table3;


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
                th.innerHTML = col[i].split('$')[0];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < result.length; i++) {
                tr = table.insertRow(-1);
                for (var j = 0; j < col.length; j++) {

                    var item = $.grep(centralMoleculeList, function (element, index) {
                        return element.headName == col[j] && element.Molecule == result[i]['keyword'] && (result[i][col[j]] != null && result[i][col[j]] != '');
                    });
                    //console.log(item[0]);
                    var tabCell = tr.insertCell(-1);
                    if (j == 0) {
                        tabCell.innerHTML = i + 1;
                    } else {
                        if (result[i][col[j]] == 0 || result[i][col[j]] == null) {
                            tabCell.innerHTML = '';
                        } else if (j > 8) {
                            tabCell.innerHTML = '<a href="javascript:;" onclick="getDite(this,\'' + col[j] + '\')">' + (result[i][col[j]]) + '</a>';
                        } else {
                            tabCell.innerHTML = result[i][col[j]];
                        }
                    }
                    if (item.length > 0) {
                        $(tabCell).attr('style', 'background-color:' + item[0].color).attr('title', item[0].phenomenonName).css('color', '#fff');
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


            if ($('#ddlMolecule').val().toString() == '') {

                $('#divProcess').empty();
                $('#divProcess').append('<select id="ddlProcess" onchange="getProcessReceptor()"> </select>');

                setTimeout(function () {

                    $.each(processList, function () {
                        $("#ddlProcess").append('<option value="' + this.rankNo + '">' + this.rankName + '</option>');
                    });

                    $('#ddlProcess').prop("multiple", "multiple");
                    multiSelectProcess();
                    $("#ddlProcess").multiselect("clearSelection");

                }, 100);


                $('#divReceptor').empty();
                $('#divReceptor').append('<select id="ddlReceptor"> </select>');

                setTimeout(function () {

                    $.each(receptorList, function () {
                        $("#ddlReceptor").append('<option value="' + this.id + '">' + this.pathwayName + '</option>');
                    });

                    $('#ddlReceptor').prop("multiple", "multiple");
                    multiSelectReceptor();
                    $("#ddlReceptor").multiselect("clearSelection");

                }, 100);

            }

        },
        error: function (error) {

        }
    });
}

function getProcessReceptor() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (oldDiseaseIds != $('#ddlMolecule').val().toString()) {
        processIds = '';
    }
    else {
        processIds = ($('#ddlProcess').val()) ? $('#ddlProcess').val().toString() : '';
    }
    

    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getProcessReceptor",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pathwayIds':'" + $('#ddlMolecule').val().toString() + "','processIds':'" + processIds + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var processList = JSON.parse(data.d).responseValue.Table;
            var receptorList = JSON.parse(data.d).responseValue.Table1;

            if ($('#ddlMolecule').val().toString() == '') {
                $('#divProcess').empty();
                $('#divReceptor').empty();
                oldDiseaseIds = '';
            }
            else {

                if (oldDiseaseIds != $('#ddlMolecule').val().toString()) {

                    $('#divProcess').empty();
                    $('#divProcess').append('<select id="ddlProcess" onchange="getProcessReceptor()"> </select>');

                    setTimeout(function () {

                        $.each(processList, function () {
                            $("#ddlProcess").append('<option value="' + this.rankNo + '">' + this.rankName + '</option>');
                        });

                        $('#ddlProcess').prop("multiple", "multiple");
                        multiSelectProcess();
                        $("#ddlProcess").multiselect("clearSelection");

                    }, 100);


                    $('#divReceptor').empty();
                    $('#divReceptor').append('<select id="ddlReceptor"> </select>');

                    setTimeout(function () {

                        $.each(receptorList, function () {
                            $("#ddlReceptor").append('<option value="' + this.id + '">' + this.pathwayName + '</option>');
                        });

                        $('#ddlReceptor').prop("multiple", "multiple");
                        multiSelectReceptor();
                        $("#ddlReceptor").multiselect("clearSelection");
                                              
                    }, 100);

                }
                else {
                    if (oldProcessIds != $('#ddlProcess').val().toString() || $('#ddlProcess').val().toString() == '') {

                        $('#divReceptor').empty();
                        $('#divReceptor').append('<select id="ddlReceptor"> </select>');

                        setTimeout(function () {

                            $.each(receptorList, function () {
                                $("#ddlReceptor").append('<option value="' + this.id + '">' + this.pathwayName + '</option>');
                            });

                            $('#ddlReceptor').prop("multiple", "multiple");
                            multiSelectReceptor();
                            $("#ddlReceptor").multiselect("clearSelection");

                        }, 100);

                        oldProcessIds = $('#ddlProcess').val().toString();
                    }                   
                }

                oldDiseaseIds = $('#ddlMolecule').val().toString();
            }
        },
        error: function (error) {

        }
    });
}

function getAllHead() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        method: "Post",
        url: 'WebService/HeadMaster.asmx/getAllHead',
        dataType: 'json',
        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        contentType: 'application/json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                allResult = result.responseValue;
                //$("#ddlMolecule").empty();
                //$("#ddlMolecule").append('<option value="0">ALL</option>');
                //$.each(allResult, function () {
                //    $("#ddlMolecule").append('<option value="' + this.id + '">' + this.headName + '</option>');
                //});

                //$("#ddlProblem option").not(':first').remove();
                $("#ddlMolecule option:not(:first)").remove();
                $.each(allResult, function () {
                    $("#ddlMolecule").append('<option value="' + this.id + '">' + this.headName + '</option>');
                });

                if (!$('#ddlMolecule').prop("multiple")) {
                    $('#ddlMolecule').prop("multiple", "multiple");
                    multiSelectDisease();
                    $("#ddlMolecule").multiselect("clearSelection");
                }
            }
            //getMoleculeCountReport();
        }, error: function (error) {

        }
    });
}

$(function () {
    getAllHead();
    var height1 = ($(window).height() - $('#header').height() - 147);
    $("#showData").height(height1);

});

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

function getDite(e, item) {
    var keyword = $(e).closest('tr').find('td:eq(1)').text();
    $('#myModal').modal('show');
    $('.modal-title').text(keyword + ' of ' + item.split('$')[0]);

    $.ajax({
        type: "POST",
        url: "WebService/signalingCascade1.asmx/getSignalingCascade",
        contentType: 'application/json',
        dataType: 'json',
        // data: "{'keyword': '" + keyword + "','pathwayid':'" + item.split('$')[1] + "','empid':'" + keyword + "'}",
        data: "{'diseaseID':'" + item.split('$')[1] + "','pageIndex':'1','pageSize':'10000','processID':'0','signalingID':'0','foodFamily':'','interactedNutrient':'','cascadeNutrient':'" + keyword + "','empid':'" + keyword + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var nutrientList = result.Table;
            var beneficialActivatorNutrientList = result.Table1;
            var beneficialActivatorFoodList = result.Table2;
            var beneficialInhibitorNutrientList = result.Table3;
            var beneficialInhibitorFoodList = result.Table4;
            var harmfulActivatorNutrientList = result.Table5;
            var harmfulActivatorFoodList = result.Table6;
            var harmfulInhibitorNutrientList = result.Table7;
            var harmfulInhibitorFoodList = result.Table8;
            var beneficialActivatorfoodFamilyList = result.Table9;
            var beneficialInhibitorfoodFamilyList = result.Table10;
            var harmfulActivatorfoodFamilyList = result.Table11;
            var harmfulInhibitorfoodFamilyList = result.Table12;
            var totalCountList = result.Table13;
            var processList = result.Table14;
            var signalingList = result.Table15;
            var process = result.Table16;

            if (nutrientList == null) {
                $("#divLoader").hide();
            }
            else {
                var mytable = '<table class="table" border="1" rules="all"><thead> <tr> <th colspan="2">What To Eat</th> <th>Signaling Cascade </th> <th colspan="2">What Not To Eat</th> </tr> <tr> <th>Activator</th> <th>Inhibitor</th> <th rowspan="2"></th> <th>Activator</th> <th>Inhibitor</th> </tr> </thead> <tbody>';

                $.each(nutrientList, function () {
                    mytable += '<tr> <td style="vertical-align: top; width: 21%;"><table class="myTable" style="width:100%;" id="ul_WTEActivator_' + this.nutrientID + '"></table><table class="myTable" style="width:100%;" id="ul_WTEActivatorFood_' + this.nutrientID + '"></table></td> <td style="vertical-align: top; width: 21%;"> <table class="myTable" style="width:100%;" id="ul_WTEInhibitor_' + this.nutrientID + '"></table><table class="myTable" style="width:100%;" id="ul_WTEInhibitorFood_' + this.nutrientID + '"></table></td> <td style="vertical-align: top; width: 16%;"><div style="width: 100%;" onclick="getNutrientFunction(' + this.nutrientID + ')"><div style="cursor:pointer; width: 100%; text-align:center;">' + this.nutrientName + '</div><ul style="margin-top:1rem;" id="ul_NutrientFunction_' + this.nutrientID + '"></ul></div> </td> <td style="vertical-align: top; width: 21%;"><table class="myTable" style="width:100%;" id="ul_WNTEActivator_' + this.nutrientID + '"></table><table class="myTable" style="width:100%;" id="ul_WNTEActivatorFood_' + this.nutrientID + '"></table></td> <td style="vertical-align: top; width: 21%;"> <table class="myTable" style="width:100%;" id="ul_WNTEInhibitor_' + this.nutrientID + '"></table><table class="myTable" style="width:100%;" id="ul_WNTEInhibitorFood_' + this.nutrientID + '"></table></td> </tr>';
                });
                mytable += '</tbody></table>';
                if ($("#ddlDisease").children("option:selected").val() != 0) {
                    $("#myTable").html(mytable);
                } else {
                    $("#myTable").html('');
                }

                setTimeout(function () {

                    $.each(beneficialActivatorNutrientList, function () {
                        if (this.beneficialActivatorNutrients != null) {
                            $('#ul_WTEActivator_' + this.nutrientID).append('<tr><td style="border-top:none!important; padding-left:10px;"><div style="width:78%; float:left;"><span class="blink1">' + this.beneficialActivatorNutrients.toUpperCase() + '</span></div><div style="width:11%; float:left; font-weight:bold; font-size:1rem;"><span>O</span></div><div style="width:11%; float:right; font-weight:bold; font-size:1rem;"><span>F</span></div><br/><div style="width:100%; max-height:40rem; margin-bottom:10px; overflow:auto;"><table style="width:100%;" id="ul_WTEActivatorFoodList_' + this.beneficialActivatorNutrientIDs + this.nutrientID + '"></table></div></tr></td>');
                        }
                    });

                    $.each(beneficialActivatorFoodList, function () {
                        if (this.beneficialActivatorFoods != null) {
                            $('#ul_WTEActivatorFood_' + this.nutrientID).append('<tr><td style="border-top:none!important;"><div style="width:80%; float:left; color:#8a5ea5;"> ' + this.beneficialActivatorFoods + '</div></td></tr>');
                        }
                    });

                    $.each(harmfulInhibitorNutrientList, function () {
                        if (this.harmfulInhibitorNutrients != null) {
                            $('#ul_WTEInhibitor_' + this.nutrientID).append('<tr><td style="border-top:none!important; padding-left:10px;"><div style="width:78%; float:left;"><span class="blink1">' + this.harmfulInhibitorNutrients.toUpperCase() + '</span></div><div style="width:11%; float:left; font-weight:bold; font-size:1rem;"><span>O</span></div><div style="width:11%; float:right; font-weight:bold; font-size:1rem;"><span>F</span></div><br/><div style="width:100%; max-height:40rem; margin-bottom:10px; overflow:auto;"><table style="width:100%;" id="ul_WTEInhibitorFoodList_' + this.harmfulInhibitorNutrientIDs + this.nutrientID + '"></table></div></tr></td>');
                        }
                    });

                    $.each(harmfulInhibitorFoodList, function () {
                        if (this.harmfulInhibitorFoods != null) {
                            $('#ul_WTEInhibitorFood_' + this.nutrientID).append('<tr><td style="border-top:none!important;"><div style="width:80%; float:left; color:#8a5ea5;"> ' + this.harmfulInhibitorFoods + '</div></td></tr>');
                        }
                    });

                    $.each(harmfulActivatorNutrientList, function () {
                        if (this.harmfulActivatorNutrients != null) {
                            $('#ul_WNTEActivator_' + this.nutrientID).append('<tr><td style="border-top:none!important; padding-left:10px;"><div style="width:78%; float:left;"><span class="blink2">' + this.harmfulActivatorNutrients.toUpperCase() + '</span></div><div style="width:11%; float:left; font-weight:bold; font-size:1rem;"><span>O</span></div><div style="width:11%; float:right; font-weight:bold; font-size:1rem;"><span>F</span></div><br/><div style="width:100%; max-height:40rem; margin-bottom:10px; overflow:auto;"><table style="width:100%;" id="ul_WNTEActivatorFoodList_' + this.harmfulActivatorNutrientIDs + this.nutrientID + '"></table></div></tr></td>');
                        }
                    });

                    $.each(harmfulActivatorFoodList, function () {
                        if (this.harmfulActivatorFoods != null) {
                            $('#ul_WNTEActivatorFood_' + this.nutrientID).append('<tr><td style="border-top:none!important;"><div style="width:80%; float:left; color:#8a5ea5;"> ' + this.harmfulActivatorFoods + '</div></td></tr>');
                        }
                    });

                    $.each(beneficialInhibitorNutrientList, function () {
                        if (this.beneficialInhibitorNutrients != null) {
                            $('#ul_WNTEInhibitor_' + this.nutrientID).append('<tr><td style="border-top:none!important; padding-left:10px;"><div style="width:78%; float:left;"><span class="blink2">' + this.beneficialInhibitorNutrients.toUpperCase() + '</span></div><div style="width:11%; float:left; font-weight:bold; font-size:1rem;"><span>O</span></div><div style="width:11%; float:right; font-weight:bold; font-size:1rem;"><span>F</span></div><br/><div style="width:100%; max-height:40rem; margin-bottom:10px; overflow:auto;"><table style="width:100%;" id="ul_WNTEInhibitorFoodList_' + this.beneficialInhibitorNutrientIDs + this.nutrientID + '"></table></div></tr></td>');
                        }
                    });

                    $.each(beneficialInhibitorFoodList, function () {
                        if (this.beneficialInhibitorFoods != null) {
                            $('#ul_WNTEInhibitorFood_' + this.nutrientID).append('<tr><td style="border-top:none!important;"><div style="width:80%; float:left; color:#8a5ea5;"> ' + this.beneficialInhibitorFoods + '</div></td></tr>');
                        }
                    });

                }, 0);

                setTimeout(function () {

                    $.each(beneficialActivatorfoodFamilyList, function () {
                        if (this.beneficialActivatorfoodFamily != null) {
                            if (this.commonBeneficialActivatorfoodFamilyIDs == 1) {

                                $('#ul_WTEActivatorFoodList_' + this.beneficialActivatorNutrientIDs + this.nutrientID).append('<tr><td style="border-top:none!important; cursor:pointer;"><div style="width:80%; float:left; color:#1e00f6;" onclick="getFood(' + this.beneficialActivatorfoodFamilyIDs + ',' + this.beneficialActivatorNutrientIDs + ',' + this.nutrientID + ',\'B\');">' + this.beneficialActivatorfoodFamily + '</div><div style="width:10%; float:right;" onclick="getFoodFamilyDetails(' + this.beneficialActivatorfoodFamilyIDs + ', \'F\');"> <svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.notEatNutrientValue + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div></div><div style="width:10%; float:right;" onclick="getFoodFamilyDetails(' + this.beneficialActivatorfoodFamilyIDs + ', \'O\');"> <svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.totalNotEatNutrientValue + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div><table style="width:100%;" id="ul_Food_' + this.beneficialActivatorfoodFamilyIDs + this.beneficialActivatorNutrientIDs + this.nutrientID + 'B"></table></td></tr>');

                            }
                            else {
                                $('#ul_WTEActivatorFoodList_' + this.beneficialActivatorNutrientIDs + this.nutrientID).append('<tr><td style="border-top:none!important; cursor:pointer;"><div style="width:80%; float:left; color:#8a5ea5; min-height:25px!important;" onclick="getFood(' + this.beneficialActivatorfoodFamilyIDs + ',' + this.beneficialActivatorNutrientIDs + ',' + this.nutrientID + ');">' + this.beneficialActivatorfoodFamily + '</div><table style="width:100%;" id="ul_Food_' + this.beneficialActivatorfoodFamilyIDs + this.beneficialActivatorNutrientIDs + this.nutrientID + 'B"></table></td></tr>');
                            }
                        }
                    });

                    $.each(harmfulInhibitorfoodFamilyList, function () {
                        if (this.harmfulInhibitorfoodFamily != null) {
                            if (this.commonHarmfulInhibitorfoodFamilyIDs == 1) {

                                $('#ul_WTEInhibitorFoodList_' + this.harmfulInhibitorNutrientIDs + this.nutrientID).append('<tr><td style="border-top:none!important; cursor:pointer;"><div style="width:80%; float:left; color:#1e00f6;" onclick="getFood(' + this.harmfulInhibitorfoodFamilyIDs + ',' + this.harmfulInhibitorNutrientIDs + ',' + this.nutrientID + ',\'B\');">' + this.harmfulInhibitorfoodFamily + '</div><div style="width:10%; float:right;" onclick="getFoodFamilyDetails(' + this.harmfulInhibitorfoodFamilyIDs + ', \'F\');"> <svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.notEatNutrientValue + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div><div style="width:10%; float:right;" onclick="getFoodFamilyDetails(' + this.harmfulInhibitorfoodFamilyIDs + ', \'O\');"> <svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.totalNotEatNutrientValue + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div><table style="width:100%;" id="ul_Food_' + this.harmfulInhibitorfoodFamilyIDs + this.harmfulInhibitorNutrientIDs + this.nutrientID + 'B"></table></td></tr>');
                            }
                            else {
                                $('#ul_WTEInhibitorFoodList_' + this.harmfulInhibitorNutrientIDs + this.nutrientID).append('<tr><td style="border-top:none!important; cursor:pointer;"><div style="width:80%; float:left; color:#8a5ea5; min-height:25px!important;" onclick="getFood(' + this.harmfulInhibitorfoodFamilyIDs + ',' + this.harmfulInhibitorNutrientIDs + ',' + this.nutrientID + ');">' + this.harmfulInhibitorfoodFamily + '</div><table style="width:100%;" id="ul_Food_' + this.harmfulInhibitorfoodFamilyIDs + this.harmfulInhibitorNutrientIDs + this.nutrientID + 'B"></table></td></tr>');
                            }
                        }
                    });

                    $.each(harmfulActivatorfoodFamilyList, function () {
                        if (this.harmfulActivatorfoodFamily != null) {
                            if (this.commonHarmfulActivatorfoodFamilyIDs == 1) {

                                $('#ul_WNTEActivatorFoodList_' + this.harmfulActivatorNutrientIDs + this.nutrientID).append('<tr><td style="border-top:none!important; cursor:pointer;"><div style="width:80%; float:left; color:#1e00f6;" onclick="getFood(' + this.harmfulActivatorfoodFamilyIDs + ',' + this.harmfulActivatorNutrientIDs + ',' + this.nutrientID + ',\'H\');">' + this.harmfulActivatorfoodFamily + '</div><div style="width:10%; float:right;" onclick="getFoodFamilyDetails(' + this.harmfulActivatorfoodFamilyIDs + ', \'F\');"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="red" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="green" stroke-width="10" stroke-dasharray="calc(' + this.eatNutrientValue + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div><div style="width:10%; float:right;" onclick="getFoodFamilyDetails(' + this.harmfulActivatorfoodFamilyIDs + ', \'O\');"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="red" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="green" stroke-width="10" stroke-dasharray="calc(' + this.totalEatNutrientValue + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div><table style="width:100%;" id="ul_Food_' + this.harmfulActivatorfoodFamilyIDs + this.harmfulActivatorNutrientIDs + this.nutrientID + 'H"></table></td></tr>');
                            }
                            else {
                                $('#ul_WNTEActivatorFoodList_' + this.harmfulActivatorNutrientIDs + this.nutrientID).append('<tr><td style="border-top:none!important; cursor:pointer;"><div style="width:80%; float:left; color:#8a5ea5; min-height:25px!important;" onclick="getFood(' + this.harmfulActivatorfoodFamilyIDs + ',' + this.harmfulActivatorNutrientIDs + ',' + this.nutrientID + ');">' + this.harmfulActivatorfoodFamily + '</div><table style="width:100%;" id="ul_Food_' + this.harmfulActivatorfoodFamilyIDs + this.harmfulActivatorNutrientIDs + this.nutrientID + 'H"></table></td></tr>');
                            }
                        }
                    });

                    $.each(beneficialInhibitorfoodFamilyList, function () {
                        if (this.beneficialInhibitorfoodFamily != null) {
                            if (this.commonBeneficialInhibitorfoodFamilyIDs == 1) {

                                $('#ul_WNTEInhibitorFoodList_' + this.beneficialInhibitorNutrientIDs + this.nutrientID).append('<tr><td style="border-top:none!important; cursor:pointer;"><div style="width:80%; float:left; color:#1e00f6;" onclick="getFood(' + this.beneficialInhibitorfoodFamilyIDs + ',' + this.beneficialInhibitorNutrientIDs + ',' + this.nutrientID + ',\'H\');">' + this.beneficialInhibitorfoodFamily + '</div><div style="width:10%; float:right;" onclick="getFoodFamilyDetails(' + this.beneficialInhibitorfoodFamilyIDs + ', \'F\');"> <svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="red" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="green" stroke-width="10" stroke-dasharray="calc(' + this.eatNutrientValue + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div><div style="width:10%; float:right;" onclick="getFoodFamilyDetails(' + this.beneficialInhibitorfoodFamilyIDs + ', \'O\');"> <svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="red" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="green" stroke-width="10" stroke-dasharray="calc(' + this.totalEatNutrientValue + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div><table style="width:100%;" id="ul_Food_' + this.beneficialInhibitorfoodFamilyIDs + this.beneficialInhibitorNutrientIDs + this.nutrientID + 'H"></table></td></tr>');
                            }
                            else {
                                $('#ul_WNTEInhibitorFoodList_' + this.beneficialInhibitorNutrientIDs + this.nutrientID).append('<tr><td style="border-top:none!important; cursor:pointer;"><div style="width:80%; float:left; color:#8a5ea5; min-height:25px!important;" onclick="getFood(' + this.beneficialInhibitorfoodFamilyIDs + ',' + this.beneficialInhibitorNutrientIDs + ',' + this.nutrientID + ');">' + this.beneficialInhibitorfoodFamily + '</div><table style="width:100%;" id="ul_Food_' + this.beneficialInhibitorfoodFamilyIDs + this.beneficialInhibitorNutrientIDs + this.nutrientID + 'H"></table></td></tr>');
                            }
                        }
                    });


                    $("#ddlPageSize").css('visibility', 'visible');
                    var totalCount = parseInt(totalCountList[0].totalCount);
                    var pageNo = 0;
                    var pageSize = parseInt($('#ddlPageSize').val());
                    console.log(totalCount);
                    $('#pagination').empty();
                    for (var i = 0; i <= totalCount; i = i + pageSize) {
                        pageNo = pageNo + 1;
                        $('#pagination').append('<a href="javascript:getSignalingCascade(' + pageNo + ');" id="page_' + pageNo + '" >' + pageNo + '</a>');
                    }

                }, 0);

                setTimeout(function () {

                    $("#page_" + parseInt(totalCountList[0].pageIndex)).addClass("active");

                }, 0);

                console.log(signalingList);
                if (diseaseID != $('#ddlDisease').val()) {
                    diseaseID = $('#ddlDisease').val();
                    processID = $('#ddlProcess').val();

                    $("#ddlProcess option:not(:first)").remove();
                    $.each(processList, function () {
                        $("#ddlProcess").append('<option value="' + this.rank + '">' + this.rankName + '</option>');
                    });

                    $("#ddlSignaling option:not(:first)").remove();
                    $.each(signalingList, function () {
                        $("#ddlSignaling").append('<option value="' + this.receptorID + '">' + this.receptorName + '</option>');
                    });
                }
                if (processID != $('#ddlProcess').val()) {
                    processID = $('#ddlProcess').val();

                    $("#ddlSignaling option:not(:first)").remove();
                    $.each(signalingList, function () {
                        $("#ddlSignaling").append('<option value="' + this.receptorID + '">' + this.receptorName + '</option>');
                    });
                }

                $("#myTable table tbody tr").each(function () {
                    var row = $(this);
                    for (var i = 0; i < process.length; i++) {
                        var signalingText = row.find('td:eq(2)').text().replace(/(\r\n|\n|\r)/gm, "");
                        if (signalingText.indexOf(process[i].phenomenon) > -1) {
                            if (!signalingText.match(process[i].process)) {
                                row.find('td:eq(2)').append(process[i].process + '<br>');
                            }
                        }
                    }
                });
            }

        },
        error: function (error) {

        }
    });

}