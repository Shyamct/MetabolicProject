app.controller('diseaseCrawlerCtrl', function ($scope, dataFactory, toaster) {
    
    $scope.KeywordList = [{ 'keyword': "Investigation" },
    { 'keyword': "Treatment" },
        { 'keyword': "ClinicalFeature" }]; 


    $scope.initControls = function () {
        dataFactory.DiseaseCrawlerDiseaseList().then(function (response) {
            var result = response.data;
            $scope.diseaseList = result.diseaseList;
        }, function (error) {
            toaster.pop('error', "Error", error);
            });

        dataFactory.PdfFileList().then(function (response) {
            var result = response.data;
            $scope.pdfFileList = result.pdfFileList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    
    $scope.Search = function () {
       
      
        if ($scope.ddlDisease == -1) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }
        if ($scope.ddlKeyword == '') {
            toaster.pop('error', "Error", 'Please Enter Keyword');
            return false;
        }
        if ($scope.ddlFile == -1) {
            toaster.pop('error', "Error", 'Please Select Pdf');
            return false;
        }
        var file = $scope.myFile;
        
        var params = {
            medicineName: $scope.ddlDisease.trim(),
            pdfId: $scope.ddlFile,//file
            keywords: $scope.ddlKeyword
        };

        dataFactory.searchKeywordPdf(params).then(function (response) {
            var result = response.data;
            $scope.SearchList = result.responseValue;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
  


 

    $scope.clr = function () {
      
        $scope.ddlDisease = -1; 
        $scope.ddlKeyword = -1;      
    };
    $scope.initControls();
});