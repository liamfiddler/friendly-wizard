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
      stepId: this.wizard.activeStep.id,
    };
  },
  mounted() {
    this.wizard.addEventListener('step:change', this.updateActiveStep);
  },
  beforeDestroy() {
    this.wizard.removeEventListener('step:change', this.updateActiveStep);
  },
  methods: {
    updateActiveStep() {
      this.stepId = this.wizard.activeStep.id;
    },
    goBack() {
      this.wizard.previous();
    },
    handleSubmit({ target }) {
      this.wizard.responsesFromForm(target);
      this.wizard.next();
    },
  },
};
</script>
