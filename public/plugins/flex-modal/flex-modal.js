var FlexModal = class 
{
    static show(params) 
    {
        if (! params) params = {};

        let flexModalOverlay = document.createElement("div");
        let flexModal = document.createElement("div");
        let flexModalTitle = document.createElement("div");
        let flexModalTitleText = document.createElement("span");
        let flexModalTitleBtnClose = document.createElement("span");
        let flexModalBody = document.createElement("div");

        let uniqueId = '_' + Math.random().toString(36).substr(2, 9);
        flexModalOverlay.id =  uniqueId;

        if(typeof params.target === 'string') {
            params.target = document.querySelector(params.target);
        }

        if(params.target) {
            flexModalOverlay.originalParentNode = params.target.parentNode;
        }

        flexModalOverlay.classList.add("flexModalOverlay");
        flexModal.classList.add("flexModal");
        flexModalTitle.classList.add("flexModalTitle");
        flexModalTitleText.classList.add("flexModalTitleText");
        flexModalTitleBtnClose.classList.add("flexModalTitleBtnClose");
        flexModalBody.classList.add("flexModalBody");
        
        if(params.target)  {
            flexModalBody.appendChild(params.target);
        } 
        
        if(typeof params.content === 'string') {
            flexModalBody.style.padding = "20px";
            flexModalBody.style.textAlign = "center";
            flexModalBody.innerHTML = params.content;
        }

        if(typeof params.content === 'object') {
            flexModalBody.appendChild(params.content);
        }

        if(params.title) {
            flexModalTitleText.innerHTML = params.title;
        }

        if(params.noTitle) {
            flexModalTitle.style.display = 'none';
        }

        if(params.noBtnClose) {
            flexModalTitleBtnClose.style.display = 'none';
        }

        if(params.onlyContent) {
            flexModalTitle.style.display = 'none';
            flexModal.style.backgroundColor = 'transparent';
            flexModal.style.boxShadow = 'none';
            flexModal.style.padding = '0';
        }

        if(params.theme) {
            flexModal.classList.add(params.theme);
        }

        flexModalTitleBtnClose.innerHTML = "&#10005";
        flexModalTitleBtnClose.addEventListener("click", function() {
            FlexModal.dismiss(flexModalOverlay.id);
            if(params.onClose) params.onClose();
        });

        flexModalOverlay.addEventListener("click", function() {
            FlexModal.dismiss(flexModalOverlay.id);
            if(params.onClose) params.onClose();
        });

        if(params.onClickOverlay) {
            flexModalOverlay.addEventListener("click", function() {
                params.onClickOverlay();
            }); 
        }

        flexModal.addEventListener("click", function(event) {
            event.stopPropagation();
        });

        flexModalOverlay.appendChild(flexModal);
        flexModal.appendChild(flexModalTitle);
        flexModalTitle.appendChild(flexModalTitleText);
        flexModalTitle.appendChild(flexModalTitleBtnClose);
        flexModal.appendChild(flexModalBody);
        document.body.appendChild(flexModalOverlay);
        
        return uniqueId;
    }

    static hide(modalId) { FlexModal.dismiss(modalId); }
    static close(modalId) { FlexModal.dismiss(modalId); }
    static dismiss(modalId) 
    {
        if(modalId) {
            let target = document.getElementById(modalId);
            FlexModal.animatedClosing(target);
        } else {
            let allTargets = document.querySelectorAll('.flexModalOverlay');
            let lastTarget = allTargets.item(allTargets.length - 1);
            FlexModal.animatedClosing(lastTarget);
        }
    }

    static hideAll() { this.dismissAll(); }
    static closeAll() { this.dismissAll(); }
    static dismissAll()
    {
        let allTargets = document.querySelectorAll('.flexModalOverlay');
        for (let target of allTargets) {
            FlexModal.animatedClosing(target);
        }
    }
    
    static animatedClosing(flexModalOverlay) 
    {
        flexModalOverlay.classList.add('closing');

        setTimeout(function() {

            if(flexModalOverlay.originalParentNode) {
                for(let element of flexModalOverlay.querySelectorAll(".flexModalBody > *")) {
                    flexModalOverlay.originalParentNode.appendChild(element);
                }
            }
            
            if(! flexModalOverlay.parentNode) return;
            flexModalOverlay.parentNode.removeChild(flexModalOverlay);

        }, 500);
    }

    static showYesNo(params)
    {
        if(! params.yes) params.yes ={};
        if(! params.no) params.no ={};

        if(! params.title) params.title = "Atenção";
        if(! params.question) params.question = "";
        
        if(! params.yes.text) params.yes.text = "Sim";
        if(! params.yes.class) params.yes.class = "";
        
        if(! params.no.text) params.no.text = "Não";
        if(! params.no.class) params.no.class = "";

        let innerContent = document.createElement("div");
        innerContent.classList.add("flexModalYesNoContent");

        let spanQuestion = document.createElement("span");
        spanQuestion.classList.add("flexModalYesNoQuestion");
        spanQuestion.innerHTML = params.question;

        let boxButtons = document.createElement("div");
        boxButtons.classList.add("flexModalYesNoBoxButtons");

        let btnYes = document.createElement("button");
        btnYes.type = "button";
        btnYes.innerHTML = params.yes.text;
        btnYes.class = params.yes.class;

        let btnNo = document.createElement("button");
        btnNo.type = "button";
        btnNo.innerHTML = params.no.text;
        btnNo.class = params.no.class;

        innerContent.appendChild(spanQuestion);
        innerContent.appendChild(boxButtons);
        boxButtons.appendChild(btnNo);
        boxButtons.appendChild(btnYes);

        params.content = innerContent;
        params.noBtnClose = true;
        let modalId = this.show(params);

        return new Promise((resolve) => {
            
            btnYes.onclick = () => {
                FlexModal.close(modalId);
                resolve(true);
            };

            btnNo.onclick = () => {
                FlexModal.close(modalId);
                resolve(false);
            };

        });
    }
}


