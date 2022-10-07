app.controller('clinicalCalendarCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var clinicalId = 0;
    var formdata = new FormData();
    var pFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = [];

    $scope.initControls = function () {
        dataFactory.clinicalCalendarInitControl().then(function (response) {
            var result = response.data;
            $scope.clinicalList = result.clinicalList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getClinicalFiles = function ($files) {
        formdata = new FormData();
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);

        });
        $scope.addNewsFiles();
    };

    $scope.addNewsFiles = function () {
        addedPFiles = [];
        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;
            for (var i = 0; i < result.length; i++) {
                if (i == (result.length - 1)) {
                    addedPFiles.push({
                        filePath: result[i]
                    });
                }
            }

            $scope.addedPFileList = addedPFiles;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveClinicalCalendar = function () {

        if (isEmpty($scope.txtdayTitle)) {
            toaster.pop('error', "Error", 'Please Enter Day Title !!');
            return false;
        }
        for (var i = 0; i < $scope.addedPFileList.length; i++) {
            pFile = $scope.addedPFileList[0].filePath;
        }
        var params = {
            id: clinicalId,
            dayTitle: $scope.txtdayTitle,
            dayFrom: $scope.txtdayFrom,
            dayTo: $scope.txtdayTo,
            month: $scope.txtmonth,
            description: $scope.txtdescription,
            imagePath: pFile,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveClinicalCalendar(params).then(function (response) {
            var message = clinicalId > 0 ? 'Update Clinical Calendar' : 'Save Clinical Calendar';
            $rootScope.activityLog(response, message, 'Clinical Calendar', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };


    $scope.deleteClinicalCalendar = function (clinicalId) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: clinicalId,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteClinicalCalendar(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Clinical Calendar', 'Clinical Calendar', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    
    $scope.edit = function (row) {
        clinicalId = row;
        var params = {
            id: row
        };
        dataFactory.clinicalCalendarInitControl(params).then(function (response) {
            var result = response.data.clinicalList[0];
            $scope.txtdayTitle = result.dayTitle;
            $scope.txtdayFrom = result.dayFrom;
            $scope.txtdayTo = result.dayTo;
            $scope.txtmonth = result.month;
            $scope.txtdescription = result.description;
            $scope.addedPFileList = result.imagePath;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
   

    $scope.clr = function () {

        $scope.txtdayTitle = '';
        $scope.txtdayFrom = '';
        $scope.txtdayTo = '';
        $scope.txtmonth = '';
        $scope.txtdescription = '';

        $scope.addedPFileList = [];
        //fileDesc = [];
        addedPFiles = [];
        pFile = '';

        $('#fileFoodFamily').val('');
        clinicalId = 0;
    };

    $scope.initControls();
});