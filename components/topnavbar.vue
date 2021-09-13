<template>
  <div class="mt-1">
    <no-ssr>
      <div class="bg-white ">
        <div class="grid grid-cols-4">
          <div class="flex justify-center p-3">
            <div class="border-2 border-black py-1 px-2 hover:text-blue-400 ml-6">
              <session />
            </div>
          </div>
          <div class="col-span-2 flex justify-center pr-3">
            <img
              src="/logo_default.png"
              alt="NTU CSIE COUNCIL"
              width="62px;"
            >
          </div>
          <div class="flex justify-center p-4 hover:text-blue-400 underline">
            <span>中文</span>
          </div>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import session from './navbar/session.vue';

export default {
  name: "topnavbar",
  components: { session },
  data() {
    return {
    };
  },
};
</script>


<style>

</style>
