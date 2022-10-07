app.controller('foodReportCtrl', function ($scope, dataFactory, toaster) {

    $scope.exportData = function () {
        $("#tableFoodReport").table2excel({
           
            name: "Worksheet Name",
            filename: "FoodReport" //do not include extension
        });
    };
   
    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    $scope.initControls = function () {
        dataFactory.rFoodMasterList().then(function (response) {
            var result = response.data;
            $scope.foodList = result.foodMasterList;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
            });       
    };

    $scope.FoodReport = function () {
        if ($scope.ddlFood <= 0 || $scope.ddlFood == undefined) {
            $scope.ddlFood = -1;
            $scope.ddlFood = null;
        }
        var params = {
            foodId: $scope.ddlFood
        };
        dataFactory.FoodReportList(params).then(function (response) {
            var result = response.data;
            $scope.FoodReportList = result.foodReport;  
            log(result.foodReport);
            if ($scope.ddlFood <= 0 || $scope.ddlFood == undefined) {
                $scope.ddlFood = -1;    
            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.initControls();
    $scope.FoodReport();
});