<template>
  <div class="flex flex-wrap container mx-auto">
    <div
      v-for="(service, index) in services"
      :key="`service${index}`"
      class="w-full sm:w-1/2 md:w-1/3 2xl:w-1/4 h-80 px-10 py-6 md:py-10"
    >
      <div
        class="
          cursor-pointer
          text-center
          flex flex-col
          justify-center
          items-center
          border-4 border-primary
          rounded-2xl
          p-2
          h-full
        "
        @click="this.$router.push(service.path)"
      >
        <img :src="service.icon" class="h-8" />
        <h3 class="text-2xl font-bold mt-4">{{ service.name }}</h3>
        <div
          class="w-1/2 border-t-2 border-b-2 rounded border-primary my-4"
        ></div>
        <p class="font-semibold">{{ service.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicePortal",
  data() {
    return {
      services: [
        {
          name: "專題訪談",
          description: "了解自己專題的走向",
          icon: "/svg/fa-chalkboard-teacher.svg",
        },

        {
          name: "整潔舉報",
          description: "當個稱職的小精靈",
          icon: "/svg/healthicons-clean-hands.svg",
        },

        {
          name: "新生手冊",
          description: "輕鬆掌握你的大學生活",
          icon: "/svg/bootstrap-book.svg",
        },

        {
          name: "專題訪談",
          description: "了解自己專題的走向",
          icon: "/svg/fa-chalkboard-teacher.svg",
        },

        {
          name: "整潔舉報",
          description: "當個稱職的小精靈",
          icon: "/svg/healthicons-clean-hands.svg",
        },

        {
          name: "新生手冊",
          description: "輕鬆掌握你的大學生活",
          icon: "/svg/bootstrap-book.svg",
        },
      ],
    };
  },
};
</script>