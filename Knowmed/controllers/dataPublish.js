app.controller('dataPublishCtrl', function ($scope, dataFactory, toaster) {
    $scope.maxSize = 10;     // Limit number for pagination display number.  
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero  
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->  
    $scope.pageSizeSelected = 50; // Maximum number of items per page.  
    var arrISPublishID = [];
    var arrISPublishIDD = [];
    var arrISPublishIDF = [];
    var arrISPublishIDN = [];
    $scope.chkParameter = '';
    $scope.chkValueID = '';
    var inputChangedPromise;
    $scope.exportData = function () {
        $("#tableDataPublishReport").table2excel({
           
            name: "Worksheet Name",
            filename: "DataPublish" //do not include extension
        });
    };
    $scope.checkMedicineCount = function (parameter, medicineID) {
        var params = {
            parameter: parameter,
            valueID: medicineID
        };
        
            dataFactory.getCountListDataPublish(params).then(function (response) {


                $scope.countSum = response.data.countSum[0].countSum;
                $scope[parameter] = medicineID;
                
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        //}
    };
  
    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    $scope.initControls = function () {
        var params = {
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSizeSelected
        };
        dataFactory.dataPublishList(params).then(function (response) {
            var result = response.data;
          
            $scope.medicineMasterList = result.medicineMaster;
            $scope.diseaseMasterList = result.diseaseMaster;
            $scope.foodMasterList = result.foodMaster;
            $scope.nutrientMasterList = result.nutrientMaster;
            $scope.totalCount = response.data.rowCount[0].totalCount; 
           
        }, function (error) {
            toaster.pop('error', "Error", error);
            });       
    };

    $scope.searchMedicine= function () {
       
        var params = {
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSizeSelected,
            medicineName: $scope.medName
        };
        dataFactory.dataPublishList(params).then(function (response) {
            var result = response.data;

            $scope.medicineMasterList = result.medicineMaster;
            $scope.diseaseMasterList = result.diseaseMaster;
            $scope.foodMasterList = result.foodMaster;
            $scope.nutrientMasterList = result.nutrientMaster;
            $scope.totalCount = response.data.rowCount[0].totalCount; 


        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.searchDisease = function () {

        var params = {
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSizeSelected,
            diseaseName: $scope.disName
        };
        dataFactory.dataPublishList(params).then(function (response) {
            var result = response.data;

            $scope.medicineMasterList = result.medicineMaster;
            $scope.diseaseMasterList = result.diseaseMaster;
            $scope.foodMasterList = result.foodMaster;
            $scope.nutrientMasterList = result.nutrientMaster;
            $scope.totalCount = response.data.rowCount[0].totalCount; 


        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.searchFood = function () {

        var params = {
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSizeSelected,
            foodName: $scope.foodName
        };
        dataFactory.dataPublishList(params).then(function (response) {
            var result = response.data;

            $scope.medicineMasterList = result.medicineMaster;
            $scope.diseaseMasterList = result.diseaseMaster;
            $scope.foodMasterList = result.foodMaster;
            $scope.nutrientMasterList = result.nutrientMaster;
            $scope.totalCount = response.data.rowCount[0].totalCount; 


        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.searchNutrient = function () {

        var params = {
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSizeSelected,
            nutrientName: $scope.nutName
        };
        dataFactory.dataPublishList(params).then(function (response) {
            var result = response.data;

            $scope.medicineMasterList = result.medicineMaster;
            $scope.diseaseMasterList = result.diseaseMaster;
            $scope.foodMasterList = result.foodMaster;
            $scope.nutrientMasterList = result.nutrientMaster;
            $scope.totalCount = response.data.rowCount[0].totalCount;


        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.changePageSize = function () {
        $scope.pageIndex = 1;
        $scope.initControls();
    }; 
    $scope.pageChanged = function () {
        $scope.initControls();
    };


    $scope.saveIsPublished = function () {
        arrISPublishID = [];
        arrISPublishIDD = [];
        arrISPublishIDF = [];
        arrISPublishIDN = [];
        for (var i = 0; i < $scope.medicineMasterList.length; i++) {
            var chk = 0;
            if ($scope.medicineMasterList[i].isPublished == true) {
                chk = 1;


                arrISPublishID.push({
                    medicineID: $scope.medicineMasterList[i].medicineID,
                    isPublished: chk,

                });

            }
            else {
                chk = 0;
                arrISPublishID.push({
                    medicineID: $scope.medicineMasterList[i].medicineID,
                    isPublished: chk,

                });
            }
        }
        $scope.medicineIsPublisedList = arrISPublishID;
        for (var i = 0; i < $scope.diseaseMasterList.length; i++) {
            var chk = 0;
            if ($scope.diseaseMasterList[i].isPublished == true) {
                chk = 1;


                arrISPublishIDD.push({
                    diseaseID: $scope.diseaseMasterList[i].diseaseID,
                    isPublished: chk,

                });

            }
            else {
                chk = 0;
                arrISPublishIDD.push({
                    diseaseID: $scope.diseaseMasterList[i].diseaseID,
                    isPublished: chk,

                });
            }
        }
        $scope.diseaseIsPublisedList = arrISPublishIDD;
        for (var i = 0; i < $scope.foodMasterList.length; i++) {
            var chk = 0;
            if ($scope.foodMasterList[i].isPublished == true) {
                chk = 1;


                arrISPublishIDF.push({
                    foodID: $scope.foodMasterList[i].foodID,
                    isPublished: chk,

                });

            }
            else {
                chk = 0;
                arrISPublishIDF.push({
                   foodID: $scope.foodMasterList[i].foodID,
                    isPublished: chk,

                });
            }
        }
        $scope.foodIsPublisedList = arrISPublishIDF;
        for (var i = 0; i < $scope.nutrientMasterList.length; i++) {
            var chk = 0;
            if ($scope.nutrientMasterList[i].isPublished == true) {
                chk = 1;


                arrISPublishIDN.push({
                    nutrientID: $scope.nutrientMasterList[i].nutrientID,
                    isPublished: chk,

                });

            }
            else {
                chk = 0;
                arrISPublishIDN.push({
                    nutrientID: $scope.nutrientMasterList[i].nutrientID,
                    isPublished: chk,

                });
            }
        }
        $scope.nutrientIsPublisedList = arrISPublishIDN;
        var params = {
            dt_Medicine: $scope.medicineIsPublisedList,
            dt_Disease: $scope.diseaseIsPublisedList,
            dt_Food: $scope.foodIsPublisedList,
            dt_Nutrient: $scope.nutrientIsPublisedList
        };
        dataFactory.SaveIsPublish(params).then(function (response) {
            $scope.initControls();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    }
   
   
    $scope.initControls();
  
});