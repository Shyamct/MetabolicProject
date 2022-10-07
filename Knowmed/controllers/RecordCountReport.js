app.controller('recordCountCtrl', function ($scope, dataFactory, toaster) {
    $scope.tableName = '';

    $scope.getRecordCountList = function () {
        var params = {
            date: $scope.date,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        $scope.clr();
        dataFactory.RecordCountDetailList(params).then(function (response) {
            var result = response.data;
            $scope.recordCountList = result.recordCountReportList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };  

    $scope.showDateWise = function (myTable) {
        $scope.tableName = myTable;
        $scope.clr();
        var params = {
            date: $scope.date,
            table: myTable,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.TableReportDateWiseList(params).then(function (response) {
            var result = response.data;           
            $scope.tableReportDateWiseList = result.tableReportDateWiseList;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.showUserWise = function (myDate) {

        var params = {
            table: $scope.tableName,
            date: myDate,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.UserTaskTableReportList(params).then(function (response) {
            var result = response.data;
            $scope.userTaskTableReportList = result.userTaskTableReportList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        $scope.tableReportDateWiseList = null;
        $scope.userTaskTableReportList = null;
    };

    $scope.getRecordCountList();
});