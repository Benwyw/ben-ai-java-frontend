<template>
  <div :class="['about', { 'is-loading': isLoading }]">

    <h1>About</h1>
    <p>Nothing here yet ^^</p>
  </div>
</template>

<script>
// import * as api from '@/api/misc';

export default {
  name: 'AboutPage',
  data() {
    return {
      isLoading: false,
      isError: false
    }
  },
  props: {
    msg: String
  },
  methods: {
  },
  created() {
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
