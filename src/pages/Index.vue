<script>

export default {
    name: "Home",

    data() {

        return {
            loading: false,
            meet: {
              customer_issue: ``,
              client_name: ``,
              comment: ``,
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
                        host: 1,
                      },
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
    <div class="w-1/4 mx-auto md:mb-6">
      <img class="w-56" src="/cfcss.png" alt="">
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
            class="form-label">Name:</label>
          <input type="text" v-model.trim="meet.client_name" required
            id="grid-customer" class="form-control form-control-sm">
        </div>
        <div class="w-full p-2 mb-1">
          <label for="grid-enquiry-select" 
            class="form-label">Enquiry:</label>
          <select v-model.trim="meet.customer_issue"
            id="grid-enquiry-select" class="form-control form-control-sm">
            <option value="">Select Issue</option>
            <option value="General inquries">General inquries</option>
            <option value="CFCS Budget Inquires">CFCS Budget Inquires</option>
            <option value="CFCS Plan Approval">CFCS Plan Approval</option>
            <option value="CFCS Plan Writing">CFCS Plan Writing</option>
          </select>
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
<style scoped src="@/assets/boostrap.css"></style>