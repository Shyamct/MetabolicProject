app.controller('menuDescriptionMasterCtrl', function ($rootScope, $scope, $modal, $state, toaster, dataFactory, $filter, $timeout, $window) {
    var mainId = 0;
    $scope.rowID = 0;
    $scope.update = false;
    $scope.submit = true;
    var filePath1 = "";
    var formdata = new FormData();
    var pFile = '';
    var addedPFiles = [];
    $scope.getAllMenuMasterList = function () {
        dataFactory.getAllMenuMasterList ().then(function (response) {
            var result = response.data;
            $scope.mainHeadlist = result.mainMenuList;
          //  $scope.menuList = result.menuList;
           // log(result.mainHeadList);
            //var treevalue = generateTreeview(result.menuList); //generate tree
            //$('#menuList').highCheckTree({
            //    data: treevalue
            //});
            //log(result);
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.edit = function (ids) {
        mainId = ids;
        var params = {
            id: ids
        };
        dataFactory.getmenuDescription(params).then(function (response) {
            var result = response.data.getmenuDescription[0];
            $scope.getHeadRelatedMenuList(result.parentID);
            $scope.ddlMainHead = result.parentID;
           
            $scope.ddlMenuList = result.menuId;
            $scope.title = result.title;
            $scope.Details = result.description;
            $scope.filePath1 = result.imageURL;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };



    $scope.getHeadRelatedMenuList = function (menuID) {
        $scope.getMenuList = "";
        var obj = {

            id: menuID
        };
      
        dataFactory.getMenuFromParent(obj).then(function (response) {
            if (response.data.menuList.length > 0) {

                $scope.getMenuList = response.data.menuList;
            }

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });

    }

    $scope.addFiles = function ($files) {
        formdata = new FormData();
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);

        });
        $scope.uploadFile();
    };


    $scope.uploadFile = function () {
        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;

            log(result);
            for (var i = 0; i < result.length; i++) {
                if (i == (result.length - 1)) {
                   
                        $scope.filePath1 = result[i];
                        
                }
            }            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    }



    $scope.addFormDescription = function () {
        var fileUpload = $("#FileUpload1").get(0);
        var files = fileUpload.files;

        if (files.length > 0) {
            $scope.uploadFile();
        }
        if (($scope.ddlMainHead) === 0) {
            toaster.pop('error', "Error", 'Select Head');
            return;
        }
        if (isEmpty($scope.title)) {
            toaster.pop('error', "Error", 'Enter Title');
            return;
        }

        if (($scope.ddlMenuList) === 0) {
            toaster.pop('error', "Error", 'Select Menu');
            return;
        }
        if (isEmpty($scope.Details)) {
            toaster.pop('error', "Error", 'Enter Description');
            return;
        }

        var obj = {

            menuID: $scope.ddlMenuList,
            description: $scope.Details,
            title: $scope.title,
            imageURL: $scope.filePath1,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid),

        };


        dataFactory.addFormDescription(obj).then(function (response) {

            toaster.pop('success', "Success", 'Saved Successfully.');
            getmenuDescription();
            $scope.clearMenuMaster();

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });

    }

    $scope.updateFormDescription = function () {
        var fileUpload = $("#FileUpload1").get(0);
        var files = fileUpload.files;

        if (files.length > 0) {
            $scope.uploadFile();
        }
        if (($scope.ddlMainHead) === 0) {
            toaster.pop('error', "Error", 'Select Head');
            return;
        }
        if (isEmpty($scope.title)) {
            toaster.pop('error', "Error", 'Enter Title');
            return;
        }

        if (($scope.ddlMenuList) === 0) {
            toaster.pop('error', "Error", 'Select Menu');
            return;
        }
        if (isEmpty($scope.Details)) {
            toaster.pop('error', "Error", 'Enter Description');
            return;
        }

        var obj = {
            rowID: $scope.rowID,
            menuID: $scope.ddlMenuList,
            description: $scope.Details,
            title: $scope.title,
            filePath: filePath1,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid),

        };


        dataFactory.updateFormDescription(obj).then(function (response) {

            toaster.pop('success', "Success", 'Updated Successfully.');
            getmenuDescription();
            $scope.clearMenuMaster();
            $scope.update = false;
            $scope.submit = true;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });

    }
    function getmenuDescription() {

        var obj = {
        }
        dataFactory.getmenuDescription(obj).then(function (response) {
            var result = response.data.getmenuDescription;
            $scope.getmenuDescription = result;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    }
    getmenuDescription();


    $scope.getdetails = function (list) {
        $scope.getHeadRelatedMenuListforEdit(list);

        $scope.rowID = list.rowID
        $scope.ddlMainHead = list.parentID;
        $scope.title = list.title;
        $scope.FileUpload1 = list.imageURL;
        $scope.Details = list.description;
        $scope.ddlMenuList = list.menuID;
        $scope.menuName = list.menuID;

        $scope.submit = false;
        $scope.update = true;
    };
    $scope.getHeadRelatedMenuListforEdit = function (list) {
        $scope.getMenuList = "";
        var obj = {

            parentID: list.parentID
        };

        dataFactory.getHeadRelatedMenuList(obj).then(function (response) {
            if (response.data.mainMenuList.length > 0) {

                $scope.getMenuList = response.data.mainMenuList;
            }

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });

    }


    $scope.clearMenuMaster = function () {
        $("input[type='file']").val('');

        $scope.FileUpload1 = "";
        $scope.Details = "";
        $scope.title = "";
        filePath1 = "";
        $scope.title = "";
        $scope.submit = true;
        $scope.update = false;

    };
    $scope.getAllMenuMasterList();
});