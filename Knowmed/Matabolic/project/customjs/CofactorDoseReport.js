function go() {
    getMoleculeCountReport();
}
function getMoleculeCountReport() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    };
    $("#showData").empty();
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain1.asmx/getMoleculeCountReport",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id':'" + $("#ddlMolecule option:selected").val() + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "','age':'" + $("#txtAge").val() + "','weight':'" + $("#txtWeight").val() + "','gender':'" + $("#ddlgenger option:selected").val() +"'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;
            var centralMoleculeList = JSON.parse(data.d).responseValue.Table1;

            console.log(centralMoleculeList);

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
                        return element.headName == col[j] && element.Molecule == result[i]['keyword'] && (result[i][col[j]] != null && result[i][col[j]] != '' ) ;
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
                $("#ddlMolecule").empty();
                $("#ddlMolecule").append('<option value="0">ALL</option>');
                $.each(allResult, function () {
                    $("#ddlMolecule").append('<option value="' + this.id + '">' + this.headName + '</option>');
                });
            }
            getMoleculeCountReport();
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