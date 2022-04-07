<script>
const { connect, createLocalTracks } = require('twilio-video');
import axios from "axios";
export default {
    name: "Home",

    data() {

        return {
            accessToken: ``,
        }
    },

    mounted() {
        this.fetchAccessToken()
    },

    methods: {

        fetchAccessToken() {

            axios.get(`https://video.racecoursehospital.com/src/token/index.php?room=${this.$route.query.room}`).then(({ data }) => {
                this.joinRoom(data)
            });
        },

        joinRoom(token) {

            connect(token, {
                name: this.$route.query.room,
                video: { width: 640 }
              }).then(room => {
              console.log(`Successfully joined a Room: ${room}`);
              console.log(`The LocalParticipant identity is ${room.localParticipant}`);
              createLocalTracks().then(localTracks => {
                var localMediaContainer = document.getElementById('local-media');
                localTracks.forEach(function(track) {
                  room.localParticipant.publishTrack(track);
                  localMediaContainer.appendChild(track.attach());
                });
                
              });
              room.on('participantConnected', participant => {
                console.log(`A remote Participant connected: ${participant}`);
                room.participants.forEach(participant => {
                  participant.tracks.forEach(publication => {
                    if (publication.track) {
                      let vid = publication.track.attach();
                      vid.style.transform = 'scale(-1, 1)';
                      vid.style.maxHeight = '35rem;';
                      document.getElementById('remote-media').appendChild(vid);
                    }
                  });
                });
                participant.on('trackSubscribed', track => {
                    let tr = track.attach();
                    tr.style.transform = 'scale(-1, 1)';
                    tr.style.maxHeight = '35rem;';
                    document.getElementById('remote-media').appendChild(tr);
                });
              });
              room.once('participantConnected', participant => {
                console.log(`A remote Participant connected once: ${participant}`);
                room.participants.forEach(participant => {
                  participant.tracks.forEach(publication => {
                    if (publication.track) {
                      let vid = publication.track.attach();
                      vid.style.transform = 'scale(-1, 1)';
                      vid.style.maxHeight = '35rem;';
                      document.getElementById('remote-media').appendChild(vid);
                    }
                  });
                });
              });
            }, error => {
              console.error(`Unable to connect to Room: ${error.message}`);
            });
        },
    },
}
</script>
<template>
<div class="w-full flex flex-wrap h-75-screen overflow-auto p-2" id="vid-stream">
    <div class="w-full flex flex-wrap justify-center p-2">
        <div class="md:w-1/3 w-full bg-gray-200 w-full p-2 select-all h-10">
            <p>
                {{ $route.query.room }}
            </p>
        </div>
    </div>
    <div class="md:w-1/2 w-full" id="local-media"></div>
    <div class="md:w-1/2 w-full flex flex-col content-start" id="remote-media">
      <div class="w-1/2">
        <img class="h-32" src="/cfcss.png" alt="">
      </div>
      <div class="flex-1 mt-6">
        <p class="text-gray-800 font-thin">
          Our CFCS consultation services is here to help you write your plan ,educate and approve in Minnesota
        </p>
      </div>
    </div>
</div>
<div class="w-full flex justify-center">
   <div class="md:w-1/3 w-11/12 flex flex-row bg-gray-400 p-2">
    <div class="flex-1 flex justify-center">
        <button>
        <img class="h-10 w-10" src="/actions/mute.png" alt="">
        </button>
    </div>
    <div class="flex-1 flex justify-center">
        <button>
        <img class="h-10 w-10" src="/actions/cancel-video.png" alt="">
        </button>
    </div>
    <div class="flex-1 flex justify-center">
        <router-link
        :to="{ name: `rate-call`}"
        >
        <img class="h-10 w-10" src="/actions/cancel.png" alt="">
        </router-link>
    </div>
   </div> 
</div>
</template>
<style scoped>
@media (min-width: 656px) {
    .h-75-screen {
        height: 80vh;
    }
}
.h-75-screen {
    height: 90vh;
}
</style>
