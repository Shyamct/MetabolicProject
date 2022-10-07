app.controller('differentialDiagnosisReportCtrl', function ($scope, dataFactory, toaster) {

    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    $scope.exportData = function () {
        $("#tableMedicineReport").table2excel({
            // exclude: ".excludeThisClass",
            name: "Worksheet Name",
            filename: "DifferentialDiagnosisReport" //do not include extension
        });
    };

    $scope.GetDepartmentList = function () {
        dataFactory.DepartmentList().then(function (response) {
            var result = response.data;
            $scope.DepartmentList = result.department;
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.GetDifferentialDiagnosisDepartmentWiseList = function () {

        if ($scope.ddlDepartment <= 0 || $scope.ddlDepartment == undefined) {
            $scope.ddlDepartment = -1;
            $scope.ddlDepartment = null;
        }

        var params = {
            departmentID: $scope.ddlDepartment
        };
        dataFactory.DifferentialDiagnosisDepartmentWiseList(params).then(function (response) {
            var result = response.data;
            $scope.DifferentialDiagnosisDepartmentWiseList = result.differentialDiagnosis;
          //  $scope.CountDisease = result.countDifferentialDiagnosis;
            //console.log(result.countDifferentialDiagnosis);
            var list = result.countDifferentialDiagnosis;
            $scope.lblCount = list[0].countDisease;
            if ($scope.ddlDepartment <= 0 || $scope.ddlDepartment == undefined) {
                $scope.ddlDepartment = -1;
            }
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };


    $scope.GetDepartmentList();
    $scope.GetDifferentialDiagnosisDepartmentWiseList();
});