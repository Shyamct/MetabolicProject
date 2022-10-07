app.controller('medicineStatusCtrl', function ($scope, dataFactory, toaster) {
    $scope.maxSize = 25;     // Limit number for pagination display number.  
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero  
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->  
    $scope.pageSizeSelected = 25; // Maximum number of items per page.  
    
    $scope.exportData = function () {
        $("#tableMedicineReport").table2excel({
            // exclude: ".excludeThisClass",
            exclude: ".noExl",

            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            name: "Worksheet Name",
            filename: "DiseaseReport" //do not include extension
        });
    };
    $scope.showModel = function (row) {
        $scope.showEffect = true;
        $scope.viewEffect = row;
    };
  



    //$scope.exportData = function () {
    //    var uri = 'data:application/vnd.ms-excel;base64,'
    //    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    //    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    //    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

    //    var table = document.getElementById("tableMedicineReport");
    //    var filters = $('.ng-table-filters').remove();
    //    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
    //    $('.ng-table-sort-header').after(filters);
    //    var url = uri + base64(format(template, ctx));
    //    var a = document.createElement('a');
    //    a.href = url;
    //    a.download = 'Exported_Table.xls';
    //    a.click();
    //};

    //$scope.printDiv = function (divName) {
    //    var printContents = document.getElementById(divName).innerHTML;
    //    var originalContents = document.body.innerHTML;
    //    document.body.innerHTML = printContents;
    //    window.print();
    //    document.body.innerHTML = originalContents;
       
    //};
    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open();
        popupWin.document.write('<html><head> <script src="assets/js/angular.min.js"></script></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    };
    
    $scope.initControls = function () {
        if ($scope.ddlMedicine <= 0 || $scope.ddlMedicine == undefined) {
            $scope.ddlMedicine = -1;
            $scope.ddlMedicine = null;
        }
    
    var params = {
        medicineId: $scope.ddlMedicine
    };
        dataFactory.MedicineMasterList(params).then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
       
    };

    $scope.MedicineStatus = function () {
        if ($scope.ddlMedicine <= 0 || $scope.ddlMedicine == undefined) {
            $scope.ddlMedicine = -1;
            $scope.ddlMedicine = null;
        }
        var params = {
            medicineId: $scope.ddlMedicine,
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSizeSelected
        };
        dataFactory.MedicineStatusList(params).then(function (response) {
            var result = response.data;
            $scope.MedicineStatusList = result.medicineStatus;
            $scope.totalCount = response.data.rowCount[0].totalCount; 
           
            if ($scope.ddlMedicine <= 0 || $scope.ddlMedicine == undefined) {
                $scope.ddlMedicine = -1;    
            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.pageChanged = function () {
        $scope.MedicineStatus();
    };
    //This method is calling from dropDown  
    $scope.changePageSize = function () {
        $scope.pageIndex = 1;
        $scope.MedicineStatus();
    }; 
    $scope.initControls();
    $scope.MedicineStatus();
});