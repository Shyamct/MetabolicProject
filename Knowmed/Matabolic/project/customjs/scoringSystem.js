
$(document).ready(function () {
    getPathway();
});

var userID = Number(UtilsCache.getSession('USERDETAILS').userid);

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

function getProcess() {
    pathwayID = $("#ddlPathway").val();
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
   
        obj = {
            empid: userID,
            pathwayID: pathwayID
        }
    $.ajax({
        type: "POST",
        url: "WebService/scoringSystem.asmx/getProcess",
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
            $("#ddlProcess option:not(:first)").remove();
            $.each(result.Table, function () {
                $("#ddlProcess").append('<option value="' + this.processID + '">' + this.rankName + '</option>');
            });
        },
        error: function (error) {

        }
    });
}



function getReport() {
    pathwayID = $("#ddlPathway").val();
    processID = $("#ddlProcess").val();
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if (processID == "") {
        processID = null;
    }
    obj = {
        empid: userID ,
        pathwayID: pathwayID,
        processID: processID
    }
    console.log(obj);
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

           
            var tr;
            var nutrientCentral;
            var nutrientSubCentral;
            var nutrientSpecific;

            var secificCount = 5;
            var centralCount = 4;
            var subCentralCount = 3;
            var sub2CentralCount = 2;
            var sub3CentralCount = 1;

            var mild = 1;
            var moderate = 2;
            var severe = 3;

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
                                var HighLow = mainData[i].HighLow;
                                var compoundTypeScore = mainData[i].compoundTypeScore;
                                var MMSScoree = mainData[i].MMSScoree;

                                //if (scoreType == 'Mild') {
                                //    nutrientCentral += '<li>' + nutrientName + '<span style="font-size: 20px;">' + 4 + '</span>' + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + mild + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                                //else if (scoreType == 'Moderate') {
                                //    nutrientCentral += '<li>' + nutrientName + '<span style="font-size: 20px;">' + 4 + '</span>' + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + moderate + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                                //else if (scoreType == 'Severe') {
                                //    nutrientCentral += '<li>' + nutrientName + '<span style="font-size: 20px;">' + 4 + '</span>' + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + severe + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                                //else {
                                //    nutrientCentral += '<li>' + nutrientName + '<span style="font-size: 20px;">' + 4 + '</span>' + '<span style="font-size: large;">' + roleType + '</span>' + scoreType  + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                                nutrientCentral += '<li>' + nutrientName + "(" + compoundTypeScore + ")" + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + "(" + MMSScoree + ")" + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';


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
                                var HighLow = mainData[i].HighLow;
                                var compoundTypeScore = mainData[i].compoundTypeScore;
                                var MMSScoree = mainData[i].MMSScoree;
                               
                                //if (scoreType == 'Mild') {
                                //    nutrientSubCentral += '<li>' + nutrientName + '<span style="font-size: 20px;">' + 3 + '</span>' + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + mild + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                                //else if (scoreType == 'Moderate') {
                                //    nutrientSubCentral += '<li>' + nutrientName + '<span style="font-size: 20px;">' + 3 + '</span>' + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + moderate + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                                //else if (scoreType == 'Severe') {
                                //    nutrientSubCentral += '<li>' + nutrientName + '<span style="font-size: 20px;">' + 3 + '</span>' + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + severe + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                                //else {
                                //    nutrientSubCentral += '<li>' + nutrientName + '<span style="font-size: 20px;">' + 3 + '</span>' + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                                nutrientSubCentral += '<li>' + nutrientName + "(" + compoundTypeScore + ")" + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + "(" + MMSScoree + ")" + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';

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
                                var HighLow = mainData[i].HighLow;
                                var compoundTypeScore = mainData[i].compoundTypeScore;
                                var MMSScoree = mainData[i].MMSScoree;
                                console.log(roleType);
                                //if (scoreType == 'Mild') {
                                //    nutrientSpecific += '<li>' + nutrientName + '<span style="font-size: 20px;">' + 5 + '</span>' + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + mild + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                                //else if (scoreType == 'Moderate') {
                                //    nutrientSpecific += '<li>' + nutrientName + '<span style="font-size: 20px;">' + 5 + '</span>' + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + moderate + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                                //else if (scoreType == 'Severe') {
                                //    nutrientSpecific += '<li>' + nutrientName + '<span style="font-size: 20px;">' + 5 + '</span>' + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + severe + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                                //else {
                                nutrientSpecific += '<li>' + nutrientName + "(" + compoundTypeScore + ")" + '<span style="font-size: large;">' + roleType + '</span>' + scoreType + "("+ MMSScoree +")" + '<span style="font-size: large;">' + HighLow + '</span>' + '</li>';
                                //}
                            }
                        }
                    }
                    nutrientSpecific += '</ul>';


                    tr = tr + "<tr><td>" + val.rankName +  "(" + val.processScore+")" +"</td><td>" + nutrientCentral + "</td><td>" + nutrientSubCentral + "</td><td>" + nutrientSpecific + "</td></tr>";
                });
            }
            $("#tblReport tbody").append(tr);
            row = $("#tblReport thead tr").clone();

        },
        error: function (error) {

        }
    });
}