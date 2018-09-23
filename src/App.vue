<template>
  <div id="app" class="app container mx-auto">
    <div id="nav">
      <router-link to="/">Main</router-link> |
      <router-link to="/auth">Auth</router-link> |
      <router-link to="/components">Components</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url("~@/styles/main.scss");

html,
body {
  @apply h-full;
}

.app {
  @apply h-full font-gotham-regular;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
