var postMsg = ''

function postText(value){
	console.log('iFrame sender: ' + value) 
	parent.postMessage(value, "*")
}



const scriptsInEvents = {

	async Global_Event68_Act11(runtime, localVars)
	{
		postText(runtime.globalVars.postMsg)
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

