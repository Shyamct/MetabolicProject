app.controller('nutrientPeakValueCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var existId = 0;

    $scope.initControls = function () {
        dataFactory.InitControlsNutrientPeakValue().then(function (response) {
            var result = response.data;
            $scope.nutrientList = result.nutrientList;
            $scope.unitList = result.unitList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getNutrientPeakValueList = function () {
        $scope.clr();
        var params = {
            id: existId
        };        
        dataFactory.NutrientPeakValueList(params).then(function (response) {           
            var result = response.data;
            $scope.nutrientPeakValueList = result.nutrientPeakValueList;
            log($scope.nutrientPeakValueList);
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveNutrientPeakValue = function () {

        if ($scope.ddlNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }       

        var params = {
            id: existId,
            nutrientID: $scope.ddlNutrient,
            minPeakValue: $scope.txtMinPeakValue,
            maxPeakValue: $scope.txtMaxPeakValue,
            unitID: $scope.ddlUnit,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveNutrientPeakValue(params).then(function (response) {

            var message = existId > 0 ? 'Update Nutrient Peak Value' : 'Save Nutrient Peak Value';
            $rootScope.activityLog(response, message, 'Nutrient Peak Value', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.getNutrientPeakValueList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteNutrientPeakValue(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getNutrientPeakValueList();
                $rootScope.activityLog(response, 'Delete Nutrient Peak Value', ' Nutrient Peak Value', '');
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
        log(params);
        dataFactory.NutrientPeakValueList(params).then(function (response) {
            var result = response.data;
            var list = result.nutrientPeakValueList;
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.txtMinPeakValue = list[0].minPeakValue;
            $scope.txtMaxPeakValue = list[0].maxPeakValue;
            $scope.ddlUnit = list[0].unitID;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference;
            $scope.txtUrl = list[0].url;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {    
        $scope.ddlNutrient = 0;
        $scope.txtMinPeakValue = '';
        $scope.txtMaxPeakValue = '';
        $scope.ddlUnit = 0;
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.txtUrl = '';
        existId = 0;
    };
    $scope.initControls();
    $scope.getNutrientPeakValueList();
});