app.controller('nutrientFoodSideEffectCtrl', function ($scope, dataFactory, $rootScope, toaster) {
    $scope.isDisabled = false;
    var existID = 0;   
    var arr = [];
    
    $scope.addedNutrietFoodSideEffectList = '';
   
    $scope.InitControls = function () {
        dataFactory.NutrietFoodSideEffectInitControls().then(function (response) {
            var result = response.data;          
            $scope.statusList = result.statusList;
            $scope.sideEffectTypeList = result.sideEffectTypeList;
            $scope.problemList = result.problemList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetCompoundList = function () {
        var params = {
            compoundType: $scope.ddlCompoundType
        };        
        dataFactory.GetCompoundList(params).then(function (response) {
            var result = response.data;
            $scope.compoundList = result.compoundList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetNutrietFoodSideEffectList = function () {
        var params = {
            id: existID
        };
        dataFactory.GetNutrietFoodSideEffectList(params).then(function (response) {
            var result = response.data;
            $scope.nutrietFoodSideEffectList = result.nutrietFoodSideEffectList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetAttributeList = function () {
        var params = {
            effectID: $scope.ddlSideEffectProblem
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
    $scope.addNutrietFoodSideEffect = function () {
                  
        arr.push({
            compoundType: $("#ddlCompoundType").val() != '' ? $("#ddlCompoundType option:selected").text().trim() : '',
            compoundID: $("#ddlCompound").val(),
            compound: $("#ddlCompound").val() != '' ? $("#ddlCompound option:selected").text().trim() : '',
            sideEffectTypeId: $("#ddlStatus").val(),
            sideEffectType: $("#ddlStatus").val() != '' ? $("#ddlStatus option:selected").text().trim() : '',
            effectID: $("#ddlSideEffectProblem").val(),
            effect: $("#ddlSideEffectProblem").val() != '' ? $("#ddlSideEffectProblem option:selected").text().trim() : '',
            attributeTypeID: $("#ddlAttribute").val(),
            attributeType: $("#ddlAttribute").val() != '' ? $("#ddlAttribute option:selected").text().trim() : '',
            attributeValueID: $("input[name='rdAttribute']:checked").val(),
            attributeValueName: $("input[name='rdAttribute']:checked").parent('label').text().trim(),
            isLifeThreatening: $scope.chkIsLifeThreatening,
            isWatchable: $scope.chkIsWatchable,
            isLifeThreateningValue: $scope.chkIsLifeThreatening === true ? 'Yes' : 'No',
            isWatchableValue: $scope.chkIsWatchable === true ? 'Yes' : 'No',
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            url: $scope.txtURL
        });

        $scope.addedNutrietFoodSideEffectList = arr;
    };
    $scope.deleteNutrietFoodSideEffectList = function (index) {
        $scope.addedNutrietFoodSideEffectList.splice(index, 1);
    };
    $scope.SaveNutrietFoodSideEffect = function () {

        if (existID == 0) {
            if ($scope.addedNutrietFoodSideEffectList.length < 1) {
                toaster.pop('error', "Error", 'Please Fill The Form !!');
                return false;
            }
        }
       
        var params = {
            id: existID,
            compoundType: $scope.ddlCompoundType,
            compoundID: $scope.ddlCompound,
            sideEffectTypeId: $scope.ddlStatus,
            effectID: $scope.ddlSideEffectProblem,
            attributeTypeID: $scope.ddlAttribute,
            attributeValueID: $("input[name='rdAttribute']:checked").val(),
            isWatchable: $scope.chkIsWatchable,
            isLifeThreatening: $scope.chkIsLifeThreatening,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            url: $scope.txtURL,
            nutrietFoodSideEffectList: JSON.stringify($scope.addedNutrietFoodSideEffectList),
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveNutrietFoodSideEffect(params).then(function (response) {
            var message = existID > 0 ? 'UPDATE NUTRIET FOOD SIDEEFFECT' : 'SAVE NUTRIET FOOD SIDEEFFECT';
            $rootScope.activityLog(response, message, 'NUTRIET FOOD SIDEEFFECT', '');
            $scope.clr();
            $scope.GetNutrietFoodSideEffectList();           
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
            dataFactory.DeleteNutrietFoodSideEffect(params).then(function (response) {
                $scope.clr();
                $scope.GetNutrietFoodSideEffectList();               
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE NUTRIET FOOD SIDEEFFECT', 'NUTRIET FOOD SIDEEFFECT', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        $scope.isDisabled = true;
        existID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.GetNutrietFoodSideEffectList(params).then(function (response) {
            var result = response.data;
            var list = result.nutrietFoodSideEffectList;
          
            $scope.ddlCompoundType = list[0].compoundType;
            $scope.GetCompoundList();
            $scope.ddlCompound = list[0].compoundID;
            $scope.ddlStatus = list[0].sideEffectTypeId;  
            $scope.ddlSideEffectProblem = list[0].effectID;
            $scope.GetAttributeList();
            $scope.ddlAttribute = list[0].attributeTypeID;
            $scope.GetAttributeValueList();
            $scope.attributeValue = list[0].attributeValueID;
            $scope.chkIsWatchable = list[0].isWatchable;
            $scope.chkIsLifeThreatening = list[0].isLifeThreatening;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference;
            $scope.txtURL = list[0].url;
            $scope.ddlBook = list[0].bookID;
            $scope.txtPageNo = list[0].pageNo;
            $scope.txtEdition = list[0].edition;
            $scope.isDisabled = true;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.clr = function () {
        existID = 0;
        arr.length = 0;
        $scope.ddlCompoundType = '';
        $scope.ddlCompound = '';
        $scope.ddlStatus = '';
        $scope.ddlSideEffectProblem = '';
        $scope.ddlAttribute = '';
        $scope.attributeValue = '';
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.txtURL = '';  
        $scope.chkIsWatchable = false; 
        $scope.chkIsLifeThreatening = false; 
        $scope.ddlBook = 0;
        $scope.txtPageNo = '';
        $scope.txtEdition = '';
        $scope.addedNutrietFoodSideEffectList = '';
        $scope.attributeValueList = '';
        
        $scope.isDisabled = false; 
    };

    $scope.InitControls();
    $scope.GetNutrietFoodSideEffectList();
});