

$('#txtFromDate').val(getCurrentDateSQL(new Date(), 0));




function multiSelectProblem() {
    $('#ddlPathway').multiselect({
        buttonWidth: '100%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Pathway',
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
function multiSelectPhenomenon() {
    $('#ddlPhenomenon').multiselect({
        buttonWidth: '100%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Phenomenon',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}


function getNutrient(foodID) {

    var diseseId = $('#ddlPathway').val();
    var obj = {
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "diseaseIds": diseseId[0],
        "foodID": foodID
    };
    console.log("obj", obj);
    $.ajax({
        type: "POST",
        url: "WebService/markerDietActivator.asmx/getNutrientReport",
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


            $("#tblnutrient tbody tr").remove();
            $.each(r.Table, function (i) {
                var row = $("#tblnutrient thead tr").clone();

                $('.td_sNo', row).text(i + 1);
                $('.td_marker', row).text(this.nutrientName);
                $('.td_nutrients', row).text(this.interactedNutrientName);
                $('.td_persent', row).text(this.nutrientValue + this.unitName + '/100g' + ' (' + this.nutrientValuePercent + '%)');
                $('.td_effects', row).text(this.effect);

                $("#tblnutrient tbody").append(row);
                row = $("#tblnutrient body tr:last").clone();
            });

            var foodName = r.Table[0].foodName;
            $('#modelNutrient .modal-title').text(foodName + ' Description');
            $('#modelNutrient .cls-foodName').text(foodName);
            $("#modelNutrient").show();
            console.log(this.nutrientValue + this.unitName);
        },
        error: function (error) {

        }
    });



    $.ajax({
        type: "POST",
        url: "WebService/markerDietActivator.asmx/getFoodReportToEat",
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



            $("#tblFood tbody tr").remove();
            $.each(r.Table, function (i) {
                var row = $("#tblFood thead tr").clone();

                $('.td_sNo', row).text(i + 1);
                $('.td_marker', row).text(this.nutrientName);
                $('.td_nutrients', row).text(this.interactedNutrientName);
                $('.td_persent', row).text(this.nutrientValue + this.unitName + '/100g' + ' (' + this.nutrientValuePercent + '%)');
                $('.td_effects', row).text(this.effect);

                $("#tblFood tbody").append(row);
                row = $("#tblFood body tr:last").clone();
            });


            var foodName = r.Table[0].foodName;
            $('#modelNutrient .modal-title').text(foodName + ' Description');
            $('#modelNutrient .cls-foodName').text(foodName);
            $("#modelNutrient").show();

        },
        error: function (error) {

        }
    });
}

function getFood(interactedNutrientName) {

    //alert(interactedNutrientName);
    var diseseId = $('#ddlPathway').val();
    var obj = {
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "diseaseIds": diseseId[0],
        "interactedNutrientName": interactedNutrientName
    };
    $.ajax({
        type: "POST",
        url: "WebService/markerDietActivator.asmx/getNutrientNotToEat",
        data: JSON.stringify(obj),
        contentType: 'application/json',
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {

            var r = JSON.parse(data.d).responseValue;


            $("#tblNutrientNotToEat tbody tr").remove();
            $.each(r.Table, function (i) {
                var row = $("#tblNutrientNotToEat thead tr").clone();

                $('.td_sNo', row).text(i + 1);
                $('.td_marker', row).text(this.MarkerName);
                $('.td_nutrients', row).text(this.foodName);
                $('.td_persent', row).text(this.nutrientValue + this.unitName + '/100g' + ' (' + this.nutrientValuePercent + '%)');
                $('.td_effects', row).text(this.effect);

                $("#tblNutrientNotToEat tbody").append(row);
                row = $("#tblNutrientNotToEat body tr:last").clone();
            }

            );



            //var foodName = r.Table[0].foodName;
            //$('#tblNutrientNotToEat .modal-title').text(foodName + ' Description');
            //$('#tblNutrientNotToEat .cls-foodName').text(foodName);
            $("#modelFood").show();

        },
        error: function (error) {

        }

    });
    //-----------Start Second Table---------- 
    $.ajax({
        type: "POST",
        url: "WebService/markerDietActivator.asmx/getNutrientToEat",
        data: JSON.stringify(obj),
        contentType: 'application/json',
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {

            var r = JSON.parse(data.d).responseValue;

            $("#tblNutrientToEat tbody tr").remove();
            $.each(r.Table, function (i) {
                var row = $("#tblNutrientToEat thead tr").clone();

                $('.td_sNo', row).text(i + 1);
                $('.td_marker', row).text(this.MarkerName);
                $('.td_nutrients', row).text(this.foodName);
                $('.td_persent', row).text(this.nutrientValue + this.unitName + '/100g' + ' (' + this.nutrientValuePercent + '%)');
                $('.td_effects', row).text(this.effect);

                $("#tblNutrientToEat tbody").append(row);
                row = $("#tblNutrientToEat body tr:last").clone();
                row = $("#tblNutrientToEat body tr:last").clone();
            }

            );
            $("#modelFood").show();

        },
        error: function (error) {

        }
    });
    //-------------------End Second Table---------
}

function Export() {
    $("#markerTable").table2excel({
        exclude: ".noExl",// exclude CSS class
        name: "TickSheetReport",
        filename: "TickSheetReport",//do not include extension
        fileext: ".xls" // file extension
    });
}


$(function () {
    var url = window.location.href;
    pageName = getPageName(url);

    var height1 = ($(window).height() - $('#header').height() - 155);
    $("#showData").height(height1);

    initControls();

    $("#sudo").click(function () {
        window.print();
        return false;
    });

    $("#btnExel").click(function () {
        $('.foodRemovesExport').remove();
        Export();
    });

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
            $("#btnUpdate").hide();
            saveDescription();
            alert('save successfull');
        }
    });

    $("#btnUpdate").click(function () {
        updateDescription();

    });
    $("#btnCancel").click(function () {
        $("#addInfoModel").hide();
    });

    $(".btnhideNutrient").click(function () {
        $("#modelNutrient").hide();
    });
    $(".btnhideNutrient").click(function () {
        $("#modelFood").hide();
    });
    $(".itemStockHide").click(function () {
        $("#modalItemStock").hide();
    });

});

var initControls = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/moleculeDietActivatorInitControls",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;
            var pathwayList = r.Table;
            var processList = r.Table1;
            var phenomenonList = r.Table2;

            $("#ddlPathway option:not(:first)").remove();
            $.each(pathwayList, function () {
                $("#ddlPathway").append('<option value="' + this.id + '">' + this.headName + '</option>');
            });
            $('#ddlPathway').prop("multiple", "multiple");
            multiSelectProblem();
            $("#ddlPathway").multiselect("clearSelection");

            $("#ddlProcess option:not(:first)").remove();
            $.each(processList, function () {
                $("#ddlProcess").append('<option value="' + this.rankName + '">' + this.rankName + '</option>');
            });
            $('#ddlProcess').prop("multiple", "multiple");
            multiSelectProcess();
            $("#ddlProcess").multiselect("clearSelection");


            $("#ddlPhenomenon option:not(:first)").remove();
            $.each(phenomenonList, function () {
                $("#ddlPhenomenon").append('<option value="' + this.id + '">' + this.pathwayName + '</option>');
            });
            $('#ddlPhenomenon').prop("multiple", "multiple");
            multiSelectPhenomenon();
            $("#ddlPhenomenon").multiselect("clearSelection");
        },
        error: function (error) {

        }
    });
};

//function closeloader() {
//    $("#divloader").hide();
//}
var AAAA;
var samp;
function getMarkerDietReport() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var pid = ($('#txtPid').val().trim() != '') ? Number($('#txtPid').val().trim()) : 0;
    var intakeDate = ($('#txtFromDate').val() != '') ? $('#txtFromDate').val() : '';
    var diseaseIDs = ($('#ddlPathway').val()) ? $('#ddlPathway').val().toString() : '';
    var receptorIds = ($('#ddlPhenomenon').val()) ? $('#ddlPhenomenon').val().toString() : '';
    var process = ($('#ddlProcess').val()) ? $('#ddlProcess').val().toString() : '';
    var sam;
    $("#divLoader").show();
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getMarkerDietReport",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pid': '" + pid + "','diseaseIDs': '" + diseaseIDs + "','process': '" + process + "','receptorIds': '" + receptorIds + "','intakeDate': '" + intakeDate + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            console.log("result", result);
            var reportList = result.Table;
            var foodNutrientList = result.Table1;
            var markerTypeList = result.Table2;
            var markerRdaList = result.Table3;
            var tHalfPeakValueList = result.Table4;
            var nutrientAchievementList = result.Table5;
            var totalCountList = result.Table6;
            var dockingScoreList = result.Table7;
            var centerMoleculeList = result.Table8;
            var specificMoleculeList = result.Table9;
            sam = dockingScoreList;




            $("#showData").show();
            $("#btnExel").show();
            var notRequired = ['pathwayNameList', 'pathwayLength', 'roleType'];
            var col = ['S.no'];
            for (var key in reportList[0]) {
                if (!notRequired.includes(key)) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }



            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");
            table.setAttribute("id", "markerTable");
            $(table).css({
                'width': '100%'
            });

            table.className = 'table table-bordered table-striped';
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            // console.log("totalCountList",totalCountList);

            // ROWS ABOVE HEADER OF TABLE.
            $.each(foodNutrientList, function (index, value) {
                var nutrientList = JSON.parse(value.nutrientList);

                for (var a = 0; a < 2; a++) {

                    var tr = table.insertRow(-1);                   // TABLE ROW.

                    for (var i = 0; i < col.length; i++) {
                        var td = document.createElement("td");      // TABLE HEADER.  

                        var span = '';
                      

                        if (i == 2) {
                            if (a == 0) {
                                span = '<span class="foodRemovesExport">Food</span>';

                            }
                            else {
                                span = '<span class="foodRemovesExport">Amount</span>';
                            }
                        }
                        else {
                            if (nutrientList.some(data => compareString(data.nutrientName, col[i]))) {
                                if (a == 0) {
                                    span = '<span class="food-cell pointer" onClick="getNutrient(' + value.foodID + ')">' + value.foodName + '</span>';
                                    // span = '<span class="food-cell" ' + value.foodID + '>' + value.foodName + '</span>';
                                  
                                }
                                else {
                                    span = getNutrientQuantity(nutrientList, col[i]);
                                }

                                $(td).attr('class', 'food-cell');
                            }
                        }
                        
                        td.innerHTML = span;
                        tr.appendChild(td);
                    }
                }
            });

            // ROWS FOR RDA Achieved Extra.
            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var td = document.createElement("td");      // TABLE HEADER.  

                var span = '';

                if (i == 2) {
                    span = '<span>Extra</span>';
                }
                else {
                    if (nutrientAchievementList.some(data => compareString(data.nutrientName, col[i]))) {
                        span = getRdaAchievedExtraValue(nutrientAchievementList, col[i]);
                    }
                }

                td.innerHTML = span;
                tr.appendChild(td);
            }

            // ROWS FOR RDA Achieved.
            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var td = document.createElement("td");      // TABLE HEADER.  

                var span = '';

                if (i == 2) {
                    span = '<span>RDA Achieved</span>';
                }
                else {
                    if (nutrientAchievementList.some(data => compareString(data.nutrientName, col[i]))) {
                        span = getRdaAchievedValue(nutrientAchievementList, col[i]);
                    }
                }

                td.innerHTML = span;
                tr.appendChild(td);
            }

            // ROWS FOR RDA.  
            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var td = document.createElement("td");      // TABLE HEADER.  

                var span = '';

                if (i == 2) {
                    span = '<span>RDA</span>';
                }
                else {
                    if (markerRdaList.some(data => compareString(data.nutrientName, col[i]))) {
                        span = getRDAValue(markerRdaList, col[i]);
                    }
                }

                td.innerHTML = span;
                tr.appendChild(td);
            }

            // ROWS FOR PEAK VALUE.  
            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var td = document.createElement("td");      // TABLE HEADER.  

                var span = '';

                if (i == 2) {
                    span = '<span>Peak</span>';
                }
                else {
                    if (tHalfPeakValueList.some(data => compareString(data.nutrientName, col[i]))) {
                        span = getPeakValue(tHalfPeakValueList, col[i]);
                    }
                }

                td.innerHTML = span;
                tr.appendChild(td);
            }

            // ROWS FOR THALF VALUE.  
            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var td = document.createElement("td");      // TABLE HEADER.  

                var span = '';

                if (i == 2) {
                    span = '<span>T Half</span>';
                }
                else {
                    if (tHalfPeakValueList.some(data => compareString(data.nutrientName, col[i]))) {
                        span = getThalfValue(tHalfPeakValueList, col[i]);
                    }
                }

                td.innerHTML = span;
                tr.appendChild(td);
            }


            // ROWS FOR PIE CHART.  
            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var td = document.createElement("td");      // TABLE HEADER.  

                var span = '';

                if (i == 2) {
                    span = '<span>Achievement</span>';
                }
                else {
                    if (nutrientAchievementList.some(data => compareString(data.nutrientName, col[i]))) {
                        span = getPieChart(nutrientAchievementList, col[i]);
                    }
                }

                td.innerHTML = span;
                tr.appendChild(td);
            }

            totalCountList.sort(function (a, b) {
                var keyA = new Date(a.totalCount),
                    keyB = new Date(b.totalCount);
                // Compare the 2 dates
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });

            var myArr = [];

            for (var i = 0; i < col.length; i++) {

                if (i < 8) {
                    // myArr.splice(0, 0, col[0]);
                    myArr[i] = col[i];
                    //console.log(col[i]);
                }
                ////else if (i == 1) {
                ////    console.log(col[i]);
                ////    myArr.splice(1, 0, col[1]);
                ////    //myArr[i] = col[i];
                ////}dockingScoreList 
                ////else if (i == 2) {
                ////    console.log(col[i]);
                ////    myArr.splice(2, 0, col[2]);
                ////    //myArr[i] = col[i];
                ////}
                ////else if (i == 3) {
                ////    console.log(col[i]);
                ////    myArr.splice(3, 0, col[3]);
                ////    //myArr[i] = col[i];
                ////}
                else {

                    var indexGet = getIndexByNutrientName(totalCountList, col[i]);
                    // myArr.splice(indexGet + 4, 0, col[i]);


                    if (col[i] == "Calcium") {

                    }

                    myArr[indexGet + 8] = col[i];

                }
            }
            col = myArr;

            // ROW FOR HEADER OF TABLE.
            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.  

                if (i < 8) {
                    var span = '<span>' + col[i] + '</span>';

                    $(th).attr('style', 'background-color: #fff !important');
                    th.innerHTML = span;
                    tr.appendChild(th);
                }
                else {
                    var span = '<span class="header" onClick="getFood(\'' + col[i] + '\')">' + col[i] + '</span>';
                    //var span = '<span class="header" style="background-color:red !important" onClick="getFood(' + interactedId + ')">' + col[i] + '</span>';
                }

                th.innerHTML = span;
                tr.appendChild(th);
            }

            var pathwayName = "";

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < reportList.length; i++) {

                if (pathwayName != reportList[i].pathwayNameList) {
                    pathwayName = reportList[i].pathwayNameList;

                    var tr = table.insertRow(-1);                   // TABLE ROW.

                    var td0 = document.createElement("td");
                    td0.innerHTML = '*';
                    tr.appendChild(td0);

                    var td = document.createElement("td");

                    var name = '';
                    var nameList = JSON.parse(reportList[i].pathwayNameList);
                    $.each(nameList, function (index, value) {
                        name += value.headName + ', ';
                    });

                    name = name.replace(/,\s*$/, "");

                    var span = '<span class="disease-span">' + name + '</span>';
                    $(td).attr('colspan', col.length - 1);

                    td.innerHTML = span;
                    tr.appendChild(td);
                }

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);

                    var moleculeType = '';
                    if (markerTypeList.some(data => compareString(data.keyword, reportList[i].Marker))) {
                        moleculeType = getMoleculeType(markerTypeList, reportList[i].Marker);
                    }
                    if (j == 0) {
                        tabCell.innerHTML = i + 1;
                    }
                    else if (j == 1) {
                        tabCell.innerHTML = '<div class="marker-div">' + reportList[i].Section + '</div>';
                    }
                    else if (j == 2) {
                        //tabCell.innerHTML = '<div class="marker-div" onclick="getMarkerData(this, \'' + reportList[i].Marker + '\')">' + reportList[i].Marker + ' &nbsp; ' + reportList[i].roleType + '</div>';
                        tabCell.innerHTML = '<div class="marker-div" onclick="getMarkerData(this, \'' + reportList[i].Marker + '\')" ondblclick="getItemStock( \'' + reportList[i].Marker + '\')">' + reportList[i].Marker + ' &nbsp; ' + reportList[i].roleType + '</div>';

                        if (moleculeType != '') {
                            switch (moleculeType) {
                                case 'central':
                                    $(tabCell).attr('class', 'central-molecule');
                                    break;
                                case 'subcentral':
                                    $(tabCell).attr('class', 'subcentral-molecule');
                                    break;
                                case 'specific':
                                    $(tabCell).attr('class', 'specific-molecule');
                                    break;
                            }
                        }
                    }
                    else if (j == 3 || j == 4 || j == 5 || j == 6 || j == 7) {
                      
                        if (col[j] == 'OTHER') {

                            //===================For Single Line=================//
                            //var otherList = '';
                            //if (reportList[i][col[j]] != '') {
                            //    var arr = JSON.parse(reportList[i][col[j]]);
                               
                            //    $.each(arr, function () {
                            //        otherList += this.methodName + ',';
                            //    });
                            //    otherList = otherList.replace(/,\s*$/, "");
                            //}

                            //tabCell.innerHTML = '<div class="marker-div">' + otherList + '</div>';


                            //===================For line break=================//
                            var htmlOther = '';
                            if (reportList[i][col[j]] != '') {
                                htmlOther = '<ul>';
                                var arr = JSON.parse(reportList[i][col[j]]);

                                $.each(arr, function () {
                                    htmlOther += '<li>' + this.methodName + '</li>';
                                });
                                htmlOther += '</ul>';
                            }

                            tabCell.innerHTML = '<div class="marker-div">' + htmlOther + '</div>';
                        } else {
                            tabCell.innerHTML = '<div class="marker-div">' + reportList[i][col[j]] + '</div>';
                        }
                    }
                    //else if (j == 4 || j == 5 || j == 6) {
                    //    continue;
                    //}
                    else {
                        var cellHtml = '';
                        if (reportList[i][col[j]] && reportList[i][col[j]] == 1) {
                           
                                cellHtml = ' <span class="icon"><span style="font-size: 20px; text-align: center!important;">&#10004;</span></span>' + getDockingScore(col[j], reportList[i].Marker, dockingScoreList);
                          
                            if (moleculeType != '') {
                                switch (moleculeType) {
                                    case 'central':
                                        $(tabCell).attr('class', 'central-molecule');
                                        break;
                                    case 'subcentral':
                                        $(tabCell).attr('class', 'subcentral-molecule');
                                        break;
                                    case 'specific':
                                        $(tabCell).attr('class', 'specific-molecule');
                                        break;
                                }
                            }
                        }
                        //else {
                        //    cellHtml = getDockingScore(col[j], reportList[i].Marker, dockingScoreList);
                        //}

                        tabCell.innerHTML = cellHtml;
                    }
                }
            }

            // ROWS FOR LAST COUNT.  
            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var td = document.createElement("td");      // TABLE HEADER.  

                var span = '';

                if (i == 2) {
                    span = '<span class="header" >Total</span>';
                }
                else if (i > 3) {
                    if (totalCountList.some(data => compareString(data.interactedNutrientName, col[i]))) {
                        span = getTotalCountValue(totalCountList, col[i]);
                    }
                }

                td.innerHTML = span;
                tr.appendChild(td);
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = '';
            divContainer.appendChild(table);



        }, error: function (error) {

            $("#divloader").hide();
        },
        complete: function () {
            $("#divLoader").hide();
        }


    });


}
function getInteractedNutrientID(nutrient, dockingScoreList) {
    var returnMsg = '';

    $.each(dockingScoreList, function (index, value) {
        if (compareString(value.interactedNutrientName, nutrient)) {
            returnMsg = value.interactedNutrientID;
        }
    });
    return returnMsg;
}

function getMarkerData(e, nutrient) {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var diseaseIDs = ($('#ddlPathway').val()) ? $('#ddlPathway').val().toString() : '';

    if ($(e).parent().find('div.description-div').length > 0) {
        $(e).parent().find('.description-div').remove();
    }
    else {
        $.ajax({
            type: "POST",
            url: "WebService/diseaseNutrientCascadeReport.asmx/getMarkerData",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'diseaseIDs': '" + diseaseIDs + "','cascadeNutrient': '" + nutrient + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (data) {
                var result = JSON.parse(data.d).responseValue;

                var html = '';

                html = '<div class="description-div"><br /><div>' + (result.Table[0].description ? result.Table[0].description : '') + '</div><br />';
                html += '<span>Process : <span><ul class="ul">';
                $.each(result.Table1, function (index, value) {
                    html += '<li>' + value.rankName + '</li>';
                });
                html += '</ul></div>';

                $(e).append(html);

            },
            error: function (error) {

            }
        });
    }
}

function getDockingScore(interactedNutrient, nutrient, dockingScoreList) {
   
    var returnMessage = '';
    $.each(dockingScoreList, function (index, value) {
        if (compareString(value.nutrientName, nutrient) && compareString(value.interactedNutrientName, interactedNutrient)) {
            if (value.dockingScore > -1) {
                returnMessage = '<div class="dockingRange" style="background-color:red;color:black;width: 50px;">' + value.dockingScore + '</div>';
            }
            else if (value.dockingScore < -1 && value.dockingScore > -2) {
                returnMessage = '<div class="dockingRange" style="background-color:red;color:black;width: 50px;">' + value.dockingScore + '</div>';
            }
            else if (value.dockingScore < -2 && value.dockingScore > -3) {
                returnMessage = '<div class="dockingRange" style="background-color:#ADD8E6;color:black;width: 50px;">' + value.dockingScore + '</div>';
            }
            else if (value.dockingScore < -3 && value.dockingScore > -4) {
                returnMessage = '<div class="dockingRange" style="background-color:#00008B;color:white;width: 50px;">' + value.dockingScore + '</div>';
            }
            else if (value.dockingScore < -4 && value.dockingScore > -5) {
                returnMessage = '<div class="dockingRange" style="background-color:#FFFF99;color:black;width: 50px;">' + value.dockingScore + '</div>';
            }
            else if (value.dockingScore < -5 && value.dockingScore > -6) {
                returnMessage = '<div class="dockingRange" style="background-color: #FFFF99;color:black;width: 50px;">' + value.dockingScore + '</div>';
            }
            else if (value.dockingScore < -6 && value.dockingScore > -7) {
                returnMessage = '<div class="dockingRange" style="background-color: #8B8000;color:black;width: 50px;">' + value.dockingScore + '</div>';
            }
            else if (value.dockingScore < -7 && value.dockingScore > -8) {
                returnMessage = '<div class="dockingRange" style="background-color: #90EE90;color:black;width: 50px;">' + value.dockingScore + '</div>';
            }
            else if (value.dockingScore > -8) {
                returnMessage = '<div class="dockingRange" style="background-color:#006400;color:black;width: 50px;">' + value.dockingScore + '</div>';
            }
            return false;
        }
    });

    return returnMessage;
}

function getNutrientQuantity(list, nutrientName) {

    var returnMessage = '';
    $.each(list, function (index, value) {
        if (compareString(value.nutrientName, nutrientName)) {
            returnMessage = '<span>' + value.nutrientValue + ' ' + value.unitName + '</span>';
            return false;
        }
    });

    return returnMessage;
}

function getIndexByNutrientName(list, nutrientName) {

    var returnMessage = '';
    $.each(list, function (index, value) {
        if (compareString(value.interactedNutrientName, nutrientName)) {
            returnMessage = index;
        }
    });

    return returnMessage;
}

function getRDAValue(list, nutrientName) {

    var returnMessage = '';
    $.each(list, function (index, value) {
        if (compareString(value.nutrientName, nutrientName) && value.rda > 0) {
            returnMessage = '<span>' + value.rda + ' ' + value.unitName + '</span>';
            return false;
        }
    });

    return returnMessage;
}

function getPeakValue(list, nutrientName) {

    var returnMessage = '';
    $.each(list, function (index, value) {
        if (compareString(value.nutrientName, nutrientName) && value.peakValue) {
            returnMessage = '<span>' + value.peakValue + '</span>';
            return false;
        }
    });

    return returnMessage;
}

function getThalfValue(list, nutrientName) {

    var returnMessage = '';
    $.each(list, function (index, value) {
        if (compareString(value.nutrientName, nutrientName) && value.tHalfValue) {
            returnMessage = '<span>' + value.tHalfValue + '</span>';
            return false;
        }
    });

    return returnMessage;
}

function getRdaAchievedValue(list, nutrientName) {

    var returnMessage = '';
    $.each(list, function (index, value) {
        if (compareString(value.nutrientName, nutrientName)) {
            //var achieved = (value.extraRDAPercentage == 0 ? value.achievedRDAPercentage + '%' : value.extraRDAPercentage + '% extra');
            returnMessage = '<span>' + value.achievedNutrientValue + ' ' + value.unitName + '</span>';
            return false;
        }
    });

    return returnMessage;
}

function getPieChart(list, nutrientName) {

    var returnMessage = '';
    $.each(list, function (index, value) {
        if (compareString(value.nutrientName, nutrientName)) {

            returnMessage = '<div style="cursor: pointer;" onclick="getAllFood(\'' + nutrientName + '\',' + value.achievedRDAPercentage + ',' + value.target + ',' + value.achievedNutrientValue + ')"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="red" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="green" stroke-width="10" stroke-dasharray="calc(' + value.achievedRDAPercentage + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

            return false;
        }
    });

    return returnMessage;
}

function getTotalCountValue(list, nutrientName) {

    var returnMessage = '';
    $.each(list, function (index, value) {
        if (compareString(value.interactedNutrientName, nutrientName)) {
            returnMessage = '<span>' + value.totalCount + '</span>';
            return false;
        }
    });

    return returnMessage;
}

function getRdaAchievedExtraValue(list, nutrientName) {

    var returnMessage = '';
    $.each(list, function (index, value) {
        if (compareString(value.nutrientName, nutrientName) && value.extraNutrientValue > 0) {
            //var achieved = (value.extraRDAPercentage == 0 ? value.achievedRDAPercentage + '%' : value.extraRDAPercentage + '% extra');
            returnMessage = '<span>' + value.extraNutrientValue + ' ' + value.unitName + '</span>';
            return false;
        }
    });

    return returnMessage;
}

function getMoleculeType(list, nutrientName) {

    var returnMessage = '';
    $.each(list, function (index, value) {
        if (compareString(value.keyword, nutrientName)) {
            if (value.isCentralMolecule) {
                returnMessage = 'central';
                return false;
            }
            else if (value.isSubCentralMolecule) {
                returnMessage = 'subcentral';
                return false;
            }
            else if (value.isSpecificMolecule) {
                returnMessage = 'specific';
                return false;
            }

        }
    });

    return returnMessage;
}

var achievedRDAPercentageFixed;
function getAllFood(nutrient, achievedRDAPercentage, target, achievedNutrientValue) {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var pid = ($('#txtPid').val().trim() != '') ? Number($('#txtPid').val().trim()) : 0;
    var intakeDate = ($('#txtFromDate').val() != '') ? $('#txtFromDate').val() : '';
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getAllFood",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pid': '" + pid + "','cascadeNutrient': '" + nutrient + "','intakeDate': '" + intakeDate + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var changeRangeHTML = '';

            var row = $("#tblDietCreator thead tr:first").clone();
            $("#tblDietCreator tbody tr").remove();
            $.each(result.Table, function (i) {
                $('.td_SNo', row).text((i + 1) + '.');
                $('.td_Food', row).text(this.foodName);
                $('.td_FoodQuantity', row).text(this.foodQuantity + ' gm');

                var max = target / (result.Table.length + 1);
                var requiredFoodQuantity = ((100 / this.nutrientValue) * max);
                var achivedPercent = ((this.achievedNutrientValue / target) * 100).toFixed(2);
                achievedRDAPercentageFixed = achievedRDAPercentage;

                changeRangeHTML = '<label>' + this.foodQuantity + ' gm (' + achivedPercent + ' %)</label>';
                changeRangeHTML += '<input type="range" min="0" max="' + requiredFoodQuantity + '" step="0.001" value="' + this.foodQuantity + '" onchange="changePieChart(this, ' + this.foodID + ',' + this.foodQuantity + ', ' + achivedPercent + ')" />';

                $('.td_ChangeQuantity', row).html(changeRangeHTML);

                $("#tblDietCreator tbody").append(row);
                row = $("#tblDietCreator thead tr:first").clone();
            });

            createPieChart(achievedRDAPercentage);

            $('#modalDietCreator').modal('show');

        },
        error: function (error) {

        }
    });
}

var previousPercent = 0, previousFoodId = 0;
function changePieChart(e, foodId, originalFoodQuantity, achivedPercent) {

    var changedFoodQuantity = $(e).parent().find('input[type="range"]').val();

    var achivedPercentage = (achivedPercent * changedFoodQuantity) / originalFoodQuantity;

    if (previousFoodId != foodId) {
        previousPercent = 0;
        previousFoodId = foodId;
    }
    achievedRDAPercentageFixed = (achievedRDAPercentageFixed - previousPercent + achivedPercentage);
    previousPercent = achivedPercentage;

    $(e).parent().find('label').html(changedFoodQuantity + ' gm (' + achivedPercentage.toFixed(2) + ' %)');

    createPieChart(achievedRDAPercentageFixed);
}

function createPieChart(achievedRDAPercentage) {
    var remaining = (100 - achievedRDAPercentage);
    $('#pieDiv').empty();
    var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };
    var title = {
        text: 'RDA Acheivement'
    };
    var plotOptions = {
        pie: {
            allowPointSelect: false,
            cursor: 'pointer',

            dataLabels: {
                enabled: false,
                format: '<b>{point.name}%</b>: {point.percentage:.1f} %'
            }
        }
    };
    var series = [{
        type: 'pie',
        name: 'RDA',
        data: [{
            name: 'Achieved',
            y: achievedRDAPercentage,
            color: 'Green'
        }, {
            name: 'Remaining',
            y: remaining,
            color: 'red'
        }]
    }];
    var json = {};
    json.chart = chart;
    json.title = title;
    json.series = series;
    json.plotOptions = plotOptions;
    $('#pieDiv').highcharts(json);
}


//var slider = document.getElementById("slider");
//var variable = document.getElementById('variable');

//slider.addEventListener('input', function (e) {
//    variable.textContent = slider.value;
//});

//var interval = setInterval(function () {
//    slider.stepUp();
//    slider.dispatchEvent(new Event('input'));
//    if (slider.value == 23) clearInterval(interval);
//}, 1000);


function compareString(str1, str2) {
    return str1.toLowerCase().trim() == str2.toLowerCase().trim();
}

//$('#txtFromDate').val(getCurrentDateSQL(new Date(), 0));
//$('#txtDate').val(getCurrentDateSQL(new Date(), 1));
//var selectedNutrient = oldDiseaseIds = '';


//function multiSelectProblem() {
//    $('#ddlProblem').multiselect({
//        buttonWidth: '100%',
//        includeSelectAllOption: true,
//        nonSelectedText: 'Select Pathway',
//        enableCaseInsensitiveFiltering: true,
//        filterPlaceholder: 'Search Here...',
//        maxHeight: 300
//    });
//}
//function multiSelectPhenomenon() {
//    $('#ddlPhenomenon').multiselect({
//        buttonWidth: '100%',
//        includeSelectAllOption: true,
//        nonSelectedText: 'Select Phenomenon',
//        enableCaseInsensitiveFiltering: true,
//        filterPlaceholder: 'Search Here...',
//        maxHeight: 300
//    });
//}
//function multiSelectProcess() {
//    $('#ddlProcess').multiselect({
//        buttonWidth: '100%',
//        includeSelectAllOption: true,
//        nonSelectedText: 'Select Process',
//        enableCaseInsensitiveFiltering: true,
//        filterPlaceholder: 'Search Here...',
//        maxHeight: 300
//    });
//}

////$(document).ready(function () {
////    $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
////        e.preventDefault();
////        $(this).siblings('a.active').removeClass("active");
////        $(this).addClass("active");
////        var index = $(this).index();
////        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
////        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");

////        /* alert($(this).attr('data-action'));*/

////        if ($(this).attr('data-action') == 'achievement') {
////            getNutrientAchievement(selectedNutrient);
////        }
////        else if ($(this).attr('data-action') == 'rda') {
////            //getRdaGraph(selectedNutrient);
////        }
////        else if ($(this).attr('data-action') == 'machine') {
////            getTestMachineDetail(selectedNutrient);
////        }
////        else if ($(this).attr('data-action') == 'end') {
////            getEndResult(selectedNutrient);
////        }
////        else if ($(this).attr('data-action') == 'fullRda') {
////            getRdaDetails(selectedNutrient);
////        }
////        else if ($(this).attr('data-action') == 'stock') {
////            getItemStock(selectedNutrient);
////        }
////        else if ($(this).attr('data-action') == 'temprature') {
////            getTempratureDetails(selectedNutrient);
////        }
////    });

//    $('#print').on('click', function () {
//        getPDF();
//    })

//});


//$(function () {
//    var height1 = ($(window).height() - $('#header').height() - 106);
//    $("#showData1").height(height1);
//    getDiseaseList();
//    getPhenomenonList();
//});

//var getDiseaseList = function () {
//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    $.ajax({
//        type: "POST",
//        url: "WebService/diseaseNutrientCascadeReport.asmx/getDisease",
//        contentType: 'application/json',
//        dataType: 'json',
//        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (data) {
//            var r = JSON.parse(data.d).responseValue;

//            $("#ddlProblem option:not(:first)").remove();
//            $.each(r.Table, function () {
//                $("#ddlProblem").append('<option value="' + this.problemID + '">' + this.problemName + '</option>');
//            });
//            $('#ddlProblem').prop("multiple", "multiple");
//            multiSelectProblem();
//            $("#ddlProblem").multiselect("clearSelection");
//        },
//        error: function (error) {

//        }
//    });
//};

//var getPhenomenonList = function () {
//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    var diseaseIDs = ($('#ddlProblem').val()) ? $('#ddlProblem').val().toString() : '';
//    $.ajax({
//        type: "POST",
//        url: "WebService/diseaseNutrientCascadeReport.asmx/getPhenomenon",
//        contentType: 'application/json',
//        dataType: 'json',
//        data: "{'diseaseIDs':'" + diseaseIDs + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (data) {
//            var r = JSON.parse(data.d).responseValue;

//            //if ($('#ddlProblem').val().toString() != '') {

//            $('#divPhenomenon').empty();
//            $('#divPhenomenon').append('<select id="ddlPhenomenon"> </select>');
//            $('#divProcess').empty();
//            $('#divProcess').append('<select id="ddlProcess"> </select>');

//            setTimeout(function () {

//                $.each(r.Table, function () {
//                    $("#ddlPhenomenon").append('<option value="' + this.id + '">' + this.phenomenonName + '</option>');
//                });

//                $('#ddlPhenomenon').prop("multiple", "multiple");
//                multiSelectPhenomenon();
//                $("#ddlPhenomenon").multiselect("clearSelection");

//                $.each(r.Table1, function () {
//                    $("#ddlProcess").append('<option value="' + this.rank + '">' + this.rankName + '</option>');
//                });

//                $('#ddlProcess').prop("multiple", "multiple");
//                multiSelectProcess();
//                $("#ddlProcess").multiselect("clearSelection");

//            }, 100);
//            //}

//            //$("#ddlPhenomenon option:not(:first)").remove();
//            //$.each(r.Table, function () {
//            //    $("#ddlPhenomenon").append('<option value="' + this.id + '">' + this.phenomenonName + '</option>');
//            //});
//            //$('#ddlPhenomenon').prop("multiple", "multiple");
//            //multiSelectPhenomenon();
//            //$("#ddlPhenomenon").multiselect("clearSelection");
//        },
//        error: function (error) {

//        }
//    });
//};

//function getDivThalfPeakValue(list, nutrient) {

//    var div = '';
//    $.each(list, function (i) {
//        if (this.interactedNutrientName == nutrient) {
//            if (this.nutrientTHalfValue != '') {
//                div += '<div class="peakThalf"> Thalf : ' + this.nutrientTHalfValue + '</div>';
//            }
//            if (this.nutrientPeakValue != '') {
//                div += '<div class="peakThalf"> Peak : ' + this.nutrientPeakValue + '</div>';
//            }

//            return false;
//        }
//    });

//    return div;
//}


//function getMarkerDietReport() {
//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    var pid = ($('#txtPid').val().trim() != '') ? Number($('#txtPid').val().trim()) : 0;
//    var intakeDate = ($('#txtFromDate').val() != '') ? $('#txtFromDate').val() : '';
//    var diseaseIDs = ($('#ddlProblem').val()) ? $('#ddlProblem').val().toString() : '';
//    var receptorIds = ($('#ddlPhenomenon').val()) ? $('#ddlPhenomenon').val().toString() : '';
//    var process = ($('#ddlProcess').val()) ? $('#ddlProcess').val().toString() : '';

//    $("#divLoader").show();
//    $.ajax({
//        type: "POST",
//        url: "WebService/diseaseNutrientCascadeReport.asmx/getMarkerDietReport",
//        contentType: 'application/json',
//        dataType: 'json',
//        data: "{'pid': '" + pid + "','diseaseIDs': '" + diseaseIDs + "','process': '" + process + "','receptorIds': '" + receptorIds + "','intakeDate': '" + intakeDate + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (data) {
//            var result = JSON.parse(data.d).responseValue;
//            var markerList = result.Table;
//            var givenNutrientList = result.Table1;
//            var phenomenonList = result.Table2;
//            var tHalfPeakValueList = result.Table3;
//            var medicationList = result.Table4;

//            $("#showData").show();

//            var notRequired = ['nutrientName', 'markerDietType', 'rankList', 'isCentralMolecule', 'isSubCentralMolecule', 'isSpecificMolecule'];

//            //var col = ['S.no', 'Section / Sub-Section', 'Central/Sub-Central/Specific molecule', 'Marker', 'Medication'];
//            var col = ['S.no', 'Marker', 'Medication'];
//            for (var key in markerList[0]) {
//                if (!notRequired.includes(key)) {
//                    if (col.indexOf(key) === -1) {
//                        col.push(key);
//                    }
//                }
//            }

//            // CREATE DYNAMIC TABLE.
//            var table = document.createElement("table");
//            table.setAttribute("id", "markerTable");
//            $(table).css({
//                'width': '100%'
//            });
//            table.className = 'table table-bordered table-striped';
//            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

//            var tr = table.insertRow(-1);                   // TABLE ROW.

//            for (var i = 0; i < col.length; i++) {
//                var th = document.createElement("th");      // TABLE HEADER.  

//                if (i > 3) {
//                    var divThalfPeakValue = getDivThalfPeakValue(tHalfPeakValueList, col[i]);
//                    var span = '<span class="header" onclick="getNutrientAchievement(\'' + col[i] + '\');">' + col[i] + '</span><br />' + divThalfPeakValue;
//                }
//                else {
//                    var span = '<span class="header">' + col[i] + '</span>';
//                }

//                th.innerHTML = span;
//                tr.appendChild(th);
//            }

//            // ADD JSON DATA TO THE TABLE AS ROWS.
//            for (var i = 0; i < markerList.length; i++) {
//                tr = table.insertRow(-1);


//                for (var j = 0; j < col.length; j++) {
//                    var tabCell = tr.insertCell(-1);

//                    if (j == 0) {
//                        tabCell.innerHTML = i + 1;
//                    }
//                    //else if (j == 1) {

//                    //    var rankList = JSON.parse(markerList[i].rankList);
//                    //    var rankDiv = '<table class="table"><tbody>';
//                    //    $.each(rankList, function (k) {

//                    //        var pathwayList = this.pathwayList;
//                    //        pathwayDiv = '<ul class="unstyled">';
//                    //        $.each(pathwayList, function (k) {
//                    //            pathwayDiv += '<li class="cell-left">' + this.pathwayName + '</li>';
//                    //        });
//                    //        pathwayDiv += '</ul>';

//                    //        rankDiv += '<tr><td class="cell-middle">' + this.rankName + '</td><td>' + pathwayDiv + '</td></tr>';

//                    //    });
//                    //    rankDiv += '</tbody></table>';

//                    //    tabCell.innerHTML = rankDiv;
//                    //}
//                    //else if (j == 2) {
//                    //    var moleculeType = markerList[i].isCentralMolecule + (markerList[i].isSubCentralMolecule == '' ? '' : ', ' + markerList[i].isSubCentralMolecule) + (markerList[i].isSpecificMolecule == '' ? '' : ', ' + markerList[i].isSpecificMolecule);
//                    //    tabCell.innerHTML = moleculeType;
//                    //}
//                    //else if (j == 3) {
//                    else if (j == 1) {
//                        if (markerList[i].markerDietType == '*') {
//                            $(tabCell).css({
//                                'border': '2px solid #394bf7'
//                            });
//                            tabCell.innerHTML = '<div class="marker-div">' + markerList[i].nutrientName + '</div>';
//                        }
//                        else {
//                            tabCell.innerHTML = '<div class="marker-div">' + markerList[i].nutrientName + markerList[i].markerDietType + '</div>';
//                        }

//                        let bg_color = '';
//                        if (markerList[i].isCentralMolecule) {
//                            bg_color = '';
//                        } else if (markerList[i].isSubCentralMolecule) {
//                            bg_color = '';
//                        } else if (markerList[i].isSpecificMolecule) {
//                            bg_color = '';
//                        }
//                        $(tabCell).css({
//                            'background-color': bg_color
//                        });
//                    }
//                    else if (j == 2 && i == 0) {

//                        var medicationHtml = '<table>';
//                        $.each(medicationList, function (k) {
//                            medicationHtml += '<tr><td class="med-table">' + this.drugName + '</td></tr>';
//                        });
//                        medicationHtml += '</table>';

//                        tabCell.innerHTML = medicationHtml;
//                    }
//                    else {

//                        if (markerList[i][col[j]] == 1) {
//                            $(tabCell).css({
//                                'background-color': '#8CD88C',
//                                'text-align': 'center',
//                                'vertical-align': 'inherit',
//                            });

//                            //var cellHtml = ' <span style="font-size:14px;" onclick="getDiet(\'' + col[j] + '\');">✓</span>';
//                            var cellHtml = ' <span class="icon" onclick="getDiet(\'' + col[j] + '\');"><span style="font-size: 20px;">&#10004;</span></span>';
//                            if (givenNutrientList.some(data => data.nutrientName == col[j])) {
//                                cellHtml += '';
//                            }
//                            else {
//                                if (pid && pid > 0) {
//                                    cellHtml += ' &nbsp;&nbsp;&nbsp;<span style="font-size: 20px; color:red">&#10006;</span>';
//                                    //cellHtml += ' &nbsp;&nbsp;&nbsp;<span style="font-size: 20px; color:red"><i class="icon-cancel"></i></span>';
//                                }
//                            }

//                            tabCell.innerHTML = cellHtml;
//                        }
//                        else {
//                            tabCell.innerHTML = '';
//                        }
//                    }
//                }
//            }


//            // CREATE DYNAMIC TABLE.
//            var table1 = document.createElement("table");
//            table1.className = 'table table-bordered';
//            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

//            //$(table1).css('width', '10%');

//            if (phenomenonList && phenomenonList.length > 0) {
//                for (var i = 0; i < phenomenonList.length; i++) {
//                    if (i % 5 == 0) {
//                        var tr = table1.insertRow(-1);                   // TABLE ROW.
//                    }

//                    var td = tr.insertCell(-1);
//                    td.innerHTML = '<div class="phenomenon-div">' + phenomenonList[i].pathwayName + '</div><div class="phenomenon-color" style="background-color:' + phenomenonList[i].colorCoding + ';">&nbsp;</div>';

//                    $(td).css('width', '20%');
//                    tr.appendChild(td);
//                }
//            }

//            var hr = document.createElement("hr");

//            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
//            var divContainer = document.getElementById("showData");
//            divContainer.innerHTML = '';
//            divContainer.appendChild(table);
//            divContainer.appendChild(hr);
//            divContainer.appendChild(table1);

//            $("#divLoader").hide();

//        }, error: function (error) {
//            $("#showData").hide();
//            $("#divLoader").hide();
//        }
//    });
//}

//function isColor(color) {
//    if (/^#[0-9A-F]{6}$/i.test(color)) {
//        return true;
//    }
//    else {
//        return false;
//    }
//}

//function getDiet(marker) {

//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    var diseaseIDs = ($('#ddlProblem').val()) ? $('#ddlProblem').val().toString() : '';

//    $.ajax({
//        method: "Post",
//        url: 'WebService/diseaseNutrientCascadeReport.asmx/getMarkerDiet',
//        dataType: 'json',
//        data: "{'diseaseIDs': '" + diseaseIDs + "','markerName':'" + marker + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        contentType: 'application/json',
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (response) {
//            var result = JSON.parse(response.d).responseValue;

//            var row = $("#tblMarkerDiet thead tr:first").clone();
//            $("#tblMarkerDiet tbody tr").remove();
//            $.each(result.Table, function (i) {
//                $('.td_SNo', row).text((i + 1) + '.');
//                $('.td_Food', row).text(this.foodName);

//                $("#tblMarkerDiet tbody").append(row);
//                row = $("#tblMarkerDiet thead tr:first").clone();
//            });

//            $('#modalMarkerDiet').modal('show');

//        }, error: function (error) {

//        }
//    });
//}

//function goToProportion(receptorId, moleculeName) {
//    var pathwayId = 113;
//    var pageLocation = '../project/test4.aspx?pathwayID=' + pathwayId + '&phenomenonID=' + receptorId + '&moleculeName=' + moleculeName;
//    window.open(pageLocation);
//}

//function getNutrientAchievement(moleculeName) {

//    var pid = ($('#txtPid').val().trim() != '') ? Number($('#txtPid').val().trim()) : 0;
//    var intakeDate = ($('#txtFromDate').val() != '') ? $('#txtFromDate').val() : '';
//    selectedNutrient = moleculeName;

//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    $.ajax({
//        method: "Post",
//        url: 'WebService/diseaseNutrientCascadeReport.asmx/getMarkerDietGraph',
//        dataType: 'json',
//        data: "{'pid': '" + pid + "','intakeDate':'" + intakeDate + "','markerName':'" + selectedNutrient + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        contentType: 'application/json',
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (response) {
//            var result = JSON.parse(response.d).responseValue;

//            var achievedNutrientList = result.Table;
//            var dNutrientsList = result.Table1;

//            var _html = '';
//            $.each(achievedNutrientList, function (i) {
//                var nutrientCategoryId = this.nutrientCategoryId;

//                _html += '<div class="col-md-12"> <div class="boldtextPadding">' + this.nutrientCategory + '</div></div>';

//                var index = 0;
//                $.each(dNutrientsList, function (j) {
//                    if (this.nutrientCategoryId == nutrientCategoryId) {
//                        index = index + 1;
//                        _html += '<div class="col-md-6 marginLeft0rem"> <div class="col-md-12 noPadding"> <div class="col-md-10 noPadding" style="cursor: pointer;"> ' + index + '. ' + this.nutrientName + ' ' + this.achievedNutrientValue + '/' + this.target + ' ' + this.unitName + ' </div> <div class="col-md-2 noPadding">' + (this.target == "0.000" ? '?' : this.achievedRDAPercentage) + '%</div> </div> <div class="col-md-12 noPadding"> <div class="progress"> <div class="progress-bar progress-bar-success td_progressbar" role="progressbar" aria-valuenow="' + this.achievedRDAPercentage + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + this.achievedRDAPercentage + '%; color: ' + this.achievedRDAColorCode + '; background-color: ' + this.achievedRDAColorCode + ';">&nbsp;</div> </div> </div> </div>';

//                        _html += '<div class="col-md-6 marginRight0rem"> <div class="col-md-12 noPadding"> <div class="col-md-4 noPadding">Extra:' + this.extraNutrientValue + ' ' + this.unitName + '</div> <div class="col-md-2 noPadding">' + this.extraRDAPercentage + '%</div> </div> <div class="col-md-12 noPadding"> <div class="progress"> <div class="progress-bar progress-bar-success td_progressbar" role="progressbar" aria-valuenow="' + this.extraRDAPercentage + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + this.extraRDAPercentage + '%; color: ' + this.extraRDAColorCode + '; background-color: ' + this.extraRDAColorCode + ';">&nbsp;</div> </div> </div> </div>';
//                    }
//                });

//            });

//            $('#divAchievementRDA').html(_html);
//            $('#divRdaGraph').html('');
//            $('#contentFood').html('');
//            $('#contentSuppliment').html('');
//            $('#divEndResult').html('');

//            $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
//            $("div.bhoechie-tab>div.bhoechie-tab-content").eq(0).addClass("active");
//            $("div.bhoechie-tab-menu>div.list-group>a").removeClass("active");
//            $("div.bhoechie-tab-menu>div.list-group>a").eq(0).addClass("active");

//            $("#modalNav").modal('show');
//            $('#modalNav .modal-title').text(moleculeName + ' Details');

//        }, error: function (error) {

//        }
//    });
//}


//function getRdaGraph() {

//    var pid = ($('#txtPid').val().trim() != '') ? Number($('#txtPid').val().trim()) : 0;
//    var intakeDate = ($('#txtDate').val() != '') ? $('#txtDate').val() : '';

//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }

//    $.ajax({
//        method: "Post",
//        url: 'WebService/diseaseNutrientCascadeReport.asmx/getRdaGraph',
//        dataType: 'json',
//        data: "{'pid': '" + pid + "','intakeDate':'" + intakeDate + "','markerName':'" + selectedNutrient + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        contentType: 'application/json',
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (response) {
//            var result = JSON.parse(response.d).responseValue;

//            plotGraph(result.Table2, result.Table);
//            plotGraphFood(result.Table3, result.Table);

//            var index = 0;
//            var _html = '<h3>' + selectedNutrient + ' Supplement Ideal Intake Data (RDA - ' + result.Table[0].rda + ' ' + result.Table[0].unitName + ')</h3>';
//            _html += '<table class="table table-bordered table-striped rdaTable"> <thead> <tr> <th>#</th> <th>Intake DateTime</th> <th>Intake Quantity (' + result.Table[0].unitName + ')</th> </tr> </thead> <tbody>';
//            $.each(result.Table1, function (i) {
//                index = i + 1;
//                _html += '<tr> <td>' + index + '</td> <td>' + this.intakeDateTime + '</td> <td>' + this.intakeQuantity + '</td> </tr>';

//            });
//            _html += '</tbody> </table>';

//            $('#divRdaGraph').html(_html);

//        }, error: function (error) {

//        }
//    });
//}

//function plotGraph(response, rdaDetail) {
//    $('#contentSuppliment').empty();
//    var data = response;
//    if (response.length > 0) {
//        var category = [];
//        var series = [];

//        //-------------Code For Graph--------------//

//        var filtered = [selectedNutrient];
//        var filteredToShow = ['Nutrient Value'];

//        setTimeout(function () {

//            var pointPlacement = -0.2;
//            var pointpadding = 0.2;
//            for (var i = 0; i < filtered.length; i++) {
//                var achived = [];
//                var rda = [];
//                rda.push(rdaDetail[0].rda);
//                for (var j = 0; j < data.length; j++) {
//                    category.push((data[j].intakeQuantity == '' ? '' : ('(' + data[j].intakeQuantity + ' ' + rdaDetail[0].unitName + ') ')) + data[j].graphTime);
//                    achived.push(Number(data[j].nutrientValue));

//                }

//                pointPlacement = pointPlacement + 0.2;
//                series.push({
//                    name: filteredToShow[i],
//                    data: achived,
//                    type: 'area',
//                    color: '#38d8c2',
//                    //pointPadding: 0.1,
//                    pointPlacement: pointPlacement,
//                    pointWidth: 30,
//                });

//                series.push({
//                    name: 'RDA',
//                    type: 'area',
//                    data: rda,
//                    dataLabels: {
//                        enabled: true,
//                        format: 'RDA-{y}'

//                    },
//                    enableMouseTracking: false,
//                });

//                pointpadding = pointpadding + 0.1;

//            }

//            Highcharts.chart('contentSuppliment', {
//                chart: {
//                    type: 'spline',
//                    scrollablePlotArea: {
//                        scrollPositionX: 1
//                    }
//                },
//                credits: {
//                    enabled: false
//                },
//                title: {
//                    text: 'Timeline Graph (Food & Supplement Ideal Intake)'
//                },

//                xAxis: {
//                    type: 'category',
//                    labels: {
//                        rotation: -55,
//                        style: {
//                            fontSize: '13px',
//                            fontFamily: 'Verdana, sans-serif'
//                        }
//                    }, categories: category
//                },
//                yAxis: {
//                    min: 0,
//                    title: {
//                        text: 'Value in ' + rdaDetail[0].unitName,
//                        style: {
//                            color: Highcharts.getOptions().colors[1]
//                        }
//                    },
//                    plotLines: [{
//                        color: 'red',
//                        width: 2,
//                        value: rdaDetail[0].rda
//                    }],
//                },
//                plotOptions: {
//                    column: {
//                        grouping: false,
//                        shadow: false,
//                        borderWidth: 0
//                    }
//                },
//                legend: {
//                    enabled: true
//                },

//                series: series
//            });
//        }, 100);
//        //-----------------------------------------//

//    }
//    else {
//        maketoast('error', 'Error', 'No data found !!');
//    }
//}

//function plotGraphFood(response, rdaDetail) {
//    $('#contentFood').empty();
//    var data = response;
//    if (response.length > 0) {
//        var category = [];
//        var series = [];

//        //-------------Code For Graph--------------//
//        var filtered = [selectedNutrient];
//        var filteredToShow = ['Nutrient Value'];

//        setTimeout(function () {

//            var pointPlacement = -0.2;
//            var pointpadding = 0.2;
//            for (var i = 0; i < filtered.length; i++) {
//                var achived = [];
//                var rda = [];
//                rda.push(rdaDetail[0].rda);
//                for (var j = 0; j < data.length; j++) {
//                    category.push((data[j].intakeQuantity == '' ? '' : ('(' + data[j].intakeQuantity + ' ' + rdaDetail[0].unitName + ') ')) + data[j].graphTime);
//                    achived.push(Number(data[j].nutrientValue));

//                }

//                pointPlacement = pointPlacement + 0.2;
//                series.push({
//                    name: filteredToShow[i],
//                    data: achived,
//                    type: 'area',
//                    color: '#38d8c2',
//                    //pointPadding: 0.1,
//                    pointPlacement: pointPlacement,
//                    pointWidth: 30,
//                });

//                series.push({
//                    name: 'RDA',
//                    type: 'area',
//                    data: rda,
//                    dataLabels: {
//                        enabled: true,
//                        format: 'RDA-{y}'

//                    },
//                    enableMouseTracking: false,
//                });

//                pointpadding = pointpadding + 0.1;

//            }

//            Highcharts.chart('contentFood', {
//                chart: {
//                    type: 'spline',
//                    scrollablePlotArea: {
//                        scrollPositionX: 1
//                    }
//                },
//                credits: {
//                    enabled: false
//                },
//                title: {
//                    text: 'Timeline Graph (Food Intake)'
//                },

//                xAxis: {
//                    type: 'category',
//                    labels: {
//                        rotation: -55,
//                        style: {
//                            fontSize: '13px',
//                            fontFamily: 'Verdana, sans-serif'
//                        }
//                    }, categories: category
//                },
//                yAxis: {
//                    min: 0,
//                    title: {
//                        text: 'Value in ' + rdaDetail[0].unitName,
//                        style: {
//                            color: Highcharts.getOptions().colors[1]
//                        }
//                    },
//                    plotLines: [{
//                        color: 'red',
//                        width: 2,
//                        value: rdaDetail[0].rda
//                    }],
//                },
//                plotOptions: {
//                    column: {
//                        grouping: false,
//                        shadow: false,
//                        borderWidth: 0
//                    }
//                },
//                legend: {
//                    enabled: true
//                },

//                series: series
//            });
//        }, 100);
//        //-----------------------------------------//

//    }
//    else {

//    }
//}

////function getPeakThalf(markerName) {

////    if (!UtilsCache.getSession('USERDETAILS')) {
////        window.location.href = "../../index.html";
////        return;
////    }
////    $.ajax({
////        type: "POST",
////        url: "WebService/signalingCascade.asmx/getMarkerDetail",
////        contentType: 'application/json',
////        dataType: 'json',
////        data: "{'cascadeName': '" + markerName + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
////        statusCode: {
////            401: function (xhr) {
////                window.location.href = "../../index.html";
////            }
////        },
////        success: function (data) {
////            var result = JSON.parse(data.d).responseValue;

////            var index = 0;
////            $('.clsPeakThalf').html(selectedNutrient + ' Peak / Thalf Value');
////            var _html = '<table class="table table-bordered table-striped rdaTable"> <thead> <tr> <th>#</th> <th>Peak Value</th> <th>Thalf Value</th> </tr> </thead> <tbody>';
////            $.each(result.Table, function (i) {
////                index = i + 1;
////                _html += '<tr> <td>' + index + '</td> <td>' + this.nutrientPeakValue + '</td> <td>' + this.nutrientTHalfValue + '</td> </tr>';

////            });
////            _html += '</tbody> </table>';

////            $('#divPeakThalf').html(_html);

////        },
////        error: function (error) {

////        }
////    });
////}

//function getEndResult(markerName) {

//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    var diseaseIDs = ($('#ddlProblem').val()) ? $('#ddlProblem').val().toString() : '';
//    var receptorIds = ($('#ddlPhenomenon').val()) ? $('#ddlPhenomenon').val().toString() : '';

//    $.ajax({
//        type: "POST",
//        url: "WebService/diseaseNutrientCascadeReport.asmx/getEndResult",
//        contentType: 'application/json',
//        dataType: 'json',
//        data: "{'diseaseIDs': '" + diseaseIDs + "','receptorIds': '" + receptorIds + "','markerName': '" + markerName + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (data) {
//            var result = JSON.parse(data.d).responseValue;

//            $('.clsEndResult').html(selectedNutrient + ' End Result');
//            var _html = '<div class="row-fluid">';
//            $.each(result.Table, function (j) {
//                if (j % 4 == 0) {
//                    _html += '</div><div class="row-fluid">';
//                }
//                _html += '<div class="span3">' + this.keyword + '</div>';
//            });
//            _html += '</div>';

//            $('#divEndResult').html(_html);

//        },
//        error: function (error) {

//        }
//    });
//}

//var getPageInfo = function () {
//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    $.ajax({
//        type: "POST",
//        url: "WebService/diseaseNutrientCascadeReport.asmx/getPageInfo",
//        contentType: 'application/json',
//        dataType: 'json',
//        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (data) {
//            var result = JSON.parse(data.d).responseValue;

//            var _html = '';
//            $.each(result.Table, function (j) {

//                _html += '<div class="row-fluid">';
//                _html += '<h4>' + this.title + '</h4>';
//                _html += '<p>' + this.description + '</p>';
//                _html += '</div>';
//            });

//            $('#divPageDescription').html(_html);
//            $('#modalPageDescription').modal('show');

//        },
//        error: function (error) {

//        }
//    });
//};

//function getRdaDetails(markerName) {

//    if (isEmpty(markerName)) {
//        alert("Please right-click on any marker !!");
//        return;
//    }
//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    $.ajax({
//        type: "POST",
//        url: "WebService/signalingCascade.asmx/getMarkerDetail",
//        contentType: 'application/json',
//        dataType: 'json',
//        data: "{'cascadeName': '" + markerName + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (data) {
//            var result = JSON.parse(data.d).responseValue;

//            var row = $($("#tblMarkerRDADetail thead tr")[0]).clone();
//            $("#tblMarkerRDADetail tbody tr").remove();

//            $.each(result.Table, function (index) {
//                $(".td_rda", row).html(this.rda);
//                $(".td_peakValue", row).text(this.nutrientPeakValue);
//                $(".td_tHalfValue", row).text(this.nutrientTHalfValue);

//                $("#tblMarkerRDADetail tbody").append(row);
//                row = $("#tblMarkerRDADetail thead tr").clone();
//            });

//        },
//        error: function (error) {

//        }
//    });
//}


function getItemStock(markerName) {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    //if (isEmpty(markerName)) {
    //    alert();
    //    return;
    //}
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getItemStock",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'keyword': '" + markerName + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $("#tblItemStocks thead tr").clone();
            $("#tblItemStocks tbody tr").remove();
            $.each(result.Table, function (index) {
                $(".td_Item", row).text(this.item);
                $(".td_Category", row).text(this.category);
                $(".td_Quantity", row).text(this.quantity);
                $(".td_StoreName", row).text(this.storeName);

                $("#tblItemStocks tbody").append(row);
                row = $("#tblItemStocks thead tr").clone();
            });
            $("#modalItemStock").show();
        },

        error: function (error) {

        }
    });
}

//function getTempratureDetails(markerName) {

//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    if (isEmpty(markerName)) {
//        alert("Please right-click on any marker !!");
//        return;
//    }
//    $.ajax({
//        type: "POST",
//        url: "WebService/SVGWebService.asmx/getTempratureDetails",
//        contentType: 'application/json',
//        dataType: 'json',
//        data: "{'markerName': '" + markerName + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (data) {
//            var result = JSON.parse(data.d).responseValue;

//            var row = $("#tblCookingTemprature thead tr").clone();
//            $("#tblCookingTemprature tbody tr").remove();
//            $.each(result.Table, function (index) {
//                $(".td_foodName", row).text(this.foodName);
//                $(".td_cookingMethod", row).text(this.cookingMethod);
//                $(".td_cookingTimeMinutes", row).text(this.cookingTimeMinutes);
//                $(".td_cookingTemperature", row).text(this.cookingTemperature);
//                $(".td_statusFor", row).text(this.statusFor);
//                $(".td_variationAmountPercentage", row).text(this.variationAmountPercentage + ' %');
//                $(".td_variationAmount", row).text(this.variationAmount);
//                $(".td_remark", row).text(this.remark);
//                $(".td_reference", row).text(this.reference);
//                $(".td_url", row).text(this.url);

//                $("#tblCookingTemprature tbody").append(row);
//                row = $("#tblCookingTemprature thead tr").clone();
//            });

//        },
//        error: function (error) {

//        }
//    });
//}


//function getTestMachineDetail(markerName) {

//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }

//    $.ajax({
//        type: "POST",
//        url: "WebService/pathwayMain1.asmx/getTestMachineDetail",
//        contentType: 'application/json',
//        dataType: 'json',
//        data: "{'keyword': '" + markerName + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (data) {
//            var result = JSON.parse(data.d).responseValue;

//            var row = $("#tblTestMachineDetail thead tr").clone();
//            $("#tblTestMachineDetail tbody tr").remove();

//            var instruction = '';
//            $.each(result.Table, function (index) {
//                $(".td_machineName", row).text(this.machineName);
//                $(".td_machineLocation", row).text(this.machineLocation);
//                $(".td_intercomNumber", row).text(this.intercomNumber);
//                $(".td_contactPerson", row).text(this.contactPerson);
//                $(".td_resultTime", row).text(this.resultTime);
//                $(".td_itemCharge", row).text(this.itemCharge);

//                if (this.instruction) {
//                    instruction += '<li>' + this.instruction + '</li>';
//                }

//                $("#tblTestMachineDetail tbody").append(row);
//                row = $("#tblTestMachineDetail thead tr").clone();
//            });

//            $("#instruction").html(instruction);

//        },
//        error: function (error) {

//        }
//    });
//}

//var tableToExcel = (function () {
//    var uri = 'data:application/vnd.ms-excel;base64,'
//        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
//        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
//        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
//    return function (table, name) {
//        if (!table.nodeType) table = document.getElementById(table)
//        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
//        window.location.href = uri + base64(format(template, ctx))
//    }
//})()

////var exportData = function () {
////    $("#markerTable").table2excel({
////        // exclude: ".excludeThisClass",
////        name: "Worksheet Name",
////        filename: "MarkerDietActivatorReport" //do not include extension
////    });
////};

//function getPDF() {

//    var HTML_Width = $("#markerTable").width();
//    var HTML_Height = $("#markerTable").height();

//    var top_left_margin = 10;
//    var PDF_Width = HTML_Width + (top_left_margin * 2);
//    var PDF_Height = (PDF_Width * 1) + (top_left_margin * 2);
//    var canvas_image_width = HTML_Width;
//    var canvas_image_height = HTML_Height;
//    //var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;


//    html2canvas($("#markerTable")[0], { allowTaint: true }).then(function (canvas) {
//        canvas.getContext('2d');

//        console.log(canvas.height + "  " + canvas.width);


//        var imgData = canvas.toDataURL("image/png", 1.0);
//        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
//        pdf.addImage(imgData, 'PNG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);


//        //for (var i = 1; i <= totalPDFPages; i++) {
//        //    pdf.addPage(PDF_Width, PDF_Height);
//        //    //pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
//        //    pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
//        //}

//        pdf.save("HTML-Document.pdf");
//    });
//};

