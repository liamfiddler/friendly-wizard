<template>
  <div>
    <progress :value="wizard.progressPercent" max="100" />
    <form :key="stepId" @submit="handleSubmit">
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
  methods: {
    goBack() {
      this.wizard.previous();
      this.stepId = this.wizard.activeStep.id;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.wizard.responsesFromForm(e.target);
      this.wizard.next();
      this.stepId = this.wizard.activeStep.id;
    },
  },
};
</script>
