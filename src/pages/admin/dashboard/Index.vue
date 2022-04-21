<script>
export default {
    name: "Dashboard",

    data() {

        return {
            user: {},
        };
    },

    mounted() {

        this.fetchAuth();
    },

    methods: {

        fetchAuth() {

            return this.$http.get().then(({data}) => {
                this.user = data;
            });
        },
    }
}
</script>
<template>
    <div class="w-full flex items-center p-6 bg-gray-300 my-12">
        <h5 class="text-lg">
           Welcome <span class="font-bold">{{ user.full_name }}</span>
        </h5>
    </div>
    <div class="w-full flex flex-wrap mt-3 p-4">
        <router-link :to="{ name: `admin.call-center` }" class="block p-6 md:w-1/4 w-full bg-white rounded-lg border border-gray-200 
            shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-2">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Call Center</h5>
        </router-link>
        <router-link :to="{ name: `admin.users` }" class="block p-6 md:w-1/4 w-full bg-white rounded-lg border border-gray-200 
            shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-2">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Users</h5>
        </router-link>
        <router-link  :to="{ name: `admin.reports.call` }" class="block p-6 md:w-1/4 w-full bg-white rounded-lg border border-gray-200 
            shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-2">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Report</h5>
        </router-link>
    </div>
</template>
