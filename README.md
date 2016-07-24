# bit-loader-shimmer
plugin for shimming modules in bit-bundler

# Install

`$ npm install bit-loader-shimmer`


# Options

### path

String for defining the path where the file is located.

``` javascript
shim({
  boostrap: {
    path: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
  }
})
```


### name

An alternative to path, you can specify module names

``` javascript
shim({
  boostrap: {
    name: 'bootstrap-sass/assets/javascripts/bootstrap',
  }
})
```


### imports

Object for defining dependencies. You can provide a module name, or an array of them.  You can also specify objects for richer configurations. With objects you you can define import aliases and whether or not the imported dependency should be written to the global object.

Example where `jquery` is imported in a variable called `jQuery`

``` javascript
shim({
  boostrap: {
    path: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    imports: [{
      name: 'jquery',
      as: 'jQuery'
    }]
  }
})
```

Example where `jquery` is imported in a variable called `jQuery`, and writes `$` and `jQuery` to the global object.

``` javascript
shim({
  boostrap: {
    path: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    imports: [{
      name: 'jquery',
      as: 'jQuery',
      global: ['$', 'jQuery']
    }]
  }
})
```


### exports

Object for exporting globals as modules so that other modules can import them as such without relying on the global object. You can provide a string module, an array of strings.  You can also specify objects for richer configurations where you can define export aliases.

Example where `jQuery.Modal` in the global object is exported as `Modal`. Consequently, modules will be able to import `Modal`.

``` javascript
shim({
  boostrap: {
    path: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    imports: [{
      name: 'jquery',
      as: 'jQuery'
    }]
    exports: [{
      name: 'jQuery.Modal',
      as: 'Modal'
    }]
  }
})
```

# License

Licensed under MIT
