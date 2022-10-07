app.controller('foodIntakeLimitCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var existId = 0;

    $scope.initControls = function () {
        dataFactory.InitControlsFoodIntakeLimit().then(function (response) {
            var result = response.data;
            $scope.foodFamilyMaster = result.foodFamilyMaster;
            $scope.unitMaster = result.unitMaster;
            $scope.activityCategory = result.activityCategory;
            $scope.ageUnitList = result.ageUnitList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetFoodIntakeLimitList = function () {
        $scope.clr();
        var params = {
            id: existId,
            foodFamilyID: $scope.ddlFoodFamilyID
        };
        dataFactory.FoodIntakeLimitList(params).then(function (response) {
            var result = response.data;
            $scope.foodIntakeLimitList = result.foodIntakeLimitList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveFoodIntakeLimit = function () {

        if ($scope.ddlFoodFamilyID == 0) {
            toaster.pop('error', "Error", 'Please Select Food');
            return false;
        }
        if (isEmpty($scope.txtQuantityMin)) {
            toaster.pop('error', "Error", 'Please Enter Min Quantity');
            return false;
        }
        if (isEmpty($scope.txtQuantityMax)) {
            toaster.pop('error', "Error", 'Please Enter Max Quantity');
            return false;
        }
        if (parseInt($scope.txtQuantityMin) > parseInt($scope.txtQuantityMax)) {
            toaster.pop('error', "Error", 'Max values should be greater than Min value');
            return false;
        }
        if ($scope.ddlUnit == 0) {
            toaster.pop('error', "Error", 'Please Select Unit');
            return false;
        }
        //if (isEmpty($scope.txtAgeMin)) {
        //    toaster.pop('error', "Error", 'Please Enter Min Age');
        //    return false;
        //}
        //if (isEmpty($scope.txtAgeMax)) {
        //    toaster.pop('error', "Error", 'Please Enter Max Age');
        //    return false;
        //}
        //if (parseInt($scope.txtAgeMin) > parseInt($scope.txtAgeMax)) {
        //    toaster.pop('error', "Error", 'Max values should be greater than Min value');
        //    return false;
        //}
        //if ($scope.ddlAgeUnit == 0) {
        //    toaster.pop('error', "Error", 'Please Select Age Unit');
        //    return false;
        //}
        //if ($scope.ddlActivity == 0) {
        //    toaster.pop('error', "Error", 'Please Select Activity');
        //    return false;
        //}


        var params = {
            id: existId,
            foodFamilyID: $scope.ddlFoodFamilyID,
            quantityMin: $scope.txtQuantityMin,
            quantityMax: $scope.txtQuantityMax,
            unitID: $scope.ddlUnit,
            ageFrom: $scope.txtAgeMin,
            ageTo: $scope.txtAgeMax,
            ageUnitId: $scope.ddlAgeUnit,
            activityID: $scope.ddlActivity,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };       
        dataFactory.SaveFoodIntakeLimit(params).then(function (response) {
            var list = response.data.tableRow;
            if (existId > 0) {
                $rootScope.activityLog(response, 'UPDATE FOOD INTAKE LIMIT', 'FOOD INTAKE LIMIT', '');
            }
            else if (list && list.length > 0) {
                params.id = list[0].rowID;
                $rootScope.activityLog(response, 'SAVE FOOD INTAKE LIMIT', 'FOOD INTAKE LIMIT', '', JSON.stringify(params));
            }

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetFoodIntakeLimitList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteFoodIntakeLimit = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteFoodIntakeLimit(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE FOOD INTAKE LIMIT', 'FOOD INTAKE LIMIT', '');
                $scope.GetFoodIntakeLimitList();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    
    $scope.edit = function (paramid) {
        existId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.FoodIntakeLimitList(params).then(function (response) {
            var result = response.data;
            var list = result.foodIntakeLimitList;
            $scope.ddlFoodFamilyID = list[0].foodFamilyID;
            $scope.txtQuantityMin = list[0].quantityMin;
            $scope.txtQuantityMax = list[0].quantityMax;
            $scope.ddlUnit = list[0].unitID;
            $scope.txtAgeMin = list[0].ageFrom;
            $scope.txtAgeMax = list[0].ageTo;
            $scope.ddlAgeUnit = list[0].ageUnitId;
            $scope.ddlActivity = list[0].activityID;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference;
            $scope.txtUrl = list[0].url;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        //$scope.ddlFoodFamilyID = 0;
        $scope.txtQuantityMin = '';
        $scope.txtQuantityMax = '';
        $scope.ddlUnit = 0;
        $scope.txtAgeMin = '';
        $scope.txtAgeMax = '';
        $scope.ddlAgeUnit = 0;
        $scope.ddlActivity = 0;
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.txtUrl = '';
        existId = 0;
    };
    $scope.initControls();
    $scope.GetFoodIntakeLimitList();
});