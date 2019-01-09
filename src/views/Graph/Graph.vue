<template>
  <div class="graph">
    <canvas
      id="chart"
      ref="canvas"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Line } from 'vue-chartjs'

export default {
  name: 'Graph',
  extends: Line,
  computed: {
    ...mapGetters({
      graphItems: 'graph/getGraphItems',
      getTitles: 'graph/getTitles'
    })
  },
  mounted() {
    window.Chart.defaults.global.legend = false
    const ctx = document.getElementById('chart').getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)

    gradient.addColorStop(0, 'rgba(45, 15, 6, 1)')
    gradient.addColorStop(1, 'rgba(45, 15, 6, 0)')

    this.renderChart({
      labels: this.getTitles,
      datasets: [
        {
          showLine: true,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#D95F28',
          lineTension: 0.1,
          backgroundColor: gradient,
          data: this.graphItems,
          spanGaps: true
        }
      ]
    })
  }
}
</script>
<style lang="scss">
  .graph {
    opacity: 1;
    cursor: disabled;
    color: config('colors.primary');
  }
</style>
