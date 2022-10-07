$(function () {
    getPathwayList();
});
var pathwayId = 0;

var getPathwayList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/pathwayMain.asmx/getKeyword",
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
            $("#ddlKeywordAfter option:not(:first)").remove();
            $("#ddlKeywordbefore option:not(:first)").remove();
            $("#ddlCenterObject option:not(:first)").remove();
            $("#ddlRelationshipbefore option:not(:first)").remove();
            $("#ddlRelationshipAfter option:not(:first)").remove();
            $("#ddlcausebefore option:not(:first)").remove();
           $("#ddlcauseAfter option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#ddlKeywordAfter").append('<option value="' + this.id + '">' + this.keyword + '</option>');
                $("#ddlKeywordbefore").append('<option value="' + this.id + '">' + this.keyword + '</option>');
                $("#ddlCenterObject").append('<option value="' + this.id + '">' + this.keyword + '</option>');
                $("#ddlcausebefore").append('<option value="' + this.keyword + '">' + this.keyword + '</option>');
                $("#ddlcauseAfter").append('<option value="' + this.keyword + '">' + this.keyword + '</option>');
            });

            $.each(r.Table1, function () {
                $("#ddlRelationshipbefore").append('<option value="' + this.relationName + '">' + this.relationName + '</option>');
                $("#ddlRelationshipAfter").append('<option value="' + this.relationName + '">' + this.relationName + '</option>');
            });

            var row = $("#sideBar li:first").clone();
            $("#sideBar li").remove();
            $.each(r.Table2, function () {
                $('.pathwayName', row).html('<i class="icon-chevron-right"></i>' + this.headName);
                $('.pathwayName', row).attr('onclick', 'getpathwayId(' + this.id + ',this)');
                $("#sideBar").append(row);
                row = $("#sideBar li:first").clone();
            });

            $("#ddlKeywordAfter").select2();
            $("#ddlKeywordbefore").select2();
            $("#ddlCenterObject").select2();
            $('#ddlcausebefore').select2();
            $('#ddlcauseAfter').select2();


        },
        error: function (error) {

        }
    });
};

var AddStepBefore = function () {
    var inPresenceOf = ""; 
    if ($("#ddlCenterObject option:selected").val() != "0" && $("#ddlKeywordbefore option:selected").val() != "0" /*&& $("#ddlcausebefore option:selected").val() != "0"*/) {
        $.each($("#ddlcausebefore").select2('data'), function () {
            inPresenceOf += this.text+', ';
        });
        var row = $("#tblStepBefore thead tr").clone(true);
        $(".td_keyword", row).text($("#ddlKeywordbefore option:selected").text()).attr('keyId', $("#ddlKeywordbefore option:selected").val());
        $(".td_relation", row).text($("#ddlRelationshipbefore option:selected").text());
        $(".td_cause", row).text(inPresenceOf);
        $(".td_action", row).html('<i onclick="removeRow(this)" style="cursor:pointer">Delete</i>');
        $("#tblStepBefore tbody").append(row);
        $("#ddlCenterObject").attr('disabled', 'disabled');
        $("#ddlKeywordbefore").val('0');
        $("#ddlRelationshipbefore").val('0');
        $("#ddlKeywordbefore").select2("val", "0");
        $("#ddlcausebefore").select2("val", "");       
    } else {
        alert("Please Select main keyword");
    }

}

var AddStepAfter = function () {
    var inPresenceOf = ""; 
    if ($("#ddlCenterObject option:selected").val() != "0" && $("#ddlKeywordAfter option:selected").val() != "0" /*&& $("#ddlcauseAfter option:selected").val() != "0"*/) {
        $.each($("#ddlcauseAfter").select2('data'), function () {
            inPresenceOf += this.text + ', ';
        });
        var row = $("#tblStepAfter thead tr").clone(true);
        $(".td_keyword", row).text($("#ddlKeywordAfter option:selected").text()).attr('keyId', $("#ddlKeywordAfter option:selected").val());;
        $(".td_relation", row).text($("#ddlRelationshipAfter option:selected").text());
        $(".td_cause", row).text($("#ddlcauseAfter option:selected").text());
        $(".td_action", row).html('<i onclick="removeRow(this)"  style="cursor:pointer">Delete</i>');
        $("#tblStepAfter tbody").append(row);
        $("#ddlCenterObject").attr('disabled', 'disabled');
        $("#ddlKeywordAfter").val('0');
        $("#ddlRelationshipAfter").val('0');
        $("#ddlKeywordAfter").select2("val", "0");       
        $("#ddlcauseAfter").select2("val", "");       
    } else {
        alert("Please Select main keyword");
    }
};


var removeRow = function (e) {
    $(e).closest('tr').remove();
    var totalLength = 0;
    totalLength += $('#tblStepBefore tbody tr').length;
    totalLength += $('#tblStepAfter tbody tr').length;
    if (totalLength < 1) {
        $("#ddlCenterObject").removeAttr('disabled');
    }
}

var save = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var items = [];
    $("#tblStepBefore tbody tr").each(function () {
        if ($(this).hasClass('alreadyExists')) {
        } else {
            items.push({
                keyid: $(this).find('.td_keyword').attr('keyId'),
                role: 'Before',
                relation: $(this).find('.td_relation').text(),
                cause:$(this).find('.td_cause').text()
            });
        }

    });

    $("#tblStepAfter tbody tr").each(function () {
        if ($(this).hasClass('alreadyExists')) {
        } else {
            items.push({
                keyid: $(this).find('.td_keyword').attr('keyId'),
                role: 'After',
                relation: $(this).find('.td_relation').text(),
                cause: $(this).find('.td_cause').text()
            });
        }
    });
    var mainKey = $("#ddlCenterObject option:selected").val();
    if (items.length > 0) {
        $.ajax({
            type: "POST",
            url: "WebService/pathwayMain.asmx/Insert",
            contentType: 'application/json',
            dataType: 'json',           
            data: "{'mainid':'" + mainKey + "','arrobj':'" + JSON.stringify(items) + "','pathwayId':'" + pathwayId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.responseCode == 1) {
                    maketoast('success', 'Success', 'Save Successfully.');
                    $("#tblStepAfter tbody tr").find('.td_action').html('<input type="button" value="Choose for next Step" class="btn btn-default" onclick="forNextStep(this)" />');
                }

            },
            error: function (error) {

            }
        });
    } else {
        alert('Please add atleast one object');
    }
   

};

var forNextStep = function (e) {
    var keyId = $(e).closest('tr').find('.td_keyword').attr('keyId');
    $("#ddlCenterObject").removeAttr('disabled');
    $("#ddlCenterObject").val(keyId);
    $("#ddlCenterObject").select2("val", keyId);
    $("#tblStepAfter tbody tr").remove();
    $("#tblStepBefore tbody tr").remove();
};

var getExistingKeyword = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if ($("#ddlCenterObject option:selected").val() != "0") {
        $("#tblStepBefore tbody tr").remove();
        $("#tblStepAfter tbody tr").remove();
        $.ajax({
            type: "POST",
            url: "WebService/pathwayMain.asmx/getExistingKeyword",
            contentType: 'application/json',
            data: "{'keyId':'" + $("#ddlCenterObject option:selected").val() + "','pathwayid':'" + pathwayId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            dataType: 'json',
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },

            success: function (data) {
                var r = JSON.parse(data.d).responseValue;
                var row = $("#tblStepBefore thead tr").clone(true);
                var row1 = $("#tblStepAfter thead tr").clone(true);
                $.each(r.Table, function () {
                    console.log(this.role);
                    if (this.role == 'Before') {
                        $(row).attr("class", "alreadyExists");
                        $(".td_keyword", row).text(this.keyword).attr('keyId', this.keyid);;
                        $(".td_relation", row).text(this.relation);
                        $(".td_cause", row).text(this.cause);
                        $(".td_action", row).html('');
                        $("#tblStepBefore tbody").append(row);
                        row = $("#tblStepBefore thead tr").clone(true);
                    } else {
                        $(row1).attr("class", "alreadyExists");
                        $(".td_keyword", row1).text(this.keyword).attr('keyId', this.keyid);;
                        $(".td_relation", row1).text(this.relation);
                        $(".td_cause", row1).text(this.cause);
                        $(".td_action", row1).html('');
                        $("#tblStepAfter tbody").append(row1);
                        row1 = $("#tblStepAfter thead tr").clone(true);
                    }
                });
            },
            error: function (error) {

            }
        });
    }
}

var getpathwayId = function (id, e) {
    pathwayId = id;
    $("#sideBar li").removeClass('active');
    $(e).closest('li').addClass('active');
    $("#tblStepBefore tbody tr").remove();
    $("#tblStepAfter tbody tr").remove();
    $("#divrelationShip").show();
    $("#ddlKeywordAfter").val('0');
    $("#ddlRelationshipAfter").val('0');
    $("#ddlcauseAfter").val('0');
    $("#ddlKeywordbefore").val('0');
    $("#ddlRelationshipbefore").val('0');
    $("#ddlcausebefore").val('0');
    $("#ddlCenterObject").val('0');

    $("#ddlCenterObject").select2("val", keyId);
}


var select = $('select');

function formatSelection(state) {
    return state.text;
}

function formatResult(state) {
    console.log(state)
    if (!state.id) return state.text; // optgroup
    var id = 'state' + state.id.toLowerCase();
    var label = $('<label></label>', { for: id })
        .text(state.text);
    var checkbox = $('<input type="checkbox">', { id: id });

    return checkbox.add(label);
}

