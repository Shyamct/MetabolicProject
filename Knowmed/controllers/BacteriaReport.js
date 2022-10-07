app.controller('bacteriaReportCtrl', function ($scope, dataFactory, toaster) {

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
            filename: "BacteriaReport" //do not include extension
        });
    };


    $scope.initControls = function () {
        dataFactory.bacteriaReportInitControl().then(function (response) {
            var result = response.data;
            $scope.bacteriaList = result.bacteriaList

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.GetBacteriaReportList = function () {
        var params = {
            id: $scope.ddlBacteria
        };
        dataFactory.bacteriaReportList(params).then(function (response) {
            var result = response.data;
            $scope.bacteriaReportList = result.bacteriaReportList;
            angular.forEach($scope.bacteriaReportList, function (item) {
                item.antibiotics = JSON.parse(item.antibiotics == "" ? "[]" : item.antibiotics);
                item.toxin = JSON.parse(item.toxin == "" ? "[]" : item.toxin);
                item.toxinDockingResult = JSON.parse(item.toxinDockingResult == "" ? "[]" : item.toxinDockingResult);
                item.virulence = JSON.parse(item.virulence == "" ? "[]" : item.virulence);
                item.signAndSymtom = JSON.parse(item.signAndSymtom == "" ? "[]" : item.signAndSymtom);
                item.site = JSON.parse(item.site == "" ? "[]" : item.site);
            });
            console.log("bacteriaReportList",$scope.bacteriaReportList);
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.initControls();
    $scope.GetBacteriaReportList();
});
