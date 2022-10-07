app.controller('medicineMechanismInteractionCtrl', function ($scope, dataFactory, toaster, $rootScope) {   
    var existId = 0;    

    $scope.initControls = function () {
        dataFactory.InitControlsMedicineMechanismInteraction().then(function (response) {
            var result = response.data;           
            $scope.medicineList = result.medicineList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.getMedicineMechanismInteraction = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.MedicineMechanismInteractionList(params).then(function (response) {
            var result = response.data;
            $scope.medicineMechanismInteractionList = result.medicineMechanismInteractionList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveMedicineMechanismInteraction = function () {
       
        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }

        var params = {
            id: existId,
            medicineID: $scope.ddlMedicine,
            interactionMechanism: $scope.txtInteractionMechanism,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)            
        };
        dataFactory.SaveMedicineMechanismInteraction(params).then(function (response) {
            var message = existId > 0 ? 'Update Medicine Mechanism Interaction' : 'Save Medicine Mechanism Interaction';
            $rootScope.activityLog(response, message, 'Medicine Mechanism Interaction', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.getMedicineMechanismInteraction();
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
            dataFactory.DeleteMedicineMechanismInteraction(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.getMedicineMechanismInteraction();
                $rootScope.activityLog(response, 'Delete Medicine Mechanism Interaction', ' Medicine Mechanism Interaction', '');
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
        dataFactory.MedicineMechanismInteractionList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineMechanismInteractionList;  
            $scope.ddlMedicine = list[0].medicineID
            $scope.txtInteractionMechanism = list[0].interactionMechanism
            $scope.ddlBook = list[0].bookID
            $scope.txtPageNo = list[0].pageNo
            $scope.txtEdition = list[0].edition
            $scope.txtRemark = list[0].remark
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        // $scope.ddlMedicine = 0;
         $scope.txtInteractionMechanism = '';
        // $scope.ddlBook = 0;
        // $scope.txtRemark = '';
        // $scope.txtPageNo = '';
        // $scope.txtEdition = '';
        existId = 0;
    };

    $scope.initControls();
    $scope.getMedicineMechanismInteraction();
});