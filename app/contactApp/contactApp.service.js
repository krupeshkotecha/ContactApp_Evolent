(function() {
    "use strict";
    var fs = require('fs');
    app.service("contactService", ["$http", "$q", function($http, $q) {
        this.fetchData = function() {
            var def = $q.defer();
            $http.get("../../dataJson.json").then(function successCallback(data) {
                def.resolve(data);
            }, function errorCallback(response) {
                def.reject(response);
            });
            return def.promise;
        }

        this.saveData = function(data) {
            fs.writeFile("./resources/dataJson.json",angular.toJson(data), 'utf8', function(msg) {
                console.log("Data Updated");
            });
        }
    }])
}());