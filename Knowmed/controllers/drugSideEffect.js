app.controller('drugSideEffectCtrl', function ($scope, dataFactory, toaster) {
    $scope.isDisabled = false;
    var DrugSideEffectId = 0; 
    var arr = [];
    $scope.dSideEffectList = "";
    $scope.initControls = function () {
        dataFactory.InitControlsMedSideEffect().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.sideEffectList = result.sideEffectList;
            $scope.bookList = result.bookList;
            $scope.sideEffectTypeList = result.sideEffectTypeList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.GetSideEffectList = function () {
        $scope.clr();
        var params = {
            medicineId: $scope.ddlMedicine
        };
        dataFactory.DrugSideEffectList(params).then(function (response) {
            var result = response.data;
            $scope.drugSideEffectList = result.drugSideEffectList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddSideEffect = function () {
        //alert($("#ddlSideEffect").val());
        //alert($("#ddlSideEffect option:selected").text());
        if ($scope.ddlSideEffect == -1) {
            alert('Please Select Side Effect');
            return false;
        }
        arr.push({
            effectID: $("#ddlSideEffect").val(),
            effectName: $("#ddlSideEffect option:selected").text(),
            sideEffectTypeId: $("#ddlSideEffectType").val(),
            sideEffectType: $("#ddlSideEffectType option:selected").text(),
            isLifeThreatening: $scope.chkIsLifeThreatening == true ? true : false,
            isWatchable: $scope.chkIsWatchable == true ? true : false,
            remark: $scope.txtRemark
        });
        $scope.dSideEffectList = arr;
    };
    $scope.deleteSideEffect = function (index) {
        $scope.dSideEffectList.splice(index, 1);
    };
    $scope.SaveDrugSideEffect = function () {
        if ($scope.ddlMedicine == -1) {
            alert('Please Select Medicine');
            return false;
        }
        var params = {
            id: DrugSideEffectId,
            effectID: $scope.ddlSideEffect,
            sideEffectTypeId: $scope.ddlSideEffectType,
            medicineId: $scope.ddlMedicine,
            remark: $scope.txtRemark,
            isWatchable: $scope.chkIsWatchable,
            isLifeThreatening: $scope.chkIsLifeThreatening,
            lstSideEffect: $scope.dSideEffectList,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            referenceURL: $scope.txtReference,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDrugSideEffect(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetSideEffectList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDrugSideEffect(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetSideEffectList();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        $scope.isDisabled = true;
        DrugSideEffectId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.DrugSideEffectList(params).then(function (response) {
            var result = response.data;
            var list = result.drugSideEffectList;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.ddlSideEffect = list[0].effectID;
            $scope.ddlSideEffectType = list[0].sideEffectTypeId;
            $scope.chkIsLifeThreatening = list[0].isLifeThreateningId;
            $scope.chkIsWatchable = list[0].isWatchableId;
            $scope.txtRemark = list[0].remark;
            $scope.ddlBook = list[0].bookID;
            $scope.txtPageNo = list[0].pageNo;
            $scope.txtEdition = list[0].edition;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        $scope.chkIsRare = false;
        $scope.chkIsLifeThreatening = false;
        $scope.chkIsWatchable = false;
        $scope.chkIsLongTerm = false;
        $scope.dSideEffectList.length = 0;
        $scope.ddlSideEffect = 0;
    };
    $scope.initControls();
});