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
 * <Date>       <Who>       <What>
 * 5/2/2014     Ness Su    Add event
 *
 * </pre>
 */

define([
    'dojo/_base/declare',
    'AGISAPI/BaseWidget',
    'dojo/_base/html',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/topic',
    "esri/toolbars/draw", "esri/graphic", "esri/symbols/PictureMarkerSymbol",
],
  function (
    declare,
    BaseWidget,
    html,
    on,
    lang,
    dom,
    topic,
    Draw, Graphic, PictureMarkerSymbol) {
      var clazz = declare([BaseWidget], {

          name: 'DropPin',
          handleDraw: null,
          graphic: null,

          /*
            Startup
          */
          startup: function () {
              topic.subscribe("widgetChanged", lang.hitch(this, "widgetChanged"));
              this.inherited(arguments);
              this.initControl();
          },

          /*
            Init control
          */
          initControl: function () {
              this.initClickEvent();
              this.initButton();
          },

          /*
            Init button click event
          */
          initClickEvent: function () {
              on(this.iconDijit.domNode, "click", lang.hitch(this, "onClick"));
          },

          /*
            Click the button
          */
          onClick: function (evt) {       
              if (!this.handleDraw) {                  
                  this.map.draw.activate(Draw.POINT);
                  this.disabledInfoWindow();
                  this.handleDraw = this.map.draw.on("draw-end", lang.hitch(this, "drawEnd"));
                  topic.publish('widgetChanged', this, true);
              } else {
                  this.clearDraw();
              }
          },

          /*
            Draw end
          */
          drawEnd: function (evt) {
              this.map.draw.deactivate();
              if (this.graphic != null)
              {
                  this.map.graphics.remove(this.graphic);
              }
              this.graphic = new Graphic(evt.geometry, new PictureMarkerSymbol({
                  "url": this.folderUrl + "images/marker.png",
                  "height": 48,
                  "width": 48,
                  "type": "esriPMS",
                  "yoffset": 24
              }));
              this.map.graphics.add(this.graphic);
              if (this.handleDraw) {
                  this.handleDraw.remove();
              }
              this.enabledInfoWindow();
              this.map.infoWindow.show(evt.geometry);
              this.map.infoWindow.rewriteSetFeatures([evt.graphic]);
              topic.publish('widgetChanged', this, false);
          },

          /*
            Clear Draw
          */
          clearDraw: function()
          {
              if (this.handleDraw) {
                  this.handleDraw.remove();
                  topic.publish('widgetChanged', this, false);
              }
          },

          /*
            Widget Chanaged
          */
          widgetChanged: function (handle, enabled) {
              if (handle != this && enabled) {
                  this.clearDraw();
              }
          },

          /*
            Init locate button image event
          */
          initButton: function () {
              if (this.iconDijit.domNode && this.iconDijit.domNode.childNodes.length > 0) {

                  var btnImage = this.iconDijit.domNode.childNodes[0];
                  if (btnImage.tagName == "IMG") {
                      var path = btnImage.src.replace(/(.+\/).*$/g, '$1');
                      on(btnImage, "mouseover", function (evt) {
                          btnImage.src = path + "Icon_over.png";
                      });
                      on(btnImage, "mousedown", function (evt) {
                          btnImage.src = path + "Icon_down.png";
                      });
                      on(btnImage, "mouseup", function (evt) {
                          btnImage.src = path + "Icon_over.png";
                      });
                      on(btnImage, "mouseout", function (evt) {
                          btnImage.src = path + "Icon.png";
                      });
                  }
              }
          }
      });
      return clazz;
  });