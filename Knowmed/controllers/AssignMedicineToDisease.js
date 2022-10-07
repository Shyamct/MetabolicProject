	app.controller('assignMedicineToDiseaseCtrl', function ($scope, dataFactory, toaster) {   
    var assignId = 0;    

    $scope.initControls = function () {
        dataFactory.InitControlsMedicineToDisease().then(function (response) {
            var result = response.data;           
            $scope.diseaseList = result.diseaseList;
            $scope.medicineList = result.medicineList;
			 $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.GetAssignedMedicineToDisease = function () {
        $scope.clr();
        var params = {
            id: assignId
        };
        dataFactory.AssignedMedicineToDiseaseList(params).then(function (response) {
            var result = response.data;
            $scope.medicineToDiseaseList = result.medicineToDiseaseList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveAssignMedicineToDisease = function () {
       
        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }
        //if ($scope.ddlMedicine == 0) { 
        //    toaster.pop('error', "Error", 'Please Select Medicine');
        //    return false;
        //}
        var params = {
            id: assignId,
            medicineID: $scope.ddlMedicine,
            problemID: $scope.ddlProblem,
            remark: $scope.txtRemark,
			bookId: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineToDisease(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetAssignedMedicineToDisease();
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
            dataFactory.DeleteMedicineToDisease(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetAssignedMedicineToDisease();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        assignId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.AssignedMedicineToDiseaseList(params).then(function (response) {
            var result = response.data;
            log(result);
            var list = result.medicineToDiseaseList;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.ddlProblem = list[0].problemID;
            $scope.txtRemark = list[0].remark;
			$scope.ddlbookname = list[0].bookID;
            $scope.txtpageno = list[0].pageNo;
            $scope.txtedition = list[0].edition;
            $scope.txtReference = list[0].reference;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {   
       // $scope.ddlMedicine = 0;
       // $scope.ddlProblem = 0;
        assignId = 0;
    };
    $scope.initControls();
    $scope.GetAssignedMedicineToDisease();
});