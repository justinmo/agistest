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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/html","dojo/on","dijit/_WidgetBase","AGISAPI/utils"],function(e,f,d,b,c,a){return e(c,{"class":"accelajs-widgets",postCreate:function(){this.inherited(arguments);this.iconNode=d.create("img",{src:this.widgetConfig.icon},this.domNode);d.setAttr(this.domNode,"title",this.widgetConfig.label);d.setAttr(this.domNode,"name","imgBtn"+this.widgetConfig.name);this.state="closed"},startup:function(){this.inherited(arguments)}})});