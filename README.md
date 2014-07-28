# Domthingify

Browserify transform for [domthing](http://github.com/latentflip/domthing).

Listens to change events from any attributes of the default model of the view it is mixed in,
then passing on the attribute change to the dom using domthingify's el.update method.


## Usage example: ampersand-view with domthingify

exampleView.js
```javascript
var View = require('ampersand-view');
var domthingMixin = require('ampersand-domthing-mixin');

module.exports = View.extend(domthingMixin).extend({
    template: require('../templates/exampleView.dom')
});
```
exampleView.dom
```html
<div>
    <p role="content">{{model.content}}</p>
</div>
```


## ampersand-view without domthingify

exampleView.js
```javascript
var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/exampleView.dom'),
    bindings: {
        'model.content': '[role="content"]'
    }
});
```

exampleView.dom
```html
<div>
    <p role="content"></p>
</div>
```