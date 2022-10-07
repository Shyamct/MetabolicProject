app.controller('differentialDiagnosisReportNewCtrl', function ($scope, dataFactory, toaster) {

    $scope.differentialDiagnosisReportNew = function () {
        var param = {
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.DifferentialDiagnosisReportNew(param).then(function (response) {
            var result = response.data;
            $scope.differentialDiagnosisReportNewList = result.differentialDiagnosisReportNew;
            for (var i = 0; i < result.differentialDiagnosisReportNew.length; i++) {
                $scope.differentialDiagnosisReportNewList[i].diagnosisSign = JSON.parse(result.differentialDiagnosisReportNew[i].diagnosisSign);
                $scope.differentialDiagnosisReportNewList[i].diagnosisSymptom = JSON.parse(result.differentialDiagnosisReportNew[i].diagnosisSymptom);
                $scope.differentialDiagnosisReportNewList[i].diagnosisInvestigation = JSON.parse(result.differentialDiagnosisReportNew[i].diagnosisInvestigation);
                $scope.differentialDiagnosisReportNewList[i].diffDiagnosisSign = JSON.parse(result.differentialDiagnosisReportNew[i].diffDiagnosisSign);
                $scope.differentialDiagnosisReportNewList[i].diffDiagnosisSymptom = JSON.parse(result.differentialDiagnosisReportNew[i].diffDiagnosisSymptom);
                $scope.differentialDiagnosisReportNewList[i].diffDiagnosisInvestigation = JSON.parse(result.differentialDiagnosisReportNew[i].diffDiagnosisInvestigation);
            }
            $scope.differentialDiagnosisReportNewList = result.differentialDiagnosisReportNew;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.exportData = function () {
        $("#tableDifferentialDiagnosisReprt").table2excel({
            // exclude: ".excludeThisClass",
            exclude: ".noExl",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            name: "Worksheet Name",
            filename: "DifferentialDiagnosisReprt" //do not include extension
        });
    };
    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open();
        popupWin.document.write('<html><head> <script src="assets/js/angular.min.js"></script></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    };
    $scope.delete1 = function (paramid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: paramid,
            };
            dataFactory.DeleteDifferentialDiagnosisReportNew(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
               
                $scope.differentialDiagnosisReportNew();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.deleteDiagnosisSign = function (paramid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: paramid,
            };
            dataFactory.deleteDiagnosisSign(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');

                $scope.differentialDiagnosisReportNew();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.deleteDiagnosisSymptom = function (paramid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: paramid,
            };
            dataFactory.deleteDiagnosisSymptom(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');

                $scope.differentialDiagnosisReportNew();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.deleteDiagnosisInvestigation = function (paramid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: paramid,
            };
            dataFactory.deleteDiagnosisInvestigation(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');

                $scope.differentialDiagnosisReportNew();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
   
    $scope.differentialDiagnosisReportNew();
});