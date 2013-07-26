Controllers = angular.module('Controllers', ['Services']);

Controllers.controller('SplashController', ['$scope', function($scope) {
    $scope.transition_to_login = "false";
    $scope.transition = function(){
    	$scope.hide_logo = 'hide-logo';
    	$scope.hide_logo_container = 'hide-logo-container';
    }
}]);

Controllers.controller('BuildController', ['$scope', '$routeParams', '$http', '$location', 'TotemFlows', 'TotemBlocks', 'Users', 'CurrentUser', 'Signout', 'BuildService', function($scope, $routeParams, $http, $location, TotemFlows, TotemBlocks, Users, CurrentUser, Signout, BuildService) {
    $scope.totemBlocks = []
    $scope.defaultTitle = "Add Title";
    $scope.defaultText = "Add Text";
    $scope.defaultFlowName = "Name This Totem"
    $scope.editingBlockContent = false;
    $scope.editingBlockTitle = false;
    $scope.editingFlowName = false;
    $scope.editingSendEmail = false;
    $scope.sendTotemEmail = "";
    $scope.getStartedMessage = "Click Me!";

    CurrentUser.currentUser().then(function (user){
        $scope.user = user.data
        $scope.totemFlow = TotemFlows.get({totem_flow_id:$routeParams.totemFlowId, user_id:$scope.user.id})
    	$scope.totemBlocks = TotemBlocks.query({user_id:$scope.user.id, totem_flow_id: $routeParams.totemFlowId}, function(data){
            for (i in $scope.totemBlocks) {
                $scope.totemBlocks[i].title = $scope.totemBlocks[i].title ? $scope.totemBlocks[i].title : $scope.defaultTitle
                $scope.totemBlocks[i].content = $scope.totemBlocks[i].content ? $scope.totemBlocks[i].content : $scope.defaultText
            }
            $scope.selectedBlockIndex = 0
        });
    });
    // $scope.user = CurrentUser.currentUser();

    $scope.signOut = function(){
        Signout.signoutUser();
    }

    $scope.startEditTitle = function(){
        $scope.editingBlockContent = false;
        $scope.editingFlowName = false;
        $scope.editingBlockTitle = true;
    }
    $scope.endEditTitle = function() {
        $scope.editingBlockTitle = false;
        editInputCallback('title')
    }

    $scope.startEditContent = function(){
        $scope.editingBlockTitle = false;
        $scope.editingFlowName = false;
        $scope.editingBlockContent = true;
    }

    $scope.endEditContent = function(){
        $scope.editingBlockContent = false;
        editInputCallback('content')
    }

    $scope.startEditFlowName = function(){
        $scope.editingBlockTitle = false;
        $scope.editingFlowName = true;
        $scope.editingBlockContent = false;
    }
    $scope.endEditFlowName = function(){
        $scope.editingFlowName = false;
        editInputCallback('flowTitle')
    }
    
    $scope.startEditSendEmail = function(sendTotemEmail) {
        $scope.editingSendEmail = true;
    }
    $scope.endEditSendEmail = function(){
        $scope.editingSendEmail = false;
    }


    $('#editTitleInput').blur(function(){
        $scope.editingBlockTitle = false
        editInputCallback('title', true)
    })
    $('#editContentInput').blur(function(){
        $scope.editingBlockContent = false
        editInputCallback('title', true)
    })
    $('#editFlowNameInput').blur(function(){
        $scope.editingFlowName = false
        editInputCallback('flowName', true)
    })


    $('#sendInput').blur(function(){
        $scope.editingSendEmail = false;
        $scope.$apply();
    })


    $scope.saveTotem = function(){
        editInputCallback();
    }

    $scope.deleteTotem = function(){
        TotemFlows.delete({user_id: $scope.user.id, totem_flow_id: $scope.totemFlow.id})
        $location.path('/library/');
    }

    $scope.goToLibraryView = function(){
        $location.path('/library/')
    }
    var editInputCallback = function(inputType, apply) {
        if (inputType == 'title'){
            $scope.totemBlocks[$scope.selectedBlockIndex].title = $scope.totemBlocks[$scope.selectedBlockIndex].title ? $scope.totemBlocks[$scope.selectedBlockIndex].title : $scope.defaultTitle
        }
        if (inputType == 'content'){
            $scope.totemBlocks[$scope.selectedBlockIndex].content = $scope.totemBlocks[$scope.selectedBlockIndex].content ? $scope.totemBlocks[$scope.selectedBlockIndex].content : $scope.defaultContent
        }
        if (inputTpe = 'flowName'){
            $scope.totemFlow.name = $scope.totemFlow.name ? $scope.totemFlow.name : $scope.defaultFlowName
        }
        if (apply) {
            $scope.$apply()
        }
        var totemFlowId = $scope.totemFlow.id
        var totemBlockId = $scope.totemBlocks[$scope.selectedBlockIndex].id
        var selectedBlock = $scope.totemBlocks[$scope.selectedBlockIndex]
        var totemFlow = $scope.totemFlow

        TotemFlows.update({user_id:$scope.user.id, totem_flow_id: $scope.totemFlow.id}, $scope.totemFlow)
        TotemBlocks.update({user_id:$scope.user.id, totem_flow_id: $scope.totemFlow.id, totem_block_id: totemBlockId}, selectedBlock)
    }

    $scope.setSelectedBlock = function(index) {
        $scope.selectedBlockIndex = index
    }

    $scope.addBlock = function(){
        var newBlock = {
            position: $scope.totemBlocks.length,
            title: $scope.defaultTitle,
            content: $scope.defaultText,
            // totem_type: 'monkey'
        }
        $scope.totemBlocks.push(newBlock)
        $scope.selectedBlockIndex = ($scope.totemBlocks.length - 1)
        TotemBlocks.create({user_id:$scope.user.id, totem_flow_id:$scope.totemFlow.id});
    }

    $scope.removeBlock = function() {
        if ($scope.totemBlocks.length == 0){
            return
        }
        else {
            var deleteBlock = $scope.totemBlocks.splice($scope.selectedBlockIndex, 1)[0]
            TotemBlocks.delete({user_id: $scope.user.id, totem_flow_id: $routeParams.totemFlowId, totem_block_id: deleteBlock.id})
            if ($scope.selectedBlockIndex < $scope.totemBlocks.length){
                $scope.selectedBlockIndex = $scope.selectedBlockIndex;
            }
            else {
                $scope.selectedBlockIndex = $scope.totemBlocks.length-1
            }
            $scope.setSelectedBlock($scope.selectedBlockIndex);
        }
    }

    $scope.nextBlock = function() {
        $scope.selectedBlockIndex = Math.min($scope.totemBlocks.length-1, $scope.selectedBlockIndex+1);
    }
    $scope.previousBlock = function() {
        $scope.selectedBlockIndex = Math.max(0, $scope.selectedBlockIndex-1);
    }

    $scope.search = function(searchQuery){
        $location.path("/search/" + searchQuery);
    }

	filepicker.setKey('A4Diahs8GTUutiDyZ8MGPz');
	filepicker.makeDropPane($('#drop-target')[0], {
		    multiple: false,
    dragEnter: function() {
        $("#drop-target").html("Drop to upload").css({
            'backgroundColor': "#4abcf0"
            // 'border': "1px solid #000"
            });
        },
    dragLeave: function() {
        $("#drop-target").html("Drop files here").css({
            'backgroundColor': "#91d6f6"
            });
        },
    onSuccess: function(InkBlob) {
        $("#drop-target").text("Done, see result below");
        $("#uploadPreview").attr('src', InkBlob[0].url)
        $scope.totemBlocks[$scope.selectedBlockIndex]
		var totemFlowId = $scope.totemFlow.id
		var totemBlockId = $scope.totemBlocks[$scope.selectedBlockIndex].id
        var imgUrl = InkBlob[0].url;
        $scope.totemBlocks[$scope.selectedBlockIndex].block_image_url = imgUrl;

        // $.post("/image-upload/"+totemFlowId + "/" + totemBlockId, {block_image_url: InkBlob[0].url});
        TotemBlocks.update({totem_flow_id:$routeParams.totemFlowId, user_id:$scope.user.id, totem_block_id: totemBlockId}, {block_image_url:imgUrl})
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

Controllers.controller('LibraryController', ['$scope', '$location', '$http', '$routeParams', 'Users', 'CurrentUser', 'TotemFlows', 'Signout', function($scope, $location, $http, $routeParams, Users, CurrentUser, TotemFlows, Signout){

    $scope.searchQuery = $routeParams.searchQuery ? $routeParams.searchQuery : "";
    $scope.totemFlows = [];

    CurrentUser.currentUser().then(function (user){
        $scope.user = user.data
        $scope.totemFlows = TotemFlows.query({user_id: $scope.user.id})
    })
    $scope.viewTotemFlow = function(totemFlow){
        var totemFlowid = totemFlow.id;
        $location.path('/build/'+totemFlowid)
    }
    $scope.createNewTotemFlow = function() {
        var newTotemFlow = {name: "Name This Totem"}
        $scope.totemFlows.push(newTotemFlow);
        TotemFlows.create({user_id:$scope.user.id})
    }

    $scope.search = function(searchQuery){
        $location.path("/search/" + searchQuery);
    }

    $scope.signOut = function(){
        Signout.signoutUser();
    }

    $("#add-new-block-container").hide(0).fadeIn(200);

}]);