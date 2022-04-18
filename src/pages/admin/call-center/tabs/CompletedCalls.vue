<script>
export default {
    name: "CompletedCallRooms",

    props: {
        rooms: Array
    }
}
</script>
<template>
<div class="w-full overflow-auto h-table">
    <table class="w-full border">
        <thead class="bg-gray-300 text-sm text-left">
            <tr>
                <th class="p-1">Customer</th>
                <th class="p-1">Enquiry</th>
                <th class="p-1">Date</th>
                <th class="p-1">Status</th>
            </tr>
        </thead>
        <tbody class="bg-gray-100 text-xs">
            <tr v-for="room in rooms" :key="room.id">
                <td class="p-1">{{ room.client_name }}</td>
                <td class="p-1">{{ room.customer_issue }}</td>
                <td class="p-1">{{ room.call_time }}</td>
                <td class="p-1">{{ room.status }}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>