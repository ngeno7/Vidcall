<script>
import axios from "axios";
export default {
    name: "Home",

    data() {

        return {
            loading: false,
            meet: {
              enquiry: ``,
              name: new Date().getTime(),
              host: 1,
              customer_name: ``,
            },
        };
    },

    methods: {

        createRoom() {
            this.loading = true;
            let url = `https://video.racecoursehospital.com/src/create-room/index.php`;
                url += `?meet=${this.meet.name}`;
                url += `&enquiry=${this.meet.enquiry}`;
            axios.get(url).then(({ data }) => {
                this.loading = false;
                this.$router.push({ 
                      name: `room`, 
                      query: { 
                        room: data,
                        name: this.meet.name,
                        enquiry: this.meet.enquiry,
                      }
                    });
            }).catch(() => { this.loading = false; })
        },

        joinMeeting() {
          this.$router.push({
            name: `room`,
            query: {
              name: this.meet.name,
              room: this.meet.meetingId,
              audio: this.meet.audio,
            }
          });
        }
    },
}
</script>
<template>
<div class="w-full flex flex-col justify-center items-center h-screen">
    <div class="w-1/4 mx-auto mb-6">
      <router-link :to="{ name: `admin.home`, }">Admin Portal</router-link>
    </div>
    <div class="w-1/4 mx-auto mb-6">
      <img class="h-32" src="/cfcss.png" alt="">
    </div>
    <div class="w-1/2 my-4 text-center">
      <p class="text-gray-800 text-lg font-thin">
        Contact Our Customer Care
      </p>
    </div>
    <form 
      @submit.prevent="meet.host ? createRoom() : joinMeeting()"
      class="md:w-1/2 w-full flex flex-wrap shadow-md rounded-md bg-gray-200 mx-auto py-12 px-12">
        <div class="w-full p-2 mb-1">
          <label for="grid-customer" 
            class="text-gray-700 text-base font-medium mb-4">Name</label>
          <input type="text" v-model.trim="meet.customer_name" required
            id="grid-customer" class="bg-white p-2 text-sm w-full rounded">
        </div>
        <div class="w-full p-2 mb-1">
          <label for="grid-enquiry-select" 
            class="text-gray-700 text-base font-medium mb-4">Enquiry</label>
          <select type="text" v-model.trim="meet.enquiry"
            id="grid-enquiry-select" class="bg-white p-2 text-sm w-full rounded">
            <option value=""></option>
            <option value="">Enquire One</option>
            <option value="">Enquire Two</option>
          </select>
        </div>
        <div class="w-full p-2 mb-1">
          <input type="text" v-model.trim="meet.enquiry"
            id="grid-enquiry" class="bg-white p-2 text-sm w-full rounded">
        </div>
        <div class="w-full text-center p-2">
          <button
            type="submit"
            v-if="meet.host"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
              focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 
              dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              <span v-if="loading">
                  Loading
              </span>
              <span v-else>
                  Contact CFCS Customer Care
              </span>
          </button>
        </div>
    </form>
  </div>
</template>
