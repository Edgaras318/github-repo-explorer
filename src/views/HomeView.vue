<template>
  <div class="container">
    <div class="filters-container" aria-labelledby="filters-title">
      <h2 id="filters-title" class="visually-hidden">Filters</h2> <!-- Hidden title for screen readers -->
      <Filters />
    </div>

    <div>
      <h1 class="title">GitHub Repositories</h1>

      <div v-if="dateRange" class="date-range" role="status" aria-live="polite">{{ dateRange }}</div>
      <div v-if="minStars" class="min-stars" role="status" aria-live="polite">{{ minStarsCriteria }}</div>

      <ProgressSpinner v-if="loading" class="progress-spinner" aria-label="Loading repositories..." />

      <div v-if="error" class="error-message" role="alert">{{ error }}</div>

      <div class="repo-tiles" v-else-if="!loading">
        <RepoList
            v-for="language in languagesWithRepos"
            :key="language"
            :language="language"
            :repos="repos[language]"
            aria-label="Repository list for language"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '../components/Filters.vue';
import RepoList from '../components/RepoList.vue';
import ProgressSpinner from 'primevue/progressspinner';
import { useReposStore } from '../store/repos';
import { computed } from "vue";

export default {
  components: {
    Filters,
    RepoList,
    ProgressSpinner
  },
  setup() {
    const store = useReposStore();
    const selectedLanguages = computed(() => store.selectedLanguages);
    const repos = computed(() => store.repos);
    const loading = computed(() => store.loading);
    const error = computed(() => store.error);
    const dateFrom = computed(() => store.dateFrom);
    const dateTo = computed(() => store.dateTo);
    const minStars = computed(() => store.minStars);

    const languagesWithRepos = computed(() =>
        selectedLanguages.value.filter(language => repos.value[language])
    );

    const dateRange = computed(() => {
      if (dateFrom.value && dateTo.value) {
        return `Date between ${new Date(dateFrom.value).toLocaleDateString()} and ${new Date(dateTo.value).toLocaleDateString()}`;
      } else if (dateFrom.value) {
        return `Date from ${new Date(dateFrom.value).toLocaleDateString()}`;
      } else if (dateTo.value) {
        return `Date until ${new Date(dateTo.value).toLocaleDateString()}`;
      }
      return '';
    });

    const minStarsCriteria = computed(() => {
      return minStars.value > 0 ? `with at least ${minStars.value} stars` : '';
    });

    return {
      repos,
      languagesWithRepos,
      loading,
      error,
      dateRange,
      minStarsCriteria,
      minStars
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #f6f8fa; /* GitHub light background */
  color: #24292e; /* GitHub text color */
  font-family: 'Arial', sans-serif; /* Consistent font */
  height: 100vh;
}

.filters-container {
  width: 100%;
  margin-bottom: 1rem;
}

.title {
  font-size: 2.5rem; /* Increased title size for emphasis */
  color: #0366d6; /* GitHub primary color */
  text-align: center; /* Center align title */
  margin-bottom: 20px; /* Space below the title */
}

.date-range,
.min-stars {
  font-size: 1.15rem; /* Slightly larger font size */
  color: #586069; /* Dark gray for subtext */
  background-color: #ffffff; /* White background for contrast */
  border: 1px solid #e1e4e8; /* Light gray border */
  padding: 10px; /* Padding around the text */
  border-radius: 6px; /* Rounded corners */
  margin: 10px 0; /* Space around the element */
  text-align: center; /* Center align text */
  transition: border-color 0.3s; /* Smooth transition for border color */
}

.date-range:hover,
.min-stars:hover {
  border-color: #0366d6; /* Change border color on hover for interactivity */
}

.repo-tiles {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem; /* Space between the tiles */
}

.progress-spinner {
  display: flex; /* Flex display to center the spinner */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

@media (min-width: 768px) {
  .repo-tiles {
    grid-template-columns: repeat(2, 1fr); /* Two columns on larger screens */
  }

  .container {
    flex-direction: row; /* Side by side layout on larger screens */
  }

  .filters-container {
    flex: 0 0 250px; /* Fixed width for filters on larger screens */
    margin-right: 20px; /* Space between filters and repo tiles */
  }

  .repo-tiles {
    flex: 1; /* Take remaining space for repo tiles */
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
