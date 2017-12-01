module.exports = {

    controller: /* @ngInject */ function(shop, products, breadcrumb, subcategories, categories, $scope, $rootScope, $location, $route) {

            $scope.navText1 = shop.navText1
            $scope.navText2 = shop.navText2
            var hayley = () => { breadcrumb.fy = 1 }
            hayley();
            console.log(breadcrumb)
            $rootScope.$watch('categoryFinder', () => {
                //reset
                $scope.hide_margin_under_breadcrumb = 1;
                $scope.breadcrumb_array = [];
                $scope.show_breadcrumb = 0;
                $scope.show_breadcrumb_2 = 0;
                $scope.light_up_li_repeated_category = () => { return 0 }

                var c = $rootScope.categoryFinder

                if (c[0] != null) {

                    var component_type = c[1];
                    var component_number = c[0];

                    $scope.hide_margin_under_breadcrumb = component_type == null ? 1 : 0;
                    $scope.hide_margin_under_breadcrumb = component_number == 82 ? 1 : 0;

                    if (component_type == "c") {

                        var category_id = component_number;
                        $scope.show_breadcrumb_2 = 1;
                        $scope.breadcrumb_array = breadcrumb.categoryArray(categories, category_id);
                    }

                    if (component_type == "s") {

                        var subcategory_id = component_number;
                        var category_id = breadcrumb.categoryFromSubcategoryNumber(subcategories, subcategory_id)

                        $scope.show_breadcrumb_2 = 1;
                        $scope.show_breadcrumb = 1;
                        $scope.breadcrumb_array = breadcrumb.subcategoryArray(categories, subcategories, category_id, subcategory_id);

                    }

                    if (component_type == "p") {

                        var product_id = component_number;
                        var subcategory_id = breadcrumb.subcategoryFromProductNumber(products, product_id)
                        var category_id = breadcrumb.categoryFromSubcategoryNumber(subcategories, subcategory_id)

                        $scope.show_breadcrumb_2 = 1;
                        $scope.show_breadcrumb = 1;
                        $scope.breadcrumb_array = breadcrumb.productArray(categories, subcategories, products, category_id, subcategory_id, component_number);
                    }

                    $scope.light_up_li_repeated_category = li_repeated_category => { if (li_repeated_category == category_id) return 1 }
                }

            })

            $scope.categories = categories
            $scope.page_is_search = () => { if ($location.path == "/dublin/search") return 1; return 0 }
            $scope.changeLocationPath = () => { $location.path('/dublin/search') }
        },


    template: require("./nav.html")

}