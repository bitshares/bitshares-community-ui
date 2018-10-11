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
          v-if = "initState"
          class="source_box white_solid_border horizontal_flex">
          <div class="center_white_text">or SELECT KEY FILE</div>
          <svgicon
            class="dragndrop_icon"
            name="dragndrop"/>
        </div>

        <div
          :class = "{ hide: !dragOver }"
          class="source_box white_dotted_border drag_place_holder">
          Place in this area
        </div>

        <div
          v-if = "loading"
          class="source_box white_solid_border"
          @click="cancelFile">
          <div class="labels">
            <div class="loading flex">
              <span @click="cancelFile">LOADING...</span>
            </div>
            <div class="cancel flex">
              <span>CANCEL</span>
            </div>
            <div class="percent flex">
              <span>{{progressValue}}</span>
            </div>
          </div>
          <div class="progress_base">
            <div
              :style="{ width: progressValue + '%'}"
              class="bar"/>
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
            class="dragndrop_icon"
            name="dragndrop"/>
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
              name="cancel"
              @click="cancelFile"/>
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
import '@icons/dragndrop'

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
      loading: false,
      dragOver: false,
      progressValue: 0
    }
  },
  computed: {
    fileName() {
      return (
        (this.file && this.file.name) || false
      )
    },
    initState() {
      return !this.file && !this.dragOver
    },
    loadingError() {
      return this.file && this.restoreError && !this.dragOver
    },

    loadingSuccess() {
      return this.file && !this.restoreError && !this.dragOver && !this.loading
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
        this.dragOver = false
        this.readFile(file)
      })
      this.$refs.fileform.addEventListener('dragenter', e => {
        this.dragOver = true
      })
      this.$refs.fileform.addEventListener('dragleave', e => {
        this.dragOver = false
      })
    }
  },
  methods: {
    selectFile() {
      this.$refs.fileInput.click()
    },
    fileSelected(e) {
      const file = e.target.files[0]
      this.readFile(file)
    },
    extractFileExtension(file) {
      return file.name.split('.').pop()
    },
    readFile(file) {
      if (file) {
        if (this.extractFileExtension(file) !== 'bin') return
        this.file = file
        let reader = new FileReader()
        reader.onloadstart = () => {
          this.loading = true
          this.progressValue = 0
        }
        reader.onprogress = data => {
          if (data.lengthComputable) {
            this.progressValue = parseInt(((data.loaded / data.total) * 100), 10)
          }
        }
        reader.onloadend = () => {
          // this.loading = false
          this.progressValue = 100
        }
        reader.readAsBinaryString(this.file)
        this.$emit('select', file)
      }
    },
    determineDragAndDropCapable() {
      const div = document.createElement('div')
      return (('draggable' in div) ||
              ('ondragstart' in div && 'ondrop' in div)) &&
              'FileReader' in window
    },
    cancelFile(e) {
      e.stopPropagation()
      this.$refs.fileInput.value = null
      this.loading = false
      this.file = false
      this.progressValue = 0
      this.$emit('remove')
    },
    handleDragStart(e) {
      this.isOnDrag = true
    },
    handleDragEnd(e) {
      this.isOnDrag = false
    }
  }
}
</script>

<style type="text/css" scoped>
  .source_box {
    cursor: pointer;
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
  .dragndrop_icon {
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
    color: config('colors.input-title-active');
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
    color: config('colors.input-title-active');
  }
  .cancel {
    font-size: 18px;
    color: white;
  }
  .percent {
    font-size: 18px;
    color: config('colors.input-title-active');
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
    background-color: config('colors.input-title-active');
    margin-left: 21px;
    margin-right: 21px;
  }
  .bar {
    width: 80%;
    height: 4px;
    background-color: config('colors.text-error');
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
    color: white;
  }
  .bottom_yellow_text {
    height: 10px;
    font-size: 11px;
    padding-top: 5px;
    text-align: center;
    color: config('colors.text-error');
  }
  .file_uploaded {
    margin: auto;
    display: flex;
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
    color: white;
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
