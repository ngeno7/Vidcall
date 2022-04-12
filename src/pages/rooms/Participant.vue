<script>
export default {
    name: "Participant",

    props: {
        participant: {
            type: Object,
            required: true,
        },
    },

    methods: {

    },
}
</script>
<template>
<div>
   <h5 class="text-gray-900">Hello: {{ participant }}</h5>
</div>
</template>