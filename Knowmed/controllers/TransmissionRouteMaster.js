app.controller('transmissionRouteMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var TransmissionRouteMasterId = 0;

    $scope.TransmissionRouteList = function () {
        dataFactory.TransmissionRouteMasterList().then(function (response) {
            var result = response.data;
            $scope.TransmissionRouteMasterList = result.transmissionRouteMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveTransmissionRouteMaster = function () {
        if ($scope.txtTransmissionRoute == undefined || $scope.txtTransmissionRoute == "") {
            alert('Enter Transmission Route');
            return false;
        }
        var params = {
            id: TransmissionRouteMasterId,
            transmissionRoute: $scope.txtTransmissionRoute,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveTransmissionRouteMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');

            var message = TransmissionRouteMasterId > 0 ? 'UPDATE TRANSMISSION ROUTE MASTER' : 'SAVE TRANSMISSION ROUTE MASTER';
            $rootScope.activityLog(response, message, 'TRANSMISSION ROUTE MASTER', '');

            $scope.TransmissionRouteList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteTransmissionRouteMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteTransmissionRouteMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.TransmissionRouteList();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE TRANSMISSION ROUTE MASTER', 'TRANSMISSION ROUTE MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        TransmissionRouteMasterId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.TransmissionRouteMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.transmissionRouteMaster;
            $scope.txtTransmissionRoute = list[0].transmissionRoute;
            $scope.txtRemark = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        TransmissionRouteMasterId = 0;
        $scope.txtTransmissionRoute = "";
        $scope.txtRemark = "";
    };
    $scope.TransmissionRouteList();
});