app.controller('differentialDiagnosisCtrl', function ($scope, dataFactory, toaster, $timeout) {
    var para = null;
    $scope.selectedDiseaseCommon = [];
    $scope.selectedDiseaseRare = [];
    $scope.listBindDisease = [];
    $scope.initControls = function () {
        var params = {
            departmentID: Number(UtilsCache.getSession('USERDETAILS').departmentID)
        };
        dataFactory.initControlsDD(params).then(function (response) {
            var result = response.data;
            $scope.loadDiseaseList = angular.copy(result.diseaseList);
            $scope.listBindDisease = angular.copy(result.diseaseList);
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.GetdifferentialDiagnosisList = function (item) {
        angular.forEach($scope.selectedDiseaseCommon, function (item) {
            $scope.listBindDisease.push(item);
        });
        $scope.selectedDiseaseCommon.length = 0;
        angular.forEach($scope.selectedDiseaseRare, function (item) {
            $scope.listBindDisease.push(item);
        });
        $scope.selectedDiseaseRare.length = 0;
        
        para = item != undefined ? item.diseaseID : null;
        var params = {
            diseaseRefID: para,
            departmentID: Number(UtilsCache.getSession('USERDETAILS').departmentID)
        };
        dataFactory.differentialDiagnosisList(params).then(function (response) {
            var result = response.data;
            $scope.differentialDiagnosisList = result.differentialDiagnosisList;
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.moveItemToCommon = function (from, to) {
        angular.forEach(from, function (item) {
            to.push(item);
            var id = $scope.listBindDisease.indexOf(item);
            $scope.listBindDisease.splice(id, 1);
        });
        from.length = 0;
    };
    //$scope.moveItemToRare = function () {
    //    moveItems('#listDisease', '#listDiseaseRare');
    //};
    $scope.moveItembackToDiseasefromCommon = function (from, to) {
        angular.forEach(from, function (item) {
            to.push(item);
            var id = $scope.selectedDiseaseCommon.indexOf(item);
            $scope.selectedDiseaseCommon.splice(id, 1);
        });
        from.length = 0;
    };

    $scope.moveItembackToDiseasefromRare = function (from, to) {
        angular.forEach(from, function (item) {
            to.push(item);
            var id = $scope.selectedDiseaseRare.indexOf(item);
            $scope.selectedDiseaseRare.splice(id, 1);
        });
        from.length = 0;
        //angular.forEach(from, function (item) {
        //    log('-----------');
        //    log(item);
        //    $timeout(function () {
        //        $scope.$apply(function () {
        //            $scope.listBindDisease.push(item);
        //        });
        //    }, 0);

        //    var id = $scope.selectedDiseaseRare.indexOf(item);
        //    $scope.selectedDiseaseRare.splice(id, 1);
        //});
    };

    $scope.saveDiseaseMaster = function () {
        var params = {
            diseaseName: $scope.txtDisease,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid),
            departmentID: Number(UtilsCache.getSession('USERDETAILS').departmentID)
        };
        dataFactory.saveDiseaseMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            angular.element(document.querySelector('#myModal')).modal('hide');
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.saveDifferentialDiagnosis = function () {
        var arr = [];
        $scope.selectedDiseaseCommon.forEach(function (v) {
            arr.push({
                ddDiseaseRefID: v.diseaseID,
                ddType: 'Common'
            });
        });
        $scope.selectedDiseaseRare.forEach(function (v) {
            arr.push({
                ddDiseaseRefID: v.diseaseID,
                ddType: 'Rare'
            });
        });
        //$scope.selectedDiseaseRare.forEach(function (v) {
        //    arr.push({
        //        ddDiseaseRefID: para,
        //        ddType: ''
        //    });
        //});
        log(arr);
        log(para);
        var params = {
            DifferentialDiseaseList: arr,
            diseaseRefID: para,
            reference: $scope.txtReference,
            url: $scope.txtURL,
            remark:null,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid),
            departmentID: Number(UtilsCache.getSession('USERDETAILS').departmentID)
        };
        dataFactory.saveDifferentialDiagnosis(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetdifferentialDiagnosisList($scope.ddlDisease);
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                ddDiseaseRefID: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteDifferentialDiagnosis(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetdifferentialDiagnosisList($scope.ddlDisease);
            }, function (error) {
                toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
            });
        }
    };
    
    $scope.initControls();
});