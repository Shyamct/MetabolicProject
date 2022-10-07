app.controller('nutrientBarrierCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var nutrientBarrierID = 0;
    $scope.isDisabled = false;
    $scope.buttonText = "Save";
    $scope.selectedBloodBarrierList = [];

    $scope.initControls = function () {
        dataFactory.InitControlsNutrientBarrier().then(function (response) {
            var result = response.data;
            $scope.nutrientList = result.nutrientList;
            $scope.transporterList = result.transporterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getNutrientBarrierList = function () {
        
        var params = {
            nutrientBarrierID: nutrientBarrierID
        };
        dataFactory.NutrientBarrierList(params).then(function (response) {
            var result = response.data;
            $scope.nutrientBarrierLists = result.nutrientBarrierList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.addBloodBarrier = function () {
        if ($scope.ddlTransporter == 0) {
            toaster.pop('error', "Error", 'Select Transporter');
            return false;
        }
        for (var i = 0; i < $scope.selectedBloodBarrierList.length; i++) {
            if ($scope.selectedBloodBarrierList[i].inOut == $scope.isIn && $scope.selectedBloodBarrierList[i].transporterID == $scope.ddlTransporter) {
                toaster.pop('error', "Error", 'Already Added');
                return false;
            }
        }
        $scope.selectedBloodBarrierList.push({
            isCross: $scope.isCross,
            isIn: $scope.isIn,
            inOutText: $scope.isIn == 1 ? 'In' : $scope.isIn == 0 ? 'Out' : '',
            transporterID: $scope.ddlTransporter,
            transporter: $("#ddlTransporter option:selected").text().trim(),
            remark: $scope.txtBloodBarrierRemark,
            url: $scope.txtBloodBarrierUrl
        });
    };
    $scope.deleteBloodBarrier = function (index) {
        $scope.selectedBloodBarrierList.splice(index, 1);
    };

    $scope.saveNutrientBarrier = function () {

        if ($scope.ddlNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }
        var params = {
            nutrientBarrierID: nutrientBarrierID,
            nutrientID: $scope.ddlNutrient,
            isCross: $scope.isCross,
            isIn: $scope.isIn,
            transporterID: $scope.ddlTransporter,
            remark: $scope.txtBloodBarrierRemark,
            url: $scope.txtBloodBarrierUrl,
            listBloodBarrier: JSON.stringify($scope.selectedBloodBarrierList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveNutrientBarrier(params).then(function (response) {
            var message = nutrientBarrierID > 0 ? 'Update Nutrient Barrier' : 'Save Nutrient Barrier';
            $rootScope.activityLog(response, message, 'Nutrient Barrier', '');
            $scope.clr();
            $scope.getNutrientBarrierList();           
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                nutrientBarrierID: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteNutrientBarrier(params).then(function (response) {                
                $scope.clr();
                $scope.getNutrientBarrierList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Nutrient Barrier', ' Nutrient Barrier', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        nutrientBarrierID = paramid;
        var params = {
            nutrientBarrierID: paramid
        };
        dataFactory.NutrientBarrierList(params).then(function (response) {
            var result = response.data;
            var list = result.nutrientBarrierList;
            
            nutrientBarrierID = list[0].id;
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.isCross = list[0].isCross;
            $scope.isIn = list[0].isIn;
            $scope.buttonText = "Update";
            $scope.ddlTransporter = list[0].transporterID;
            $scope.txtBloodBarrierRemark = list[0].remark;
            $scope.txtBloodBarrierUrl = list[0].url;
            $scope.isDisabled = true;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clr = function () {
        nutrientBarrierID = 0;
        $scope.buttonText = 'Save';
        $scope.ddlNutrient = 0;
        $scope.isCross = null;
        $scope.isIn = null;
        $scope.ddlTransporter = 0;
        $scope.txtBloodBarrierRemark = ''; 
        $scope.txtBloodBarrierUrl = '';        
        $scope.isDisabled = false;
        $scope.selectedBloodBarrierList = [];
    };

    $scope.initControls();
    $scope.getNutrientBarrierList();
    
});