const { AssertionError } = require('assert');
var assert = require('assert');

before("Before", () => {
    console.log("test setups");
});

describe("dummy", () => {
    it("passing test", () => {
        assert.strictEqual(1 + 2, 3);
    });

    it("error test", () => {
        assert.throws(() => {console.lo("This function doesn't exist")}, TypeError);
    })
});

describe("dummy2", () => {
    it("failing test", () => {
        assert.strictEqual(1 + 2, 4);
    });

    it("error test", () => {
        assert.throws(() => {console.lo("This function doesn't exist")}, TypeError);
    })
});
