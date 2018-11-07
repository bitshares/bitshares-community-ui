<template>
  <div class="card-container lg:mr-2 mb-2 lg:mb-0">
    <div
      class="card border-transparent sm:border-card-border"
    >

      <Modal
        v-if="expanded"
        @close="expanded = false">
        <div
          class="card border-card-border"
          @click.stop
        >
          <div class="card-header">
            <div class="title">
              <div> {{ title }} </div>
            </div>
            <div
              class="expand-btn"
              @click="expanded = !expanded">></div>
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
          class="expand-btn"
          @click="expanded = !expanded">></div>
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

export default {
  components: { Modal },
  props: {
    title: {
      type: String,
      default: ''
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
.card-container--expanded {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .3s ease;
}

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

.card-expanded {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #7a7675;

  &:hover {
    cursor: pointer;
    background: #7a7675;
  }
}

.card-header {
  padding:config('padding.card-ui');
  padding-bottom: 5px;
  color: config('colors.text-primary');
  display:flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: baseline;
  position: relative;
  .expand-btn {
    top: 5px;
    right: 5px;
    position: absolute;
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
