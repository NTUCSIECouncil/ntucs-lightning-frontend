<template>
  <div>
    <d-card>
      <d-card-body>
        <div class="profilePhoto">
          <d-img fluid thumbnail src="https://placeimg.com/200/200/any" />
        </div>
        <p></p>
        <div class="name">
          <b>{{userData.lastName}} {{userData.firstName}}</b>
        </div>
        <div class="born">
          Joined on: {{userData.createdAt}}
        </div>
      </d-card-body>
    </d-card>
  </div>
</template>

<script>
export default {
  name: 'dashboardSettingsInfoColumn',
  props: ['userData']
}
</script>
