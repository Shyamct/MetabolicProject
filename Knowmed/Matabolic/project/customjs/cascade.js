$(function () {
    var h = ($(window).height() - $('#header').height() - 146);
    $(".widget-content").css("min-height", h);

    getDiseaseList();
});

var getDiseaseList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/cascade.asmx/getDisease",
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
        },
        error: function (error) {

        }
    });
};

var process = phenomenon = 0;
var getSignalingCascade = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $("#divLoader").show();
    $("#showData").show();

    process = $('#ddlProcess option:selected').val();
    phenomenon = $('#ddlSignaling option:selected').val();

    obj = {
        diseaseID: $('#ddlDisease option:selected').val(),
        process: $('#ddlProcess option:selected').val(),
        receptorID: $('#ddlSignaling option:selected').val(),
        cascadeNutrient: $('#txtCascadeNutrient').val(),
        interactedNutrient: $('#txtFoodNutrient').val(),
        foodFamily: $('#txtFood').val()
    };
    $.ajax({
        type: "POST",
        url: "WebService/cascade.asmx/getSignalingCascade",
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
            
            var cascadeList = result.Table;
            if (cascadeList.length > 0) {

                var row = $("#tblSignaling thead tr").clone();
                $("#tblSignaling tbody tr").remove();
                $.each(cascadeList, function (i) {
                    var interactedElementList = JSON.parse(this.interactedElement);

                    var toEatActivatorList = toEatActivatorFoodList = toEatInhibitorList = toEatInhibitorFoodList = notToEatActivatorList = notToEatActivatorFoodList = notToEatInhibitorList = notToEatInhibitorFoodList = '<ul>';

                    $.each(interactedElementList, function (i) {
                        if (this.toEat === 'BE') {
                            if (this.ieType === 'N') {

                                var foodFamilyHTMLList1 = '';

                                if (this.hasOwnProperty("foodFamilyList")) {

                                    foodFamilyHTMLList1 = '<ul>';
                                    var foodFamilyList1 = this.foodFamilyList;
                                    var nutrientID1 = this.ieID;

                                    $.each(foodFamilyList1, function (i) {

                                        if (this.isCommon) {

                                            var pieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                            foodFamilyHTMLList1 += '<li><div><div class="commonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID1 + '" onclick="getFood(this)">' + this.ffName + '</div>' + pieChart + '</div></li>';
                                        }
                                        else {
                                            foodFamilyHTMLList1 += '<li><div class="uncommonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID1 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                        }
                                    });

                                    foodFamilyHTMLList1 += '</ul>';
                                }

                                toEatActivatorList += '<li><div style="width:100%"><span class="blink1">' + this.ieName + '</span></div><div class="foodFamilyPanel">' + foodFamilyHTMLList1 + '</div></li>';
                            }
                            else if (this.ieType === 'F') {
                                toEatActivatorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                            }
                        }
                        else if (this.toEat === 'HI') {
                            if (this.ieType === 'N') {

                                var foodFamilyHTMLList2 = '';

                                if (this.hasOwnProperty("foodFamilyList")) {

                                    foodFamilyHTMLList2 = '<ul>';
                                    var foodFamilyList2 = this.foodFamilyList;
                                    var nutrientID2 = this.ieID;

                                    $.each(foodFamilyList2, function (i) {

                                        if (this.isCommon) {

                                            var pieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                            foodFamilyHTMLList2 += '<li><div><div class="commonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID2 + '" onclick="getFood(this)">' + this.ffName + '</div>' + pieChart + '</div></li>';
                                        }
                                        else {
                                            foodFamilyHTMLList2 += '<li><div class="uncommonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID2 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                        }
                                    });

                                    foodFamilyHTMLList2 += '</ul>';
                                }

                                toEatInhibitorList += '<li><div style="width:100%"><span class="blink1">' + this.ieName + '</span></div><div class="foodFamilyPanel">' + foodFamilyHTMLList2 + '</div></li>';
                            }
                            else if (this.ieType === 'F') {
                                toEatInhibitorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                            }
                        }
                        else if (this.toEat === 'HE') {
                            if (this.ieType === 'N') {

                                var foodFamilyHTMLList3 = '';

                                if (this.hasOwnProperty("foodFamilyList")) {

                                    foodFamilyHTMLList3 = '<ul>';
                                    var foodFamilyList3 = this.foodFamilyList;
                                    var nutrientID3 = this.ieID;

                                    $.each(foodFamilyList3, function (i) {

                                        if (this.isCommon) {

                                            var pieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                            foodFamilyHTMLList3 += '<li><div><div class="commonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID3 + '" onclick="getFood(this)">' + this.ffName + '</div>' + pieChart + '</div></li>';
                                        }
                                        else {
                                            foodFamilyHTMLList3 += '<li><div class="uncommonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID3 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                        }
                                    });

                                    foodFamilyHTMLList3 += '</ul>';
                                }

                                notToEatActivatorList += '<li><div style="width:100%"><span class="blink2">' + this.ieName + '</span></div><div class="foodFamilyPanel">' + foodFamilyHTMLList3 + '</div></li>';
                            }
                            else if (this.ieType === 'F') {
                                notToEatActivatorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                            }
                        }
                        else if (this.toEat === 'BI') {
                            if (this.ieType === 'N') {

                                var foodFamilyHTMLList4 = '';

                                if (this.hasOwnProperty("foodFamilyList")) {

                                    foodFamilyHTMLList4 = '<ul>';
                                    var foodFamilyList4 = this.foodFamilyList;
                                    var nutrientID4 = this.ieID;

                                    $.each(foodFamilyList4, function (i) {

                                        if (this.isCommon) {

                                            var pieChart = '<div class="pieChart" dataKey="' + this.ffID + '-' + this.ffName + '" onclick="getFoodFamilyDetails(this)"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.bnP + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                                            foodFamilyHTMLList4 += '<li><div><div class="commonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID4 + '" onclick="getFood(this)">' + this.ffName + '</div>' + pieChart + '</div></li>';
                                        }
                                        else {
                                            foodFamilyHTMLList4 += '<li><div class="uncommonFoodFamily" dataKey="' + this.ffID + '-' + nutrientID4 + '" onclick="getFood(this)">' + this.ffName + '</div></li>';
                                        }
                                    });

                                    foodFamilyHTMLList4 += '</ul>';
                                }

                                notToEatInhibitorList += '<li><div style="width:100%"><span class="blink2">' + this.ieName + '</span></div><div class="foodFamilyPanel">' + foodFamilyHTMLList4 + '</div></li>';
                            }
                            else if (this.ieType === 'F') {
                                notToEatInhibitorFoodList += '<li><div class="uncommonFoodFamily">' + this.ieName + '</div></li>';
                            }
                        }
                    });

                    toEatActivatorList += '</ul>';
                    toEatActivatorFoodList += '</ul>';
                    toEatInhibitorList += '</ul>';
                    toEatInhibitorFoodList += '</ul>';
                    notToEatActivatorList += '</ul>';
                    notToEatActivatorFoodList += '</ul>';
                    notToEatInhibitorList += '</ul>';
                    notToEatInhibitorFoodList += '</ul>';

                    var processList = '';
                    var phenomenonList = ''; 
                                       
                    if (this.processList) {
                        processList += '<div class="process-name"> Process </div><ul class="process">'; 
                        var list = JSON.parse(this.processList);
                        $.each(list, function (i) {
                            processList += '<li>' + this.rankName + '</li>';
                        });
                        processList += '</ul>'; 
                    }
                    
                    if (this.pathwayList) {                        
                        phenomenonList += '<div class="process-name"> Phenomenon </div><ul class="process">';
                        var list1 = JSON.parse(this.pathwayList);
                        $.each(list1, function (i) {
                            phenomenonList += '<li>' + this.pathwayName + '</li>';
                        });
                        phenomenonList += '</ul>'; 
                    }

                    var cascadeNutrient = '<span style="cursor:pointer;" dataKey="' + this.nutrientID + '" onclick="getNutrientFunction(this)">' + this.nutrientName + '</span>' + processList + phenomenonList;

                    $(".td_ToEatActivator", row).html(toEatActivatorFoodList + toEatActivatorList);
                    $(".td_ToEatInhibitor", row).html(toEatInhibitorFoodList + toEatInhibitorList);
                    $(".td_CascadeNutrient", row).html(cascadeNutrient);
                    $(".td_NotToEatActivator", row).html(notToEatActivatorFoodList + notToEatActivatorList);
                    $(".td_NotToEatInhibitor", row).html(notToEatInhibitorFoodList + notToEatInhibitorList);
                    $("#tblSignaling tbody").append(row);
                    row = $("#tblSignaling thead tr").clone();
                });
                                
                $("#ddlSignaling option:not(:first)").remove();
                $.each(result.Table1, function (i) {
                    $("#ddlSignaling").append('<option value="' + this.receptorId + '">' + this.pathwayName + '</option>');
                });
                $("#ddlSignaling").val(phenomenon);

                $("#ddlProcess option:not(:first)").remove();
                $.each(result.Table2, function (i) {
                    $("#ddlProcess").append('<option value="' + this.rank + '">' + this.rankName + '</option>');
                });
                $("#ddlProcess").val(process);
            }
            else {
                maketoast('error', 'Error', 'No Data Found.');
                $("#divLoader").hide();
                $("#showData").hide();
            }
        },
        error: function (error) {
            $("#divLoader").hide();
            $("#showData").hide();
        }, complete: function () {
            $("#divLoader").hide();
        }
    });
};

var getNutrientFunction = function (e) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    if ($(e).parent().has('ul[class="nutrientFunction"]').length === 0) {
        $.ajax({
            type: "POST",
            url: "WebService/cascade.asmx/getNutrientFunction",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'nutrientID':'" + $(e).attr("dataKey") + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (data) {
                var result = JSON.parse(data.d).responseValue.Table;

                var functionHTMLList = '';
                if (result.length > 0) {
                    functionHTMLList += '<ul class="nutrientFunction">';

                    $.each(result, function () {
                        functionHTMLList += '<li>' + this.nutrientFunction + '</li>';
                    });
                    functionHTMLList += '</ul>';
                }
                $(e).after(functionHTMLList);
            },
            error: function (error) {

            }
        });
    } else {
        $(e).parent().children()[1].remove();
    }
};

var getFood = function (e) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var foodFamilyDiv = $(e);
    var dataArray = foodFamilyDiv.attr('dataKey').split('-');
    var foodFamilyID = dataArray[0];
    var nutrientID = dataArray[1];
    var diseaseID = $('#ddlDisease option:selected').val();

    if (foodFamilyDiv.parent().parent().has('ul').length === 0) {
        $("#divLoader").show();
        $.ajax({
            type: "POST",
            url: "WebService/cascade.asmx/getFood",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'foodFamilyID':'" + foodFamilyID + "','nutrientID':'" + nutrientID + "','diseaseID':'" + diseaseID + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (data) {
                var result = JSON.parse(data.d).responseValue.Table;
                console.log(result);

                foodHTMLList = '';
                if (result.length > 0) {

                    foodHTMLList += '<ul>';
                    $.each(result, function (i) {

                        if (this.isCommon) {

                            var pieChart = '<div class="pieChart"><svg height="20" width="20"><circle r="10" cx="10" cy="10" fill="green" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="red" stroke-width="10" stroke-dasharray="calc(' + this.badNutrientPercent + ' * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></svg></div>';

                            foodHTMLList += '<li><div dataKey="' + this.foodID + '-' + this.foodName + '" onclick="getFoodDetails(this)"><div class="commonFoodFamily" dataKey="' + this.foodID + '" onclick=getFoodDetails(this)>' + this.foodName + ' (' + this.foodNutrientValue + ' mg/100g)' + '</div>' + pieChart + '</div></li>';
                        }
                        else {
                            foodHTMLList += '<li><div class="uncommonFoodFamily">' + this.foodName + ' (' + this.foodNutrientValue + ' mg/100g)' + '</div></li>';
                        }
                    });

                    foodHTMLList += '</ul>';
                    foodFamilyDiv.parent().after(foodHTMLList);
                }
                else {
                    $("#divLoader").hide();
                }
            },
            error: function (error) {
                $("#divLoader").hide();
            }, complete: function () {
                $("#divLoader").hide();
            }
        });
    }
    else {
        foodFamilyDiv.parent().parent().children()[1].remove();
    }
};

var getFoodDetails = function (e) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var dataArray = $(e).attr('dataKey').split('-');
    var foodID = dataArray[0];
    var foodName = dataArray[1];

    $.ajax({
        type: "POST",
        url: "WebService/cascade.asmx/getFoodDetails",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'foodID':'" + foodID + "','diseaseID':'" + $('#ddlDisease option:selected').val() + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;

            var row = $("#tblFoodNutrientPercentage thead tr").clone();
            $("#tblFoodNutrientPercentage tbody tr").remove();
            $.each(result, function () {
                $(".td_foodNutrient", row).text(this.interactedNutrientName);
                $(".td_nutrientPercentage", row).text(this.nutrientPercentage + ' %');
                $(row).css('background-color', this.rowColor);
                $("#tblFoodNutrientPercentage tbody").append(row);
                row = $("#tblFoodNutrientPercentage thead tr").clone();
            });

        },
        error: function (error) {

        }
    });
    $('#myModal').modal('show');
    $('.modal-title').text(foodName);
};

var getFoodFamilyDetails = function (e) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var dataArray = $(e).attr('dataKey').split('-');
    var foodFamilyID = dataArray[0];
    var foodFamilyName = dataArray[1];

    $.ajax({
        type: "POST",
        url: "WebService/cascade.asmx/getFoodFamilyDetails",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'foodFamilyID':'" + foodFamilyID + "','diseaseID':'" + $('#ddlDisease option:selected').val() + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue.Table;

            var row = $("#tblNutrientPercentage thead tr").clone();
            $("#tblNutrientPercentage tbody tr").remove();
            $.each(result, function () {
                $(".td_nutrient", row).text(this.interactedNutrientName);
                $(".td_percentage", row).text(this.nutrientPercentage + ' %');                
                $(row).css('background-color', this.rowColor);               
                $("#tblNutrientPercentage tbody").append(row);
                row = $("#tblNutrientPercentage thead tr").clone();
            });
        },
        error: function (error) {

        }
    });
    $('#myModal1').modal('show');
    $('.modal-title').text(foodFamilyName);
};
