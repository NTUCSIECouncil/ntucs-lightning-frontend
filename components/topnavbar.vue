<template>
  <div class="mt-1">
    <no-ssr>
      <div class="bg-white">
        <div class="grid grid-cols-3 sm:grid-cols-3">
          <div class="flex justify-center py-3 ">
            <div class="border-2 border-black py-1 px-2 hover:text-blue-400 ml-6">
              <session />
            </div>
          </div>
          <div class="col-span-1 flex justify-center">
            <img
              src="/logo_default.png"
              alt="NTU CSIE COUNCIL"
              width="60px;"
            >
          </div>
          <div class="flex justify-center">
            <div class="p-4 hover:text-blue-400 underline">
              <span>中文</span>
            </div>
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
