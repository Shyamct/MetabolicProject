app.controller('symptomBasedInvestigationCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var subtestID = 0;
    var arr = [];
    $scope.addedSubTestList = [];
    $scope.buttonValue = 'Save';
    $scope.btndisabled = false;

    $scope.initControls = function () {
        dataFactory.symptomBasedInvestigationInitControl().then(function (response) {
            var result = response.data;
            $scope.problemList = result.problemList;
            $scope.testList = result.testList;
            $scope.symptomInvestigationList = result.symptomInvestigationList;
            $scope.buttonValue = 'Save';
            //for (var i = 0; i < result.nutrientChannelList.length; i++) {
            //    $scope.nutrientChannelList[i].dtChaneelList = JSON.parse(result.nutrientChannelList[i].dtChaneelList);
            //}
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddSubTest = function () {
        if ($scope.ddlProblem == -1) {
            toaster.pop('error', "Error", 'Please Select Problem Name');
            return false;
        }
        //alert($("#ddlProblem option:selected").text().trim());
        arr.push({
            problemID: $scope.ddlProblem,
            problemName: $("#ddlProblem option:selected").text().trim(),
            subTestID: $scope.ddlTest,
            testName: $("#ddlTest option:selected").text().trim(),


        });

        $scope.addedSubTestList = arr;
    };

    $scope.deleteSubTestList = function (index) {
        $scope.addedSubTestList.splice(index, 1);
    };

    $scope.saveSymptomBasedInvestigation = function () {

        if ($scope.ddlProblem == -1) {
            toaster.pop('error', "Error", 'Please Select Problem Name');
            return false;
        }

        var params = {
            id: subtestID,
            problemID: $scope.ddlProblem,
            subTestID: $scope.ddlTest,
            dtSubTestList: JSON.stringify($scope.addedSubTestList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveSymptomBasedInvestigation(params).then(function (response) {
            if (subtestID > 0) {
                $rootScope.activityLog(response, 'UPDATE Symptom Based Investigation', 'Symptom Based Investigation', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteSymptomBasedInvestigation = function (subtestID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: subtestID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteSymptomBasedInvestigation(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Symptom Based Investigation', 'Symptom Based Investigation', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (row) {
        subtestID = row;
       // alert(row);
        var params = {
            id: row
        };
        dataFactory.symptomBasedInvestigationInitControl(params).then(function (response) {
            var result = response.data;
          //  var result = response.data.bacteriaRelationList[0];
           // $scope.problemList = result.problemList;
         //   $scope.testList = result.testList;
            var list = response.data.symptomInvestigationList[0];
            console.log(list);
            $scope.ddlProblem = list.problemID;
            $scope.ddlTest = list.subTestID;
            $scope.btnAdd = true;
            $scope.buttonValue = 'Update';
            $scope.btndisabled = true;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clr = function () {

        $scope.ddlProblem = -1;
        $scope.ddlTest = -1;
        subtestID = 0;
        $scope.addedSubTestList = [];
        arr = [];
        $scope.btndisabled = false;
    };

    $scope.initControls();
});