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
                <th class="p-1">Comment</th>
                <th class="p-1">Date</th>
                <th class="p-1">Status</th>
                <th class="p-1">Action</th>
            </tr>
        </thead>
        <tbody class="bg-gray-100 text-xs">
            <tr v-for="room in rooms" :key="room.id">
                <td class="p-1">{{ room.client_name }}</td>
                <td class="p-1">{{ room.customer_issue }}</td>
                <td class="p-1">{{ room.comment || `-` }}</td>
                <td class="p-1">{{ room.call_time }}</td>
                <td class="p-1">{{ room.status }}</td>
                <td class="p-1">
                    <button
                        class="bg-blue-500 font-medium text-white py-1 px-3"
                        >Details</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>