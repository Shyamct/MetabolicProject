 app.filter('renderHTMLCorrectly', function ($sce) {
     return function (stringToParse) {        
         if (stringToParse.length>0) {
             return $sce.trustAsHtml(stringToParse);
         } else {
             return "";
         }
       
    }
})
.filter('getprice', function () {
    return function (value, property) {
        var total = 0;
        angular.forEach(value, function (val, index) {
            total = total + parseInt(val.amt)
        });
        return total;
    }
});
