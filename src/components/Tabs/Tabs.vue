<template>
  <div class="tabs">
    <div class="tabs-header">
      <ul :class="centered === true ? 'center' : ''">
        <li
          v-for="(tab, key) in tabs"
          :key="key">
          <span
            :class="activeTab === tab ? 'active' : ''"
            href="#"
            @click="() => activeTab = tab"
          >
            {{ tab }}
          </span>
        </li>
      </ul>
    </div>
    <div class="tabContent">
      <slot
        v-for="tab in filteredTabs"
        :name="tab" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      default: function() {
        return []
      },
      type: Array
    },
    active: {
      default: function() {
        return []
      },
      type: Array
    },
    centered: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      activeTab: this.active[0]
    }
  },
  computed: {
    filteredTabs: function() {
      return this.tabs.map((tab) => {
        if (tab === this.activeTab) {
          return tab
        }
      })
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

span:link {
    text-decoration: none;
}

span:visited {
    text-decoration: none;
}

span:active {
    text-decoration: none;
}

.tabs {
  width: 100%;
}
/* Style the tabs */
.tabs-header {
  overflow: hidden;
  width:100%;
}

.tabs-header ul {
  list-style-type: none;
  margin-left: 20px;
  width:100%;
}

.center {
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
}

.tabs-header span {
  @apply float-left cursor-pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  font-weight: bold;
  color: config('colors.grey');
  border-bottom: 2px solid config('colors.grey');
}

/* Change background color of tabs on hover */
.tabs-header span:hover {
    color:config('colors.grey-darker');;
    border-bottom: 2px solid config('colors.grey-darker');
}

/* Styling for active tab */
.tabs-header span.active {
  @apply cursor-default;
  color: config('colors.white');
  border-bottom: 2px solid config('colors.white');
}

/* Style the tab content */
.tabContent {
  padding: 30px 30px 30px 50px;
  color: config('colors.black');
}
</style>
