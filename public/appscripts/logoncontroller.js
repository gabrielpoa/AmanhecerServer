angular.module('logonmodule',[])
 .controller('logoncontroller', ['$scope','$http',
   function($scope, $http) {
     $scope.logonUsuario = function() {
       var objeto = {email: $scope.email,
          senha: $scope.senha};
       console.log("Enviando: " + JSON.stringify(objeto));           
       $http.post('/usuarios/logon',objeto, {headers: {'Content-Type': 'application/json'}})
          .success(function(data,status) {

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open('Get', '/', true);
            xmlHttp.onreadystatechange=function() {
                if (xmlHttp.readyState==4) {
                	document.open("text/html", "replace");
                	document.write(xmlHttp.responseText);
                	document.close();
                } 
            }
            xmlHttp.setRequestHeader('Authorization', 'BASIC ' + data.token);
            xmlHttp.send();
          })
          .error(function(data, status) {
          });
     };
   }
]);