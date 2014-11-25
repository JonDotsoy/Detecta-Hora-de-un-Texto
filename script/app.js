+function(angular){
	angular.module('app',[])
	.controller('detectaHora',['$scope', function($scope){
		var d = $scope.dato = {}


		$scope.detectDatos = function (){
			// Reinicia Valores 
			d.hora = null
			d.horam = null
			d.minuto = null
			d.segundo = null

			// Detecta Hora formato 20hrs, 20hs, 20h, 2000hrs
			var sHora = /(\ |^|\n|\,|\.)([0-9]{1,2}|[0-9]{4})(\ *|:[0-9]{1,2}\ *|\ *)(hs|hrs|hr|h|hra|hras|hora|hours|horas|hour)(\ |$|\n|\,|\.)/gi.exec($scope.text)
			if (sHora) {
				var hora = sHora[2]
				// Verifica si es hora de 1 o dos cifras Ej. 1, 20, 12
				if (hora.length >= 1 && hora.length <= 2) {
					d.hora = hora
					d.horam = d.hora+"00"
				}
				// Detecta como hora Militar
				if (hora.length == 4) {
					d.horam = hora
					d.hora = hora.slice(0,2)
					d.minuto = hora.slice(2,4)
				}
			}

			// Detectar Minutos Formato 40m, 20min
			var sMinuto = /(\ |^|\n|\,|\.)([0-9]{1,2}\ *:\ *([0-9]{1,2})\ *(|hs|hrs|hr|h|hra|hras|hora|hours|horas|hour)|([0-9]{1,2})\ *(minutos|minuto|min|m))(\ |$|\n|\,|\.)/gi.exec($scope.text)
			if (sMinuto) {
				var minuto = sMinuto[3] || sMinuto[5]
				if (minuto.length >= 1 && minuto.length <= 2) {
					d.minuto = minuto
					if (d.hora) {
						d.horam = d.hora + d.minuto
					}
				}
			}

			// Detectar Minutos Formato 40m, 20min
			var sSegundo = /(\ |^|\n|\,|\.)([0-9]{1,2})\ *(segundo|segundos|seg|s)(\ |$|\n|\,|\.)/gi.exec($scope.text)
			if (sSegundo) {
				var segundo = sSegundo[2]
				if (segundo.length >= 1 && segundo.length <= 2) {
					d.segundo = segundo
				}
			}
		}

		$scope.$watch('text',$scope.detectDatos)

	}])
}(angular)