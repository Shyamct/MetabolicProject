
$(document).ready(function () {
    getPathway();
});

function getPathway() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
    }
    $.ajax({
        type: "POST",
        url: "WebService/scoringSystem.asmx/getPathway",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
           
            $("#ddlPathway option:not(:first)").remove();
            $.each(result.Table, function () {
                $("#ddlPathway").append('<option value="' + this.id + '">' + this.headName + '</option>');
            });
        },
        error: function (error) {

        }
    });
}


function getReport() {
    var pathwayID = $("#ddlPathway").val();
    var userID = Number(UtilsCache.getSession('USERDETAILS').userid);

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    //console.log(userID);
    obj = {
        empid: userID ,
        pathwayID: pathwayID
    }
    console.log(obj);
        //{ 'pathwayID': '" + pathwayID + "', 'empid': '" + userID + "' },
    
    $.ajax({
        type: "POST",
        url: "WebService/scoringSystem.asmx/getReport",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            $("#tblReport tbody tr").remove();

            //console.log(result);
            var tr;
            var nutrientCentral;
            var nutrientSubCentral;
            var nutrientSpecific;
            if (result.Table.length > 0) {
                $.each(result.Table, function (i, val) {

                    var mainData = JSON.parse(result.Table[i].MarkerLIST);
                    nutrientCentral = '';
                    nutrientCentral += '<ul>';
                    if (mainData != undefined || mainData != null || mainData != 0) {
                        for (var i = 0; i < mainData.length; i++) {
                            if (mainData[i].compoundType == 'Central') {
                                var nutrientName = mainData[i].nutrientName;
                                var roleType = mainData[i].problemWaitage;
                                var scoreType = mainData[i].scoreType;

                                if (scoreType != undefined || scoreType != null) {
                                    var scoreTypeName = scoreType;
                                }

                                nutrientCentral += '<li>' + nutrientName + roleType + scoreTypeName+ '</li>';
                            }
                        }
                    }
                    nutrientCentral += '</ul>';


                    nutrientSubCentral = '';
                    nutrientSubCentral += '<ul>';
                    if (mainData != undefined || mainData != null || mainData != 0) {
                        for (var i = 0; i < mainData.length; i++) {
                            if (mainData[i].compoundType == 'Sub Central') {
                                var nutrientName = mainData[i].nutrientName;
                                var roleType = mainData[i].problemWaitage;
                                var scoreType = mainData[i].scoreType;

                                if (scoreType != undefined || scoreType != null)  {
                                    var scoreTypeName = scoreType;

                                }
                                nutrientSubCentral += '<li>' + nutrientName + roleType + scoreTypeName+ '</li>';
                            }
                        }
                    }
                    nutrientSubCentral += '</ul>';



                    nutrientSpecific = '';
                    nutrientSpecific += '<ul>';
                    if (mainData != undefined || mainData != null || mainData != 0) {
                        for (var i = 0; i < mainData.length; i++) {
                            if (mainData[i].compoundType == 'Specific') {
                              var nutrientName = mainData[i].nutrientName;
                                var roleType = mainData[i].problemWaitage;
                                var scoreType = mainData[i].scoreType;

                                if (scoreType != undefined || scoreType != null) {
                                    var scoreTypeName = scoreType;

                                }
                                nutrientSpecific += '<li>' + nutrientName + roleType + scoreTypeName+'</li>';
                            }
                        }
                    }
                    nutrientSpecific += '</ul>';


                    tr = tr + "<tr><td>" + val.rankName + "</td><td>" + nutrientCentral + "</td><td>" + nutrientSubCentral + "</td><td>" + nutrientSpecific + "</td></tr>";
                });
            }
            $("#tblReport tbody").append(tr);
            row = $("#tblReport thead tr").clone();

        },
        error: function (error) {

        }
    });
}