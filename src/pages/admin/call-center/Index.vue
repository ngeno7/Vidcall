<script>
const Pusher = require("pusher-js");
import ActiveRooms from "./tabs/Active.vue";
import CompletedCallRooms from "./tabs/CompletedCalls.vue";
import Swal from 'sweetalert2';
export default {
    name: "CallCenter",

    data() {

        return {
            rooms: [],
            completedRooms: [],
            activeTab: 0
        };
    },

    watch: {

        activeTab() {
            this.fetchCallCenterRooms();
            this.fetchCompletedCalls();
        },
    },

    created() {

        var pusher = new Pusher("f51ef32768397112f453", {
          cluster: "ap2",
        });
        
        let channel = pusher.subscribe("twilio-meet");
        channel.bind('NewMeeting', (data) => {
            Swal.fire({
                text: `${data.client_name} has an enquiry -${data.customer_issue}`,
                icon: `info`,
                toast: true,
                position: 'top-end',
                timerProgressBar: true,
            });
            document.getElementById('sound-notification').play();
            console.log(`hello world`, data);
            this.rooms.unshift(data);
        });

        let channel2 = pusher.subscribe("twilio-end-meet");
        channel2.bind('EndMeeting', (data) => {
            
            let room = this.rooms.filter(rm => rm.id == data.id)[0];
            console.log(`hello world end`, data);
            this.rooms.splice(this.rooms.indexOf(room), 1);
            this.completedRooms.unshift(data);
        });

        let channel3 = pusher.subscribe("twilio-activate-meet");
        channel3.bind('ActiveMeeting', (data) => {
            this.rooms.forEach(room => {
                if(room.slug == data.slug) {
                    room.status = `Active`;
                }
            });
        });

        this.fetchCallCenterRooms();
        this.fetchCompletedCalls();
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

        fetchCompletedCalls() {

            this.$http.get(`completed-calls`).then(({ data }) => {
                this.completedRooms = data;
            }).catch(() => {});
        },

        deleteRoom(roomId) {

            this.$http.delete(`rooms/${roomId}/delete`).then(() => {
                this.fetchCallCenterRooms();
            });
        },
    },
    components: {
        "active-rooms": ActiveRooms,
        "completed-rooms": CompletedCallRooms
    }
}
</script>
<template>
<div class="w-full my-4 p-2">
    <h5 class="text-gray-500 font-medium text-lg">Call Center</h5>
    <audio id="sound-notification" src="/call.wav"></audio>
</div>
<ul class="
  nav nav-tabs nav-justified
  flex flex-col
  md:flex-row
  flex-wrap
  list-none
  border-b-0
  pl-0
  mb-4
" id="tabs-tabJustify" role="tablist">
  <li class="nav-item flex-grow text-center" role="presentation">
    <a href="javascript:void(0)"
    :class="activeTab==0 ? `bg-gray-300` : ``" 
    @click.prevent="activeTab=0"
    class="
      bg-gray-100
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-500
      focus:border-transparent
      active
    " id="tabs-home-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-homeJustify" role="tab"
      aria-controls="tabs-homeJustify" aria-selected="true">Active Calls</a>
  </li>
  <li class="nav-item flex-grow text-center" role="presentation">
    <a href="javascript:void(0)" 
    @click.prevent="activeTab=1"
    :class="activeTab==1 ? `bg-gray-300` : ``"
    class="
      bg-gray-100
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-500
      focus:border-transparent
    " id="tabs-profile-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-profileJustify" role="tab"
      aria-controls="tabs-profileJustify" aria-selected="false">Completed Calls</a>
  </li>
</ul>
<div class="tab-content" id="tabs-tabContentJustify">
  <div class="tab-pane fade"
    v-show="activeTab == 0"
   id="tabs-homeJustify" role="tabpanel"
    aria-labelledby="tabs-home-tabJustify">
    <active-rooms
        @joinRoom="joinRoom"
        @deleteRoom="deleteRoom"
        :rooms="rooms"
     />
  </div>
  <div class="tab-pane fade" 
    v-show="activeTab == 1"
    id="tabs-profileJustify" role="tabpanel" aria-labelledby="tabs-profile-tabJustify">
    <completed-rooms 
        :rooms="completedRooms"
    />
  </div>
</div>

</template>
<style scoped>
.h-table {
    height: 35rem;
}
</style>
