Examples:

A card with a title
```js
      <Card
        :title="'Test title'">
        <div slot="header">Awesome features</div>
        <div slot="body">
          <h5>Smth</h5>
          <p>Lots of components.</p>
        </div>
      </Card>
```  

A card without a title
```js
      <Card>
        <div slot="header">Awesome features</div>
        <div slot="body">
          <h5>Smth</h5>
          <p>Lots of components.</p>
        </div>
      </Card>
```  

A card component with two button components inside
```js
      <Card
        :title="'Test title'">
        <div slot="header">
          <Button
            text="button test"
            size="medium"
          />
        </div>
        <div slot="body">
          <Button
            text="button test"
            size="big"
          />
        </div>
      </Card>
```



