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
    'dojo/_base/fx',
    'dojo/fx',
    'AGISAPI/BaseWidget',
    'dojo/dnd/move',
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/on',
    'dojo/_base/html',
    'dojo/query',
    'dijit/form/HorizontalSlider',
    'dojo/_base/lang',
    'dojo/dom-style',
    'AGISAPI/utils'
],
  function (
    declare,
    basefx,
    fx,
    BaseWidget,
    movable,
    lang,
    dom,
    domClass,
    on,
    html,
    query,
    HorizontalSlider,
    lang,
    domStyle,
    utils
    ) {
      var clazz = declare([BaseWidget], {
          name: 'sliderBar',
          //baseClass: 'accelajs-widget-sliderBar',
          maxZoomLevel:0,
          minZoomLevel: 0,
          lenPlus:35,
          lenDec: 28,
          controlHeight:25,
          rightPosition:0,
          leftPosition:0,
          topPosition: 0,
          eventStatus: 'default',
          controlWeight: 160,
          //baseClass: 'sliderBar accelajs-widgets-forACA',

          startup: function () {
              this.inherited(arguments);
              this.initConst();
              this.initControl();
              this.own(on(this.slBarLine, 'click', lang.hitch(this, this.onClickHander)));
          },

          setBtnPosition: function (ps) {
              if (this.slBarbtn) {
                  domStyle.set(this.slBarbtn, 'position', 'relative');
                  domStyle.set(this.slBarbtn, 'left', ps + 'px');
              }
          },

          onClickHander: function (e) {
              if (!(this.eventStatus === 'MoveStop')) {
                  if (e) {
                      var el = e.offsetX;
                      if (el) {
                          var ps = Math.floor(el);
                          this.setBtnPosition(ps);
                          var cl = Math.floor((this.maxZoomLevel - this.minZoomLevel) * (this.controlWeight - ps) / this.controlWeight);
                          this.setMapLev(cl);
                      }
                  }
              }
              this.eventStatus = 'click';
          },

          setMapLev:function(el){
              if (this.map) {
                  this.map.setLevel(el);
              }
          },

          initConst:function(){
              if (this.map) {
                  this.maxZoomLevel = this.map.getMaxZoom();
                  this.minZoomLevel = this.map.getMinZoom();
                  this.currentLevel = this.map.getLevel();
              }

              if (this.position) {
                  if (this.position.left)
                      this.leftPosition = this.position.left;
                  if (this.position.right)
                      this.rightPosition = this.position.right;
                  if (this.position.top)
                      this.topPosition = this.position.top;
              }
          },

          initControl: function () {
              var ele = query(this.slBarbtn);
              var len = this.position;
              if (ele) {
                  this.moveable = new movable.boxConstrainedMoveable(
                      ele[0],
                      {
                          box: { l: 0, t: 0, w: 180, h: 0}
                      });

                  this.own(on(this.moveable, "MoveStop", lang.hitch(this,function (evt) {
                      var le = ele[0].offsetLeft;
                      this.eventStatus = "MoveStop";
                      if (this.maxZoomLevel>0) {
                          var cl = Math.floor((this.maxZoomLevel - this.minZoomLevel) * (this.controlWeight-le) / this.controlWeight);
                          if (this.map) {
                              this.map.setLevel(cl);
                          };
                      }
                  })));
              }
          },

          _onPlusClick:function(evt){
              if (this.map) {
                  var level = this.map.getLevel();
                  if (level < this.maxZoomLevel) { 
                      this.map.setLevel(level + 1);
                      var wid = Math.floor((level + 1) * this.controlWeight / this.maxZoomLevel);
                      this.setBtnPosition(this.controlWeight-wid);
                  }
              }
          },

          _onDecremClick:function(evt){
              if (this.map) {
                  var level = this.map.getLevel();
                  if (level > 0) {
                      this.map.setLevel(level - 1);
                      var wid = Math.floor((level - 1) * this.controlWeight / this.maxZoomLevel);
                      this.setBtnPosition(this.controlWeight-wid);
                  }
              }
          },

          _onMouseLeave: function (evt)
          {
              query(this.slBarbtn).style('display', 'none');///
              query(this.slBarbg).style('width', 0 + 'px');
          },

          _onMouseEnter: function (evt) {
              var level = this.map.getLevel();
              if (level > 0) {
                  if(this.maxZoomLevel>0){
                      var lef = (this.controlWeight * level) / this.maxZoomLevel;
                      this.setBtnPosition(this.controlWeight-lef);
                  }
              }
              query(this.slBarbtn).style('display', 'block');
              query(this.slBarbg).style('width', this.controlWeight + 'px');

          },

          _onPlusMouseEnter: function (evt) {
              domClass.toggle(this.slBarPlus, "sliderBarPlus");
              domClass.toggle(this.slBarPlus, "sliderBarPlusMouseOver",true);
          },

          _onPlusMouseLeave: function (evt) {
              domClass.toggle(this.slBarPlus, "sliderBarPlusMouseOver");
              domClass.toggle(this.slBarPlus, "sliderBarPlus",true);
          },

          _onIncrMouseEnter: function (evt) {
              domClass.toggle(this.slBarIcre, "sliderBarIcre");
              domClass.toggle(this.slBarIcre, "sliderBarIcreMouseOver", true);
          },

          _onIncrMouseLeave: function (evt) {
              domClass.toggle(this.slBarIcre, "sliderBarIcreMouseOver");
              domClass.toggle(this.slBarIcre, "sliderBarIcre", true);
          }

      });
      return clazz;
  });