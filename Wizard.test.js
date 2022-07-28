import test from 'ava';
import sinon from 'sinon';
import Wizard from './Wizard.js';

if (!FormData) {
  global.FormData = class {
    *entries() {}
  };
}

test('Throws when no steps provided', (t) => {
  t.throws(() => new Wizard());
});

test('Throws when step IDs are not unique', (t) => {
  t.throws(() => {
    new Wizard({
      steps: [{ id: 'duplicate' }, { id: 'duplicate' }],
    });
  });
});

test('Throws when the startAtId cannot be found', (t) => {
  t.throws(() => {
    new Wizard({
      steps: [{}, {}],
      startAtId: 'missing',
    });
  });
});

test('Can generate IDs if none are provided', (t) => {
  const wizard = new Wizard({
    steps: [{}, {}, {}],
  });

  t.true(typeof wizard.activeStep.id === 'string');
});

test('Can get the active step ID', (t) => {
  const wizard = new Wizard({
    steps: [{ id: 'active' }, {}, {}],
  });

  t.is(wizard.activeStep.id, 'active');
});

test('Can get the next step ID', (t) => {
  const wizard = new Wizard({
    steps: [{}, { id: 'next' }, {}],
  });

  t.is(wizard.nextStep.id, 'next');
});

test('Can start at a specific step ID', (t) => {
  const wizard = new Wizard({
    steps: [{}, { id: 'start' }, {}],
    startAtId: 'start',
  });

  t.is(wizard.activeStep.id, 'start');
});

test('Can get the previous step ID', (t) => {
  const wizard = new Wizard({
    steps: [{ id: 'previous' }, { id: 'start' }, {}],
    startAtId: 'start',
  });

  t.is(wizard.previousStep.id, 'previous');
});

test('Cannot get the previous step from the first step', (t) => {
  const wizard = new Wizard({
    steps: [{}],
  });

  t.is(wizard.previousStep, undefined);
});

test('Cannot get the next step from the last step', (t) => {
  const wizard = new Wizard({
    steps: [{}],
  });

  t.is(wizard.nextStep, undefined);
});

test('Can get the active step number', (t) => {
  const wizard = new Wizard({
    steps: [...Array(10).keys()].map((x) => ({
      id: `step-${x + 1}`,
    })),
    startAtId: 'step-5',
  });

  t.is(wizard.stepNum, 5);
});

test('Can get the total number of steps', (t) => {
  const numSteps = 10;

  const wizard = new Wizard({
    steps: [...Array(numSteps).keys()].map(() => ({})),
  });

  t.is(wizard.stepTotal, numSteps);
});

test('Can move to the next step(s)', (t) => {
  const wizard = new Wizard({
    steps: [...Array(3).keys()].map(() => ({})),
  });

  t.is(wizard.stepNum, 1);
  wizard.next();
  t.is(wizard.stepNum, 2);
  wizard.next();
  t.is(wizard.stepNum, 3);
  t.throws(() => wizard.next());
});

test('Can move to the previous step(s)', (t) => {
  const wizard = new Wizard({
    steps: [...Array(3).keys()].map((x) => ({
      id: `step-${x + 1}`,
    })),
    startAtId: 'step-3',
  });

  t.is(wizard.stepNum, 3);
  wizard.previous();
  t.is(wizard.stepNum, 2);
  wizard.previous();
  t.is(wizard.stepNum, 1);
  t.throws(() => wizard.previous());
});

test('Can store & retrieve responses', (t) => {
  const wizard = new Wizard({
    steps: [],
    responses: {
      something: 'test',
    },
  });

  t.is(wizard.responses.get('something'), 'test');
});

test('Can store responses as Map', (t) => {
  const responses = new Map();
  responses.set('something', 'test');

  const wizard = new Wizard({
    steps: [],
    responses,
  });

  t.is(wizard.responses.get('something'), 'test');
});

test('Can skip questions based on equality (prefilled response)', (t) => {
  const wizard = new Wizard({
    steps: [
      {
        id: 'first',
      },
      {
        id: 'skip',
        skip: {
          something: {
            $eq: 'test',
          },
        },
      },
      {
        id: 'last',
      },
    ],
    responses: {
      something: 'test',
    },
  });

  t.is(wizard.activeStep.id, 'first');
  t.is(wizard.nextStep.id, 'last');
  wizard.next();
  t.is(wizard.activeStep.id, 'last');
});

test('Can skip questions based on equality (setting response)', (t) => {
  const wizard = new Wizard({
    steps: [
      {
        id: 'first',
      },
      {
        id: 'skip',
        skip: {
          something: {
            $eq: 'test',
          },
        },
      },
      {
        id: 'last',
      },
    ],
  });

  t.is(wizard.activeStep.id, 'first');
  t.is(wizard.nextStep.id, 'skip');
  wizard.responses.set('something', 'test');
  t.is(wizard.nextStep.id, 'last');
});

test('Can skip questions based on query', (t) => {
  const wizard = new Wizard({
    steps: [
      {
        id: 'first',
      },
      {
        id: 'skip',
        skip: {
          something: {
            $in: ['test1', 'test2'],
          },
          somethingelse: {
            $gt: 4,
          },
        },
      },
      {
        id: 'last',
      },
    ],
    responses: {
      something: 'test2',
      somethingelse: 6,
    },
  });

  t.is(wizard.activeStep.id, 'first');
  t.is(wizard.nextStep.id, 'last');
  wizard.next();
  t.is(wizard.activeStep.id, 'last');
});

test('Can skip questions based on a boolean', (t) => {
  const wizard = new Wizard({
    steps: [
      {
        id: 'first',
      },
      {
        id: 'skip',
        skip: true,
      },
      {
        id: 'last',
      },
    ],
  });

  t.is(wizard.activeStep.id, 'first');
  t.is(wizard.nextStep.id, 'last');
  wizard.next();
  t.is(wizard.activeStep.id, 'last');
});

test('Can skip questions based on a function', (t) => {
  const wizard = new Wizard({
    steps: [
      {
        id: 'first',
      },
      {
        id: 'skip',
        skip: () => true,
      },
      {
        id: 'last',
      },
    ],
  });

  t.is(wizard.activeStep.id, 'first');
  t.is(wizard.nextStep.id, 'last');
  wizard.next();
  t.is(wizard.activeStep.id, 'last');
});

test('Can determine if the active step is the first step', (t) => {
  const wizard = new Wizard({
    steps: [{}, {}, {}],
  });

  t.true(wizard.isFirstStep);
});

test('Can determine if the active step is the last step (no skipped)', (t) => {
  const wizard = new Wizard({
    steps: [{}, {}, { id: 'last' }],
    startAtId: 'last',
  });

  t.true(wizard.isLastStep);
});

test('Can determine if the active step is the last step (skipped)', (t) => {
  const wizard = new Wizard({
    steps: [{}, {}, { id: 'last' }, { skip: () => true }],
    startAtId: 'last',
  });

  t.true(wizard.isLastStep);
});

test('Can determine the percentage progress (no skipped)', (t) => {
  const wizard = new Wizard({
    steps: [{}, {}, {}, {}],
  });

  t.is(wizard.progressPercent, 25);
  wizard.next();
  t.is(wizard.progressPercent, 50);
  wizard.next();
  t.is(wizard.progressPercent, 75);
  wizard.next();
  t.is(wizard.progressPercent, 100);
});

test('Can determine the percentage progress (skipped)', (t) => {
  const wizard = new Wizard({
    steps: [{}, {}, { skip: true }, {}, {}],
  });

  t.is(wizard.progressPercent, 20);
  wizard.next();
  t.is(wizard.progressPercent, 40);
  wizard.next();
  t.is(wizard.progressPercent, 80);
  wizard.next();
  t.is(wizard.progressPercent, 100);
});

test('Percentage progress is 100% if all subsequent steps are skipped', (t) => {
  const wizard = new Wizard({
    steps: [{}, { skip: true }, { skip: true }],
  });

  t.is(wizard.progressPercent, 100);
});

test('Can fill responses from FormData (unique keys)', (t) => {
  const wizard = new Wizard({ steps: [{}] });
  const stub = sinon.stub(FormData.prototype, 'entries');

  stub.returns({
    *[Symbol.iterator]() {
      yield ['key1', 'value1'];
      yield ['key2', 'value2'];
      yield ['key3', 'value3'];
    },
  });

  class HTMLFormElement {}
  wizard.responsesFromForm(new HTMLFormElement());
  stub.restore();

  t.is(wizard.responses.size, 3);
});

test('Can fill responses from FormData (multiple with same key)', (t) => {
  const wizard = new Wizard({ steps: [{}] });
  const stub = sinon.stub(FormData.prototype, 'entries');

  stub.returns({
    *[Symbol.iterator]() {
      yield ['key', 'value1'];
      yield ['key', 'value2'];
      yield ['key', 'value3'];
    },
  });

  class HTMLFormElement {}
  wizard.responsesFromForm(new HTMLFormElement());
  stub.restore();

  t.is(wizard.responses.size, 1);
  t.true(Array.isArray(wizard.responses.get('key')));
  t.is(wizard.responses.get('key').length, 3);
});

test('Can activate a step by its ID', (t) => {
  const wizard = new Wizard({
    steps: [...Array(4).keys()].map((x) => ({
      id: `step-${x + 1}`,
      skip: true, // can activate a step even if it should be skipped
    })),
  });

  wizard.goToStepId('step-3');
  t.is(wizard.activeStep.id, 'step-3');
});

test('Throws when trying to activate a step by a missing ID', (t) => {
  const wizard = new Wizard({
    steps: [{}, {}, {}],
  });

  t.throws(() => wizard.goToStepId('missing'));
});

test('Can get hydrated steps', (t) => {
  const wizard = new Wizard({
    steps: [
      {
        id: 'first',
      },
      {
        id: 'skip',
        skip: true,
      },
      {
        id: 'last',
      },
    ],
  });

  const steps = [...wizard.steps()];
  t.false(steps[0].isSkipped);
  t.true(steps[1].isSkipped);
  t.false(steps[2].isSkipped);
});

test('Triggers event when the responses are cleared', async (t) => {
  const wizard = new Wizard({
    steps: [{}, {}, {}],
    responses: {
      something: 'test',
    },
  });

  const result = await new Promise((resolve) => {
    wizard.addEventListener('responses:change', () => resolve(true));
    wizard.responses.clear();
  });

  t.true(result);
});

test('Triggers event when a response is deleted', async (t) => {
  const wizard = new Wizard({
    steps: [{}, {}, {}],
    responses: {
      something: 'test',
    },
  });

  const result = await new Promise((resolve) => {
    wizard.addEventListener('responses:change', () => resolve(true));
    wizard.responses.delete('something');
  });

  t.true(result);
});

test('Triggers event when a response is added', async (t) => {
  const wizard = new Wizard({
    steps: [{}, {}, {}],
  });

  const result = await new Promise((resolve) => {
    wizard.addEventListener('responses:change', () => resolve(true));
    wizard.responses.set('something', 'test');
  });

  t.true(result);
});

test('Does not trigger event when a response is set to the same value', async (t) => {
  const wizard = new Wizard({
    steps: [{}, {}, {}],
    responses: {
      something: 'test',
    },
  });

  const result = await new Promise((resolve, reject) => {
    wizard.addEventListener('responses:change', () => reject());
    wizard.responses.set('something', 'test');
    setTimeout(() => resolve(true), 10);
  });

  t.true(result);
});
