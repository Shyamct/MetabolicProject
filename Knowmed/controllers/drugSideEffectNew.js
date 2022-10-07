app.controller('drugSideEffectNewCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    $scope.isDisabled = false;
    var DrugSideEffectId = 0;
    var arr = [];
    $scope.dSideEffectList = "";
    $scope.initControls = function () {
        dataFactory.InitControlsMedSideEffectNew().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.sideEffectList = result.sideEffectList;
            $scope.bookList = result.bookList;
            $scope.sideEffectTypeList = result.sideEffectTypeList;
            $scope.drugEffectList = result.drugEffectList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetSideEffectList = function () {
        $scope.clr();
        var params = {
            medicineId: $scope.ddlMedicine
        };
        dataFactory.DrugSideEffectListNew(params).then(function (response) {
            var result = response.data;
            $scope.drugSideEffectList = result.drugSideEffectList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetAttributeList = function () {

        var params = {
            effectID: $scope.ddlSideEffect
        };
        dataFactory.GetAttributeListNew(params).then(function (response) {
            var result = response.data;
            $scope.attributeList = result.attributeList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetAttributeValueList = function () {

        var params = {
            attributeTypeID: $scope.ddlAttribute
        };
        dataFactory.GetAttributeValueListNew(params).then(function (response) {
            var result = response.data;
            $scope.attributeValueList = result.attributeValueList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.AddSideEffect = function () {
        //if ($scope.ddlSideEffect == 0) {
        //    alert('Please Select Side Effect');
        //    return false;
        //}
        //for (var i = 0; i < $scope.dSideEffectList.length; i++) {
        //    if ($scope.dSideEffectList[i].effectID == $scope.ddlSideEffect && $scope.dSideEffectList[i].attributeTypeID == $scope.ddlAttribute) {
        //        toaster.pop('error', "Error", " Already Added This Side Effect");
        //        return false;
        //    }
        //}
        arr.push({
            effectID: $("#ddlSideEffect").val(),
            effectName: $("#ddlSideEffect option:selected").text(),
            sideEffectTypeId: $("#ddlSideEffectType").val(),
            sideEffectType: $("#ddlSideEffectType option:selected").text(),
            attributeTypeID: $("#ddlAttribute").val(),
            attributeName: $("#ddlAttribute option:selected").text(),
            attributeValueID: $("input[name='rdAttribute']:checked").val(),
            attributeValueName: $("input[name='rdAttribute']:checked").parent('label').text(),
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
            medicineId: $scope.ddlMedicine,
            remark: $scope.txtRemark,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            referenceURL: $scope.txtReference,
            sideEffectTypeId: $scope.ddlSideEffectType,
            attributeTypeID: $scope.ddlAttribute,
            //attributeValueID: $scope.attributeValue,
            attributeValueID: $("input[name='rdAttribute']:checked").val(),
            isWatchable: $scope.chkIsWatchable,
            isLifeThreatening: $scope.chkIsLifeThreatening,
            lstSideEffect: $scope.dSideEffectList,
            referenceURL: $scope.txtReference,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveDrugSideEffectNew(params).then(function (response) {
            var message = (DrugSideEffectId == 0 ? 'SAVE Druge Side Effect New' : 'UPDATE  Druge Side Effect New');
            $scope.clr();
            $rootScope.activityLog(response, message, 'Druge Side Effect ', ' '); 
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
            dataFactory.DeleteDrugSideEffectNew(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE Drug Side Effect New', 'Drug Side Effect New', ''); 
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
            id: paramid,
            medicineId: $scope.ddlMedicine
        };

        dataFactory.DrugSideEffectListNew(params).then(function (response) {
            var result = response.data;
            var list = result.drugSideEffectList;

            $scope.ddlMedicine = list[0].medicineID;
            $scope.ddlSideEffect = list[0].effectID;
            $scope.GetAttributeList();
            $scope.ddlAttribute = list[0].attributeTypeID;
            $scope.GetAttributeValueList();
            $scope.attributeValue = list[0].attributeValueID;
            $scope.ddlSideEffectType = list[0].sideEffectTypeId;
            $scope.chkIsLifeThreatening = list[0].isLifeThreateningId;
            $scope.chkIsWatchable = list[0].isWatchableId;
            $scope.txtRemark = list[0].remark;
            $scope.ddlBook = list[0].bookID;
            $scope.txtPageNo = list[0].pageNo;
            $scope.txtEdition = list[0].edition;
            $scope.txtReference = list[0].referenceURL;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clr = function () {
        $scope.isDisabled = false;
        DrugSideEffectId = 0;
        $scope.chkIsRare = false;
        $scope.chkIsLifeThreatening = false;
        $scope.chkIsWatchable = false;
        $scope.chkIsLongTerm = false;
        $scope.dSideEffectList.length = 0;
        $scope.ddlSideEffect = 0;
        $scope.ddlAttribute = 0;
        $scope.attributeValueList = '';
    };
    $scope.initControls();
});