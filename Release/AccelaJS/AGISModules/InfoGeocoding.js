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
define(["dojo/Evented","dojo/parser","dojo/on","dojo/_base/declare","dojo/dom-construct","dojo/_base/array","dojo/dom-style","dojo/_base/lang","dojo/dom-class","dojo/fx/Toggler","dojo/fx","dojo/Deferred","esri/domUtils","esri/InfoWindowBase"],function(n,a,k,h,e,j,i,b,m,c,g,l,d,f){return h([f,n],{isContentShowing:false,toggler:null,objectsPanel:null,rightDiv:null,title:null,desption:null,currentmap:null,constructor:function(r){b.mixin(this,r);m.add(this.domNode,"custInfoGeocoding");var o=e.create("div",{"class":"mainDiv"},this.domNode);var q=e.create("div",{"class":"leftDiv"},o);rightDiv=e.create("div",{"class":"rightDiv"},o);e.create("div",{"class":"leftBarStyle"},q);var p=e.create("div",{"class":"titleBarStyle"},rightDiv);var s=e.create("div",{"class":"panelContentStyle"},rightDiv);desption=e.create("div",{"class":"panelDespStyle"},s);objectsPanel=e.create("div",{"class":""},s);this._closeButton=e.create("div",{"class":"closebutton_mouseout"},p);dojo.connect(this._closeButton,"onmouseout",function(t){this.className="closebutton_mouseout"});dojo.connect(this._closeButton,"onmouseover",function(t){this.className="closebutton_mouseover"});title=e.create("div",{id:"divTitle","class":"title"},p);toggler=new c({node:desption,showFunc:g.wipeIn,hideFunc:g.wipeOut});toggler.show();k(this._closeButton,"click",b.hitch(this,function(){this.hide()}));this.isContentShowing=false;d.hide(this.domNode)},setMap:function(o){currentmap=o;this.inherited(arguments);o.on("pan-start",b.hitch(this,function(){this.hide()}));o.on("zoom-start",b.hitch(this,function(){this.hide()}))},setTitle:function(o){this.place(o,title)},setContent:function(o){this.place(o,desption)},show:function(o){if(o.spatialReference){o=currentmap.toScreen(o)}i.set(this.domNode,{left:(o.x)+"px",top:(o.y-17)+"px"});d.show(this.domNode);this.isShowing=true;this.onShow()},hide:function(){d.hide(this.domNode);this.isShowing=false;this.onHide()},clearFeatures:function(){},setFeatures:function(p){d.show(this.domNode);this.isShowing=true;this.onShow();e.empty(objectsPanel);var o=new Array();this.setTitle("Ness")},resize:function(p,o){i.set(desption,{width:p+"px",height:o+"px"});i.set(title,{width:p+"px"})},destroy:function(){e.destroy(this.domNode);this._closeButton=title=desption=null}});return InfoGeocoding});