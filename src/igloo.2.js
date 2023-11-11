/*
Igloo
Single Page Application (SPA) router for static site.
Developed by: Kevin
https://github.com/iskevinlemon

version 2.0

Last updated on 06/11/2023
*/

var $DOC = this.document;

$DOC.addEventListener("click", function (event) {
    if (event.target && event.target.getAttribute("route")) {
        var route = event.target.getAttribute("route");
        window.location.href= `/#/${route}`;
        // console.log(`Route is: /#/${route}`);
    }
});

(function (window) {
    
  // Selector
  function $$(a) {return document.querySelector(a);}

  window.$Igloo = function (config) {
    document.addEventListener("DOMContentLoaded", function() {
     
      // Ensures that the <a> tag with route attribute has a cursor as pointer
      document.body.innerHTML += `<style>[route]{cursor: pointer !important}</style>`;

      var defaultRoute = config.default_path;
      
      var currentRoute = window.location.hash.substring(2);
      console.log(`Current route is: ${currentRoute}`)
      if (currentRoute === "" || currentRoute == "") {
        currentRoute = `${config.default}`; // slash(/) path

        if (defaultRoute !== "") {
            currentRoute = defaultRoute;
          // window.location.hash = "#" + $CurrentRoute;
          window.location.hash = "#/" + currentRoute;
        }

      }

      // Specifies which folder all the pages will be stored in
      var VIEWS_FOLDER = config.folder;

      // Root div
      var rootDiv = $$(config.root);

      // Route scope
      var routeScope = config.scope;

      /*
        Experimetal features. Aka pretty URL
        DOES NOT support page refresh
      */ 
       var prettyUrl = config.prettyUrl;
      
      // Error scope
      var errScope = config.error;
      var loadPage = function (route, changeURL) {
        if (routeScope.includes(route)) {
          var url = VIEWS_FOLDER + "/" + route + ".html";
          fetch(url)
            .then(function (response) {return response.text();})
            .then(function (html) {
              rootDiv.innerHTML = `${html}`;
              if (changeURL) {
                history.pushState({}, "", route);
              }
            })
            .catch(function (error) {
              console.error("Error fetching page: ", error);
            });
        } 
        else {
          var url = VIEWS_FOLDER + "/" + errScope + ".html";
          fetch(url)
            .then(function (response) {return response.text();})
            .then(function (html) {
              rootDiv.innerHTML = html;
              // console.log(`Current route: ${route}`);
              if (changeURL) {
                history.pushState({}, "", route);
              }
            })
            .catch(function (error) {
              console.error("Error fetching page: ", error);
            });
        }
      };

      window.addEventListener("popstate", function (event) {
        // var currentRoute = window.location.hash.substring(1);
        var currentRoute = window.location.hash.substring(2);
        loadPage(currentRoute, prettyUrl);
      });

      // Check the current route on page load
      loadPage(currentRoute, prettyUrl);
      
    });
  };
})(window);
