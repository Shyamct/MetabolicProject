app.controller('medicineGroupCtrl', function ($scope, dataFactory, toaster, $rootScope) {
   
    var medicineGroupID = 0;
    var groupSubGroupID = 0;
   
    $scope.medicineGroupList = "";
   
    
    $scope.initControls = function () {
        dataFactory.InitControlsMedicineGroup().then(function (response) {
            var result = response.data;
            $scope.bookList = result.bookMaster;
            $scope.medicineGroupMasterList = result.medicineGroupMaster;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getMedicineGroup = function () {
        $scope.clr();
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
   
    $scope.saveMedicineGroup = function () {
       
        if (medicineGroupID == 0)
        {
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
            var message = medicineGroupID > 0 ? 'Update Medicine Group' : 'Save Medicine Group';
            $rootScope.activityLog(response, message, 'Medicine Group', '');
            $scope.getMedicineGroup();
            toaster.pop('success', "Success", 'Saved Successfully.');
           
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
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
                $rootScope.activityLog(response, 'Delete Medicine Group ', 'Medicine Group', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.deleteGroupSubGroup = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteGroupSubGroup(params).then(function (response) {
                $scope.getGroupSubGroup();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Medicine Group 2', ' Medicine Group 2', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
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
    // group to sub group
    $scope.assignGroupSubGroup = function () {

        if ($scope.ddlMedicineGroup == 0) {
            
                toaster.pop('error', "Error", 'Please Select Group');
                return false;
        }
        if ($scope.ddlSubGroup == 0) {

            toaster.pop('error', "Error", 'Please Select Sub Group');
            return false;


        }
        var params = {
            id: groupSubGroupID,
            groupID: $scope.ddlGroup,
            subGroupID: $scope.ddlSubGroup,
            bookID: $scope.ddlBookG,
            pageNo: $scope.txtPageNoG,
            edition: $scope.txtEditionG,
            reference: $scope.txtReferenceG,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)

        };

        dataFactory.SaveGroupSubGroup(params).then(function (response) {
            $scope.getGroupSubGroup();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };



    $scope.editGroupSubGroup = function (paramid) {

        groupSubGroupID = paramid;
        var params = {
            id: paramid

        };
        dataFactory.GroupSubGroupList(params).then(function (response) {
            var result = response.data;
            var list = result.subGroupMaster;
            $scope.ddlGroup = list[0].groupID,
            $scope.ddlSubGroup = list[0].subGroupID,
            $scope.ddlBookG = list[0].bookID;
            $scope.txtPageNoG = list[0].pageNo;
            $scope.txtEditionG = list[0].edition;
            $scope.txtRemark = list[0].remark;
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

        $scope.txtGroup = '';
        $scope.ddlBook = 0;
        $scope.txtPageNo = '';
        $scope.txtEdition = '';
        $scope.txtReference = '';
        $scope.txtRemark = '';
        medicineGroupID = 0;
        groupSubGroupID = 0;
       
    };
    $scope.initControls();
    $scope.getMedicineGroup();
    $scope.getGroupSubGroup();
    
});