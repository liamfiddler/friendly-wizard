import * as React from 'react';
import useFriendlyWizard from './useFriendlyWizard';
import steps from './steps.json';

export const App = () => {
  const { wizard, step } = useFriendlyWizard({ steps });
  let inputs = <></>;

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      wizard.responsesFromForm(e.target);
      wizard.next();
    },
    [wizard]
  );

  if (step?.type === 'YesNo') {
    inputs = (
      <div>
        <label>
          <input type="radio" name={step.id} value="Yes" /> Yes
        </label>
        <label>
          <input type="radio" name={step.id} value="No" /> No
        </label>
      </div>
    );
  }

  return (
    <>
      <progress value={wizard.progressPercent} max="100" />
      <form key={step.id} onSubmit={handleSubmit}>
        <h1>{step.data.title}</h1>
        <p>{step.data.body}</p>
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
