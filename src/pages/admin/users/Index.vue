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
    :showModal="addUser"
    @close="addUser=false"
/>
<div class="w-full overflow-auto">
    <table class="w-full border">
        <thead class="bg-gray-300 text-left">
            <tr>
                <th class="p-1 border">Name</th>
                <th class="p-1 border">Role</th>
                <th class="p-1 border">Status</th>
                <th class="p-1 border">Date Registered</th>
                <th class="p-1 border">Action</th>
            </tr>
        </thead>
        <tbody class="bg-gray-100">
            <tr>
                <td class="p-1 border">Super User</td>
                <td class="p-1 border">Admin</td>
                <td class="p-1 border">Pending</td>
                <td class="p-1 border">12, Feb 2020</td>
                <td class="p-1 border">
                    <button 
                        @click.prevent="addUser=true"
                        class="py-1 px-4 text-xs bg-blue-500 text-white">
                        Edit
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
