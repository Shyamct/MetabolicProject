app.controller('menuMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var pkId = 0; 

    $scope.initControls = function () {
      
        dataFactory.InitControlsMenuMaster().then(function (response) {         
            var result = response.data;
            $scope.menuList = result.menuList;          
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetMenuMasterList = function () {
        var params = {
            id: 0
        };
        dataFactory.MenuMasterList(params).then(function (response) {
            var result = response.data;
            $scope.menuMasterList = result.menuMasterList;
                      
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.SaveMenuMaster = function () {
        
        if (isEmpty($scope.txtMenu)) {            
            toaster.pop('error', "Error",'Please Enter Menu Name');
            return false;
        }
        //if (isEmpty($scope.txturl)) {
        //    toaster.pop('error', "Error",'Please Enter Menu Url');
        //    return false;
        //}
        var params = {
            id: pkId,        
            parentID: $scope.ddlMenu,
            menuName: $scope.txtMenu,
            url: $scope.txturl,
            imgURL: $scope.txtImgURL,
            //tableName: $scope.txtTableName,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveMenuMaster(params).then(function (response) {
            var message = pkId > 0 ? 'UPDATE MENU MASTER' : 'SAVE MENU MASTER';
            $rootScope.activityLog(response, message, 'MENU MASTER', '');

            $scope.GetMenuMasterList();
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.initControls();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (paramid) {
        pkId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.MenuMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.menuMasterList;
            $scope.ddlMenu = list[0].parentId;
            $scope.txtMenu = list[0].menuName;
            $scope.txturl = list[0].url;
            $scope.txtImgURL = list[0].imgURL;
            //$scope.txtTableName = list[0].tableName; 

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.deleteMenuMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };

            dataFactory.DeleteMenuMaster(params).then(function (response) {
                $scope.GetMenuMasterList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.initControls();
                $rootScope.activityLog(response, 'DELETE MENU MASTER', 'MENU MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };   

    $scope.clr = function () { 
        $scope.ddlMenu = 0;
        $scope.txtMenu = '';
        $scope.txturl = '';
        $scope.txtImgURL = '';
        //$scope.txtTableName = '';
        pkId = 0;
    };

    $scope.initControls();
    $scope.GetMenuMasterList();
});