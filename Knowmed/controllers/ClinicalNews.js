app.controller('clinicalNewsCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var clinicalNewsId = 0;

    var formdata = new FormData();
    var pFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = [];

    $scope.initControls = function () {
        dataFactory.clinicalNewsInitControl().then(function (response) {
            var result = response.data;
            $scope.clinicalNews = result.clinicalNewsList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.getClinicalNewsFiles = function ($files) {
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

            log(result);
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



    $scope.saveClinicalNews = function () {
        if (isEmpty($scope.txtnewsTitle)) {
            toaster.pop('error', "Error", 'Please Enter News Title !!');
            return false;
        }

        for (var i = 0; i < $scope.addedPFileList.length; i++) {
            pFile = $scope.addedPFileList[0].filePath;
        }
        var params = {
            id: clinicalNewsId,
            newsTitle: $scope.txtnewsTitle,
            description: $scope.txtdescription,
            newsDate: date($scope.date),
            imagePath: pFile,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveClinicalNews(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    function date(date) {
        var a = date.split('/');
        var b = a[2] + '-' + a[1] + '-' + a[0];
        return b;
    }

    $scope.deleteClinicalNews = function (clinicalNewsId) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: clinicalNewsId,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteClinicalNews(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        clinicalNewsId = row.id;
        var params = {
            id: row.id
        }; 
        dataFactory.clinicalNewsInitControl(params).then(function (response) {
            var result = response.data.clinicalNewsList[0];
            $scope.txtnewsTitle = result.newsTitle;
            $scope.txtdescription = result.description;
            $scope.date = result.newsDate;
            $scope.addedPFileList = result.imagePath;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.txtnewsTitle = '';
        $scope.txtdescription = '';
        $scope.date = '';

        $scope.addedPFileList = [];
        addedPFiles = [];
        pFile = '';
       
        $('#fileFoodFamily').val('');
        clinicalNewsId = 0;
    };

    $scope.initControls();
});