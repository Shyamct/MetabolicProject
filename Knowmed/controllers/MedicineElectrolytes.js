app.controller('medicineElectrolytesCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var electrolytesID = 0;

    $scope.initControls = function () {
        dataFactory.medicineElectrolytesInitControl().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.nutrientList = result.nutrientList;
            $scope.electrolytesList = result.electrolytesList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveMedicineElectrolytes = function () {

        if ($scope.ddlMedicineName == -1) {
            toaster.pop('error', "Error", 'Please Select Medicine Name');
            return false;
        }
        if ($scope.ddlElectrolytes == -1) {
            toaster.pop('error', "Error", 'Please Select Electrolytes');
            return false;
        }


        var params = {
            id: electrolytesID,
            medicineID: $scope.ddlMedicineName,
            mineralID: $scope.ddlElectrolytes,
            intensity: $scope.ddlIntensity,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveMedicineElectrolytes(params).then(function (response) {
            if (electrolytesID > 0) {
                $rootScope.activityLog(response, 'UPDATE Medicine Electrolytes', 'Medicine Electrolytes', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteMedicineElectrolytes = function (electrolytesID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: electrolytesID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteMedicineElectrolytes(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Medicine Electrolytes', 'Medicine Electrolytes', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        electrolytesID = row;
        var params = {
            id: row
        };
        dataFactory.medicineElectrolytesInitControl(params).then(function (response) {
            var result = response.data.electrolytesList[0];
            $scope.ddlMedicineName = result.medicineID;
            $scope.ddlElectrolytes = result.mineralID;
            $scope.ddlIntensity = result.intensity;
            $scope.txtReference = result.reference;
            $scope.txtRemark = result.remark;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlMedicineName = -1;
        $scope.ddlElectrolytes = -1;
        $scope.ddlIntensity = '';
        $scope.txtRemark = '';
        $scope.txtReference = '';
        electrolytesID = 0;
    };

    $scope.initControls();
});