Examples:
 
Text input
```js
new Vue({
  data(){
    return {
      text: '',
      number: 2,
      error: ''
    }
  },
  template: `
    <div>
      <Input v-model="error" title="example"/>
      <Input v-model="number" type="number" title="example"/>
      <Input value="disabled text value" title="disabled input" :disabled="true"/>
      <Input v-model="text" title="example" :error="error"/>
    </div>
  `
})
```