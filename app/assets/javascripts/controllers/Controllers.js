Controllers = angular.module('Controllers', ['Services']);

Controllers.controller('SplashController', ['$scope', function($scope) {
    $scope.transition_to_login = "false";
    $scope.transition = function(){
    	$scope.hide_logo = 'hide-logo';
    	$scope.hide_logo_container = 'hide-logo-container';
    }
}]);

Controllers.controller('BuildController', ['$scope', '$routeParams', '$http', '$location', 'TotemFlows', 'TotemBlocks', 'Users', function($scope, $routeParams, $http, $location, TotemFlows, TotemBlocks, Users) {
    console.log('hi')

    $scope.totemBlocks = []
    $scope.defaultTitle = "Add Title";
    $scope.defaultText = "Add Text";
    $scope.defaultFlowName = "Name This Totem"
    $scope.editingBlockContent = false;
    $scope.editingBlockTitle = false;
    $scope.editingFlowName = false;
    $scope.sendReady = false;
    $scope.sendTotemEmail = "";
    $scope.getStartedMessage = "Click Me To Get Started";

    $scope.totemFlow = TotemFlows.get({totem_flow_id:$routeParams.totemFlowId})
	$scope.totemBlocks = TotemBlocks.query({totem_flow_id: $routeParams.totemFlowId}, function(data){
        for (i in $scope.totemBlocks) {
            $scope.totemBlocks[i].title = $scope.totemBlocks[i].title ? $scope.totemBlocks[i].title : $scope.defaultTitle
            $scope.totemBlocks[i].content = $scope.totemBlocks[i].content ? $scope.totemBlocks[i].content : $scope.defaultText
        }
        if ($scope.totemBlocks.length > 0){
        $scope.selectedBlockIndex = 0
        }
    });
    $scope.user = Users.getUser();

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
    $scope.openSendTotemContainer = function(){
        $scope.sendReady = true;
    }
    
    $scope.sendTotem = function(sendTotemEmail) {
        console.log(sendTotemEmail);
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


    $scope.saveTotem = function(){
        editInputCallback();
    }

    $scope.trashTotem = function(){
        TotemFlows.delete({totem_flow_id: $scope.totemFlow.id})
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

        $http({
            method: 'PUT',
            url:"/build/totem_flows/"+totemFlowId + "/totem_blocks/" + totemBlockId, 
            data: {"totemBlock": selectedBlock}
        });
        $http({
            method: 'PUT',
            url:"/build/totem_flows/" + totemFlowId,
            data: {"totemFlow": totemFlow}
        })

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
            $scope.totemBlocks[$scope.selectedBlockIndex].title = $scope.defaultTitle;
            $scope.totemBlocks[$scope.selectedBlockIndex].content = $scope.defaultText;
            $scope.$apply();
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

    $scope.search = function(searchQuery){
        $location.path('/library');
        $scope.searchQuery = searchQuery;
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
        $("#drop-target").text("Done, see result below");
        $("#uploadPreview").attr('src', InkBlob[0].url)
        $scope.totemBlocks[$scope.selectedBlockIndex]
		var totemFlowId = $scope.totemFlow.id
		var totemBlockId = $scope.totemBlocks[$scope.selectedBlockIndex].id
        var imgUrl = InkBlob[0].url;
        $scope.totemBlocks[$scope.selectedBlockIndex].block_image_url = imgUrl;

        $.post("/image-upload/"+totemFlowId + "/" + totemBlockId, {block_image_url: InkBlob[0].url});
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

Controllers.controller('LibraryController', ['$scope', '$location', '$http', '$routeParams', 'Users', 'TotemFlows', 'Signout', function($scope, $location, $http, $routeParams, Users, TotemFlows, Signout){
    $scope.totemFlows = []
    $scope.user = Users.getUser(function(data){
        var userId = data.id
        $scope.totemFlows = Users.getUserTotemFlows({user_id:userId});
    });
    $scope.viewTotemFlow = function(totemFlow){
        var totemFlowid = totemFlow.id;
        $location.path('/build/'+totemFlowid)
    }
    $scope.createNewTotemFlow = function() {
        var newTotemFlow = {}
        $scope.totemFlows.push(newTotemFlow)
        
        var userId = $scope.user.id
        $.post("/users/"+userId + "/" + 'createNewTotemFlow', function(data){
            $scope.totemFlows[$scope.totemFlows.length - 1] = data;
            $scope.$apply()
        });
        
    }

    $scope.searchQuery = ""
    $scope.search = function(searchQuery){
        $scope.searchQuery = searchQuery;
    }

    $scope.signOut = function(){
        Signout.signoutUser();
    }

}]);