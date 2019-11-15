console.log("Loader.js");
import {StorageHelper} from './StorageHelper.js';
import {DatabaseHelper} from './DatabaseHelper.js';
import {communityHelper} from './communityHelper.js';
import {DataHandler} from './DataHandler.js';
import {Browsing} from './functions/Browsing.js';
import {Content} from './functions/Content.js';
import {ApiCall} from './functions/ApiCall.js';
import {Context} from './functions/Context.js';
import {Task} from './functions/Task.js';
import {Utils} from './Utils.js';
import {pageAction} from './pageAction.js';
import {internalFilters} from './internalFilters.js';
import {ssConfig} from './manifest.js';
var Loader = (function() {
    'use strict';
    var dbHelperInterval;
    async function install(allModules){		
        return StorageHelper.retrieveAll().then(async (db) => {
            if (db == null || db == undefined || Object.keys(db).length==0){
                db = {modules: {}, configs: {}, profile: {}, filters: [], privacyData: [], tasks: {}};                
                db.configs.Id = Utils.uuid();
                db.configs.salt = Utils.uuid();
				db.configs.delay = 2;
				communityHelper.createWallet();
				db.configs.encryptedWallet = await communityHelper.getEncryptedWallet(db.configs.salt); 
				Utils.jsonUpdate(db.configs, ssConfig);
            }
            try{
				db.configs.version = ssConfig.version;
                let newFilters = db.filters.filter(function(f, index, arr){
								return (!f.internal);
							});
                for(let f of internalFilters) {
                    newFilters.push(f)
                }
                db.filters = newFilters;
                allModules.forEach(module=>{
					if(!db.modules[module.name] || module.version != db.modules[module.name].version) {				
						db.modules[module.name] = {};
                        module.mId = Utils.uuid();
                        module.mSalt = Utils.uuid();
						if(module.functions.includes("apiCall"))
						{
							module.apiConfig.redirect_url = ApiCall.getCallBackURL(module.name)
						}
						
						Utils.jsonUpdate(db.modules[module.name], module);                
                    }
                });
            }
            catch(exp){
                console.log(exp);
            }
           return StorageHelper.storeAll(db);
           
        });
        
    }
	
	function changeIconOnUpdated(tabId, changeInfo, tabInfo) {
		if(!changeInfo.url || !tabInfo.active)		
			return;		
		pageAction.loadIcons(tabInfo);
    }

	function changeIconOnActivated(activeInfo) {
		browser.tabs.get(activeInfo.tabId).then((tabInfo) => {
			if(tabInfo.url) {
				pageAction.loadIcons(tabInfo);
			}
		})
    }
	
    function init(isEnabled) {
		if(isEnabled) {			
			if(!browser.tabs.onUpdated.hasListener(changeIconOnUpdated))	
				browser.tabs.onUpdated.addListener(changeIconOnUpdated);
			if(!browser.tabs.onActivated.hasListener(changeIconOnActivated))	
				browser.tabs.onActivated.addListener(changeIconOnActivated)
			browser.browserAction.setIcon({path: {"38":"icons/green_mark_38.png", "19":"icons/green_mark_19.png"}});			
		}
		else {			
			if(browser.tabs.onUpdated.hasListener(changeIconOnUpdated))	
				browser.tabs.onUpdated.removeListener(changeIconOnUpdated);
			if(browser.tabs.onActivated.hasListener(changeIconOnActivated))	
				browser.tabs.onActivated.removeListener(changeIconOnActivated);
			browser.browserAction.setIcon({path: {"38":"icons/mono_mark_38.png", "19":"icons/mono_mark_19.png"}});					
		}			
	}

	
    function start(){				
		browser.storage.local.get("configs").then(c => {
			c.configs.is_enabled = true;
			browser.storage.local.set(c);
			init(true);
			Content.load();
			Browsing.load();
			ApiCall.load();	
			Context.load();
			Task.load();
		})	
    }
    

    function stop(){		
		browser.storage.local.get("configs").then(c => {
			c.configs.is_enabled = false;
			browser.storage.local.set(c).then(() => {
				init(false);
				Content.unload();
				Browsing.unload();
				ApiCall.unload();
				Context.unload();
				Task.unload();				
			})		
		})
    }

	function restart() {
		stop();
		start();
    }
    
    function load_module(module) {
		Content.load_module(module);
		Browsing.load_module(module);
		ApiCall.load_module(module);
		Context.load_module(module);
		Task.load_module(module);
	}
	
    function unload_module(module) {
		Content.unload_module(module);
		Browsing.unload_module(module);
		ApiCall.unload_module(module);
		Context.unload_module(module);
		Task.unload_module(module);
	}
	
	async function load() {		
		browser.storage.local.get("configs").then(async (c) => {
			dbHelperInterval = setInterval(function(){
				DatabaseHelper.init();
				DataHandler.sendDelayedMessages();
				}, 10000);
			let x = await communityHelper.loadWallet(c.configs.encryptedWallet, c.configs.salt);
			if(c.configs.is_enabled) {
				init(true);
				Content.load();
				Browsing.load();
				ApiCall.load();
				Context.load();
				Task.load();
			} 
			else {
				init(false);
				Content.unload();
				Browsing.unload();
				ApiCall.unload();								
				Context.unload();
				Task.unload();
			}			
		})		
	}
	
	async function reload() {		
		browser.storage.local.get("configs").then(async (c) => {
            clearInterval(dbHelperInterval);
			dbHelperInterval = setInterval(function(){
				DatabaseHelper.init();
				DataHandler.sendDelayedMessages();
				}, 10000);
			init(false);
			let x = await communityHelper.loadWallet(c.configs.encryptedWallet, c.configs.salt);
			Content.unload();
			Browsing.unload();
			ApiCall.unload();								
			Context.unload();
			Task.unload();
			if(c.configs.is_enabled) {
				init(true);
				Content.load();
				Browsing.load();
				ApiCall.load();
				Context.load();
				Task.load();
			}					
		})		
	}
	
	function configModule(moduleName, settings) {
		return StorageHelper.saveModuleSettings(moduleName, settings).then(x => {
			StorageHelper.retrieveModules().then(modules => {
				let module = modules[moduleName];
				unload_module(module);
				if(settings.is_enabled)
					load_module(module);								
			});
		});
	}

    function register(module){
        var data = {modules: {}}
        data.modules[module.name] = module
        data.modules[module.name].mId = Utils.generateUUID();
        StorageHelper.updateModules(data);
    }
    
    function unregister(module){
        StorageHelper.removeModules(module.name);
    }
    
    function update(module){
        var data = {modules: {}}
        data.modules[module.name] = module
        StorageHelper.updateModules(data);
    }
    
    function installation_status(module){
        var modules = StorageHelper.retrieveModules();
        if(! modules[module.name]){
            return "new"
        }else{
            if(module.dead == 1){
                return "dead"
            }
            if(module.version > modules[module.name].version){
                return "version"
            }
            if(module.version == modules[module.name].version){
                return "unchanged"
            }
        }
        return "unknown";
    }
    
    return {
        install,
        start,
        stop,
		load,
		reload,
        restart,
		configModule,
    };
}());
export {Loader};
