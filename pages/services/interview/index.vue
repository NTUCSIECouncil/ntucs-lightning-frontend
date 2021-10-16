<template>
  <div class="container mx-auto">
    <div class="w-full bg-primary text-white py-8 px-20 md:py-20">
      <p class="text-3xl md:text-4xl text-center mb-2">專題訪談</p>
      <p class="text-3xl md:text-4xl text-center">Interview</p>
    </div>
    <div>
      <div class="flex flex-wrap mt-6 mb-12 mx-auto px-4 md:px-12">
        <div v-for="prof in professors" :key="`prof-${prof.articleId}`" 
          class="my-1 px-1 w-1/2 py-4 lg:my-4 lg:px-4 lg:w-1/4 text-center rounded-lg"
          @click="$router.push(`/services/interview/${prof.shortUrl}`)"
        >
          <div class="py-8 px-2 rounded-2xl hover:scale-105 hover:shadow-2xl hover:bg-gray-100">
            <div class="m-auto rounded-full h-32 w-32 md:h-40 md:w-40 flex items-center justify-center">
              <img 
                class="inline object-cover w-full h-full mr-2 rounded-full" 
                :src="prof.coverPhoto" 
                alt="Profile image"
              />
            </div>
            <div class="pt-2 text-lg md:text-xl font-extrabold">
              {{prof.title}}
            </div>
            <div class="pb-2 text-base md:text-lg font-extrabold">
              {{prof.title}}
            </div>
            <div class="pb-2 px-8 text-xs md:text-xs font-bold text-gray-600">
              {{prof.intro? prof.intro.toUpperCase(): ""}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "interview",
  data() {
    return {
      professors: [
        // {
        //   id: 1,
        //   pic_url: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png",
        //   name_cn: "莊永裕",
        //   name_en: "Yung-Yu Chuang",
        //   field: "Communication and multimedia lab",
        //   url: "#",
        // },
        // {
        //   id: 2,
        //   pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm6khwcQVea71OSRDqWljeBz8gyhQDba55DQ&usqp=CAU",
        //   name_cn: "陳縕儂",
        //   name_en: "Yun-Nung Chen",
        //   field: "machine intellegence and understandings",
        //   url: "",
        // },
      ],
    };
  },
  methods:{
    getProfs(){
      this.$axios.get('/articles/all?tag=interview')
        .then(i => {
          this.professors = i.data.data
          console.log(i.data.data)
      })
    }
  },
  mounted(){
    this.getProfs()
  }
};
</script>