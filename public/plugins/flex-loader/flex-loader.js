var FlexLoader = class  {

    static show(msg) {
        let flexLoaderOverlay = document.createElement('div');
        flexLoaderOverlay.classList.add("flexLoaderOverlay");

        let flexLoaderSpinner = document.createElement('div');
        flexLoaderSpinner.classList.add("flexLoaderSpinner");

        let flexLoaderText = document.createElement('div');
        flexLoaderText.classList.add("flexLoaderText");
        flexLoaderText.innerHTML = msg ? msg : "Carregando...";

        flexLoaderOverlay.appendChild(flexLoaderSpinner);
        flexLoaderOverlay.appendChild(flexLoaderText);
        document.body.appendChild(flexLoaderOverlay);
    }

    static hide() {
        let flexLoaderOverlay = document.querySelector('.flexLoaderOverlay');
        if(flexLoaderOverlay) flexLoaderOverlay.parentNode.removeChild(flexLoaderOverlay);
    }

    static hideAll() {
        console.log('teste');
        for(let flexLoaderOverlay of document.querySelectorAll('.flexLoaderOverlay')) {
            flexLoaderOverlay.parentNode.removeChild(flexLoaderOverlay);
        }
    }

    static showInside(element) {
        if(typeof element === 'string') element = document.querySelector(element);
        element.style.position = 'relative';

        let flexLoaderInsideOverlay = document.createElement("div");
        flexLoaderInsideOverlay.classList.add("flexLoaderInsideOverlay");

        let flexLoaderSpinner = document.createElement("div");
        flexLoaderSpinner.classList.add("flexLoaderSpinner");

        flexLoaderInsideOverlay.appendChild(flexLoaderSpinner);
        element.appendChild(flexLoaderInsideOverlay);
    }

    static hideInside(element) {
        if(typeof element === 'string') element = document.querySelector(element);
        if(!element) return false;

        let flexLoaderInsideOverlay = element.querySelector(".flexLoaderInsideOverlay");
        if(!flexLoaderInsideOverlay) return false;

        flexLoaderInsideOverlay.parentNode.removeChild(flexLoaderInsideOverlay);
    }

};
