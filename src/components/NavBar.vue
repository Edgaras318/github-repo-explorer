<template>
  <nav>
    <div class="nav-title">My Navigation</div>
    <div class="nav-links">
      <router-link to="/" class="nav-link" exact-active-class="active">Home</router-link>
      <router-link to="/about" class="nav-link" exact-active-class="active">About</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between; /* Aligns items to the ends */
  align-items: center; /* Centers items vertically */
  padding: 15px 30px; /* Increased padding for a more spacious feel */
  background-color: #ffffff; /* White background for clarity */
  border-radius: 12px; /* More rounded corners */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); /* Enhanced shadow for depth */
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for background */
}

nav:hover {
  background-color: #f8f8f8; /* Slight background change on hover */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); /* Deepen shadow on hover */
}

.nav-title {
  font-size: 2rem; /* Larger title text for better visibility */
  font-weight: bold; /* Bold text for emphasis */
  color: #333; /* Darker title color for better contrast */
}

.nav-links {
  display: flex; /* Keep the links aligned in a row */
}

.nav-link {
  margin: 0 15px; /* Slightly wider margin for links */
  text-decoration: none;
  color: #007bff; /* Default link color */
  font-weight: 600; /* Slightly bolder links for better visibility */
  padding: 12px 20px; /* Add padding to links for better click area */
  border-radius: 8px; /* More rounded link corners */
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease; /* Added transform for a hover effect */
}

.nav-link:hover {
  text-decoration: none;
  color: #ffffff; /* White text on hover */
  background-color: #007bff; /* Blue background on hover */
  transform: scale(1.05); /* Slightly enlarge link on hover for emphasis */
}

.active {
  color: #ffffff; /* Active link text color */
  background-color: #0056b3; /* Darker blue for active link background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add a subtle shadow for active link */
}

/* Optional: Responsive styling */
@media (max-width: 600px) {
  nav {
    flex-direction: column; /* Stack links vertically on small screens */
    align-items: flex-start; /* Aligns items to the start */
  }

  .nav-link {
    margin: 5px 0; /* Adds vertical spacing between links */
    width: 100%; /* Full-width links */
    text-align: center; /* Center text */
  }
}
</style>
