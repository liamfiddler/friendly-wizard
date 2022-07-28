/**
 * A module for handling wizard data, with storage
 * @module friendly-wizard-storage
 */

import Wizard from './Wizard.js';

/**
 * A Wizard data class
 * @alias module:friendly-wizard-storage
 */
export default class WizardStorage extends Wizard {
  /**
   * The type of storage to use (localStorage or sessionStorage)
   * @type 'localStorage'|'sessionStorage'
   * @private
   */
  #storageType = 'localStorage';

  /**
   * The key to save the data in localStorage or sessionStorage
   * @type string
   * @private
   */
  #storageKey = 'wizard';

  /**
   * Construct a new Wizard that stores responses
   * @param {Object} options
   * @param {Step[]} options.steps
   * @param {number|string} [options.startAtId]
   * @param {Map<string, any>|Record<string, any>} [options.responses]
   * @param {boolean=true} [options.persist]
   * @param {string=wizard} [options.storageKey]
   */
  constructor(options) {
    super(options);

    if (options?.persist === false) {
      this.#storageType = 'sessionStorage';
    }

    if (options?.storageKey) {
      this.#storageKey = options.storageKey;
    }

    // Bail out if we're running on the server
    if (!window || !window?.[this.#storageType]) {
      return;
    }

    const storedJson = window[this.#storageType].getItem(this.#storageKey);
    this._responses = new Map(JSON.parse(storedJson));
    this.dispatchEvent(new Event('responses:load'));
  }

  storeResponses() {
    // Bail out if we're running on the server
    if (!window || !window?.[this.#storageType]) {
      return;
    }

    const responses = [...this._responses];

    window[this.#storageType].setItem(
      this.#storageKey,
      JSON.stringify(responses)
    );

    this.dispatchEvent(new Event('responses:store'));
  }

  /**
   * Sets the next step active
   */
  next() {
    super.next();
    this.storeResponses();
  }

  /**
   * Sets the previous step active
   */
  previous() {
    super.previous();
    this.storeResponses();
  }
}
