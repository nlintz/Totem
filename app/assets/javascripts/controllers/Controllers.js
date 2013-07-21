Controllers = angular.module('Controllers', ['Services']);

Controllers.controller('SplashController', ['$scope', function($scope) {
    $scope.transition_to_login = "false";
    $scope.transition = function(){
    	$scope.hide_logo = 'hide-logo';
    	$scope.hide_logo_container = 'hide-logo-container';
    }
}]);

Controllers.controller('BuildController', ['$scope', '$routeParams', 'TotemFlows', 'TotemBlocks', function($scope, $routeParams, TotemFlows, TotemBlocks) {
    $scope.totemBlocks = []
    $scope.totemFlow = TotemFlows.get({totem_flow_id:$routeParams.totemFlowId})
	$scope.totemBlocks = TotemBlocks.query({totem_flow_id: $routeParams.totemFlowId}, function(data){
        for (i in $scope.totemBlocks) {
            $scope.totemBlocks[i].title = $scope.totemBlocks[i].title ? $scope.totemBlocks[i].title : "Add Title"
            $scope.totemBlocks[i].content = $scope.totemBlocks[i].content ? $scope.totemBlocks[i].content : "Add Text"
        }
        if ($scope.totemBlocks.length > 0){
        $scope.selectedBlockIndex = 0
        // $scope.showImageUrl = $scope.totemBlocks[0].block_image_url;
        }
    })
    
    
    // $scope.sortableTotemBlocks = {
    //     update: function(e, ui){
    //         // var newPositions = $('#totemBlocksList').sortable('toArray');
    //         // // console.log($('#totemBlocksList').sortable('toArray'))
    //         // angular.forEach($scope.totemBlocks, function(totemBlock){
    //         //     console.log(totemBlock.position)
    //         //     totemBlock.position = parseInt(newPositions[totemBlock.position])
    //         //     console.log(totemBlock.position)
    //         // })
    //         // $scope.showImageUrl = $scope.totemBlock
    //     }
    // }

    $scope.setSelectedBlock = function(totemBlock, index) {
        $scope.selectedBlockIndex = index
        $scope.showImageUrl = $scope.totemBlocks[$scope.selectedBlockIndex].block_image_url;
    }
    $scope.addBlock = function(){
        console.log($scope.totemBlocks)
        var newBlock = {
            position: $scope.totemBlocks.length
        }
        $scope.totemBlocks.push(newBlock)
        $scope.selectedBlockIndex = ($scope.totemBlocks.length - 1)
        
        var totemFlowId = $scope.totemFlow.id
        $.post("/build/totem_flows/"+totemFlowId + "/" + 'createNew', function(data){
            $scope.totemBlocks[$scope.selectedBlockIndex] = data;
        });
    }

    $scope.removeBlock = function() {
        if ($scope.totemBlocks.length == 0){
            return
        }
        else if ($scope.totemBlocks.length == 1){
            var deleteBlock = $scope.totemBlocks[0]
            $scope.totemBlocks.splice(0, 1)
            TotemBlocks.delete({totem_flow_id: $routeParams.totemFlowId, totem_block_id: deleteBlock.id})
        }
        else {
            var deleteBlock = $scope.totemBlocks.splice($scope.selectedBlockIndex, 1)[0]
            console.log(deleteBlock, $scope.selectedBlockIndex)
            TotemBlocks.delete({totem_flow_id: $routeParams.totemFlowId, totem_block_id: deleteBlock.id})
        }
    }
    $scope.nextBlock = function() {
        $scope.selectedBlockIndex += 1;
    }
    $scope.previousBlock = function() {
        $scope.selectedBlockIndex -= 1;
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
        $scope.totemBlocks[$scope.selectedBlockIndex]
		var totemFlowId = $scope.totemFlow.id
		var totemBlockId = $scope.totemBlocks[$scope.selectedBlockIndex].id
        var imgUrl = InkBlob[0].url;
        $.post("/image-upload/"+totemFlowId + "/" + totemBlockId, {block_image_url: InkBlob[0].url});
        $scope.totemBlocks[$scope.selectedBlockIndex].block_image_url = imgUrl;
        $scope.$apply()
    },
    onError: function(type, message) {
        $("#uploadPreview").text('('+type+') '+ message);
    },
    onProgress: function(percentage) {
        $("#drop-target").text("Uploading ("+percentage+"%)");
    }

	})
}]);