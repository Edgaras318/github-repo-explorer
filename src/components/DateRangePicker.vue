<template>
  <div class="date-range-picker" aria-labelledby="date-range-heading">
    <h3 id="date-range-heading" class="sr-only">Select Date Range</h3>

    <div class="flex flex-col gap-1">

      <!-- Date From -->
      <div class="flex flex-col gap-05">
        <label for="from" class="required">From</label>
        <DatePicker
            id="from"
            :maxDate="dateTo"
            :model-value="dateFrom"
            showIcon
            fluid
            iconDisplay="input"
            aria-describedby="from-error"
            @update:model-value="updateDateFrom"
        />
        <Transition name="fade">
          <div v-if="errorFrom" id="to-error" class="error-message" role="alert">{{ errorFrom }}</div>
        </Transition>
      </div>

      <!-- Date To -->
      <div class="flex flex-col gap-05">
        <label for="to" class="required">To</label>
        <DatePicker
            id="to"
            :minDate="dateFrom"
            :model-value="dateTo"
            showIcon
            fluid
            iconDisplay="input"
            aria-describedby="to-error"
            @update:model-value="updateDateTo"
        />
        <Transition name="fade">
          <div v-if="errorTo" id="to-error" class="error-message" role="alert">{{ errorTo }}</div>
        </Transition>
      </div>

    </div>
  </div>
</template>

<script>
import DatePicker from "primevue/datepicker";
import {Transition} from "vue";

export default {
  components: {
    DatePicker,
    Transition
  },
  props: {
    dateFrom: {
      type: Date,
      required: true,
    },
    dateTo: {
      type: Date,
      required: true,
    },
    errorFrom: {
      type: String,
      default: '',
    },
    errorTo: {
      type: String,
      default: '',
    },
  },
  emits: ['update:dateFrom', 'update:dateTo'],
  setup(props, { emit }) {
    const updateDateFrom = (newVal) => {
      emit('update:dateFrom', newVal);
    };

    const updateDateTo = (newVal) => {
      emit('update:dateTo', newVal);
    };

    return { updateDateFrom, updateDateTo };
  },
};
</script>

<style scoped>
.date-range-picker {
  display: flex;
  flex-direction: column;
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
</style>

