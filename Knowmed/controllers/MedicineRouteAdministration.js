app.controller('medicineRouteAdministrationCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var mrId = 0;

    $scope.intControl = function () {
        dataFactory.medicineRouteAdministrationInitControl().then(function (response) {
            var result = response.data;
            log(result.medicineList);
            $scope.medicineList = result.medicineList;
            $scope.routeList = result.routeList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveMedicineRouteAdministration = function () {

        if ($scope.ddlmedicine === 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        var params = {
            Id : mrId,
            medicineId: $scope.ddlmedicine,
            routeAdministrationID: $scope.ddlroute,
            bookID: $scope.ddlbookName,
            pageNo: $scope.txtpageno,
            edition: $scope.txtedition,
            reference: $scope.txtreference,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveMedicineRouteAdministration(params).then(function (response) {
            var message = (mrId == 0 ? 'SAVE Medicine Route Administration ' : 'UPDATE Medicine Route Administration ');           
            $rootScope.activityLog(response, message, 'Medicine Route Administration ', ' '); 
            $scope.clr();
            $scope.MedicineAdministrationList();
           
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.MedicineAdministrationList = function () {
        var params = {
            id: mrId
        };
        dataFactory.MedicineAdministrationList(params).then(function (response) {
            var result = response.data;
            $scope.medicineAdministrationList = result.medicineAdministrationList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.edit = function (paramid) {
        mrId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.MedicineAdministrationList(params).then(function (response) {
            var result = response.data;            
            var list = result.medicineAdministrationList;
            $scope.ddlmedicine = list[0].medicineID;
            $scope.ddlroute = list[0].routeAdministrationID;
            $scope.ddlbookName = list[0].bookID;
            $scope.txtpageno = list[0].pageNo;
            $scope.txtedition = list[0].edition;
            $scope.txtreference = list[0].reference;
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
            dataFactory.deleteMedicineRouteAdministration(params).then(function (response) {
                $scope.clr();
                $scope.MedicineAdministrationList();
                toaster.pop('success', "Success", 'Deleted Successfully.'); 
                $rootScope.activityLog(response, 'DELETE Medicine Route Administration', 'Medicine Route Administration ', ''); 
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.clr = function () {
        $scope.ddlmedicine = 0;
        $scope.ddlroute = 0;
        $scope.ddlbookName = -1;
        $scope.txtpageno = '';
        $scope.txtedition = '';
        $scope.txtreference = '';
        mrId = 0;
    };
    $scope.intControl();
    $scope.MedicineAdministrationList();
});