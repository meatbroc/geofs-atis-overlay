let airport;
let atisValue;
const styleInject = () => {
    const styleElm = document.createElement('style');
    styleElm.innerHTML = `
    .atis-visible {
        display: block !important;
    }
    .atis-hidden {
        display: none;
    }
    .atis-font {
        font-family: 'LCD-Bold' !important;
    }
    `
}
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
    atisValue = this.responseText;
    atisValue = eval(eval(atisValue)[0]).datis
    if (atisValue) {
        mapElmnt.appendChild(atisDiv);
    }
    atisDiv.innerHTML = atisValue //.datis
}

// Assuming geofs.map is already defined
geofs.map = geofs.map || {};

let mapActiveInternal = geofs.map.mapActive;

 Object.defineProperty(geofs.map, 'mapActive', {
    get() {
        return mapActiveInternal;
    },
    set(value) {
        mapActiveInternal = value;
        // Call the listener function when mapActive changes
        onMapActiveChange(value);
    }
});

function onMapActiveChange(newValue) {
    console.log("mapActive changed to", newValue);
    if (newValue) {
        console.log('showing atis')
    }
}

function createButton(text, onClick, identifier) {
    const button = document.createElement('button');
    button.innerText = text.toUpperCase();
    button.style.position = 'absolute';
    button.style.bottom = '105px';
    button.style.left = '5px';
    button.style.opacity = 0.87;
    button.style.zIndex = 1000; // Raise the z-index
    button.addEventListener('click', onClick);
    button.classList.add('control-pad');
    button.classList.add('control-pad-label');
    button.classList.add('transp-pad')
    button.id = identifier
    return button;
}

function createInput(identifier) {
    const elmnt = document.createElement('input');
    elmnt.style.position = 'absolute';
    elmnt.style.bottom = '80px';
    elmnt.style.left = '5px';
    elmnt.style.zIndex = 1000; // Raise the z-index
    elmnt.classList.add('mdl-input');
    elmnt.classList.add('geofs-stopKeyboardPropagation');
    elmnt.classList.add('geofs-stopKeyupPropagation');
    elmnt.id = identifier
    return elmnt;
}

function createDiv(text, identifier) {
    const atisElmnt = document.createElement('div');
    atisElmnt.innerText = text;
    atisElmnt.style.position = 'absolute';
    atisElmnt.style.bottom = '200px';
    atisElmnt.style.left = '5px';
    atisElmnt.style.zIndex = 1000; // Raise the z-index
    atisElmnt.style.maxWidth = '300px';
    atisElmnt.classList.add('atis-hidden');
    atisElmnt.classList.add('atis-visible');
    atisElmnt.id = identifier
    return atisElmnt;
}

const toggleInput = () => {
    const inputElement = document.getElementById('atis-element')
    inputElement.classList.toggle('atis-visible')
    console.log('clicked')
}

const submitFunc = () => {
    x.airport = airportInput.value;
    airportInput.value = null
}

const overlayButton = createButton('ATIS', toggleInput, 'atis-button');
const atisSubmit = createButton('SUBMIT', submitFunc, 'atis-submit');
atisSubmit.style.left = '75px';
const airportInput = createInput('atis-input');
const atisDiv = createDiv(atisValue, 'atis-element');
// atisDiv.classList.add('atis-font');
atisDiv.style.fontFamily = "LCD-Bold";

const mapElmnt = document.getElementsByClassName('geofs-map-list')[0];
mapElmnt.appendChild(overlayButton);
mapElmnt.appendChild(airportInput);
mapElmnt.appendChild(atisSubmit);
// https://aviationweather.gov/api/data/metar?ids=KSFO
