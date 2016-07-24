import { expect } from "chai";
import shimmerFactory from "../../index";

describe("buildExports test suite", function() {
  describe("When building a module's exports", () => {
    var act, exports, result;

    beforeEach(() => act = () => result = shimmerFactory.buildExports(exports));

    describe("and exporting is falsy", () => {
      beforeEach(() => {
        exports = "";
        act();
      });

      it("then the result has no exports", () => {
        expect(result).to.be.equal("");
      });
    });

    describe("and exporting a string", () => {
      beforeEach(() => {
        exports = "Jumbo";
        act();
      });

      it("then the result has the export", () => {
        expect(result).to.be.equal(";module.exports = Jumbo;");
      });
    });

    describe("and exporting a named export", () => {
      beforeEach(() => {
        exports = {
          name: "Jumbo",
          as: "JJ-"
        };

        act();
      });

      it("then the result has he named export", () => {
        expect(result).to.be.equal(";module.exports[\'JJ-\'] = Jumbo;");
      });
    });

    describe("and exporting an multiple named exports", () => {
      beforeEach(() => {
        exports = [{
          name: "Jumbo",
          as: "JJ-"
        }, {
          name: "Tedd",
          as: "TeddCruz"
        }, {
          name: "Saloon",
          as: "Traditional Dance Floor"
        }];

        act();
      });

      it("then the result has he named export", () => {
        expect(result).to.be.equal(";module.exports[\'JJ-\'] = Jumbo;module.exports[\'TeddCruz\'] = Tedd;module.exports[\'Traditional Dance Floor\'] = Saloon;");
      });
    });

    describe("and exporting an multiple named exports with global exports", () => {
      beforeEach(() => {
        exports = [{
          name: "Jumbo",
          as: "JJ-"
        }, {
          name: "Tedd",
          as: "TeddCruz",
          global: true
        }, {
          name: "Saloon",
          as: "Traditional Dance Floor",
          global: ["global-name-1", "global-name-2"]
        }];

        act();
      });

      it("then the result has he named export", () => {
        expect(result).to.be.equal(";module.exports[\'JJ-\'] = Jumbo;module.exports[\'TeddCruz\'] = global[\'TeddCruz\'] = Tedd;module.exports[\'Traditional Dance Floor\'] = global[\'global-name-1\'] = global[\'global-name-2\'] = Saloon;");
      });
    });
  });
});
