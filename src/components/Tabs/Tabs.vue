<template>
<div id="tabs" class="container">
    <div class="tabs">
        <a  v-bind:key=key v-for="(title, key) in titles" v-on:click="activetab=title" v-bind:class="[ activetab === title ? 'active' : '' ]">{{title}}</a>
    </div>

    <div>
        <div v-if="activetab === titles[0]" class="tabcontent" >
            <slot><div>1</div></slot>
        </div>
        <div v-if="activetab === titles[1]" class="tabcontent" >
            <slot><div>2</div></slot>
        </div>
        <div v-if="activetab === titles[2]" class="tabcontent" >
            <slot><div>3</div></slot>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    /** Sets Tabs text
     */
    titles: () => {
      return {
        type: Array,
        default: ['Tab1', 'Tab2', 'Tab3']
      }
    },
    /** Sets Tabs text
     */
    activetab: {
      type: String,
      default: 'Tab1'
    }
  }
}
</script>

<style lang="css">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: rgb(0, 0, 0);
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px;
  color:black;
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  font-weight: bold;
  color:rgb(88, 88, 88);
  border-bottom: 2px solid rgb(122, 122, 122);
}

/* Change background color of tabs on hover */
.tabs a:hover {
    color:rgb(165, 165, 165);
}

/* Styling for active tab */
.tabs a.active {
  color: #000000;
  border-bottom: 2px solid rgb(0, 0, 0);
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px 30px 30px 30px;
  color:black;
}
</style>
