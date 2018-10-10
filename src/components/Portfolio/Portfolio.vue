<template>
  <table>
    <tr>
      <th>Name</th>
      <th colspan="2">Telephone</th>
    </tr>
    <tr>
      <td>Bill Gates</td>
      <td>55577854</td>
      <td>55577855</td>
    </tr>
  </table>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

.portfolio {
  font-family: config("fonts.gotham-medium");
  color: config("colors.text-primary");
}

body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  width: 100%;
  border: 2px solid config('colors.table-bg');
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: config('colors.table-bg');
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: config('colors.table-bg');
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

</style>
