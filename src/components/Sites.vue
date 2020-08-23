<template>
  <div class="sitelist">
    <div class="sitename">Site</div>
    <div class="date">Date Created</div>
    <div class="actions">Actions</div>
    <Fragment v-for="(site, index) in passwords" :key="index">
      <div class="sitename">{{site.siteName}}</div>
      <div class="date">{{site.dateCreated}}</div>
      <div class="actions">
        <button @click.prevent="copyToClipboard(site.siteName)">Copy</button>
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
    ...mapActions(["copyPassword"]),
    copyToClipboard: function(siteName) {
      console.log(siteName);
      console.log("copying password");
      this.copyPassword({ siteName });
    }
  }
};
</script>
