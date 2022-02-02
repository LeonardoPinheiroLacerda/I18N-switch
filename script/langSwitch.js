class LangSwitch {
    
    constructor() {
        this.on = false;
        this.onChange = () => {};
        this.onPortugueseOn = () => {};
        this.onEnglishOn = () => {};
    }

    isPortugueseOn = () => {
        return this.on == true;
    }

    isEnglishOn = () => {
        return this.on == false;
    }

    onChange = (func) => {
        this.onChange = func;
    }

    onPortugueseOn = (func) => {
        this.onPortugueseOn = func;
    }

    onEnglishOn = (func) => {
        this.onEnglishOn = func;
    }

    initLangSwitch = () => {
        const containers = document.getElementsByClassName("switch-container");
    
        const playAnimation = (trigger) => {
            trigger.style.animation = "slidein .2s ease-out";
        };
    
        const playReverseAnimation = (trigger) => {
            trigger.style.animation = "slidein .2s ease-out reverse";
        };
    
        const turnPortuguese = (trigger) => {
            trigger.classList.remove("english");
            trigger.classList.add("portuguese");
            this.on = true;
        };
    
        const turnEnglish = (trigger) => {
            trigger.classList.remove("portuguese");
            trigger.classList.add("english");
            this.on = false;
        };
    
        for (let i = 0; i < containers.length; i++) {
    
            const trigger = containers[i].firstChild.nextSibling;
            turnEnglish(trigger);
            
            containers[i].addEventListener("click", () => {
                
                if (trigger.style.animation == "") {
                    if (trigger.classList.contains("on")) {
                        playReverseAnimation(trigger);
                        turnEnglish(trigger);
                        trigger.classList.toggle("on");

                        this.onEnglishOn();

                    } else {
                        playAnimation(trigger);
                        turnPortuguese(trigger);
                    }
    
                    setTimeout(() => {
                        trigger.style.animation = "";
    
                        if (!trigger.classList.contains("english")) {
                            trigger.classList.toggle('on');

                            this.onPortugueseOn();
                        }

                        this.onChange();
                    }, 185);
                }
            });
        }
    }
}