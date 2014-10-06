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
    "dojo/dom-class",
    "dojo/on",
    'dojo/topic',
    "dojo/_base/array",
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
            domClass,
            on,
            topic,
            arrayUtil,
            TabContainer,
            ContentPane,
            FeatureLayer,
            Legend,
            arrayUtils) {
    var clazz = declare([BaseWidget], {
        name: 'LegendText',
        startup: function () {
            this.inherited(arguments);
            this.initClickEvent();
            //targetDiv.onclick

            this.map.on("layer-suspend", function (layer) {
                if (window.console) {
                    console.log(layer.id + ' suspended');
                }

                var target = document.getElementById("MapLegend");
                var targetDiv = document.getElementById("legendDiv");
                var h = coculateOffset("MapLegend");
                var hIner = coculateOffset("legendDiv");
                target.style.height = h + "px";
                //  targetDiv.style.height = h + "px";
                // $("MapLegend").style.height = h + "px";

                //for (var i = 0; i < targetDiv.children.length; i++) {
                //    if (targetDiv.children[i].style.display = "block") {
                //        target.style.height = (h - targetDiv.children[i].offsetHeight) + "px";
                //    }
                //}
            });
            this.map.on("layer-resume", function (layer) {
                if (window.console) {
                    console.log(layer.id + ' resume');
                }
                var target = document.getElementById("MapLegend");
                var targetDiv = document.getElementById("legendDiv");
                var h = coculateOffset("MapLegend");

                //for (var i = 0; i < targetDiv.children.length; i++) {
                //    if (targetDiv.children[i].style.display = "display") {
                //        target.style.height = (h + targetDiv.children[i].offsetHeight) + "px";
                //    }
                //}
               
                target.style.height = h + "px";
            });
            dojo.connect(this.map, "onExtentChange", function (extent) {
                if (window.console) {
                    console.log("Extent changed : ");
                }
                var target = document.getElementById("MapLegend");
                var targetDiv = document.getElementById("legendDiv");
                if (target.style.display == "block" || target.style.display == "") {
                    var h = coculateOffset("MapLegend");
                    target.style.height = h + "px";
                } else {
                   
                }

            });

            //this.map.on("onExtentChange", function (layer) {
            //    console.log(layer.id + ' resume');
            //    var target = document.getElementById("MapLegend");
            //    var targetDiv = document.getElementById("legendDiv");
            //    var h = coculateOffset("MapLegend");
            //    target.style.height = h + "px";
            //});

            function $(id) { return (document.getElementById(id)) }
            //get real height
            function coculateOffset(ele) {
                var node = $(ele);
                var orignalHeight = node.style.height;
                var orignalDisplay = node.style.display;
                node.style.height = "";
                node.style.display = "block";
                var h = node.offsetHeight;
                node.style.height = orignalHeight;
                node.style.display = orignalDisplay;
                return (h);
            }
        },

        initClickEvent: function () {
            on(dom.byId("LegendText"), "click", lang.hitch(this, "onClick"));
        },
        onClick: function (evt) {

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
                var node = $(ele);
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
            function showEle(ele) {

                var node = $(ele);
                var target = document.getElementById("MapLegend");//LegendText
                if (target.childNodes.length > 10) {
                    var h = 500;
                    $("legendDiv").style.height = 475 + "px";
                }
                else {
                    var h = coculateOffset(ele);
                }


                var i = 1;
                var t = setInterval(function () {
                    i += i;
                    $(ele).style.height = i + "px";
                    $(ele).style.display = "";
                    if (i > h / 2) {
                        $(ele).style.height = h + "px";

                        clearInterval(t);
                    }
                }, 35)
            }
            //hide div
            function hideEle(ele) {
                var h = coculateOffset(ele);
                var t = setInterval(function () {
                    if (h > 2) {
                        h = h / 2;
                    } else {
                        var targetDiv = document.getElementById(ele);
                        targetDiv.style.display = "none";
                        h = 0;
                        clearInterval(t);
                    }
                    $(ele).style.height = h + "px";
                }, 50)
            }
            //show or hid
            function ShowHide(ele) {
                var currentHeight = $(ele).style.display == "none" ? 0 : $(ele).offsetHeight;
                $(ele).style.overflow = "hidden";
                if (currentHeight > 0) {
                    hideEle(ele);
                } else {
                    showEle(ele);
                }
            }
        },
    });


    return clazz;
});