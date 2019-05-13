<template>
  <div>
    <b-row id="organizationCard">
      <b-col
        id="infoWrap"
        lg="2"
        md="2"
        sm="3"
        cols="4"
      >
        <b-img
          id="profilePhoto"
          v-bind:src="article.organization.profilePhoto" 
          rounded="circle"
          width="100%"
          height="100%"
        >
        </b-img>
      </b-col>
      <b-col
        id="infoWrap"
        lg="10"
        md="10"
        sm="9"
        cols="8"
      >
        <h4 id="organizationName">{{article.organization.name}}</h4>
        <p>
          <i class="fas fa-map-marker-alt"></i>
          {{article.organization.school.name}}
        </p>
        <blockquote>
          {{article.organization.intro}}
        </blockquote>
      </b-col>
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
  margin: 15px;
  margin-left: -20px;
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
