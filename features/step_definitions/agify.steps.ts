import { Given, When, Then } from "@cucumber/cucumber";
import chai = require("chai");
import apiClient from "../../support/apiClient";
import { AxiosResponse } from "axios";
const expect = chai.expect;

let response: AxiosResponse;
let name: string | undefined;
let country: string | undefined;
let batchNames: string[] = [];

Given("I have the name {string}", function (inputName: string) {
    name = inputName;
});

Given("I have an empty name", function () {
    name = "";
});

Given('no name is provided', function () {

});

Given("I have the name {string} and country {string}", function (inputName: string, inputCountry: string) {
    name = inputName;
    country = inputCountry;
});

Given("I have the names {string}, {string} and {string}", function (name1: string, name2: string, name3: string) {
    batchNames = [name1, name2, name3];
});

When("I send a request to the Agify API", async function () {
    try {
        response = await apiClient.get("/", {
            params: { name, country_id: country }
        });
    } catch (err: any) {
        response = err.response;
        if (!response) {
            // If error has no response (network failure), rethrow
            throw err;
        }
    }
});

When("I send a request to the Agify API without any parameter", async function () {
    try {
        response = await apiClient.get("/");
    } catch (err: any) {
        response = err.response;
        if (!response) {
            // If error has no response (network failure), rethrow
            throw err;
        }
    }
});

When("I send a request to the Agify API in batch mode", async function () {
    try {
        // Build params object with name[] for each name in array
        const params = new URLSearchParams();
        batchNames.forEach(name => params.append("name[]", name));

        response = await apiClient.get("/", { params });
    } catch (err: any) {
        response = err.response;
        if (!response) {
            // If error has no response (network failure), rethrow
            throw err;
        }
    }
    return response;
});

Then("the response status should be {int}", function (statusCode: number) {
    expect(response.status).to.equal(statusCode);
});

Then("the response should include the name {string}", function (expectedName: string) {
    expect(response.data.name).to.equal(expectedName);
});

Then('the response should return a 422 error', function () {
    expect(response.status).to.equal(422);
    expect(response.data).to.have.property('error');
});

Then("the response should include an age as a number", function () {
    expect(response.data).to.have.property("age");
    if (response.data.age !== null) {
        expect(response.data.age).to.be.a("number");
    }
});

Then("the response should include a count greater than 0", function () {
    expect(response.data).to.have.property("count");
    expect(response.data.count).to.be.greaterThan(0);
});

Then("the response should include the age as null", function () {
    expect(response.data).to.have.property("age");
    if (response.data.age !== null) {
        expect(response.data.age).to.be.null;
    }
});

Then("the response should include the country_id {string}", function (expectedCountry: string) {
    expect(response.data).to.have.property("country_id");
    expect(response.data.country_id).to.equal(expectedCountry);
});

Then('the response should include {int} results', function (count: number) {
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('array').with.lengthOf(count);
    response.data.forEach((entry: any) => {
        expect(entry).to.have.all.keys('name', 'age', 'count');
    });
});
