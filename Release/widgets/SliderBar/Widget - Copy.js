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
    'accelajs/BaseWidget',
    'dojo/dom',
    'dojo/_base/html',
    'dojo/query',
    'dijit/form/HorizontalSlider',
    'dojo/_base/lang',
    'dojo/dom-style',
    'accelajs/utils'
],
  function (
    declare,
    BaseWidget,
    dom,
    html,
    query,
    HorizontalSlider,
    lang,
    domStyle,
    utils
    ) {
      var clazz = declare([BaseWidget], {

          //name: 'DropPin',
          //baseClass: 'accelajs-widget-droppin',

          //startup: function () {
          //    this.inherited(arguments);

          //    var sliderDiv = query('#slider');

          //    this.slider = new HorizontalSlider({
          //        name: "slider",
          //        value: 5,
          //        minimum: -10,
          //        maximum: 10,
          //        intermediateChanges: true,
          //        style: "width:300px;",
          //        onChange: function (value) {
          //            //dom.byId("sliderValue").value = value;
          //        }
          //    }, "slider");

          //    //this.slider.show();
          //    this.domNode.appendChild(this.slider.domNode);
          //    var style = {
          //        left: 'auto',
          //        right: 'auto',
          //        top: 'auto',
          //        bottom: 'auto',
          //        width: 'auto'
          //    };
          //    lang.mixin(style, this.position);
          //    domStyle.set(this.slider.domNode, utils.getPositionStyle(style));
          //    setTimeout(lang.hitch(this, function () {
          //        domStyle.set(this.slider.domNode, utils.getPositionStyle(style));
          //    }), 1000);
          //},

      });
      return clazz;
  });