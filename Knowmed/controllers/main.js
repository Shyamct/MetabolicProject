app.controller('mainCtrl', function ($scope, $state, toaster,$rootScope) {
    $scope.openNav = function () {
        document.getElementById("mySidenav").style.width = "23.5rem";
    };

    $scope.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
    };

    $scope.userOptions = function () {
        document.getElementById("userDropdown").classList.toggle("show");
    };

    $scope.showDashboard = function () {
        $state.go('dashboard');
        //UtilsCache.removeSession("ASSIGNCONTROL");
        //UtilsCache.removeSession("DEPTDETAILS");
        //UtilsCache.removeSession("HEADID");
        //UtilsCache.removeSession("MENUASSIGN");
        //UtilsCache.removeSession("SUBDEPT");
    };
   
    //$("body").slimScroll({
    //    size: '5px',
    //    width: '100%',
    //    height: '100%',
    //    color: '#0f326a',
    //    allowPageScroll: false,
    //    alwaysVisible: false
    //});
});












