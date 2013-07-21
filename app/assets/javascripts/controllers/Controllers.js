Controllers = angular.module('Controllers', ['Services']);

Controllers.controller('SplashController', ['$scope', function($scope) {
    $scope.transition_to_login = "false";
    $scope.transition = function(){
    	$scope.hide_logo = 'hide-logo';
    	$scope.hide_logo_container = 'hide-logo-container';
    }
}]);

Controllers.controller('BuildController', ['$scope', '$routeParams', 'TotemFlows', 'TotemBlocks', function($scope, $routeParams, TotemFlows, TotemBlocks) {
    $scope.totemFlow = TotemFlows.get({totem_flow_id:$routeParams.totemFlowId})
	$scope.totemBlocks = TotemBlocks.query({totem_flow_id: $routeParams.totemFlowId}, function(data){
        $scope.selectedBlockIndex = 0;
        $scope.selectedBlock = data[$scope.selectedBlockIndex];
        for (i in $scope.totemBlocks) {
            $scope.totemBlocks[i].title = $scope.totemBlocks[i].title ? $scope.totemBlocks[i].title : "Add Title"
            $scope.totemBlocks[i].content = $scope.totemBlocks[i].content ? $scope.totemBlocks[i].content : "Add Text"
        }
    })
    
    $scope.setSelectedBlock = function(totemBlock, index) {
        $scope.selectedBlock = totemBlock;
        $scope.selectedBlockIndex = index;
    }
    $scope.addBlock = function(){
        var newBlock = []
        $scope.totemBlocks.push(newBlock)
        $scope.selectedBlock = $scope.totemBlocks[$scope.totemBlocks.length -1]
        $scope.selectedBlockIndex = $scope.totemBlocks.indexOf($scope.selectedBlock)
        
        $scope.selectedBlock.title = $scope.selectedBlock.title ? $scope.selectedBlock.title : "Add Title"
        $scope.selectedBlock.content = $scope.selectedBlock.title ? $scope.selectedBlock.text : "Add Text"
        var totemFlowId = $scope.totemFlow.id
        $.post("/build/totem_flows/"+totemFlowId + "/" + 'createNew', function(data){
            $scope.totemBlocks[$scope.selectedBlockIndex] = data;
            $scope.selectedBlock = $scope.totemBlocks[$scope.selectedBlockIndex]
        });
    }

    $scope.removeBlock = function() {
        if ($scope.totemBlocks.length == 0){
            return
        }
        else if ($scope.totemBlocks.length == 1) {
            TotemBlocks.delete({totem_flow_id: $routeParams.totemFlowId, totem_block_id: $scope.selectedBlock.id})
            
            $scope.totemBlocks.splice($scope.totemBlocks.indexOf($scope.selectedBlock), 1)
        }
        else {
            TotemBlocks.delete({totem_flow_id: $routeParams.totemFlowId, totem_block_id: $scope.selectedBlock.id})
            var index = $scope.totemBlocks.indexOf($scope.selectedBlock)
            $scope.totemBlocks.splice($scope.totemBlocks.indexOf($scope.selectedBlock)-1, 1)
        }

    }

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
    	// $('#drop-target').hide()
        $("#drop-target").text("Done, see result below");
        $("#uploadPreview").attr('src', InkBlob[0].url)

		var totemFlowId = $scope.totemFlow.id
		var totemBlockId = $scope.selectedBlock.id
        var imgUrl = InkBlob[0].url;
        $scope.selectedBlock.block_image_url = imgUrl;
        $scope.$apply()
        $.post("/image-upload/"+totemFlowId + "/" + totemBlockId, {block_image_url: InkBlob[0].url});
    },
    onError: function(type, message) {
        $("#uploadPreview").text('('+type+') '+ message);
    },
    onProgress: function(percentage) {
        $("#drop-target").text("Uploading ("+percentage+"%)");
    }

	})
}]);