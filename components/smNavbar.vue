<template>
  <div>
    <no-ssr>
      <div class="smNavbarWrap">
        <b-container fluid class="smNavbar">
          <b-row>
            <b-col class="item" v-on:click="routerGo(`/`)">
              <i class="fas fa-users"></i>
            </b-col>
            <b-col class="item" v-on:click="routerGo(`/articles/`)">
              <i class="fas fa-newspaper"></i>
            </b-col>
            <b-col class="item" v-on:click="routerGo(`/settings/`)">
              <i class="fas fa-user"></i>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'smNavbar',
  methods: {
    routerGo (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
@media only screen and (min-width: 576px) {
  .smNavbarWrap {
    display: none;
  }
}

.smNavbarWrap {
  background-color: rgba(240,240,240);
}

.smNavbar {
  min-height: 50px;
  max-height: 50px;
  background-color: rgba(240,240,240);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}

@supports (padding-bottom: constant(safe-area-inset-bottom)) or (padding-bottom: env(safe-area-inset-bottom)) {
  .smNavbar {
    padding-bottom: calc(2 * env(safe-area-inset-bottom));
  }
}

.smNavbar > .row > .item {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>

