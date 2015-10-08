angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/about/about.html","<div class=\"container text-center\"><div class=\"col-xs-12 col-md-6 col-sm-6 col-lg-6 perspic\"><img data-ng-src={{vm.perspic}} alt></div><div class=\"col-xs-12 col-md-6 col-sm-6 col-lg-6 perspic-text\"><div class=pasus><p>Lorem ipsum dolor sit amet, pri cu dissentiet adversarium, per iudico everti eligendi an. Ad vidit sententiae mei. Vis ponderum reformidans ut, legere salutatus dissentiet duo eu. Ei sadipscing omittantur quo. Vix quod fabellas scriptorem ex, harum facilis sea ut.</p></div><div class=pasus><p>Lorem ipsum dolor sit amet, pri cu dissentiet adversarium, per iudico everti eligendi an. Ad vidit sententiae mei. Vis ponderum reformidans ut, legere salutatus dissentiet duo eu. Ei sadipscing omittantur quo. Vix quod fabellas scriptorem ex, harum facilis sea ut.</p></div><div class=pasus><p>Lorem ipsum dolor sit amet, pri cu dissentiet adversarium, per iudico everti eligendi an. Ad vidit sententiae mei. Vis ponderum reformidans ut, legere salutatus dissentiet duo eu. Ei sadipscing omittantur quo. Vix quod fabellas scriptorem ex, harum facilis sea ut.</p></div></div></div>");
$templateCache.put("app/admin/admin.html","<section class=mainbar><section class=matter><div class=container><div class=row><div class=\"widget wviolet\"><div ht-widget-header title={{vm.title}}></div><div class=\"widget-content user\"><h3>TODO: Implement Your Features</h3></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>");
$templateCache.put("app/contact/contact.html","<div class=\"container text-center\"><div class=\"col-xs-12 col-md-6 col-sm-6 col-lg-6 contact-form\"><form action role=form><div class=form-group><label class=\"label label-form\" for=name>Your name</label> <input type=text class=form-control id=name></div><div class=form-group><label class=\"label label-form\" for=email>Your email address</label> <input type=email class=form-control id=email></div><div class=form-group><label class=\"label label-form\" for=subject>Subject</label> <input type=text class=form-control id=subject></div><div class=form-group><label class=\"label label-form\" for=content>Your message</label> <textarea class=form-control id=content rows=10></textarea></div></form></div><div class=\"col-xs-12 col-md-6 col-sm-6 col-lg-6 contact-social\"><label class=\"label label-form\">Social</label><ul><li><a href><i class=\"fa fa-facebook-official\"></i> Facebook</a></li><li><a href><i class=\"fa fa-twitter\"></i> Twitter</a></li><li><a href><i class=\"fa fa-linkedin\"></i> Linkedin</a></li><li><a href><i class=\"fa fa-flickr\"></i> Flickr</a></li></ul></div></div>");
$templateCache.put("app/core/404.html","<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-12><ul class=today-datas><li class=bred><div class=pull-left><i class=\"fa fa-warning\"></i></div><div class=\"datas-text pull-right\"><a><span class=bold>404</span></a>Page Not Found</div><div class=clearfix></div></li></ul></div></div><div class=row><div class=\"widget wblue\"><div ht-widget-header title=\"Page Not Found\" allow-collapse=true></div><div class=\"widget-content text-center text-info\"><div class=container>No soup for you!</div></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>");
$templateCache.put("app/dashboard/dashboard.html","<section id=dashboard-view class=mainbar></section>");
$templateCache.put("app/home/home.html","<div class=\"container text-center\"><div class=row><div infinite-scroll=vm.loadMore() infinite-scroll-distance=1><div class=outer-box data-ng-repeat=\"pic in vm.pics track by $index\"><a ng-click=vm.openLightboxModal($index)><img ng-src={{pic.thumbUrl}} alt><div class=inner-box></div></a><div><h3 class=pic-title>{{ pic.title }}</h3><p class=pic-caption>{{ pic.id }} {{ pic.caption }}</p></div></div></div></div></div>");
$templateCache.put("app/layout/ht-top-nav.html","<nav class=nav><ul class=nav-horizontal><li><a ui-sref=home>Home</a></li><li><a ui-sref=about>About</a></li><li><a ui-sref=contact>Contact</a></li></ul></nav>");
$templateCache.put("app/layout/shell.html","<div ng-controller=\"ShellController as vm\"><header><a ui-sref=home><img id=logo src=../images/logo.png width=130px></a><ht-top-nav navline=vm.navline></ht-top-nav></header><section id=content class=content><div ui-view class=shuffle-animation></div><div ngplus-overlay ngplus-overlay-delay-in=50 ngplus-overlay-delay-out=700 ngplus-overlay-animation=dissolve-animation><img src=images/busy.gif><div class=\"page-spinner-message overlay-message\">{{vm.busyMessage}}</div></div></section><footer><div class=container-fluid><p>&copy; 2015 <span><a href={{vm.twitter.igor}} class=twitter><i class=\"fa fa-twitter\"></i> @igordilic</a></span></p></div></footer></div>");
$templateCache.put("app/layout/sidebar.html","<div ng-controller=\"SidebarController as vm\"><ht-sidebar when-done-animating=vm.sidebarReady()><div class=sidebar-filler></div><div class=sidebar-dropdown><a href=#>Menu</a></div><div class=sidebar-inner><div class=sidebar-widget></div><ul class=navi><li class=\"nlightblue fade-selection-animation\" ng-class=vm.isCurrent(r) ng-repeat=\"r in vm.navRoutes\"><a ui-sref={{r.name}} ng-bind-html=r.settings.content></a></li></ul></div></ht-sidebar></div>");
$templateCache.put("app/widgets/widget-header.html","<div class=widget-head><div class=\"page-title pull-left\">{{title}}</div><small class=page-title-subtle ng-show=subtitle>({{subtitle}})</small><div class=\"widget-icons pull-right\"></div><small class=\"pull-right page-title-subtle\" ng-show=rightText>{{rightText}}</small><div class=clearfix></div></div>");}]);