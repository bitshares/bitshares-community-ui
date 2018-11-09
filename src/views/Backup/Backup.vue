<template>
  <div class="backup">
    <BackupStep2 />
  </div>
</template>
<script>
import BackupStep2 from './BackupStep2'

export default {
  components: {
    BackupStep2
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss">
  .backup {
    color: config('colors.white');
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background: config('colors.bg-base');
    width: 30rem;
    height: 30.4375rem;
    border: 0.0625rem solid config('colors.white')
  }
</style>
