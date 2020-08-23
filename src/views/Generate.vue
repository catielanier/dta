<template>
  <div class="p-2">
    <div class="flex flex-row justify-between items-center">
      <h1 class="uppercase text-orange-700 text-5xl font-semibold text-left">New Password</h1>
      <router-link
        to="/"
        class="inline-block text-gray-800 bg-yellow-500 font-semibold uppercase w-auto px-4 py-3 rounded"
      >Back</router-link>
    </div>
    <form @submit.prevent="submitPassword">
      <div>
        <input type="checkbox" v-model="includeNumber" /> Include Number
        <input type="checkbox" v-model="includeUpperCase" /> Include Uppercase
      </div>
      <div>
        <input type="checkbox" v-model="includeSpecial" /> Include Special Characters
        <input type="checkbox" v-model="characterLimit" /> Site has character range limits
      </div>
      <div v-if="characterLimit">
        <input type="number" v-model="minCharacter" /> Minimum # of Characters
        <input type="number" v-model="maxCharacter" /> Maximum # of Characters
      </div>
      <input type="text" v-model="siteName" placeholder="Site Name (Be Specific)" />
      <div>
        <button
          type="submit"
          class="bg-orange-800 text-gray-800 font-semibold uppercase rounded px-4 py-3 inline-block"
        >Generate Password</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Generate",
  data() {
    return {
      siteName: "",
      includeNumber: false,
      includeUpperCase: false,
      includeSpecial: false,
      characterLimit: false,
      minCharacter: 0,
      maxCharacter: 0
    };
  },
  methods: {
    ...mapActions(["generatePassword"]),
    submitPassword: function() {
      const { siteName, includeUpperCase } = this.$data;
      this.generatePassword({ siteName, includeUpperCase });
    }
  }
};
</script>
