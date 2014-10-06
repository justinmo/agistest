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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/topic","dijit/_WidgetBase","dijit/_TemplatedMixin"],function(d,f,g,b,c,e){var a=d([c,e],{listenWidgetNames:[],listenWidgetIds:[],type:"widget",id:undefined,label:undefined,icon:undefined,uri:undefined,position:{},config:undefined,map:null,currentFunction:null,appConfig:null,baseClass:null,iconDijit:null,templateString:"<div></div>",constructor:function(){},setMap:function(h){this.map=h},enabledInfoWindow:function(){this.map.infoWindow.isEnabled=true},disabledInfoWindow:function(){this.map.infoWindow.isEnabled=false}});return a});