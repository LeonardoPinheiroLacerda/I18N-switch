# I18NSwitch

I18NSwitch is a vanilla JavaScript based component to make internationalization using two languages easier on web pages.

This component will automatically change between two languages everytime user clicks on the switch.

Everytime the switch changes, it'll look for the elements on your page that has the **data-i18n** attribute, and change its text by the one you configured on the object constructor.

## Instalation

You can easily import the component into your page on the following ways.

### CDN

Copy-paste the stylesheet into your head tag after all other stylesheets.
~~~html
<link href="https://unpkg.com/i18n-switch@2.0.1/style/I18NSwitch.css" rel="stylesheet"/>
~~~

Copy-paste the script into the end of your body tag.
~~~html
<script src="https://unpkg.com/i18n-switch@2.0.1/script/I18NSwitch.js"></script>
~~~

### NPM

~~~
npm i i18n-switch
~~~

## Constructor

``new I18NSwitch(id, main, secondary, general)``

### Construct and initialize your switch using the following Argument:

``id`` - Div's id in which the switch will be built.

``main and secundary`` - Objects that contains the flag and the content that will override your page content with the following structure: 
~~~js
{
    flag: "An image url",
    language: {
        key: value,
        key: value,
        key: value
    }
}
~~~

The **key** values on the language object it is the value the component will look for as value for the data-i18n attribute in all page elements, and the **value** it is the content that will override the previous one.

``general`` - (Optional argument) Object that contains the content that will override your page content if is no defined by the main or the secondary languages. 

**Example:**

~~~js

const langSwitch = new I18NSwitch(
    "container-id",
    {
        flag: "/assets/example1.png",
        language: {
            "hello": "Olá!"
        }
    },
    {
        flag: "/assets/example2.png",
        language: {
            "hello": "Hello!"
        }
    },
    {
        "bye": "Sayonara";
    }
);

~~~

## CountryFlags

An enum of country flags, this is all available indexes: 

- BRAZIL
- CHINA
- FRANCE
- GERMANY
- INDIA
- ITALY
- JAPAN
- PORTUGAL
- RUSSIA
- SPAIN
- UNITED_KINGDOM
- UNITED_STATES

Example of use: 

~~~js
const brazilFlag = CountryFlags.BRAZIL;
~~~

## Functions


### isMainLanguageOn
Returns true if the main language is selected.

### isSecondaryLanguageOn
Returns true if the secondary language is selected.

### change
Changes the language without clicking on the switch.

## Listeners

### onChange
Triggers every change between languages.

<br>

## Example on static web pages

~~~html
<!DOCTYPE html>
<html>
    <head>
        <title>I18N Switch</title>
        <link rel="stylesheet" href="https://unpkg.com/i18n-switch@2.0.1/style/I18NSwitch.css">
    </head>
    <body>
        <!-- The container where the switch will be built -->
        <div id="i18n-switch"></div>

        <!-- A mapped field, that will receve content from the switch -->
        <p data-i18n="hello"></p>


        <script src="https://unpkg.com/i18n-switch@2.0.1/script/I18NSwitch.js"></script>
        <script>

            //Variables that contains the content that will be used to configure the component
            const english = {};
            const portuguese = {
                "hello": "Olá mundo!"
            };
            const general = {
                "hello": "Hello world!"
            };

            //The content constructor.
            const langSwitch = new I18NSwitch(
                "i18n-switch",
                {
                    flag: CountryFlags.UNITED_STATES,
                    language: english
                },
                {
                    flag: CountryFlags.BRAZIL,
                    language: portuguese
                },
                general
            );

            //Some demonstration on how to use some functions
            langSwitch.onChange(() => {
                if(langSwitch.isMainLanguageOn()){
                    console.log("main");
                }else if(langSwitch.isSecondaryLanguageOn()){
                    console.log("secondary");
                }
            });

        </script>
    </body>
</html>
~~~

And this is how it will looks like:

![alt text](./example.gif)

<br>

## Mentions
The flag images used on the project and others can be found for free on the following link:
https://www.flaticon.com/packs/country-flags-icons