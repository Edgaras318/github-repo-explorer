<template>
  <div>
    <h1 class="title">About Us</h1>
    <p class="info">The GitHub Repository Finder is a web application built with Vue.js that allows users to discover the most starred GitHub repositories based on selected programming languages and a specific time frame. Utilizing the GitHub Search API, the application offers a user-friendly interface for searching repositories while implementing essential features like date range selection, star count filtering, and dynamic display of repository data.</p>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
};
</script>

<style scoped>
.title{
  padding: 16px;
}
.info {
  padding: 16px
}
</style>
