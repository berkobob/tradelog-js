const sum = require("../src/scratch");

test("Should work", done => {
    sum(2, 3).then(sum => {
        expect(sum).toBe(5);
        done();
    });
});

test("another go", async () => {
    const res = await sum(2, 3);
    expect(res).toBe(5);
});

describe("A bunch of tests", () => {
    it("test1", () => {
        expect(1).toBe(1);
    });
    it("test2", () => {
        expect(1).not.toBe(2);
    });
});
