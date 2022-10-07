app.controller('investigationResultPropertyCtrl', function ($scope, dataFactory, toaster) {
    var propertyNameID = 0;
    var propertyValueID = 0;
    var propertyNameValueAssignID = 0;
    var arr = [];
    $scope.assignPropertyNameValueList = "";
    $scope.assignedPropertyNameValueList = "";

    // Property Name Controls Here
    $scope.getPropertyNameList = function () {
        $scope.clr();
        var params = {
            id: propertyNameID
        };
        dataFactory.PropertyNameList(params).then(function (response) {
            var result = response.data;
            $scope.propertyNameList = result.propertyNameMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.savePropertyName = function () {
        if ($scope.propertyName == "") {
            toaster.pop('error', "Error", 'Please Enter  Property Name');
            return false;
        }
        var params = {
            propertyNameID: propertyNameID,
            propertyName: $scope.propertyName,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.PropertyNameSave(params).then(function (response) {
            $scope.getPropertyNameList();
            $scope.getPropertyValueList();
            $scope.assignedPropertyNameValue();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.editPropertyName = function (paramid) {

        propertyNameID = paramid;
        var params = {
            propertyNameID: paramid
        };
        dataFactory.PropertyNameList(params).then(function (response) {
            var result = response.data;
            var list = result.propertyNameMaster;
            $scope.propertyName = list[0].propertyName;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.deletePropertyName = function (propertyNameID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                propertyNameID: propertyNameID,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.PropertyNameDelete(params).then(function (response) {
                $scope.getPropertyNameList();
                $scope.getPropertyValueList();
                $scope.assignedPropertyNameValue();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    //Property Name Controls Here


    // Property Value  Here

    $scope.getPropertyValueList = function () {
        $scope.clr();
        var params = {
            id: propertyValueID
        };
        dataFactory.PropertyValueList(params).then(function (response) {
            var result = response.data;
            $scope.propertyValueList = result.propertyValueMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.savePropertyValue = function () {
        if ($scope.propertyValueName == "") {
            toaster.pop('error', "Error", 'Please Enter  Property Value Name');
            return false;
        }
        var params = {
            propertyValueID: propertyValueID,
            propertyValueName: $scope.propertyValueName,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.PropertyValueSave(params).then(function (response) {
            $scope.getPropertyNameList();
            $scope.getPropertyValueList();
            $scope.assignedPropertyNameValue();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.editPropertyValue = function (paramid) {

        propertyValueID = paramid;
        var params = {
            propertyValueID: paramid
        };
        dataFactory.PropertyValueList(params).then(function (response) {
            var result = response.data;
            var list = result.propertyValueMaster;
            $scope.propertyValue = list[0].propertyValueName;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.deletePropertyValue = function (valueID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                propertyValueID: valueID,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.PropertyValueDelete(params).then(function (response) {
                $scope.getPropertyNameList();
                $scope.getPropertyValueList();
                $scope.assignedPropertyNameValue();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    //Property Value End Here

    //Property Name Value start

    $scope.assignedPropertyNameValue = function () {
        $scope.clr();
        var params = {
            propertyNameValueID: propertyNameValueAssignID
        };
        dataFactory.PropertyNameValueAssignedList(params).then(function (response) {
            var result = response.data;
            $scope.assignedPropertyNameValueList = result.propertyNameValueAssign;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.AssignPropertyNameValue = function () {
        if ($scope.ddlPropertyName == 0) {
            toaster.pop('error', "Error", 'Please Select Property Name');
            return false;
        }
        if ($scope.ddlPropertyValue == 0) {
            toaster.pop('error', "Error", 'Please Select Property Value');
            return false;
        }


        for (var i = 0; i < $scope.assignPropertyNameValueList.length; i++) {
            if ($scope.assignPropertyNameValueList[i].propertyNameID == $scope.ddlPropertyName && $scope.assignPropertyNameValueList[i].propertyValueID == $scope.ddlPropertyValueID) {
                toaster.pop('error', "Error", "Already Added");
                return false;
            }

        }
        for (var i = 0; i < $scope.assignedPropertyNameValueList.length; i++) {
            if ($scope.assignedPropertyNameValueList[i].propertyNameID == $scope.ddlPropertyName && $scope.assignedPropertyNameValueList[i].propertyValueID == $scope.ddlPropertyValueID) {
                toaster.pop('error', "Error", 'Already Assigned ');
                return false;
            }
        }
        arr.push({
            propertyNameID: $("#ddlPropertyName").val(),
            propertyName: $("#ddlPropertyName option:selected").text(),
            propertyValueID: $("#ddlPropertyValue").val(),
            propertyValueName: $("#ddlPropertyValue option:selected").text()

        });
        $scope.assignPropertyNameValueList = arr;
    };
    $scope.deletePropertyNameValue = function (index) {
        $scope.assignPropertyNameValueList.splice(index, 1);
    };
    $scope.savePropertyNameValue = function () {

        if (propertyNameValueAssignID == 0) {
            if ($scope.ddlPropertyName == 0) {
                toaster.pop('error', "Error", 'Please Select Property Name');
                return false;
            }
            if ($scope.ddlPropertyValue == '') {
                toaster.pop('error', "Error", 'Please Select Property Value ');
                return false;
            }
            if ($scope.assignPropertyNameValueList.length === 0) {
                toaster.pop('error', "Error", 'Please add Name & Value ');
                return false;
            }
        }
       
        var params = {
            propertyNameValueID: propertyNameValueAssignID,
            propertyNameID: $scope.ddlPropertyName,
            propertyValueID: $scope.ddlPropertyValue,
            lstPropertyNameValueAssignList: $scope.assignPropertyNameValueList,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SavePropertyNameValueAssign(params).then(function (response) {
            $scope.getPropertyNameList();
            $scope.getPropertyValueList();
            $scope.assignedPropertyNameValue();
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deletePropertyNameValueAssign = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                propertyNameValueID: id
            };
            dataFactory.DeletePropertyNameValueAssign(params).then(function (response) {
                $scope.getPropertyNameList();
                $scope.getPropertyValueList();
                $scope.assignedPropertyNameValue();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.editPropertyNameValueAssign = function (id) {
        $scope.isDisabled = true;
        propertyNameValueAssignID = id;
        var params = {
            propertyNameValueID: id
        };
        dataFactory.PropertyNameValueAssignedList(params).then(function (response) {
            var result = response.data;
            var list = result.propertyNameValueAssign;
            $scope.ddlPropertyName = list[0].propertyNameID;
            $scope.ddlPropertyValue = list[0].propertyValueID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };



    //Property Name Value Assign end


    $scope.clr = function () {
        $scope.propertyName = "";
        $scope.propertyValueName = "";
        $scope.propertyNameList = "";
        $scope.propertyValueList = "";
        propertyNameValueAssignID = 0;
        $scope.assignPropertyNameValueList.length = 0;
        $scope.isDisabled = false;
        $scope.ddlPropertyName = 0;
        $scope.ddlPropertyValue = 0;
    };

    $scope.getPropertyNameList();
    $scope.getPropertyValueList();
    $scope.assignedPropertyNameValue();
});