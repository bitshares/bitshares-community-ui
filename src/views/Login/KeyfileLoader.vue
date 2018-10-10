<template>
  <div>
    <form ref="fileform">
      <div @click="selectFile">
        <input
          v-show="false"
          ref="fileInput"
          color="blue darken-3"
          type="file"
          enctype="multipart/form-data"
          accept=".bin"
          @change="fileSelected">

        <div
          v-if = "!file"
          :class = "{ hide: isOnDrag }"
          class="source_box white_solid_border horizontal_flex">
          <div class="center_white_text">or SELECT KEY FILE</div>
          <svgicon
            class="copy_icon"
            name="copy"/>
        </div>

        <div
          :class = "{ hide: !isOnDrag }"
          class="source_box white_dotted_border drag_place_holder">
          Place in this area
        </div>

        <div
          v-if = "loading"
          class="source_box white_solid_border">
          <div class="labels">
            <div class="loading flex">
              <span>LOADING...</span>
            </div>
            <div class="cancel flex">
              <span>CANCEL</span>
            </div>
            <div class="percent flex">
              <span>41%</span>
            </div>
          </div>
          <div class="progress_base">
            <div class="bar"/>
          </div>
        </div>

        <div
          v-if = "loadingError"
          class="source_box white_solid_border error_box">
          <div class="two_line">
            <div class="top_white_text">
              SELECT KEY FILE
            </div>
            <div class="bottom_yellow_text">
              Loading error, try to select or drag again
            </div>
          </div>
          <svgicon
            class="copy_icon"
            name="copy"/>
        </div>

        <div
          v-if = "loadingSuccess"
          class="source_box white_solid_border column_cell_middle_vert">
          <div class="file_uploaded">
            <svgicon
              class="binfile_icon"
              name="binfile"/>
            <div class="file_name">{{ fileName }}</div>
            <svgicon
              class="cancel_icon"
              name="cancel"/>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import '@icons/copy'
import '@icons/binfile'
import '@icons/cancel'
import { mapActions } from 'vuex'

export default {
  props: {
    restoreError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dragAndDropCapable: false,
      file: null,
      inProgress: false,
      name: '',
      password: '',
      loading: false,
      isOnDrag: false
    }
  },
  computed: {
    fileName() {
      return (
        (this.file && this.file.name) || false
      )
    },
    loadingError() {
      return this.file && this.restoreError
    },
    loadingSuccess() {
      return this.file && !this.restoreError
    }
  },
  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable()
    if (this.dragAndDropCapable) {
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(evt => {
        this.$refs.fileform.addEventListener(evt, e => {
          e.preventDefault()
          e.stopPropagation()
        }, false)
      })
      this.$refs.fileform.addEventListener('drop', e => {
        const file = e.dataTransfer.files[0]
        this.emitFile(file)
      })
      this.$refs.fileform.addEventListener('dragover', e => {
        this.isOnDrag = true
      })
      this.$refs.fileform.addEventListener('dragleave', e => {
        this.isOnDrag = false
      })
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
    emitFile(file) {
      if (file) {
        this.file = file
        this.$emit('select', {
          success: true,
          file
        })
        return
      }
      this.$emit('select', {
        success: false
      })
    },
    fileSelected(e) {
      const file = e.target.files[0]
      this.emitFile(file)
    },
    determineDragAndDropCapable() {
      var div = document.createElement('div')
      return (('draggable' in div) ||
              ('ondragstart' in div && 'ondrop' in div)) &&
              'FileReader' in window
    },
    setHover(hover) {

    }
  }
}
</script>

<style type="text/css" scoped>
  .source_box {
    width: 347px;
    height: 50px;
    background-color: black;
  }
  .white_solid_border {
    border: 2px solid white;
  }
  .white_dotted_border {
    border: 2px dotted white;
  }
  .horizontal_flex {
    display: table;
  }
  .center_white_text {
    font-size: 18px;
    color: white;
    padding-left: 79px;
    display: table-cell;
    vertical-align: middle;
  }
  .copy_icon {
    color: white;
    width: 21px;
    height: 24px;
    margin-right: 14px;
    float: right;
    margin-top: 13px;
  }
  .drag_place_holder {
    vertical-align: middle;
    display: table-cell;
    text-align: center;
    font-size: 11px;
    color: #7a7675;
  }
  .labels {
    padding-top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 21px;
    margin-right: 21px;
  }
  .loading {
    font-size: 11px;
    color: #7a7675;
  }
  .cancel {
    font-size: 18px;
    color: white;
  }
  .percent {
    font-size: 18px;
    color: #7a7675;
  }
  .flex {
    display: flex;
  }
  .flex span {
    align-self: flex-end;
  }
  .progress_base {
    margin-top: 3px;
    height: 4px;
    width: 307px;
    background-color: #7a7675;
    margin-left: 21px;
    margin-right: 21px;
  }
  .bar {
    width: 180px;
    height: 4px;
    background-color: #fff200;
  }
  .error_box {
    display: table;
    flex-direction: row;
  }
  .two_line {
    display: table-cell;
    vertical-align: middle;
    padding-left: 52px;
    width: 283px;
  }
  .top_white_text {
    height: 14px;
    font-size: 18px;
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
  .file_uploaded {
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;

  }
  .column_cell_middle_vert {
    display: table-cell;
    vertical-align: middle;
  }
  .binfile_icon {
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
  .cancel_icon {
    color: white;
    width: 16px;
    height: 16px;
  }
  .hide {
    display: none;
  }
</style>
