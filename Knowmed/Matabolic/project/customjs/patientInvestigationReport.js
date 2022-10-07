$(document).ready(function () {
        getAllCategory();
    var height1 = ($(window).height() - $('#header').height() - 147);
    $("#showData").height(height1);

    //var url = window.location.href;
    //pathwayId = getParameterByName('pid', url);
    //$("#txtPID").val(pathwayId);
    //getPatientInvestigationReport();

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

function getPatientInvestigationReport() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }    
    $("#showData").empty();
    $("#divLoader").show();
    $.ajax({
        type: "POST",
        url: "WebService/PatientInvestigationReport.asmx/getPatientInvestigationReport",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pid':'" + $("#txtPID").val() + "','fromDate':'" + $("#txtFromDate").val() + "','toDate':'" + $("#txtToDate").val() + "','categoryID':'" + $("#ddlCategory").val() + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;
            var topHeader = JSON.parse(data.d).responseValue.Table1;
            var moleculeColorPhenomenon = JSON.parse(data.d).responseValue.Table2;
            var patientDisease = JSON.parse(data.d).responseValue.Table3;
            var pathwayID = null;
            if (patientDisease && patientDisease.length > 0) {
                pathwayID = patientDisease[0].diseaseID;
            }


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

            for (var i = -1; i < topHeader.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.style.color = "red";
                if (i == -1) {
                    th.setAttribute("colspan", 8);
                    th.innerHTML = "Reference Range";
                }
                else {
                    th.innerHTML = topHeader[i].resultRange;
                }
                tr.appendChild(th);
            }

            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var tr = table.insertRow(-1);                   // TABLE ROW.

            var link = '../project/test4.aspx';
            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.               

                th.innerHTML = col[i];

                for (var j = 0; j < moleculeColorPhenomenon.length; j++) {
                    if (col[i] == moleculeColorPhenomenon[j].subTestName) {
                        if (moleculeColorPhenomenon[j].phenomenonName != null) {
                            $(th).attr('title', moleculeColorPhenomenon[j].phenomenonName.slice(1));

                            $(th).empty();
                            $(th).append('<a href=" ' + link + '?pathwayID=' + pathwayID + '&moleculeName=' + moleculeColorPhenomenon[j].keyword + '" style="color:#000;">' + col[i] + ' </a>');

                            var br = document.createElement("br");
                            th.appendChild(br);

                            var colorCodes = moleculeColorPhenomenon[j].colorCoding.split(",");
                            if (colorCodes.length > 0) {
                                var width = 100 / colorCodes.length;
                                for (var k = 0; k < colorCodes.length; k++) {
                                    var div = document.createElement("div");
                                    
                                    div.innerHTML = "&nbsp;";
                                    $(div).attr('style', 'width:' + width + '%;background-color:' + colorCodes[k] + ';float: right');
                                                                        
                                    th.appendChild(div);
                                }
                            }
                        }
                    }
                }
                               
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < result.length; i++) {
                tr = table.insertRow(-1);

                var headCol = -1;
                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    if (j == 0) {
                        tabCell.innerHTML = i + 1;
                    } else {
                        if (result[i][col[j]] == 0) {
                            tabCell.innerHTML = '';
                        } else {
                            tabCell.innerHTML = result[i][col[j]];

                            if (j > 7) {
                                headCol++;

                                var reading = topHeader[headCol].resultRange;
                                if (reading.includes('-')) {
                                    var readingValue = reading.split("-");
                                    if (readingValue != null && readingValue != '') {
                                        if (readingValue.length > 1) {
                                            var minValue = readingValue[0].trim();
                                            var maxValue = readingValue[1].trim().split(" ")[0];
                                           
                                            if ($.isNumeric(minValue) && $.isNumeric(maxValue) && $.isNumeric(result[i][col[j]])) {
                                                if (parseFloat(result[i][col[j]]) < parseFloat(minValue)) {
                                                    tabCell.style.color = "red";
                                                }
                                                else if (parseFloat(result[i][col[j]]) > parseFloat(maxValue)) {
                                                    tabCell.style.color = "red";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
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
            //$('th').click(function () {
            //    var table = $(this).parents('table').eq(0);
            //    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
            //    this.asc = !this.asc;
            //    if (!this.asc) { rows = rows.reverse() }
            //    for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
            //});

            //function comparer(index) {
            //    return function (a, b) {
            //        var valA = getCellValue(a, index), valB = getCellValue(b, index)
            //        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
            //    };
            //}
            //function getCellValue(row, index) { return $(row).children('td').eq(index).text() }

        },
        error: function (error) {
            $("#divLoader").hide();
        },
        complete: function () {
            $("#divLoader").hide();
        }
    });
}

function getAllCategory() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        method: "Post",
        url: "WebService/PatientInvestigationReport.asmx/getAllCategory",
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
                var allResult = result.responseValue.Table;                
                $("#ddlCategory").empty();
                $("#ddlCategory").append('<option value="0">-- Select Category --</option>');
                $.each(allResult, function () {
                    $("#ddlCategory").append('<option value="' + this.id + '">' + this.categoryName + '</option>');
                });
            }            
        }, error: function (error) {

        }
    });

}

//$(function () {
   
//});

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