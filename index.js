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


	function buildImports(deps) {
		return Object
			.keys(deps)
			.map(function(dep) {
				return types.isString(deps[dep]) ? { name: deps[dep] } : dep;
			})
			.reduce(function(imports, dep) {
				var importName = dep.alias || dep.name;
				imports += "; " + importName;

				if (dep.global !== false) {
					imports += " = global." + importName;
				}

				imports += " = require('" + dep.name + "');";
				return imports;
			}, "");
	}


	function buildExports(exports) {
		return ";module.exports = " + exports + ";";
	}


	return {
		resolve: resolve,
		transform: transform,
		precompile: precompile
	};
}

module.exports = shimmer;
