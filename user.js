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
    button.style.position = 'relative';
    button.style.zIndex = 1000; // Raise the z-index
    button.addEventListener('click', onClick);
    button.classList.add('mdl-button');
    button.id = identifier
    return button;
}

function createInput(identifier) {
    const elmnt = document.createElement('input');
    elmnt.style.position = 'relative';
    elmnt.style.zIndex = 1000; // Raise the z-index
    elmnt.addEventListener('click', onClick);
    elmnt.classList.add('mdl-input');
    elmnt.classList.add('geofs-stopKeyboardPropagation');
    elmnt.classList.add('geofs-stopKeyupPropagation');
    elmnt.id = identifier
    return elmnt;
}

function createDiv(text, onClick, identifier) {
    const atisElmnt = document.createElement('div');
    atisElmnt.innerText = text.toUpperCase();
    atisElmnt.style.position = 'relative';
    atisElmnt.style.zIndex = 1000; // Raise the z-index
    atisElmnt.addEventListener('click', onClick);
    atisElmnt.classList.add('atis-hidden');
    atisElmnt.classList.add('atis-visible');
    atisElmnt.id = identifier
    return atisElmnt;
}

const toggleInput = () => {
    const inputElement = document.getElementById('atis-input')
    inputElement.classList.toggle('atis-visible')
}

const overlayButton = createButton('ATIS', toggleInput, 'atis-button')
const airportInput = createInput('airport-input')
const atisDiv = createDiv(atisValue)
