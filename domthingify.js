var through = require('through');
var domthing = require('domthing');

module.exports = function (fileName) {
    if (!/\.dom$|\.html$/i.test(fileName)) {
        return through();
    }

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
};
