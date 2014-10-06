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
define(["AGISAPI/ConfigHandler","AGISAPI/LayoutHandler","dojo/_base/html","dojo/_base/lang","dojo/on","dojo/mouse","dojo/topic","dojo/Deferred","dojo/promise/all","dojo/io-query","dojo/request","dojo/dom","dojo/dom-construct","dojo/domReady!","esri/request","esri/tasks/locator","dojo/json","dojo/dom-style","require","esri/config"],function(B,b,n,E,m,p,x,a,e,u,f,d,D,l,s,r,C,w,k,v){var y={};var c=[];var h={};var A=null;var i=null;v.defaults.io.proxyUrl=_globalGISUrl+"Proxy/proxy.ashx";m(window,"mousedown",function(F){if(!p.isMiddle(F)){return}F.preventDefault();F.stopPropagation();return false});String.prototype.startWith=function(F){if(this.substr(0,F.length)===F){return true}else{return false}};String.prototype.endWith=function(F){if(this.substr(this.length-F.length,F.length)===F){return true}else{return false}};if(typeof agisConfig==="undefined"){agisConfig={}}agisConfig=E.mixin({loadingId:"main-loading",layoutId:"agis-layout-manager",mapId:"map",mainPageId:"accela-map-container",timeout:3000,widthBreaks:[600,1280]},agisConfig);window.accelajs={version:"1.0 Beta"};function g(F){A=F;if(i!=null){A.locateHandler.locateData(i)}}function q(L,M){var J,I,H;if(window.console){console.log("accelajs init...")}var G=d.byId(L);var K='<div oncontextmenu="return false" style="width:100%; height:100%;z-index:0;" id="'+agisConfig.layoutId+'"></div>';G.innerHTML=K;x.subscribe("mapLoaded",g);J=z();H=b.getInstance({mapId:agisConfig.mapId},agisConfig.layoutId);I=B.getInstance(J,agisConfig.layoutId,M);H.startup();I.loadConfig();function F(N){try{if(N.url.indexOf("Configuration/config.json")>-1){N.preventCache=false}else{N.preventCache=true}return N}catch(O){console.log(O.toString());return N}}s.setRequestPreCallback(F)}function j(G,F){if(A){A.locateHandler.locateData(G)}else{i=G}}function o(G,F){j(G,F)}function z(){var F=window.location.search,G;if(F===""){return{}}G=u.queryToObject(F.substr(1));return G}function t(F,H){for(var G=0;G<c.length;G++){if(c[G].key.toLowerCase()==F.toLowerCase()){c.splice(G,1);break}}c.push({key:F,fun:H});x.publish("addEventListener",c);x.subscribe("aGISMapLoaded",function(){x.publish("addEventListener",c)})}x.subscribe("mapLoaded",E.hitch(function(G){if(G.events){for(var F=0;F<G.events.length;F++){if(G.events[F].key.toLowerCase()=="agismaploaded"){G.events[F].fun({eventType:"AGISMapLoaded",eventData:y});break}}}}));y.Map=h;y.initMap=q;y.Locate=j;y.enlargeIcon=o;y.addEventListener=t;return y});