module.exports = {
    controller: /*@ngInject*/ function(products, $scope, $rootScope) {
        console.log("loaded................");
        $rootScope.categoryFinder = [null, null];
        $scope.products_array = [];
        angular.forEach(products, function(v, k) { $scope.products_array.push(v); });
        this.$onInit = function() {};
    },
    template: require("./search.html")
}