app.controller('medicineMechanismActionCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var existId = 0;

    $scope.initControls = function () {
        dataFactory.InitControlsMedicineMechanismAction().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getMedicineMechanismAction = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.MedicineMechanismActionList(params).then(function (response) {
            var result = response.data;
            $scope.medicineMechanismActionList = result.medicineMechanismActionList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveMedicineMechanismAction = function () {

        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }

        var params = {
            id: existId,
            medicineID: $scope.ddlMedicine,
            actionMechanism: $scope.txtActionMechanism,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineMechanismAction(params).then(function (response) {
            var message = existId > 0 ? 'Update Medicine Mechanism Action' : 'Save Medicine Mechanism Action';
            $rootScope.activityLog(response, message, 'Medicine Mechanism Action', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.getMedicineMechanismAction();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineMechanismAction(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.getMedicineMechanismAction();
                $rootScope.activityLog(response, 'Delete Medicine Mechanism Action', ' Medicine Mechanism Action', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        existId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.MedicineMechanismActionList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineMechanismActionList;
            $scope.ddlMedicine = list[0].medicineID
            $scope.txtActionMechanism = list[0].actionMechanism
            $scope.ddlBook = list[0].bookID
            $scope.txtPageNo = list[0].pageNo
            $scope.txtEdition = list[0].edition
            $scope.txtRemark = list[0].remark
            $scope.txtReference = list[0].reference
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
      //  $scope.ddlMedicine = 0;
        $scope.txtActionMechanism = '';
        // $scope.ddlBook = 0;
        // $scope.txtRemark = '';
        // $scope.txtPageNo = '';
        // $scope.txtEdition = '';
       existId = 0;
    };

    $scope.initControls();
    $scope.getMedicineMechanismAction();
});