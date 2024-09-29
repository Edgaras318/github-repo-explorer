<template>
  <nav aria-label="Main Navigation">
    <div class="nav-links">
      <router-link
          to="/"
          class="nav-link"
          exact-active-class="active"
          aria-current="page"
          tabindex="0">
        Home
      </router-link>
      <router-link
          to="/about"
          class="nav-link"
          exact-active-class="active"
          tabindex="0">
        About
      </router-link>
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
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #ffffff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.nav-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.nav-links {
  display: flex;
}

.nav-link {
  margin: 0 0.5rem;
  text-decoration: none;
  color: #007bff;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 8px;
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
}

.nav-link:hover,
.nav-link:focus { /* Focus state for keyboard navigation */
  text-decoration: none;
  color: #ffffff;
  background-color: #007bff;
  outline: none; /* Removes the default outline */
  box-shadow: 0 0 0 1px rgba(0, 123, 255, 0.5); /* Custom focus outline */
}

.active {
  color: #ffffff;
  background-color: #0056b3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Optional: Responsive styling */
@media (max-width: 600px) {
  nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-link {
    margin: 5px 0;
    width: 100%;
    text-align: center;
  }
}

/* Ensure focus styles are clear for keyboard navigation */
.nav-link:focus-visible {
  outline: 2px dashed #007bff; /* Provides visible outline on keyboard focus */
}
</style>
