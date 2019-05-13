<template>
  <div>
    <div id="organizationCard">
      <div 
        id="coverPhotoWrap"
        v-bind:style="{ 'background-image': `url(${article.organization.coverPhoto})` }"
      >
      </div>
      <div id="infoWrap">
        {{article.organization.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleShortUrlOrganizationCard',
  props: ['article']
}
</script>

<style scoped>
#organizationCard {
}
#coverPhotoWrap {
  min-height: 10vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
