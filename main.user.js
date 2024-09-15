// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-09-15
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let airport;

    const x = {
        airportInternal: '',
        airportListener: function (val) { },
        set airport(val) {
            this.airportInternal = val.toUpperCase(); // Convert to uppercase
            this.airportListener(this.airportInternal); // Pass the uppercase value to the listener
        },
        get airport() {
            return this.airportInternal.toUpperCase();
        },
        registerListener: function (listener) {
            this.airportListener = listener;
        }
    };

    x.registerListener(function (val) {
        console.log("Airport changed to", val);
        const req = new XMLHttpRequest();
        req.addEventListener("load", reqListener);
        req.open("GET", `https://datis.clowd.io/api/${val}`);
        req.send();
    });

    function reqListener() {
        console.log(this.responseText);
    }
})();
