<script>
import StarRating from 'vue-star-rating'
export default {
    name: "Rating",

    components: {
        'star-rating': StarRating
    }
}
</script>
<template>
<div class="w-full flex flex-col justify-center items-center h-screen">
    <div class="w-1/4 mx-auto mb-6">
      <img class="h-32" src="/cfcss.png" alt="">
    </div>
    <div class="w-1/2 my-4 text-center">
      <p class="text-gray-800 text-lg font-thin">
        Please rate the call.
      </p>
    </div>
    <div
      class="md:w-1/2 w-full flex flex-wrap shadow-md rounded-md bg-gray-200 mx-auto py-12 px-12">
        <div class="w-full text-center flex justify-center p-2">
          <star-rating 
            :rating="1"
            :max-rating="5"
            :increment="1"
            text-class="w-full"
          />
        </div>
    </div>
</div>
</template>
