app.controller('medicineBrandCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    $scope.isDisabled = false;
    var medicineBrandId = 0;
    var arr = [];
    $scope.medicineBrandList = "";
    $scope.addedMedicineBrandList = "";
    $scope.initControls = function () {
        dataFactory.InitControlsMedicineBrand().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineMaster;
            $scope.bookList = result.bookMaster;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetMedicineBrand = function () {
        $scope.clr();
        var params = {
            id: medicineBrandId
        };
        dataFactory.MedicineBrandList(params).then(function (response) {
            var result = response.data;
            $scope.addedMedicineBrandList = result.medicineMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.AddMedicineBrand = function () {
        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        if (isEmpty($scope.medicineBrand)) {
            toaster.pop('error', "Error", 'Please Enter Brand Name');
            return false;
        }
        for (var i = 0; i < $scope.medicineBrandList.length; i++) {
            if ($scope.medicineBrandList[i].medicineId == $scope.ddlMedicine && $scope.medicineBrandList[i].medicineBrand == $scope.medicineBrand) {
                toaster.pop('error', "Error", 'Brand Already Added To This Medicine');
                return false;
            }          
        }
        for (var i = 0; i < $scope.addedMedicineBrandList.length; i++) {
            if ($scope.addedMedicineBrandList[i].medicineId == $scope.ddlMedicine && $scope.addedMedicineBrandList[i].name == $scope.medicineBrand) {
                toaster.pop('error', "Error", 'Already Saved This Brand Name For This Medicine ');
                return false;
            }
        }
        arr.push({
            medicineId: $("#ddlMedicine").val(),
            medicineName: $("#ddlMedicine option:selected").text(),
            medicineBrand: $scope.medicineBrand
        });
        $scope.medicineBrandList = arr;
        $scope.medicineBrand = '';
    };
    $scope.deleteMedicineBrand = function (index) {
        $scope.medicineBrandList.splice(index, 1);
    };
    $scope.saveMedicineBrand = function () {
       
        if (medicineBrandId > 0) {
            if ($scope.ddlMedicine == 0) {
                toaster.pop('error', "Error", 'Please Select Medicine');
                return false;
            }
            //if ($scope.medicineBrand == '') {
            //    toaster.pop('error', "Error", 'Please Enter Brand Name');
            //    return false;
            //}
        }
        var params = {
            id: medicineBrandId,
            medicineID: $scope.ddlMedicine,
            medicineBrand: $scope.medicineBrand,
            lstMedicineBrand: $scope.medicineBrandList,
            remark: $scope.txtRemark,
            bookID: $scope.ddlbookname,
            pageNo: $scope.txtpageno,
            edition: $scope.txtedition,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)           
        };       
        dataFactory.SaveMedicineBrand(params).then(function (response) {
            var message = medicineBrandId > 0 ? 'UPDATE Medicine Brand' : 'SAVE Medicine Brand';
            $rootScope.activityLog(response, message, 'Medicine Brand', '');
            $scope.GetMedicineBrand();
            toaster.pop('success', "Success", 'Saved Successfully.');
           
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
            dataFactory.DeleteMedicineBrand(params).then(function (response) {
                $scope.GetMedicineBrand();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE Medicine Brand', 'Medicine Brand', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        $scope.isDisabled = true;
        medicineBrandId = paramid;
        var params = {
            id: paramid            
        };
        dataFactory.MedicineBrandList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineMaster;
            $scope.ddlMedicine = list[0].medicineId;
            $scope.medicineBrand = list[0].name;
            $scope.txtRemark = list[0].remark;
            $scope.ddlbookname = list[0].bookID;
            $scope.txtpageno = list[0].pageNo;
            $scope.txtedition = list[0].edition;
            $scope.txtReference = list[0].reference
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.clr = function () {
        $scope.medicineBrandList.length = 0;
       // $scope.medicineBrand = '';
        medicineBrandId = 0;
        $scope.isDisabled = false;
    };
    $scope.initControls();
    $scope.GetMedicineBrand();
});