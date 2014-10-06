/**
 * <pre>
 * 
 *  Accela GIS
 *  InitParams.js
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

dojoConfig = {
    locale: "en",
    parseOnLoad: true,
    async: true,
    tlmSiblingOfDojo: false,
    has: {
        'extend-esri': 1,
        "dojo-firebug": true,
        "dojo-debug-messages": true
    },
    aliases: [
            ["AGIS", "AGISAPI/Main"]
    ],
    parseOnLoad: false,
    packages: [{
        name: "widgets",
        location: _globalGISUrl + "widgets"
    }, {
        name: "AGISAPI",
        location: _globalGISUrl + "AccelaJS/AGISModules"
    },
    {
        name:"UTest",
        location: _globalGISUrl+"UnitTest/Jasmine"
    }
    ],
    // Timeout after 10 seconds
    //waitSeconds: 10,
    map: {
        // Instead of having to type "dojo/domReady!", we just want "ready!" instead
        "*": {
            ready: "dojo/domReady"
        }
    },
    // Get "fresh" resources
    cacheBust: false,
    isDebug: false
};