import { useReducer } from 'react';
import { Wizard } from '../index';

// Using the Module Pattern to ensure only one wizard class is instantiated
let wizard;

const useFriendlyWizard = (wizardOptions) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  if (!wizard && !!wizardOptions) {
    // React doesn't know when the wizard's internal values change, so
    // we have to force a rerender whenever it changes to a different step
    class ReactWizard extends Wizard {
      next() {
        super.next();
        forceUpdate();
      }

      previous() {
        super.previous();
        forceUpdate();
      }
    }

    wizard = new ReactWizard(wizardOptions);
  }

  return wizard;
};

export default useFriendlyWizard;
