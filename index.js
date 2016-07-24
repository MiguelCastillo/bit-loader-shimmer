var types = require("dis-isa");
var utils = require("belty");

function shimmer() {
	var args = Array.prototype.slice.call(arguments);
	var shims = utils.merge.apply(null, [{}].concat(args));

	Object
		.keys(shims)
		.forEach(function(key) {
			if (types.isString(shims[key])) {
				shims[key] = {
					path: shims[key]
				};
			}
		});

	function resolve(meta) {
		if (shims.hasOwnProperty(meta.name)) {
			var result = utils.pick(shims[meta.name], ["path", "name", "source"]);
			result.shimName = meta.name;
			return result;
		}
	}

	function precompile(meta) {
		if (shims.hasOwnProperty(meta.shimName)) {
			return utils.pick(shims[meta.shimName], ["exports"]);
		}
	}

	function transform(meta) {
		if (shims.hasOwnProperty(meta.shimName)) {
			var imports = buildImports(shims[meta.shimName].imports);
			var exports = buildExports(shims[meta.shimName].exports);

			if (imports || exports) {
				return {
					source: imports + meta.source + exports
				};
			}
		}
	}


	return {
		resolve: resolve,
		transform: transform,
		precompile: precompile
	};
}


function buildImports(config) {
	return utils
		.toArray(config)
		.map(function(name) {
			return types.isString(name) ? { name: name } : name;
		})
		.reduce(function(result, item) {
			var name = item.as || item.name;
			result += name;

			if (item.global !== false) {
				var global = types.isString(item.global) ? item.global : name;
				result += " = global['" + global + "']";
			}

			return result + " = require('" + item.name + "');";
		}, ";");
}


function buildExports(config) {
	return utils
		.toArray(config)
		.map(function(name) {
			return types.isString(name) ? { name: name } : name;
		})
		.reduce(function(result, item) {
			var name = item.as || item.name;
			result += item.as ? "module.exports['" + name + "'] = " : "module.exports = ";

			if (item.global) {
				var global = types.isString(item.global) ? item.global : name;
				result += "global['" + global + "'] = ";
			}

			return result + item.name + ";";
		}, ";");
}


module.exports = shimmer;
module.exports.buildImports = buildImports;
module.exports.buildExports = buildExports;
