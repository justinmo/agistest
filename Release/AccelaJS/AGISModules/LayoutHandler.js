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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/html","dijit/_WidgetBase","dojo/topic","dojo/on","dojo/Deferred","AGISAPI/ConfigHandler","AGISAPI/LoadWidgetImg","AGISAPI/Map","AGISAPI/utils","AGISAPI/Widget","dojo/promise/all"],function(p,r,f,h,e,j,g,a,m,q,k,o,d,c){var n=null,l;l=p([e],{constructor:function(s,t){this.widgets=d.getInstance();this.own(j.subscribe("mapLoaded",r.hitch(this,this.onMapLoaded)));this.preloadWidgetIcons=[];this.id=t},postCreate:function(){this.containerNode=this.domNode},map:null,mapId:"map",onMapLoaded:function(s){this.map=s;this._addNeedValues(mapConfig);this._loadPreloadWidgets(mapConfig)},_addNeedValues:function(s){this._addDefaultPanelAndPosition(s);this.addDefaultValuesForWidgets(s)},_addDefaultPanelAndPosition:function(t){var u,s;if(t.preloadWidgets.widgets){for(u=0;u<t.preloadWidgets.widgets.length;u++){if(!t.preloadWidgets.widgets[u].position){t.preloadWidgets.widgets[u].position={left:0,top:0}}if(!t.preloadWidgets.widgets[u].positionRelativeTo){t.preloadWidgets.widgets[u].positionRelativeTo="map"}}}},addDefaultValuesForWidgets:function(s){b(s,r.hitch(this,function(w,t,u,v){w.isPreload=v;if(w.widgets){w.gid=w.id;if(w.widgets.length===1){if(!w.label){w.label=w.widgets[0].label?w.widgets[0].label:"Group"}if(!w.icon){if(w.widgets[0].uri){w.icon=this._getDefaultIconFromUri(w.widgets[0].uri)}else{w.icon="AccelaJS/images/group_icon.png"}}}else{w.icon=w.icon?w.icon:"AccelaJS/images/group_icon.png";w.label=w.label?w.label:"Group_"+t}}else{w.gid=u;if(w.uri){w.name=i(w.uri);o.processWidgetSetting(w)}}}))},_loadPreloadWidgets:function(t){var s=[];f.forEach(t.preloadWidgets.widgets,function(u){s.push(this._loadPreloadWidget(u))},this);c(s).then(r.hitch(this,function(){j.publish("preloadWidgetsLoaded")}),function(){if(window.console){console.timeEnd("Load PreloadWidgets")}j.publish("preloadWidgetsLoaded")})},_createPreloadWidgetIcon:function(t){var s=new q({widgetConfig:t,configId:t.id});h.place(s.domNode,"map");h.setStyle(s.domNode,"position","absolute");h.setStyle(s.domNode,"z-index","1");h.setStyle(s.domNode,o.getPositionStyle({top:t.position.top,left:t.position.left,right:t.position.right,bottom:t.position.bottom}));s.startup();this.preloadWidgetIcons.push(s);return s},_loadPreloadWidget:function(u){var t=new a();var s;if(u.customize==="false"){s=this._createPreloadWidgetIcon(u)}this.widgets.loadWidget(u).then(r.hitch(this,function(w){h.place(w.domNode,this.id);h.setStyle(w.domNode,"position","absolute");h.setStyle(w.domNode,o.getPositionStyle(w.position));h.setAttr(w.domNode,"name",u.name);w.iconDijit=s;try{w.startup()}catch(v){if(window.console){console.debug(v.message)}}w.configId=u.id;t.resolve(w)}),function(v){t.reject(v)});t.resolve(s);return t}});function i(t){var s=t.split("/");s.pop();return s.pop()}function b(u,s){var v,t;if(u.preloadWidgets){if(u.preloadWidgets.widgets){for(v=0;v<u.preloadWidgets.widgets.length;v++){if(s(u.preloadWidgets.widgets[v],v,"preloadWidgets",true)){break}}}}}l.getInstance=function(s,t){if(n==null){n=new l(s,t)}return n};return l});