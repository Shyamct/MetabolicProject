app.controller('headerCtrl', function ($scope, ASSETS, dataFactory, $rootScope) {
    $rootScope.SiteMenu = generateMenus();
   
    //log(UtilsCache.getSession('MENUASSIGN'));
    //$rootScope.SiteMenu=UtilsCache.getSession('MENUASSIGN');
    //log($rootScope.SiteMenu);
});