app.controller('problemDietCategoryCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    
    var id = 0;
    
    $scope.initControls = function () {
        dataFactory.InitControlsProblemDietCategory().then(function (response) {
            var result = response.data;
            $scope.problemList = result.problemList;
            $scope.categoryList = result.categoryList;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetProblemDietCategory = function () {
       
        var params = {
            id: id
        };
        dataFactory.ProblemDietCategoryList(params).then(function (response) {
            var result = response.data;
            $scope.problemDietCategoryList = result.problemDietCategoryList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveProblemDietCategory = function () {
       
            if ($scope.ddlProblem == 0) {
                toaster.pop('error', "Error", 'Please Select Problem');
                return false;
            }
            if ($scope.ddlCategory == 0) {
                toaster.pop('error', "Error", 'Please Select Category');
                return false;
            }
        
        var params = {
            id: id,
            problemID: $scope.ddlProblem,
            categoryID: $scope.ddlCategory,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)           
        };       
        dataFactory.SaveProblemDietCategory(params).then(function (response) {

            var message = id > 0 ? 'Update Problem Diet Category' : 'Save Problem Diet Category';
            $rootScope.activityLog(response, message, 'Problem Diet Category', '');

            $scope.clr();
            $scope.GetProblemDietCategory();
           
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
            dataFactory.DeleteProblemDietCategory(params).then(function (response) {
                $scope.GetProblemDietCategory();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Problem Diet Category', ' Problem Diet Category', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        
        id = paramid;
        var params = {
            id: paramid            
        };
        dataFactory.ProblemDietCategoryList(params).then(function (response) {
            var result = response.data;
            var list = result.problemDietCategoryList;
            $scope.ddlProblem = list[0].problemID;
            $scope.ddlCategory = list[0].categoryID;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.clr = function () {
        $scope.ddlProblem = 0;
        id = 0;
        $scope.ddlCategory = 0;
    };
    $scope.initControls();
    $scope.GetProblemDietCategory();
});