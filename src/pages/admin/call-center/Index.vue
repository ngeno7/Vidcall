<script>
export default {
    name: "CallCenter",

    methods: {

        joinRoom() {
            let url = `/room?room=1649242238679-1649242244&name=1649242238679&enquiry=What+is+CFCS`;

            window.open(url, 'ROOM')
        },
    }
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
            <tr>
                <td class="p-1">Customer One</td>
                <td class="p-1">CFCS Enquiry</td>
                <td class="p-1">12-04-2034 - 13:00</td>
                <td class="p-1">Pending</td>
                <td class="p-1">
                    <button 
                        @click.prevent="joinRoom"
                        class="bg-blue-500 font-medium text-white py-1 px-3">
                        Receive Call
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
