<script>
import UserForm from "./modals/Form.vue";
export default {
    name: "UsersIndex",

    data() {

        return {
            users: [],
            addUser: false
        };
    },

    mounted() {
        this.fetchUsers();
    },

    methods: {

        fetchUsers() {

            this.$http.get('users').then(({ data }) => {
                this.users = data;
            }).catch(() => {});
        },
    },

    components: {
        'user-form': UserForm
    },
}
</script>
<template>
<div class="w-full flex flex-row p-2 my-3">
    <div class="flex-1">
        <h4 class="text-lg font-medium text-gray-800">Users</h4>
    </div>
    <div class="flex-1 text-right">
        <button 
            @click.prevent="addUser=true"
            class="py-1 px-4 text-xs bg-blue-500 text-white">
            Add
        </button>
    </div>
</div>
<user-form 
    ref="userForm"
    :showModal="addUser"
    @close="addUser=false"
    @refresh="fetchUsers"
/>
<div class="w-full overflow-auto">
    <table class="w-full border">
        <thead class="bg-gray-300 text-left">
            <tr>
                <th class="p-1 border">Name</th>
                <th class="p-1 border">Role</th>
                <th class="p-1 border">Email</th>
                <th class="p-1 border">Date Registered</th>
                <th class="p-1 border">Action</th>
            </tr>
        </thead>
        <tbody class="bg-gray-100">
            <tr v-for="usr in users" :key="usr.id">
                <td class="p-1 border">{{ usr.full_name }}</td>
                <td class="p-1 border">{{ usr.role }}</td>
                <td class="p-1 border">{{ usr.email}}</td>
                <td class="p-1 border">{{ usr.created_at }}</td>
                <td class="p-1 border">
                    <button 
                        @click.prevent="() => {
                            $refs.userForm.parseEditUser({
                                first_name: usr.first_name,
                                last_name: usr.last_name,
                                middle_name: usr.middle_name,
                                email: usr.email,
                                password: ``,
                                type: usr.type,
                                id: usr.id,
                            });
                            addUser=true;
                        }"
                        class="py-1 px-4 text-xs bg-blue-500 text-white">
                        Edit
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
