app.controller('icdCodeMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var existId = 0;
    var itemID = 0;
    $scope.maxSize = 10;     // Limit number for pagination display number.  
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero  
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->  
    $scope.pageSizeSelected = 20;

    $scope.initControls = function () {
        var obj = {
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSizeSelected
        };
        dataFactory.InitControlsIcdCodeMaster(obj).then(function (response) {
            var result = response.data;
            $scope.icdCodeMasterList = result.icdCodeMasterList;
            $scope.totalCount = result.icdCodeMasterList[0].totalCount;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    //$scope.icdCodeMaster = function () {
    //    var params = {
    //        userID: Number(UtilsCache.getSession('USERDETAILS').userid),
    //        pageIndex: $scope.pageIndex,
    //        pageSize: $scope.pageSizeSelected
    //    };
    //    dataFactory.icdCodeMaster(params).then(function (response) {
    //        var result = response.data;
    //        $scope.icdCodeMaster = result.icdCodeMaster;
    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
    //};

    $scope.saveIcdCodeMaster = function () {
        if (isEmpty($scope.txtIcd)) {
            toaster.pop('error', "Error", 'Please Enter ICD Code  !!');
            return false;
        };
        if (isEmpty($scope.txtDisease)) {
            toaster.pop('error', "Error", 'Please Enter Disease  !!');
            return false;
        };
        var params = {
            id: existId,
            icdCode: $scope.txtIcd, 
            disease: $scope.txtDisease,
            shortName: $scope.txtShort,
            totalCount: $scope.totalCount,
            status: itemID,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveIcdCodeMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            var message = existId > 0 ? 'UPDATE ICDCODE MASTER' : 'SAVE ICDCODE MASTER';
            $rootScope.activityLog(response, message, 'ICDCODE MASTER', '');

            $scope.clr();
            $scope.initControls();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deleteIcdCodeMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
            };
            dataFactory.deleteIcdCodeMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.initControls();
                $rootScope.activityLog(response, 'DELETE ICDCODE MASTER', 'ICDCODE MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        existId = paramid;
        var params = {
            id: paramid,
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSizeSelected,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.icdCodeMaster(params).then(function (response) {
            var result = response.data;
            var list = result.icdCodeMaster;
            $scope.txtIcd = list[0].icdCode;
            $scope.txtDisease = list[0].diseaseName;
            $scope.txtShort = list[0].shortName;
            itemID = list[0].status;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.clr = function () {
        $scope.txtIcd = '';
        $scope.txtDisease = '';
        $scope.txtShort = '';
        existId = 0;
        itemID = 0;
    };
    $scope.pageChanged = function (pageIndex) {
        $scope.pageIndex = pageIndex;
        $scope.initControls();
    };
    $scope.changePageSize = function (pageSize) {
        $scope.pageSizeSelected = pageSize;
        $scope.initControls();
    };

    $scope.initControls();
  // $scope.icdCodeMaster();
});