Controllers = angular.module('Controllers', ['Services']);

Controllers.controller('SplashController', ['$scope', function($scope) {
    $scope.transition_to_login = "false";
    $scope.transition = function(){
    	$scope.hide_logo = 'hide-logo';
    	$scope.hide_logo_container = 'hide-logo-container';
    }
}]);

Controllers.controller('BuildController', ['$scope', '$routeParams', '$http', 'TotemFlows', 'TotemBlocks', function($scope, $routeParams, $http, TotemFlows, TotemBlocks) {
    $scope.totemBlocks = []
    $scope.defaultTitle = "Add Title";
    $scope.defaultText = "Add Text";
    $scope.editingBlockContent = false;
    $scope.editingBlockTitle = false;

    $scope.totemFlow = TotemFlows.get({totem_flow_id:$routeParams.totemFlowId})
	$scope.totemBlocks = TotemBlocks.query({totem_flow_id: $routeParams.totemFlowId}, function(data){
        for (i in $scope.totemBlocks) {
            $scope.totemBlocks[i].title = $scope.totemBlocks[i].title ? $scope.totemBlocks[i].title : $scope.defaultTitle
            $scope.totemBlocks[i].content = $scope.totemBlocks[i].content ? $scope.totemBlocks[i].content : $scope.defaultText
        }
        if ($scope.totemBlocks.length > 0){
        $scope.selectedBlockIndex = 0
        }
    })

    $scope.startEditTitle = function(){
        $scope.editingBlockContent = false;
        $scope.editingBlockTitle = true;
    }
    $scope.endEditTitle = function() {
        $scope.editingBlockTitle = false;
        editInputCallback('title')
    }

    $scope.startEditContent = function(){
        $scope.editingBlockTitle = false;
        $scope.editingBlockContent = true;
    }

    $scope.endEditContent = function(){
        $scope.editingBlockContent = false;
        editInputCallback('content')
    }

    $('#editTitleInput').blur(function(){
        $scope.editingBlockTitle = false
        editInputCallback('title', true)
    })
    $('#editContentInput').blur(function(){
        $scope.editingBlockContent = false
        editInputCallback('title', true)
    })

    $scope.saveTotem = function(){
        editInputCallback();
    }

    var editInputCallback = function(inputType, apply) {
        if (inputType == 'title'){
            $scope.totemBlocks[$scope.selectedBlockIndex].title = $scope.totemBlocks[$scope.selectedBlockIndex].title ? $scope.totemBlocks[$scope.selectedBlockIndex].title : $scope.defaultTitle
        }
        if (inputType == 'content'){
            $scope.totemBlocks[$scope.selectedBlockIndex].content = $scope.totemBlocks[$scope.selectedBlockIndex].content ? $scope.totemBlocks[$scope.selectedBlockIndex].content : $scope.defaultContent
        }
        if (apply) {
            $scope.$apply()
        }
        var totemFlowId = $scope.totemFlow.id
        var totemBlockId = $scope.totemBlocks[$scope.selectedBlockIndex].id
        var selectedBlock = $scope.totemBlocks[$scope.selectedBlockIndex]
        $http({
            method: 'PUT',
            url:"/build/totem_flows/"+totemFlowId + "/totem_blocks/" + totemBlockId, 
            data: {"totemBlock": selectedBlock}
        });

    }

    $scope.setSelectedBlock = function(totemBlock, index) {
        $scope.selectedBlockIndex = index
    }

    $scope.addBlock = function(){
        var newBlock = {
            position: $scope.totemBlocks.length,
            title: $scope.defaultTitle,
            content: $scope.defaultText
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
        else {
            var deleteBlock = $scope.totemBlocks.splice($scope.selectedBlockIndex, 1)[0]
            TotemBlocks.delete({totem_flow_id: $routeParams.totemFlowId, totem_block_id: deleteBlock.id})
        }
    }
    $scope.nextBlock = function() {
        $scope.selectedBlockIndex = Math.min($scope.totemBlocks.length-1, $scope.selectedBlockIndex+1);
    }
    $scope.previousBlock = function() {
        $scope.selectedBlockIndex = Math.max(0, $scope.selectedBlockIndex-1);
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

	});
    
}]);