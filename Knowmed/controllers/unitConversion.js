app.controller('unitConversionCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var unitConversionID = 0;


    $scope.initControls = function () {
        dataFactory.InitControlsUnitConversion().then(function (response) {
            var result = response.data;
            $scope.unitList = result.unitMaster;
            $scope.unitConversionList = result.unitConversion;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.unitConversionList = function () {
        $scope.clr();
        var params = {
            unitConversionID: unitConversionID
        };
        dataFactory.UnitConversionList(params).then(function (response) {
            var result = response.data;
            $scope.unitConversionList = result.unitConversion;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.saveUnitConversion = function () {

        if (unitConversionID == 0) {
            if ($scope.ddlUnitFrom == '') {
                toaster.pop('error', "Error", 'Please Select Unit From');
                return false;
            }
            if ($scope.ddlUnitTo == '') {
                toaster.pop('error', "Error", 'Please Select Unit To');
                return false;
            }
            if ($scope.txtMultiplicand == "") {
                toaster.pop('error', "Error", 'Please Enter Multiplicand ');
                return false;
            }
            if ($scope.txtDividend == "") {
                toaster.pop('error', "Error", 'Please Enter Dividend ');
                return false;
            }
        }
       
        var params = {
            unitConversionID: unitConversionID,
            unitFrom: $scope.ddlUnitFrom,
            unitTo: $scope.ddlUnitTo,
            multiplicand: $scope.txtMultiplicand,
            dividend: $scope.txtDividend,
            //userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveUnitConversion(params).then(function (response) {
            var message = unitConversionID > 0 ? 'Update Unit Conversion' : 'Save Unit Conversion';
            $rootScope.activityLog(response, message, 'Unit Conversion', '');

            $scope.initControls();
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deleteUnitConversion = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                unitConversionID: id
            };
            dataFactory.DeleteUnitConversion(params).then(function (response) {
                $scope.initControls();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Unit Conversion', 'Unit Conversion', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.editUnitConversion = function (id) {
        unitConversionID = id;
        var params = {
            unitConversionID: id
        };
        dataFactory.UnitConversionList(params).then(function (response) {
            var result = response.data;
            var list = result.unitConversionList;
            $scope.ddlUnitFrom = list[0].unitFrom;
            $scope.ddlUnitTo = list[0].unitTo;
            $scope.txtMultiplicand = list[0].multiplicand;
            $scope.txtDividend = list[0].dividend;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        $scope.ddlunitFrom = 0;
        $scope.ddlunitTo = 0;
        $scope.txtMultiplicand = "";
        $scope.txtDividend = "";
        unitConversionID = 0;
        
    };

    $scope.initControls();
   
});