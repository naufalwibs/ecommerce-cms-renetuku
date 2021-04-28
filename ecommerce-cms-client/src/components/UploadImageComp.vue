<template>
  <div class="container">
      <div class="col-lg d-flex justify-content-center">
           <button style="margin-bottom: 5%" class="btn btn-info" @click="click1">Upload a Photo</button>
           <input type="file" ref="input1"
            style="display: none"
            @change="previewImage" accept="image/*" >
      </div>
       <div class="col-lg d-flex justify-content-center" v-if="imageData!=null">
         <!-- <div class="bg-preview">
         </div> -->
          <img style="border-radius: 10px;" class="preview bg-preview" height="268" width="356" :src="img1" alt="Waiting-to-Upload">
       <br>
       </div>
       <div class="d-flex justify-content-center" style="background: white; border-radius: 10px; margin-top: 5%;">
         <div class="row">
           <div class="col-lg-6 text-center align-self-center">
              <h4 v-if="imageData!=null"> Upload Link </h4>
           </div>
           <div class="col-lg-6 align-self-center align-middle">
              <p v-if="img1==false"> Link will appear here after upload</p>
              <p>{{ img1 }}</p>
           </div>
         </div>
       </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'UploadImage',
  data () {
    return {
      uploadValue: '',
      img1: '',
      imageData: ''
    }
  },
  methods: {
    click1 () {
      this.$refs.input1.click()
    },

    previewImage (event) {
      this.uploadValue = 0
      this.img1 = null
      this.imageData = event.target.files[0]
      this.onUpload()
    },

    onUpload () {
      this.img1 = null
      const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
      storageRef.on('state_changed', snapshot => {
        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, error => { console.log(error.message) },
      () => {
        this.uploadValue = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.img1 = url
          console.log(this.img1)
        })
      }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
