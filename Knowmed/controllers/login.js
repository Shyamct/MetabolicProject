app.controller('loginCtrl', function ($scope, $state, toaster, dataFactory, ASSETS, $rootScope) {

    $scope.getIp = function () {
        var obj = {};
        dataFactory.getIPAddress(obj).then(function (response) {
            var result = response.data;
            systemIP = result.ipAddress[0].ipAddress;
            $rootScope.getSystemIP = result.ipAddress[0].ipAddress;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.getIp();

    $scope.login = function () {
        if (isEmpty($scope.txtUserName) || isEmpty($scope.txtUserPassword)) {
            toaster.pop('error', "Error", 'Please fill all the details');
        } else {
            var otp = null;
            if ($('#txtOTP').val() === undefined || $('#txtOTP').val() === "" || $('#txtOTP').val() === null) {
                otp = null;
            }
            else {
                otp = $('#txtOTP').val();
            }
            var logindetails = {
                loginID: $scope.txtUserName,
                Password: $scope.txtUserPassword,
                currentOTP: otp,
                systemIP: systemIP
            };
            dataFactory.authorize(logindetails).then(function (response) {
                $scope.isOTPSent = 0;
                $rootScope.userDetailsList = response.data.userDetails;
                $rootScope.userName = response.data.userDetails[0].userName;
                $rootScope.userMobileNo = response.data.userDetails[0].mobileNo;
                $rootScope.userLoginID = response.data.userDetails[0].loginID;
                $rootScope.userEmailID = response.data.userDetails[0].emailID;
                $rootScope.departmentID = response.data.userDetails[0].departmentID;

                console.log($rootScope.userDetailsList);
                if (response.data.userDetails[0].isLoginWithOTP == 0) {
                 
                    $scope.isOTPSent = 0;
                    UtilsCache.set("AUTHTOKEN", response.data.userDetails[0].accessToken, ASSETS.login.TokenExpireTime);
                    UtilsCache.setSession("USERDETAILS", response.data.userDetails[0], ASSETS.login.TokenExpireTime);
                    UtilsCache.setSession("MENUASSIGN", response.data.menuAssign, ASSETS.login.TokenExpireTime);
                    $rootScope.activityLog(response, 'Login', 'Login', '', JSON.stringify(logindetails));
                    $state.go('dashboard');
                }
                else if (response.data.userDetails[0].isLoginWithOTP == 1 && response.data.userDetails[0].isVerifyLoginWithOTP == 0) {
                    $scope.isOTPSent = 1;
                }
                else if (response.data.userDetails[0].isLoginWithOTP == 1 && response.data.userDetails[0].isVerifyLoginWithOTP == 1) {
                   
                    $scope.isOTPSent = 0;
                    UtilsCache.set("AUTHTOKEN", response.data.userDetails[0].accessToken, ASSETS.login.TokenExpireTime);
                    UtilsCache.setSession("USERDETAILS", response.data.userDetails[0], ASSETS.login.TokenExpireTime);
                    UtilsCache.setSession("MENUASSIGN", response.data.menuAssign, ASSETS.login.TokenExpireTime);
                    $rootScope.activityLog(response, 'Login', 'Login', '', JSON.stringify(logindetails));
                    $state.go('dashboard');
                }
            }, function (error) {
                toaster.pop('error', "Error", 'Invalid UserID or Password');
            })
        };
    }
});



