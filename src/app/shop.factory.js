module.exports = {


    navText1: "The slogan goes here",
    callNow: "Call Now (555) 000 000",
    navText2: "Sales Website",
    footerText1: "742 Evergreen Terrace, Springfield",
    footerText2: "Fax: (555) 000 000",
    footerText3: "Copyright. All Rights Reserved",
    postTitle: " - my website - my slogan",
    name: "Website Name",
    specialURL: "",
    telNumber: "001555000000",


    searchBoxC: { template: '<input style=" width: 100%; font-size: 1rem; padding: 1rem;" type="text" name="" ng-model="$root.search" ng-click="hayley()" placeholder="Search">' },

    padwithzeroes: function(number, length) {
        var my_string = '' + number;
        while (my_string.length < length) { my_string = '0' + my_string; }
        return my_string
    },


    breadcrumb: () => {

        var returnfromobject = (categories, x) => { return categories }
        var c_link = "category/"
        var sc_link = "subcategory/"
        var p_link = "product/"

        var fy;

        return {

            fy: "",

            categoryFromSubcategoryNumber: (subcategories, scid) => { return subcategories["sc" + scid].parent },
            subcategoryFromProductNumber: (products, pid) => { return products["id" + pid].sc },

            categoryArray: (categories, cid) => {
                return [{
                    "obj": categories["id" + cid],
                    "active": 1,
                    "link": c_link + categories["id" + cid].id
                }]
            },

            subcategoryArray: (categories, subcategories, cid, scid) => {
                return [
                    { "obj": categories["id" + cid], "active": 0, "link": c_link + categories["id" + cid].id },
                    { "obj": subcategories["sc" + scid], "active": 1, "link": sc_link + scid }
                ];
            },

            productArray: (categories, subcategories, products, cid, scid, pid) => {

                return [
                    { "obj": categories["id" + cid], "active": 0, "link": c_link + categories["id" + cid].id },
                    { "obj": subcategories["sc" + scid], "active": 0, "link": sc_link + scid },
                    { "obj": products["id" + pid], "active": 1, "link": p_link + pid }
                ];
            },
        }
    },


    categories: {
        "id1": { "id": 1, "name": "Category 1" },
        "id2": { "id": 2, "name": "Category 2" },
    },

    subcategories: {
        "sc1": { "id": 1, "parent": 1, "name": "Sub Catgeory 1" },
        "sc2": { "id": 2, "parent": 1, "name": "Sub Category 2" },
        "sc3": { "id": 3, "parent": 2, "name": "Sub Category 3" },
    },

    products: {
        "id1": { "id": 1, "name": "ABC Product", "c": 1, "sc": 1 },
        "id2": { "id": 2, "name": "DEF Product", "c": 1, "sc": 1 },
        "id3": { "id": 3, "name": "GHI Product", "c": 1, "sc": 2 },
        "id4": { "id": 4, "name": "JKL Product", "c": 1, "sc": 2 },
        "id5": { "id": 5, "name": "MNO Product", "c": 2, "sc": 2 },
        "id6": { "id": 6, "name": "PQR Product", "c": 2, "sc": 3 },
        "id7": { "id": 7, "name": "STU Product", "c": 2, "sc": 3 },
    }



}