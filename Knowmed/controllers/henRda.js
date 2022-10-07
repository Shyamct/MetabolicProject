app.controller('henRdaCtrl', function ($scope, $state, toaster, $rootScope, dataFactory, $timeout,ASSETS) {
    var rdaId = "";
    $scope.subDept = [];
    $scope.ageGroupList = [];
    $scope.HenTypeList = [
        {
            hen:'White-Egg Breeders at 100 g of Feed per Hen Daily'
        }, {
            hen: 'White-Egg Layers at 100 g of Feed per Hen Daily'
        }, {
            hen: 'Brown-Egg Layers at 110 g of Feed per Hen Daily'
        }];

    $timeout(function () {
        $scope.userName = UtilsCache.getSession('USERDETAILS').userName;
    }, 0);

    $scope.GetHenRDAList = function () {
        var params = {
            nutrientID: $scope.ddlNutrient
        };
        dataFactory.LoadHenRDA(params).then(function (response) {
            var result = response.data;
            $scope.rdaList = result.rdaList;
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.initControls = function () {
        $scope.ShowUpdate = false;
        $scope.ShowSave = true;
        dataFactory.bindListForHenRDA().then(function (response) {
            var result = response.data;
            $scope.nutrientList = result.nutrientList;
            $scope.unitList = result.unitList;

        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };
    
    $scope.saveHenRDA = function () {
        var params = {

            nutrientID: $scope.ddlNutrient,
            rdaFrom: $scope.txtRdaFrom,
            rdaUnitIDFrom: $scope.ddlRDAUnitFrom,
            rdaTo: $scope.txtRdaTo,
            rdaUnitIDTo: $scope.ddlRDAUnitTo,
            levelDeficiency: $scope.txtDeficiencyLevel,
            levelDeficiencyUnitID: $scope.ddlDefUnit,
            levelToxicity: $scope.txtToxicityLevel,
            levelToxicityUnitID: $scope.ddlToxicityUnit,
            henType: $scope.ddlHenType,
            remark: $scope.txtRemark,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveHenRDA(params).then(function (response) {

            var message = rdaId > 0 ? 'UPDATE Hen RDA ' : 'SAVE Hen RDA ';
            $rootScope.activityLog(response, message, 'HEN RDA ', '');

            $scope.GetHenRDAList();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.edit = function (indexVal, id) {
        $scope.ShowUpdate = true;
        $scope.ShowSave = false;
        rdaId = id;
       

        var params = {
            rdaId: id
        };
        dataFactory.LoadHenRDA(params).then(function (response) {
            var result = response.data;
            var list = result.rdaList;
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.ddlHenType = list[0].henType;
            $scope.txtRdaFrom = list[0].rdaFrom;
            $scope.ddlRDAUnitFrom = list[0].rdaUnitIDFrom;
            $scope.txtRdaTo = list[0].rdaTo;
            $scope.ddlRDAUnitTo = list[0].rdaUnitIDTo;
            $scope.txtToxicityLevel = list[0].levelToxicity;
            $scope.ddlToxicityUnit = list[0].levelToxicityUnitID;
            $scope.txtDeficiencyLevel = list[0].levelDeficiency;
            $scope.ddlDefUnit = list[0].levelDeficiencyUnitID;
            $scope.txtRemark = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });



    };

    $scope.updateHenRDA = function () {
        var params = {
            rdaId: rdaId,
            nutrientID: $scope.ddlNutrient,
            rdaFrom: $scope.txtRdaFrom,
            rdaUnitIDFrom: $scope.ddlRDAUnitFrom,
            rdaTo: $scope.txtRdaTo,
            rdaUnitIDTo: $scope.ddlRDAUnitTo,
            levelDeficiency: $scope.txtDeficiencyLevel,
            levelDeficiencyUnitID: $scope.ddlDefUnit,
            levelToxicity: $scope.txtToxicityLevel,
            levelToxicityUnitID: $scope.ddlToxicityUnit,
            henType: $scope.ddlHenType,
            remark: $scope.txtRemark,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.updateHenRDA(params).then(function (response) {
            $scope.GetHenRDAList();
            toaster.pop('success', "Success", 'Updated Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.delete = function (id) {
        var params = {
            rdaId: id,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.deleteHenRDA(params).then(function (response) {
            $scope.GetHenRDAList();
            toaster.pop('success', "Success", 'Deleted Successfully.');
            $rootScope.activityLog(response, 'DELETE HEN RDA', 'HEN RDA', '');
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.initControls();
    //$scope.RDA();
    
});












