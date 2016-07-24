import { expect } from "chai";
import shimmerFactory from "../../index";

describe("buildImports test suite", function() {
  describe("When building a module imports", () => {
    var act, imports, result;

    beforeEach(() => act = () => result = shimmerFactory.buildImports(imports));

    describe("and importing a string", () => {
      beforeEach(() => {
        imports = "a";
        act();
      });

      it("then the result has the dependency", () => {
        expect(result).to.be.equal(";a = global[\'a\'] = require(\'a\');");
      });
    });

    describe("and configuring an array with a single string import", () => {
      beforeEach(() => {
        imports = ["a"];
        act();
      });

      it("then the result has the dependency", () => {
        expect(result).to.be.equal(";a = global[\'a\'] = require(\'a\');");
      });
    });

    describe("and configuring an array of string imports", () => {
      beforeEach(() => {
        imports = ["a", "b", "c"];
        act();
      });

      it("then the result has all dependencies", () => {
        expect(result).to.be.equal(";a = global[\'a\'] = require(\'a\');b = global[\'b\'] = require(\'b\');c = global[\'c\'] = require('\c\');");
      });
    });

    describe("and configuring an array of a single config imports", () => {
      beforeEach(() => {
        imports = [{
          name: "a"
        }];

        act();
      });

      it("then the result has the dependency", () => {
        expect(result).to.be.equal(";a = global[\'a\'] = require(\'a\');");
      });
    });

    describe("and configuring an array of string imports", () => {
      beforeEach(() => {
        imports = [{
          name: "a"
        }, {
          name: "b"
        }, {
          name: "c"
        }];

        act();
      });

      it("then the result has all dependencies", () => {
        expect(result).to.be.equal(";a = global[\'a\'] = require(\'a\');b = global[\'b\'] = require(\'b\');c = global[\'c\'] = require('\c\');");
      });
    });

    describe("and configuring an array of a single config imports with an alias", () => {
      beforeEach(() => {
        imports = [{
          name: "a",
          as: "A"
        }];

        act();
      });

      it("then the result has the dependency with the proper alia", () => {
        expect(result).to.be.equal(";A = global[\'A\'] = require(\'a\');");
      });
    });

    describe("and configuring an array of a single config imports with global set to false", () => {
      beforeEach(() => {
        imports = [{
          name: "a",
          global: false
        }];

        act();
      });

      it("then the result has the dependency without global export", () => {
        expect(result).to.be.equal(";a = require(\'a\');");
      });
    });

    describe("and configuring an array of a single config imports with global set to false", () => {
      beforeEach(() => {
        imports = [{
          name: "a",
          global: "A-A"
        }];

        act();
      });

      it("then the result has the dependency without global export", () => {
        expect(result).to.be.equal(";a = global[\'A-A\'] = require(\'a\');");
      });
    });
  });
});
