var through = require('through');
var domthing = require('domthing');
var staticModule = require('static-module');
var Readable = require('stream').Readable;

module.exports = function (fileName) {

    if (/\.dom$/i.test(fileName)) {
        var inputString = '';

        return through(
            function (chunk) {
                inputString += chunk;
            },
            function () {
                domthing.parser(inputString, function (err, ast) {
                    if (err) return this.emit('error', err);

                    var compiled = domthing.compiler.compile(ast);

                    var moduleBody = [
                        "var _runtime = require('domthing/runtime');",
                        "module.exports = function (template, runtime) {",
                        "    return " + compiled + "(template, runtime || _runtime);",
                        "}"
                    ].join('\n');

                    this.queue(moduleBody);
                    this.queue(null);
                }.bind(this));
            }
        );
    }

    var sm = staticModule({
        domthingify: function (str) {
            var stream = new Readable();

            domthing.parser(str, function (err, ast) {
                if (err) return stream.emit('error', err);

                var compiled = domthing.compiler.compile(ast);

                var moduleBody = [
                    "(function () {",
                    "    var _runtime = require('domthing/runtime');",
                    "    return function (template, runtime) {",
                    "        return " + compiled + "(template, runtime || _runtime);",
                    "    }",
                    "}())"
                ].join('\n');

                stream.push(moduleBody);
                stream.push(null);

            }.bind(this));

            return stream;
        }
    });

    return sm;

};
