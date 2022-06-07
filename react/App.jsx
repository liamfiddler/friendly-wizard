import * as React from 'react';
import useFriendlyWizard from './useFriendlyWizard';
import steps from './steps.json';
import YesNo from './YesNo';

export const App = () => {
  const wizard = useFriendlyWizard({ steps });
  let inputs = <></>;

  if (wizard.activeStep.type === 'YesNo') {
    inputs = <YesNo name={wizard.activeStep.id} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    wizard.responsesFromForm(e.target);
    wizard.next();
  };

  return (
    <>
      <progress value={wizard.progressPercent} max="100" />
      <form key={wizard.activeStep.id} onSubmit={handleSubmit}>
        <h1>{wizard.activeStep.data.title}</h1>
        <p>{wizard.activeStep.data.body}</p>
        {inputs}
        <button
          type="button"
          onClick={() => wizard.previous()}
          disabled={wizard.isFirstStep}
        >
          Back
        </button>
        <button type="submit" disabled={wizard.isLastStep}>
          Continue
        </button>
      </form>
    </>
  );
};
