class CountryFlags {
    static BRAZIL         = "/assets/brazil.png";
    static CHINA          = "/assets/china.png";
    static FRANCE         = "/assets/france.png";
    static GERMANY        = "/assets/germany.png";
    static INDIA          = "/assets/india.png";
    static ITALY          = "/assets/italy.png";
    static JAPAN          = "/assets/japan.png";
    static PORTUGAL       = "/assets/portugal.png";
    static RUSSIA         = "/assets/russia.png";
    static SPAIN          = "/assets/spain.png";
    static UNITED_KINGDOM = "/assets/united-kingdom.png";
    static UNITED_STATES  = "/assets/united-states.png";
}

class I18NSwitch {

    constructor (id, main, secondary, general = {}) {
        this.on = true;    
        this.id = id;
        this.main = main;
        this.secondary = secondary;
        this.general = general;
        this.initialized = false

        this.onChange = () => {};

        new Image(main.flag);
        new Image(secondary.flag);

        //Initializes the component
        const container = document.getElementById(this.id);      
        this.change();
        container.addEventListener('click', () => {
            this.change();    
        });     
    }

    onChange = (func) => {
        this.onChange = func;
    }

    isMainLanguageOn = () => {
        return this.on != true;
    }

    isSecondaryLanguageOn = () => {
        return this.on == true;
    }

    change = () => {
        
        const container = document.getElementById(this.id);
    
        const playAnimation = (container) => {
            getTrigger(container).style.animation = "slidein .2s ease-out";
        };
    
        const playReverseAnimation = (container) => {
            getTrigger(container).style.animation = "slidein .2s ease-out reverse";
        };

        const getTrigger = (container) => {
            return document.querySelector(`#${this.id} > *`);
        }

        const turnMainLanguage = (container) => {
            getTrigger(container).style.backgroundImage = `url('${this.main.flag}')`;
            this.on = false;
            loadI18nWords();
        };
    
        const turnSecondaryLanguage = (container) => {
            getTrigger(container).style.backgroundImage = `url('${this.secondary.flag}')`;
            this.on = true;
            loadI18nWords();
        };

        const loadI18nWords = () => {
            
            loadI18nVariable(this.general);

            if(this.isMainLanguageOn()){
                loadI18nVariable(this.main.language);
            }else{
                loadI18nVariable(this.secondary.language);
            }

        }

        const loadI18nVariable = (language) => {

            const keys = Object.keys(language);

            for(let i = 0; i < keys.length; i ++){
                
                const key = keys[i];
                const value = language[key];

                const elements = document.querySelectorAll(`[data-i18n="${key}"]`);

                for(let j = 0; j < elements.length; j ++){
                    const element = elements[j];

                    element.innerHTML = value;
                }

            }

        }
  
        this.on = !this.on;

        if(this.initialized){

            if(this.isMainLanguageOn()) {

                turnMainLanguage(container);
                getTrigger(container).classList.remove("on");
                playReverseAnimation(container);

            }else {

                turnSecondaryLanguage(container);
                playAnimation(container);                  

            }

            setTimeout(() => {
                getTrigger(container).style.animation = "";
                if (this.on) {
                    getTrigger(container).classList.add('on');
                }
                this.onChange();
            }, 135);

        }else{

            container.classList.add("switch-container");
            
            const div =  document.createElement("div");
            div.classList.add("switch");
            container.appendChild(div);

            turnMainLanguage(container);
            this.initialized = true;

        }
    
    }

    init = () => {
        
       

    }

}