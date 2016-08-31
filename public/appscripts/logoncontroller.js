angular.module('logonmodule',[])
 .controller('logoncontroller', ['$scope','$http',
   function($scope, $http) {
     $scope.logonUsuario = function() {
       var objeto = {email: $scope.email,
          senha: $scope.senha};
       console.log("Enviando: " + JSON.stringify(objeto));           
       $http.post('/usuarios/logon',objeto, {headers: {'Content-Type': 'application/json'}})
          .success(function(data,status) {
        	//var response = JSON.parse(data);
        	
            //var xmlHttp = new XMLHttpRequest();
            //xmlHttp.open('Get', '/', true);
            //xmlHttp.setRequestHeader('Authorization', 'BASIC ' + data.token);
            //xmlHttp.send();

 	  
        	  
            //sessionStorage.token = data.token;
            $http.defaults.headers.common.Authorization = 'BASIC ' + data.token;
            //$http.get   .url('/');
            //console.log("Login OK");
            window.location.header
            window.location.replace("/");
          })
          .error(function(data, status) {
          });
     };
   }
]);