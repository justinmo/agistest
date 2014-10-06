/**
 * <pre>
 * 
 *  Accela GIS
 *  AGPictureMarkerSymbol.js
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
 * 6/14/2014     Iron Tang    init
 *
 * </pre>
 */

define(['dojo/_base/declare',
        'dojo/mouse',
        'esri/symbols/PictureMarkerSymbol'

], function (declare,mouse, PictureMarkerSymbol) {

    var instance, clazz;
    clazz = declare(PictureMarkerSymbol, {


        postCreate: function () {
            this.inherited(arguments);
        },

        startUp: function () {

        }

    });

    return clazz;

});