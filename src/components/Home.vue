<template>
  <div :class="['home', { 'is-loading': isLoading }]">
    <div v-if="isLoading">Loading...</div>
    <div v-if="!isLoading">
      <div v-if="title">
        <h1>{{ title }}</h1>
      </div>
      <div v-else>
        <h1 v-if="msg">{{ msg }}</h1>
      </div>
    </div>
    <h3>Features</h3>
    <ul>
      <li>TODO</li>
      <!-- <li><a href="#" target="_blank" rel="noopener">TODO</a></li> -->
    </ul>
    <!-- <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
  </div>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: 'HomePage',
  data() {
    return {
      title: '',
      isLoading: false,
      isError: false
    }
  },
  props: {
    msg: String
  },
  methods: {
    getTitle() {
      this.isLoading = true;
      axios.get('/misc/title', {
        withCredentials: true
      }).then(response => {
        this.title = response.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.isLoading = false;
      });
    }
  },
  created() {
    this.getTitle()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-loading {
  filter: blur(5px);
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
