<template>
  <div class="group relative uncover">
    <span>
      44th
    </span>
    <span class="float-right mt-1">
      <svg
        class="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </span>
    <ul
      class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
      transition duration-150 ease-in-out origin-top"
    >
      <li class="text-black align-center px-3 py-1 hover:text-blue-400">
        <input 
          type="button"
          class="bg-white"
          @click="$router.push('/articles')" 
          value="44th"
        />
      </li>
      <li class="text-black align-center px-3 py-1 hover:text-blue-400">
        <input 
          type="button"
          class="bg-white"
          @click="$router.push('/')" 
          value="45th"
        />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'session',
  props: ['title', 'list'],
}
</script>
<style>
  .uncover {
    z-index: 999;
  }
</style>