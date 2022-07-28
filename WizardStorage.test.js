import test from 'ava';
import WizardStorage from './WizardStorage.js';

let localStore = {};
let sessionStore = {};

global.window = {
  ...global?.window,
  localStorage: {
    getItem: (key) => {
      return key in localStore ? localStore[key] : null;
    },
    setItem: (key, value) => {
      localStore[key] = `${value}`;
    },
    removeItem: (key) => {
      delete localStore[key];
    },
    clear: () => {
      localStore = {};
    }
  },
  sessionStorage: {
    getItem: (key) => {
      return key in sessionStore ? sessionStore[key] : null;
    },
    setItem: (key, value) => {
      sessionStore[key] = `${value}`;
    },
    removeItem: (key) => {
      delete sessionStore[key];
    },
    clear: () => {
      sessionStore = {};
    }
  },
};

test('Can persist responses', async (t) => {
  const wizard = new WizardStorage({
    steps: [{}, {}],
  });

  wizard.responses.set('test', true);
  wizard.next();
  t.is(localStore?.wizard, '[["test",true]]');
});

test('Can turn off persistence', async (t) => {
  const wizard = new WizardStorage({
    steps: [{}, {}],
    persist: false,
  });

  wizard.responses.set('test', true);
  wizard.next();
  t.is(sessionStore?.wizard, '[["test",true]]');
});

test('Can change the storage key', async (t) => {
  const wizard = new WizardStorage({
    steps: [{}, {}],
    storageKey: 'something',
  });

  wizard.responses.set('test', true);
  wizard.next();
  t.is(localStore?.something, '[["test",true]]');
});

test('Triggers an event when storing responses', async (t) => {
  const result = await new Promise((resolve) => {
    const wizard = new WizardStorage({
      steps: [{}, {}, {}],
    });

    wizard.addEventListener('responses:store', () => resolve(true));
    wizard.responses.set('something', 'test');
    wizard.next();
  });

  t.true(result);
});

test('Stores responses when moving to the previous step', async (t) => {
  const result = await new Promise((resolve) => {
    const wizard = new WizardStorage({
      steps: [{}, { id: 'start' }, {}],
      startAtId: 'start',
    });

    wizard.addEventListener('responses:store', () => resolve(true));
    wizard.responses.set('something', 'test');
    wizard.previous();
  });

  t.true(result);
});
