<template>
  <div>
    <div class="tabs-header">
      <ul>
        <li v-for="(tab, key) in tabs" v-bind:key=key>
          <a
            :class="activeTab === tab ? 'active' : ''"
            href="#"
            @click="(e) => activeTab = tab"
          >
            {{ tab }}
          </a>
        </li>
      </ul>
    </div>
    <div class="tabContent">
      <slot :name="tab" v-for="tab in tabs" v-if="tab === activeTab" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array
  },
  data () {
    return {
      activeTab: this.tabs[0]
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

a:link {
    text-decoration: none;
}

a:visited {
    text-decoration: none;
}

a:active {
    text-decoration: none;
}

/* Style the tabs */
.tabs-header {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px;
  width:100%;
}

.tabs-header ul {
  list-style-type: none;
  margin-left: 20px;
  width:100%;
}

.tabs-header a {
  @apply float-left cursor-pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  font-weight: bold;
  color:grey;
  border-bottom: 2px solid grey;
}

/* Change background color of tabs on hover */
.tabs-header a:hover {
    color:DarkGrey;
    border-bottom: 2px solid DarkGrey;
}

/* Styling for active tab */
.tabs-header a.active {
  @apply cursor-default;
  color: white;
  border-bottom: 2px solid white;
}

/* Style the tab content */
.tabContent {
  padding: 30px 30px 30px 50px;
  color: black;
}
</style>
