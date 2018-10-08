<template>
  <div>
    <!-- <div
      v-if = "!file"
      class="box"
      @click="selectFile">
      <p class="middleText">SELECT FILE</p>
      <div class="icon_wrap">
        <svgicon
          class="icon"
          name="copy"
        />
      </div>
      <input
        v-show="false"
        ref="fileInput"
        color="blue darken-3"
        type="file"
        accept=".bin"
        @change="fileSelected">
    </div>


    <div
      v-if = "restoreError"
      class="box"
      @click="selectFile">
      <div class="two_line">
        <div class="top_white_text">
          SELECT KEY FILE
        </div>
        <div class="bottom_yellow_text">
          Loading error, try to select or drag again
        </div>
      </div>
      <div class="icon_wrap">
        <svgicon
          class="icon"
          name="copy"
        />
      </div>
      <input
        v-show="false"
        ref="fileInput"
        color="blue darken-3"
        type="file"
        accept=".bin"
        @change="fileSelected">
    </div> -->


    <!-- <div class="box donefilebox" >
      <svgicon
        class="fileIcgkkkon icon"
        name="binfile"/>
      <div class="file_name">{{ fileName }}</div>
      <svgicon
        class="cancelIcon icon"
        name="cancel"/>
    </div> -->

    <div class="upload_box">
      <div class="loading_texts">
        <div class="loading">LOADING...</div>
        <div class="middle_loading">CANCEL</div>
        <div class="percent_loading">42%</div>
      </div>
<!--       <div class="loading_bars">
        <progress value="12" max="100"/>
      </div>  --> 
    </div>

  </div>
</template>

<script>
import '@icons/copy'
import '@icons/binfile'
import '@icons/cancel'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      file: null,
      inProgress: false,
      restoreError: false,
      name: '',
      password: ''
    }
  },
  validations() {
    return {
      file: {
        required
      }
    }
  },
  computed: {
    fileName() {
      return (
        (this.file && this.file.name) || 'nope'
      )
    }
  },
  methods: {
    ...mapActions({
      loginPass: 'account/loginWithPassword',
      backup: 'account/restoreBackup'
    }),
    selectFile() {
      this.$refs.fileInput.click()
    },
    fileSelected(e) {
      const file = e.target.files[0]
      if (file) {
        this.file = file
        this.loginFile()
      }
      console.log('file: ', file)
    },
    loginFile() {
      this.inProgress = true
      let reader = new FileReader()
      reader.onload = async evt => {
        const result = await this.backup({
          password: 'error password',
          backup: evt.target.result
        })

        this.inProgress = false

        if (!result.success) {
          this.restoreError = result.error
          this.$emit('message', {
            text: result.error,
            type: 'error'
          })
        }

        if (result.success) {
          console.log('file name: ', this.file.name)
          console.log('name: ', this.name)
          console.log('password: ', this.password)
        }
        console.log('this.restoreError: ', this.restoreError)
      }
      reader.readAsBinaryString(this.file)
    }

  }
}
</script>

<style type="text/css" scoped>
  .box {
    width: 347px;
    height: 50px;
    background-color: black;
    border-color: #ffffff;
    border-width: 1px;
    flex-direction: row;
    display: flex;
  }
  .upload_box {
    width: 347px;
    height: 50px;
    background-color: black;
    border-color: #ffffff;
    border-width: 1px;
    flex-direction: column;
    display: flex;
  }

  .middleText {
    height: 14px;
    padding-top: 12px;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    color: white;
  }
  .icon {
    color: white;
  }
  .icon_wrap {
    float: right;
  }
  .two_line{
    float: center;
    display: flex;
    flex-direction: column;
    width: 283px;
  }
  .top_white_text {
    height: 14px;
    font-size: 18px;
    margin-top: 11px;
    text-align: center;
    color: #ffffff;
  }
  .bottom_yellow_text {
    height: 10px;
    font-size: 11px;
    padding-top: 5px;
    text-align: center;
    color: #fff200;
  }

  .donefilebox {
    display: flex;
    justify-content: center;
    padding-top: 18px;
  }
  .fileIcon {
    color: white;
    width: 14px;
    height: 17px;
  }
  .file_name {
    font-size: 16px;
    color: #ffffff;
    padding-left: 9px;
    padding-right: 4px;
  }
  .cancelIcon {
    width: 16px;
    height: 16px;
  }

  .progress {
    width: 307px;
    height: 4px;
  }
  .loading_texts {
    padding-top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-end;
  }
  .loading_bars {
    padding-top: 35px;
  }
  .loading {
    font-size: 11px;
    color: #7a7675;
    align-self: flex-end;
    padding-left: 21px;
  }
  .middle_loading {
    font-size: 18px;
    color: #ffffff;
    align-self: flex-end;
  }
  .percent_loading {
    color: #7a7675;
    font-size: 18px;
    align-self: flex-end;
    padding-right: 21px;
  }
</style>
