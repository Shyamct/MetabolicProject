//import { setTimeout } from "timers";

var pathwayId = 0;
var userLoginID = 1;

$(document).ready(function () {
    var url = window.location.href;
    pathwayId = getParameterByName('pathwayId', url);

    $('#txtPID').val("");

    $('#patientInvestigation').click(function () {
        getPatientInvestigation();
    });

    $('#findHighlightAll').prop('checked', true);    
});

var searchText = function (text) {

    if (!$('#findInput').is(":visible")) {
        $("#viewFind").trigger("click");
    }
    $("#findInput").val(text);

    setTimeout(function () {
        $("#findNext").trigger("click");
    }, 100);
}

var getPatientInvestigation = function () {

    var pid = ($('#txtPID')) ? Number($('#txtPID').val()) : 0;
    if (pid == 0) {
        alert('Please Enter PID');
        return;
    }
    $.ajax({
        type: "POST",
        url: "../WebService/SVGWebService.asmx/getPatientInvestigation",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pid': '" + pid + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;

            //if ($('#sidebarContainer').is(":visible")) {
            $("#sidebarToggle").trigger("click");
            //}            

            var html = '<table class="table table-bordered table-striped">';
            html += '<thead><tr><th>Investigation</th><th>Result</th></tr></thead>';
            html += '<tbody>';

            $.each(result, function (index) {
                html += '<tr style="cursor:pointer;"><td onclick="searchText(\'' + this.nutrientName + '\')">' + this.subTestName + '</td><td onclick="getEndResult (' + this.nutrientMasterID + ')">' + this.result + ' ' + this.unitName + '</td></tr>';
            });

            html += '</tbody></table>';

            //$('#investigationResultDiv').html('');
            $('#investigationResultDiv').html(html);

        },
        error: function (error) {

        }
    });
};

var getEndResult = function (nutrientId) {
    var pid = ($('#txtPID')) ? $('#txtPID').val() : 0;
    if (pid == 0) {
        alert('Please Enter PID');
        return;
    }
    $.ajax({
        type: "POST",
        url: "../WebService/SVGWebService.asmx/getEndResult",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'pid': '" + pid + "','nutrientId': '" + nutrientId + "','pathwayId':'" + pathwayId + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;

            var row = $($("#tblMarkerEndResult thead tr")[0]).clone();
            $("#tblMarkerEndResult tbody tr").remove();

            $.each(result, function (index) {
                $(".td_sNo", row).html(index + 1);
                $(".td_receptorName", row).text(this.pathwayName);
                $(".td_endResult", row).text(this.keyEndPoint);

                $("#tblMarkerEndResult tbody").append(row);
                row = $("#tblMarkerEndResult thead tr").clone();
            });

            $("#modalMarkerEndResult").modal('show');
            $('.modal-title').text('Marker End Result');

            console.log(result);
        },
        error: function (error) {

        }
    });
};

function createClickableSpan() {
    function handler(a) {
        alert(a);
    }

    $('span').append(function () {
        var a = $(this).text();
        return $(this).click(handler(a));
    })
}

//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Toggle Header
var toggleStatus = 1;
var toggleHeader = function () {
    if (toggleStatus == 1) {
        $('#toolbarContainer').css({ 'display': 'none' });
        $('#viewerContainer').css({ 'top': '0px' });
        toggleStatus = 0;
    } else {
        $('#toolbarContainer').css({ 'display': 'block' });
        $('#viewerContainer').css({ 'top': '32px' });
        toggleStatus = 1;
    }
};


// Trigger action when the contexmenu is about to be shown
var targetText = '';
$(document).bind("contextmenu", function (event) {

    // Avoid the real one
    event.preventDefault();

    if (event.target.tagName.toLowerCase() === 'span') {
        targetText = event.target.childNodes[0].textContent;
    }

    // Show contextmenu
    $(".custom-menu").finish().toggle(100).

        // In the right position (the mouse)
        css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        });
});

$(document).bind("mouseover", function (e) {

    if (e.target.tagName.toLowerCase() === 'span') {
        var spanText = event.target.childNodes[0].textContent;
        $(e.target).css('cursor', 'pointer');
        $(e.target).attr('title', spanText);
    }
});


// If the document is clicked somewhere
$(document).bind("mousedown", function (e) {

    // If the clicked element is not the menu
    if (!$(e.target).parents(".custom-menu").length > 0) {

        // Hide it
        $(".custom-menu").hide(100);
    }
});


// If the menu element is clicked
$(".custom-menu li").click(function () {

    // This is the triggered action name
    switch ($(this).attr("data-action")) {

        // A case for each action. Your actions here
        case "getMarkerDetail": getMarkerDetails(); break;
        case "getRDADetail": getRDADetail(); break;
        case "goToDiet": goToDiet(); break;
        case "getECGComparison": getECGComparison(); break;
    }

    // Hide it AFTER the action was triggered
    $(".custom-menu").hide(100);

    $('.modal-title').text(targetText);
    targetText = '';

});

function getMarkerDetails() {
    if (isEmpty(targetText)) {
        alert("Please right-click on any marker !!");
        return;
    }

    $.ajax({
        method: "Post",
        url: '../WebService/SVGWebService.asmx/getMarkerDetails',
        dataType: 'json',
        data: "{'pathwayId':'" + pathwayId + "','markerName':'" + targetText + "','empid':'" + userLoginID + "'}",
        contentType: 'application/json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d).responseValue;

            var row = $("#tblMarkerDetail thead tr:first").clone();
            $("#tblMarkerDetail tbody tr").remove();
            $.each(result.Table, function (i) {
                $('.td_SerialNo', row).text((i + 1) + '.');
                $('.td_Phenomenon', row).text(this.phenomenonName);
                $('.td_Parameter', row).text(this.parameterName);
                $('.td_StudyLevel', row).text(this.studyLevel);
                $('.td_Location', row).text(this.location);
                $('.td_Meaning', row).text(this.meaning);
                $('.td_CentralCompound', row).text(this.centralCompoundName);
                $('.td_AssociatedProblem', row).text(this.associatedProblemName);
                $('.td_ErasHypotdesis', row).text(this.erashypothesis);
                $('.td_StudyTreatment', row).html(this.studyTreatmentDetails);
                $('.td_OtderPatdwayDetails', row).html(this.otherPathwayDetails);
                $('.td_StudyReferenceDetails', row).html(this.studyReferenceDetails);
                $('.td_BloodBrainBarrierDetails', row).html(this.transporterDetails);

                $("#tblMarkerDetail tbody").append(row);
                row = $("#tblMarkerDetail thead tr:first").clone();
            });

            $('#modalMarkerDetail').modal('show');

        }, error: function (error) {

        }
    });
}

function getRDADetail() {

    $.ajax({
        type: "POST",
        url: "../WebService/signalingCascade.asmx/getMarkerDetail",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'cascadeName': '" + targetText + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $($("#tblMarkerRDADetail thead tr")[0]).clone();
            $("#tblMarkerRDADetail tbody tr").remove();

            $.each(result.Table, function (index) {
                $(".td_rda", row).html(this.rda);
                $(".td_peakValue", row).text(this.nutrientPeakValue);
                $(".td_tHalfValue", row).text(this.nutrientTHalfValue);

                $("#tblMarkerRDADetail tbody").append(row);
                row = $("#tblMarkerRDADetail thead tr").clone();
            });

            $("#modalMarkerRDADetail").modal('show');
        },
        error: function (error) {

        }
    });
}

var ecgNutrient = '';
function getECGComparison() {

    var leadName = ($("#ddlLead").val()) ? $("#ddlLead").val() : 'I';
    var pid = ($('#txtPID')) ? $('#txtPID').val() : 0;
    ecgNutrient = (targetText == '') ? ecgNutrient : targetText;

    if (pid == 0) {
        alert('Please Enter PID');
        return;
    }

    $.ajax({
        type: "POST",
        url: "../WebService/SVGWebService.asmx/getECGComparison",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'markerName': '" + ecgNutrient + "','leadName': '" + leadName + "','pid': '" + pid + "','empid':'" + userLoginID + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var ecgComparisonData = result.Table;
            var levelList = result.Table1;
            var patientRecord = result.Table2;

            var col = [];
            for (var i = 0; i < ecgComparisonData.length; i++) {
                var key = ecgComparisonData[i].subTestName + ' <span>(' + ecgComparisonData[i].result + ' ' + ecgComparisonData[i].unitName + ')' + '</span><span style="font-weight:normal; margin-left: 1rem;"> (' + ecgComparisonData[i].sampleCollectionDateTime + ') </span>';
                if (col.indexOf(key) === -1) {
                    col.push(key);
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

            tr = table.insertRow(-1);
            for (var i = 0; i < ecgComparisonData.length; i++) {

                var ecgLeadData = JSON.parse(ecgComparisonData[i].ecgLeadData);

                var html = '<table class="myTable">';
                html += '<thead><tr><th>ECG Data <span style="font-weight:normal; margin-left: 1rem;"> (' + ecgComparisonData[i].createdDate + ') </span></th></tr></thead>';
                html += '<tbody>';
                html += '<tr><td> PAmp : ' + ecgLeadData[0].PAmpV + ' ' + ecgLeadData[0].PAmpU + '</td></tr>';
                html += '<tr><td> QAmp : ' + ecgLeadData[0].QAmpV + ' ' + ecgLeadData[0].QAmpU + '</td><td> QDur : ' + ecgLeadData[0].QDurV + ' ' + ecgLeadData[0].QDurU + '</td></tr>';
                html += '<tr><td> RAmp : ' + ecgLeadData[0].RAmpV + ' ' + ecgLeadData[0].RAmpU + '</td><td> RDurV :' + ecgLeadData[0].RDurV + ' ' + ecgLeadData[0].RDurU + '</td></tr>';
                html += '<tr><td> SAmp : ' + ecgLeadData[0].SAmpV + ' ' + ecgLeadData[0].SAmpU + '</td><td> SDur : ' + ecgLeadData[0].SDurV + ' ' + ecgLeadData[0].SDurU + '</td></tr>';
                html += '<tr><td> STJAmp : ' + ecgLeadData[0].STJAmpV + ' ' + ecgLeadData[0].STJAmpU + '</td></tr>';
                html += '<tr><td> STMAmp : ' + ecgLeadData[0].STMAmpV + ' ' + ecgLeadData[0].STMAmpU + '</td></tr>';
                html += '<tr><td> STEAmp : ' + ecgLeadData[0].STEAmpV + ' ' + ecgLeadData[0].STEAmpU + '</td></tr>';
                html += '<tr><td> TAmp : ' + ecgLeadData[0].TAmpV + ' ' + ecgLeadData[0].TAmpU + '</td></tr>';
                html += '<tr><td> TAmpMax : ' + ecgLeadData[0].TAmpMaxV + ' ' + ecgLeadData[0].TAmpMaxU + '</td></tr>';
                html += '<tr><td> PAmpMax : ' + ecgLeadData[0].PAmpMaxV + ' ' + ecgLeadData[0].PAmpMaxU + '</td></tr>';
                html += '</tbody></table>';


                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = html;
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("divECGComparison");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);


            if ($("#ddlLead option").length == 0) {
                $.each(levelList, function () {
                    $("#ddlLead").append('<option value="' + this.leadName + '">' + this.leadName + '</option>');
                });

                $("#ddlLead").val(leadName);
            }

            $('#td_Name').html('Patient Name : <span style="font-weight:normal;">' + patientRecord[0].patientName + '</span>');
            $('#td_AgeGender').html('Age/Gender : <span style="font-weight:normal;">' + patientRecord[0].age + ' ' + patientRecord[0].ageUnit + ' / ' + patientRecord[0].gender + '</span>');
            $('#td_Ward').html('Ward : <span style="font-weight:normal;">' + patientRecord[0].wardName + '</span>');


            $("#modalECGComparisonDetail").modal('show');
            $('.modal-title').text('ECG Comparison');

        },
        error: function (error) {

        }
    });
}

function goToDiet() {
    var pageLocation = '../signalingCascade.aspx?pathwayId=' + pathwayId + '&cascadeName=' + targetText;
    window.open(pageLocation);
}

//function goToSamplePaper() {
//    window.open(researchSamplePaper);
//}