app.controller('masterCtrl', function ($scope, toaster, $rootScope, dataFactory, ASSETS) {
    //Disease Master
    var diseaseID = 0;
    $scope.initControlsDiseaseMaster = function () {
        dataFactory.initControlsDiseaseMaster().then(function (response) {
            var result = response.data;
            log(response.data);
            $scope.organList = result.organList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetDiseaseMasterList = function () {
        var params = {
            organID: $scope.ddlBodyOrgan,
            departmentID: Number(UtilsCache.getSession('USERDETAILS').departmentID)
        };
        dataFactory.diseaseMasterList(params).then(function (response) {
            var result = response.data;
            $scope.diseaseMasterList = result.diseaseMasterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveDiseaseMaster = function () {
        var params = {
            diseaseID: diseaseID,
            organID: $scope.ddlBodyOrgan,
            diseaseName: $scope.txtDiseaseName,
            departmentID: Number(UtilsCache.getSession('USERDETAILS').departmentID),
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveDiseaseMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');

            var message = diseaseID > 0 ? 'UPDATE DISEASE MASTER' : 'SAVE DISEASE MASTER';
            $rootScope.activityLog(response, message, 'DISEASE MASTER', '');

            $scope.GetDiseaseMasterList();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.edit = function (indexVal1, paramid) {
        diseaseID = paramid;
        var params = {
            diseaseID: paramid
        };
        dataFactory.diseaseMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.diseaseMasterList;
            $scope.ddlBodyOrgan = list[0].organID;
            $scope.txtDiseaseName = list[0].disease;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.deleteDiseaseMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                diseaseID: id,
                departmentID: Number(UtilsCache.getSession('USERDETAILS').departmentID)
            };
            dataFactory.deleteDiseaseMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetDiseaseMasterList();
                $rootScope.activityLog(response, 'DELETE DISEASE MASTER', 'DISEASE MASTER', '');

            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.initControlsDiseaseMaster();
    //Disease Master
});