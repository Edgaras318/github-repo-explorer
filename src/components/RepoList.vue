<template>
  <div class="repo-list" @scroll="handleScroll" role="region" aria-labelledby="repo-list-heading">
    <h2 id="repo-list-heading" class="sr-only">Repositories for {{ language }}</h2>

    <!-- Language Title -->
    <h2 class="language-badge" :style="{ backgroundColor: getLanguageColor(language) }">
      {{ language || 'N/A' }}
    </h2>

    <!-- Repositories List -->
    <div v-if="reposFetched.length > 0">
      <Card v-for="repo in reposFetched" :key="repo.id" class="card" role="article">
        <template #title>
          <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="repo-link">{{ repo.name }}</a>
        </template>
        <template #content>
          <p class="repo-description">{{ repo.description || 'No description available.' }}</p>
          <p class="repo-date">Created: {{ formatDate(repo.created_at) }}</p>
          <div class="repo-details">
            <span class="repo-stars">
              <i class="pi pi-star-fill" aria-hidden="true" /> {{ repo.stargazers_count }}
            </span>
            <span class="language-badge" :style="{ backgroundColor: getLanguageColor(repo.language) }">
              {{ repo.language || 'N/A' }}
            </span>
          </div>
        </template>
      </Card>
    </div>

    <!-- Message when there are no repositories -->
    <div v-else class="no-repos-message" role="alert">
      No repositories found based on the selected filters.
    </div>

    <!-- Loader -->
    <div class="loader" v-if="loadingMore" role="status" aria-live="polite">
      <ProgressSpinner class="small-loader" />
      <span>Loading more repos...</span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import Card from 'primevue/card';
import { useReposStore } from '../store/repos';
import { debounce } from 'lodash-es';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  components: { ProgressSpinner, Card },
  props: {
    language: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useReposStore();
    const reposFetched = computed(() => store.repos[props.language] || []);
    const loadingMore = ref(false); // Loading state for fetching more repos

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };

    const handleScroll = debounce(async (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      if (scrollHeight - scrollTop <= clientHeight + 5 && !loadingMore.value) {
        loadingMore.value = true; // Start loading state
        try {
          await store.fetchMoreRepos(props.language);
        } finally {
          loadingMore.value = false; // Reset loading state when done
        }
      }
    }, 300); // Delay fetching more repos to reduce excessive calls

    const getLanguageColor = (language) => {
      switch (language) {
        case 'JavaScript': return '#f1e05a';
        case 'Python': return '#3572A5';
        case 'Java': return '#b07219';
        case 'Ruby': return '#701516';
        case 'PHP': return '#4F5D95';
        case 'Go': return '#00ADD8';
        case 'TypeScript': return '#2b7489';
        case 'C#': return '#178600';
        case 'C++': return '#f34b7d';
        case 'Swift': return '#ffac45';
        default: return '#eeeeee'; // Default for unknown languages
      }
    };

    return { reposFetched, formatDate, handleScroll, loadingMore, getLanguageColor };
  }
};
</script>

<style scoped>
.repo-list {
  height: 300px;
  overflow: auto;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.repo-list:hover {
  background-color: #ffffff;
}

.card {
  border: none; /* Removed border for a cleaner look */
  border-radius: 12px; /* Rounded corners */
  margin: 0.5rem 0;
  padding: 15px; /* Inner padding */
  background: linear-gradient(to right, #ffffff, #f0f4f8); /* Gradient background */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.3s ease; /* Smooth transform on hover */
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1; /* Fully visible */
  }
}

.card:hover {
  transform: translateY(-4px); /* Lift effect on hover */
}

.repo-link {
  color: #2980b9; /* Brighter blue for links */
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.repo-link:hover {
  text-decoration: underline;
  color: #1a73e8; /* Change color on hover */
}

.repo-description {
  color: #555;
  font-size: 0.95rem;
  margin: 5px 0;
}

.repo-date, .repo-stars {
  color: #777;
  font-size: 0.9rem;
  margin: 3px 0;
}

.repo-details {
  display: flex;
  justify-content: space-between; /* Space between stars and language */
  align-items: center; /* Center align items */
}

.language-badge {
  border-radius: 8px;
  padding: 5px 10px;
  color: white; /* White text for badges */
  font-weight: bold; /* Bold text for badges */
  text-transform: uppercase; /* Uppercase text for better readability */
  font-size: 0.8rem; /* Smaller font size for badges */
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.small-loader {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.no-repos-message {
  text-align: center;
  font-size: 1.1rem;
  color: #555;
  margin-top: 10px;
}
</style>
