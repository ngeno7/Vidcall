<script>
export default {
    name: "CallReport",
}
</script>
<template>
<div class="w-full p-2 my-3">
    <h5 class="text-lg font-medium">Call Report</h5>
</div>
<div class="w-full overflow-auto">
    <table class="w-full border">
        <thead class="bg-gray-300 text-left">
            <tr>
                <th class="p-1 border">Customer</th>
                <th class="p-1 border">Issue</th>
                <th class="p-1 border">Date</th>
                <th class="p-1 border">Call Duration</th>
                <th class="p-1 border">Call Agent</th>
            </tr>
        </thead>
        <tbody class="bg-gray-100">
            <tr>
                <td class="p-1 border">Customer One</td>
                <td class="p-1 border">CFCS issue</td>
                <td class="p-1 border">13, Mar 2020</td>
                <td class="p-1 border">5 Mins</td>
                <td class="p-1 border">Super User</td>
            </tr>
        </tbody>
    </table>
</div>
</template>