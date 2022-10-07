app.controller('serviceProviderLocationCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var providerId = 0;

    $scope.initControls = function () {
        dataFactory.initControls().then(function (response) {
            var result = response.data;
            $scope.providerLocationList = result.providerLocation;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getServiceProviderLocation = function () {
        params = {
            id: 0
        };
        dataFactory.serviceProviderLocationList(params).then(function (response) {
            var result = response.data;
            $scope.providerLocationList2 = result.providerLocationList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.bindStateCity = function (pinCode) {
        var parms = {
            pinCode: pinCode
        };
        dataFactory.bindStateCityByPinCode(parms).then(function (response) {
            var result = response.data;
            $scope.pinCityState = result.cityStateList;
            $scope.txtState = result.cityStateList[0].state;
            $scope.txtCity = result.cityStateList[0].city;
            $scope.txtZone = result.cityStateList[0].zone;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveServiceProviderLocation = function () {

        if ($scope.ddlServiceName == 0) {
            toaster.pop('error', "Error", 'Please Select Provider Type !!');
            return false;
        }


        var params = {

            id: providerId,
            serviceProviderTypeID: $scope.ddlServiceName,
            serviceProviderName: $scope.txtProvider,
            pincode: $scope.txtPin,
            state: $scope.txtState,
            city: $scope.txtCity,
            zone: $scope.txtZone,
            address: $scope.txtAddress,
            mobileNo: $scope.txtMobile,
            phoneNo: $scope.txtPhone,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveServiceProviderLocation(params).then(function (response) {
            var message = providerId > 0 ? 'Update Service Provider Location' : 'Save Service Provider Location';
            $rootScope.activityLog(response, message, 'Service Provider Location', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.getServiceProviderLocation();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
            };
            dataFactory.deleteServiceProviderLocation(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getServiceProviderLocation();
                $rootScope.activityLog(response, 'Delete Service Provider Location', 'Service Provider Location', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        providerId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.serviceProviderLocationList(params).then(function (response) {
            var result = response.data;
            var list = result.providerLocationList;
            $scope.ddlServiceName = list[0].serviceProviderTypeID;
            $scope.txtProvider = list[0].serviceProviderName;
            $scope.txtPin = list[0].pinCode;
            $scope.txtState = list[0].state;
            $scope.txtCity = list[0].city;
            $scope.txtZone = list[0].zone;
            $scope.txtAddress = list[0].address;
            $scope.txtMobile = list[0].mobileNo;
            $scope.txtPhone = list[0].phoneNo;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clr = function () {
        $scope.ddlServiceName = 0;
        $scope.txtProvider = '';
        $scope.txtPin = '';
        $scope.txtState = '';
        $scope.txtCity = '';
        $scope.txtZone = '';
        $scope.txtAddress = '';
        $scope.txtMobile = '';
        $scope.txtPhone = '';
        providerId = 0;
    };

    $scope.initControls();
    $scope.getServiceProviderLocation();
});