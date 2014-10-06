/**
 * <pre>
 * 
 *  Accela GIS
 *  BusinessHandler.js
 * 
 *  Accela, Inc.
 *  Copyright (C): 2014
 * 
 *  Description:
 * 
 *  Note
 *  Created By: Iron Tang
 *
 * <Date>       <Who>       <What>
 * 6/30/2014     Iron Tang    init
 *
 * </pre>
 */
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/html","dojo/topic","dojo/Deferred","esri/config","esri/request","AGISAPI/utils","AGISAPI/Map"],function(c,a,e,f,h,k,b,i,d){var j=null,g;g=c(null,{urlParams:null,config:null,mapId:"map",rawConfig:null,configFile:null,_configLoaded:false,_initParam:null,agency:null,constructor:function(l,n,m){this.id=n;this._initParam=m;this.agency=m.agencyCode},loadConfig:function(){this.configFile=_globalGISUrl+"Configuration/config.json";var l=new h();l=b({url:this.configFile,handleAs:"json"});l.then(a.hitch(this,function(o){if(o.length>0){var m=null;for(var n=0;n<o.length;n++){o[n].agency=o[n].agency.replace(/^\s+|\s+$/g,"")}for(var n=0;n<o.length;n++){if(o[n].agency.toLowerCase()==this.agency.toLowerCase()&&o[n].map.IsDefault.toLowerCase()=="true"){m=o[n]}}m.map.position=this._clearPosition(m.map.position);for(var n=0;n<m.preloadWidgets.widgets.length;n++){m.preloadWidgets.widgets[n].position=this._clearPosition(m.preloadWidgets.widgets[n].position)}this.rawConfig=a.clone(m);if(this._initParam&&this._initParam.isHideWidgets){m.preloadWidgets.widgets=[]}this.config=this.postProcess(m);mapConfig=this.config;f.publish("configrationLoaded",this.config);this._loadMap()}}),a.hitch(this,function(n){var m=n}))},_clearPosition:function(l){if(l.left==null){delete l.left}else{l.left=parseInt(l.left)}if(l.top==null){delete l.top}else{l.top=parseInt(l.top)}if(l.right==null){delete l.right}else{l.right=parseInt(l.right)}if(l.bottom==null){delete l.left}else{l.bottom=parseInt(l.bottom)}if(l.width==null){delete l.width}else{l.width=parseInt(l.width)}if(l.height==null){delete l.height}else{l.height=parseInt(l.height)}if(l.marginright==null){delete l.marginright}else{l.marginright=parseInt(l.marginright)}return l},_loadMap:function(){var l=e.create("div",{id:this.mapId,style:a.mixin({position:"absolute",backgroundColor:"#EEEEEE",overflow:"hidden"},i.getPositionStyle(mapConfig.map.position))});e.place(l,this.id);d.getInstance(this.rawConfig,this.mapId).showMap()},postProcess:function(l){return l}});g.getInstance=function(l,n,m){if(j===null){j=new g(l,n,m)}else{j.urlParams=l}return j};return g});