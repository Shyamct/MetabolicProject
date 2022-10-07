app.controller('userPerformanceReportCtrl', function ($scope, dataFactory, toaster) {
    //var PerformanceID = 0;
    //var userList = [] ;
    $scope.fromDate = getCurrentDate();
    $scope.toDate = getCurrentDate();

    //$scope.fromDate = '';
    //$scope.toDate = '';
    $scope.UserRecordCountDetailList = function () {
       
        var params = {
            fromDate: $scope.fromDate,
            toDate: $scope.toDate,
            userID: $scope.ddlUser
        };
        dataFactory.userRecordCountDetailList(params).then(function (response) {
            var result = response.data;
            $scope.userList = result.userList;
            $scope.userRecordReportList = result.userRecordReportList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    //function datesplit(date) {

    //    var date1 = date.split("/");
    //    var date2 = date1[2] + '-' + date1[1] + '-' + date1[0];
    //    return date2;
    //}

    //$scope.tagAdded = function (tag) {
    //    //if (PerformanceID == 0) {
    //        userList.push({
    //            userID: tag.id
    //        });
    //    //}
    //    $scope.UserRecordCountDetailList();
    //};

    //$scope.tagRemoved = function (tag) {

    //    for (var i = 0; i < userList.length; i++) {
    //        if (userList[i].userID === tag.id) {
    //            userList.splice(i, 1);
    //        }
    //    }
    //};

    //$scope.GetUserSearch = function (query) {
    //    var obj = {
    //        searchString: query
    //    };
    //    return dataFactory.getUserSearchList(obj).then(function (response) {
    //        var result = response.data;
    //         return result.userList;
         

    //    }, function (error) {

    //    });
    //};

    $scope.UserRecordCountDetailList();
});