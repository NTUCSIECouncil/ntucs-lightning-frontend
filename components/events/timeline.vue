<template>
  <div class="my-8">
    <div
      v-for="(event, index) in events"
      :key="`event-${index}`"
      class="flex justify-center items-stretch w-full"
      :class="{
        'sm:text-right': index % 2 == 1,
      }"
    >
      <div
        class="w-5/12 hidden sm:block"
        :class="{ 'order-1': index % 2 == 0, 'order-3': index % 2 == 1 }"
      ></div>
      <div
        class="
          border-l-4 border-r-4
          relative
          border-primary
          order-first
          sm:order-2
        "
        :class="{
          'rounded-t': index == 0,
          'rounded-b': index == events.length - 1,
        }"
      >
        <div
          class="
            absolute
            w-5
            h-5
            mt-9
            z-20
            bg-primary
            border-2 border-white
            rounded-full
          "
          style="left: calc(-1.25rem / 2)"
        ></div>
      </div>

      <div
        class="w-10/12 sm:w-5/12 px-6 py-6"
        :class="{ 'order-1': index % 2 == 1, 'order-3': index % 2 == 0 }"
      >
        <h2 class="mb-3 text-primary font-black text-3xl">
          {{ event.date | date }}
        </h2>
        <h3
          class="border-primary border-l-2 sm:border-0 px-2 my-2 font-bold"
          :class="{
            'sm:border-l-2': index % 2 == 0,
            'sm:border-r-2': index % 2 == 1,
          }"
        >
          {{ event.title }}
        </h3>
        <p>
          {{ event.description }}
        </p>
        <!-- 報名截止時間的判斷非常粗糙 -->
        <input
          v-if="new Date(event.date) > new Date()"
          type="button"
          class="mt-1 p-1 text-white bg-primary rounded cursor-pointer"
          value="馬上報名"
          :class="{
            'sm:float-right': index % 2 == 1,
          }"
          @click="$router.push(`/events/${event.eventId}`)" 
        />
        <input
          v-else
          type="button"
          class="mt-1 p-1 text-white bg-primary rounded cursor-pointer"
          value="活動連結"
          :class="{
            'sm:float-right': index % 2 == 1,
          }"
          @click="$router.push(`/events/${event.eventId}`)" 
        />
      </div>
    </div>
  </div>
</template>
<script>
const monthInEnglish = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default {
  name: "Timeline",
  props: ["events"],
  filters: {
    date(ISOString) {
      const d = new Date(ISOString);
      return `${monthInEnglish[d.getMonth()]} ${
        d.getDate() + 1
      }, ${d.getFullYear()}`;
    },
  },
};
</script>