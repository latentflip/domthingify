# Domthingify

Browserify transform for [domthing](http://github.com/latentflip/domthing).

## Usage on command line

```html
<!-- example.dom -->
<div>
    <p role="content">{{model.content}}</p>
</div>
```

```bash
$ npm install domthingify
$ browserify -t domthingify example.dom > example.js
```

## Usage with [moonboots](http://github.com/HenrikJoreteg/moonboots)

```javascript
var hapi = require('hapi');
var moonboots = require('moonboots_hapi');
var server = hapi.createServer(8080, 'localhost');

server.pack.register({
    plugin: moonboots,
    options: {
        appPath: '/{p*}',
        moonboots: {
            main: __dirname + '/client/app.js',
            developmentMode: true,
            browserify: {
                transforms: [
                    'domthingify'
                ]
            }
        }
    }
}, function() {
    server.start();
    console.log('example running at http://localhost:8080');
});
```

And then in your view files, just require .dom files directly. The transform takes care of that a js file is created from the .dom template at bundle time:
```
var View = require('ampersand-view');
var domthingMixin = require('ampersand-domthing-mixin'); // handles bindings

module.exports = View.extend(domthingMixin, {
    template: require('../templates/example.dom')
});
```

```html
<!-- example.dom -->
<div>
    <p role="content">{{model.content}}</p>
</div>
```
