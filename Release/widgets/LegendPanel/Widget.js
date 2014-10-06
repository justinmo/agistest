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
 *  Created By: Barry Wei
 *
 * </pre>
 */

define(['dojo/_base/declare',
    'dojo/_base/lang',
    'AGISAPI/BaseWidget',
    'AGISAPI/utils',
    "dojo/dom",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/on",
    'dojo/topic',
    "dojo/_base/array",
    'dojo/query',
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "esri/layers/FeatureLayer",
    "esri/dijit/Legend",
    "dojo/_base/array",
    "dijit/layout/AccordionContainer",
    "dojo/domReady!"
], function (declare,
            lang,
            BaseWidget,
            utils,
            dom,
            domStyle,
            domConstruct,
            domClass,
            on,
            topic,
            arrayUtil,
            dojoQuery,
            TabContainer,
            ContentPane,
            FeatureLayer,
            Legend,
            arrayUtils) {
    var clazz = declare([BaseWidget], {
        name: 'LegendText',
        startup: function () {
            this.inherited(arguments);
            // var legendDiv = domConstruct.create("div", { "id": "legendDiv" }, this.domNode);
            var map = this.map;
            var loadMapCount = 0;
            var legendLayers = [];
            for (var c in this.map._layers) {
                var str = this.map._layers[c];
                if (this.map._layers[c].capabilities && this.map._layers[c].capabilities.toLowerCase() == "query") {
                    legendLayers.push({ layer: this.map._layers[c], title: this.map._layers[c].name });
                    loadMapCount++;
                }
            }
            var ctrl = dom.byId("LegendImageIcon");
            var imgPath = this.folderUrl + "image/icon_expand.png";
            ctrl.innerHTML = "<img  src=" + imgPath + ">";



            var legend = new esri.dijit.Legend({
                map: map,
                layerInfos: legendLayers
            }, "legendDiv");
            legend.startup();

            //  attr.setAttribute("style", "font-weight:bold;");
            var layers = this.map._layers;

            var legendPanelHeight = dom.byId("MapLegend").style.offsetHeight;

            this.initClickEvent(layers, legendLayers, this.folderUrl);
            //var targetDiv = document.getElementById("MapLegend");
            //targetDiv.style.display = "none";
            ResetLegend(layers);

            dojo.connect(this.map, "onExtentChange", function (extent) {
                //console.log("Extent changed : ");
                var target = document.getElementById("MapLegend");
                if (target == null || target == undefined) {
                    return;
                }
                if (target.style.display == "block" || target.style.display == "") {
                    ResetLegend(layers);
                } else {

                }
                var targetDiv = document.getElementById("legendDiv");
                target.style.height = (targetDiv.offsetHeight + 25) + "px";
            });

            function ResetLegend() {
                for (var ly in layers) {
                    var legendLayer = layers[ly];
                    if (legendLayer.capabilities == "Query") {
                        var legendDiv = document.getElementById("legendDiv_" + layers[ly].id);
                        if (legendDiv != null || legendDiv) {
                            if (legendDiv.childNodes.length > 1 &&
                                legendDiv.childNodes[1].childNodes.length > 1 &&
                                legendDiv.childNodes[1].childNodes[1].childNodes.length > 0 &&
                                legendDiv.childNodes[1].childNodes[1].childNodes[0].childNodes.length > 0 &&
                                legendDiv.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes.length > 1 &&
                                legendDiv.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes.length > 0) {
                                var name = layers[ly].name;
                                if (name.length - 17 >= 0 && name.length >= 0 && name.length - 17 <= name.length) {
                                    name = "..." + name.substring(name.length - 16, name.length)
                                }
                                legendDiv.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML = "<tbody><tr><td align=\"left\"><span class=\"esriLegendServiceLabel\">" + name + "</span></td></tr></tbody>";
                                legendDiv.childNodes[0].innerHTML = "";
                            }
                        }
                    }

                }
            }

            this.map.on("layer-resume", function (layer) {
                console.log(layer.id + ' resume');
                var target = document.getElementById("MapLegend");
                var targetDiv = document.getElementById("legendDiv");
                var h = coculateOffset("MapLegend");
                var hIner = coculateOffset("legendDiv");

                ResetLegend(layers);
                var h2 = coculateOffset("MapLegend");
                var hIner2 = coculateOffset("legendDiv");
                if (h2 > 30) {
                    $("MapLegend").style.height = (hIner2 + 25) + "px";
                }
            });

            this.map.on("layer-suspend", function (layer) {
                console.log(layer.id + ' suspended');


                var target = document.getElementById("MapLegend");
                var targetDiv = document.getElementById("legendDiv");
                var h = coculateOffset("MapLegend");
                var hIner = coculateOffset("legendDiv");

                ResetLegend(layers);
                var h1 = coculateOffset("MapLegend");
                var hIner1 = coculateOffset("legendDiv");
                if (h1 > 30) {
                    $("MapLegend").style.height = (hIner1 + 25) + "px";
                }
            });

            function $(id) { return (document.getElementById(id)) }
            //get real height
            function coculateOffset(ele) {
                var node = document.getElementById(ele);
                if (node == null || node == undefined) {
                    return;
                }
                var orignalHeight = node.style.height;
                var orignalDisplay = node.style.display;
                node.style.height = "";
                node.style.display = "block";
                var h = node.offsetHeight;
                node.style.height = orignalHeight;
                node.style.display = orignalDisplay;
                return (h);
            }

            dom.byId("MapLegend").style.overflow = "hidden";
        },
        initClickEvent: function (layers, legendLayers, url) {
            on(dom.byId("LegendTitle"), "click", lang.hitch(this, function (evt) {
                this.onClick(evt, layers, legendLayers, url);
            }));

        },
        downOnClick: function (evt) {




            ShowHide("MapLegend");
            //get real height
            function coculateOffset(ele) {
                var node = document.getElementById(ele);
                var orignalHeight = node.style.height;
                var orignalDisplay = node.style.display;
                node.style.height = "";
                node.style.display = "block";
                var h = node.offsetHeight;
                node.style.height = orignalHeight;
                node.style.display = orignalDisplay;
                return (h);
            }
            function $(id) { return (document.getElementById(id)) }
            function ShowHide(ele) {
                var currentHeight = $(ele).style.display == "none" ? 0 : $(ele).offsetHeight;
                $(ele).style.overflow = "hidden";
                if (currentHeight > 123) {
                    downDiv(ele);
                }
            }
            function downDiv(ele) {

                var node = $(ele);
                var target = document.getElementById("MapLegend");//LegendText
                if (target.childNodes.length > 10) {
                    var h = 500;
                    $("legendDiv").style.height = 475 + "px";
                }
                else {
                    var h = coculateOffset(ele);
                }
                var hEnd = 122;
                var x = h - hEnd;
                var t = setInterval(function () {
                    if (x > 2) {
                        x = x / 2;
                    } else {
                        //var targetDiv = document.getElementById(ele);
                        //targetDiv.style.display = "none";
                        h = 99;
                        clearInterval(t);
                    }
                    $(ele).style.height = 119 + x + "px";
                }, 50)

            }
        },

        onClick: function (evt, layers, legendLayers, PathUrl) {
            ShowHide("MapLegend");

            function HideDiv(targetid) {
                if (document.getElementById) {
                    var target = document.getElementById(targetid);
                    if (target.style.display == "block" || target.style.display == "") {
                        target.style.display = "none";
                    } else {
                        target.style.display = "block";
                    }
                }
            }
            var divHeight = 206;

            function $(id) { return (document.getElementById(id)) }
            //get real height
            function coculateOffset(ele) {
                var node = document.getElementById(ele);
                var orignalHeight = node.style.height;
                var orignalDisplay = node.style.display;
                node.style.height = "";
                node.style.display = "block";
                var h = node.offsetHeight;
                node.style.height = orignalHeight;
                node.style.display = orignalDisplay;
                return (h);
            }
            //show div
            function downDiv(ele) {

                var node = $(ele);
                var target = document.getElementById("MapLegend");//LegendText
                if (target.childNodes.length > 10) {
                    var h = 500;
                    $("legendDiv").style.height = 475 + "px";
                }
                else {
                    var h = coculateOffset(ele);
                }
                var hEnd = 27;
                var x = h - hEnd;
                var t = setInterval(function () {
                    if (x > 2) {
                        x = x / 2;
                    } else {
                        //var targetDiv = document.getElementById(ele);
                        //targetDiv.style.display = "none";
                        $("legendDiv").style.display = "none";
                        h = 99;
                        clearInterval(t);
                    }
                    $(ele).style.height = 24 + x + "px";
                }, 50)

            }

            //hide div
            function upDiv(ele) {

                var h = coculateOffset(ele);
                var targetDiv = document.getElementById(ele);
                var hStart = targetDiv.offsetHeight;
                var i = 1;
                var t = setInterval(function () {
                    i += i;
                    $(ele).style.height = hStart + i + "px";
                    $(ele).style.display = "";
                    if (i > (h - 27) / 2) {
                        $(ele).style.height = (h - 3) + "px";

                        clearInterval(t);
                    }
                }, 35)


            }
            //show or hid
            function ShowHide(ele) {

                var currentHeight1 = $("MapLegend").style.display == "none" ? 0 : $("MapLegend").offsetHeight;
                var currentHeight = $(ele).style.display == "none" ? 0 : $(ele).offsetHeight;
                $(ele).style.overflow = "hidden";
                if (currentHeight1 < 30) {
                    $("legendDiv").style.display = "";
                    ReGetMaplegend = 0;
                    var h = coculateOffset(ele);
                    // $("legendPane").style.height = (h - 2) + "px";
                    $(ele).style.height = (h - 2) + "px";
                    // upDiv(ele);
                    var ctrl = dom.byId("LegendImageIcon");
                    var imgPath = PathUrl + "image/icon_expand.png";
                    ctrl.innerHTML = "<img src=" + imgPath + ">";
                    var domId = dom.byId("LegendTitle");
                    dojoQuery(".outDiv").style("opacity", "0.9");
                    //if (domId) {
                    //    domId = dom.byId("MapLegend");
                    //}
                    //dojo.connect(domId, "onclick", function (evt) {
                    //    dojoQuery("#LegendTitle").style("background-color", "#2e2c2c");
                    //});
                }
                else {
                    $("legendDiv").style.display = "none";
                    $(ele).style.height = "25px";
                    dojoQuery(".outDiv").style("opacity", "0.7");
                    var ctrl = dom.byId("LegendImageIcon");
                    var imgPath = PathUrl + "image/icon_collapse.png";
                    ctrl.innerHTML = "<img src=" + imgPath + ">";
                    // downDiv(ele);     
                    //dojo.connect(dom.byId("LegendTitle"), "onclick", function (evt) {
                    //    dojoQuery("#LegendTitle").style("background-color", "#8b9599");
                    //});
                }
            }
        }

    });


    return clazz;
});