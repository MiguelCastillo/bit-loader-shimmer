# bit-loader-shimmer
plugin for shimming modules in bit-bundler.

# Install

`$ npm install bit-loader-shimmer`


# Options

## path

String for defining the path where the file is located.

``` javascript
shim({
  boostrap: {
    path: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
  }
})
```


## name

As an alternative to path, you can specify module names which go through the same process of module name resolution as any other module.

``` javascript
shim({
  boostrap: {
    name: 'bootstrap-sass/assets/javascripts/bootstrap',
  }
})
```


## imports

Configuration for defining dependencies. You can provide a module name, an array of them, or configuration objects for richer definitions. With objects you can define import aliases as well as globals.

> When defining a configuration object with a module name as well as a global name, the module name is imported and also written to the global object.

The following example does a few things.
1. Defines the specific file to be used when the module `bootstrap` is imported by another module.
2. It defines a dependency on `jquery`, which causes `jquery` to be laoded first and brought in as a dependency.
3. It creates a local variable called `jQuery` which points to `jquery`.

``` javascript
shim({
  boostrap: {
    path: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    imports: [{
      as: 'jQuery',
      name: 'jquery'
    }]
  }
})

// The result is something like:
// jQuery = require('jquery');
```

You can also just import something from the global object.

``` javascript
shim({
  boostrap: {
    path: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    imports: [{
      as: 'jQuery',
      global: '$'
    }]
  }
})

// The result is something like:
// jQuery = global['$'];
```

This following example expands on the previous examples by writing `jquery` to the global object with names `$` and `jQuery`.

``` javascript
shim({
  boostrap: {
    path: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    imports: [{
      as: 'jQuery',
      global: ['$', 'jQuery'],
      name: 'jquery'
    }]
  }
})

// The result is something like:
// jQuery = global['$'] = global['jQuery'] = require('jquery');
```


## exports

Configuration for exporting globals and local variables as modules for other modules to import. You can provide a module name, a configuration object, or array of configuration objects for richer definitions. When defining objects, you can specify export aliases as well as global names to export.

> When defining a configuration object with a local variable name as well as a global name, the variable name is also written to the global object.


In the following example, `bootstrap` exports the local variable `jQuery.Modal` as a module with the name `Modal`. Consequently, modules will be able to import `Modal`.

``` javascript
shim({
  boostrap: {
    path: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    imports: [{
      as: 'jQuery',
      name: 'jquery'
    }]
    exports: [{
      as: 'Modal',
      name: 'jQuery.Modal'
    }]
  }
})

// The result for the export is something like:
// module.exports['Modal'] = jQuery.Modal;
```

The following example is a tweak to the previous example where `bootstrap` exports `jQuery.Modal` from the global object as a module with the name `Modal`.

``` javascript
shim({
  boostrap: {
    path: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    imports: [{
      name: 'jquery',
      as: 'jQuery'
    }]
    exports: [{
      as: 'Modal',
      global: 'jQuery.Modal'
    }]
  }
})

// The result for the export is something like:
// module.exports['Modal'] = global['jQuery.Modal'];
```

The following example exports `Modal` and writes to the global object.

``` javascript
shim({
  boostrap: {
    path: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    imports: [{
      name: 'jquery',
      as: 'jQuery'
    }]
    exports: [{
      as: 'Modal',
      name: 'jQuery.Modal',
      global: 'jQuery.Modal'
    }]
  }
})

// The result for the export is something like:
// module.exports['Modal'] = global['jQuery.Modal'] = jQuery.Modal;
```


# License

Licensed under MIT

