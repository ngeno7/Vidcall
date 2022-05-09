<script>
const { connect, createLocalVideoTrack  } = require('twilio-video');

export default {
    name: "Home",

    data() {

        return {
            accessToken: ``,
            mute: false,
            video: true,
            route: window.location.origin,
            inviteName: new Date().getTime(),
        };
    },

    computed: {
      text() {
        let url = encodeURIComponent(`${this.route}${this.$route.path}?room=${this.$route.query.room}&id=${this.inviteName}`)
        return `CFCS Video Meeting ${url}`;
      }
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

        setAgentJoined() {

            this.$http.post(`set-agent-joined/${this.$route.query.room}`);
        },

        joinRoom(token) {

            connect(token, {
                name: this.$route.query.room,
                video: true,
                audio: { noiseSuppression: true, echoCancellation: true },
              }).then(room => {
                this.setAgentJoined();
                createLocalVideoTrack().then(localVideoTrack => {
                    let localDiv = document.getElementById(room.localParticipant.identity);
                    if(!localDiv) {
                      localDiv = document.createElement('div');
                      localDiv.classList.add('embed-responsive');
                      localDiv.classList.add('embed-responsive-16by9');
                      localDiv.classList.add('rounded-lg');
                      localDiv.classList.add('ratio-1x1');
                      localDiv.setAttribute('id', room.localParticipant.identity);
                    }
                    localDiv.innerHTML = '';
                    const video = localVideoTrack.attach();
                    video.style.transform = 'scale(-1, 1)';
                    video.classList.add('embed-responsive-item');
                    localDiv.appendChild(video);
                    document.getElementById('local-container').appendChild(localDiv);

                    return room.localParticipant.publishTrack(localVideoTrack);
                });
                document.getElementById('mute-button').addEventListener('click', () => {
                  console.log(`mute clicked`);
                  this.mute = !this.mute;
                  room.localParticipant.audioTracks.forEach(publication => {
                    
                    if(this.mute) {
                      publication.track.disable();
                    } else {
                      publication.track.enable();
                    }
                  });
                });

                document.getElementById('enable-video').addEventListener('click', () => {
                  console.log(`Video enable button`);
                  this.video = !this.video;
                  room.localParticipant.videoTracks.forEach(publication => {
                    if(this.video) {
                      publication.track.enable();
                    } else {
                      publication.track.disable();
                    }
                    
                  });
                });
                document.getElementById('disconnect-room').addEventListener('click', () => {
                    if(!window.confirm(`Confirm Exit Room?`)) return;
                    room.on('disconnected', room => {
                          room.localParticipant.tracks.forEach(publication => {
                            const attachedElements = publication.track.detach();
                            attachedElements.forEach(element => element.remove());
                          });
                        });
                        room.disconnect();
                        let hostParam = this.$route.query.host ? `&host=1` : ``;
                        window.location.replace(`/rate-call?room=${this.$route.query.room}${hostParam}`);
                });
                room.participants.forEach(participant => {
                  console.log(participant);
                  this.handleParticipantsConnected(participant, room);
                });

                console.log(`Successfully joined a Room: ${room}`);
                console.log(`The LocalParticipant identity is ${room.localParticipant}`);
                room.on('participantConnected', participant => {
                  this.handleParticipantsConnected(participant, room);
                });
                room.once('participantConnected', participant => {
                  this.handleParticipantsConnected(participant, room);
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

        handleParticipantsConnected(participant, room) {
          participant.tracks.forEach(publication => {
            console.log(publication.track);
            if (publication.track) {
              if(publication.track.kind == 'video') {
                let remoteDiv = document.getElementById(participant.identity);
              if(!remoteDiv) {
                remoteDiv = document.createElement('div');
                remoteDiv.classList.add('embed-responsive');
                remoteDiv.classList.add('embed-responsive-16by9');
                remoteDiv.classList.add('col-lg-5');
                remoteDiv.classList.add('col-md-5');
                remoteDiv.classList.add('col-sm-12');
                remoteDiv.classList.add('ratio-1x1');
                remoteDiv.classList.add('m-1');
                remoteDiv.classList.add('rounded-lg');
                remoteDiv.setAttribute('id', participant.identity);
              }
              remoteDiv.innerHTML = '';
              remoteDiv.appendChild(publication.track.attach());
              document.getElementById('video-container').appendChild(remoteDiv);
              } else {

                document.getElementById('video-container').appendChild(publication.track.attach());
              }
            }
          });

          participant.on('trackSubscribed', (track) => {
  
            if(track.kind == 'video') {
             let remoteDiv = document.getElementById(participant.identity)
              if(!remoteDiv) {
                console.log(`room`, room)
                remoteDiv = document.createElement('div');
                remoteDiv.classList.add('embed-responsive');
                remoteDiv.classList.add('embed-responsive-16by9');
                remoteDiv.classList.add('col-lg-5');
                remoteDiv.classList.add('col-md-5');
                remoteDiv.classList.add('col-sm-12');
                remoteDiv.classList.add('m-1');
                remoteDiv.classList.add('ratio-1x1');
                remoteDiv.classList.add('md:h-auto');
                remoteDiv.setAttribute('id', participant.identity);
              }
              remoteDiv.innerHTML = '';
              const video = track.attach();
              video.style.transform = 'scale(-1, 1)';
              video.style.height = '100%';
              video.style.width = '100%';
              video.classList.add('embed-responsive-item');
              remoteDiv.appendChild(video);
              document.getElementById('video-container').appendChild(remoteDiv);
            } else {
              document.getElementById('video-container').appendChild(track.attach());
            }
          });
        },

        handleParticipantDisconnected(participant) {
          console.log(`disconnected`, participant);
          if(!document.getElementById(participant.identity)) return;
            document.getElementById(participant.identity).remove();
        },

        roomDisconnected(room) {
          room.localParticipant.tracks.forEach(publication => {
              const attachedElements = publication.track.detach();
              attachedElements.forEach(element => element.remove());
          });
          room.disconnect();
        },
    },
}
</script>
<template>
<div class="container bg-gray-300 overflow-auto md:px-32 px-3" id="vid-stream">
  <div class="row" style="min-height:80vh; margin-top:5rem;">
    <div class="col-md-6 col-sm-12" id="local-container"></div>
    <div class="col-md-6 col-sm-12">
      <div class="row" id="video-container"></div>
    </div>
  </div>
</div>
<div class="w-full flex justify-center">
   <div class="md:w-1/3 w-11/12 flex flex-row bg-blue-500 p-2">
    <div class="flex-1 flex justify-center">
        <a
        target="_blank"
        :href='`https://api.whatsapp.com/send?text=${text}`'
        >
        <img class="h-10 w-10" src="/actions/share.png" alt="">
        </a>
    </div>
    <div class="flex-1 flex justify-center">
        <button
          id="mute-button"
          >
          <img class="h-10 w-10" 
            :src="!mute ? `/actions/mic.png` : `/actions/mute.png`" alt="">
        </button>
    </div>
    <div class="flex-1 flex justify-center">
        <button
          id="enable-video"
        >
        <img class="h-10 w-10" 
          :src="video ? `/actions/cancel-video.png` : `/actions/video.png`" alt="">
        </button>
    </div>
    <div class="flex-1 flex justify-center">
        <button id="disconnect-room" >
        <img class="h-10 w-10" src="/actions/cancel.png" alt="">
        </button>
    </div>
   </div> 
</div>
</template>
<style src="../../assets/boostrap.css"></style>