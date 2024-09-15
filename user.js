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
