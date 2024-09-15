// ==UserScript==
// @name         Chat Buttons
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds an ATIS overlay for a selected airport
// @author       Your Name
// @match        https://geo-fs.com/geofs.php*
// @match        https://*.geo-fs.com/geofs.php*
// @match        https://www.geo-fs.com/geofs.php?v=3.82
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
