/**
 * A module for handling wizard data
 * @module friendly-wizard
 */

import sift from 'sift';

/**
 * @typedef {Object} Step
 * @property {string|number} [id] Defaults to the array index if not specified
 * @property {string} [type] The type of step
 * @property {boolean|function(Wizard): boolean|Object} [skip] The logic for skipping a step (a boolean, a function that returns a boolean, or a mongo-style object)
 * @property {any} [data] Any other data you may want to attach to the step
 */

/**
 * A Wizard data class
 * @alias module:friendly-wizard
 */
export default class Wizard extends EventTarget {
  /**
   * The array of steps in the wizard
   * @type Step[]
   * @private
   */
  #steps = [];

  /**
   * The active step's index
   * @type number
   * @private
   */
  #stepIndex = 0;

  /**
   * The responses to the wizard
   * @type WizardResponses<string, any>
   * @private
   */
  _responses;

  /**
   * Construct a new Wizard
   * @param {Object} options
   * @param {Step[]} options.steps
   * @param {number|string} [options.startAtId]
   * @param {Map<string, any>|Record<string, any>} [options.responses]
   */
  constructor(options) {
    super();

    if (!options?.steps) {
      throw new Error('Wizard is missing the "steps" option');
    }

    this.#steps = [];

    for (let i in options.steps) {
      const step = options.steps[i];

      if (!('id' in step)) {
        // assign a random-enough string as the ID
        step.id = String(
          Date.now().toString(32) + Math.random().toString(16)
        ).replace(/\./g, '');
      }

      if (this.#steps.some(({ id }) => id === step.id)) {
        throw new Error(`Steps must have unique IDs ("${step.id}")`);
      }

      this.#steps[i] = step;
    }

    if (options?.startAtId) {
      const stepIndex = this.#steps.findIndex(
        ({ id }) => id === options.startAtId
      );

      if (stepIndex < 0) {
        throw new Error('Cannot find step matching the "startAtId" value');
      }

      this.#stepIndex = stepIndex;
    }

    if (options?.responses) {
      if (options.responses instanceof Map) {
        this._responses = new WizardResponses(this, options.responses);
      } else {
        const responses = Object.entries(options.responses);
        this._responses = new WizardResponses(this, responses);
      }
    } else {
      this._responses = new WizardResponses(this);
    }
  }

  /**
   * Should a step be skipped?
   * @param {number} index
   * @returns {boolean}
   * @private
   */
  #skipStep(index) {
    const step = this.#steps[index];

    if (step?.skip) {
      // Handle boolean values
      if (step.skip === true || step.skip === false) {
        return step.skip;
      }

      // Handle function values
      if (typeof step.skip === 'function') {
        return step.skip(this);
      }

      // Handle mongodb-style objects
      const responses = Object.fromEntries(this._responses);
      return sift(step.skip)(responses);
    }

    return false;
  }

  /**
   * Gets the index of the next step
   * @returns {number|undefined}
   * @private
   */
  #nextStepIndex(startStepIndex) {
    let start = (startStepIndex ?? this.#stepIndex) + 1;

    for (let index = start; index < this.#steps.length; index++) {
      if (!this.#skipStep(index)) {
        return index;
      }
    }

    return undefined;
  }

  /**
   * Gets the index of the previous step
   * @returns {number|undefined}
   * @private
   */
  #previousStepIndex(startStepIndex) {
    let start = (startStepIndex ?? this.#stepIndex) - 1;

    if (start < 0) {
      return undefined;
    }

    for (let index = start; index < this.#steps.length; index--) {
      if (!this.#skipStep(index)) {
        return index;
      }
    }

    return undefined;
  }

  /**
   * Is the active step the last step?
   * @returns {boolean}
   */
  get isLastStep() {
    return this.#nextStepIndex() === undefined;
  }

  /**
   * Is the active step the first step?
   * @returns {boolean}
   */
  get isFirstStep() {
    return this.#previousStepIndex() === undefined;
  }

  /**
   * Sets the step at index active
   * @param {number} newStepIndex
   */
  #setStepIndex(newStepIndex) {
    if (this.#stepIndex !== newStepIndex) {
      this.#stepIndex = newStepIndex;
      this.dispatchEvent(new Event('step:change'));
    }
  }

  /**
   * Sets the next step active
   */
  next() {
    this.#setStepIndex(this.#nextStepIndex());
    this.dispatchEvent(new Event('step:next'));
  }

  /**
   * Sets the previous step active
   */
  previous() {
    this.#setStepIndex(this.#previousStepIndex());
    this.dispatchEvent(new Event('step:previous'));
  }

  /**
   * Get the active step
   * @returns {Step}
   */
  get activeStep() {
    return this.#steps[this.#stepIndex];
  }

  /**
   * Get the previous step
   * @returns {Step}
   */
  get previousStep() {
    return this.#steps[this.#previousStepIndex()];
  }

  /**
   * Get the next step
   * @returns {Step}
   */
  get nextStep() {
    return this.#steps[this.#nextStepIndex()];
  }

  /**
   * Iterable steps
   * @returns {Iterable<Step>}
   */
  *steps() {
    for (const step of this.#steps) {
      // this.#nextStepIndex(); // FIXME: Handle skipped steps
      yield step;
    }
  }

  /**
   * Get the active step number
   * @returns {number}
   */
  get stepNum() {
    // FIXME: this should be based on the step number, not the stepIndex
    return this.#stepIndex + 1;
  }

  /**
   * Get the total number of steps
   * @returns {number}
   */
  get stepTotal() {
    return [...this.steps()].length;
  }

  /**
   * Get the percentage of progress through the steps
   * @returns {number}
   */
  get progressPercent() {
    if (this.isLastStep) {
      return 100;
    }

    return ((this.#stepIndex + 1) / this.#steps.length) * 100;
  }

  /**
   * Get the responses to the wizard
   * @returns {Map<string, any>}
   */
  get responses() {
    return this._responses;
  }

  /**
   * Add the values from a HTML form element to the responses
   * @param {HTMLFormElement} form
   */
  responsesFromForm(form) {
    const formData = new FormData(form);
    const inputData = Object.fromEntries(formData.entries());

    for (const key in inputData) {
      this._responses.set(key, inputData[key]);
    }
  }
}

// An extended Map class that emits events on changes
class WizardResponses extends Map {
  #wizard;

  constructor(wizard, ...args) {
    super(...args);
    this.#wizard = wizard;
  }

  dispatchChangeEvent() {
    this.#wizard.dispatchEvent(new Event('responses:change'));
  }

  set(key, value) {
    if (!super.has(key) || super.get(key) !== value) {
      super.set(key, value);
      this.dispatchChangeEvent();
    }
  }

  delete(key) {
    if (super.has(key)) {
      super.delete(key);
      this.dispatchChangeEvent();
    }
  }

  clear() {
    if (super.size > 0) {
      super.clear();
      this.dispatchChangeEvent();
    }
  }
}
