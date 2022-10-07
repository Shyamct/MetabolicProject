app.controller('diseaseTransmissionRouteCtrl', function ($scope, dataFactory, toaster) {
    var DiseaseTransmissionRouteId = 0;

    $scope.TransmissionRouteList = function () {
        dataFactory.TransmissionRouteMasterList().then(function (response) {
            var result = response.data;
            $scope.TransmissionRouteMasterList = result.transmissionRouteMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.pMasterList = function () {
        dataFactory.ProblemMasterList().then(function (response) {
            var result = response.data;
            $scope.ProblemMasterList = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.DiseaseTransmissionList = function () {
        dataFactory.DiseaseTransmissionRouteList().then(function (response) {
            var result = response.data;
            $scope.DiseaseTransmissionRouteList = result.diseaseTransmissionRoute;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveDiseaseTransmissionRoute = function () {
        if ($scope.ddlProblem == -1) {
            alert('Select Problem');
            return false;
        }
        if ($scope.ddlTransmissionRoute == -1) {
            alert('Select Transmission Route');
            return false;
        }
        var params = {
            id: DiseaseTransmissionRouteId,
            problemID: $scope.ddlProblem,
            transmissionRouteID: $scope.ddlTransmissionRoute,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseTransmissionRoute(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.DiseaseTransmissionList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteDiseaseTransmissionRoute = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseTransmissionRoute(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.DiseaseTransmissionList();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        DiseaseTransmissionRouteId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.DiseaseTransmissionRouteList(params).then(function (response) {
            var result = response.data;
            var list = result.diseaseTransmissionRoute;
            $scope.ddlProblem = list[0].problemID;
            $scope.ddlTransmissionRoute = list[0].transmissionRouteID;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        DiseaseTransmissionRouteId = 0;
        $scope.ddlProblem = -1;
        $scope.ddlTransmissionRoute = -1;
        $scope.txtRemark = "";
        $scope.txtReference = "";
    };
    $scope.TransmissionRouteList();
    $scope.DiseaseTransmissionList();
    $scope.pMasterList();
});