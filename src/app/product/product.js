module.exports = {

    controller: /* @ngInject */ 
    function( shop, subcategories, $routeParams, $scope, $rootScope, products, $firebaseObject, padwithzeroes) {

        $scope.callNow = shop.callNow
        $scope.telNumber = shop.telNumber

        var component_number = Number($routeParams.product);
        var ref = firebase.database().ref().child('id' + component_number);
        var typeOfProductListing = "normal";

        $rootScope.categoryFinder = [component_number, "p"];
        $rootScope.search = "";

        if (component_number == 82) { typeOfProductListing = "special"; }
        $scope.special__create_element = typeOfProductListing == "special" ? 1 : 0;
        $scope.normal__create_element = typeOfProductListing == "normal" ? 1 : 0;

        $scope.product_object = products["id" + component_number];
        $scope.NameOfImageFileForThisProduct = padwithzeroes(component_number, 6);
        $scope.theNameOfTheSubcategoryOfThisProduct = subcategories["sc" + $scope.product_object.sc].name;

        $scope.hayley = "<img src='images/app/loading5.gif'>";
        $firebaseObject(ref).$loaded()
            .then(function(x) {
                $scope.hayley = x.data1;
                $scope.hayley2 = x.data2;
            })
            .catch(function(error) { console.error("Error:", error); });

        function document_height() {

            var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
            var _docWidth = (document.width !== undefined) ? document.width : document.body.offsetWidth;
            console.log(_docHeight, _docWidth);

        }

    },
    template: require("./product.html")

}