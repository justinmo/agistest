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
define(["dojo/_base/declare","dojo/_base/lang","dojo/topic","dojo/dom-construct","dojo/dom","dojo/on","esri/graphic","esri/layers/GraphicsLayer","esri/symbols/PictureMarkerSymbol","esri/arcgis/utils","esri/toolbars/draw","AGISAPI/AGISInfoWindow","AGISAPI/GisInformation","AGISAPI/ServiceArea","dojo/has","AGISAPI/LayerHandler","esri/InfoTemplate","dojo/_base/connect","AGISAPI/LocateHandler","dojox/gesture/tap"],function(u,v,o,f,q,h,l,m,e,c,n,i,s,j,b,k,g,a,d,r){var t=null,p;p=u(null,{mapConfig:null,mapDivId:"",map:null,events:null,custInfoWin:null,mouseDownTimer:null,constructor:function(w,x){this.mapConfig=w;this.mapDivId=x;this.id=x;o.subscribe("addEventListener",v.hitch(this,"addEventListener"));o.publish("aGISMapLoaded")},addEventListener:function(w){this.events=w},showMap:function(){this._showMap(this.mapConfig)},_showMap:function(w){if(w.portalUrl){c.arcgisUrl=w.portalUrl+"sharing/content/items/"}this.custInfoWin=new i({domNode:f.create("div",null,q.byId(this.mapDivId))});var x=c.createMap(w.map.itemId,this.mapDivId,{mapOptions:{slider:false,nav:false,infoWindow:this.custInfoWin}});x.then(v.hitch(this,function(z){var B=z.map;B.itemId=w.map.itemId;B.itemInfo=z.itemInfo;B.webMapResponse=z;var y=new n(B,{showTooltips:false});B.draw=y;B.config=this.mapConfig;B.layerHandler=new k(B);B.locateHandler=new d(B);B.showAttribution=false;B.events=this.events;this._publishMapEvent(B);var C=new s(B);var A=new j(B)}),v.hitch(this,function(){}))},_publishMapEvent:function(w){if(this.map){this.map=w}else{this.map=w;o.publish("mapLoaded",this.map)}this.map.enableDoubleClickZoom();h(this.map,"click",v.hitch(this,this.onMouseClick));h(this.map,"mouse-down",v.hitch(this,this.onMouseDown))},onMouseDown:function(w){if(w.button==2){if(this.mouseDownTimer!=null){var x=new Date().getTime();if(x-this.mouseDownTimer<=300){if(this.map){var y=this.map.getLevel();if(y>this.map.getMinZoom()){this.map.setLevel(y-1)}}}}this.mouseDownTimer=new Date().getTime()}},onMouseClick:function(w){if(!w.graphic){this.map.layerHandler.ShowLocation(w.mapPoint)}else{for(var x in this.map._layers){if(this.map._layers[x].name&&this.map._layers[x].name==w.graphic._graphicsLayer.name&&this.map._layers[x].visibleAtMapScale==false){this.map.layerHandler.ShowLocation(w.mapPoint);break}}}}});p.getInstance=function(w,x){if(t===null){t=new p(w,x)}return t};return p});