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
 * 5/2/2014     Iron Tang    Init
 *
 * </pre>
 */

require(['dojo/dom-construct', "dojo/_base/window"], function (domConstruct, win) {
    var agisMap, agisLocator;
    var cssList = [_globalGISUrl + 'themes/Default/mapViewer.css',
        _globalGISUrl + 'themes/Default/InfoWindows/InfoGeocoding.css',
        _globalGISUrl + 'themes/Default/InfoWindows/InfoWindow.css',
        _globalGISUrl + 'themes/Default/GisInfo/GisInfo.css',
    _globalESRIUrl + 'js/dojo/dojo/resources/dojo.css',
    _globalESRIUrl + 'js/dojo/dijit/themes/claro/claro.css',
    _globalESRIUrl + 'js/esri/css/esri.css'];
    for(var i=0;i<cssList.length;i++)
    {
        domConstruct.create("link", { href: cssList[i], rel: "stylesheet" }, win.body());
    }
});