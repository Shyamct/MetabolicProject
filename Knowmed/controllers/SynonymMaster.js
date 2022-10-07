app.controller('synonymMasterCtrl', function ($scope, dataFactory, toaster,$rootScope) {

    var SynonymMasterId = 0;
    $scope.hideDiv = true;

    $scope.typeMasterList = function () {
        dataFactory.SynonymTypeMasterList().then(function (response) {
            var result = response.data;
            $scope.SynonymTypeMasterList = result.synonymTypeMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.mtWiseList = function () {
        var param = {
            synonymTypeID: $scope.ddlSynonymType
        }
        dataFactory.MultipleTableWiseList(param).then(function (response) {
            var result = response.data;
            $scope.MultipleTableWiseList = result.multipleTable;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.sMasterList = function () {
        dataFactory.SynonymMasterList().then(function (response) {
            var result = response.data;
            $scope.SynonymMasterList = result.synonymMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getUnitList = function () {

        dataFactory.getUnitList().then(function (response) {
            var result = response.data;
            $scope.unitList = result.unitList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.unitListFn = function () {


        if ($scope.ddlSynonymType == "3") {

            $scope.hideDiv = false;
        }
    };


    $scope.SaveSynonymMaster = function () {
        if ($scope.ddlSynonymType == -1) {
            alert('Please Select Synonym Type');
            return false;
        }
        if ($scope.ddlWord == -1) {
            alert('Please Select Word');
            return false;
        }
        //if ($scope.txtDefaultQty  == undefined) {
        //    alert('Please Enter Default Qty');
        //    return false;
        //}
        //if ($scope.ddlUnit == 0) {
        //    alert('Please Enter Unit');
        //    return false;
        //}
        if ($scope.txtSynonym == undefined) {
            alert('Enter Synonym');
            return false;
        }
        var params = {
            id: SynonymMasterId,
            synonymTypeID: $scope.ddlSynonymType,
            textID: $scope.ddlWord,
            synonym: $scope.txtSynonym,
            defaultQty: $scope.txtDefaultQty,
            qtyUnitID: $scope.ddlUnit,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveSynonymMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            var message = SynonymMasterId > 0 ? 'UPDATE SYNONYM MASTER' : 'SAVE SYNONYM MASTER';
            $rootScope.activityLog(response, message, 'SYNONYM  MASTER', '');
            $scope.sMasterList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.DeleteSynonymMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteSynonymMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.sMasterList();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE SYNONYM MASTER', 'SYNONYM MASTER', '');

            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid, synonymType) {
        SynonymMasterId = paramid;
        if (synonymType == "Food") {

            $scope.hideDiv = false;
        }
        var params = {
            id: paramid

        };
        dataFactory.SynonymMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.synonymMaster;
            $scope.ddlSynonymType = list[0].synonymTypeID;
            $scope.mtWiseList();            
            $scope.txtSynonym = list[0].synonym;
            $scope.txtDefaultQty = list[0].defaultQty;
            $scope.ddlUnit = list[0].qtyUnitID;
            setTimeout(function () {
                $scope.ddlWord = list[0].textID;
            }, 1);
        },
            function (error) {
                toaster.pop('error', "Error", error);
            });

    };

    $scope.clr = function () {
        SynonymMasterId = 0;
        //$scope.ddlSynonymType = -1;
        $scope.txtDefaultQty = "";
        $scope.txtSynonym = "";
        //$scope.ddlWord = -1;
        $scope.typeMasterList();
        $scope.sMasterList();
        $scope.getUnitList();
    };

    $scope.typeMasterList();
    $scope.sMasterList();
    $scope.getUnitList();
});