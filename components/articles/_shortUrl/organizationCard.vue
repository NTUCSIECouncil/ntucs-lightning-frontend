<template>
  <div>
    <b-row id="organizationCard">
      <div class="d-flex">
        <div class="p-2">
          <b-img
            id="profilePhoto"
            v-bind:src="article.organization.profilePhoto" 
            rounded="circle"
            width="100%"
            height="100%"
          >
          </b-img>
        </div>

        <div class="p-2">
          <h4 id="organizationName">{{article.organization.name}}</h4>
          <br />
          <p>
            <i class="fas fa-map-marker-alt"></i>
            {{article.organization.school.name}}
          </p>
          <p>
            {{article.organization.intro}}
          </p>
        </div>
      </div>
    </b-row>
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
  margin-top: 1rem;
}
#profilePhoto {
}
.row {
  padding-right: 0px;
  margin-right: 0px;
}
#infoWrap > h4, blockquote, p {
  font-family: 'Noto Serif TC', serif;
  line-height: 1.3em;
  letter-spacing: 2px;
}
#organizationName {
  margin-bottom: 3px;
}
</style>
