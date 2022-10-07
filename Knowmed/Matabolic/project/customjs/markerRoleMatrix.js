$(document).ready(function () {
    getNutrientHeader();
    getphenomenonHeader();
});

function getNutrientHeader() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/markerRoleMatrix.asmx/getNutrientHeader",
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

            $("#dllNutrient option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#dllNutrient").append(`<option    value="${this.nutrientID}"> ${this.nutrientName}</option>`);
            });
        },

        error: function (error) {

        }
    });
}

function getphenomenonHeader() {

    //var id = $("#dllNutrient").val();

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),

    };

    $.ajax({
        type: "POST",
        url: "WebService/markerRoleMatrix.asmx/getPhenomenons",
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

            $("#dllPhenomenon option:not(:first)").remove();
            $.each(r.Table, function () {

                $("#dllPhenomenon").append('<option value="' + this.processID + '">' + this.phenomenonName + '</option>');
            });
        },
        error: function (error) {

        }
    });
}

function showMarkerBaseMatrixReport(outputProblemID) {
   
    var id = $("#dllNutrient").val();
    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        "nutrientID": id,
    };
 
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: "WebService/markerRoleMatrix.asmx/getMarkerRoleMatrixReport",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {
            $("#loader").hide();
            var r = JSON.parse(data.d).responseValue;

            var col = ['S.no', 'Process'];
            $.each(r.Table, function (i, l) {
                if (col.indexOf(l.Disease) === -1) {
                    col.push(l.Disease);
                }
            });

            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");
            table.setAttribute("id", "matrixTable");
            $(table).css({
                'width': '100%'
            });

            table.className = 'table table-bordered table-striped';
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.


            // ROW FOR HEADER OF TABLE.
            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.  

                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            if (r.Table1.length > 0) {
                for (var i = 0; i < r.Table1.length; i++) {

                    tr = table.insertRow(-1);

                    for (var j = 0; j < col.length; j++) {
                        var tabCell = tr.insertCell(-1);

                        if (j == 0) {
                            tabCell.innerHTML = i + 1;
                        }
                        else if (j == 1) {
                            tabCell.innerHTML = r.Table1[i].problemName;
                        }
                        else {
                            var cellHtml = getStatusFor(col[j], r.Table1[i].problemName, r.Table);
                            tabCell.innerHTML = cellHtml;
                        }
                    }
                }
            }
            else {
                //$("div#content").html("<h2 class='null'>  Data Not Avilable!  </h2>");
            }
            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("divMatrix");
            divContainer.innerHTML = '';
            divContainer.appendChild(table);
            
        },
        error: function (error) {
           
        }

    });
}

function getStatusFor(disease, problem, list) {
    var returnValue = '';
    $.each(list, function (index, value) {
        if (value.problemName == problem && value.Disease == disease) {
            //if (value.problemWeightageID == 46) {
            //    returnValue = '<h4 style="background-color:red;color:black;width: 100px;">' + value.statusFor + '</h4>';
            //}
            //else if (value.problemWeightageID == 47) {
            //    returnValue = '<h4 style="background-color:yellow;color:black;width:100px;">' + value.statusFor + '</h4>';
            //}
            //else if (value.problemWeightageID == 48) {
            //    returnValue = '<h4 style="background-color:green;color:white;width: 100px;">' + value.statusFor + '</h4>';
            //}
            returnValue = value.statusFor +'<br>' +value.score;
            return false;
        }
    });
    return returnValue;
}


function showPhenonmenonBaseMatrixReport() {
   

    var id = $("#dllPhenomenon").val();


    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        "processID": id,
    };
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: "WebService/markerRoleMatrix.asmx/getPhenomenonRoleMatrixReport",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {
            $("#loader").hide();
           
            var r = JSON.parse(data.d).responseValue;

            var col = ['S.no', 'Problem'];
            $.each(r.Table, function (i, l) {
                if (col.indexOf(l.Disease) === -1) {
                    col.push(l.Disease);
                }
            });

            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");
            table.setAttribute("id", "matrixTable");
            $(table).css({
                'width': '100%'
            });

            table.className = 'table table-bordered table-striped';
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.


            // ROW FOR HEADER OF TABLE.
            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.  

                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            if (r.Table1.length > 0) {
                for (var i = 0; i < r.Table1.length; i++) {

                    tr = table.insertRow(-1);

                    for (var j = 0; j < col.length; j++) {
                        var tabCell = tr.insertCell(-1);

                        if (j == 0) {
                            tabCell.innerHTML = i + 1;
                        }
                        else if (j == 1) {
                            tabCell.innerHTML = r.Table1[i].problemName;
                        }
                        else {
                            var cellHtml = getStatusFor(col[j], r.Table1[i].problemName, r.Table);
                            tabCell.innerHTML = cellHtml;
                        }
                    }
                }
            }
            else {
                //$("div#content").html("<h2 class='null'>  Data Not Avilable!  </h2>");
            }
            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("divMatrix");
            divContainer.innerHTML = '';
            divContainer.appendChild(table);

        },
        error: function (error) {

        }

    });




}


$("#dllPhenomenon").select2({
    placeholder: "Select Process",
    allowClear: true
});
$("#txtSearch").select2({
    placeholder: "Select Nutrient",
    allowClear: true
});