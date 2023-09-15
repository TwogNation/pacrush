var postMsg = ''

function postText(value){
	console.log('iFrame sender: ' + value) 
	parent.postMessage(value, "*")
}



const scriptsInEvents = {

	async Start_Event2_Act1(runtime, localVars)
	{
		const queryParams = new URLSearchParams(window.location.search)
		const token = queryParams.get('token');
		const gameId = queryParams.get('gameId');
		
		try{
			const webSocket = new WebSocket('wss://arcade.stage.legacyarcade.com/ws', [token,gameId]);
			runtime.globalVars.webSocket = webSocket;
			webSocket.onopen = (event) =>{
				runtime.callFunction('startendless');
			};
			runtime.globalVars.playable = 1;
		}catch(e){
			const textInstance = runtime.objects.ErrorText.getFirstInstance()
			textInstance.text = "ERROR CONNECTING"
			console.log("error connecting to server", e)
		}
		
	},

	async Global_Event1_Act1(runtime, localVars)
	{
		runtime.globalVars.webSocket.onMessage = (event) => {
			if (event.data.startsWith('s:')){
				const score_ = event.data.split(':')[1];
				console.log(score_);
				runtime.globalVars.score = score_;
				runtime.callFunction("updateScore")
			}
		}
	},

	async Global_Event49_Act2(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:10") 
	},

	async Global_Event68_Act11(runtime, localVars)
	{
		runtime.globalVars.webSocket.close();
	},

	async Global_Event68_Act12(runtime, localVars)
	{
		window.parent.postMessage("WebSocketClosed", "*");
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

