/**
 * <pre>
 * 
 *  Accela GIS
 *  Widget.js
 * 
 *  Accela, Inc.
 *  Copyright (C): 2014
 * 
 *  Description:
 * 
 *  Note
 *  Created By: Iron Tang
 *
 * </pre>
 */

define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'AGISAPI/BaseWidget',
    'AGISAPI/utils',
    'esri/dijit/Scalebar',
    'dojo/query',
    'dojo/NodeList-dom',
    "dojo/dom-style"
  ],
  function(
    declare,
    lang,
    BaseWidget,
    utils,
    Scalebar,
    query,
    NodeListDom,
    domStyle) {
    var clazz = declare([BaseWidget], {

      name: 'Scalebar',
      scalebar: null,

      startup: function() {
          this.inherited(arguments);
          var json = {
              scalebar: {
                  scalbarStyle: 'ruler',
                  scalbarUnit: 'metric'
              }
          };

        json.map = this.map;
        if(this.position){
          if(this.position.top !== undefined && this.position.left !== undefined){
            json.attachTo = "top-left";
          }else if(this.position.top !== undefined && this.position.right !== undefined){
            json.attachTo = "top-right";
          }else if(this.position.bottom !== undefined && this.position.left !== undefined){
            json.attachTo = "bottom-left";
          }else if(this.position.bottom !== undefined && this.position.right !== undefined){
            json.attachTo = "bottom-right";
          }
        }
        this.scalebar = new Scalebar(json);
        this.scalebar.show();
        this.domNode.appendChild(this.scalebar.domNode);
        var style = {
          left: 'auto',
          right: 'auto',
          top: 'auto',
          bottom: 'auto',
          width: 'auto'
        };
        lang.mixin(style, this.position);
        domStyle.set(this.scalebar.domNode, utils.getPositionStyle(style));
        setTimeout(lang.hitch(this, function(){
          domStyle.set(this.scalebar.domNode, utils.getPositionStyle(style));
        }),1000);
       
      }
    });
    
    return clazz;
  });