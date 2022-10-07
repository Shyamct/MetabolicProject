app.controller('medicineGroupParentHierarchyCtrl', function ($scope, dataFactory, toaster, $rootScope) {

   

    var medicineGroupID = 0;
    var parentGroupList = [];

    $scope.initControls = function () {
        dataFactory.InitControlsMedicineGroup().then(function (response) {
            var result = response.data;
            $scope.classificationList = result.classificationList;
            $scope.bodySystemList = result.bodySystemList; 
            $scope.medicineList = result.medicineList;
            $scope.medicineGroupMasterList = result.medicineGroupMasterList;
            $scope.bookList = result.bookList;
            $scope.assignedMedicineGroupList = result.medicineGroupMasterHiearchyList;
            for (var i = 0; i < result.medicineGroupMasterHiearchyList.length; i++) {
                $scope.assignedMedicineGroupList[i].details = JSON.parse(result.medicineGroupMasterHiearchyList[i].details);
                //log(
                //    $scope.assignedMedicineGroupList[i].details);
            }
            
            $scope.assignedMedicineGroupList = result.medicineGroupMasterHiearchyList; 
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.bindGroup = function (groupID) {
        var params = {
            groupID: groupID,
        };
        dataFactory.getMedicineGroupID(params).then(function (response) {
            var result = response.data;
            $scope.medicineParentGroup = result.medicineParentGroup;
            log($scope.medicineParentGroup);
            //bindGroupParentMain($scope.ddlMedicineGroup);
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveMedicineGroupParentHierarchy = function () {
        var classficationID = '';
        var systemID = '';
        if (medicineGroupID === 0) {
            if ($scope.ddlMedicine == 0) {
                toaster.pop('error', "Error", 'Please Select Medicine ');
                return false;
            }

            if ($scope.ddlMedicineGroup == 0) {
                toaster.pop('error', "Error", 'Please Select Group ');
                return false;
            }

            if ($scope.ddlClassification === 0) {
                classficationID = '';
            }
            else {
                classficationID = $scope.ddlClassification;
            }
            if ($scope.ddlSystem == 0) {
                systemID = '';
            }
            else {
                systemID = $scope.ddlSystem;
            }
            var n = 1;
            for (var i = 0; i < $scope.medicineParentGroup.length; i++) {

                if ($scope.medicineParentGroup[i].Selected) {

                    parentGroupList.push({
                        serialNo: n,
                        groupID: $scope.medicineParentGroup[i].parentGroupID,
                    });
                    n = n + 1;
                }
            }
        }
        var params = {
            id: medicineGroupID,
            classificationID: classficationID,
            systemID: systemID,
            medicineID: $scope.ddlMedicine,
            parentgroupIDList: parentGroupList,
            groupID: $scope.ddlMedicineGroup,
            bookID: $scope.ddlbookname,
            pageNo: $scope.txtpageno,
            edition: $scope.txtedition,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)

        };
        log(params);
        dataFactory.saveMedicineGroupParentHierarchy(params).then(function (response) {
            var message = medicineGroupID > 0 ? 'Update Medicine Group Parent Hierarchy' : 'Save Medicine Group Parent Hierarchy';
            $rootScope.activityLog(response, message, 'Medicine Group Parent Hierarchy', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.initControls();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (id) {
        var params = {
            id: id
        };
        dataFactory.medicineGroupParentHierarchyList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineGroupHierarchyList;
            medicineGroupID = list[0].medicineGroupID;
            //$scope.ddlClassification = list[0].classficationID;
            //$scope.ddlSystem = list[0].systemID;
            //$scope.ddlMedicine = list[0].medicineID;
            //$scope.ddlMedicineGroup = list[0].groupID;
            $scope.ddlbookname = list[0].bookNo;
            $scope.txtpageno = list[0].pageNo;
            $scope.txtedition = list[0].edition;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.deleteMedicineGroupParentHierarchy = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteMedicineGroupParentHierarchy(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.initControls();
                $rootScope.activityLog(response, 'Delete Medicine Group Parent Hierarchy', ' Medicine Group Parent Hierarchy', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.deleteMedicineGroup = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteMedicineGroup(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.initControls();
                $rootScope.activityLog(response, 'Delete Medicine Group', ' Medicine Group', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
   
    $scope.clr = function () {
        medicineGroupID = 0;
        $scope.ddlClassification = 0;
        $scope.ddlMedicine = 0;
        $scope.ddlMedicineGroup = 0;
        $scope.medicineParentGroup = "";
        parentGroupList = [];
        $scope.ddlbookname = 0;
        $scope.txtpageno = '';
        $scope.txtedition = '';
    };
    $scope.initControls();

    //$scope.getAssignedMedicineGroup();
});
