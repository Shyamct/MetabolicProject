app.controller('drugCrawlerCtrl', function ($scope, dataFactory, toaster) {
    
    $scope.KeywordList = [{ 'keyword': "Interaction" },
    { 'keyword': "side effect" },
        { 'keyword': "mechanism" }]; 


    $scope.initControls = function () {
        var params = {
            medicineID:0,
            medicineName: '',
            bookID : '',
            pageNo : '',
            edition : '',
            reference : ''
        };
        dataFactory.medicineMasterList(params).then(function (response) {
            var result = response.data;
            $scope.MedicineMasterList = result.medicineList;
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
       
      
        if ($scope.ddlMedicine == -1) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        if ($scope.ddlKeyword == '') {
            toaster.pop('error', "Error", 'Please Enter Keyword');
            return false;
        }
     
        var file = $scope.myFile;
        
        var params = {
            medicineName: $scope.ddlMedicine.trim(),
            pdfId: $scope.ddlFile,
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
      
        $scope.ddlMedicine = -1; 
        $scope.ddlKeyword = '';      
    };
    $scope.initControls();
});