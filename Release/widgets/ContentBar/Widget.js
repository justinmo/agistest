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
    "dojo/dom",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/on",
    'dojo/topic',
    "dojo/_base/array",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dojo/query",
    "dojo/domReady!"
], function (declare,
            lang,
            BaseWidget,
            dom,
            domStyle,
            domClass,
            on,
            topic,
            arrayUtil,
            TabContainer,
            ContentPane,
            query)
{
    var clazz = declare([BaseWidget], {
        name: 'ContentBar',
        Loadlayers: null,
        Layers: [],
        IsLayerLoadedCompleted: null,
        startup: function () {
            this.inherited(arguments);
            
            this.loadLayers();
            this.initialControls();
            //this.toggleContentBar();

            topic.subscribe("Load-Layers", lang.hitch(this,this.displayLayers));
            topic.subscribe('Select-Features', lang.hitch(this,this.displaySelectedFeatures));
        },

        loadLayers: function () {
            var i = 0;
            dojo.forEach(this.map.graphicsLayerIds, lang.hitch(this, function (layerId) {
                var layer = this.map.getLayer(layerId);
                var intervalID = setInterval(lang.hitch(this, function () {
                    if (layer.loaded) {
                        i++;
                        clearInterval(intervalID);
                        this.IsLayerLoadedCompleted = i == this.map.graphicsLayerIds.length;
                        if (this.IsLayerLoadedCompleted) {
                            this.getLayers();
                            topic.publish("Load-Layers", this.Layers);
                        }
                    }
                }, 300));
            }));
        },

        getLayers: function () {            
            var optLayers = this.map.itemInfo.itemData.operationalLayers;
            dojo.forEach(optLayers, lang.hitch(this, function (optLayer) {
                var layer = this.map.getLayer(optLayer.id);
                this.Layers.push(layer);
            }));
        },

        initialControls:function()
        {                       
            dom.byId("dijit_layout_pane_layer").innerHTML = "Feature layers is loading.....";
            query(".toc-container")[0].parentNode.style.display = 'none';
            //query(".toc-container").style("display", "none");
            dom.byId("dijit_layout_pane_content").style.display = 'none';
            dom.byId("dijit_layout_pane_layer").style.display = 'block';
            dom.byId("toc-container-menu-content").parentNode.style.display = 'none';

            on(dom.byId("toc-container-menu-layer"), "click", function (e) {
                dom.byId("toc-container-menu-layer").parentNode.style.backgroundColor = 'rgb(244,136,48)';
                dom.byId("toc-container-menu-content").parentNode.style.backgroundColor = 'rgb(74,73,71)';

                dom.byId("dijit_layout_pane_content").style.display = 'none';
                dom.byId("dijit_layout_pane_layer").style.display = 'block';

                e.preventDefault();
                e.stopPropagation();                
            });

            on(dom.byId("toc-container-menu-content"), "click", function (e) {
                dom.byId("toc-container-menu-layer").parentNode.style.backgroundColor = 'rgb(74,73,71)';
                dom.byId("toc-container-menu-content").parentNode.style.backgroundColor = 'rgb(244,136,48)';

                dom.byId("dijit_layout_pane_content").style.display = 'block';
                dom.byId("dijit_layout_pane_layer").style.display = 'none';

                e.preventDefault();
                e.stopPropagation();
            });
        },

        getImgFolderUrl: function()
        {
            return this.folderUrl;
        },

        displayLayers: function (layers)
        {
            var imgUrl = this.getImgFolderUrl() + "images/";

            dom.byId("toc-container-indicator").src = this.getImgFolderUrl() + "images/toc-indicator.png";

            addLayersToToc(layers);
            toggleLayers(layers);
            //ondblclickLayers(layers);

            function addLayersToToc(layers)
            {
                var strLayers = "";
                if (layers!==undefined&& layers != null && layers.length > 0) {
                    strLayers = "<ul>";
                    arrayUtil.forEach(layers, function (layer,index) {
                        var layerName = "";
                        var layerVisbile = false;
                        if(layer&&layer!==undefined){
                            if (layer&&layer.type == undefined) {                            
                                layerName = layer._map.itemInfo.itemData.operationalLayers[index].resourceInfo.name;
                                if (layer.defaultVisibility == undefined) {
                                    layerVisbile = layer.visible;
                                }
                                else {
                                    layerVisbile = layer.defaultVisibility;
                                }
                            }
                            else {
                                if (layer && layer.name) {
                                    layerName = layer.name;
                                    layerVisbile = layer.defaultVisibility;
                                }
                            }
                        var layerId = layer.id;

                        var img = "<img id='" + layerId + "' src='" + imgUrl;
                        if (layerVisbile) {
                            img += "toc-check-true.png";
                        }
                        else {
                            img += "toc-check-false.png";
                        }
                        img += "' />";
                        if (index == layers.length - 1) {
                            strLayers += "<li class='toc-layer-list-item toc-layer-list-item-last'><div>" + img + "</div><div>" + layerName + "</div></li>";
                        }
                        else {
                            strLayers += "<li class='toc-layer-list-item'><div>" + img + "</div><div>" + layerName + "</div></li>";
                        }
                        
                    }});
                    strLayers += "</ul>";
                }
                
                dom.byId("dijit_layout_pane_layer").innerHTML = strLayers;
            }            
            
            function toggleLayers(layers)
            {
                var chks = dojo.query(".toc-layer-list-item img"), chk;
                dojo.forEach(chks, function (chk) {
                    var curlayer;
                    arrayUtil.forEach(layers, function (layer) {
                        if (layer&&layer!==undefined) {
                            if (layer.id == chk.id) {
                                curlayer = layer;
                            };
                        }
                    });
                    on(chk, "click", function (e) {
                        if (chk.src.indexOf("toc-check-true.png") > -1) {
                            curlayer.hide();
                            chk.src = chk.src.replace("toc-check-true.png", "toc-check-false.png");
                        } else {
                            curlayer.show();
                            chk.src = chk.src.replace("toc-check-false.png", "toc-check-true.png");
                        }                        
                    });
                });
            }            

            //function ondblclickLayers(layers) {
            //    var lis = dojo.query(".toc-layer-list-item"), li;
            //    dojo.forEach(lis, function (li) {                 
            //        on(li, "dblclick", function (e) {
            //            e.preventDefault();
            //            e.stopPropagation();

            //            var clickLayer = null;
            //            dojo.forEach(layers, function (layer) {
            //                if (layer.id == li.firstChild.firstChild.id) {
            //                    clickLayer = layer;
            //                }
            //            });
            //            if (clickLayer.type == undefined || clickLayer.type != 'Feature Layer') {
            //                return;
            //            }
                        
            //            clearLeyerBackColor();                   
            //            domClass.add(li, "toc-layer-list-item-dblclik-backcolor");                                                 
            //            topic.publish("Select-FeatureLayer", clickLayer);                        
            //        });
            //    });
            //}

            function clearLeyerBackColor()
            {
                var lis = dojo.query(".toc-layer-list-item"), li;
                dojo.forEach(lis, function (li) {
                    domClass.remove(li);
                    domClass.add(li, "toc-layer-list-item");
                });
            }
        },    
        
        displaySelectedFeatures: function (features)
        {
            dom.byId("dijit_layout_pane_content").innerHTML = "";
            if (features != null && features.length > 0)
            {
                var content = "";
                var fetMap = this.map;
                arrayUtil.forEach(features, function (feature,index)
                {
                    var name = fetMap.layerHandler.getIdfieldByLayer(feature._graphicsLayer);
                    var value = feature.attributes[name];
                    
                    if (name != '' && value != '') {
                        if (index == features.length - 1) {
                            content += "<li class='toc-select-list-item toc-select-list-item-last'><span><b>" + name + ":</b>&nbsp;&nbsp;" + value + "</span>";
                        }
                        else {
                            content += "<li class='toc-select-list-item'><span><b>" + name + ":</b>&nbsp;&nbsp;" + value + "</span>";
                        }
                    }
                });
                if (content != '') {
                    dom.byId("dijit_layout_pane_content").innerHTML = "<ul>" + content + "</ul>";
                }
            }
        }
    });
    
    return clazz;
});