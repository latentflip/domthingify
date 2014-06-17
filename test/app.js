var template = require('./template.dom');

document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(template({ foo: 'bar' }));
});
