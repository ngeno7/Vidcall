<script>
const { connect, createLocalVideoTrack } = require('twilio-video');
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
    
            connect(`${token}`, { name: this.$route.query.room }).then(room => {
              console.log(`Successfully joined a Room: ${room}`);
              console.log(`The LocalParticipant identity is ${room.localParticipant}`)
              createLocalVideoTrack({ name: `Hillary`}).then((localVideoTrack ) => {
                  console.log('Created LocalVideoTrack with id ${localVideoTrack.id}')
                    const localMediaContainer = document.getElementById('local-media');
                    const video = localVideoTrack.attach();
                    video.style.transform = 'scale(-1, 1)';
                    localMediaContainer.appendChild(video);
              })
              room.on('participantConnected', participant => {

                console.log(`A remote Participant connected: ${participant}`);
                room.participants.forEach(participant => {
                  participant.tracks.forEach(publication => {
                    if (publication.track) {
                      let vid = publication.track.attach();
                      vid.style.transform = 'scale(-1, 1)';
                      document.getElementById('remote-media').appendChild(vid);
                    }
                  });
                });
                participant.on('trackSubscribed', track => {
                    let tr = track.attach();
                    tr.style.transform = 'scale(-1, 1)';
                  document.getElementById('remote-media').appendChild(tr);
                });
              });
              room.once('participantConnected', participant => {
                console.log(`A remote Participant connected: ${participant}`);
                room.participants.forEach(participant => {
                  participant.tracks.forEach(publication => {
                    if (publication.track) {
                      let vid = publication.track.attach();
                      vid.style.transform = 'scale(-1, 1)';
                      document.getElementById('remote-media').appendChild(vid);
                    }
                  });
                });
                participant.on('trackSubscribed', track => {
                    let tr = track.attach();
                    tr.style.transform = 'scale(-1, 1)';
                  document.getElementById('remote-media').appendChild(tr);
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
    <div class="md:w-1/2 w-full" id="remote-media"></div>
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
        :to="{ name: `home`}"
        >
        <img class="h-10 w-10" src="/actions/cancel.png" alt="">
        </router-link>
    </div>
   </div> 
</div>
</template>
<style scoped>
@media only screen and (min-width: 656px) {
    .h-75-screen {
        height: 80vh;
    }
}
</style>
