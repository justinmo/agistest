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
    'AGISAPI/BaseWidget',
    'dojo/_base/html',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/topic',
    "esri/toolbars/draw", "esri/graphic", "esri/symbols/PictureMarkerSymbol",
    "esri/tasks/locator", "esri/geometry/webMercatorUtils", "esri/geometry/ScreenPoint",
],
  function (
    declare,
    BaseWidget,
    html,
    on,
    lang,
    dom,
    topic,
    Draw, Graphic, PictureMarkerSymbol,
    Locator, webMercatorUtils, ScreenPoint) {
      var clazz = declare([BaseWidget], {

          name: 'LocateButton',
          locator: new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"),
          handleDraw: null,
          graphic: null,

          /*
            Startup
          */
          startup: function () {              
              topic.subscribe("widgetChanged", lang.hitch(this, "widgetChanged"));
              this.inherited(arguments);
              this.initControl();
              this.locatorEvent();
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
          initClickEvent: function()
          {              
              on(this.iconDijit.domNode, "click", lang.hitch(this, "onClick"));
          },

          /*
            Click the button
          */
          onClick: function(evt)
          {
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
          drawEnd: function (evt)
          {
              this.map.draw.deactivate();
              if (this.graphic != null) {
                  this.map.graphics.remove(this.graphic);
              }
              this.graphic = new Graphic(evt.geometry, new PictureMarkerSymbol({
                  "url": this.folderUrl + "images/marker.png",
                  "height": 30,
                  "width": 21,
                  "type": "esriPMS",
                  "yoffset": 16
              }));
              this.map.graphics.add(this.graphic);
              this.locator.locationToAddress(webMercatorUtils.webMercatorToGeographic(evt.geometry), 100);
              if (this.handleDraw) {
                  this.handleDraw.remove();
              }
              this.enabledInfoWindow();
              topic.publish('widgetChanged', this, false);
          },

          /*
            Clear Draw
          */
          clearDraw: function () {
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
          initButton: function()
          {
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
          },

          /*
            Bing location complete
          */
          locatorEvent:function()
          {
              this.locator.on("location-to-address-complete", lang.hitch(this, "locationComplete"));
          },

          /*
            Location complete
          */
          locationComplete: function (evt)
          {
              if (evt.address.address) {
                  var address = evt.address.address;
                  var location = webMercatorUtils.geographicToWebMercator(evt.address.location);
                  var screenPnt = this.map.toScreen(location);
                  var anchorPnt = new ScreenPoint(screenPnt.x + 10, screenPnt.y - 20);

                  this.map.infoWindow.hide();
                  this.map.infoWindow.clearFeatures();
                  this.map.infoWindow.setTitle("Address Information");
                  this.map.infoWindow.setContent("X:" + location.x + "<p>" + "Y:" + location.y + "</p>" + "<p>" + address.Address + "</p>");
                  //this.map.infoWindow.setContent(address.Address);
                  this.map.infoWindow.show(anchorPnt, this.map.getInfoWindowAnchor(screenPnt));
              }
          }
      });
      return clazz;
  });