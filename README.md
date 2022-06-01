# 🧙‍♂️ Friendly Wizard

A class for managing steps in a wizard, and their responses.

## Usage

Install this package:

```sh
npm install FutureFriendlyTeam/friendly-wizard
```

Then import the Wizard class and start using it:

```js
import { Wizard } from 'FutureFriendlyTeam/friendly-wizard/index.js';

const wizard = new Wizard({
    steps: [
        {
            id: 'step-1',
            type: 'text',
            data: {
                title: 'Step 1',
                body: 'Lorem ipsum dolor sit amet',
            },
        },
    ],
});
```

# API Documentation

<a name="module_friendly-wizard"></a>

## friendly-wizard
A module for handling wizard data


* [friendly-wizard](#module_friendly-wizard)
    * [.exports.Wizard](#exp_module_friendly-wizard--exports.Wizard) ⏏
        * [new exports.Wizard(options)](#new_module_friendly-wizard--exports.Wizard_new)
        * _instance_
            * [.isLastStep](#module_friendly-wizard--exports.Wizard.Wizard+isLastStep) ⇒ <code>boolean</code>
            * [.isFirstStep](#module_friendly-wizard--exports.Wizard.Wizard+isFirstStep) ⇒ <code>boolean</code>
            * [.activeStep](#module_friendly-wizard--exports.Wizard.Wizard+activeStep) ⇒ <code>Step</code>
            * [.previousStep](#module_friendly-wizard--exports.Wizard.Wizard+previousStep) ⇒ <code>Step</code>
            * [.nextStep](#module_friendly-wizard--exports.Wizard.Wizard+nextStep) ⇒ <code>Step</code>
            * [.stepNum](#module_friendly-wizard--exports.Wizard.Wizard+stepNum) ⇒ <code>number</code>
            * [.stepTotal](#module_friendly-wizard--exports.Wizard.Wizard+stepTotal) ⇒ <code>number</code>
            * [.progressPercent](#module_friendly-wizard--exports.Wizard.Wizard+progressPercent) ⇒ <code>number</code>
            * [.responses](#module_friendly-wizard--exports.Wizard.Wizard+responses) ⇒ <code>Map.&lt;string, any&gt;</code>
            * [.next()](#module_friendly-wizard--exports.Wizard.Wizard+next)
            * [.previous()](#module_friendly-wizard--exports.Wizard.Wizard+previous)
            * [.steps()](#module_friendly-wizard--exports.Wizard.Wizard+steps) ⇒ <code>Iterable.&lt;Step&gt;</code>
        * _inner_
            * [~Step](#module_friendly-wizard--exports.Wizard..Step) : <code>Object</code>

<a name="exp_module_friendly-wizard--exports.Wizard"></a>

### .exports.Wizard ⏏
A Wizard data class

**Kind**: static class of [<code>friendly-wizard</code>](#module_friendly-wizard)  
<a name="new_module_friendly-wizard--exports.Wizard_new"></a>

#### new exports.Wizard(options)
Construct a new Wizard


| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.steps | <code>Array.&lt;Step&gt;</code> | 
| [options.startAtId] | <code>number</code> \| <code>string</code> | 
| [options.responses] | <code>Map</code> \| <code>Record.&lt;string, any&gt;</code> | 

<a name="module_friendly-wizard--exports.Wizard.Wizard+isLastStep"></a>

#### exports.Wizard.isLastStep ⇒ <code>boolean</code>
Is the active step the last step?

**Kind**: instance property of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard.Wizard+isFirstStep"></a>

#### exports.Wizard.isFirstStep ⇒ <code>boolean</code>
Is the active step the first step?

**Kind**: instance property of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard.Wizard+activeStep"></a>

#### exports.Wizard.activeStep ⇒ <code>Step</code>
Get the active step

**Kind**: instance property of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard.Wizard+previousStep"></a>

#### exports.Wizard.previousStep ⇒ <code>Step</code>
Get the previous step

**Kind**: instance property of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard.Wizard+nextStep"></a>

#### exports.Wizard.nextStep ⇒ <code>Step</code>
Get the next step

**Kind**: instance property of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard.Wizard+stepNum"></a>

#### exports.Wizard.stepNum ⇒ <code>number</code>
Get the active step number

**Kind**: instance property of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard.Wizard+stepTotal"></a>

#### exports.Wizard.stepTotal ⇒ <code>number</code>
Get the total number of steps

**Kind**: instance property of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard.Wizard+progressPercent"></a>

#### exports.Wizard.progressPercent ⇒ <code>number</code>
Get the percentage of progress through the steps

**Kind**: instance property of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard.Wizard+responses"></a>

#### exports.Wizard.responses ⇒ <code>Map.&lt;string, any&gt;</code>
Get the responses to the wizard

**Kind**: instance property of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard.Wizard+next"></a>

#### exports.Wizard.next()
Sets the next step active

**Kind**: instance method of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard.Wizard+previous"></a>

#### exports.Wizard.previous()
Sets the previous step active

**Kind**: instance method of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard.Wizard+steps"></a>

#### exports.Wizard.steps() ⇒ <code>Iterable.&lt;Step&gt;</code>
Iterable steps

**Kind**: instance method of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
<a name="module_friendly-wizard--exports.Wizard..Step"></a>

#### exports.Wizard~Step : <code>Object</code>
**Kind**: inner typedef of [<code>exports.Wizard</code>](#exp_module_friendly-wizard--exports.Wizard)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [id] | <code>string</code> \| <code>number</code> | Defaults to the array index if not specified |
| [type] | <code>string</code> | The type of step |
| [skip] | <code>boolean</code> \| <code>function</code> | The logic for skipping a step (a boolean, a function that returns a boolean, or a mongo-style object) |
| [data] | <code>any</code> | Any other data you may want to attach to the step |

