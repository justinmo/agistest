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

define(['dojo/_base/declare',
    'dojo/_base/lang',
    'AGISAPI/BaseWidget',
    'AGISAPI/utils',
    "dojo/dom",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/on",
    'dojo/topic',
    "dojo/_base/array",
    "dojo/query",
    "dojo/domReady!"
], function (declare,
            lang,
            BaseWidget,
            utils,
            dom,
            domStyle,
            domClass,
            on,
            topic,
            arrayUtil,
            query) {
    var clazz = declare([BaseWidget], {
        name: 'ContentButton',
        featureLayers: [],
        IsLayerLoadedCompleted: null,
        IsTocShow:null,
        startup: function () {
            this.inherited(arguments);
            this.loadFeatureLayers();            
            this.toggleContentButtn();
            topic.subscribe("widgetChanged", lang.hitch(this, "widgetChanged"));
        },

        /*
          Widget Changed
        */
        widgetChanged: function (handle, enabled) {
            if (handle != this && enabled) {
                this.closePanel();
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

        toggleContentButtn:function()
        {
            on(dom.byId(this.iconDijit.domNode), "click", lang.hitch(this,function (e) {
                if (!this.IsLayerLoadedCompleted) {
                    alert("Feature layers is loading, Please wait a moment.");
                    return;
                }

                var tocLayer = dom.byId("dijit_layout_pane_layer");
                if (tocLayer == null)
                {
                    alert("Toc control is loading, Please wait a moment.");
                    return;
                }

                if (!this.IsTocShow) { 
                    query(".toc-container")[0].parentNode.style.display = 'block';
                    this.IsTocShow = true;
                    topic.publish('widgetChanged', this, true);
                }
                else {
                    this.closePanel();
                }


                e.preventDefault();
                e.stopPropagation();
            }));
        },

        /*
            Close Panel
        */
        closePanel: function () {
            document.getElementsByName('imgBtnContentButton')[0].firstChild.style.visibility = "visible";
            //query(".toc-container").style("display", "none");
            query(".toc-container")[0].parentNode.style.display = 'none';
            this.IsTocShow = false;
        }
        
    });




    return clazz;
});