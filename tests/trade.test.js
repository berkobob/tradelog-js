const request = require("supertest");
const express = require("express");
const app = require("../src/app");
const Trade = require("../src/models/trade");

beforeAll(() => {
    return;
});

test("should retrieve trades from database", async done => {
    const response = await request(app)
        .get("/api")
        .expect(200);
    done();
});

module.exports = {
    testEnvironment: "node",
};
