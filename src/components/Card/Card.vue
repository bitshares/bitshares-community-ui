<template>
  <div class="card-container lg:mr-2 mb-2 lg:mb-0">
    <div
      class="card border-transparent sm:border-card-border"
    >

      <Modal
        v-if="expanded"
        @close="expanded = false">
        <div
          class="card card--expanded border-card-border"
          @click.stop
        >
          <div class="card-header">
            <div class="title">
              <div> {{ title }} </div>
            </div>
            <svgicon
              class="close-btn"
              width="12"
              height="12"
              color="rgba(255,255,255,0.5)"
              name="cancel"
              @click.native="expanded = false"
            />
            <slot
              class="header"
              name="modal-header"/>
          </div>
          <div class="card-body">
            <slot name="modal" />
          </div>
        </div>
      </Modal>

      <div class="card-header">
        <div class="title">
          <div> {{ title }} </div>
        </div>
        <div
          class="expand-btn hidden"
          v-if="expandable"
          @click="expanded = !expanded">
          <svgicon
            class="expand-icon"
            width="13"
            height="13"
            color="black white white"
            name="expand"
          />
        </div>
        <slot
          class="header"
          name="header"/>
      </div>
      <div class="card-body">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import '@/assets/icons/expand'

export default {
  components: { Modal },
  props: {
    title: {
      type: String,
      default: ''
    },
    expandable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: false
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  height: 25rem;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  font-family: config('fonts.gotham-regular');
  background-color: config('colors.card-background');
  border-width: 1px;
  transition: max-height 0.2s;
  &:last-child {
    @apply mr-0;
  }
}

.card--expanded {
  .card-header {
    padding-right: 2rem;
  }
}


.card-header {
  padding:config('padding.card-ui');
  padding-left: 1rem;
  padding-right: 1.5rem;
  padding-bottom: 0.3rem;
  color: config('colors.text-primary');
  display:flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: baseline;
  position: relative;
  .expand-btn {
    top: 0.4rem;
    right: 0.4rem;
    position: absolute;
    height: 0.8rem;
    width: 0.8rem;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 30rem;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .expand-icon {
      opacity: 0;
      transition: opacity 0.15s;
    }
    &:hover {
      .expand-icon {
        opacity: 1;
      }
    }
  }
  .close-btn {
    top: 0.6rem;
    right: 0.6rem;
    position: absolute;
    cursor: pointer;
  }
}

.title {
  font-size: config('textSizes.base');
  font-family: config('fonts.gotham-medium');
  text-transform: uppercase;
  font-size: config('textSizes.base');
}

.header {
  margin-left: auto;
}

.card-body {
  @apply pt-3;
  height: 100%;
  overflow: hidden;
}

</style>
