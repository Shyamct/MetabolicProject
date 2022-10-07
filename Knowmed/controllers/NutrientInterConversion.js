app.controller('nutrientInterConversionCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var interConvID = 0;
    $scope.txtRatio = '1';
    $scope.initControls = function () {
        dataFactory.nutrientInterConversionInitControl().then(function (response) {
            var result = response.data;
            $scope.nutrientInterList = result.nutrientInterList;
            $scope.interConversionList = result.interConversionList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveNutrientInterConversion = function () {

        if ($scope.ddlNutrient == -1) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }
        if ($scope.ddlInter == -1) {
            toaster.pop('error', "Error", 'Please Select Inter Conversion');
            return false;
        }
       

        var params = {
            id: interConvID,
            nutrientID: $scope.ddlNutrient,
            interConversionNutrientID: $scope.ddlInter,
            conversionRatio: $scope.txtRatio,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)

        };
        dataFactory.saveNutrientInterConversion(params).then(function (response) {
            if (interConvID > 0) {
                $rootScope.activityLog(response, 'UPDATE Nutrient Inter Conversion', 'Nutrient Inter Conversion', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteNutrientInterConversion = function (interConvID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: interConvID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteNutrientInterConversion(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Nutrient Inter Conversion', 'Nutrient Inter Conversion', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        interConvID = row;
        var params = {
            id: row
        };
        dataFactory.nutrientInterConversionInitControl(params).then(function (response) {
            console.log(response.data);
            var result = response.data.interConversionList[0];
            $scope.ddlNutrient = result.nutrientID;
            $scope.ddlInter = result.interConversionNutrientID;
            $scope.txtRatio = result.conversionRatio;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlNutrient = -1;
        $scope.ddlInter = -1;
        $scope.txtRatio = '';
        interConvID = 0;
    };

    $scope.initControls();
});