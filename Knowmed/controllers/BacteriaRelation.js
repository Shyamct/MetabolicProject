app.controller('bacteriaRelationCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var bacteriaID = 0;
    var arr = [];
    $scope.addedBacteriaList = [];
    $scope.btndisabled = false;

    //$scope.printDiv = function (divName) {
    //    $('#divPrint').removeAttr('style');
    //    var printContents = document.getElementById(divName).innerHTML;
        
    //    var docprint = window.open("");

    //    docprint.document.write('<html><head><title>Print</title><link href="assets/css/fontAwesome.css" rel="stylesheet" /><link href="assets/css/bootstrap.min.css" rel="stylesheet" /> <link href="assets/css/main.css" rel="stylesheet" /> <link href="assets/css/toaster.css" rel="stylesheet" /> <link rel="stylesheet" href="assets/css/ng-tags-input.css" /><style>.hideonprint{display:none}</style>');
        
    //    docprint.document.write('</head><body style="background-image: url(\'../assets/images/eralogoBig.png\')!important;background-position:center!important;background-repeat:no-repeat!important;background-size:50%!important;margin:0">');
    //    docprint.document.write(printContents);
    //    docprint.document.write('</body></html>');
    //    setTimeout(function () {
    //        docprint.print();
    //        docprint.close();
    //        $('#divPrint').css('max-height', '100vh');
    //    }, 500);


    //};

    $scope.printDiv = function (divName) {
        $('#divPrint').removeAttr('style');
        $('.hideonprint').hide();
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=500,height=500');
        popupWin.document.open();
        popupWin.document.write('<html><head> <script src="assets/js/angular.min.js"></script></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
        $('#divPrint').css('max-height', '100vh');
        $('.hideonprint').show();
    };

    $scope.exportData = function () {
        $("#tableTroughValue").table2excel({
            // exclude: ".excludeThisClass",
            name: "Worksheet Name",
            filename: "BacteriaRelationReport" //do not include extension
        });
    };


    $scope.initControls = function () {
        dataFactory.bacteriaRelationInitControl().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.agentFactorList = result.agentFactorList;
            $scope.statusList = result.statusList;
            $scope.bookList = result.bookList;
            $scope.bacteriaRelationList = result.bacteriaRelationList;
            
            for (var i = 0; i < result.agentFactorProductList.length; i++) {
                $scope.bacteriaRelationList[i].bacteriaDetails = JSON.parse(result.bacteriaRelationList[i].bacteriaDetails);
            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getTableData = function () {
        var params = {
            medicineID: $scope.ddlMedicine,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.getBacteriaRelationList(params).then(function (response) {
            var result = response.data;          
            $scope.bacteriaRelationList = result.bacteriaRelationList;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddBacteria = function () {

        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        if ($scope.ddlBacteria == 0) {
            toaster.pop('error', "Error", 'Please Select Bacteria');
            return false;
        }
        
        if (arr.some(data => data.bacteriaID == $scope.ddlBacteria)) {
            toaster.pop('error', "Error", 'Already Added !!');
            return false;
        }
        arr.push({
            bacteriaID: $scope.ddlBacteria,
            agentFactor: $("#ddlBacteria option:selected").text().trim(),
            medicinActionID: $scope.ddlAction,
            statusFor: $("#ddlAction option:selected").text().trim()
        });
        $scope.addedBacteriaList = arr;
    };

    $scope.deleteBacteriaList = function (index) {
        $scope.addedBacteriaList.splice(index, 1);
    };

    $scope.saveBacteriaRelation = function () {

        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        if ($scope.ddlBacteria == 0) {
            toaster.pop('error', "Error", 'Please Select Bacteria');
            return false;
        }
        
        var params = {
            id: bacteriaID,
            medicineID: $scope.ddlMedicine,
            bacteriaID: $scope.ddlBacteria,
            medicinActionID: $scope.ddlAction,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            url: $scope.txtURLReference,
            dtBacteriaDetailsList: JSON.stringify($scope.addedBacteriaList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveBacteriaRelation(params).then(function (response) {
            if (bacteriaID > 0) {
                $rootScope.activityLog(response, 'UPDATE BACTERIA RELATION', 'BACTERIA RELATION', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteBacteriaList = function (bacteriaID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: bacteriaID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteBacteriaList(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE BACTERIA', 'BACTERIA', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.deleteBacteriaRelation = function (bacteriaID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: bacteriaID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteBacteriaRelation(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE BACTERIA RELATION', 'BACTERIA RELATION', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        bacteriaID = row;
        var params = {
            id: row
        };
        dataFactory.bacteriaRelationInitControl(params).then(function (response) {
            console.log(response.data);
            var result = response.data.bacteriaRelationList[0];
            $scope.ddlMedicine = result.medicineID;
            $scope.ddlBacteria = result.bacteriaID;
            $scope.ddlAction = result.medicinActionID;
            $scope.txtRemark = result.remark;
            $scope.txtReference = result.reference;
            $scope.ddlBook = result.bookID;
            $scope.txtPageNo = result.pageNo;
            $scope.txtEdition = result.edition;
            $scope.txtURLReference = result.url

            //if (result) {
            //    $scope.addedBacteriaList = JSON.parse(result.bacteriaDetails);
            //    arr = ($scope.addedBacteriaList) ? $scope.addedBacteriaList : [];
            //}
            $scope.btndisabled = true;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        $scope.ddlMedicine = 0;
        $scope.ddlBacteria = 0;
        $scope.ddlAction = 0;
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.ddlBook = 0;
        $scope.txtPageNo = '';
        $scope.txtEdition = '';
        $scope.txtURLReference = '';
        bacteriaID = 0;
        $scope.addedBacteriaList = [];
        arr = [];
        $scope.btndisabled = false;
    };

    $scope.initControls();
});