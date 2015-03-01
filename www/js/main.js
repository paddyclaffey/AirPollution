function ini(){				
	alert("register on GCM");
	window.plugins.pushNotification.register(
		successHandler, 
		errorHandler,
		{ 	"senderID":"906428876932",
			"ecb":"onNotification"
		}
	);
	function successHandler(result){
		alert("result: " + result);
	}
	function errorHandler(result){
		alert("error: " + result);
	}
	function onNotification(e){
		alert("message: " + e);
		switch(e.event){
			case "registered":
				alert("ID: " + e.regid);
				sendRequest(e.regid);
				alert("successfully registered")
				break;
			case "message":
				alert("Message: " + e.payload.message);
				alert("successfully messaged")
				break;
			default:
				alert("unknow default event");
				
		}
	}
}