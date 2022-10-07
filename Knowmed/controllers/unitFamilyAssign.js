app.controller('unitFamilyAssignCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var unitID = 0;
    var unitFamilyID = 0;
    var unitFamilyAssignID = 0;
    var arr = [];
    $scope.assignUnitFamilyList = "";
    $scope.assignedUnitFamilyList = "";

    // UNit Master Controls Here
    $scope.getUnitList = function () {
        $scope.clr();
        var params = {
            id: unitID
        };
        dataFactory.UnitList(params).then(function (response) {
            var result = response.data;
            $scope.unitList = result.unitMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveUnit = function () {
        if ($scope.unitName == "") {
            toaster.pop('error', "Error", 'Please Enter  Unit Name');
            return false;
        }
        var params = {
            unitID: unitID,
            unitName: $scope.unitName,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.UnitSave(params).then(function (response) {
            var message = unitID > 0 ? 'Update UnitMaster' : 'Save Unit Master';
            $rootScope.activityLog(response, message, 'Unit Master', '');
            $scope.getUnitList();
            $scope.getUnitFamilyList();
            $scope.assignedUnitFamily();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.editUnit = function (paramid) {

        unitID = paramid;
        var params = {
            unitID: paramid
        };
        dataFactory.UnitList(params).then(function (response) {
            var result = response.data;
            var list = result.unitMaster;
            $scope.unitName = list[0].unitName;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.deleteUnit = function (unitID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                unitID: unitID,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.UnitDelete(params).then(function (response) {
                $scope.getUnitList();
                $scope.getUnitFamilyList();
                $scope.assignedUnitFamily();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Unit Master', 'Unit Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    //Unit Controls Here


    // Unit Family Here

    $scope.getUnitFamilyList = function () {
        $scope.clr();
        var params = {
            id: unitFamilyID
        };
        dataFactory.UnitFamilyList(params).then(function (response) {
            var result = response.data;
            $scope.unitFamilyList = result.unitFamily;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveUnitFamily = function () {
        if ($scope.unitFamilyName == "") {
            toaster.pop('error', "Error", 'Please Enter  Unit Family Name');
            return false;
        }
        var params = {
            unitFamilyID: unitFamilyID,
            familyName: $scope.unitFamilyName,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.UnitFamilySave(params).then(function (response) {
            var message = unitFamilyID > 0 ? 'Update Unit Family Master' : 'Save Unit Family Master';
            $rootScope.activityLog(response, message, 'Unit Family Master', '');

            $scope.getUnitList();
            $scope.getUnitFamilyList();
            $scope.assignedUnitFamily();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.editUnitFamily = function (paramid) {

        unitFamilyID = paramid;
        var params = {
            unitFamilyID: paramid
        };
        dataFactory.UnitFamilyList(params).then(function (response) {
            var result = response.data;
            var list = result.unitFamily;
            $scope.unitFamilyName = list[0].unitFamilyName;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.deleteUnitFamily = function (unitFamilyID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                unitFamilyID: unitFamilyID,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.UnitFamilyDelete(params).then(function (response) {
                $scope.getUnitList();
                $scope.getUnitFamilyList();
                $scope.assignedUnitFamily();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Unit FamilyMaster', 'Unit Family Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    //Unit family Here

    //Unit Family Assign start

    $scope.assignedUnitFamily = function () {
        $scope.clr();
        var params = {
            unitFamilyAssignID: unitFamilyAssignID
        };
        dataFactory.UnitFamilyAssignedList(params).then(function (response) {
            var result = response.data;
            $scope.assignedUnitFamilyList = result.unitFamilyAssign;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.AssignUnitFamily = function () {
        if ($scope.ddlUnitFamily == 0) {
            toaster.pop('error', "Error", 'Please Select Unit Family');
            return false;
        }
        if ($scope.ddlUnit == 0) {
            toaster.pop('error', "Error", 'Please Select Unit');
            return false;
        }


        for (var i = 0; i < $scope.assignUnitFamilyList.length; i++) {
            if ($scope.assignUnitFamilyList[i].unitFamilyID == $scope.ddlUnitFamily && $scope.assignUnitFamilyList[i].unitID == $scope.ddlUnit) {
                toaster.pop('error', "Error", "Already Added");
                return false;
            }

        }
        for (var i = 0; i < $scope.assignedUnitFamilyList.length; i++) {
            if ($scope.assignedUnitFamilyList[i].unitFamilyID == $scope.ddlUnitFamily && $scope.assignedUnitFamilyList[i].unitID == $scope.ddlUnit) {
                toaster.pop('error', "Error", 'Already Assigned ');
                return false;
            }
        }
        arr.push({
            unitFamilyID: $("#ddlUnitFamily").val(),
            unitFamilyName: $("#ddlUnitFamily option:selected").text(),
            unitID: $("#ddlUnit").val(),
            unitName: $("#ddlUnit option:selected").text()

        });
        $scope.assignUnitFamilyList = arr;
    };
    $scope.deleteAssignUnitFamily = function (index) {
        $scope.assignUnitFamilyList.splice(index, 1);
    };
    $scope.saveAssignUnitFamily = function () {

        if (unitFamilyAssignID == 0) {
            if ($scope.ddlUnitFamily == 0) {
                toaster.pop('error', "Error", 'Please Select Unit Family');
                return false;
            }
            if ($scope.ddlUnit == '') {
                toaster.pop('error', "Error", 'Please Select Unit ');
                return false;
            }
            if ($scope.assignUnitFamilyList.length === 0) {
                toaster.pop('error', "Error", 'Please add Unit & Family ');
                return false;
            }
        }
       
        var params = {
            unitFamilyAssignID: unitFamilyAssignID,
            unitFamilyID: $scope.ddlUnitFamily,
            unitID: $scope.ddlUnit,
            lstUnitFamilyAssignList: $scope.assignUnitFamilyList,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveUnitFamilyAssign(params).then(function (response) {
            var message = unitFamilyAssignID > 0 ? 'Update Unit Family Assign' : 'Save Unit Family Assign';
            $rootScope.activityLog(response, message, 'Unit Family Assign', '');

            $scope.getUnitList();
            $scope.getUnitFamilyList();
            $scope.assignedUnitFamily();
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deleteUnitFamilyAssign = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                unitFamilyAssignID: id
            };
            dataFactory.DeleteUnitFamilyAssign(params).then(function (response) {
                $scope.getUnitList();
                $scope.getUnitFamilyList();
                $scope.assignedUnitFamily();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Unit Family Assign', 'Unit Family Assign', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.editUnitFamilyAssign = function (id) {
        $scope.isDisabled = true;
        unitFamilyAssignID = id;
        var params = {
            unitFamilyAssignID: id
        };
        dataFactory.UnitFamilyAssignedList(params).then(function (response) {
            var result = response.data;
            var list = result.unitFamilyAssign;
            $scope.ddlUnitFamily = list[0].unitFamilyID;
            $scope.ddlUnit = list[0].unitID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };



    //Unit Family Assign end


    $scope.clr = function () {
        $scope.unitName = "";
        $scope.unitFamilyName = "";
        $scope.unitList = "";
        $scope.unitFamilyList = "";
        unitFamilyAssignID = 0;
        $scope.assignUnitFamilyList.length = 0;
        $scope.isDisabled = false;
        $scope.ddlUnit = 0;
        $scope.ddlUnitFamily = 0;
    };

    $scope.getUnitList();
    $scope.getUnitFamilyList();
    $scope.assignedUnitFamily();
});