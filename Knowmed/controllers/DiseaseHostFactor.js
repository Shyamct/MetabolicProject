app.controller('diseaseHostFactorCtrl', function ($scope, dataFactory, toaster) {
    var DiseaseHostFactorId = 0; 

    $scope.drugList = function () {
        dataFactory.InitControlsMedSideEffect().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.ptMasterList = function () {
        dataFactory.PopulationTypeMasterList().then(function (response) {
            var result = response.data;
            $scope.PopulationTypeMasterList = result.populationTypeMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.oList = function () {
        dataFactory.OccupationList().then(function (response) {
            var result = response.data;
            $scope.OccupationList = result.occupation;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.aMasterList = function () {
        dataFactory.AnimalMasterList().then(function (response) {
            var result = response.data;
            $scope.AnimalMasterList = result.animalMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.addMasterList = function () {
        dataFactory.AddictionMasterList().then(function (response) {
            var result = response.data;
            $scope.AddictionMasterList = result.addictionMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.uMasterList = function () {
        dataFactory.UnitMasterList().then(function (response) {
            var result = response.data;
            $scope.UnitMasterList = result.unitMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

 
    $scope.pMasterList = function () {
        dataFactory.ProblemMasterList().then(function (response) {
            var result = response.data;
            $scope.ProblemMasterList = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.dHostFactorList = function () {
        dataFactory.DiseaseHostFactorList().then(function (response) {
            var result = response.data;
            $scope.DiseaseHostFactorList = result.diseaseHostFactor;
            console.log(result);
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveDiseaseHostFactor = function () {
        if ($scope.ddlProblem == -1) {
            alert('Select Problem');
            return false;
        };
        if ($scope.txtAgeFrom == undefined) {
            alert('Enter Age From !!');
            return false;
        };
        if ($scope.txtAgeTo == undefined) {
            alert('Enter Age To !!');
            return false;
        };
        if ($scope.ddlUnit == -1) {
            alert('Select Unit');
            return false;
        };
        if ($scope.ddlPopulationType == -1) {
            alert('Select Population Type !!');
            return false;
        };
        if ($scope.ddlOccupation == -1) {
            alert('Select Occupation !!');
            return false;
        };
        if ($scope.ddlAddiction == -1) {
            alert('Select Addiction !!');
            return false;
        };
        var params = {
            id: DiseaseHostFactorId,
            problemId: $scope.ddlProblem,
            gender: $scope.ddlGender,
            ageFrom: $scope.txtAgeFrom,
            ageTo: $scope.txtAgeTo,
            ageUnitIID: $scope.ddlUnit,
            populationTypeID: $scope.ddlPopulationType,
            ocuupationMasterID: $scope.ddlOccupation,
            addictionMasterID: $scope.ddlAddiction,
            animalMasterID: $scope.ddlAnimal,
            diseaseHistoryID: $scope.ddlHistory,
            drugID: $scope.ddlDrug,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseHostFactor(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.dHostFactorList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteDiseaseHostFactor = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseHostFactor(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.dHostFactorList();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        DiseaseHostFactorId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.DiseaseHostFactorList(params).then(function (response) {
            var result = response.data;
            var list = result.diseaseHostFactor;
            $scope.ddlProblem = list[0].problemId;
            $scope.ddlGender = list[0].genderValue;
            $scope.txtAgeFrom = list[0].ageFrom;
            $scope.txtAgeTo = list[0].ageTo;
            $scope.ddlUnit = list[0].ageUnitIID;
            $scope.ddlPopulationType = list[0].populationTypeID;
            $scope.ddlOccupation = list[0].ocuupationMasterID;
            $scope.ddlAddiction = list[0].addictionMasterID;
            $scope.ddlAnimal = list[0].animalMasterID;
            $scope.ddlHistory = list[0].diseaseHistoryID;
            $scope.ddlDrug = list[0].drugID;
            $scope.txtRemark = list[0].remark;          
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        DiseaseHostFactorId = 0;
        $scope.ddlProblem = -1;
        $scope.ddlGender = -1;
        $scope.txtAgeFrom = "";
        $scope.txtAgeTo = "";
        $scope.ddlUnit = -1;
        $scope.ddlPopulationType = -1;
        $scope.ddlOccupation = -1;
        $scope.ddlAddiction = -1;
        $scope.ddlAnimal = -1;
        $scope.ddlHistory = -1;
        $scope.ddlDrug = -1;
        $scope.txtRemark = "";
    };
    $scope.ptMasterList();
    $scope.oList();
    $scope.aMasterList();
    $scope.uMasterList();
    $scope.pMasterList();
    $scope.dHostFactorList();
    $scope.drugList();
    $scope.addMasterList();
});