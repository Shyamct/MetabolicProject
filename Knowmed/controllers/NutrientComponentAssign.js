app.controller('nutrientComponentAssignCtrl', function ($scope, dataFactory, toaster, $state, $rootScope) {
    var existId = 0;

    $scope.initControls = function () {
        dataFactory.InitControlsNutrientComponentAssign().then(function (response) {
            var result = response.data;          
            $scope.componentList = result.componentList;
            $scope.nutrientList = result.nutrientList;
            $scope.phenomenList = result.phenomenList;
            $scope.antioxidantList = result.antioxidantList;
            $scope.bodyOrganRegionList = result.bodyOrganRegionList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getNutrientComponentAssignList = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.NutrientComponentAssignList(params).then(function (response) { 
            var result = response.data;
            $scope.nutrientComponentAssignList = result.nutrientComponentAssignList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getSelectedNutrientComponentList = function () {     
        var params = {
            componentID: $scope.ddlComponent
        };
        dataFactory.NutrientComponentAssignList(params).then(function (response) {
            var result = response.data;
            $scope.selectedNutrientComponentList = result.nutrientComponentAssignList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveNutrientComponentAssign = function () {
        if ($scope.ddlComponent == 0) {
            toaster.pop('error', "Error", 'Please Select Component');
            return false;
        }
        if ($scope.ddlNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }
        var params = {
            id: existId,
            componentID: $scope.ddlComponent,
            nutrientID: $scope.ddlNutrient,
            nutrientPhenomenID: $scope.ddlPhenomenon,
            storage: $scope.rbStorage,
            days: $scope.txtDays,
            bodyOrganRegionID: $scope.ddlBodyOrganRegion,
            otherUrl: $scope.txtOtherUrl,
            //antioxidantID: $scope.ddlAntioxidant,
            //remark: $scope.txtRemark,
            //reference: $scope.txtReference,
            url: $scope.txtUrl,
            OtherUrlt: $scope.txtOtherUrlt,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveNutrientComponentAssign(params).then(function (response) {
            var message = existId > 0 ? 'Update Nutrient Component Assign' : 'Save Nutrient Component Assign';
            $rootScope.activityLog(response, message, 'Nutrient Component Assign', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.getNutrientComponentAssignList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteNutrientComponentAssign(params).then(function (response) {
                $scope.getNutrientComponentAssignList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Nutrient Component Assign', ' Nutrient Component Assign', '');
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
        dataFactory.NutrientComponentAssignList(params).then(function (response) {
            var result = response.data;
            var list = result.nutrientComponentAssignList;
            $scope.ddlComponent = list[0].componentID;
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.ddlPhenomenon = list[0].nutrientPhenomenID;
            $scope.rbStorage = list[0].storage;
            $scope.txtDays = list[0].days;
            $scope.ddlBodyOrganRegion = list[0].bodyOrganRegionID;
            $scope.txtOtherUrl = list[0].otherUrl;
            //$scope.ddlAntioxidant = list[0].antioxidantID;
            //$scope.txtRemark = list[0].remark;
            $scope.txtUrl = list[0].url;
            $scope.txtOtherUrlt = list[0].otherUrlt;
            //$scope.txtReference = list[0].reference;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clr = function () {
        $scope.ddlNutrient = 0;
        $scope.ddlComponent = 0;
        $scope.ddlPhenomenon = 0;
        $scope.rbStorage = '';
        $scope.txtDays = '';
        $scope.ddlBodyOrganRegion = 0;
        $scope.txtOtherUrl = '';
        //$scope.ddlAntioxidant = 0;
        //$scope.txtRemark = '';
        $scope.txtUrl = '';
        $scope.txtOtherUrlt = '';
        //$scope.txtReference = '';
        existId = 0;
    };
    $scope.initControls();
    $scope.getNutrientComponentAssignList();
});