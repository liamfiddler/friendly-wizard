<template>
  <div>
    <progress :value="wizard.progressPercent" max="100" />
    <form :key="stepId" @submit.prevent="handleSubmit">
      <h1>{{ wizard.activeStep.data.title }}</h1>
      <p>{{ wizard.activeStep.data.body }}</p>
      <template v-if="wizard.activeStep?.type === 'YesNo'">
        <label>
          <input type="radio" :name="wizard.activeStep.id" value="Yes" />
          Yes
        </label>
        <label>
          <input type="radio" :name="wizard.activeStep.id" value="No" />
          No
        </label>
      </template>
      <button type="button" :onClick="goBack" :disabled="wizard.isFirstStep">
        Back
      </button>
      <button type="submit" :disabled="wizard.isLastStep">Continue</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Vue doesn't watch the wizard's internal values, so we
      // update the form key whenever it changes to a different
      // step, forcing Vue to rerender.
      stepId: this.wizard.activeStep.id,
    };
  },
  methods: {
    goBack() {
      this.wizard.previous();
      this.stepId = this.wizard.activeStep.id;
    },
    handleSubmit({ target }) {
      this.wizard.responsesFromForm(target);
      this.wizard.next();
      this.stepId = this.wizard.activeStep.id;
    },
  },
};
</script>
