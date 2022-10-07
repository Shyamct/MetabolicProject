app.controller('diseaseFindingsCtrl', function ($scope, dataFactory, toaster, $state) {
    var diseaseFindingsID = 0;
    $scope.subTestListNew = [];

    $scope.initControls = function () {

        dataFactory.initControlsDiseaseFindings().then(function (response) {
            var result = response.data;
            $scope.diseaseList = result.diseaseReferenceList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.addMoreSubtest = function () {
        if ($scope.ddlDisease == -1) {
            toaster.pop('error', "Error", 'Please Select Problem Reference');
            return false;
        }
        $scope.subTestListNew.push({
        });
        $.each($scope.subTestListNew, function (key, value) {
            value["findingList"] = []
        });
    };

    $scope.getSubTestMasterList = function () {
        dataFactory.SubTestMasterList().then(function (response) {
            var result = response.data;
            $scope.SubTestMasterList = result.subTestMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }

    $scope.GetDiseaseSubTestList = function () {

        //if (diseaseFindingsID == 0) {

        var params = {
            problemReferenceID: $scope.ddlDisease
        };

        dataFactory.diseaseSubTestList(params).then(function (response) {
            var result = response.data;
            $scope.subTestList = result.subTestList;
            $.each($scope.subTestList, function (key, value) {
                value["findingList"] = []
            });

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
        //}
    };

    $scope.addFinding = function (listObj) {
        if (isEmptyValue(listObj.finding)) {
            toaster.pop('error', "Error", 'Please Select Finding');
            return false;
        }

        listObj.findingList.push({ "finding": listObj.finding });
    };

    $scope.deleteAddFindingList = function (listObj, index) {
        listObj.findingList.splice(index, 1);
    };

    $scope.GetDiseaseFindings = function () {
        var params = {
            id: diseaseFindingsID
        };
        dataFactory.GetDiseaseFindings(params).then(function (response) {
            var result = response.data;
            $scope.diseaseFindingstList = result.diseaseFindingstList;

            for (var i = 0; i < result.diseaseFindingstList.length; i++) {
                $scope.diseaseFindingstList[i].subTestList = JSON.parse(result.diseaseFindingstList[i].subTestList);
                for (var j = 0; j < result.diseaseFindingstList[i].subTestList; j++) {
                    $scope.diseaseFindingstList[i].subTestList[j].findingList = JSON.parse(result.diseaseFindingstList[i].subTestList[j].findingList);
                }
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveDiseaseFindings = function () {
        if ($scope.ddlDisease == -1) {
            toaster.pop('error', "Error", 'Please Select Problem Reference');
            return false;
        }
        var subTestFindingList = [];
        for (var i = 0; i < $scope.subTestList.length; i++) {
            subTestFindingList.push({
                problemInvestigationID: $scope.subTestList[i].problemInvestigationID,
                subTestID: $scope.subTestList[i].subTestID,
                findingList: JSON.stringify($scope.subTestList[i].findingList)
            });
        }
        for (var i = 0; i < $scope.subTestListNew.length; i++) {
            subTestFindingList.push({
                problemInvestigationID: 0,
                subTestID: $scope.subTestListNew[i].ddlSubTest,
                findingList: JSON.stringify($scope.subTestListNew[i].findingList)
            });
        }

        var params = {
            id: diseaseFindingsID,
            problemReferenceID: $scope.ddlDisease,
            subTestFindingList: JSON.stringify(subTestFindingList),
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveDiseaseFindings(params).then(function (response) {
            $scope.clear();
            $scope.GetDiseaseFindings();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (id) {
        diseaseFindingsID = id;
        var params = {
            problemReferenceID: id
        };
        dataFactory.GetDiseaseFindings(params).then(function (response) {
            var result = response.data;
            var list = result.diseaseFindingstList;

            for (var i = 0; i < result.diseaseFindingstList.length; i++) {
                list[i].subTestList = JSON.parse(result.diseaseFindingstList[i].subTestList);
                for (var j = 0; j < result.diseaseFindingstList[i].subTestList; j++) {
                    list[i].subTestList[j].findingList = JSON.parse(result.diseaseFindingstList[i].subTestList[j].findingList);
                }
            }
            $scope.ddlDisease = result.diseaseFindingstList[0].id;
            $scope.subTestList = result.diseaseFindingstList[0].subTestList;

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
            dataFactory.deleteDiseaseFindings(params).then(function (response) {
                $scope.clear();
                $scope.GetDiseaseFindings();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.deleteFindings = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteFindings(params).then(function (response) {
                $scope.clear();
                $scope.GetDiseaseFindings();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clear = function () {
        diseaseFindingsID = 0;
        $scope.ddlDisease = -1;
        $scope.subTestListNew = [];

        $scope.GetDiseaseSubTestList();
    };


    $scope.initControls();
    $scope.GetDiseaseFindings();
    $scope.getSubTestMasterList();

});