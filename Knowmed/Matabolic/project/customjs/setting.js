var baseUrl = 'WebService/ActivitiesApproval.asmx/';

$(function () {
    var h = ($(window).height() - $('#header').height() - 146);
    $(".widget-content").height(h);

    getPathwayCompnents();
});

var getPathwayCompnents = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var obj = {
        userID: Number(UtilsCache.getSession('USERDETAILS').userid)
    };
    $.ajax({

        //method: "Post",
        //url: baseUrl + 'getPathwayCompnents',
        //dataType: 'json',
        //contentType: 'application/json',
        //data: JSON.stringify(obj),
        type: "POST",
        url: baseUrl + 'getPathwayCompnents',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),
        success: function (data) {
            var result = JSON.parse(data.d).responseValue;
            console.log("result", result);
            var pathwayHTML = '';
            var processHTML = '<ul>';
            var phenomenonHTML = '<ul>';

           // if (result.Table.length > 0) {
             $.each(result.Table, function (i) {
                    console.log("Table", Table+"iiii"+i);
                    var headName = this.headName;
                    pathwayHTML += '<label class="container">' + headName + ' <input type="checkbox" reference="0" dataKey="pathway" value="' + this.id + '" onclick="allowPathwayComponent(this);" ' + this.isChecked + '> <span class="checkmark"></span> </label>';

                    var processList = JSON.parse(this.processList);
                    if (processList) {
                        var pathwayReferenceID = this.pathwayReferenceID;

                        if (processList.length > 0) {
                            processHTML += '<li><div class="pathway-name">' + headName + '</div>';
                            phenomenonHTML += '<li><div class="pathway-name">' + headName + '</div><ul>';
                            $.each(processList, function (i) {

                                processHTML += '<label class="container">' + this.rankName + ' <input type="checkbox" reference="' + pathwayReferenceID + '" dataKey="process" value="' + this.rankNo + '" onclick="allowPathwayComponent(this);" ' + this.isChecked + '> <span class="checkmark"></span> </label>';

                                var processName = this.rankName;
                                if (this.hasOwnProperty("phenomenonList")) {

                                    var phenomenonList = JSON.parse(this.phenomenonList);
                                    var processReferenceID = this.processReferenceID;

                                    if (phenomenonList.length > 0) {
                                        phenomenonHTML += '<li><div class="process-name">' + processName + '</div>';
                                        $.each(phenomenonList, function (i) {

                                            phenomenonHTML += '<label class="container">' + this.phenomenonName + ' <input type="checkbox" reference="' + processReferenceID + '" dataKey="phenomenon" value="' + this.phenomenonID + '" onclick="allowPathwayComponent(this);" ' + this.isChecked + '> <span class="checkmark"></span> </label>';
                                        });
                                    }
                                    phenomenonHTML += '</li>';
                                }

                            });
                            phenomenonHTML += '</ul><hr/>';

                            processHTML += '</li><hr/>';
                        }
                    }
                });

                processHTML += '</ul>';
                phenomenonHTML += '</ul>';
            //}
            $('#pathwayDiv').html(pathwayHTML);
            $('#processDiv').html(processHTML);
            $('#phenomenonDiv').html(phenomenonHTML);

        },
        error: function (error) {

        },
        failure: function (error) {

        }
    });
};

var allowPathwayComponent = function (e) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    var chk = $(e);
    var obj = {
        id: chk.val(),
        referenceID: chk.attr('reference'), 
        approveStatus: chk.is(':checked') == true ? 1 : 0,
        activityName: chk.attr('dataKey')
    };
    $.ajax({
        method: "Post",
        url: baseUrl + 'allowPathwayComponent',
        dataType: 'json',
        contentType: 'application/json',
        data: "{'arrObj': '" + JSON.stringify(obj) + "','userID':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                getPathwayCompnents();
                if (chk.is(':checked')) {
                    maketoast('success', 'Success', 'Allowed Successfully.');
                }
                else {
                    maketoast('success', 'Success', 'Refused Successfully.');
                }
            }
        },
        error: function (error) {
            console.log(error);
            //maketoast('success', 'Success', 'Save Successfully.');
        },
        failure: function (error) {

        }
    });
};