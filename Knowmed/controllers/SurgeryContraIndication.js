app.controller('surgeryContraIndicationCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var contraID = 0;

    $scope.initControls = function () {
        dataFactory.surgeryContraIndicationInitControl().then(function (response) {
            var result = response.data;
            $scope.surgeryList = result.surgeryList;
            $scope.contraList = result.contraList;
            $scope.surgeryContraList = result.surgeryContraList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveSurgeryContraIndication = function () {

        if ($scope.ddlSurgery == -1) {
            toaster.pop('error', "Error", 'Please Select Surgery Name');
            return false;
        }
        if ($scope.ddlContra == -1) {
            toaster.pop('error', "Error", 'Please Select Contra');
            return false;
        }
        

        var params = {
            id: contraID,
            surgeryID: $scope.ddlSurgery,
            contraProblemID: $scope.ddlContra,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveSurgeryContraIndication(params).then(function (response) {
            if (contraID > 0) {
                $rootScope.activityLog(response, 'UPDATE Surgery Contra Indication', 'Surgery Contra Indication', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteSurgeryContraIndication = function (contraID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: contraID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteSurgeryContraIndication(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Surgery Contra Indication', 'Surgery Contra Indication', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        contraID = row;
        var params = {
            id: row
        };
        dataFactory.surgeryContraIndicationInitControl(params).then(function (response) {
            var result = response.data.surgeryContraList[0];
            $scope.ddlSurgery = result.surgeryID;
            $scope.ddlContra = result.contraProblemID;
            $scope.txtRemark = result.remark;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlSurgery = -1;
        $scope.ddlContra = -1;
        $scope.txtRemark = '';
        contraID = 0;
    };

    $scope.initControls();
});