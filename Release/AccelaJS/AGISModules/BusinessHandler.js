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
define(["dojo/_base/declare","dojo/request","dojo/dom-form","dojo/json"],function(c,e,d,b){var f,a;a=c(null,{elementInfo:null,constructor:function(g){this.elementInfo=g},getBussinessData:function(p){var n,m,j,u,x,q,t,y,o;if(p){var r=p._layer;if(r){y=r.name;o=r.layerId}}if(mapConfig){if(mapConfig.agency){q=mapConfig.agency}if(mapConfig.map){if(mapConfig.map.AppServerURL){j=mapConfig.map.AppServerURL}if(mapConfig.map.AAUserName){u=mapConfig.map.AAUserName}if(mapConfig.map.AAPassword){x=mapConfig.map.AAPassword}if(mapConfig.map.AAGISServiceID){t=mapConfig.map.AAGISServiceID}if(mapConfig.map.layers&&mapConfig.map.layers.length>0){for(var v in mapConfig.map.layers){var l=mapConfig.map.layers[v];if(l&&parseInt(l.id)===o){m=l.fields;break}}if(m&&m.length>0){for(var w in m){var g=m[w];if(g&&g.idfield==="true"){n=g.id;break}}}}IdFieldValue=p.attributes[n]}}var i=null;if(mapConfig){i=mapConfig.RestAPIToken}var k={ServiceProviderCode:q,appServerURL:j,AAUserName:u,AAPassword:x,LayerId:o,IdFieldValue:IdFieldValue,LayerName:y,AAGISServiceID:t,Type:"QueryParcels",Token:i};var s=b.stringify(k);var h=e.post(_globalGISUrl+"api/AccelaBusinessData",{data:s,headers:{"content-type":"application/json;utf-8",Accept:"application/json"},handAs:"json"});return h},});a.getInstance=function(g){instance=new a(g);return instance};return a});