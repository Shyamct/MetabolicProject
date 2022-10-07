app.controller('nutrientReportCtrl', function ($scope, dataFactory, toaster) {

    $scope.exportData = function () {
        $("#tableNutrientReport").table2excel({
           
            name: "Worksheet Name",
            filename: "NutrientReport" //do not include extension
        });
    };
    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    };


    

    $scope.nutrientReport = function () {
        if ($scope.txtNutrient == '') {
            toaster.pop('error', "Error", 'Please Enter Nutrient Name');
            return false;
        }
        var params = {
            nutrientName: $scope.txtNutrient
        };
        dataFactory.NutrientReportList(params).then(function (response) {
            var result = response.data;
            $scope.NutrientReportList = result.nutrientReport;  
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    
});