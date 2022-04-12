<script>
export default {
    name: "Home",

    data() {

        return {
            loading: false,
            meet: {
              customer_issue: ``,
              client_name: ``,
            },
        };
    },

    methods: {

        createRoom() {
            this.loading = true;

            this.$http.post('rooms', this.meet).then(({ data }) => {
                this.loading = false;
                this.$router.push({ 
                      name: `room`, 
                      query: { 
                        room: data.data.room,
                        id: data.data.id,
                        enquiry: this.meet.enquiry,
                      }
                    });
            }).catch(() => { this.loading = false; })
        },
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
      @submit.prevent="createRoom()"
      class="md:w-1/2 w-full flex flex-wrap shadow-md rounded-md bg-gray-200 mx-auto py-12 px-12">
        <div class="w-full p-2 mb-1">
          <label for="grid-customer" 
            class="text-gray-700 text-base font-medium mb-4">Name</label>
          <input type="text" v-model.trim="meet.client_name" required
            id="grid-customer" class="bg-white p-2 text-sm w-full rounded">
        </div>
        <div class="w-full p-2 mb-1">
          <label for="grid-enquiry-select" 
            class="text-gray-700 text-base font-medium mb-4">Enquiry</label>
          <select v-model.trim="meet.customer_issue"
            id="grid-enquiry-select" class="bg-white p-2 text-sm w-full rounded">
            <option value="">Select Issue</option>
            <option value="Enquire One">Enquire One</option>
            <option value="Enquire Two">Enquire Two</option>
          </select>
        </div>
        <div class="w-full p-2 mb-1">
          <input type="text" v-model.trim="meet.customer_issue"
            id="grid-enquiry" class="bg-white p-2 text-sm w-full rounded">
        </div>
        <div class="w-full text-center p-2">
          <button
            type="submit"
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
