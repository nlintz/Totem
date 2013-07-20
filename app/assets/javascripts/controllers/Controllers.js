Controllers = angular.module('Controllers', ['Services']);

Controllers.controller('SplashController', ['$scope', function($scope) {
    $scope.transition_to_login = "false";
    $scope.transition = function(){
    	$scope.hide_logo = 'hide-logo';
    	$scope.hide_logo_container = 'hide-logo-container';
    }
}]);

Controllers.controller('BuildController', ['$scope', '$routeParams', 'TotemFlows', 'TotemBlocks', function($scope, $routeParams, TotemFlow, TotemBlocks) {
	$scope.totemBlocks = TotemBlocks.query({totem_flow_id: $routeParams.totemFlowId})
	// if (!$scope.totemBlocks[0]){
	// 	$scope.totemBlocks[0]=[1]
	// 	$scope.apply()
	// }
	$scope.totemBlocks = [1]
	console.log($scope.totemBlocks[0])
	filepicker.setKey('A4Diahs8GTUutiDyZ8MGPz');
	filepicker.makeDropPane($('#drop-target')[0], {
		    multiple: false,
    dragEnter: function() {
        $("#drop-target").html("Drop to upload").css({
            'backgroundColor': "#E0E0E0",
            'border': "1px solid #000"
        });
    },
    dragLeave: function() {
        $("#drop-target").html("Drop files here").css({
            'backgroundColor': "#F6F6F6",
            'border': "1px dashed #666"
        });
    },
    onSuccess: function(InkBlob) {
    	$('#drop-target').hide()
        $("#drop-target").text("Done, see result below");
        console.log(InkBlob[0].url)
        $("#uploadPreview").attr('src', InkBlob[0].url)
        $.post("/image-upload/:totem_flow_id/:totem_block_id'");
    },
    onError: function(type, message) {
        $("#uploadPreview").text('('+type+') '+ message);
    },
    onProgress: function(percentage) {
        $("#drop-target").text("Uploading ("+percentage+"%)");
    }

	})
}]);