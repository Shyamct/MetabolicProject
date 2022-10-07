app.controller('problemNutrientImportanceCtrl', function ($scope, dataFactory, toaster) {

    $scope.assignNutrientList = [];
    $scope.roleTypeList = [{ "role": "B", "roleName": "Beneficial" }, { "role": "H", "roleName": "Harmful" }];

    //var arr = [];

    $scope.initControls = function () {
        dataFactory.InitControlsProblemNutrientImportance().then(function (response) {
            var result = response.data;
            $scope.problemList = result.problemList;
            $scope.nutrientList = result.nutrientList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.problemNutrientImportance = function () {
        var params = {
            id: 0
        };
        dataFactory.problemNutrientImportance(params).then(function (response) {
            var result = response.data;
            $scope.nutrientSequenceList = result.problemNutrientImportanceList;

            for (var i = 0; i < result.problemNutrientImportanceList.length; i++) {
                $scope.nutrientSequenceList[i].sequenceList = JSON.parse(result.problemNutrientImportanceList[i].sequenceList);
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.addMoreNutrient = function (list, index) {


        if (list == "") {
            $scope.assignNutrientList.push({
            });
        } else {
            if ($scope.ddlDisease === 0) {
                toaster.pop('error', "Error", 'Please Select Disease');
                return false;
            }
            if (list.nutrientId > 0) {
                $scope.assignNutrientList.push({
                });
            } else {
                toaster.pop('error', "Error", 'Please Select Any Nutrient');
            }
        }
    };

    $scope.addMoreNutrient("");

    $scope.saveDiseaseNutrientSequence = function () {
        if ($scope.ddlDisease == -1) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }
        var nutrientSequence = [];
        for (var i = 0; i < $scope.assignNutrientList.length; i++) {
            nutrientSequence.push({
                sequence: $scope.assignNutrientList[i].sequenceNo,
                nutrientID: $scope.assignNutrientList[i].nutrientId,
                roleType: $scope.assignNutrientList[i].roleType
            });
        }
        var params = {
            diseaseID: $scope.ddlDisease,
            nutrientSequence: JSON.stringify(nutrientSequence),
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveDiseaseNutrientSequence(params).then(function (response) {
            $scope.clear();
            $scope.problemNutrientImportance();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    //$scope.edit = function (id) {
    //    var params = {
    //        diseaseID: id,
    //        userID: Number(UtilsCache.getSession('USERDETAILS').userid)
    //    };
    //    dataFactory.problemNutrientImportance(params).then(function (response) {
    //        var result = response.data;
    //        var list = result.problemNutrientImportanceList;

    //        for (var i = 0; i < result.problemNutrientImportanceList.length; i++) {
    //            list[i].sequenceList = JSON.parse(result.problemNutrientImportanceList[i].sequenceList);   
    //        }

    //        $scope.ddlDisease = result.problemNutrientImportanceList[0].diseaseID;
    //        $scope.assignNutrientList = list[0].sequenceList;

    //        log($scope.assignNutrientList); 

    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
    //};

    $scope.deleteSequence = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteDiseaseNutrientSequence(params).then(function (response) {
                $scope.clear();
                $scope.problemNutrientImportance();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                diseaseID: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteDiseaseNutrientImportance(params).then(function (response) {
                $scope.clear();
                $scope.problemNutrientImportance();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clear = function () {
        $scope.ddlDisease = 0;
        $scope.assignNutrientList = [];
        $scope.addMoreNutrient("");
    };

    $scope.initControls();
    $scope.problemNutrientImportance();
});