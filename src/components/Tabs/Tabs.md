Examples:

3 tabs example
```js
      <Tabs :tabs="['Tab example #1 with the responsive width', 'Tab example #2 with the responsive width', 'Tab example #3 with the responsive width']">
      <div slot="Tab example #1 with the responsive width">
        <!-- Stuff. -->1
      </div>

      <div slot="Tab example #2 with the responsive width">
        <!-- Stuff. -->2
      </div>

      <div slot="Tab example #3 with the responsive width">
        <!-- Stuff.-->3
      </div>
      </Tabs>
```

4 tabs example
```js
      <Tabs :tabs="['Tab example #1', 'Tab example #2', 'Tab example #3', 'Tab example #4']">
      <div slot="Tab example #1">
        <!-- Stuff. -->1
      </div>

      <div slot="Tab example #2">
        <!-- Stuff. -->2
      </div>

      <div slot="Tab example #3">
        <!-- Stuff.-->3
      </div>

      <div slot="Tab example #4">
        <!-- Stuff.-->4
      </div>
      </Tabs>
```

4 centered tabs example 
```js
      <Tabs :crentered=true :tabs="['Tab example #1', 'Tab example #2', 'Tab example #3', 'Tab example #4']">
      <div slot="Tab example #1">
        <!-- Stuff. -->1
      </div>

      <div slot="Tab example #2">
        <!-- Stuff. -->2
      </div>

      <div slot="Tab example #3">
        <!-- Stuff.-->3
      </div>

      <div slot="Tab example #4">
        <!-- Stuff.-->4
      </div>
      </Tabs>
```

4 centered tabs example with default first active tab
```js
      <Tabs :active="['Tab example #1']" :crentered=true :tabs="['Tab example #1', 'Tab example #2', 'Tab example #3', 'Tab example #4']">
      <div slot="Tab example #1">
        <!-- Stuff. -->1
      </div>

      <div slot="Tab example #2">
        <!-- Stuff. -->2
      </div>

      <div slot="Tab example #3">
        <!-- Stuff.-->3
      </div>

      <div slot="Tab example #4">
        <!-- Stuff.-->4
      </div>
      </Tabs>
```