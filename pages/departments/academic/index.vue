<template>
  <div>
    <div class="relative overflow-hidden">
      <div 
        class="text-white h-0 bg-cover filter blur "
        id="background-img"
        :style="{
          backgroundImage: `url(${require('@/static/academic_cover.png')})`,
        }"
      />
      <div id="background-words" class="absolute w-full text-white">
          <p class="text-3xl md:text-4xl text-center mb-2">學術部</p>
          <p class="text-3xl md:text-4xl text-center ">Academic Department</p>
      </div>
    </div>
    <div class="w-full bg-primary text-white py-8 px-20 md:py-20">
      <p class="text-3xl md:text-4xl text-center mb-2">介紹</p>
      <p class="text-3xl md:text-4xl text-center ">Introduction</p>
    </div>
    <div>
      <div class="container my-12 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
          <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overflow-hidden text-center w-2/4 m-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 m-auto" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <p class="font-bold text-2xl my-8">學習</p>
              <p class="font-bold">
                邊做邊學，在做事的過程中，學習自己過去從未接觸過的技能，讓自己成為一個更加有價值的人！
              </p>
            </article>
          </div>
          <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overflow-hidden text-center w-2/4 m-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 m-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <p class="font-bold text-2xl my-8">工作</p>
              <p class="font-bold">
                發揮所長，將自己的能力發揮在更實務的應用層面，甚至是教導同伴，讓自己的所學所能變得更加有意義！
              </p>
            </article>
          </div>
          <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overflow-hidden text-center w-2/4 m-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 m-auto" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <p class="font-bold text-2xl my-8">交朋友</p>
              <p class="font-bold">
                在合作的過程中，你將獲得最難能可貴的友誼，一起為系上活動盡力的心，將成為你大學生活最強大的動力！
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-primary text-white py-8 px-20 md:py-20">
      <p class="text-3xl md:text-4xl text-center mb-2">成員</p>
      <p class="text-3xl md:text-4xl text-center">Buddies</p>
    </div>
    <div>
      <div class="container my-12 mx-auto px-4 md:px-12">
        <div v-for="(group, gidx) in data" :key="`group-${gidx}`">
          <div class="w-full pb-2">
            <p class="text-2xl md:text-3xl text-center mb-2">{{group.name_cn}}</p>
            <p class="text-2xl md:text-3xl text-center">{{group.name_en}}</p>
          </div>
          <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <div v-for="(member, midx) in group.people" :key="`group-${gidx}-member-${midx}`" class="my-1 px-1 w-1/2 lg:my-4 lg:px-4 lg:w-1/4 text-center">
              <div class="m-auto rounded-full h-36 w-36 flex items-center justify-center">
                <img
                  :src="member.pic"
                  alt="NTU CSIE COUNCIL"
                  class="w-full"
                >
              </div>
              <div class="pt-4 pb-2 text-xl text-bold">
                {{member.name}}
              </div>
              <div class="rounded-full bg-secondary py-1 px-3 text-white text-sm inline-block">
                {{member.nicknames}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'academicPage',
  data(){
    return{
      data: [
        {
          name_cn: "部長",
          name_en: "Leaders",
          people: [
            {
              name: "蔡仲恩",
              nicknames: "",
              pic: "/logo_default.png"
            },
            {
              name: "陳宇浩",
              nicknames: "花園",
              pic: "/logo_default.png"
            },
            {
              name: "王苡涵",
              nicknames: "Lisasasasa",
              pic: "/logo_default.png"
            },
            {
              name: "曾子顏",
              nicknames: "小小顏",
              pic: "/logo_default.png"
            },
            {
              name: "翁浩永",
              nicknames: "",
              pic: "/logo_default.png"
            },
          ]
        },
        {
          name_cn: "網頁組",
          name_en: "Web",
          people: [
            {
              name: "周奕勳",
              nicknames: "Max、猴王、Deprecated",
              pic: "/logo_default.png"
            },
            {
              name: "王以安",
              nicknames: "青蛙安、Froggy、呱呱",
              pic: "/logo_default.png"
            },
            {
              name: "賴豊彰",
              nicknames: "黃色、艾力克斯",
              pic: "/logo_default.png"
            },
            {
              name: "洪國瀚",
              nicknames: "強森",
              pic: "/logo_default.png"
            },
          ]
        },
        {
          name_cn: "部員",
          name_en: "Members",
          people: [
            {
              name: "Hello",
              nicknames: "kkk",
              pic: "/logo_default.png"
            },
            {
              name: "Hello",
              nicknames: "kkk",
              pic: "/logo_default.png"
            },
            {
              name: "Hello",
              nicknames: "kkk",
              pic: "/logo_default.png"
            },
            {
              name: "Hello",
              nicknames: "kkk",
              pic: "/logo_default.png"
            },
            {
              name: "Hello",
              nicknames: "kkk",
              pic: "/logo_default.png"
            },
          ]
        }
      ],
    }
  }
}
</script>

<style scoped>
#background-img {
  padding-top: 52.5%;
  background-size: cover;
  width: calc(100% + 2rem);
  margin: -1rem;
}

#background-words {
  top: 40%
}
</style>