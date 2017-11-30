module.exports = {
    controller: /*@ngInject*/ function($rootScope) {
        $rootScope.categoryFinder = [null, null];
    },
    template: require("./home.html")
}