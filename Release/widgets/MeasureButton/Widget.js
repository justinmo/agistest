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
 *  Notes
 *
 * <Date>       <Who>       <What>
 * 5/2/2014     Ness Su    Initial
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
    "esri/dijit/Measurement", 'dijit/registry',"dijit/Tooltip", "dijit/Dialog", "esri/tasks/GeometryService", "esri/config",
    "esri/units", "esri/symbols/SimpleMarkerSymbol", "dojo/dom-construct",
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
    Measurement, registry,
    Tooltip, Dialog, GeometryService, esriConfig,
    Units, SimpleMarkerSymbol, domConstruct
    ) {
      var clazz = declare([BaseWidget], {

          name: 'MeasureButton',
          //baseClass: 'accelajs-widget-measurebutton',
          measurement: null,
          closeButton: null,
          //baseClass: 'MeasureButton',

          /*
            Startup
          */
          startup: function () {
              esriConfig.defaults.geometryService = new GeometryService(_globalGeometryServerUrl);
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
              var measurement = this.measurement;
              if (!measurement) {
                  var html = '<div class="measurementbar">'
                   + '               <div class="measurementtitle">Measurement</div>'
                  + '               <div id="measurementclosebutton" ><img src="' + this.folderUrl + 'images/btn_close_white.png" /></div>'
                  + '           </div>'
                  + '        <div id="measurementDiv"></div>';
                  var resultPane = domConstruct.create("div", { "class": "measurementpane", "innerHTML": html }, this.domNode);

                  var symbol = new SimpleMarkerSymbol({
                      "color": [255, 255, 255],
                      "size": 7,
                      "angle": -30,
                      "xoffset": 0,
                      "yoffset": 0,
                      "type": "esriSMS",
                      "style": "esriSMSCircle",
                      "outline": {
                          "color": [102, 102, 102],
                          "width": 1,
                          "type": "esriSLS",
                          "style": "esriSLSSolid"
                      }
                  });

                  measurement = new Measurement({ map: this.map, defaultAreaUnit: Units.SQUARE_MILES, defaultLengthUnit: Units.MILES, pointSymbol: symbol }, dom.byId("measurementDiv"));
                  measurement.startup();
                  measurement.hideTool("location");

                  this.closeButton = dom.byId("measurementclosebutton");
                  dojo.connect(this.closeButton, "click", lang.hitch(this, function (evt) {
                      evt.preventDefault();
                      evt.stopPropagation()
                      this.measurement.hide();
                      this.hideDialog();
                      domConstruct.destroy(resultPane);
                      this.enabledInfoWindow();                      
                  }));

                  this.measurement = measurement;

                  dojo.connect(measurement.distance, "onClick", lang.hitch(this, function (evt) {
                      if(measurement.distance.checked)
                      {
                          this.disabledInfoWindow();
                      } else {
                          this.enabledInfoWindow();
                      }
                  }));
                  dojo.connect(measurement.area, "onClick", lang.hitch(this, function (evt) {
                      if (measurement.area.checked) {
                          this.disabledInfoWindow();
                      } else {
                          this.enabledInfoWindow();
                      }
                  }));
                  dojo.connect(measurement.location, "onClick", lang.hitch(this, function (evt) {
                      if (measurement.location.checked) {
                          this.disabledInfoWindow();
                      } else {
                          this.enabledInfoWindow();
                      }
                  }));                  

                  topic.publish('widgetChanged', this, true);
                  measurement.closeTool();
                  measurement.clearResult();
                  measurement.distanceToggleButton();
                  measurement.measureDistance();
                  measurement.setTool("distance", true);
                  this.disabledInfoWindow();
              } else {
                  if (this.closeButton != null) {
                      this.closeButton.click();
                  }
              }
          },

          hideDialog: function () {
              if (this.measurement) {
                  this.measurement.closeTool();
                  this.measurement.clearResult();
                  this.measurement.unit.closeDropDown();
                  this.measurement.destroy();
                  this.measurement = null;
              }
              this.enabledInfoWindow();
              if (this.iconDijit.domNode && this.iconDijit.domNode.childNodes.length > 0) {
                  var btnImage = this.iconDijit.domNode.childNodes[0];
                  if (btnImage.tagName == "IMG") {
                      var path = btnImage.src.replace(/(.+\/).*$/g, '$1');
                      btnImage.src = path + "Icon.png";
                  }
              }
          },

          /*
            Widget Changed
          */
          widgetChanged: function (handle, enabled) {
              if (handle != this && enabled)
              {
                  topic.publish('widgetChanged', this, false);
                  if (this.closeButton != null) {
                      this.closeButton.click();
                  }
              }
          },

          /*
            Init locate button image event
          */
          initButton: function () {
              if (this.iconDijit.domNode && this.iconDijit.domNode.childNodes.length > 0) {
                  var btnImage = this.iconDijit.domNode.childNodes[0];
                  if (btnImage.tagName == "IMG") {
                      on(btnImage, "mouseover", lang.hitch(this,function (evt) {                          
                          if (!this.measurement) {
                              this.changeButton("over");
                          } else {
                              this.changeButton("down");
                          }
                      }));
                      on(btnImage, "mousedown", lang.hitch(this,function (evt) {
                          this.changeButton("down");
                      }));
                      on(btnImage, "mouseup", lang.hitch(this,function (evt) {                          
                          if (!this.measurement) {
                              this.changeButton("over");
                          } else {
                              this.changeButton("down");
                          }
                      }));
                      on(btnImage, "mouseout", lang.hitch(this, function (evt) {
                          if (!this.measurement) {
                              this.changeButton();
                          } else {
                              this.changeButton("down");
                          }
                      }));
                  }
              }
          },

          /*
            Change Button
          */
          changeButton: function(status)
          {
              if (this.iconDijit.domNode && this.iconDijit.domNode.childNodes.length > 0) {
                  var btnImage = this.iconDijit.domNode.childNodes[0];
                  if (btnImage.tagName == "IMG") {
                      var path = btnImage.src.replace(/(.+\/).*$/g, '$1');
                      switch (status) {
                          case "over":
                              btnImage.src = path + "Icon_over.png";
                              break;
                          case "down":
                              btnImage.src = path + "Icon_down.png";
                              break;
                          default:
                              btnImage.src = path + "Icon.png";
                      }

                  }
              }
          }

      });
      return clazz;
  });