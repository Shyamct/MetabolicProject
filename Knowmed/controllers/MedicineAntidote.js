app.controller('medicineAntidoteCtrl', function ($scope, dataFactory, toaster, $rootScope) {

    $scope.isDisabled = false;
    var antidotetId = 0;
    var arr = [];
    $scope.antidoteList = "";

    $scope.initControls = function () {

        dataFactory.medicineAntidoteInitControl().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.antidoteList = result.antidoteList;
            $scope.bookList = result.bookList;
            $scope.medicineAntidoteList = result.medicineAntidoteList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    

    $scope.AddAntidote = function () {

        if ($scope.ddlmedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }

        arr.push({

            antidoteID: $("#ddlAntidote").val(),
            antidoteName: $("#ddlAntidote option:selected").text(),
            isSpecific: $scope.chkIsSpecific == true ? true : false, 
            machanism: $scope.txtMachanism,
           
        });
        $scope.addedAntidoteList = arr;
        console.log(arr);
    };
    $scope.deleteAntidote = function (index) {
        $scope.addedAntidoteList.splice(index, 1);
    };


    $scope.saveMedicineAntidote = function () {
      
        if ($scope.ddlmedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine Name');
            return false;
        }
        if ($scope.ddlAntidote == 0) {
            toaster.pop('error', "Error", 'Please Select Antidote Name');
            return false;
        }

        var params = {
            id: antidotetId,
            medicineID: $scope.ddlmedicine,
            antidoteID: $scope.ddlAntidote,
            isSpecific: $scope.chkIsSpecific==true?1:0,
            machanism: $scope.txtMachanism,
            bookID: $scope.ddlbookname,
            pageNo: $scope.txtpageno,
            edition: $scope.txtedition,
            reference: $scope.txtReference,
            dtMedicineAntidoteList: JSON.stringify($scope.addedAntidoteList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.saveMedicineAntidote(params).then(function (response) {
            console.log(response);
            if (antidotetId > 0) {
                $rootScope.activityLog(response, 'UPDATE Medicine Antidote', 'Medicine Antidote', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');

            $scope.clr();
            $scope.initControls();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (row) {
        antidotetId = row;
        var params = {
            id: row
        };
        dataFactory.medicineAntidoteInitControl(params).then(function (response) {
            var result = response.data.medicineAntidoteList[0];
          
            $scope.ddlmedicine = result.medicineId;
            $scope.ddlAntidote = result.antidoteID;
            $scope.txtMachanism = result.machanism;
            $scope.txtReference = result.reference;
            $scope.ddlbookname = result.bookID;
            $scope.txtpageno = result.pageNo;
            $scope.txtedition = result.edition;
            $scope.txtReference = result.reference;
            $scope.chkIsSpecific = result.isSpecific=='1'?true:false;
            $scope.btnAdd = true;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteMedicineAntidote(params).then(function (response) {
                $scope.initControls();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Medicine Antidote', ' Medicine Antidote', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    

    $scope.clr = function () {
       
        $scope.ddlmedicine = 0;
        $scope.ddlAntidote = 0;
        $scope.chkIsSpecific = 0;
        $scope.btnAdd = false;
        $scope.txtMachanism = '';
        antidotetId = 0;
        $scope.addedAntidoteList = '';
        arr = [];
    };

    $scope.initControls();
});