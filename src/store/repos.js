import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useReposStore = defineStore('repos', () => {
    const repos = ref({});
    const loading = ref(false);
    const error = ref(null);
    const selectedLanguages = ref([]);
    const dateFrom = ref(null);
    const dateTo = ref(null);
    const minStars = ref(null);
    const totalCount = ref({});
    const currentPage = ref({});

    const fetchRepos = async (fromDate, toDate, minStarsCount, languages) => {
        setFilters(fromDate, toDate, minStarsCount, languages);

        loading.value = true;
        error.value = null;

        resetState();

        const dateRange = buildDateRange();
        const queryDatePart = dateRange ? ` created:${dateRange}` : '';

        try {
            await Promise.all(selectedLanguages.value.map(lang => fetchLanguageRepos(lang, queryDatePart)));
        } catch (err) {
            handleError(err);
        } finally {
            loading.value = false;
        }
    };

    const fetchLanguageRepos = async (lang, dateRangeQuery, page = 1) => {
        const response = await axios.get(`https://api.github.com/search/repositories`, {
            params: {
                q: `language:${lang}${dateRangeQuery} stars:>${minStars.value}`,
                sort: 'stars',
                order: 'desc',
                page,
                per_page: 10
            }
        });

        const newRepos = response.data.items || [];
        if (!repos.value[lang]) {
            repos.value[lang] = [];
        }

        newRepos.forEach(repo => {
            if (!repos.value[lang].some(existingRepo => existingRepo.id === repo.id)) {
                repos.value[lang].push(repo);
            }
        });

        currentPage.value[lang] = page;
        totalCount.value[lang] = response.data.total_count; // Update total count
    };

    const fetchMoreRepos = async (lang) => {
        if (loading.value || repos.value[lang]?.length >= totalCount.value[lang]) return;

        // Add a new loading state for each language
        const langLoadingKey = `loading_${lang}`;
        if (loading[langLoadingKey]) return; // If loading for this language, exit early

        loading[langLoadingKey] = true; // Set loading for this language
        const nextPage = (currentPage.value[lang] || 1) + 1;
        const dateRange = buildDateRange();
        const queryDatePart = dateRange ? ` created:${dateRange}` : '';

        try {
            await fetchLanguageRepos(lang, queryDatePart, nextPage);
        } catch (err) {
            handleError(err);
        } finally {
            loading[langLoadingKey] = false; // Reset loading state when done
        }
    };


    const setFilters = (fromDate, toDate, minStarsCount, languages) => {
        dateFrom.value = fromDate;
        dateTo.value = toDate;
        minStars.value = minStarsCount;
        selectedLanguages.value = languages;
    };

    const resetState = () => {
        selectedLanguages.value.forEach(lang => {
            repos.value[lang] = [];
        });
        totalCount.value = {};
        currentPage.value = {};
    };

    const handleError = (err) => {
        // Clear any existing error message
        error.value = '';

        if (err.response) {
            // If there are multiple errors, loop through each error and append its message
            if (Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
                error.value = `Error ${err.response.status}: ${err.response.data.message}\n`;
                err.response.data.errors.forEach((errorItem) => {
                    error.value += `${errorItem.message} - Please check your input. \n`;
                });
            } else {
                // If no specific errors, show the general message
                error.value = `Error ${err.response.status}: ${err.response.data.message}`;
            }
        } else if (err.request) {
            error.value = 'No response from server. Please try again later.';
        } else {
            error.value = 'An error occurred. Please try again.';
        }
    };


    const buildDateRange = () => {
        const startDate = dateFrom.value ? new Date(dateFrom.value).toISOString().split('T')[0] : null;
        const endDate = dateTo.value ? new Date(dateTo.value).toISOString().split('T')[0] : null;

        if (startDate && endDate) {
            return `${startDate}..${endDate}`;
        } else if (startDate) {
            return `${startDate}..`;
        } else if (endDate) {
            return `..${endDate}`;
        }
        return null;
    };

    return {
        repos,
        fetchRepos,
        fetchMoreRepos,
        loading,
        error,
        selectedLanguages,
        dateFrom,
        dateTo,
        minStars,
        totalCount,
        currentPage,
    };
});
