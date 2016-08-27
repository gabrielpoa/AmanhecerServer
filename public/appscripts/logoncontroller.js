angular.module('logonmodule',[])
 .controller('logoncontroller', ['$scope','$http',
   function($scope, $http) {
     $scope.logonUsuario = function() {
       var objeto = {email: $scope.email,
          senha: $scope.senha};
       console.log("Enviando: " + JSON.stringify(objeto));           
       $http.post('/usuarios/logon',objeto, {headers: {'Content-Type': 'application/json'}})
          .success(function(data,status) {
            var token = btoa("{\"email\" : \"" 
                       + $scope.email 
                       + "\", \"senha\" : \"" 
                       + $scope.senha + "\"}");
            $http.defaults.headers.common.Authorization = 'BASIC ' + token;
            sessionStorage.token = token;
            console.log("Login OK");
            window.location.href = "/";
          })
          .error(function(data, status) {
          });
     };
   }
]);