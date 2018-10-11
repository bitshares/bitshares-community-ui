<template>
  <div class="portfolio">
    <table>
      <tr class="headerRow">
        <th>Asset</th>
        <th>$Price</th>
        <th>24h%</th>
        <th>7d%</th>
      </tr>
      <tr>
        <td>BTC</td>
        <td>45</td>
        <td>-1%</td>
        <td>0%</td>
      </tr>
      <tr>
        <td>BTS</td>
        <td>7.2</td>
        <td>-1%</td>
        <td>0%</td>
      </tr>
      <tr>
        <td>TRUSTY</td>
        <td>45</td>
        <td>-1%</td>
        <td>0%</td>
      </tr>
      <tr>
        <td>ETH</td>
        <td>0</td>
        <td>-1%</td>
        <td>0%</td>
      </tr>
      <tr>
        <td>DASH</td>
        <td>0</td>
        <td>-1%</td>
        <td>0%</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

.portfolio {
  font-family: config("fonts.gotham");
}

table {
  width: 100%;
  border-right: 10px solid config('colors.table-bg');
  border-left: 10px solid config('colors.table-bg');
  border-bottom: 10px solid config('colors.table-bg');
  border-radius: 3px;
  background-color: #fff;

}

th {
  background-color: config('colors.table-bg');
  color: rgba(255,255,255,0.5);
  text-align: justify;
}

td {
  background-color: config('colors.table-bg');
  color: config('colors.text-primary');
  text-align: justify;
}

tr:first-child
{
    line-height:40px;
}

</style>
