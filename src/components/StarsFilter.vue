<template>
  <div class="stars-filter">
    <label for="stars" class="required">Minimum Stars:</label>
    <InputNumber
        id="stars"
        :model-value="minStars"
        showButtons
        :min="0"
        @update:model-value="updateMinStars"
        aria-describedby="stars-error"
    />
    <Transition name="fade">
      <div v-if="errorMessage" id="stars-error" class="error-message" role="alert">
        {{ errorMessage }}
      </div>
    </Transition>
  </div>
</template>

<script>
import InputNumber from 'primevue/inputnumber';
import {Transition} from "vue";
export default {
  components: {
    InputNumber,
    Transition
  },
  props: {
    minStars: {
      type: Number,
      required: true
    },
    errorMessage: String,
  },
  emits: ['update:minStars'],
  setup(props, { emit }) {
    const updateMinStars = (newVal) => {
      emit('update:minStars', newVal);
    };

    return { updateMinStars };
  },
};
</script>

<style scoped>
.stars-filter {
  display: flex;
  flex-direction: column;
}
</style>
