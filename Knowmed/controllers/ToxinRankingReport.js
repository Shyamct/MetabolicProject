app.controller('toxinRankingReportCtrl', function ($scope, dataFactory, toaster) {

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
            filename: "Report" //do not include extension
        });
    };

    
    $scope.initControls = function () {
        dataFactory.toxinRankingReportInitControl().then(function (response) {
            var result = response.data;
            $scope.toxinProteinList = result.toxinProteinList
            $scope.problemList = result.problemList

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

   
    $scope.GetToxinRankingReportList = function () {
        var params = {
            id: $scope.ddlProtein
        };
        dataFactory.ToxinRankingReportList(params).then(function (response) {
            var result = response.data;
            $scope.toxinsInhibitorList = result.toxinsInhibitorList;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.GetDiseaseSearchReportList = function () {
        var params = {
            id: $scope.ddlProblem
        };
        dataFactory.DiseaseSearchReportList(params).then(function (response) {
            var result = response.data;
            $scope.problemDiseaseList = result.problemDiseaseList;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
   
    $scope.initControls();
});