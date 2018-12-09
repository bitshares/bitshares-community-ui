<template>
  <div class="deposit h-full sm:w-120">
    <div class="title">Deposit</div>
    <div>Example content</div>
    <Button
      class="example-button"
      text="example button"/>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  components: { Button }
}
</script>
<style lang="scss">
  .deposit {
    color: white;
    padding: 0.6rem;
    display: flex;
    flex-direction: column;
    min-height: 20rem;
    .title {
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .example-button {
      margin-top: auto;
    }
  }
</style>
