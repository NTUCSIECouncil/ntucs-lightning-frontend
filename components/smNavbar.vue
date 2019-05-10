<template>
  <div>
    <b-container fluid class="smNavbar">
      <b-row>
        <b-col class="item">
          <i class="fas fa-users"></i>
        </b-col>
        <b-col class="item">
          <i class="fas fa-newspaper"></i>
        </b-col>
        <b-col class="item">
          <i class="fas fa-user"></i>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'smNavbar'
}
</script>

<style scoped>
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
.smNavbar > .row > .item {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>

