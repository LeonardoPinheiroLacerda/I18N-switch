class I18NSwitch {
    
    constructor(args) {
        this.on = false;
        this.onChange = () => {};
        this.args = args;        
    }

    onChange = (func) => {
        this.onChange = func;
    }

    isFirstLanguageOn = () => {
        return this.on != true;
    }

    isSecondLanguageOn = () => {
        return this.on == true;
    }

    init = () => {

        const containers = document.getElementsByClassName("switch-container");
    
        const playAnimation = (trigger) => {
            trigger.style.animation = "slidein .2s ease-out";
        };
    
        const playReverseAnimation = (trigger) => {
            trigger.style.animation = "slidein .2s ease-out reverse";
        };
    
        const loadI18nWords = (i18nVariable) => {
            const keys = Object.keys(i18nVariable);

            for(var i in keys){

                const key = keys[i];
                const value = i18nVariable[key];

                const node = document.querySelector('#' + key);

                if(node != null){
                    node.innerHTML = value;
                }
                
            }
        }

        const turnFirstLanguage = (trigger) => {
            trigger.style.backgroundImage = `url('${this.args.firstFlag}')`;
            this.on = false;
            loadI18nWords(this.args.firstI18n);
        };
    
        const turnSecondLanguage = (trigger) => {
            trigger.style.backgroundImage = `url('${this.args.secondFlag}')`;
            this.on = true;
            loadI18nWords(this.args.secondI18n);
        };
    
        for (let i = 0; i < containers.length; i++) {
    
            const trigger = containers[i].firstChild.nextSibling;
            turnFirstLanguage(trigger);
            
            containers[i].addEventListener("click", () => {
                
                if (trigger.style.animation == "") {

                    if (trigger.classList.contains("on")) {
                        playReverseAnimation(trigger);
                        turnFirstLanguage(trigger);
                        trigger.classList.remove("on");

                    } else {
                        playAnimation(trigger);
                        turnSecondLanguage(trigger);
                    }
    
                    setTimeout(() => {
                        trigger.style.animation = "";
                        if (this.on) {
                            trigger.classList.add('on');
                        }
                        this.onChange();
                    }, 135);
                }
            });
        }
    }
}