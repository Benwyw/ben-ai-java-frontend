<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <Home msg="Development in-progress"/> -->
  <!-- <router-view/> -->
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="120" height="120">
    <header>
      <nav>
        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">About</RouterLink>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>&copy; 2023 Benwyw. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Home from './components/Home.vue'
// import About from './components/About.vue'
// import { RouterLink } from 'vue-router'

export default {
  name: 'App',
  components: {
    // Home
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

body {
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  background-color: #f9f9f9;
}

img {
  align-self: center;
}

header {
  background-color: #333333;
  color: #ffffff;
  padding: 1rem;
}

nav ul {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 0;
}

nav li {
  list-style: none;
}

nav a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: all 0.3s;
  text-align: center;
}

nav a:hover {
  background-color: #ffffff;
  color: #333333;
}

main {
  flex-grow: 1;
  padding: 1rem;
}

footer {
  background-color: #333333;
  color: #ffffff;
  padding: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
    align-items: flex-start;
  }

  nav li {
    margin-bottom: 1rem;
  }

  nav a {
    font-size: 1rem;
  }
}
</style>
