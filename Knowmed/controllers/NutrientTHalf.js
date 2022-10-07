app.controller('nutrientTHalfCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var existId = 0;

    $scope.initControls = function () {
        dataFactory.InitControlsNutrientTHalf().then(function (response) {
            var result = response.data;
            $scope.nutrientList = result.nutrientList;
            $scope.unitList = result.unitList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getNutrientTHalfList = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.NutrientTHalfList(params).then(function (response) {
            var result = response.data;
            $scope.nutrientTHalfList = result.nutrientTHalfList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveNutrientTHalf = function () {

        if ($scope.ddlNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }       

        var params = {
            id: existId,
            nutrientID: $scope.ddlNutrient,
            minTHalf: $scope.txtMinTHalf,
            maxTHalf: $scope.txtMaxTHalf,
            unitID: $scope.ddlUnit,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveNutrientTHalf(params).then(function (response) {
            var message = existId > 0 ? 'Update Nutrient THalf' : 'Save Nutrient THalf';
            $rootScope.activityLog(response, message, 'Nutrient THalf', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.getNutrientTHalfList();
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
            dataFactory.DeleteNutrientTHalf(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getNutrientTHalfList(); 
                $rootScope.activityLog(response, 'Delete Nutrient THalf', ' Nutrient THalf', '');
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
        dataFactory.NutrientTHalfList(params).then(function (response) {
            var result = response.data;
            var list = result.nutrientTHalfList;
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.txtMinTHalf = list[0].minTHalf;
            $scope.txtMaxTHalf = list[0].maxTHalf;
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
        $scope.txtMinTHalf = '';
        $scope.txtMaxTHalf = '';
        $scope.ddlUnit = 0;
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.txtUrl = '';
        existId = 0;
    };

    $scope.initControls();
    $scope.getNutrientTHalfList();
});