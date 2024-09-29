<template>
  <div class="filters">
    <h3 id="filters-heading">Filters</h3>

    <Divider aria-hidden="true" />

    <div class="card flex justify-center">
      <label for="language-selector" class="sr-only">Select Programming Languages</label>
      <LanguageSelector
          id="language-selector"
          :selectedLanguages="selectedLanguages"
          :languages="languages"
          :errorMessage="errors.selectedLanguages"
          @update:selectedLanguages="updateLanguages"
          aria-describedby="languages-error"
      />
    </div>

    <Divider aria-hidden="true" />

    <label for="date-range-picker" class="sr-only">Select Date Range</label>
    <DateRangePicker
        id="date-range-picker"
        :dateFrom="dateFrom"
        :dateTo="dateTo"
        :errorFrom="errors.dateFrom"
        :errorTo="errors.dateTo"
        @update:dateFrom="updateDateFrom"
        @update:dateTo="updateDateTo"
        aria-describedby="date-error"
    />
    <Divider aria-hidden="true" />

    <label for="stars-filter" class="sr-only">Select Minimum Stars</label>
    <StarsFilter
        id="stars-filter"
        :minStars="minStars"
        :errorMessage="errors.minStars"
        @update:minStars="updateMinStars"
        aria-describedby="stars-error"
    />
    <Divider aria-hidden="true" />

    <div class="btn-wrapper">
      <Button
          id="apply-filters-button"
          severity="info"
          icon="pi pi-search"
          label="Search Selected Filters"
          @click="applyFilters"
          aria-label="Search using selected filters"
          :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import {computed, ref} from 'vue';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import LanguageSelector from './LanguageSelector.vue';
import DateRangePicker from './DateRangePicker.vue';
import StarsFilter from './StarsFilter.vue';
import { useReposStore } from '../store/repos';

export default {
  components: {
    Button,
    Divider,
    LanguageSelector,
    DateRangePicker,
    StarsFilter,
  },
  setup() {
    const store = useReposStore();
    const languages = ref([
      'JavaScript', 'Python', 'Java', 'C#', 'PHP',
      'C++', 'Ruby', 'C', 'TypeScript', 'Swift'
    ]);
    const selectedLanguages = ref([]);
    const dateFrom = ref(null);
    const dateTo = ref(null);
    const minStars = ref(100);
    const errors = ref({
      selectedLanguages: "",
      dateFrom: "",
      dateTo: "",
      minStars: "",
    });
    const loading = computed(() => store.loading);

    const validateFields = () => {
      errors.value = {
        selectedLanguages: "",
        dateFrom: "",
        dateTo: "",
        minStars: "",
      };

      let valid = true;

      if (selectedLanguages.value.length === 0) {
        errors.value.selectedLanguages = "Please select at least one language.";
        valid = false;
      }
      if (!dateFrom.value) {
        errors.value.dateFrom = "Please select a start date.";
        valid = false;
      }
      if (!dateTo.value) {
        errors.value.dateTo = "Please select an end date.";
        valid = false;
      }
      if (minStars.value < 0 || minStars.value == null) {
        errors.value.minStars = "Minimum stars cannot be less than 0.";
        valid = false;
      }

      return valid;
    };

    const applyFilters = () => {
      if (validateFields()) {
        store.fetchRepos(dateFrom.value, dateTo.value, minStars.value, selectedLanguages.value);
      }
    };

    // Methods to handle input updates
    const updateLanguages = (newLanguages) => {
      selectedLanguages.value = newLanguages;
    };

    const updateDateFrom = (newDateFrom) => {
      dateFrom.value = newDateFrom;
    };

    const updateDateTo = (newDateTo) => {
      dateTo.value = newDateTo;
    };

    const updateMinStars = (newMinStars) => {
      minStars.value = newMinStars;
    };

    return {
      selectedLanguages, dateFrom, dateTo, minStars,
      applyFilters, languages, errors,
      updateLanguages, updateDateFrom, updateDateTo, updateMinStars, loading
    };
  }
};
</script>

<style scoped>
.filters {
  width: 100%;
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

.p-button {
  background: #0366d6;
  padding: 15px 20px; /* Increased padding for more height */
  font-size: 1.1rem; /* Font size */
  line-height: 1.2; /* Line height to ensure good spacing */
}
.btn-wrapper{
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .btn-wrapper{
    display: inline-block;
  }
}
</style>

