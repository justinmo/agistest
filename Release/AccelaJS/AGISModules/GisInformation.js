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
define(["dojo/_base/declare","dojo/_base/lang","AGISAPI/BaseWidget","dojo/dom","dojo/dom-style","dojo/dom-class","dojo/on","dojo/parser","dojo/topic","dojo/_base/array","dojo/query","dijit/TooltipDialog","dijit/popup","dojo/dom-construct","esri/tasks/query","esri/tasks/QueryTask","dojo/domReady!"],function(g,c,p,e,k,o,l,b,i,f,n,m,a,d,h,q){var j=g(null,{name:"GisInformation",map:null,features:null,constructor:function(r){this.map=r;i.subscribe("Show-GISInformation",c.hitch(this,function(v){var s=v.FeatureLayer;if(s==null||s==undefined){s=v._layer}var t=this.map.layerHandler.getIdfieldByLayer(s);var w=new q(s.url);var u=new h();u.returnGeometry=false;u.outFields=["*"];u.where=t+" = '"+v.attributes[t]+"'";w.execute(u,c.hitch(this,function(x){if(x&&x.features&&x.features.length>0){var z=x.features[0];var y=this._getContent(z);this._setContent(y);u(".show-gis-info")[0].parentNode.style.paddingLeft="0px";u(".show-gis-info")[0].parentNode.style.paddingRight="0px";u(".show-gis-info")[0].parentNode.style.paddingTop="0px"}}))}))},_setContent:function(r){this.map.infoWindow.setTitle("Show GIS Information");this.map.infoWindow.setContent(r);if(this.map.infoWindow.objectsPanel!=null){d.empty(this.map.infoWindow.objectsPanel)}if(this.map.infoWindow.actionPanel!=null){d.empty(this.map.infoWindow.actionPanel)}},_getContent:function(t){var v="<div class='show-gis-info'>";var u=null;if(t._graphicsLayer){u=t._graphicsLayer}else{u=t._layer}var s=this.map.layerHandler.getIdfieldByLayer(u);var w=t.attributes[s];if(s!=undefined){var x=u.name+"&nbsp;&#58;&nbsp;"+w;v+="<h1>"+x+"</h1>";v+="<hr/>";v+="<table>";dojo.forEach(u.fields,function(y){v+="<tr><td>"+y.name+"</td>";v+="<td>"+t.attributes[y.name]+"</td></tr>"});v+="</table></div>"}else{if(t.attributes!=undefined){v+="<table>";for(var r in t.attributes){v+="<tr><td>"+r+"</td>";v+="<td>"+t.attributes[r]+"</td></tr>"}dojo.forEach(t.attributes,function(y){});v+="</table></div>"}}return v},});return j});