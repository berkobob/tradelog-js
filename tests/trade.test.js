const request = require("supertest");
const app = require("../src/app");
const Trade = require("../src/models/trade");
const validate = require("../src/utils/validate");

const tradeOne = {
    date: "20190225",
    buyOrSell: "SELL",
    quantity: 123,
    symbol: "AAPL7 130921P00420000",
    expiry: "18/01/2014",
    strike: 123.56,
    putOrCall: "P",
    tradePrice: 678.9,
    proceeds: 9876.54,
    commission: 3.21,
    netCash: 1234.56,
    assetClass: "OPT",
    openOrClose: "O",
    multiplier: 100,
    notes: "None",
};

const tradeError = {
    date: "poo",
    buyOrSell: "buy",
    quantity: "a string",
    symbol: "any",
    expiry: "not today",
    strike: "not a number",
    putOrCall: "no",
    tradePrice: "NaN",
    proceeds: "NaN",
    commission: "NaN",
    netCash: "NaN",
    assetClass: ":)",
    openOrClose: "shut",
    multiplier: "NaN",
    notes: "None",
};

beforeAll(async () => {
    await Trade.deleteMany();
    await new Trade(validate(tradeOne)).save();
});

test("should post a valid trade", async () => {
    const response = await request(app)
        .post("/api")
        .send({
            date: "20190627",
            buyOrSell: "BUY",
            quantity: 321,
            symbol: "AAPL7 130921P00420000",
            expiry: "18/01/2014",
            strike: 123.56,
            putOrCall: "P",
            tradePrice: 678.9,
            proceeds: 9876.54,
            commission: 3.21,
            netCash: 1234.56,
            assetClass: "OPT",
            openOrClose: "O",
            multiplier: 100,
            notes: "None",
        })
        .expect(201);

    expect(response.body.quantity).toEqual(321);
});

test("should get two trades", async () => {
    const response = await request(app)
        .get("/api")
        .send()
        .expect(200);

    expect(response.body.length).toBe(2);
});

test("should reject an invalid trade", async () => {
    const response = await request(app)
        .post("/api")
        .send(tradeError)
        .expect(400);

    expect(response.body.errors.hasOwnProperty("date")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("buyOrSell")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("quantity")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("symbol")).toBeFalsy();
    expect(response.body.errors.hasOwnProperty("expiry")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("strike")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("putOrCall")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("tradePrice")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("proceeds")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("commission")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("netCash")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("assetClass")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("openOrClose")).toBeTruthy();
    expect(response.body.errors.hasOwnProperty("multiplier")).toBeTruthy();
});

afterAll(done => {
    setImmediate(done);
});
