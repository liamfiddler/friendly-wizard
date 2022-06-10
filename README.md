# 🧙‍♂️ Friendly Wizard

A class for managing steps in a wizard, and their responses.

## Quick start

Install this package:

```sh
npm install FutureFriendlyTeam/friendly-wizard
```

Then import the Wizard class and start using it:

```js
import Wizard from 'FutureFriendlyTeam/friendly-wizard/Wizard.js';

const wizard = new Wizard({
    steps: [
        {
            id: 'step-1',
            type: 'text',
            data: {
                title: 'Step 1',
                body: 'Welcome to the first step',
            },
        },
        {
            id: 'step-2',
            type: 'text',
            data: {
                title: 'Step 2',
                body: 'This is the second step',
            },
        },
    ],
});

// output the first step title
console.log(wizard.activeStep.data.title);

// navigate to the next step
wizard.next();

// output the second step title
console.log(wizard.activeStep.data.title);
```

## Usage in React

Example usage is demonstrated in the [React example project](./react) in this repo.

A custom hook called [useFriendlyWizard](./react/useFriendlyWizard.jsx) wraps the Wizard class for usage in React. It manages event listeners and updates the wizard step to component state when the step changes.

## Usage in Vue

Example usage is demonstrated in the [Vue example project](./vue) in this repo.

The Wizard class is instantiated as a [global property](https://vuejs.org/api/application.html#app-config-globalproperties) making it available inside any component template in the application, and also on `this` of any component instance.

Components accessing it can implement event listeners to render when the step changes. See [App.vue](./vue/App.vue) for an example.

## Reading/writing responses to localStorage or sessionStorage

A version of the Wizard class that is extended to automatically read/write the responses to/from browser storage is included in this repo.

To use it import from the `WizardStorage.js` file instead of `Wizard.js`:

```diff
- import Wizard from 'FutureFriendlyTeam/friendly-wizard/Wizard.js';
+ import Wizard from 'FutureFriendlyTeam/friendly-wizard/WizardStorage.js';
```

Additionally, two new options will be available when instantiating the class:

| Name | Type | Description |
| --- | --- | --- |
| [persist] | `boolean` | Whether the responses should persist when the window/tab is closed (`localStorage`), or not (`sessionStorage`). Defaults to `true` |
| [storageKey] | `string` | The key under which the responses should be stored. Defaults to `"wizard"` |

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
| [options.responses] | <code>Map.&lt;string, any&gt;</code> \| <code>Record.&lt;string, any&gt;</code> | 

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

