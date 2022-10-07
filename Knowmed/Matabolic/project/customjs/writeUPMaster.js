var pathwayId = 0;
var sampleTags = [];
var updateId = 0;
var highlight = [];

function htmlEncode(value) {
    if (value) {
        return $('<div />').text(value).html();
    } else {
        return '';
    }
}

function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    } else {
        return '';
    }
}
$(function () {
    getWriteUp(pathwayId);
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    function split(val) {
        return val.split(/ \s*/);
    }

    function extractLast(term) {
        return split(term).pop();
    }
    tagState = highlight;
    $("#mytextarea").autocomplete({
        minLength: 2,
        autoFocus: true,
        source: function (request, response) {

            //var results = [],
            selectionStart = this.element[0].selectionStart
            term = extractLast(request.term.substring(0, selectionStart));
            var filteredArray = $.map(tagState, function (item) {
                //if (item.original.startsWith(term)) {
                return {
                    label: item.original,
                    value: item.original
                };
                //} else {
                //   return null;
                //}

            });
            response($.ui.autocomplete.filter(filteredArray, term));
        },
        focus: function () {
            return false;
        },
        select: function (event, ui) {
            var terms = split(this.value.substring(0, this.selectionStart));
            terms.pop();  // remove the current input
            terms.push(ui.item.value);        // add the selected item
            this.value =
                $.trim(terms.join(" ") + this.value.substring(this.selectionStart)) + " ";
            return false;
        }
    }).on("keydown", function (event) {
        if (event.keyCode === $.ui.keyCode.TAB) {
            event.preventDefault();
            return;
        }

    });
    var height = ($(window).height() - $('#header').height() - 10);
    $("#content").attr('style', 'min-height:' + height + 'px');
});

function checkKey() {
    $('textarea').highlightWithinTextarea('update');
    $('textarea').highlightWithinTextarea({
        highlight: highlight
    });
}

function addNote() {
    $("#btnNote").click(function () {
        var pageUrlnew = $(location).attr("href").split('/');
        var pageURL = pageUrlnew[pageUrlnew.length - 1];
        window.open("Note.aspx?" + pageURL);
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


$(function () {
    addNote();
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
    getPathwayList();
});

var getPathwayList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/flowChart.asmx/getPathwayList",
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
            var row = $("#sidebar ul li:first").clone();
            $("#sidebar ul li").remove();
            //$.each(r.Table, function () {
            //    $('.pathwayName', row).html('<i class="icon icon-home"></i><span>' + this.headName + '</span>');
            //    $('.pathwayName', row).attr('onclick', 'getpathwayId(' + this.id + ',this)');
            //    $("#sidebar ul").append(row);
            //    row = $("#sidebar ul li:first").clone();
            //});

            $.each(r.Table1, function () {
                if (this.keyword.match(/^[ A-Za-z0-9_-]+$/)) {
                    var aa = "\\b" + this.keyword.toLowerCase() + "\\b";
                    highlight.push({
                        highlight: new RegExp(aa, 'ig'),
                        className: 'red',
                        original: this.keyword.toLowerCase()
                    });
                    highlight.push({
                        highlight: new RegExp('↑' + aa, 'ig'),
                        className: 'red',
                        original: '↑' + this.keyword.toLowerCase()
                    });
                    highlight.push({
                        highlight: new RegExp('↓' + aa, 'ig'),
                        className: 'red',
                        original: '↓' + this.keyword.toLowerCase()
                    });
                }

            });
            $.each(r.Table2, function () {
                if (this.relationName.match(/^[ A-Za-z0-9_-]+$/)) {
                    var aa = "\\b" + this.relationName.toLowerCase() + "\\b";
                    highlight.push({
                        highlight: new RegExp(aa, 'ig'),
                        className: 'green',
                        original: this.relationName.toLowerCase()
                    });
                }
            });
            $("#ddlReceptor option:not(:first)").remove();
            $.each(r.Table3, function () {
                $("#ddlReceptor").append('<option value="' + this.id + '">' + this.pathwayName + '</option>');
            });

            highlight.push({
                highlight: '.',
                className: 'white',
                original: '.'
            }, {
                    highlight: 'further',
                    className: 'white',
                    original: 'further'
                }, {
                    highlight: 'and',
                    className: 'white',
                    original: 'and'
                });
        },
        error: function (error) {
        }
    });
};

var getpathwayId = function (id, e) {
    //$("#span10").show();
    $(".pathwayName").closest('li').removeClass('active');
    $(e).closest('li').addClass('active');
    pathwayId = id;
    getWriteUp(id);
};

function getWriteUp(id) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/writeUpMaster.asmx/getWriteUp",
        contentType: 'application/json',
        data: "{'id':'" + id + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        dataType: 'json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            var row = $("#tblWriteUp thead tr").clone();
            $("#tblWriteUp tbody tr").remove();
            $.each(result, function (index) {
                var itemList = this;
                $(".td_WriteUp", row).text(this.writeUp);
                $(".td_Receptor", row).text(this.keyword);
                $(".td_orginal", row).text(this.orginalWriteUp);
                //$(".td_check", row).html('<input type="checkbox" id="chk_' + this.id + '" onchange="addReceptorToUpdate(' + this.id + ')" style="width:20px" />');
                //$(".td_rank", row).html('<input type="number" id="txt_' + this.id + '" disabled="true" onchange="updateRank(' + this.pathwayId + ',this.value)" style="width:50px"  value="' + this.rank + '"/>');    
                //$(".td_sno", row).html('<input type="number" onchange="update(' + this.id + ',\'' + this.rank + '\', this.value)" style="width:50px"  value="' + this.sno + '"/>');
                $(".td_action", row).html('<i class="icon-edit" onclick="Delete(' + this.id + ',this,' + this.receptorId + ')"></i>');
                $("#tblWriteUp tbody").append(row);
                row = $("#tblWriteUp thead tr").clone();
                //$("#preview").append('<div class="span12" style="border-bottom: 1px solid #eae5e5;"><div class="span1">' + (index+1)+'</div><div class="span8">' + this.writeUp + '</div><div class="span2">' + this.keyword + '</div><div class="span1"><i class="icon-edit" onclick="Delete(' + this.id + ',\'' + this.orginalWriteUp + '\',' + this.receptorId+')"></i></div></div>');
            });
        },
        error: function (error) {
        }
    });
}

var save = function () {
    var res = [];
    var nutrientList = [];
    var node = $('.hwt-content mark').length;
    for (var i = 0; i < node; i++) {
        var cdiv = $('.hwt-content mark:eq(' + i + ')');
        if (cdiv.attr('class') == 'red') {
            if (cdiv.text().indexOf('↑') > -1) {
                nutrientList.push({
                    nutrientName: cdiv.text().replace('↑', ''),
                    roleType: 'B'
                });
            } else if (cdiv.text().indexOf('↓') > -1) {
                nutrientList.push({
                    nutrientName: cdiv.text().replace('↓', ''),
                    roleType: 'H'
                });
            }

            res.push('@' + cdiv.text().replace('↑', '').replace('↓', ''));
        }
        if (cdiv.attr('class') == 'green') {
            res.push('*' + cdiv.text());
        }
        if (cdiv.attr('class') == 'white') {
            res.push(cdiv.text());
        }
        if ($('.hwt-content mark:eq(' + i + ') mark').length > 0) {
            i = i + $('.hwt-content mark:eq(' + i + ') mark').length;
        }
    }
    //if (!UtilsCache.getSession('USERDETAILS')) {
    //    window.location.href = "../../index.html";
    //    return;
    //}
    if ($("#ddlReceptor option:selected").val() == '0') {
        alert('Please Select phenomenon');
        return;
    }
    var orginalWriteUp = $('.hwt-backdrop .hwt-content').html();
    var writeUp = $('#mytextarea').val().replace(/[\@$*#]/gi, '').replace(/,/g, ' ');
    //var res = $('#mytextarea').val().replace(/\./g, ' . ').split(' ');
    ////console.log($('#mytextarea').val().replace(/\./g, ' .'));
    var finalArr = [];
    var keysFrom = [];
    var keysTo = [];
    var relation = [];
    var types = "";
    var causeWord = "";
    var isBefore = true;
    var fromString = "";
    var toString = "";
    var count = 0;
    var countIndex = 0;
    var nextIndex = 0;
    var objectCount = -1;

    for (var i = 0; i < res.length; i++) {
        if (res[i].toLowerCase().trim() != 'further') {
            if (res[i].toLowerCase().trim() != '.') {
                if (res[i].toLowerCase().trim() != 'and') {
                    if (res[i].indexOf('@') > -1) {
                        if (isBefore) {
                            fromString += res[i].replace(/[\@$*#]/gi, '').replace(/_/g, ' ').trim() + '~';
                            //keysFrom.push(res[i].replace(/[\@$*#]/gi, ''));
                        } else {
                            toString += res[i].replace(/[\@$*#]/gi, '').replace(/_/g, ' ').trim() + '~';
                            //keysTo.push(res[i].replace(/[\@$*#]/gi, ''));
                        }
                    } else if (res[i].indexOf('#') > -1) {
                        types += res[i].replace(/[\@$*#]/gi, '').replace(/_/g, ' ').trim() + ',';
                    } else if (res[i].indexOf('*') > -1) {
                        count++;
                        nextIndex = i;
                        if (count > 1) {
                            i = countIndex;
                            count = 0;
                            pushArray();
                        } else {
                            keysFrom.push(fromString.substr(0, fromString.length - 1));
                            isBefore = false;
                            relation.push(res[i].replace(/[\@$*#]/gi, '').replace(/_/g, ' ').trim());
                        }
                        countIndex = nextIndex;
                    }
                    else if (res[i].indexOf('$') > -1) {
                        causeWord += res[i].replace(/[\@$*#]/gi, '').replace(/_/g, ' ').trim() + ",";
                    }
                } else {
                    if (isBefore) {
                        keysFrom.push(fromString.substr(0, fromString.length - 1));
                        fromString = "";
                    } else {
                        keysTo.push(toString.substr(0, toString.length - 1));
                        toString = "";
                    }
                }
            } else {
                pushArray();
            }
        } else {
            pushArray();
        }

        function pushArray() {
            if (toString != "") {
                keysTo.push(toString.substr(0, toString.length - 1));
            }

            for (var h = 0; h < keysFrom.length; h++) {
                for (var j = 0; j < keysTo.length; j++) {
                    var rel = "";
                    if (relation[0].toLowerCase().trim() == 'by enzyme') {
                        var rel = finalArr[objectCount].relation;
                        finalArr[objectCount].relation = relation[0];
                        finalArr[objectCount].toKey = keysTo[j]
                    }

                    finalArr.push({
                        fromKey: relation[0].toLowerCase().trim() == 'by enzyme' ? keysTo[j] : keysFrom[h],
                        toKey: relation[0].toLowerCase().trim() == 'by enzyme' ? keysFrom[h] : keysTo[j],
                        type: types,
                        relation: rel == "" ? relation[0] : rel,
                        cause: causeWord
                    })
                    objectCount++;
                }
            };

            keysFrom = [];
            keysTo = [];
            relation = [];
            types = "";
            causeWord = "";
            isBefore = true;
            fromString = "";
            toString = "";
        }
    }

    if (toString != "") {
        keysTo.push(toString.substr(0, toString.length - 1));
    }
    
    for (var i = 0; i < keysFrom.length; i++) {
        for (var j = 0; j < keysTo.length; j++) {
            var rel = "";
            if (relation[0].toLowerCase().trim() == 'by enzyme') {
                var rel = finalArr[objectCount].relation;
                finalArr[objectCount].relation = relation[0];
                finalArr[objectCount].toKey = keysTo[j]
            }
            finalArr.push({
                fromKey: relation[0].toLowerCase().trim() == 'by enzyme' ? keysTo[j] : keysFrom[i],
                toKey: relation[0].toLowerCase().trim() == 'by enzyme' ? keysFrom[i] : keysTo[j],
                type: types,
                relation: rel == "" ? relation[0] : rel,
                cause: causeWord
            });
            objectCount++;
        }
    }

    var obj = {
        pathwayId: 0,
        receptorId: $("#ddlReceptor option:selected").val(),
        writeUp: writeUp,
        updateId: updateId
    };
    //console.log(obj);
    $.ajax({
        type: "POST",
        url: "WebService/writeUpMaster.asmx/insert",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'dataValue':'" + JSON.stringify(obj) + "','arrObj':'" + JSON.stringify(finalArr) + "','arrNutrientList':'" + JSON.stringify(nutrientList) + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "','orginalWriteUp':'" + orginalWriteUp + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                // $("#removeConfirmationTags").tagit("removeAll");
                // $("#removeConfirmationTags").val('');
                $("#ddlReceptor").val(0);
                getWriteUp(pathwayId);
                //$("#preview").append('<div class="span12" style="border-bottom: 1px solid #eae5e5;"><div class="span11">' + writeUp + '</div><div class="span1"><i class="icon-edit"></i></div></div>');
                maketoast('success', 'Success', 'Save Successfully.');
            }
        },
        error: function (error) {

        }
    });
};

var Delete = function (id, e, receptorId, result) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    console.log(result);
    $('#mytextarea').val($(e).closest('tr').find('.td_WriteUp').text());
    //var a = orginalWriteUp.split(",");
    //for (var i = 0; i < a.length; i++) {

    //}
    checkKey();
    $("#ddlReceptor").val(receptorId);

    if (confirm("Are you sure want to delete?")) {
        $.ajax({
            type: "POST",
            url: "WebService/writeUpMaster.asmx/Delete",
            contentType: 'application/json',
            dataType: 'json',
            data: "{'id':'" + id + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.responseCode == 1) {
                    getWriteUp(pathwayId);
                    //maketoast('success', 'Success', 'Delete Successfully.');
                }
            },
            error: function (error) {

            }
        });
    }
};

//var update = function (id, rank, sn) {
//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    $.ajax({
//        type: "POST",
//        url: "WebService/writeUpMaster.asmx/updateSNO",
//        contentType: 'application/json',
//        dataType: 'json',
//        data: "{'id':'" + id + "','sno':'" + sn + "','pathwayId':'" + pathwayId + "','rank':'" + rank + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (response) {
//            var result = JSON.parse(response.d);
//            if (result.responseCode == 1) {
//                getWriteUp(pathwayId);
//                //maketoast('success', 'Success', 'Delete Successfully.');
//            }
//        },
//        error: function (error) {

//        }
//    });
//}

//var writeUpIDs = '';
//var addReceptorToUpdate = function (id) {

//    if ($('#chk_' + id).prop("checked") == true) {
//        writeUpIDs = writeUpIDs + id + ',';
//        $('#txt_' + id).prop("disabled", false);
//    }
//    else {
//        writeUpIDs = writeUpIDs.replace(id + ',', '');
//        $('#txt_' + id).prop("disabled", true);
//    }
//}

//var updateRank = function (pathwayId, rank) {
//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    if (writeUpIDs != '') {
//        $.ajax({
//            type: "POST",
//            url: "WebService/writeUpMaster.asmx/updateRank",
//            contentType: 'application/json',
//            dataType: 'json',
//            data: "{'id':'" + writeUpIDs + "','rank':'" + rank + "','pathwayId':'" + pathwayId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//            statusCode: {
//                401: function (xhr) {
//                    window.location.href = "../../index.html";
//                }
//            },
//            success: function (response) {
//                var result = JSON.parse(response.d);
//                if (result.responseCode == 1) {
//                    getWriteUp(pathwayId);
//                    writeUpIDs = '';
//                }
//            },
//            error: function (error) {
//                writeUpIDs = '';
//            }
//        });
//    }
//    else {
//        getWriteUp(pathwayId);
//        writeUpIDs = '';
//    }
//}

//var keywordList = [];
//function getRoleTypeTable() {
//    var k;
//    var a = [];
//    a = $('#removeConfirmationTags').val().split(/[\@]/);
//    for (var j = 1; j < a.length; j++) {
//        var val = a[j];
//        if (val.indexOf('*') > -1) {
//            k = val.substring(0, (val.indexOf('*') - 1));
//        }
//        else if (val.indexOf('$') > -1) {
//            k = val.substring(0, (val.indexOf('$') - 1));
//        }
//        else if (val.indexOf('#') > -1) {
//            k = val.substring(0, (val.indexOf('#') - 1));
//        }
//        else if (val.toLowerCase().indexOf('and') > -1) {
//            k = val.substring(0, (val.indexOf('and') - 1));
//        }
//        else {
//            k = val;
//        }
//        var exist = false;
//        for (var i = 0; i < keywordList.length; i++) {
//            if (k == keywordList[i].keyword) {
//                exist = true;
//            }
//        }
//        if (k != '' && exist == false) {
//            keywordList.push({
//                keyword: k
//            });
//        }
//    }

//    var row = $("#roleTypeTable thead tr").clone();
//    $("#roleTypeTable tbody tr").remove();
//    $.each(keywordList, function (index) {
//        $(".td_Keyword", row).text(this.keyword);
//        $(".td_Benificial", row).html('<input name="beneficial" type="checkbox" />');
//        $(".td_Harmful", row).html('<input name="harmful" type="checkbox" />');
//        $("#roleTypeTable tbody").append(row);
//        row = $("#roleTypeTable thead tr").clone();
//    });
//    if (keywordList.length > 0) {
//        $("#roleTypeTable").attr('style', 'display: table');
//    }
//    else {
//        $("#roleTypeTable").attr('style', 'display: none');
//    }
//}

//function cancelRoleTypeTable() {
//    keywordList = [];
//    $("#roleTypeTable").attr('style', 'display: none');
//}
//function getRank() {
//    if (!UtilsCache.getSession('USERDETAILS')) {
//        window.location.href = "../../index.html";
//        return;
//    }
//    $('#rankModel').modal('show');
//    $.ajax({
//        type: "POST",
//        url: "WebService/writeUpMaster.asmx/getRank",
//        contentType: 'application/json',
//        dataType: 'json',
//        data: "{'pathwayId':'" + pathwayId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//        statusCode: {
//            401: function (xhr) {
//                window.location.href = "../../index.html";
//            }
//        },
//        success: function (data) {
//            var result = JSON.parse(data.d).responseValue;
//            var rankNoList = result.Table;
//            var rankNameList = result.Table1;

//            var row = $("#tblRank thead tr:first").clone();
//            $("#tblRank tbody tr").remove();
//            $.each(rankNoList, function () {
//                $('.td_rank', row).text(this.rankNo);
//                $('.td_rankName', row).html('<select id="ddl_rankName' + this.rankNo + '" style="width: 90%;"></select>');
//                $('.td_save', row).html('<button type="button" class="btn btn-success" onclick="saveRank(this,' + this.id + ')">Save</button>');
//                $("#tblRank tbody").append(row);
//                row = $("#tblRank thead tr:first").clone();
//            });

//            setTimeout(function () {
//                $.each(rankNoList, function () {
//                    var rankNo = this.rankNo;
//                    var rankName = this.rankName;
//                    $('#ddl_rankName' + rankNo + ' option').remove();
//                    $('#ddl_rankName' + rankNo).append('<option value = "0">--Select--</option>');
//                    $.each(rankNameList, function () {
//                        $('#ddl_rankName' + rankNo).append('<option value="' + this.rankName + '">' + this.rankName + '</option>');
//                    });
//                    $('#ddl_rankName' + rankNo).val(rankName);
//                });

//            }, 0);

//        },
//        error: function (error) {

//        }
//    });
//};


//var saveRank = function (e, id) {
//    var rankNo = $(e).closest('tr').find('.td_rank').text();
//    var rankName = $(e).closest('tr').find('.td_rankName select option:selected').val();
//    if (rankName == '0') {
//        maketoast('error', 'Error', 'Please Select Rank');
//    }
//    else {

//        if (rankName != '') {
//            if (!UtilsCache.getSession('USERDETAILS')) {
//                window.location.href = "../../index.html";
//                return;
//            }
//            $.ajax({
//                type: "POST",
//                url: "WebService/writeUpMaster.asmx/saveRank",
//                contentType: 'application/json',
//                dataType: 'json',
//                data: "{'rankID':'" + id + "','rank':'" + rankNo + "','rankName':'" + rankName + "','pathwayId':'" + pathwayId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
//                statusCode: {
//                    401: function (xhr) {
//                        window.location.href = "../../index.html";
//                    }
//                },
//                success: function (response) {
//                    var result = JSON.parse(response.d);
//                    if (result.responseCode == 1) {
//                        if (id == 0) {
//                            $(e).attr("onclick", "saveRank(this," + result.responseValue[0].id + ")");
//                        }
//                        maketoast('success', 'Success', 'Save Successfully.');
//                    }
//                },
//                error: function (error) {

//                    maketoast('error', 'Error', JSON.parse(error.responseText).d);
//                }
//            });
//        }
//    }
//};


