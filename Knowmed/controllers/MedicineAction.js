app.controller('medicineActionCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var pkId = 0;

    $scope.intcontrol = function () {        
        dataFactory.InitControlsMedicineAction().then(function (response) {          
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveMedicineAction = function () {

        if ($scope.ddlmedicine === 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        var params = {
            ActionId: pkId,
            medicineId: $scope.ddlmedicine,
            Action: $scope.txteffect,
            bookid: $scope.ddlbookname,
            pageno: $scope.txtpageno,
            edition: $scope.txtedition,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        log(params)
        dataFactory.SaveMedicineAction(params).then(function (response) {  
            var message = pkId > 0 ? 'UPDATE Medicine Action' : 'SAVE Medicine Action';
            $rootScope.activityLog(response, message, 'Medicine Action', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.GetMedicineActionList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.GetMedicineActionList = function () {
        var params = {
            ActionId: pkId
        };
        dataFactory.MedicineActionList(params).then(function (response) {
            var result = response.data;            
            $scope.medicineActionlist = result.medicineActionlist;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.edit = function (paramid) {        
        pkId = paramid;
        var params = {
            ActionId: paramid
        };
        dataFactory.MedicineActionList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineActionlist;
            $scope.ddlmedicine = list[0].medicineID;
            $scope.txteffect = list[0].action;
            $scope.ddlbookname = list[0].bookID;
            $scope.txtpageno = list[0].pageNo;
            $scope.txtedition = list[0].edition;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                ActionId: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };

            dataFactory.DeleteMedicineAction(params).then(function (response) {                
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.GetMedicineActionList();          
                $rootScope.activityLog(response, 'DELETE Medicine Action', 'Medicine Action', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }

    };  
    $scope.clr = function () {
      //  $scope.ddlmedicine = 0;
        $scope.txteffect = '';
        //$scope.txtRemark = '';
        //$scope.txtpageno = '';
        //$scope.ddlbookname = 0;
        //$scope.txtedition = '';
        pkId = 0;
    };

    $scope.intcontrol();
    $scope.GetMedicineActionList();
});