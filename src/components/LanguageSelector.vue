<template>
  <div class="language-selector" aria-labelledby="language-selector-heading">
    <h3 id="language-selector-heading" class="sr-only">Select Programming Language</h3>

    <label for="select-lang" class="required">Select Language:</label>
    <MultiSelect
        id="select-lang"
        :model-value="selectedLanguages"
        display="chip"
        :options="languages"
        filter
        placeholder="Select language..."

        aria-describedby="language-error"
        @update:model-value="updateSelectedLanguages"
    />

    <!-- Error Message -->
    <div v-if="errorMessage" id="language-error" class="error-message" role="alert">{{ errorMessage }}</div>
  </div>
</template>

<script>
import MultiSelect from "primevue/multiselect";

export default {
  components: {
    MultiSelect,
  },
  props: {
    selectedLanguages: {
      type: Array,
      required: true
    },
    languages: {
      type: Array,
      required: true
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  emits: ['update:selectedLanguages'],
  setup(props, { emit }) {
    const updateSelectedLanguages = (newVal) => {
      emit('update:selectedLanguages', newVal);
    };

    return { updateSelectedLanguages };
  },
};
</script>

<style scoped>
.language-selector {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

:deep(.p-multiselect-label) {
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>

