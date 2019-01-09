<template>
  <div class="card-container h-full">
    <div
      :class="{
        'card--collapsed': collapsed,
        'card--mobile': mobile,
        'lg:h-card-long-height': long
      }"
      class="card border-none h-full lg:h-card-height"
    >
      <Modal
        v-if="expanded"
        @close="expanded = false"
      >
        <div
          class="card card--expanded"
          @click.stop
        >
          <div class="card-header">
            <div class="title">
              <div> {{ title }} </div>
            </div>
            <slot
              class="header"
              name="modal-header"/>
          </div>
          <div class="card-body">
            <slot name="modal" />
          </div>
        </div>
      </Modal>

      <div
        v-if="title"
        class="card-header"
      >
        <div
          class="card-header-collapsible"
          @click="collapsible && handleCollapseClick()"
        >
          <div class="title">
            <div> {{ title }} </div>
          </div>
          <svgicon
            v-if="collapsible"
            :class="{'collapse-btn--active' : collapsed }"
            class="collapse-btn"
            width="20"
            height="20"
            name="arrowDown"
          />
        </div>
        <div
          v-if="expandable"
          class="expand-btn hidden lg:flex"
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
          v-if="!collapsed"
          class="header"
          name="header"/>
      </div>
      <transition name="fade">
        <div
          v-if="!collapsed"
          :class="{'no-pt': !title}"
          class="card-body"
        >
          <slot name="body" />
        </div>
      </transition>
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
    },
    collapsible: {
      type: Boolean,
      default: false
    },
    long: {
      type: Boolean,
      default: false
    },
    mobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: false,
      collapsed: false
    }
  },
  methods: {
    handleCollapseClick() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style scoped lang="scss">
.card-container:last-child {
  .card {
    margin-right: 0;
  }
}

.card-header-collapsible {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}

.card {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  font-family: config('fonts.gotham-regular');
  background-color: config('colors.card-background');
  transition: 0.2s;
  &--expanded {
    height: 30rem;
    .card-header {
      padding-right: 2rem;
      padding-top: 1rem;
      padding-left: 1.25rem;
      .title {
        font-size: config('textSizes.lg')
      }
    }
  }
  &--mobile {
    .card-header {
      padding-right: 1rem;
    }
    .card-body {
      padding-top: 0!important;
    }
  }
  &--collapsed {
    height: 2.8rem;
    transition: 0.2s;
  }
  .card-body {
    @apply pt-3;
    height: 100%;
    overflow: hidden;
  }
}

.card-header {
  padding:config('padding.card-ui');
  padding-left: 1rem;
  padding-right: 1.5rem;
  padding-bottom: 0.8rem;
  color: config('colors.text-primary');
  display:flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: baseline;
  position: relative;
  user-select: none;
  .title {
    font-size: config('textSizes.base');
    font-family: config('fonts.gotham-medium');
    text-transform: uppercase;
    font-size: config('textSizes.base');
    white-space: nowrap;
  }
  .collapse-btn {
    transform: none;
    transition: transform 0.2s;
    margin-left: 0.5rem;
    padding: 0.25rem;
    opacity: 0.8;
    align-self: center;
    flex-shrink: 0;
    cursor: pointer;
    &.collapse-btn--active {
      transform: rotate(-90deg);
    }
  }
  .expand-btn {
    top: 0.4rem;
    right: 0.4rem;
    position: absolute;
    height: 0.8rem;
    width: 0.8rem;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 30rem;
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

.header {
  margin-left: auto;
}

.card-body {
  @apply pt-3;
  height: 100%;
  overflow: hidden;

  &.no-pt {
    @apply pt-0;
  }
}

.collapse-btn {
  transform: rotate(-90deg);
  transition: 0.2s;
  margin: 0 auto 0 0.1875em;
  opacity: 0.8;
  cursor: pointer;
}

.collapse-btn--active {
  margin: 0 auto 0 0.1875em;
  transition: 0.2s;
  cursor: pointer;
}

.card-collapsed {
  height: 2.8rem;
  transition: 0.2s;
}

</style>
