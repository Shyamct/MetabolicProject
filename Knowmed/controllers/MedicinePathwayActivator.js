app.controller('medicinePathwayActivatorCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var pkId = 0;
    $scope.intControl = function () {
        dataFactory.InitControlsMedicinePathwayActivator().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.effectList = result.effectList;
            $scope.pathwayList = result.pathwayList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.SaveMedicinePathwayActivator = function () {

        if ($scope.ddlmedicine === 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        var params = {
            medCofactorId: pkId,
            medId: $scope.ddlmedicine,
            effectTypeId: $scope.ddleffect,
            nutrientId: $scope.ddlpathway,
            bookId: $scope.ddlbookname,
            pageNo: $scope.txtpageno,
            edition: $scope.txtedition,
            refrence: $scope.txtReference,
            remark: $scope.txtRemark,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicinePathwayActivator(params).then(function (response) {
            var message = pkId > 0 ? 'Update Medicine Pathway Activator' : 'Save Medicine Pathway Activator';
            $rootScope.activityLog(response, message, 'Medicine Pathway Activator', '');
            $scope.MedicinePathwayActivatorList();
            toaster.pop('success', "Success", 'Saved Successfully.');           
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.MedicinePathwayActivatorList = function () {
        $scope.clr();
        var params = {
            medCofactorId: pkId
        };
        dataFactory.MedicinePathwayActivatorList(params).then(function (response) {
            var result = response.data;
            $scope.medicinePathwayActivatorlist = result.medicinePathwayActivatorlist;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.edit = function (paramid) {
        pkId = paramid;
        var params = {
            medCofactorId: paramid
        };
        dataFactory.MedicinePathwayActivatorList(params).then(function (response) {
            var result = response.data;
            var list = result.medicinePathwayActivatorlist;           
            $scope.ddlmedicine = list[0].medicineID;
            $scope.ddleffect = list[0].statusId;
            $scope.ddlpathway = list[0].nutrientID;
            $scope.ddlbookname = list[0].bookID;
            $scope.txtpageno = list[0].pageNo;
            $scope.txtedition = list[0].edition;
            $scope.txtReference = list[0].reference;
            $scope.txtRemark = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                medCofactorId: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicinePathwayActivator(params).then(function (response) {
                $scope.MedicinePathwayActivatorList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Medicine Pathway Activator', ' Medicine Pathway Activator', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.clr = function () {      
        $scope.ddlpathway = 0;
        //$scope.txtReference = '';
        //$scope.txtpageno = '';
        //$scope.ddlbookname = 0;
        //$scope.txtedition = '';
        //$scope.txtRemark = '';
        medCofactorId = 0;
        pkId = 0;
    };
    $scope.intControl();
   $scope.MedicinePathwayActivatorList();
});