# 🧙‍♂️ Friendly Wizard

A class for managing steps in a wizard, and their responses.

## Quick start

Install this package:

```sh
npm install --save liamfiddler/friendly-wizard
```

Then import the Wizard class and start using it:

```js
import Wizard from 'friendly-wizard/Wizard.js';

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

## Configuration

The Wizard class constructor takes an object for configuration:

| Param | Type | Description |
| --- | --- | --- |
| steps | `Step[]` | An array of [_Step objects_](#step-objects), representing the screens in the wizard flow |
| startAtId | `string` | The ID of the step which should initially be active (defaults to the first step if not supplied) |
| responses | `Map.&lt;string, any&gt;` \| `Record.&lt;string, any&gt;` | The initial set of answers/responses to the wizard (defaults to an empty object if not supplied) |

<a name="step-objects"></a>
## Defining steps

The `steps` value passed the Wizard class constructor is an array of _Step objects_.

_Step objects_ are a generic javascript object with whatever keys you like, however the following keys have special functionality attached to them:

### id

A unique identifier for the step. If it is not supplied a random string will be generated as the ID (note: this is randomly generated every time a new Wizard is created, it will be different every time and does not persist across multiple instantiations).

### skip

*skip* contains the logic for skipping the step. This could be a boolean, a function that returns a boolean, or a mongo-style object that compares against the wizard responses.

If you pass an object as the value for *skip* you can use mongo-style syntax to compare responses and response values. Under the hood it uses [sift.js](https://github.com/crcn/sift.js) and supports a variety of operators. Refer to the list of [supported operators in the sift.js documentation](https://github.com/crcn/sift.js#supported-operators).

```js
const wizard = new Wizard({
  steps: [
    {
      id: 'step1',
    },
    {
      id: 'step2',
      // skip the step if 'something' === 'test'
      skip: {
        something: {
          $eq: 'test',
        },
      },
    },
    {
      id: 'step3',
    },
  ],
});

// outputs 'step2', because the second step is not skipped
console.log(wizard.nextStep.id);

// set the response for 'something' to 'test'
wizard.responses.set('something', 'test');

// outputs 'step3' because the second step is now skipped
console.log(wizard.nextStep.id);
```

## Events

The Wizard class is an [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget). Event listeners can be added to the class, and will trigger functionality when certain circumstances occur in usage.

| Event | Description |
| --- | --- |
| *step:change* | Triggered when the wizard moves to a different step |
| *step:next* | Triggered when the wizard moves forward a step |
| *step:previous* | Triggered when the wizard moves back a step |
| *responses:change* | Triggered when a response value is created, updated, or deleted |

The event listeners are particularly useful in Single Page Apps, they allow libraries and frameworks to listen for changes and render updates as they occur.

```js
const wizard = new Wizard({
  steps: [{}, {}, {}, {}],
});

wizard.addEventListener('step:change', () => {
  console.log('hello world');
});

// Change to the next step, triggering the event listener and outputting 'hello world'
wizard.next();
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
- import Wizard from 'friendly-wizard/Wizard.js';
+ import Wizard from 'friendly-wizard/WizardStorage.js';
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
            * [~Step](#module_friendly-wizard--module.exports..Step) : <code>Object.&lt;string, any&gt;</code>

<a name="exp_module_friendly-wizard--module.exports"></a>

### module.exports ⏏
A class for handling the steps in a wizard-like flow, as well as the responses to questions in the flow

**Kind**: Exported class  
<a name="new_module_friendly-wizard--module.exports_new"></a>

#### new module.exports(options)
Construct a new Wizard


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | An object containing configuration for the wizard |
| options.steps | <code>Array.&lt;Step&gt;</code> | An array of Step objects, representing the screens in the wizard flow |
| [options.startAtId] | <code>string</code> | The ID of the step which should initially be active (defaults to the first step if not supplied) |
| [options.responses] | <code>Map.&lt;string, any&gt;</code> \| <code>Record.&lt;string, any&gt;</code> | An object containing the initial set of answers/responses to the wizard |

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

#### module.exports~Step : <code>Object.&lt;string, any&gt;</code>
An object representing a step in the wizard flow

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_friendly-wizard--module.exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [id] | <code>string</code> | A unique identifier for the step (a random string will be generated as the ID if not specified) |
| [skip] | <code>Object</code> \| <code>boolean</code> \| <code>function</code> | The logic for skipping a step (a boolean, a function that returns a boolean, or a mongo-style object) |

