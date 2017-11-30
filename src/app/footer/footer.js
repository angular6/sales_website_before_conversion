module.exports = {
    controller: /* @ngInject */ function($scope, shop) {

    $scope.footerText1 = shop.footerText1
    $scope.footerText2 = shop.footerText2
    $scope.footerText3 = shop.footerText3



    },
    template: require("./footer.html")
}