<template>
  <div class="tabs">
    <div class="tabs-header">
      <ul :class="centered === true ? 'center' : ''">
        <li
          v-for="(tab, key) in tabs"
          :key="key">
          <span
            :class="activeTab === tab ? 'active' : ''"
            @click="activeTab = tab"
          >
            {{ tab }}
          </span>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <slot
        :name="activeTab" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      default: () => [],
      type: Array
    },
    centered: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      activeTab: this.tabs[0]
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

/* Style the tabs */
.tabs-header {
  overflow: hidden;
}

.tabs-header ul {
  list-style-type: none;
}

.center {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:row;
  flex-wrap:nowrap;
  text-align:center;
  margin-left: -40px;
  margin-right: auto;
}

.tabs-header span {
  @apply float-left cursor-pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  font-weight: bold;
  color: config('colors.tab-header');
  border-bottom: 2px solid config('colors.tab-header');
}

/* Change background color of tabs on hover */
.tabs-header span:hover {
    color:config('colors.tab-hover');;
    border-bottom: 2px solid config('colors.tab-hover');
}

/* Styling for active tab */
.tabs-header span.active {
  @apply cursor-default;
  color: config('colors.tab-active');
  border-bottom: 2px solid config('colors.tab-active');
}

/* Style the tab content */
.tab-content {
  padding: 30px 30px 30px 30px;
  color: config('colors.tab-content');
}
</style>
