app.controller('medicineReportCtrl', function ($scope, dataFactory, toaster) {

    $scope.Fields = [{
        fieldId: 1,
        Name: 'MEDICINE /BRAND /GROUP',
        Selected: true
    },
    {
        fieldId: 2,
        Name: 'DOSAGE FORM/STRENGTH',
        Selected: true
    },
    {
        fieldId: 3,
        Name: 'ADULT DOSE',
        Selected: true
    },
    {
        fieldId: 4,
        Name: 'PEDIATRIC DOSE',
        Selected: true
    },
    {
        fieldId: 5,
        Name: 'ROUTE OF ADMINISTRATION',
        Selected: true
    },
    {
        fieldId: 6,
        Name: 'PATHWAY (EFFECT)',
        Selected: true
    },
    {
        fieldId: 7,
        Name: 'MECHANISM_OF_ACTION',
        Selected: true
    },
    {
        fieldId: 8,
        Name: 'PHARMACO KINETICS',
        Selected: true
    },
    {
        fieldId: 9,
        Name: 'INDICATIONS/USES',
        Selected: true
    },
    {
        fieldId: 10,
        Name: 'SIDE EFFECTS',
        Selected: true
    },
    {
        fieldId: 11,
        Name: 'CONTRAINDICATIONS / PRECAUTION',
        Selected: true
    },
    {
        fieldId: 12,
        Name: 'DRUG INTERACTIONS',
        Selected: true
    },
    {
        fieldId: 13,
        Name: 'MECHANISM OF DRUG INTERACTION',
        Selected: true
    },
    {
        fieldId: 14,
        Name: 'DESIRED EFFECT',
        Selected: true
    },
    {
        fieldId: 15,
        Name: 'DISEASE',
        Selected: true
    },
    {
        fieldId: 16,
        Name: 'ROUTE OF ELIMINATION',
        Selected: true
    },
    {
        fieldId: 17,
        Name: 'MEDICINE GROUP HIERARCHY',
        Selected: true
    },
	
    {
        fieldId: 18,
        Name: 'MEDICINE ANTIDOTE',
        Selected: true
    },
    {
        fieldId: 19,
        Name: 'MEDICINE ELECTROLYTES',
        Selected: true
    },
    {
        fieldId: 20,
        Name: 'MEDICINE BACTERIA RELATION',
        Selected: true
    }
    ];
    $scope.exportData = function () {
        $("#tableMedicineReport").table2excel({
            exclude: ".noExl",

            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            name: "Worksheet Name",
            filename: "MedicineReport" //do not include extension
        });
    };

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

                $scope[fieldName] = false;

            }
        }
    };
    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open();
        popupWin.document.write('<html><head> <script src="assets/js/angular.min.js"></script></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    };

    $scope.initControls = function () {
        dataFactory.InitControlsMedSideEffect().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.totalMedicine = $scope.medicineList.length;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
        for (var i = 0; i < $scope.Fields.length; i++) {
            if ($scope.Fields[i].Selected) {
                fieldId = $scope.Fields[i].fieldId;
                fieldName = 'chk_' + fieldId;

                $scope[fieldName] = true;
            }
            else {
                fieldId = $scope.Fields[i].fieldId;
                fieldName = 'chk_' + fieldId;

                $scope[fieldName] = false;

            }
        }

    };

    $scope.MedicineReport = function () {
        if ($scope.ddlMedicine <= 0 || $scope.ddlMedicine == undefined) {
            $scope.ddlMedicine = -1;
            $scope.ddlMedicine = null;
        }
        var params = {
            medicineId: $scope.ddlMedicine
        };
        dataFactory.MedicineReportList(params).then(function (response) {
            var result = response.data;
            $scope.MedicineReportList = result.medicineReport;
            if ($scope.ddlMedicine <= 0 || $scope.ddlMedicine == undefined) {
                $scope.ddlMedicine = -1;
            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.initControls();
    $scope.MedicineReport();
});