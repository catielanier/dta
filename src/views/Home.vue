<template>
  <div class="home p-2">
    <div class="flex flex-row justify-between items-center">
      <div>
        <h1 class="text-orange-700 text-5xl font-semibold text-left">DTA</h1>
      </div>
      <router-link
        to="/generate"
        class="inline-block text-gray-800 bg-yellow-500 font-semibold uppercase w-auto px-4 py-3 rounded"
      >Generate Password</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["passwords"])
  }
};
</script>
