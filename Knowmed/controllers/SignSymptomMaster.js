app.controller('signSymptomMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var SignSymptomId = 0; 

    $scope.pCategoryList = function () {
        dataFactory.ProblemCategoryList().then(function (response) {
            var result = response.data;
            $scope.ProblemCategoryList = result.problemCategory;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }

    $scope.CheckSignSymptomExistence = function (name) {
        var params = {
            optionName: name
        }
        dataFactory.CheckSignSymptomExistence(params).then(function (response) {
        }, function (error) {
            alert(error.data)
            $scope.txtSignSymptom = "";
        });
    }

    $scope.BodyOrganRegionList = function () {
        dataFactory.BodyOrganRegionList().then(function (response) {
            var result = response.data;
            $scope.BodyOrganRegionList = result.bodyOrganRegion;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }


    $scope.SignSymptomList = function () {
        dataFactory.SignSymptomMasterList().then(function (response) {
            var result = response.data;
            $scope.SignSymptomMasterList = result.signSymptomMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }


    $scope.SaveSignSymptomMaster = function () {
        if ($scope.txtSignSymptom == undefined || $scope.txtSignSymptom == "") {
            alert('Enter Sign/Symptom');
            return false;
        }
        if ($scope.ddlOptionType == -1) {
            alert('Select Option Type');
            return false;
        }
        if ($scope.ddlRegionOrganID == -1) {
            alert('Select Region Organ');
            return false;
        }
        var params = {
            id: SignSymptomId,
            optionName: $scope.txtSignSymptom,
            optionType: $scope.ddlOptionType,
            regionOrganID: $scope.ddlRegionOrganID,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveSignSymptomMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');

            var message = SignSymptomId > 0 ? 'UPDATE SIGN SYMPTOM MASTER' : 'SAVE SIGN SYMPTOM MASTER';
            $rootScope.activityLog(response, message, 'SIGN SYMPTOM MASTER', '');

            $scope.SignSymptomList();

            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.DeleteSignSymptomMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteSignSymptomMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.SignSymptomList();
                $scope.clr();

                $rootScope.activityLog(response, 'DELETE SIGN SYMPTOM MASTER', 'SIGN SYMPTOM MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        SignSymptomId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.SignSymptomMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.signSymptomMaster;
            $scope.txtSignSymptom = list[0].optionName;
            $scope.ddlOptionType = list[0].optionTypeId;
            $scope.ddlRegionOrganID = list[0].regionOrganID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        SignSymptomId = 0;
        $scope.ddlOptionType = -1;
        $scope.txtSignSymptom = "";     
        $scope.ddlRegionOrganID = -1;      
    };
    $scope.BodyOrganRegionList();
    $scope.SignSymptomList();
    $scope.pCategoryList();
});