app.controller('hcLanguageTranslationCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var mealFoodAssignId = 0;
    $scope.excelData = null;
    $scope.isDisabled = false;
    $scope.showExportTable = false;

    $scope.initControls = function () {
        dataFactory.hclanguageTranslationInitControl().then(function (response) {
            var result = response.data;
            $scope.languageTranslation = result.languageTranslation;
            $scope.languageMaster = result.languageMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getOriginalWord = function () {
        var params = {
            types: $scope.ddlTranslation,
            languageID: $scope.ddlLanguage
        };
        dataFactory.gethcOriginalWordList(params).then(function (response) {
            var result = response.data;
            $scope.foodmaster = result.originalWordList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getLanguageTranslationList = function () {

        if ($scope.ddlTranslation != -1 && $scope.ddlLanguage != -1) {
            $scope.showExportTable = true;
        }
        var params = {
            types: $scope.ddlTranslation,
            languageID: $scope.ddlLanguage
        };
        dataFactory.gethcLanguageTranslationList(params).then(function (response) {
            var result = response.data;
            $scope.languageTranslationList = result.languageTranslationList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SelectFile = function (file) {
        $scope.SelectedFile = file;
    };
    $scope.Upload = function () {        
        var regex = /^([a-zA-Z0-9\s\\s_\\.\-:()])+(.xls|.xlsx)$/;
        if (regex.test($scope.SelectedFile.name.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        $scope.ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString($scope.SelectedFile);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }                        
                        $scope.ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer($scope.SelectedFile);
                }
            } else {
                toaster.pop('error', "Error", 'This browser does not support HTML5 !');
            }
        } else {
            //toaster.pop('error', "Error", 'Please upload a valid Excel file !');
        }
    };

    $scope.ProcessExcel = function (data) {
                
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];

        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

        //Display the data from Excel file in Table.
        $scope.$apply(function () {
            $scope.excelData = excelRows;            
        });
        
    };

    $scope.exportData = function () {

        var arrayObject = [];
        for (var i = 0, len = $scope.foodmaster.length; i < len; i++) {
            arrayObject.push({
                Original_Word: $scope.foodmaster[i].name,
                Translation: ''
            });
        }       
        
        // export json to Worksheet of Excel
        // only array possible
        var excelDataList = XLSX.utils.json_to_sheet(arrayObject);

        // A workbook is the name given to an Excel file
        var wb = XLSX.utils.book_new(); // make Workbook of Excel

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, excelDataList, 'sheet1'); // sheetAName is name of Worksheet

        // export Excel file
        XLSX.writeFile(wb, 'languageTranslation.xlsx'); // name of the file is 'book.xlsx'       
    };
    
    $scope.saveLanguageTranslation = function () {

        if ($scope.ddlTranslation == -1) {
            toaster.pop('error', "Error", 'Please Select Translation Type !');
            return false;
        }
        if ($scope.ddlLanguage == -1) {
            toaster.pop('error', "Error", 'Please Select Language !');
            return false;
        }
        if ($scope.ddlOriginal == -1 && mealFoodAssignId > 0) {
            toaster.pop('error', "Error", 'Please Select Original Word !');
            return false;
        }
        if (isEmpty($scope.txtTranslation) && mealFoodAssignId > 0) {
            toaster.pop('error', "Error", 'Please Enter Translation !');
            return false;
        }        
        var isExcelImport = 0;
        if ($scope.SelectedFile && mealFoodAssignId == 0) {
            log($scope.SelectedFile);
            $scope.Upload();
            isExcelImport = 1;
        }
        setTimeout(function () {
            var params = {
                id: mealFoodAssignId,
                translationType: $scope.ddlTranslation,
                languageID: $scope.ddlLanguage,
                translationTypeID: $scope.ddlOriginal,
                translation: $scope.txtTranslation,
                excelData: JSON.stringify($scope.excelData),
                isExcelImport: isExcelImport,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.savehcLanguageTranslation(params).then(function (response) {

                var message = mealFoodAssignId > 0 ? 'UPDATE hc_LANGUAGE TRANSLATION ' : 'SAVE hc_LANGUAGE TRANSLATION ';
                $rootScope.activityLog(response, message, 'hc_LANGUAGE TRANSLATION ', '');

                toaster.pop('success', "Success", 'Saved Successfully.');
                $scope.clr();
                $scope.getLanguageTranslationList();
            }, function (error) {
                toaster.pop('error', "Error", error.data);
            });

        }, 1000);

    };

    $scope.edit = function (paramid) {
        mealFoodAssignId = paramid;

        var params = {
            id: paramid,
            types: $scope.ddlTranslation,
            languageID: $scope.ddlLanguage
        };
        dataFactory.gethcLanguageTranslationList(params).then(function (response) {
            var result = response.data;
            var list = result.languageTranslationList;
            $scope.ddlTranslation = list[0].translationType;
            $scope.getOriginalWord();
            $scope.ddlLanguage = list[0].languageID;
            $scope.ddlOriginal = list[0].translationID;
            $scope.txtTranslation = list[0].translation;
            $scope.isDisabled = true;
            $scope.showExportTable = false;
            $scope.SelectedFile = null;
            $('#fileUpload').val('');

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.deleteLanguageTranslation = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id
            };
            dataFactory.deletehcLanguageTranslation(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getLanguageTranslationList();
                $rootScope.activityLog(response, 'DELETE hc_LANGUAGE TRANSLATION', 'hc_LANGUAGE TRANSLATION', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clr = function () {
        $scope.isDisabled = false;
        $scope.showExportTable = false;
        $scope.SelectedFile = null;
        $('#fileUpload').val(null);
        $scope.ddlOriginal = -1;
        $scope.txtTranslation = '';
        mealFoodAssign = 0;
    };
    $scope.initControls();

});