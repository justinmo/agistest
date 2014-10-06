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
 *  Created By: Danny Yin
 *
 * </pre>
 */

define(["dojo/_base/declare",
    "dojo/_base/lang",
    "AGISAPI/BaseWidget",
    "esri/InfoTemplate",
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/tasks/query",
    "esri/toolbars/draw",
    "esri/Color",
    "dojo/dom",
    "dojo/on",
    "dojo/parser",
    "dojo/_base/array",
    "dojo/topic",
    "esri/geometry/Point",
    "esri/SpatialReference",
    "dojo/domReady!"
], function (declare,
            lang,
            BaseWidget,
            InfoTemplate,
            Map,
            FeatureLayer,
            SimpleFillSymbol,
            SimpleLineSymbol,
            SimpleMarkerSymbol,
            Query,
            Draw,
            Color,
            dom,
            on,
            parser,
            arrayUtil,
            topic,
            esriPoint,
            SpatialReference) {
    var clazz = declare([BaseWidget], {
        name: 'SelectionButton',
        featureLayers: [],
        IsLayerLoadedCompleted: null,
        selFeaturs: [],
        preSelLayer: null,
        curSelLayer: null,
        curLayerId: null,
        //baseClass: 'SelectionButton',
        startup: function () {
            this.inherited(arguments);
            this.loadFeatureLayers();
            this.setSelectButtonStyle();
            this.attachClickListener();
            topic.subscribe("widgetChanged", lang.hitch(this, "widgetChanged"));
            topic.subscribe("Select-FeatureLayer", lang.hitch(this, function (selFeatureLayer) {
                this.curSelLayer = selFeatureLayer;
            }));
        },

        /*
          Widget Changed
        */
        widgetChanged: function (handle, enabled) {
            if (handle != this && enabled) {
                this.closeSelection();
                topic.publish('widgetChanged', this, false);
            }
        },

        loadFeatureLayers: function () {
            var i = 0;
            dojo.forEach(this.map.graphicsLayerIds, lang.hitch(this, function (layerId) {
                var layer = this.map.getLayer(layerId);
                var intervalID = setInterval(lang.hitch(this, function () {
                    if (layer.loaded) {
                        i++;
                        clearInterval(intervalID);
                        this.IsLayerLoadedCompleted = i == this.map.graphicsLayerIds.length;
                        if (this.IsLayerLoadedCompleted) {
                            this.getFeatureLayers();
                        }
                    }
                }, 300));
            }));
        },

        getFeatureLayers: function () {
            var layers = this.map.graphicsLayerIds;

            dojo.forEach(layers, lang.hitch(this, function (layerId) {
                var layer = this.map.getLayer(layerId);

                if (layer.type == "Feature Layer") {
                    this.featureLayers.push(layer);
                }
            }));
        },

        attachClickListener: function () {
            on(this.iconDijit.domNode, "click", lang.hitch(this, function (e) {

                if (!this.handleDraw) {
                    this.currentFunction = "SelectFeature";
                    if (this.currentFunction == null) {
                        return;
                    }

                    if (!this.IsLayerLoadedCompleted) {
                        alert("Feature layers is loading, Please wait a moment.");
                        return;
                    }

                    //Draw.EXTENT,Draw.FREEHAND_POLYGON,Draw.POLYGON,Draw.FREEHAND_POLYLINE,Draw.POLYLINE,Draw.POINT
                    this.map.draw.activate(Draw.EXTENT);

                    this.handleDraw = on(this.map.draw, "DrawEnd", lang.hitch(this, function (geometry) {
                        this.drawMapEnd(geometry);
                        this.closeSelection();
                    }));

                    this.activeFeatureLayerSelect();
                    topic.publish('widgetChanged', this, true);
                } else {
                    this.closeSelection();
                }
                e.preventDefault();
                e.stopPropagation();
            }));
        },

        /*
            Clsoe Selection
        */
        closeSelection: function () {
            this.map.draw.activate(null);
            if (this.handleDraw != null) {
                this.handleDraw.remove();
                this.handleDraw = null;
            }
            if (this.iconDijit.domNode && this.iconDijit.domNode.childNodes.length > 0) {
                var btnImage = this.iconDijit.domNode.childNodes[0];
                if (btnImage.tagName == "IMG") {
                    var path = btnImage.src.replace(/(.+\/).*$/g, '$1');
                    btnImage.src = path + "Icon.png";
                }
            }
        },

        activeFeatureLayerSelect: function () {
            dojo.forEach(this.featureLayers, lang.hitch(this, function (layer) {
                on(layer, "selection-complete", lang.hitch(this, function (evt) {
                    if (this.currentFunction != "SelectFeature" || this.curLayerId == evt.target.id) {
                        return;
                    }

                    if (evt.features != null && evt.features.length > 0) {
                        dojo.forEach(evt.features, lang.hitch(this, function (feature) {
                            if (evt.target.visible == true) {
                                this.selFeaturs.push(feature);
                            }
                        }));
                    }

                    this.curLayerId = evt.target.id;
                }));
            }));
        },

        drawMapEnd: function (geometry) {
            this.map.draw.deactivate();

            if (this.currentFunction != "SelectFeature") {
                return;
            }

            //clear
            this.selFeaturs = [];
            this.curLayerId = "";
            if (this.preSelLayer != null) {
                this.preSelLayer.clearSelection();

            }
            else {
                dojo.forEach(this.featureLayers, function (layer) {
                    layer.clearSelection();
                });
            }

            //Query select features
            var selectQuery = new Query();
            selectQuery.geometry = geometry;
            if (this.curSelLayer == null || this.curSelLayer == undefined) {
                dojo.forEach(this.featureLayers, function (layer) {
                    //SELECTION_ADD,SELECTION_SUBTRACT
                    layer.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW);
                });
            }
            else {
                //SELECTION_ADD,SELECTION_SUBTRACT
                this.curSelLayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW);
                this.preSelLayer = this.curSelLayer;
            }

            //show results
            var location = new esri.geometry.Point({ "x": geometry.xmax, "y": geometry.ymax, "spatialReference": { "wkid": geometry.spatialReference.wkid } });
            this.sendFeatureToContentBar(this.selFeaturs);
            this.sendFeatureToInfoWindow(this.selFeaturs, location);

            this.currentFunction = null;
        },

        sendFeatureToInfoWindow: function (features, location) {
            if (features.length == 0) {
                return;
            }

            this.map.infoWindow.show(location);

            //this.map.infoWindow.setFeatures(Featurs);
            //this.map.infoWindow.rewriteSetFeatures(Featurs);
            this.map.layerHandler.ShowFeatures(features);
        },

        sendFeatureToContentBar: function (Featurs) {
            topic.publish("Select-Features", Featurs);
        },

        /*
          Init locate button image event
        */
        setSelectButtonStyle: function () {
            if (this.iconDijit.domNode && this.iconDijit.domNode.childNodes.length > 0) {
                var btnImage = this.iconDijit.domNode.childNodes[0];
                if (btnImage.tagName == "IMG") {
                    on(btnImage, "mouseover", lang.hitch(this, function (evt) {
                        if (!this.handleDraw) {
                            this.changeButton("over");
                        } else {
                            this.changeButton("down");
                        }
                    }));
                    on(btnImage, "mousedown", lang.hitch(this, function (evt) {
                        this.changeButton("down");
                    }));
                    on(btnImage, "mouseup", lang.hitch(this, function (evt) {
                        if (!this.handleDraw) {
                            this.changeButton("over");
                        } else {
                            this.changeButton("down");
                        }
                    }));
                    on(btnImage, "mouseout", lang.hitch(this, function (evt) {
                        if (!this.handleDraw) {
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
        changeButton: function (status) {
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