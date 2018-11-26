<template>
  <div class="order-tabs-titles">
    <div class="order-tabs-title">{{ title }}</div>
    <div
      :class="{'order-tabs-subtitle--sell': isSell}"
      class="order-tabs-subtitle"
    >{{ subTitle }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: Number,
      required: true
    },
    isSell: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
  .order-tabs-titles {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 3.5625rem;

    .order-tabs-title {
      margin-bottom: 0.3125rem;
    }
    .order-tabs-subtitle {
      font-size: 0.6875rem;
      color: rgba(121, 198, 15, 0.5);

      &:after {
        content: '';
        width: 0.9375rem;
        height: 0.625rem;
        display: inline-block;
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIzMi4xMjJweCIgaGVpZ2h0PSIyMi4xNDlweCIgdmlld0JveD0iMCAwIDMyLjEyMiAyMi4xNDkiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyLjEyMiAyMi4xNDkiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwb2x5Z29uIGZpbGw9IiM3OUM2MTAiIHBvaW50cz0iMjMuMzUxLDAgMTkuNjI2LDMuNzI1IDI1LjgxMywzLjcyMyAxNi44NzcsMTIuNjU4IDExLjA4NCw2Ljg2NiAwLDIyLjE0OSAxMS4wODQsMTIuMDM5IDE2Ljg3NywxNy44MzIgMjguMzk5LDYuMzEgMjguMzk4LDEyLjQ5NyAzMi4xMjIsOC43NzIgMzIuMTIyLDAgIi8+PGcgaWQ9InN0YXJfeDVGX2ZpbCI+PGcgaWQ9InN0YXJfeDVGX2xpbiI+PC9nPjwvZz48L3N2Zz4=);
      }

      &--sell {
        color:rgba(255, 47, 47, 0.5);

        &:after {
          width: 0;
          height: 0;
        }
        &:before {
          content: '';
          width: 0.9375rem;
          height: 0.625rem;
          margin-right: .3rem;
          display: inline-block;
          background-size: cover;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIzMi4xMjJweCIgaGVpZ2h0PSIyMi4xNDlweCIgdmlld0JveD0iMCAwIDMyLjEyMiAyMi4xNDkiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyLjEyMiAyMi4xNDkiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwb2x5Z29uIGZpbGw9IiNGRjMwMzAiIHBvaW50cz0iMjguMzk4LDkuNjUzIDI4LjQsMTUuODQgMTYuODc3LDQuMzE3IDExLjA4NCwxMC4xMSAwLDAgMTEuMDg0LDE1LjI4NCAxNi44NzcsOS40OTEgMjUuODEzLDE4LjQyNyAxOS42MjYsMTguNDI1IDIzLjM1MSwyMi4xNDkgMzIuMTIyLDIyLjE0OSAzMi4xMjIsMTMuMzc3ICIvPjxnIGlkPSJzdGFyX3g1Rl9maWwiPjxnIGlkPSJzdGFyX3g1Rl9saW4iPjwvZz48L2c+PC9zdmc+);
        }
      }
    }
  }
</style>
