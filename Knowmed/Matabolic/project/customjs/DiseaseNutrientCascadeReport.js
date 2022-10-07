function multiSelect() {
    $('#ddlRank').multiselect({
        buttonWidth: '100%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Process',
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}
function multiSelectDisease() {
    $('#ddlProblem').multiselect({
        buttonWidth: '100%',
        includeSelectAllOption: true,
        nonSelectedText: 'Select Disease',
        enableCaseInsensitiveFiltering: true,        
        filterPlaceholder: 'Search Here...',
        maxHeight: 300
    });
}






//function addNote() {
//    $("#btnNote").click(function () {
//        var pageUrlnew = $(location).attr("href").split('/');
//        var pageURL = pageUrlnew[pageUrlnew.length - 1];
//        window.open("Note.aspx?" + pageURL);
        
//    });
//}

//function showPageNote() {
//    var pageUrlnew = $(location).attr("href").split('/');
//    var pageURL = pageUrlnew[pageUrlnew.length - 1];

//    var obj = {
//        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
//        "pageName": pageURL
//    };
//    $.ajax({
//        type: "POST",
//        url: "WebService/pageDescription.asmx/showNote",
//        contentType: 'application/json',
//        dataType: 'json',
//        data: JSON.stringify(obj),
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (data) {
//            var r = JSON.parse(data.d).responseValue;
//            $("#tblShowNote tbody tr").remove();
//            $.each(r.Table, function (i) {
//                var row = $("#tblShowNote thead tr").clone();
              

//                //var notee = '<span "' + this.note + '"></span>'; 

//                $('.td_Note', row).html(this.note);

//                $("#tblShowNote tbody").append(row);
//                row = $("#tblShowNote body tr:last").clone();
//            });
//        },
//        error: function (error) {

//        }
//    });
//}

$(function () {   

    var url = window.location.href;
    pageName = getPageName(url);

    $("#addInfo").click(function () {
        $("#addInfoModel").show();
        $("#btnUpdate").hide();
    });

    $("#moreInfo").click(function () {

        $("#modalDescription").show();
        showDescription();
      
    });
    $(".close").click(function () {
        $("#modalDescription").hide();
      
    }); $("#btnClose").click(function () {
        $("#modalDescription").hide();
      
    });
    $("#btnCancel").click(function () {
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


    var height1 = ($(window).height() - $('#header').height() - 147); 
    $("#showData1").height(height1);
    $(".report").height(height1);
    $("#showData2").height(height1 - 20);    
    getDiseaseList();
    getNutrientList();
    ;

});

var getDiseaseList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getDisease",
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
            $("#ddlDisease option:not(:first)").remove();           
            $.each(r.Table, function () {
                $("#ddlDisease").append('<option value="' + this.problemID + '">' + this.problemName + '</option>');
            });

            //$("#ddlProblem option").not(':first').remove();
            $("#ddlProblem option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#ddlProblem").append('<option value="' + this.problemID + '">' + this.problemName + '</option>');
            });

            if (!$('#ddlProblem').prop("multiple")) {
                $('#ddlProblem').prop("multiple", "multiple");
                multiSelectDisease();
                $("#ddlProblem").multiselect("clearSelection");
            }
        },
        error: function (error) {

        }
    });
};

var getNutrientList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var problemId = ($('#ddlProblem').val()) ? $('#ddlProblem').val().toString() : '';
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getNutrient",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'diseaseID':'" + problemId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;
            $("#ddlNutrient option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#ddlNutrient").append('<option value="' + this.nutrientID + '">' + this.nutrientName + '</option>');
            });

            $("#ddlProcess option:not(:first)").remove();
            $.each(r.Table1, function () {
                $("#ddlProcess").append('<option value="' + this.rankNo + '">' + this.rankName + '</option>');
            });

            $("#ddlPhenomenon option:not(:first)").remove();
            $.each(r.Table2, function () {
                $("#ddlPhenomenon").append('<option value="' + this.id + '">' + this.pathwayName + '</option>');
            });

            if ($('#ddlDisease').val() > 0) {
                getNutrientFunctionReport();
            }
            
        },
        error: function (error) {

        }
    });
};

var getNutrientFunctionReport = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if ($('#ddlDisease').val() == -1 || $('#ddlNutrient').val() == 0) {
        $("#showData").css("display", "none");
    }
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getNutrientFunctionReport",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'diseaseID':'" + $('#ddlProblem').val().toString() + "','rankNo':'" + Number($('#ddlProcess').val()) + "','phenomenonID':'" + $('#ddlPhenomenon').val().toString() + "','nutrientID':'" + Number($('#ddlNutrient').val()) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var countData = result.Table;
            var dataList = result.Table1;

            if ($('#ddlNutrient').val() > 0) {
                $("#showData").css("display", "block");

                $("#td_total", row).empty();
                $("#td_benefical", row).empty();
                $("#td_harmful", row).empty();
                $("#td_toEat", row).empty();
                $("#td_notToEat", row).empty();
                $("#nutrientName", row).empty();
                $("#td_total", row).text(countData[0].totalOccurance);
                $("#td_benefical", row).text(countData[0].totalBeneficial);
                $("#td_harmful", row).text(countData[0].totalHarmful);
                $("#td_toEat", row).text(countData[0].toEat);
                $("#td_notToEat", row).text(countData[0].notToEat);
                $("#nutrientName", row).html('Presence of <b>' + $('#ddlNutrient option:selected').text().trim() + '</b> in <b>' + $('#ddlDisease option:selected').text().trim() + '</b> Disease ');
            }

            //if (dataList.length > 0) {

                var row = $("#tblNutrientFunction thead tr").clone();
                $("#tblNutrientFunction tbody tr").remove();

                $.each(dataList, function (i) {
                    $(".td_sNum", row).text(i + 1);
                    $(".td_disease", row).text(this.problemName);
                    $(".td_pathway", row).text(this.pathwayName);
                    $(".td_role", row).html(this.roleType);
                    $(".td_function", row).html(this.nutrientFunction);

                    $("#tblNutrientFunction tbody").append(row);
                    row = $("#tblNutrientFunction thead tr").clone();
                });

                setTimeout(function () {

                    $("#myTable table tbody tr").each(function () {
                        var row = $(this);
                        if (row.find('td:eq(2)').text().replace(/(\r\n|\n|\r)/gm, "").match('Beneficial')) {
                            row.css('background-color', '#98FB98');
                        }
                        else if (row.find('td:eq(2)').text().replace(/(\r\n|\n|\r)/gm, "").match('Harmful')) {
                            row.css('background-color', '#F08080');
                        }
                    });

                }, 0);
            //}
        },
        error: function (error) {

        }
    });
};

var getFoodList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getFood",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'diseaseID':'" + Number($('#ddlDisease').val()) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            $("#ddlFood option:not(:first)").remove();
            $.each(result.Table, function () {
                $("#ddlFood").append('<option value="' + this.id + '">' + this.foodName + '</option>');
            });
            //$("#ddlFood").select2();
        },
        error: function (error) {

        }
    });
};

var getNutrientDetailList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if ($('#ddlDisease').val() == -1) {
        $("#showNutrient").css("display", "none");
    }
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getNutrientDetail",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'diseaseID':'" + Number($('#ddlDisease').val()) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var nutrientList = JSON.parse(data.d).responseValue.Table;

            if (nutrientList.length > 0) {
                $("#showNutrient").css("display", "block");

                var row = $("#myNutrientTable thead tr").clone();
                $("#myNutrientTable tbody tr").remove();

                $.each(nutrientList, function (index) {
                    $(".td_sNo", row).text(index + 1);
                    $(".td_cascadeNutrient", row).html(this.nutrientPathwayName);

                    $("#myNutrientTable tbody").append(row);
                    row = $("#myNutrientTable thead tr").clone();
                });
            }
        },
        error: function (error) {

        },
        complete: function () {

            getFoodList();
        }
    });
};

var getNutrientAndFoodReport = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if ($('#ddlDisease').val() == -1) {
        $("#showNutrient").css("display", "none");
    }
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getNutrientAndFoodReport",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'diseaseID':'" + Number($('#ddlDisease').val()) + "','foodID':'" + $('#ddlFood').val() + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var nutrientFoodList = JSON.parse(data.d).responseValue.Table;

            var colIndex = $('table').find('tr:first td').length;
            var headerExist = 0;
            $('table').find('tr:first td').each(function () {
                var cell = $(this);
                if (cell.text().replace(/(\r\n|\n|\r)/gm, "").indexOf($('#ddlFood option:selected').text()) > -1) {
                    headerExist = headerExist + 1;
                    return false;
                }
            });

            if (headerExist === 0) {

                $('table').find('tr:first td').eq(colIndex - 1).after('<td class="td_food"><b>' + $('#ddlFood option:selected').text() + '</b></td>');

                $('table').find('tr').each(function (index) {
                    if (index > 0) {
                        $(this).find('td').eq(colIndex - 1).after('<td style="text-align:center;"></td>');
                    }
                });

                setTimeout(function () {
                    $("table tbody tr").each(function () {
                        var row = $(this);
                        for (var i = 0; i < nutrientFoodList.length; i++) {

                            var nutrient = row.find('td:eq(1)').find('b').text().replace(/(\r\n|\n|\r)/gm, "");
                            if (nutrientFoodList[i].nutrientName.indexOf(nutrient) > -1) {
                                row.find('td:eq(' + colIndex + ')').html('&#10004;');
                            }
                        }
                    });

                }, 0);

            }
            else {
                maketoast('error', 'Error', 'Aready Added !!');
            }

        },
        error: function (error) {

        }
    });
};

var rankNo = '';
var getCascadeReport = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $("#divLoader").show();
   
    if ($('#ddlSearchType').val() == 1) {
        $('#showInteractedNutrient').hide();
        $('#showCascadeNutrient').show();

        var obj = {
            diseaseID: Number($('#ddlDisease').val()),
            roleType: $('#ddlRoleType').val(),
            interactionPresent: $('#ddlInteractionPresence').val(),
            interactionTypeID: $('#ddlInteractedNutrientType').val(),
            rankNo: $('#ddlRank').val().toString()
        };
        rankNo = $('#ddlRank').val().toString();
        $.ajax({
            type: "POST",
            url: "WebService/diseaseNutrientCascadeReport.asmx/getCascadeReport",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'dataArray':'" + JSON.stringify(obj) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (data) {
                var result = JSON.parse(data.d).responseValue;

                var row = $("#tblCascade thead tr").clone();
                $("#tblCascade tbody tr").remove();

                $.each(result.Table, function (index) {
                    $(".td_sNo", row).text(index + 1);
                    $(".td_cascadeNutrient", row).text(this.nutrientName);
                    $(".td_effectType", row).text(this.roleType);

                    $("#tblCascade tbody").append(row);
                    row = $("#tblCascade thead tr").clone();
                });
                if (result.Table1 && result.Table1.length > 0) {
                    var list = result.Table1;
                    $("#total").html(list[0].total);
                    $("#totalBeneficial").html(list[0].totalBeneficial);
                    $("#totalHarmful").html(list[0].totalHarmful);
                    $("#totalWithoutInteraction").html(list[0].totalWithoutInteraction);
                    $("#totalWithInteraction").html(list[0].totalWithInteraction);
                    $("#totalInteractionWithActivator").html(list[0].totalInteractionWithActivator);
                    $("#totalInteractionWithInhibitor").html(list[0].totalInteractionWithInhibitor);
                    $("#totalInteractionWithInhibitorAndActivator").html(list[0].totalInteractionWithInhibitorAndActivator);
                }

                $("#ddlRank option").remove();
                $.each(result.Table2, function (i) {
                    $('#ddlRank').append($('<option value="' + this.rankNo + '">' + this.rankName + '</option>'));
                });
                if (!$('#ddlRank').prop("multiple")) {
                    $('#ddlRank').prop("multiple", "multiple");
                    multiSelect();
                }   
             
                if (rankNo == '') {
                    $("#ddlRank").multiselect("clearSelection");
                }

                $("#ddlRank").val(rankNo);
            },
            error: function (error) {
                $("#divLoader").hide();
            }, complete: function () {
                $("#divLoader").hide();
            }
        });
    }
    else if ($('#ddlSearchType').val() == 2) {
        $('#showInteractedNutrient').show();
        $('#showCascadeNutrient').hide();

        var param = {
            diseaseID: Number($('#ddlDisease').val()),
            interactionType: $('#ddlInteractionType').val(),
            interactionTypeID: $('#ddlInteractedNutrientType').val()
        };
        $.ajax({
            type: "POST",
            url: "WebService/diseaseNutrientCascadeReport.asmx/getInteractedNutreintReport",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'dataArray':'" + JSON.stringify(param) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (data) {
                var result = JSON.parse(data.d).responseValue;

                var row = $("#tblInteractedNutrient thead tr").clone();
                $("#tblInteractedNutrient tbody tr").remove();

                $.each(result.Table, function (index) {
                    $(".td_sNo", row).text(index + 1);
                    $(".td_cascadeNutrient", row).text(this.nutrientName);
                    $(".td_interactedElement", row).text(this.interactedElementName);
                    $(".td_interactionWith", row).text(this.interactionWith);
                    $(".td_nutrientType", row).text(this.nutrientType);
                    $(".td_reference", row).text(this.reference);
                    $(".td_url", row).text(this.url);

                    console.log(this.interactionTypeID);
                    if (this.interactionTypeID == 0) {
                        $(row).css('background-color', '#ddd');
                    }
                    else {
                        $(row).css('background-color', '#ADD8E6');
                    }

                    $("#tblInteractedNutrient tbody").append(row);
                    row = $("#tblInteractedNutrient thead tr").clone();
                });

                if (result.Table1 && result.Table1.length > 0) {
                    var list = result.Table1;
                    $("#totalInteractedElement").html(list[0].total);
                    $("#totalActivator").html(list[0].totalActivator);
                    $("#totalInhibitor").html(list[0].totalInhibitor);
                    $("#totalInteractionWithoutEffect").html(list[0].totalInteractionWithoutEffect);
                    $("#totalNutrient").html(list[0].totalNutrient);
                    $("#totalFood").html(list[0].totalFood);
                }

            },
            error: function (error) {
                $("#divLoader").hide();
            }, complete: function () {
                $("#divLoader").hide();
            }
        });
    }

};

var getInteractedNutrientReport = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getInteractedNutrientReport",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'diseaseID':'" + Number($('#ddlDisease').val()) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;

            console.log(result);
        },
        error: function (error) {

        }
    });
};

function getSearchFilters() {
    if ($('#ddlSearchType').val() == 1) {
        $('#showInteractedNutrient').hide();
        $('#roleTypeDiv').show();
        $('#rankDiv').show();
        $('#interactionPresenceDiv').show();
        $('#interactionTypeDiv').hide();
    }
    else if ($('#ddlSearchType').val() == 2) {
        $('#showCascadeNutrient').hide();
        $('#roleTypeDiv').hide();
        $('#rankDiv').hide();
        $('#interactionPresenceDiv').hide();
        $('#interactionTypeDiv').show();
    }
}

function getMedication() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/diseaseNutrientCascadeReport.asmx/getMedication",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'PID': '" + $('#PID').val().trim() + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;

            var row = $("#tblMedicine thead tr").clone();
            $("#tblMedicine tbody tr").remove();
                       
            if (result.Table && result.Table.length > 0) {
                $("#showData2").show();
                $.each(result.Table, function (index) {
                    $(".td_Medicine", row).text(this.medicineName);
                    $(".td_Pathway", row).text(this.headName);
                    $(".td_Action", row).html('<div class="input-append"><span class="add-on" onclick="goToPathway(' + this.id + ',' + this.medicineID + ');" style="background-color: #FA9600; cursor: pointer;">Go</span> </div>');

                    $("#tblMedicine tbody").append(row);
                    row = $("#tblMedicine thead tr").clone();
                });
            }
            else {
                $("#showData2").hide();
            }

        }, error: function (error) {
            $("#showData2").hide();
        }
    });
}

function goToPathway(pathwayID, medicineID) {   
    var pid = $('#PID').val().trim();
    var pageLocation = '../project/test4.aspx?pathwayID=' + pathwayID + '&pid=' + pid + '&medicineID=' + medicineID;
    window.location.href = pageLocation;
}


