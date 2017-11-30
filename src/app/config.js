module.exports = {

    config: /* @ngInject */ function(shopProvider, $routeProvider, $locationProvider) {

        console.log(shopProvider)

        var name = shopProvider.$get().name
        var postTitle = shopProvider.$get().postTitle
        var product
        
        $routeProvider
            .when("/",                          { title: name + postTitle , template: "<app-home></app-home>" })
            .when("/dublin/category/1",         { title: "Category" + postTitle, template: "<app-listings typeoflistings='c' number='1'></app-category-listings>" })
            .when("/dublin/category/2",         { title: "Category" + postTitle, template: "<app-listings typeoflistings='c' number='2'></app-category-listings>" })
            .when("/dublin/search",             { title: "search" + postTitle, template: "<app-search></app-search" })
            .when("/dublin/subcategory/:x",     { title: "Subcategory" + postTitle, template: "<app-listings typeoflistings='s'></app-listings>" })
            .when("/dublin/product/:product",   { title: product + postTitle, template: "<app-product></app-product>" })
            .otherwise("/")

    }

}