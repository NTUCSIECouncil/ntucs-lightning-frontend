<template>
  <div>
    <no-ssr>
      <div class="w-full bg-primary text-white">
        <div class="w-full h-32 flex container mx-auto">
          <div class="pl-1 sm:pl-20 py-6">
            <div class="my-2">
              <a href="https://www.facebook.com/NTU.CSIE.Council" class="text-white">
                <svg class="w-5 h-5 fill-current float-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span class="mx-3">系學會粉專</span>
              </a>
            </div>
            <div class="my-2">
              <a href="#" class="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 float-left" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                <span class="mx-3">系學會成員</span>
              </a>
            </div>
            <div class="my-2">
              <a href="#" class="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 float-left" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span class="mx-3">10617 台北市羅斯福路四段一號</span>
              </a>
            </div>
          </div>
          <div class="flex-grow"></div>
          <div class="pr-1 pt-10 sm:float-right md:pr-12">
            <img
              src="/logo_default.png"
              alt="NTU CSIE COUNCIL"
              width="60px"
              class="float-left pt-2"
            >
            <p class="text-xl mt-4 md:ml-20 md:text-2xl">
              台灣大學資訊工程系系學會
            </p>
          </div>
        </div>
        <br/>
        <div class="flex justify-center h-20 text-sm sm:text-base">
          COPYRIGHT © 2021 NTU CSIE COUNCIL. ALL RIGHTS RESERVED.
        </div>
      </div>
    </no-ssr>
  </div>
</template>
<script>
export default {
  name: 'smnavbar'
}
</script>
<style>
  
</style>