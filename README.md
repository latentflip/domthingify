# Domthingify

Browserify transform for [domthing](http://github.com/latentflip/domthing).

## Install

```
npm install domthingify domthing
```

## Usage

Require your domthing templates directly from your scripts, including the `.dom` extension:

```javascript
var MyView = View.extend({
    template: require('./path/to/template.dom')
});
```

Add `domthingify` to your browserify transform list.

* With browserify: `browserify app.js -o bundle.js -t domthingify`
* With beefy: `beefy app.js -- -t domthingify`
* With moonboots:

    ```json
    var moonbootsConfig = {
        main: __dirname + '/sample/app.js',
        libraries: [ ... ],
        stylesheets: [ ... ],
        browserify: {
            transforms: [ 'domthingify' ]
        }
    };
    ```

## License

MIT
