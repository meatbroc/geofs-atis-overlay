x.registerListener(function (val) {
    console.log("Airport changed to", val);
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", `https://datis.clowd.io/api/${airportName}`);
    req.send();
});
const x = {
airportInternal: '',
airportListener: function (val) { },
set airport(val) {
this.airportInternal = val;
this.airportListener(val);
},
get airport() {
return this.airportInternal;
},
registerListener: function (listener) {
this.airportListener = listener;
}
};
