Controllers = angular.module('Controllers', ['Services']);

Controllers.controller('SplashController', ['$scope', function($scope) {
    $scope.transition_to_login = "false";
    $scope.transition = function(){
    	$scope.hide_logo = 'hide-logo';
    	$scope.hide_logo_container = 'hide-logo-container';
    }
}]);

Controllers.controller('BuildController', ['$scope', 'TotemFlows', 'TotemBlocks', function($scope, TotemFlow, TotemBlocks) {
	$scope.items = TotemBlocks.get({totem_flow_id: 1})
	filepicker.setKey('A4Diahs8GTUutiDyZ8MGPz');
	$scope.items = [1,2,3,4,5,6,7,8]
	// $scope.firstFlow = TotemFlow.get({totemFlowId: 1});
	// filepicker.pick(function(InkBlob){
  // console.log(InkBlob.url);

	
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
        $.post("");
    },
    onError: function(type, message) {
        $("#uploadPreview").text('('+type+') '+ message);
    },
    onProgress: function(percentage) {
        $("#drop-target").text("Uploading ("+percentage+"%)");
    }

	})
}]);