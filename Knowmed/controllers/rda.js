app.controller('rdaCtrl', function ($scope, $state, toaster, $rootScope, dataFactory, $timeout, ASSETS) {
    var rdaId = "";
    $scope.subDept = [];
    $scope.ageGroupList = [];
    $scope.ageUnitList = [
        {
            id: 'DAY',
            name: 'DAY'
        }, {
            id: 'MONTH',
            name: 'MONTH'
        }, {
            id: 'YEAR',
            name: 'YEAR'
        }];

    $timeout(function () {
        $scope.userName = UtilsCache.getSession('USERDETAILS').userName;
    }, 0);

    $scope.GetRDAList = function () {
        var params = {
            nutrientID: $scope.ddlNutrient
        };
        dataFactory.LoadRDA(params).then(function (response) {
            var result = response.data;
            $scope.rdaList = result.rdaList;
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.initControls = function () {
        $scope.ShowUpdate = false;
        $scope.ShowSave = true;
        dataFactory.bindListForRDA().then(function (response) {
            var result = response.data;
            $scope.nutrientList = result.nutrientList;
            $scope.ageGroupList = result.ageGroupList;
            $scope.activityList = result.activityList;
            $scope.unitList = result.unitList;
            $scope.countryList = result.countryList;

        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    //$scope.RDA = function () {
    //    dataFactory.LoadRDA().then(function (response) {
    //        var result = response.data;
    //        console.log(result.rdaList);
    //        $scope.rdaList = result.rdaList;

    //    }, function (error) {
    //        toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message:error);
    //    });
    //};


    //$scope.saveRDA = function () {
    //    var params = {
    //        nutrientID: $scope.ddlNutrient,
    //        rdaFrom: $scope.txtRdaFrom,
    //        rdaUnitIDFrom: $scope.ddlRDAUnitFrom,
    //        rdaTo: $scope.txtRdaTo,
    //        rdaUnitIDTo: $scope.ddlRDAUnitTo,
    //        levelDeficiency: $scope.txtDeficiencyLevel,
    //        levelDeficiencyUnitID: $scope.ddlDefUnit,
    //        levelToxicity: $scope.txtToxicityLevel,
    //        levelToxicityUnitID: $scope.ddlToxicityUnit,
    //        ageGroupId: $scope.ddlAgeGroup,
    //        ageFrom: $scope.txtAgeFrom,
    //        ageFromUnit: $scope.ddlAgeFromUnit,
    //        ageTo: $scope.txtAgeTo,
    //        ageToUnit: $scope.ddlAgeToUnit,
    //        activityCategoryID: $scope.ddlActivity,
    //        countryID: $scope.ddlCountry,
    //        reference: $scope.txtReference,
    //        url: $scope.txtUrl,
    //        userID: Number(UtilsCache.getSession('USERDETAILS').userid)
    //    };
    //    alert($scope.rdaList[$scope.objectIndex]);
    //    if ($scope.rdaList[$scope.objectIndex] === null) {
    //        alert('SAVE');
    //    }
    //    else {
    //        alert('UPDATE');
    //    }
    //};
    $scope.saveRDA = function () {
        var params = {
            nutrientID: $scope.ddlNutrient,
            gender: $scope.rbMale == '1' ? $scope.rbMale : $scope.rbFemale == '2' ? $scope.rbFemale : 0,
            rdaFrom: $scope.txtRdaFrom,
            rdaUnitIDFrom: $scope.ddlRDAUnitFrom,
            rdaTo: $scope.txtRdaTo,
            rdaUnitIDTo: $scope.ddlRDAUnitTo,
            levelDeficiency: $scope.txtDeficiencyLevel,
            levelDeficiencyUnitID: $scope.ddlDefUnit,
            levelToxicity: $scope.txtToxicityLevel,
            levelToxicityUnitID: $scope.ddlToxicityUnit,
            ageGroupId: $scope.ddlAgeGroup,
            ageFrom: $scope.txtAgeFrom,
            ageFromUnit: $scope.ddlAgeFromUnit,
            ageTo: $scope.txtAgeTo,
            ageToUnit: $scope.ddlAgeToUnit,
            activityCategoryID: $scope.ddlActivity,
            countryID: $scope.ddlCountry,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveRDA(params).then(function (response) {
            var message = rdaId > 0 ? 'UPDATE NUTRIENT RDA' : 'SAVE NUTRIENT RDA';
            $rootScope.activityLog(response, message, 'NUTRIENT RDA', '');

            $scope.GetRDAList();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.edit = function (indexVal, id) {
        $scope.ShowUpdate = true;
        $scope.ShowSave = false;
        rdaId = id;
        //$scope.objectIndex = indexVal;
        //var rda = $scope.rdaList[indexVal];
        //console.log(rda);
        //$scope.ddlNutrient = rda.nutrientID;
        //$scope.ddlAgeGroup = rda.ageGroupId;
        //$scope.ddlActivity = rda.activityCategoryID;
        //$scope.txtAgeFrom = rda.ageFrom;
        //$scope.ddlAgeFromUnit = rda.ageFromUnit;
        //$scope.txtAgeTo = rda.ageTo;
        //$scope.ddlAgeToUnit = rda.ageToUnit;
        //$scope.txtRdaFrom = rda.rdaFrom;
        //$scope.ddlRDAUnitFrom = rda.rdaUnitIDFrom;
        //$scope.txtRdaTo = rda.rdaTo;
        //$scope.ddlRDAUnitTo = rda.rdaUnitIDTo;
        //$scope.txtToxicityLevel = rda.levelToxicity;
        //$scope.ddlToxicityUnit = rda.levelToxicityUnitID;
        //$scope.txtDeficiencyLevel = rda.levelDeficiency;
        //$scope.ddlDefUnit = rda.levelDeficiencyUnitID;
        //$scope.ddlCountry = rda.countryID;
        //$scope.txtReference = rda.reference;
        //$scope.txtUrl = rda.url;

        var params = {
            rdaId: id
        };
        dataFactory.LoadRDA(params).then(function (response) {
            var result = response.data;
            var list = result.rdaList;
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.rbMale = list[0].gender == '1' ? '1' : false,
            $scope.rbFemale = list[0].gender == '2' ? '2' : false,
            $scope.rbAny = list[0].gender == '1' ? false : list[0].gender == '2' ? false : '3',
            $scope.ddlActivity = list[0].activityCategoryID;
            $scope.txtAgeFrom = list[0].ageFrom;
            $scope.ddlAgeFromUnit = list[0].ageFromUnit;
            $scope.txtAgeTo = list[0].ageTo;
            $scope.ddlAgeToUnit = list[0].ageToUnit;
            $scope.txtRdaFrom = list[0].rdaFrom;
            $scope.ddlRDAUnitFrom = list[0].rdaUnitIDFrom;
            $scope.txtRdaTo = list[0].rdaTo;
            $scope.ddlRDAUnitTo = list[0].rdaUnitIDTo;
            $scope.txtToxicityLevel = list[0].levelToxicity;
            $scope.ddlToxicityUnit = list[0].levelToxicityUnitID;
            $scope.txtDeficiencyLevel = list[0].levelDeficiency;
            $scope.ddlDefUnit = list[0].levelDeficiencyUnitID;
            $scope.ddlCountry = list[0].countryID;
            $scope.txtReference = list[0].reference;
            $scope.txtUrl = list[0].url;
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.updateRDA = function () {
        var params = {
            rdaId: rdaId,
            nutrientID: $scope.ddlNutrient,
            gender: $scope.rbMale == '1' ? $scope.rbMale : $scope.rbFemale == '2' ? $scope.rbFemale : 0,
            rdaFrom: $scope.txtRdaFrom,
            rdaUnitIDFrom: $scope.ddlRDAUnitFrom,
            rdaTo: $scope.txtRdaTo,
            rdaUnitIDTo: $scope.ddlRDAUnitTo,
            levelDeficiency: $scope.txtDeficiencyLevel,
            levelDeficiencyUnitID: $scope.ddlDefUnit,
            levelToxicity: $scope.txtToxicityLevel,
            levelToxicityUnitID: $scope.ddlToxicityUnit,
            ageGroupId: $scope.ddlAgeGroup,
            ageFrom: $scope.txtAgeFrom,
            ageFromUnit: $scope.ddlAgeFromUnit,
            ageTo: $scope.txtAgeTo,
            ageToUnit: $scope.ddlAgeToUnit,
            activityCategoryID: $scope.ddlActivity,
            countryID: $scope.ddlCountry,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.updateRDA(params).then(function (response) {
            $scope.GetRDAList();
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
        dataFactory.deleteRDA(params).then(function (response) {
            $scope.GetRDAList();
            toaster.pop('success', "Success", 'Deleted Successfully.');
            $rootScope.activityLog(response, 'DELETE NUTRIENT RDA ', 'NUTRIENT RDA', '');
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.changeMaleRadio = function () {
        $scope.rbAny = 0;
        if ($scope.rbMale == '1') {
            $scope.rbFemale = 0;
        } else {
            $scope.rbMale = 0;
        }
    };
    $scope.changeFemaleRadio = function () {
        $scope.rbAny = 0;
        if ($scope.rbFemale == '2') {
            $scope.rbMale = 0;
        } else {
            $scope.rbFemale = 0;
        }
    };
    $scope.changeAnyRadio = function () {
        $scope.rbFemale = 0;
        $scope.rbMale = 0;
    };

    $scope.initControls();
    //$scope.RDA();

});












