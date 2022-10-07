app.controller('medicineGroupNewCtrl', function ($scope, dataFactory, toaster, $rootScope) {

    var id = 0;
    var medicineGroupID = 0;
    $scope.GetAllClassificationList = function () {
        dataFactory.GetAllClassificationList().then(function (response) {
            var result = response.data;
            $scope.classificationList = result.classification;
            $scope.bodySystemList = result.bodySystem;
            $scope.bookList = result.bookMaster;
            $scope.medicineGroupMasterList = result.medicineGroupMaster;
            $scope.bodySystemLists = result.bodySystemList; 
            $scope.medicineGroupParentAssign = result.medicineGroupParentAssign; 
            $scope.medicineGroupClassificationAssignList = result.medicineGroupClassificationAssignList; 
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.getMedicineGroup = function () {
        
        var params = {
            id: medicineGroupID
        };
        dataFactory.MedicineGroupList(params).then(function (response) {
            var result = response.data;
            $scope.medicineGroupList = result.medicineGroupMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.getAllGroupWithParentList = function (parms) {
        
        var params = {
            id: parms
        };
        dataFactory.getAllGroupWithParentList(params).then(function (response) {
            var result = response.data;
            $scope.parentGroupList = result.parentGroupList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 
    $scope.saveMedicineClassification = function () {

        var params = {
            id: id,
            classificationName: $scope.txtClassification,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineClassification(params).then(function (response) {
            var message = id > 0 ? 'Update Medicine Classification' : 'Save Medicine Classification';
            $rootScope.activityLog(response, message, 'Medicine Classification', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            id = 0;
            $scope.txtClassification = '';
            $scope.clr();
            $scope.GetAllClassificationList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.saveMedicineClassificationSystem = function () {
        var params = {
            id: id,
            classificationID: $scope.ddlClassification,
            systemID: $scope.ddlSystem,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineClassificationSystem(params).then(function (response) {

            var message = id > 0 ? 'Update Medicine Classification System' : 'Save Medicine Classification System';
            $rootScope.activityLog(response, message, 'Medicine Classification System', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.GetAllClassificationList();
           
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.saveMedicineParentAssign = function () {
        var params = {
            id: id,
            groupID: $scope.ddlParentGroup,
            parentGroupID: $scope.ddlParentName,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineParentAssign(params).then(function (response) {
            var message = id > 0 ? 'Update Medicine Parent Assign' : 'Save Medicine Parent Assign';
            $rootScope.activityLog(response, message, 'Medicine Parent Assign', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.GetAllClassificationList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.saveMedicineGroup = function () {

        if (medicineGroupID == 0) {
            if ($scope.txtGroup == '') {
                toaster.pop('error', "Error", 'Please Enter Group Name');
                return false;
            }
        }
        var params = {
            id: medicineGroupID,
            groupName: $scope.txtGroup,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineGroup(params).then(function (response) {
            var message = id > 0 ? 'Update Medicine Group' : 'Save Medicine Group';
            $rootScope.activityLog(response, message, 'Medicine Group', '');
            $scope.clr();
            $scope.getMedicineGroup();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.saveMedicineGroupClassificationAssign = function () {
        var params = {
            id: id,
            classificationID: $scope.ddlClassificationAssign,
            groupID: $scope.ddlGroupAssign,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineGroupClassificationAssign(params).then(function (response) {
            var message = id > 0 ? 'Update Medicine Group Classification Assign' : 'Save Medicine Group Classification Assign';
            $rootScope.activityLog(response, message, 'Medicine Group Classification Assign', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.GetAllClassificationList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteMedicineClassification = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id
            };
            dataFactory.DeleteMedicineClassification(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.GetAllClassificationList();
                $rootScope.activityLog(response, 'Delete Medicine Classification ', ' Medicine Classification ', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.deleteMedicineClassificationSystem = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineClassificationSystem(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.GetAllClassificationList();
                $rootScope.activityLog(response, 'Delete Medicine Classification System', ' Medicine Classification System', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    }; 
    $scope.deleteMedicineParentAssign = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineParentAssign(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.GetAllClassificationList();
                $rootScope.activityLog(response, 'Delete Medicine Parent Assign', ' Medicine Parent Assign', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineGroup(params).then(function (response) {
                $scope.getMedicineGroup();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Medicine Group', ' Medicine Group', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.deleteMedicineGroupClassificationAssign = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineGroupClassificationAssign(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.GetAllClassificationList();
                $rootScope.activityLog(response, 'Delete Medicine Group Classification Assign', ' Medicine Group Classification Assign', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    
    $scope.editMedicineClassification = function (paramid) {
        id = paramid;
        var params = {
            id: paramid
        };
        dataFactory.GetAllClassificationList(params).then(function (response) {
            var result = response.data;
            var list = result.classification;
            $scope.txtClassification = list[0].classificationName;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.editMedicineClassificationSystem = function (paramid) {
        id = paramid;
        var params = {
            id: paramid
        };
        dataFactory.GetAllClassificationList(params).then(function (response) {
            var result = response.data;
            var list = result.bodySystemList;
            $scope.ddlClassification = list[0].classificationID;
            $scope.ddlSystem = list[0].systemID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.editMedicineParentAssign = function (paramid) {
        id = paramid;
        var params = {
            id: paramid
        };
        dataFactory.GetAllClassificationList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineGroupParentAssign; 
            $scope.ddlParentGroup = list[0].groupID; 
            //$scope.getAllGroupWithParentList(list[0].groupID);
            var params2 = {
                id: list[0].groupID
            };
            dataFactory.getAllGroupWithParentList(params2).then(function (response) {
                var result = response.data;
                $scope.parentGroupList = result.parentGroupList;
                $scope.ddlParentName = list[0].parentGroupID;
            }, function (error) {
                toaster.pop('error', "Error", error);
            });

           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.edit = function (paramid) {
        medicineGroupID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.MedicineGroupList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineGroupMaster;
            $scope.txtGroup = list[0].groupName;
            $scope.ddlBook = list[0].bookID;
            $scope.txtPageNo = list[0].pageNo;
            $scope.txtEdition = list[0].edition;
            $scope.txtReference = list[0].reference;
            $scope.txtRemark = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.editMedicineGroupClassificationAssign = function (paramid) {
        id = paramid;
        var params = {
            id: paramid
        };
        dataFactory.GetAllClassificationList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineGroupClassificationAssignList;
            $scope.ddlClassificationAssign = list[0].classificationID;
            $scope.getAllGroupWithParentList(list[0].groupID);
            $scope.ddlGroupAssign = list[0].groupID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.getGroupSubGroup = function () {
        $scope.clr();
        var params = {
            id: groupSubGroupID
        };
        dataFactory.GroupSubGroupList(params).then(function (response) {
            var result = response.data;
            $scope.assignedGroupSubGroupList = result.subGroupMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clr = function () {

        $scope.txtClassification = '';
        $scope.ddlClassification = 0;
        $scope.ddlSystem = 0;

        $scope.txtGroup = '';
        $scope.ddlBook = 0;
        $scope.txtPageNo = '';
        $scope.txtEdition = '';
        $scope.txtReference = '';
        $scope.txtRemark = '';

        $scope.ddlParentGroup = 0;
        $scope.ddlParentName = 0;

        $scope.ddlClassificationAssign = 0;
        $scope.ddlGroupAssign = 0;
        id = 0;
        medicineGroupID = 0;
        groupSubGroupID = 0;

    };

    $scope.GetAllClassificationList();
    $scope.getMedicineGroup();
    $scope.getGroupSubGroup();

});