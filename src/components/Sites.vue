<template>
  <div class="sitelist rounded-sm">
    <div class="sitename font-semibold bg-white text-gray-800 border border-white p-1">Site</div>
    <div class="date font-semibold bg-white text-gray-800 border border-white p-1">Date Created</div>
    <div class="actions font-semibold bg-white text-gray-800 border border-white p-1">Actions</div>
    <Fragment v-for="(site, index) in passwords" :key="index">
      <div class="sitename border border-white p-1">{{site.siteName}}</div>
      <div class="date border border-white p-1">{{formatDate(site.dateCreated)}}</div>
      <div class="actions border border-white p-1">
        <button class="text-orange-700 px-1" @click.prevent="copyToClipboard(site.siteName)">
          <font-awesome-icon :icon="['fas', 'copy']" />
        </button>
        <button class="text-orange-700 px-1">
          <font-awesome-icon :icon="['fas', 'edit']" />
        </button>
        <button class="text-orange-700 px-1">
          <font-awesome-icon :icon="['fas', 'sync-alt']" />
        </button>
        <button class="text-orange-700 px-1" @click.prevent="removePassword(site.siteName)">
          <font-awesome-icon :icon="['fas', 'trash']" />
        </button>
      </div>
    </Fragment>
  </div>
</template>

<script>
import { Fragment } from "vue-fragment";
import { mapState, mapActions } from "vuex";
export default {
  name: "Sites",
  computed: {
    ...mapState(["passwords"])
  },
  components: { Fragment },
  methods: {
    ...mapActions(["copyPassword", "deletePassword"]),
    copyToClipboard: function(siteName) {
      this.copyPassword({ siteName });
    },
    removePassword: function(siteName) {
      this.deletePassword({ siteName });
    },
    formatDate: function(date) {
      const newDate = new Date(date);
      return newDate.toLocaleString("en-us", { dateStyle: "long" });
    }
  }
};
</script>

<style>
.sitelist {
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 0.3fr 0.2fr;
}
</style>
