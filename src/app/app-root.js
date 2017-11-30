module.exports = {
    controller: /* @ngInject */ function() {},
    template: `
         <div class="container">
        <app-nav categories="categories" service_="subcategories"></app-nav>
        <div style="min-height:200px; padding-left:15px; padding-right:15px;" ng-view autoscroll=true></div>
        <app-footer></app-footer>
        </div>
        
        `
}