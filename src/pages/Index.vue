<script>
import axios from "axios";
export default {
    name: "Home",

    data() {

        return {
            loading: false,
            meet: {
              name: ``,
              audio: false,
              meetingId: ``,
              host: 1,
            },
        };
    },

    methods: {

        createRoom() {
            this.loading = true;
            let url = `https://video.racecoursehospital.com/src/create-room/index.php`;
                url += `?meet=${this.meet.name}`;
            axios.get(url).then(({ data }) => {
                this.loading = false;
                this.$router.push({ 
                      name: `room`, 
                      query: { 
                        room: data,
                        name: this.meet.name,
                        audio: this.meet.audio,
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
<div class="w-full flex justify-center items-center h-screen">
    <form 
      @submit.prevent="meet.host ? createRoom() : joinMeeting()"
      class="md:w-1/3 w-full flex flex-wrap shadow-md rounded-md bg-gray-200 mx-auto p-5">
        <div class="w-full p-2 mb-1">
          <select 
            class="bg-white p-2 text-sm w-full rounded"
            v-model="meet.host">
            <option :value="0">Join</option>
            <option :value="1">Host</option>
          </select>
        </div>
        <div class="w-full p-2 mb-1" v-if="meet.host">
          <label for="grid-meeting-name" 
            class="text-gray-700 text-base font-medium mb-4">Name</label>
          <input type="text" v-model.trim="meet.name" required
            id="grid-meeting-name" class="bg-white p-2 text-sm w-full rounded">
        </div>
        <div class="w-full p-2 mb-1" v-if="!meet.host">
          <label for="grid-meeting-id" 
            class="text-gray-700 text-base font-medium mb-4">Meeting ID</label>
          <input type="text" v-model.trim="meet.meetingId" required
            id="grid-meeting-id" class="bg-white p-2 text-sm w-full rounded">
        </div>
        <div class="w-full p-2 flex items-center mb-4">
            <input id="checkbox-1" v-model="meet.audio" aria-describedby="checkbox-1" type="checkbox" 
              class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 
                focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checkbox-1"
              class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Audio</label>
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
                  Host A Meeting
              </span>
          </button>
          <button
            v-else
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
              focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 
              dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              <span v-if="loading">
                  Loading
              </span>
              <span v-else>
                  Join A Meeting
              </span>
          </button>
        </div>
    </form>
  </div>
</template>
