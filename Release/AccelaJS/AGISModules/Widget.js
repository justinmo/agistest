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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/html","dojo/topic","dojo/Deferred","dojo/promise/all","AGISAPI/utils"],function(b,a,f,c,d,g,h,i){var j=null,e;e=b(null,{constructor:function(){this.widgets=[];d.subscribe("mapLoaded",a.hitch(this,this._onMapLoaded));d.subscribe("configrationLoaded",a.hitch(this,this.onConfigurationLoaded))},_onMapLoaded:function(k){this.map=k},onConfigurationLoaded:function(k){this.config=k},loadClazz:function(l){var k=new g();require({},[l.uri],a.hitch(this,function(m){k.resolve(m)}));return k},loadResources:function(o){var l=new g(),m,p,k=[];var n=a.clone(o);m=this.loadResource(n,"style");p=this.loadResource(n,"template");k.push(m);k.push(p);h(k).then(a.hitch(this,function(q){var r={};r.style=q[0];r.template=q[1];l.resolve(r)}),function(q){l.reject(q)});return l},getWidgetById:function(l){var k;f.some(this.widgets,function(m){if(m.id===l){k=m;return true}},this);return k},loadWidget:function(m){var l=new g(),k;m=a.clone(m);k=this.getWidgetById(m.id);if(k){l.resolve(k)}else{h([this.loadClazz(m)]).then(a.hitch(this,function(o){var n=o[0];this.loadResources(m).then(a.hitch(this,function(p){try{var r=this.createWidget(m,n,p)}catch(q){l.reject(q)}setTimeout(function(){l.resolve(r)},50)}),function(p){l.reject(p)})}),function(n){l.reject(n)})}return l},createWidget:function(m,l,k){var n;if(this.getWidgetById(m.id)){return this.getWidgetById(m.id)}m.rawConfig=m.config;m.config=k.config||{};if(k.template){m.templateString=k.template}m["class"]="accelajs-widgets";if(!m.label){m.label=m.name}if(this.map){m.map=this.map}n=new l(m);n.clazz=l;this.widgets.push(n);return n},loadResource:function(o,m){var n,l,p=new g(),k=function(){var q;if(m==="style"){q=this.loadStyle(o)}else{if(m==="template"){q=this.loadTemplate(o)}else{return p}}q.then(function(r){p.resolve(r)},function(r){p.reject(r)})};if(m==="style"){n=o.folderUrl+"css/style.css";o.styleFile=n;l="hasStyle"}else{if(m==="template"){n=o.folderUrl+"Widget.html";o.templateFile=n;l="hasUIFile"}else{return p}}if(o[l]===false){p.resolve(null)}else{if(o[l]===true){k.apply(this)}else{i.checkFile(n).then((function(q){if(q){k.apply(this)}else{p.resolve(null)}}).bind(this))}}return p},loadStyle:function(k){var l=new g(),m="widget/style/"+k.uri;m=this.replaceId(m);if(c.byId(m)){l.resolve("load");return l}return i.createStyleLink(m,k.styleFile)},loadTemplate:function(k){var l=new g();require(["dojo/text!"+k.templateFile],function(m){l.resolve(m)});return l},replaceId:function(k){return k.replace(/\//g,"_".replace(/\./g,"_"))}});e.getInstance=function(k){if(j===null){j=new e(k)}return j};return e});