<script>
const { connect, createLocalVideoTrack  } = require('twilio-video');
export default {
    name: "Home",

    data() {

        return {
            accessToken: ``,
            participants: [],
            room: {},
        };
    },

    mounted() {
        this.fetchAccessToken();
    },

    methods: {

        async fetchAccessToken() {

            const accessToken = await this.$http.get(`rooms/access-token?room=${this.$route.query.room}&id=${this.$route.query.id}`);

            this.accessToken = accessToken.data;
            this.joinRoom(accessToken.data);
        },

        joinRoom(token) {

            connect(token, {
                name: this.$route.query.room,
                video: { width: 300, height: 300 },
                audio: true,
              }).then(room => {
                createLocalVideoTrack().then(localVideoTrack => {
                  room.localParticipant.publishTrack(localVideoTrack);
                });

                room.participants.forEach(participant => {
                  console.log(participant);
                  this.handleParticipantsConnected(participant);
                });

                console.log(`Successfully joined a Room: ${room}`);
                console.log(`The LocalParticipant identity is ${room.localParticipant}`);
                room.on('participantConnected', participant => {
                  this.handleParticipantsConnected(participant);
                });
                room.once('participantConnected', participant => {
                  this.handleParticipantsConnected(participant);
                });
                room.once('participantDisconnected', participant => {
                  this.handleParticipantDisconnected(participant);
                });
                room.once('participantDisconnected', participant => {
                  this.handleParticipantDisconnected(participant);
                });
            }, error => {
              console.error(`Unable to connect to Room: ${error.message}`);
            });
        },

        handleParticipantsConnected(participant) {
          console.log(`A remote Participant connected: ${participant.identity}`);
          participant.tracks.forEach(publication => {
            if (publication.track) {
              const remoteDiv = document.createElement('div');
              remoteDiv.classList.add('md:w-1/3');
              remoteDiv.classList.add('w-full');
              remoteDiv.setAttribute('id', participant.identity);
              remoteDiv.appendChild(publication.track.attach());
              document.getElementById('video-container').appendChild(remoteDiv);
            }
          });
          participant.on('trackSubscribed', track => {
           console.log(track.kind)
             const remoteDiv = document.createElement('div');
              remoteDiv.classList.add('md:w-1/3');
              remoteDiv.classList.add('w-full');
              remoteDiv.setAttribute('id', participant.identity);
              remoteDiv.appendChild(track.attach());
              if(track.kind == 'video') {
                document.getElementById('video-container').appendChild(remoteDiv);
              }
              
          });
        },

        handleParticipantDisconnected(participant) {
          console.log(`Participant "${participant.identity}" has disconnected to the Room`);
        },
    },
}
</script>
<template>
<div class="w-full flex flex-wrap h-75-screen overflow-auto p-2" id="vid-stream">
    <div class="w-full flex flex-wrap content-start" id="video-container"></div>
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
