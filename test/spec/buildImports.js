import { expect } from "chai";
import shimmerFactory from "../../index";

describe("buildImports test suite", function() {
  describe("When building a module imports", () => {
    var act, imports, result;

    beforeEach(() => act = () => result = shimmerFactory.buildImports(imports));

    describe("and importing is falsy", () => {
      beforeEach(() => {
        imports = "";
        act();
      });

      it("then the result has no imports", () => {
        expect(result).to.be.equal("");
      });
    });

    describe("and importing a string", () => {
      beforeEach(() => {
        imports = "a";
        act();
      });

      it("then the result has the dependency", () => {
        expect(result).to.be.equal(";a = require(\'a\');");
      });
    });

    describe("and configuring an array with a single string import", () => {
      beforeEach(() => {
        imports = ["a"];
        act();
      });

      it("then the result has the dependency", () => {
        expect(result).to.be.equal(";a = require(\'a\');");
      });
    });

    describe("and configuring an array of strings", () => {
      beforeEach(() => {
        imports = ["a", "b", "c"];
        act();
      });

      it("then the result has all dependencies", () => {
        expect(result).to.be.equal(";a = require(\'a\');b = require(\'b\');c = require('\c\');");
      });
    });

    describe("and configuring an array of a single config import", () => {
      beforeEach(() => {
        imports = [{
          name: "a"
        }];

        act();
      });

      it("then the result has the dependency", () => {
        expect(result).to.be.equal(";a = require(\'a\');");
      });
    });

    describe("and configuring an array of config imports", () => {
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
        expect(result).to.be.equal(";a = require(\'a\');b = require(\'b\');c = require('\c\');");
      });
    });

    describe("and configuring an array with a single config imports with an alias", () => {
      beforeEach(() => {
        imports = [{
          name: "a",
          as: "A"
        }];

        act();
      });

      it("then the result has the dependency with the proper alia", () => {
        expect(result).to.be.equal(";A = require(\'a\');");
      });
    });

    describe("and configuring an array of a single config import with global set to true", () => {
      beforeEach(() => {
        imports = [{
          name: "a",
          global: true
        }];

        act();
      });

      it("then the result has the dependency with a global export", () => {
        expect(result).to.be.equal(";a = global['\a'\] = require(\'a\');");
      });
    });

    describe("and configuring an array of a single config imports with global set to a named module", () => {
      beforeEach(() => {
        imports = [{
          name: "a",
          global: ["A-A", "A-B"]
        }];

        act();
      });

      it("then the result has the dependency with global named export", () => {
        expect(result).to.be.equal(";a = global[\'A-A\'] = global[\'A-B\'] = require(\'a\');");
      });
    });
  });
});
