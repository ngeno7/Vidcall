<script>
export default {
    name: "CallCenter",

    data() {

        return {
            rooms: [],
        };
    },

    mounted() {
        this.fetchCallCenterRooms();
    },

    methods: {

        joinRoom(room) {
            if(!window.confirm(`Confirm Join Client Meeting?`)) return;

            let agent = new Date().getTime();
            window.open(`/room?room=${room}&id=${agent}`);
        },

        fetchCallCenterRooms() {

            this.$http.get('rooms').then(({ data }) => {
                this.rooms = data;
            }).catch(() => {});
        },
    },
}
</script>
<template>
<div class="w-full my-4 p-2">
    <h5 class="text-gray-500 font-medium text-lg">Call Center</h5>
</div>
<div class="w-full overflow-auto h-table">
    <table class="w-full border">
        <thead class="bg-gray-300 text-sm text-left">
            <tr>
                <th class="p-1">Customer</th>
                <th class="p-1">Enquiry</th>
                <th class="p-1">Date</th>
                <th class="p-1">Status</th>
                <th class="p-1">Action</th>
            </tr>
        </thead>
        <tbody class="bg-gray-100 text-xs">
            <tr v-for="room in rooms" :key="room.id">
                <td class="p-1">{{ room.client_name }}</td>
                <td class="p-1">{{ room.customer_issue }}</td>
                <td class="p-1">{{ room.call_time }}</td>
                <td class="p-1">{{ room.status }}</td>
                <td class="p-1">
                    <button
                        @click.prevent="joinRoom(room.slug)"
                        class="bg-blue-500 font-medium text-white py-1 px-3">
                        Join Client Call
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<style scoped>
.h-table {
    height: 35rem;
}
</style>
