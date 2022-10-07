app.controller('nutrientDoseLimitCtrl', function ($scope, $state, toaster, $rootScope, dataFactory, $timeout, ASSETS) {
    var id = "";
    

    $scope.getNutrientDoseLimitList = function () {
        var params = {
            nutrientID: $scope.ddlNutrient
        };
        dataFactory.loadNutrientDoseLimit(params).then(function (response) {
            var result = response.data;
            $scope.nutrientDoseLimitList = result.nutrientDoseLimitList;
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.initControls = function () {
       
        $scope.ShowSave = true;
        dataFactory.bindListForNutrientDoseLimit().then(function (response) {
            var result = response.data;
            $scope.nutrientList = result.nutrientList;
            $scope.doseUnitList = result.doseUnitList;
            $scope.problemList = result.problemList;
            $scope.getNutrientDoseLimitList();
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };
    
    $scope.saveNutrientDoseLimit = function () {
        if ($scope.ddlNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }
        if ($scope.ddlDoseUnit == 0) {
            toaster.pop('error', "Error", 'Please Select Dose Unit');
            return false;
        }
        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Problem');
            return false;
        }
        var params = {
            id: id,
            nutrientID: $scope.ddlNutrient,
            doseUnitID: $scope.ddlDoseUnit,
            oneTimeFrom: $scope.txtOneTimeFrom,
            oneTimeTo: $scope.txtOneTimeTo,
            oneDayFrom: $scope.txtOneDayFrom,
            oneDayTo: $scope.txtOneDayTo,
            problemID: $scope.ddlProblem,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveNutrientDoseLimit(params).then(function (response) {
            var message = id > 0 ? 'Update Nutrient Dose Limit' : 'Save Nutrient Dose Limit';
            $rootScope.activityLog(response, message, 'Nutrient Dose Limit', '');

            $scope.getNutrientDoseLimitList();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.edit = function (idvalue) {
        
        $scope.ShowSave = true;
        id = idvalue;
        

        var params = {
            id: idvalue
        };
        dataFactory.loadNutrientDoseLimit(params).then(function (response) {
            var result = response.data;
            var list = result.nutrientDoseLimitList;
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.ddlDoseUnit = list[0].doseUnitID,
            $scope.txtOneTimeFrom = list[0].oneTimeFrom,
            $scope.txtOneTimeTo = list[0].oneTimeTo,
            $scope.txtOneDayFrom = list[0].oneDayFrom;
            $scope.txtOneDayTo = list[0].oneDayTo;
            $scope.ddlProblem = list[0].problemID;
            $scope.txtReference = list[0].reference;
            $scope.txtUrl = list[0].url;
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    
    $scope.delete = function (idvalue) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: idvalue,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteNutrientDoseLimit(params).then(function (response) {
                $scope.getNutrientDoseLimitList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Nutrient Dose Limit', ' Nutrient Dose Limit', '');
            }, function (error) {
                toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
            });
        }
    };

   

    $scope.initControls();

    $scope.clear = function () {
        $scope.ddlNutrient = 0;
        $scope.ddlDoseUnit = 0;
        $scope.ddlProblem = 0;
        $scope.txtOneDayFrom = '';
        $scope.txtOneDayTo = '';
        $scope.txtOneTimeFrom = '';
        $scope.txtOneTimeTo = '';
        $scope.txtReference = '';
        $scope.txtUrl = '';
        id = 0;
    };

});












