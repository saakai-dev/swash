var browserUtils = (function() {
	function getUserAgent()
    {
		if(typeof browser.runtime.getBrowserInfo === "function")
			return browser.runtime.getBrowserInfo();
		return navigator.userAgent;
    }

    function getAllInstalledPlugins()
    {
        /*return browser.management.getAll();*/
    }

	function getBrowserLanguage()
    {
        return navigator.language;
    }
	
    async function getPlatformInfo()
    {
		if(navigator.platform && navigator.platform.startsWith("Win"))
			return {os: 'win'};	
		let platformInfoPromise =  browser.runtime.getPlatformInfo();
		return platformInfoPromise.then((platformInfo) => {
			return platformInfo;
		}).catch((error) => {	
			return {os: 'android'};
		})		
    }
    
	async function isMobileDevice() {
		let os = (await getPlatformInfo()).os;
		if(os === 'android')
			return true;
		return false;
	}
	
    
	function getVersion(){
        return browser.runtime.getManifest().version;
    }
	
	return {
		getUserAgent,
		getAllInstalledPlugins,
		getBrowserLanguage,
		getPlatformInfo,
		getVersion,
		isMobileDevice
    };
}())

export {browserUtils}