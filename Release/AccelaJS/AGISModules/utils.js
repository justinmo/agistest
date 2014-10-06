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
define(["dojo/_base/lang","dojo/_base/array","dojo/_base/html","dojo/Deferred","dojo/on","dojo/request/xhr"],function(g,h,c,b,a,f){var e={};e.getPositionStyle=function(i){var j={};for(var k in i){if(h.indexOf(["left","top","right","bottom","width","height","marginright"],k)>=0){if(typeof i[k]==="number"){if(k==="marginright"){j.margin="0px "+i[k]+"px 0px 0px"}else{j[k]=i[k]+"px"}}else{if(k==="marginright"){j.margin="0px "+i[k]+"px 0px 0px"}else{j[k]=i[k]}}}}return j};e.processWidgetSetting=function(i){if(!i.uri){return i}g.mixin(i,d(i.uri));if(!i.icon){i.icon=i.folderUrl+"images/icon.png"}if(!i.thumbnail){i.thumbnail=i.folderUrl+"images/thumbnail.png"}return i};e.checkFile=function(i){var j=new b();f(i).then(function(){j.resolve(true)},function(){j.resolve(false)});return j};e.createStyleLink=function(l,i){var k=new b(),j;j=c.create("link",{id:l,rel:"stylesheet",type:"text/css",href:i},document.getElementsByTagName("head")[0]);a(j,"load",function(){k.resolve("load")});return k};function d(l){var n,i,m={},k;n=l.indexOf("/");i=l.substring(0,n);k=l.substring(0,l.lastIndexOf("/")+1);m.folderUrl=require(e.getRequireConfig()).toUrl(k);var j=m.folderUrl.indexOf("?");if(j>-1){m.folderUrl=m.folderUrl.substring(0,j)}m.amdFolder=k;return m}e.getRequireConfig=function(){if(agisConfig&&agisConfig.widgetsPackage){return{packages:[agisConfig.widgetsPackage]}}else{return{}}};return e});