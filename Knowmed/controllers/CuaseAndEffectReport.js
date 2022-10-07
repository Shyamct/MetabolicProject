app.controller('cuaseAndEffectReportCtrl', function ($scope, dataFactory, toaster) {
    var nutrientList = [];
    $scope.Fields = [{
        fieldId: 1,
        Name: 'NORMAL FUNCATION',
        Selected: true
    },
    {
        fieldId: 2,
        Name: 'EFFECT AT CELLULAR LEVEL',
        Selected: true
    },
    {
        fieldId: 3,
        Name: 'EFFECT ON THE SYSTEM OR ORGAN',
        Selected: true
    },
    {
        fieldId: 4,
        Name: 'DEFICIENCY WILL CAUSE AT IONIC LEVEL',
        Selected: true
    },
    {
        fieldId: 5,
        Name: 'DEFICIENCY MAY CAUSED AT CELLULAR LEVEL',
        Selected: true
    },
    {
        fieldId: 6,
        Name: 'DEFICIENCY MAY CAUSE',
        Selected: true
    },
    {
        fieldId: 7,
        Name: 'TEST',
        Selected: true
    },
    {
        fieldId: 8,
        Name: 'PROBLEM BY ITS TOXICITY ON IONIC LEVEL ON CELLULAR LEVEL',
        Selected: true
    },
    {
        fieldId: 9,
        Name: 'PROBLEM BY ITS TOXICITY ON CELLULAR LEVEL',
        Selected: true
    },
    {
        fieldId: 10,
        Name: 'TOXICITY MAY CAUSE AT ORGEN LEVEL',
        Selected: true
    },
    {
        fieldId: 11,
        Name: 'TOXICITY MAY CAUSE',
        Selected: true
    },
    {
        fieldId: 12,
        Name: 'WHAT TO DO/ACTION TO BE TAKEN',
        Selected: true
    },
    {
        fieldId: 13,
        Name: 'MEDICINE ADVICED',
        Selected: true
    },
    
    ];
    $scope.exportData = function () {
        $("#tableCuaseAndEffectReport").table2excel({
            // exclude: ".excludeThisClass",
            exclude: ".noExl",

            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            name: "Worksheet Name",
            filename: "MedicineReport" //do not include extension
        });
    };
    $scope.prescriptions = [];
    $scope.ChangeValue = function () {
        var fieldId = '';
        var fieldName = '';
        for (var i = 0; i < $scope.Fields.length; i++) {
            if ($scope.Fields[i].Selected) {
                fieldId = $scope.Fields[i].fieldId;
                fieldName = 'chk_' + fieldId;

                $scope[fieldName] = true;
            }
            else {
                fieldId = $scope.Fields[i].fieldId;
                fieldName = 'chk_' + fieldId;

                $scope[fieldName] = false;5
            }
        }
    };

    $scope.GetSymptomsSearch = function (query) {
        var obj = {
            searchKey: query
        };
        return dataFactory.cNutrienttList(obj).then(function (response) {
            log(response);
            return response.data.table;

        }, function (error) {

        });
    };
    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open();
        popupWin.document.write('<html><head> <script src="assets/js/angular.min.js"></script></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    };
    $scope.onCustomTagAdd = function (tag) {
        if (tag && isEmpty(tag.id)) {
            tag.id = 0;
            tag.nutrientName = tag.nutrientName;
        }
        //tag.pdmID = pdmID;
        //if (pdmID == 1) {
        //    $scope.getNotificationBysymptom([tag]);
        //}
        return tag;
    };
    $scope.tagAdded = function (tag) {
        nutrientList.push({
            nutrientID: tag.id,
        });

        
        console.log('Tag added: ', nutrientList);
        $scope.CuaseAndEffectReport();
    };
    $scope.tagRemoved = function (tag) {

        for (var i = 0; i < nutrientList.length; i++) {
            if (nutrientList[i].nutrientID === tag.id) {
                nutrientList.splice(i, 1);
            }
        }
        $scope.CuaseAndEffectReport();
       
       
        console.log('Tag removed: ', nutrientList);
      // $scope.CuaseAndEffectReport();
    };
    


    $scope.initControls = function () {
        dataFactory.InitControlsMedSideEffect().then(function (response) {
            var result = response.data;
            $scope.cuaseAndEffectReportList = result.cuaseAndEffectReportList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
        for (var i = 0; i < $scope.Fields.length; i++) {
            if ($scope.Fields[i].Selected) {
                fieldId = $scope.Fields[i].fieldId;
                fieldName = 'chk_' + fieldId;

                $scope[fieldName] = true;
                //  document.getElementsByClassName(fieldName)[0].style.visibility = 'hidden';


            }
            else {
                fieldId = $scope.Fields[i].fieldId;
                fieldName = 'chk_' + fieldId;

                $scope[fieldName] = false;

            }
        }

    };

    $scope.CuaseAndEffectReport = function () {

        log(nutrientList);
       
               var params = {
                   lstNutrientCauseandEffect : nutrientList,
        };
        log(params);
        dataFactory.CuaseAndEffectReportList(params).then(function (response) {
            var result = response.data;
            $scope.cuaseAndEffectReportList = result.cuaseAndEffectReport;
            log('sam');
            log($scope.cuaseAndEffectReportList);
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.initControls();
    //$scope.CuaseAndEffectReport();
});