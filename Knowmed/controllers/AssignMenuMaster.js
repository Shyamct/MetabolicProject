app.controller('assignMenuMasterCtrl', function ($scope, dataFactory, toaster) {
    var pkId = 0; 

    $scope.initControls = function () {      
        dataFactory.InitControlsAssignMenu().then(function (response) {         
            var result = response.data;           
            $scope.userList = result.userList;       
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getMenuList = function () {
        var params = {
            userID: $scope.ddlUser    
        };
        dataFactory.GetMenuList(params).then(function (response) {
            var result = response.data;
            $scope.menuList = result.menuList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.getSelectedUserMenuList = function () {
        $scope.getMenuList();
        $scope.GetMenuAssignedMasterList();
    };

    $scope.GetMenuAssignedMasterList = function () {
        var params = {
            userID: $scope.ddlUser    
        };
        dataFactory.AssignMenuList(params).then(function (response) {
            var result = response.data;
            $scope.assignedMenuList = result.assignedMenuList;

            //if ($scope.assignedMenuList && $scope.assignedMenuList.length > 0) {
            //    for (var i = 0; i < $scope.assignedMenuList.length; i++) {
            //        var count = 0;
            //        var menuName = $scope.assignedMenuList[i].menuName;
            //        for (var j = 0; j < $scope.assignedMenuList.length; j++) {
            //            if (menuName == $scope.assignedMenuList[j].menuName) {
            //                count = count + 1;
            //                $scope.assignedMenuList[j].menuCount = count;
            //            }
            //        }
            //    }
            //}


        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.SaveMenuAssign = function () {

        var isExists = false;
        var menuId = "";
        angular.forEach($scope.visibleItems, function (item) {
            if (item.selected) {
                isExists = true;
                menuId = menuId + item.menuId + ",";
            }
        });   
        if ($scope.ddlUser==0) {            
            toaster.pop('error', "Error",'Please Select User');
            return false;
        }     
        if (isExists == false) {
            toaster.pop('error', "Error", 'Please Select Any Menu');
            return false;
        }  
        var params = {    
            id: pkId,
            menuID: menuId,
            userID: $scope.ddlUser           
            //userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveAssignMenu(params).then(function (response) {
            $scope.getMenuList();
            $scope.GetMenuAssignedMasterList();
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (paramid) {
        pkId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.AssignMenuList(params).then(function (response) {
            var result = response.data;
            var list = result.assignedMenuList;
            $scope.ddlMenu = list[0].menuId;
            $scope.ddlUser = list[0].userId;

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

            dataFactory.DeleteAssignMenu(params).then(function (response) {
                $scope.getMenuList();
                $scope.GetMenuAssignedMasterList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };      
    $scope.toggleSelect = function () {
        if ($scope.ddlUser != 0) {
            angular.forEach($scope.menuList, function (item) {
                item.selected = !item.selected;
            });
        }
        else {
            toaster.pop('error', "Error", 'Please Select User');
            $scope.selectAll = false;
        }
    }
    $scope.clr = function () { 
        $scope.selectAll = false;
    };

    $scope.initControls();
    $scope.getMenuList();
    $scope.GetMenuAssignedMasterList();
});