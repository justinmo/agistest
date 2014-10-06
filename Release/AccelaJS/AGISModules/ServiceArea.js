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
define(["dojo/_base/declare","dojo/_base/lang","esri/map","esri/tasks/ServiceAreaTask","esri/tasks/ServiceAreaParameters","esri/tasks/FeatureSet","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/geometry/Point","esri/graphic","dojo/parser","dojo/topic","dijit/registry","esri/Color","dojo/_base/array","dojo/request","dojo/json","dojo/domReady!"],function(p,s,h,b,c,j,l,e,i,q,m,d,n,k,r,g,f,a){var o=p(null,{name:"ServiceArea",map:null,features:null,constructor:function(t){this.map=t;n.subscribe("Show-ServiceArea",s.hitch(this,function(u){if(u!=null){this.solveServiceArea(u,t)}}))},getTokenDeffered:function(t){var u=f.get(_globalGISUrl+"api/Token?username="+t.config.map.GISUserName+"&password="+t.config.map.GISPassword,{headers:{"content-type":"application/json;utf-8",Accept:"application/json"},handAs:"json"});return u},getServiceAreaParameters:function(t,y,v){var x=new c();x.defaultBreaks=[2];if(y&&y!=""){x.defaultBreaks=[parseInt(y)]}x.outSpatialReference=v;x.returnFacilities=false;var u=[];u.push(t);var w=new j();w.features=u;x.facilities=w;return x},solveServiceArea:function(t,u){this.getTokenDeffered(u).then(s.hitch(this,function(A){var w=a.parse(A);var z=u.config.map.ServiceAreaDriveTime;var v=new m(t,null);var y=this.getServiceAreaParameters(v,z,u.spatialReference);var x=new b(_globalServiceAreaTaskUrl+"?token="+w.token);x.solve(y,s.hitch(this,function(B){this.deletePrevServiceArea(u);this.displayServiceArea(u,B.serviceAreaPolygons[0]);this.removeSearviceArea(u,B.serviceAreaPolygons[0])}))}))},deletePrevServiceArea:function(t){g.forEach(t.graphics.graphics,function(v){if(v.attributes){var u=v.attributes["graphic-type"];if(u&&u=="ServiceArea"){t.graphics.remove(v)}}})},displayServiceArea:function(w,v){var u=new i("solid",new e("solid",new dojo.Color([232,104,80]),2),new dojo.Color([232,104,80,0.25]));var t=new i("solid",new e("solid",new r([232,104,80]),2),new r([232,104,80,0.25]));v.setAttributes({"graphic-type":"ServiceArea"});v.setSymbol(t);w.graphics.add(v);w.setExtent(v.geometry.getExtent())},removeSearviceArea:function(v,u){var t=v.on("click",function(w){v.graphics.remove(u);v.layerHandler.ShowLocation(w.mapPoint);t.remove()})},});return o});