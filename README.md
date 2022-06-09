# 🧙‍♂️ Friendly Wizard

A class for managing steps in a wizard, and their responses.

## Usage

Install this package:

```sh
npm install FutureFriendlyTeam/friendly-wizard
```

Then import the Wizard class and start using it:

```js
import { Wizard } from 'FutureFriendlyTeam/friendly-wizard/Wizard.js';

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
    * [module.exports](#exp_module_friendly-wizard--module.exports) ⏏
        * [new module.exports(options)](#new_module_friendly-wizard--module.exports_new)
        * _instance_
            * [.isLastStep](#module_friendly-wizard--module.exports+isLastStep) ⇒ <code>boolean</code>
            * [.isFirstStep](#module_friendly-wizard--module.exports+isFirstStep) ⇒ <code>boolean</code>
            * [.activeStep](#module_friendly-wizard--module.exports+activeStep) ⇒ <code>Step</code>
            * [.previousStep](#module_friendly-wizard--module.exports+previousStep) ⇒ <code>Step</code>
            * [.nextStep](#module_friendly-wizard--module.exports+nextStep) ⇒ <code>Step</code>
            * [.stepNum](#module_friendly-wizard--module.exports+stepNum) ⇒ <code>number</code>
            * [.stepTotal](#module_friendly-wizard--module.exports+stepTotal) ⇒ <code>number</code>
            * [.progressPercent](#module_friendly-wizard--module.exports+progressPercent) ⇒ <code>number</code>
            * [.responses](#module_friendly-wizard--module.exports+responses) ⇒ <code>Map.&lt;string, any&gt;</code>
            * [.next()](#module_friendly-wizard--module.exports+next)
            * [.previous()](#module_friendly-wizard--module.exports+previous)
            * [.steps()](#module_friendly-wizard--module.exports+steps) ⇒ <code>Iterable.&lt;Step&gt;</code>
            * [.responsesFromForm(form)](#module_friendly-wizard--module.exports+responsesFromForm)
        * _inner_
            * [~Step](#module_friendly-wizard--module.exports..Step) : <code>Object</code>

<a name="exp_module_friendly-wizard--module.exports"></a>

### module.exports ⏏
A Wizard data class

**Kind**: Exported class  
<a name="new_module_friendly-wizard--module.exports_new"></a>

#### new module.exports(options)
Construct a new Wizard


| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.steps | <code>Array.&lt;Step&gt;</code> | 
| [options.startAtId] | <code>number</code> \| <code>string</code> | 
| [options.responses] | <code>Map</code> \| <code>Record.&lt;string, any&gt;</code> | 

<a name="module_friendly-wizard--module.exports+isLastStep"></a>

#### module.exports.isLastStep ⇒ <code>boolean</code>
Is the active step the last step?

**Kind**: instance property of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+isFirstStep"></a>

#### module.exports.isFirstStep ⇒ <code>boolean</code>
Is the active step the first step?

**Kind**: instance property of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+activeStep"></a>

#### module.exports.activeStep ⇒ <code>Step</code>
Get the active step

**Kind**: instance property of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+previousStep"></a>

#### module.exports.previousStep ⇒ <code>Step</code>
Get the previous step

**Kind**: instance property of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+nextStep"></a>

#### module.exports.nextStep ⇒ <code>Step</code>
Get the next step

**Kind**: instance property of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+stepNum"></a>

#### module.exports.stepNum ⇒ <code>number</code>
Get the active step number

**Kind**: instance property of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+stepTotal"></a>

#### module.exports.stepTotal ⇒ <code>number</code>
Get the total number of steps

**Kind**: instance property of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+progressPercent"></a>

#### module.exports.progressPercent ⇒ <code>number</code>
Get the percentage of progress through the steps

**Kind**: instance property of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+responses"></a>

#### module.exports.responses ⇒ <code>Map.&lt;string, any&gt;</code>
Get the responses to the wizard

**Kind**: instance property of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+next"></a>

#### module.exports.next()
Sets the next step active

**Kind**: instance method of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+previous"></a>

#### module.exports.previous()
Sets the previous step active

**Kind**: instance method of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+steps"></a>

#### module.exports.steps() ⇒ <code>Iterable.&lt;Step&gt;</code>
Iterable steps

**Kind**: instance method of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
<a name="module_friendly-wizard--module.exports+responsesFromForm"></a>

#### module.exports.responsesFromForm(form)
Add the values from a HTML form element to the responses

**Kind**: instance method of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  

| Param | Type |
| --- | --- |
| form | <code>HTMLFormElement</code> | 

<a name="module_friendly-wizard--module.exports..Step"></a>

#### module.exports~Step : <code>Object</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [id] | <code>string</code> \| <code>number</code> | Defaults to the array index if not specified |
| [type] | <code>string</code> | The type of step |
| [skip] | <code>boolean</code> \| <code>function</code> | The logic for skipping a step (a boolean, a function that returns a boolean, or a mongo-style object) |
| [data] | <code>any</code> | Any other data you may want to attach to the step |

