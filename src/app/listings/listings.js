module.exports = {

    controller: /* @ngInject */ function(subcategories, products, $routeParams, $rootScope, $scope) {

        this.$onInit = function() {

            var oninit__bindings_typeoflistings = this.typeoflistings;
            var oninit__bindings_number = this.number == undefined ? false : this.number;
            var oninit__routeparamsx = $routeParams.x == undefined ? false : $routeParams.x;

            var component_number = Number(returnComponentNumber(oninit__bindings_number, oninit__routeparamsx));

            results(oninit__bindings_typeoflistings, component_number);

            $rootScope.categoryFinder = [component_number, oninit__bindings_typeoflistings];

        };

        function returnComponentNumber(oninit__bindings_number, oninit__routeparamsx) {

            try {
                if (oninit__bindings_number != false) return oninit__bindings_number;
                if (oninit__routeparamsx != false) return oninit__routeparamsx;
            } catch (err) {
                console.log('No Component Number', err);
            }
        }

        function results(oninit__bindings_typeoflistings, component_number) {

            if (oninit__bindings_typeoflistings == "s") {

                console.log("this listing type is a subcategory (list of products)");
                var arrayToLookForStuff = products;
                var keyToLookFor = "sc";
                $scope.image = "images/thumbnails_100/100_";
                $scope.link = $rootScope.PRE_LINK + "product/";

            }
            if (oninit__bindings_typeoflistings == "c") {

                console.log("this listing type is category (list of subcategories)");
                var arrayToLookForStuff = subcategories;
                var keyToLookFor = "parent";
                $scope.image = "images/app/100_";
                $scope.link = $rootScope.PRE_LINK + "subcategory/";
                $scope.temp = 1
                $scope.category_id = component_number

            }

            $scope.results = [];
            angular.forEach(arrayToLookForStuff, function(v, k) { if (v[keyToLookFor] == component_number) { $scope.results.push(v); } });

        }

    },

    template: require("./listings.html"),
    bindings: { typeoflistings: '@', number: '@' }
}