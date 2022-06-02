import { useReducer } from 'react';
import { Wizard } from '../index';

let wizard;

const useFriendlyWizard = (wizardOptions) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  if (!wizard && !!wizardOptions) {
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
