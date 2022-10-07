app.controller('changePasswordCtrl', function ($scope, dataFactory, toaster) {      

    $scope.UpdateUserPassword = function () {

        if (isEmpty($scope.txtOldPassword)) {
            toaster.pop('error', "Error", 'Please Enter Password');
            return false;
        }
        if (isEmpty($scope.txtNewPassword)) {
            toaster.pop('error', "Error", 'Please Enter Password');
            return false;
        }
        if (isEmpty($scope.txtRePassword)) {
            toaster.pop('error', "Error", 'Please Re-Type Password');
            return false;
        }
        if ($scope.txtNewPassword != $scope.txtRePassword) {
            toaster.pop('error', "Error", 'Password Does Not Match');
            return false;
        }
        var params = {
            password: $scope.txtOldPassword,
            newPassword: $scope.txtNewPassword,
            id: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.UpdateUserPassword(params).then(function (response) {

            toaster.pop('success', "Success", 'Updated Successfully.');
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

  
    $scope.clr = function () {
        $scope.txtOldPassword = '';
        $scope.txtNewPassword = '';
        $scope.txtRePassword = '';
    };
});