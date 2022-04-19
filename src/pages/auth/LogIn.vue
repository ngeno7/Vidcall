<script>
import Cookie from "js-cookie";
export default {
    name: "SignIn",

    data() {

        return {
            loading: false,
            login: {
                username: ``,
                password: ``,
            },
            error: ``
        };
    },

    methods: {

        logInUser() {
            if(this.loading) return;
            this.error = ``;
            this.loading = true;
            this.$http.post(`login`, this.login).then(({ data }) => {
                Cookie.set('TW___', data._token);
                this.loading = false;
                this.$router.push({name: `admin.home`})
            }).catch((error) => { 
                console.log(error.response.data.message)
                this.error = error.response.data.message;
                this.loading = false; 
            });
        },
    },
}
</script>
<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="logInUser">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" 
                autocomplete="email" required v-model.trim="login.username"
                class="appearance-none rounded-none relative block 
                    w-full px-3 py-2 border border-gray-300 placeholder-gray-500 
                    text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 
                    focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Email address/Username" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" v-model="login.password" 
                type="password" autocomplete="current-password" 
                required 
                class="appearance-none rounded-none relative block w-full px-3 py-2 
                    border border-gray-300 placeholder-gray-500 text-gray-900 
                    rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                    focus:z-10 sm:text-sm" 
                placeholder="Password" />
            <p class="text-red-500 text-xs">
                {{ error }}
            </p>
          </div>
        </div>
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span v-if="!loading">Sign in</span><span v-else>Loading</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>