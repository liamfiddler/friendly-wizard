import { useEffect, useState, useRef } from 'react';
import Wizard from '../WizardStorage';

const useFriendlyWizard = (wizardOptions) => {
  const wizard = useRef(new Wizard(wizardOptions));
  const [step, setStep] = useState(wizard.current.activeStep);

  useEffect(() => {
    const eventName = 'step:change';
    const onStepChange = () => setStep(wizard.current.activeStep);
    wizard.current.addEventListener(eventName, onStepChange);

    return () => {
      wizard.current.removeEventListener(eventName, onStepChange);
    };
  }, []);

  return {
    wizard: wizard.current,
    step,
  };
};

export default useFriendlyWizard;
