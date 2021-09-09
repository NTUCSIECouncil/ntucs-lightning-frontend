<template>
  <div>
    <div class="flex justify-center">
      <img
        src="/detian.png"
        alt="DETIAN"
        width="70%"
      />
    </div>
    <div class="w-full bg-primary text-white py-12 px-20">
      <p class="text-3xl text-center mb-2">我們是誰？</p>
      <p class="text-3xl text-center mb-12">Who Are We?</p>
      <p class="text-center font-medium">大家好，我們是由台灣大學資訊工程系學生所組成的系學會！整個組織總共分為正副會長、學術部、活動部、事務部、美宣部、體育部，致力於統籌系上的各項事務並代表資訊工程系的學生發表意見，藉由提供系上學生相關的資訊與資源，我們期許能使大家的大學生活過得更加順利，在系學會，你將有機會與系上各種有趣的人共事、體驗不同的經驗、並為資工系的發展盡一份心力！歡迎各位加入系學會！</p>
    </div>
    <div class="text-center w-full mt-8">
      <p class="text-3xl text-center mb-2">快速導覽</p>
      <p class="text-3xl text-center mb-12">Quick Tour</p>
      <div class="container my-12 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
          <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <a href="#">
                <img alt="Placeholder" class="block h-auto w-full" src="/landing-page-1.jpg">
                <div class="p-4 md:p-8">
                  <p class="no-underline hover:underline text-black text-center font-bold text-xl">
                    報名活動！不再邊緣！
                  </p>
                  <p class="text-center mt-4">
                    剛升上大學，還不知道如何安排自己的時間嗎？這裡將彙整資工系一整年所有的活動及所有報名事項，資訊週、舞會、系卡、資訊之夜...，每一個都不容錯過！
                  </p>
                </div>
              </a>
            </article>
          </div>
          <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <a href="#">
                <img alt="Placeholder" class="block h-auto w-full" src="/landing-page-2.jpg">
                <div class="p-4 md:p-8">
                  <p class="no-underline hover:underline text-black text-center font-bold text-xl">
                    相關消息，一次掌握！
                  </p>
                  <p class="text-center mt-4">
                    社群媒體和多個信箱爆炸的訊息讓你手忙腳亂嗎？這裡將公布所有系上相關的消息，詳情請見公告版面，所有的訊息都將顯得簡單明瞭，幫助你做安排！  
                  </p>
                </div>
              </a>
            </article>
          </div>
          <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <a href="#">
                <img alt="Placeholder" class="block h-auto w-full" src="/landing-page-3.jpg">
                <div class="p-4 md:p-8">
                  <p class="no-underline hover:underline text-black text-center font-bold text-xl">
                    各種服務，輕鬆使用！
                  </p>
                  <p class="text-center mt-4">
                    找不到自己的系櫃在哪嗎？看到有人亂丟垃圾而忿忿不平嗎？這裡也將提供所有相關的查詢與舉報系統等等等，讓你的大學生活變得更加便利！
                  </p>
                </div>
              </a>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'landingPage',
}
</script>

<style>
</style>
