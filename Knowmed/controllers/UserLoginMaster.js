app.controller('userLoginMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var pkId = 0; 

    $scope.initControls = function () {
      
        dataFactory.InitControlsUserLoginMaster().then(function (response) {
         
            var result = response.data;
            $scope.departmentList = result.departmentList;  
            $scope.userTypeList = result.userTypeList;
            $scope.erpDepartmentList = result.erpDepartmentList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetUserLoginMasterList = function () {
        var params = {
            id: 0
        };
        dataFactory.UserLoginMasterList(params).then(function (response) {
            var result = response.data;
            $scope.userLoginList = result.userLoginList; 
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.SaveUserLogin = function () {

        if ($scope.ddlErpDepartment == 0) {
            toaster.pop('error', "Error",'Please Select ERP Department');
            return false;
        }
        if (isEmpty($scope.txtEmployeeID)) {
            toaster.pop('error', "Error", 'Please Enter Employee Id');
            return false;
        }
        if (isEmpty($scope.txtMobile)) {
            toaster.pop('error', "Error", 'Please Enter Mobile No.');
            return false;
        }
        if (isEmpty($scope.txtUserName)) {
            toaster.pop('error', "Error", 'Please Enter User Name');
            return false;
        }
        if (isEmpty($scope.txtLoginID)) {
            toaster.pop('error', "Error", 'Please Enter Login Id');
            return false;
        }
        if (isEmpty($scope.txtPassword)) {
            toaster.pop('error', "Error", 'Please Enter Password');
            return false;
        }
        if (isEmpty($scope.txtRePassword)) {
            toaster.pop('error', "Error", 'Please Re-Type Password');
            return false;
        }
        if ($scope.txtPassword != $scope.txtRePassword) {
            toaster.pop('error', "Error", 'Password Does Not Match');
            return false;
        }
        if ($scope.ddlUserType == -1) {            
            toaster.pop('error', "Error",'Please Select UserType');
            return false;
        }

        var params = {
            id: pkId,        
            erpDepartmentId: $scope.ddlErpDepartment,
            departmentID: $scope.ddlDepartment,
            employeeID: $scope.txtEmployeeID,
            userTypeID: $scope.ddlUserType,
            userName: $scope.txtUserName,
            loginID: $scope.txtLoginID,
            password: $scope.txtPassword,
            mobileNo: $scope.txtMobile,
            isLoginWithOTP: $scope.isLoginWithOTP,
            emailID: $scope.txtEmailID,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveUserLoginMaster(params).then(function (response) {
            var message = pkId > 0 ? 'UPDATE USERLOGIN MASTER' : 'SAVE USERLOGIN MASTER';
            $rootScope.activityLog(response, message, 'USERLOGIN MASTER', '');
            $scope.GetUserLoginMasterList();
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (paramid) {
        pkId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.UserLoginMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.userLoginList;           
            $scope.ddlErpDepartment = list[0].erpDepartmentId;
            $scope.ddlDepartment = list[0].departmentId;
            $scope.txtEmployeeID = list[0].employeeId;
            $scope.ddlUserType = list[0].userTypeId;
            $scope.txtUserName = list[0].userName;
            $scope.txtLoginID = list[0].loginId;
            $scope.txtPassword = list[0].password;
            $scope.txtRePassword = list[0].password; 
            $scope.txtMobile = list[0].mobileNo;
            $scope.txtEmailID = list[0].emailID;
            $scope.isLoginWithOTP = list[0].isLoginWithOTP == 'Yes' ? 1 : 0;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };

            dataFactory.DeleteUserLoginMaster(params).then(function (response) {
                $scope.GetUserLoginMasterList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE USERLOGIN MASTER', 'USERLOGIN MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }

    };   

    $scope.clr = function () {
        $scope.ddlErpDepartment = 0;
        $scope.ddlDepartment = 0;
        $scope.txtEmployeeID = '';
        $scope.ddlUserType = 0;
        $scope.txtUserName = '';
        $scope.txtLoginID = '';
        $scope.txtPassword = '';
        $scope.txtRePassword = '';
        $scope.txtMobile = '';
        $scope.isLoginWithOTP = '';
        $scope.txtEmailID = '';
        pkId = 0;
    };

    $scope.initControls();
    $scope.GetUserLoginMasterList();

});