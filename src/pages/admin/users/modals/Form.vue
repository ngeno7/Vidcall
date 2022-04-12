<script>
export default {
    name: "UserForm",

    data() {

        return {
            user: {
                id: 0,
                first_name: ``,
                last_name: ``,
                middle_name: ``,
                email: ``,
                type: 1,
            },
            loading: false,
        };
    },

    props: {
        showModal: {
            type: Boolean,
            default: false,
        },
    },

    methods: {

        parseEditUser(user) {

            this.user = user;
        },

        saveUser() {
            if(this.loading) return;

            this.loading = true;
            this.$http.post('users', this.user).then(({ data }) => {
                this.user = {
                    id: 0,
                    first_name: ``,
                    last_name: ``,
                    middle_name: ``,
                    email: ``,
                    type: 1,
                };
                this.loading = false;
                this.$emit(`close`);
                this.$emit(`refresh`);
                this.$Swal.fire({ text: data.message, icon: `success`});
            }).catch(() =>{ this.loading = false; })
        },
    }
}
</script>
<template>
<div id="medium-modal" tabindex="-1" :class="{
        'hidden': !showModal,
    }" 
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-lg h-full md:h-auto mx-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    Add User
                </h3>
                <button type="button" 
                    @click.prevent="$emit(`close`)"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="medium-modal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <!-- Modal body -->
            <form @submit.prevent="saveUser" id="user-form" class="p-3 w-full flex flex-wrap">
                <div class="w-1/2 mb-2 p-2">
                    <label for="base-input" 
                        class="block mb-2 text-sm font-medium 
                            text-gray-900 dark:text-gray-300">First Name</label>
                    <input type="text" id="base-input" 
                        v-model.trim="user.first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                            dark:focus:border-blue-500">
                </div>
                <div class="w-1/2 mb-2 p-2">
                    <label for="input-middle-name" 
                        class="block mb-2 text-sm font-medium 
                            text-gray-900 dark:text-gray-300">Middle Name</label>
                    <input type="text" id="input-middle-name" 
                        v-model.trim="user.middle_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                            dark:focus:border-blue-500">
                </div>
                <div class="w-1/2 mb-2 p-2">
                    <label for="input-last-name" 
                        class="block mb-2 text-sm font-medium 
                            text-gray-900 dark:text-gray-300">Last Name</label>
                    <input type="text" id="input-last-name" 
                        v-model.trim="user.last_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                            dark:focus:border-blue-500">
                </div>
                <div class="w-1/2 p-2 mb-2 p-2">
                    <label for="username-input" 
                        class="block mb-2 text-sm font-medium 
                            text-gray-900 dark:text-gray-300">Email</label>
                    <input type="text" id="username-input" 
                        v-model.trim="user.email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                            dark:focus:border-blue-500">
                </div>
                <div class="w-1/2 mb-2 p-2">
                    <label for="role-input" 
                        class="block mb-2 text-sm font-medium 
                            text-gray-900 dark:text-gray-300">Role</label>
                    <select id="role-input" v-model="user.type"
                        class="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                            dark:focus:border-blue-500">
                            <option :value="1">Admin</option>
                            <option :value="2">Agent</option>
                    </select>
                </div>
                <div class="w-1/2 mb-2 p-2">
                    <label for="password-input" 
                        class="block mb-2 text-sm font-medium 
                            text-gray-900 dark:text-gray-300">Password</label>
                    <input type="text" id="password-input" 
                        v-model="user.password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                            dark:focus:border-blue-500">
                </div>
            </form>
            <!-- Modal footer -->
            <div 
                class="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 
                dark:border-gray-600">
                <button form="user-form"
                    type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
                        py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span v-if="!loading">Save</span><span v-else>Loading</span>
                </button>
                <button 
                    @click.prevent="$emit(`close`)"
                    type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 
                        focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 
                        text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 
                        dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 
                        dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
            </div>
        </div>
    </div>
</div>
</template>