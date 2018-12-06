<template>
  <div class="backup-step">
    <div class="backup-step-title">backup</div>
    <div class="backup-step-subtitle">You need to backup account before using it</div>
    <div class="backup-step-icon"/>
    <div class="backup-step-content">
      <div class="backup-step-content-confirm">SCREENSHOTS ARE NOT SECURE</div>
      <div class="backup-step-content-item">Never make a digital copy of your</div>
      <div class="backup-step-content-item">backup phrase and never upload it</div>
      <div class="backup-step-content-item">online. You can make a safe backup</div>
      <div class="backup-step-content-item">only with physical paper and a pen</div>
    </div>
    <div class="backup-step-button">
      <Button
        text="I understand"
        width="full"
        @click="$emit('change', stepConfig['BACKUP_PHRASE'])"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button/Button'

export default {
  components: {
    Button
  },
  props: {
    stepConfig: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .backup-step {
    text-align: center;
    font-family: config('fonts.gotham');

    .backup-step-title {
      margin-top: 0.9375rem;
      text-transform: uppercase;
      font-family: config('fonts.gotham-medium');
      font-size: config('textSizes.lg');
    }

    .backup-step-subtitle {
      margin: 0.9375rem auto 0;
      width: 15.9375rem;
      font-weight: config('fontWeights.semibold');
      font-size: config('textSizes.lg');
      text-align: center;
    }

    .backup-step-content {
      padding-top: 1.125rem;
      padding-bottom: 1.125rem;
      box-sizing: border-box;
      margin-top: 3.07rem;
      background-color: #6d6e70;
      font-size: 1.125rem;
      box-sizing: border-box;

      .backup-step-content-item {
        font-weight: config('fontWeights.semibold');
        line-height: 1.2;
      }
    }

    .backup-step-content-confirm {
      text-transform: uppercase;
      font-family: config('fonts.gotham-medium');
      color: config('colors.bg-base');
      font-weight: config('fontWeights.medium');
      margin-bottom: 0.625rem;
    }

    .backup-step-button {
      box-sizing: border-box;
      width: 27.5rem;
    }

    .backup-step-icon {
      margin: 1.875rem auto;
      width: 100px;
      height: 100px;
      transform: scale(1, 1);
      background-repeat: no-repeat;
      background-position: 50% 55%;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzZkNmU3MDt9LmNscy0ye2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPtCg0LXRgdGD0YDRgSAzPC90aXRsZT48ZyBpZD0i0KHQu9C+0LlfMiIgZGF0YS1uYW1lPSLQodC70L7QuSAyIj48ZyBpZD0icG9wLXVwcyI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTI0LjU1LDU4Ljk0aC0xNGE1LjM0LDUuMzQsMCwwLDEtNS0zLjk1bC0yLjM3LTEwLjMzYTUuMzUsNS4zNSwwLDAsMC01LTMuOTVINjEuNzhhNS4zNCw1LjM0LDAsMCwwLTUsMy45NUw1NC40NCw1NWE1LjM1LDUuMzUsMCwwLDEtNSwzLjk1aC0xNGE0LjA2LDQuMDYsMCwwLDAtNCw0LjA1djQzLjg4YTQuMDYsNC4wNiwwLDAsMCw0LDQuMDVoODkuMWE0LjA2LDQuMDYsMCwwLDAsNC00LjA1VjYzQTQuMDYsNC4wNiwwLDAsMCwxMjQuNTUsNTguOTRaTTgwLDEwNC44YTI1Ljk1LDI1Ljk1LDAsMSwxLDI1Ljk1LTI1Ljk1QTI1Ljk1LDI1Ljk1LDAsMCwxLDgwLDEwNC44Wk02Mi4xNSw3OC44NWg0QTEzLjgxLDEzLjgxLDAsMCwxLDgwLDY1LjA2VjYxQTE3Ljg3LDE3Ljg3LDAsMCwwLDYyLjE1LDc4Ljg1WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTIzLjQsMTM2LjZhODAsODAsMCwxLDEsMTEzLjE5LDBBODAuMTMsODAuMTMsMCwwLDEsMjMuNCwxMzYuNlptMTA4LTEwOGE3Mi43MSw3Mi43MSwwLDEsMCwwLDEwMi44M0E3Mi44LDcyLjgsMCwwLDAsMTMxLjQyLDI4LjU4WiIvPjxyZWN0IGNsYXNzPSJjbHMtMiIgeD0iMy42MiIgeT0iNzYuMzQiIHdpZHRoPSIxNTIuNzUiIGhlaWdodD0iNy4zMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMzLjE0IDgwLjAxKSByb3RhdGUoLTQ1KSIvPjwvZz48L2c+PC9zdmc+);
    }
  }
  @media (max-width: 800px) {
    .backup-step {
      .backup-step-button {
        width: 100%;
      }
      .backup-step-content {
        padding-left: 0.9375rem;
        padding-right: 0.9375rem;
      }
    }
  }
</style>
