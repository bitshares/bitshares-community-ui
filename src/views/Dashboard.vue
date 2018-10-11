<template>
  <div class="dashboard">
    dashboard!
    <div class="grid">
      <span><strong>Id</strong></span>
      <span><strong>Full Name</strong></span>
      <span><strong>Country</strong></span>
      <span><strong>Created at</strong></span>
      <span><strong>Email</strong></span>
      <span>0</span>
      <span>Aaron Kris</span>
      <span>Philippines</span>
      <span>1991-05-23T14:19:51</span>
      <span>Ophelia_Mitchell@karley.name</span>
      <span>1</span>
      <span>Simeon McLaughlin</span>
      <span>Singapore</span>
      <span>2012-03-07T00:08:36</span>
      <span>Sabrina_Barton@torey.net</span>
      <span>2</span>
      <span>Kelsie Shanahan</span>
      <span>Brazil</span>
      <span>1985-03-10T20:13:04</span>
      <span>Karianne@salvatore.biz</span>
    </div>
  </div>
</template>

<script>
import Portfolio from '@/components/Portfolio'
import Tabs from '@/components/Tabs'
import Card from '@/components/Card'

export default {
  name: 'Dashboard',
  components: { Portfolio, Tabs, Card }
}
</script>

<style >
.dashboard {
  @apply h-full;
}

.grid {
  background-color: config('colors.table-bg');
  color: config('colors.text-primary');
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.grid > span {
    padding: 8px 4px;
}

.grid > span > strong {
    margin-bottom: 40px;
}
</style>
