import request from "supertest";
import app from "./../app";

import {
	mockDotterDefault,
	mockDotterWithLocation,
} from "../__mocks__/mockDotters";

describe("Dotters API endpoint:", () => {
	describe("GET / for dotters as default", () => {
		it("returns dotters", async () => {
			const res = await request(app)
				.get("/dotters")
				.expect("Content-Type", /json/)
				.expect(200);

			// contains accurate pageInfo data
			// page numbers and dotter total may vary
			expect(res.body.pageInfo).toEqual(
				expect.objectContaining(mockDotterDefault.pageInfo)
			);
			// contains an array of dotters of at least
			// if not more than the seeded dotter data
			expect(res.body.data).toEqual(
				expect.arrayContaining(mockDotterDefault.data)
			);
		});
	});

	describe("GET / for dotters with location data", () => {
		it("returns dotters w/ location", async () => {
			const res = await request(app)
				.get("/dotters?includeLocation=true")
				.expect("Content-Type", /json/)
				.expect(200);

			const { pageInfo, data } = mockDotterWithLocation;
			// contains accurate pageInfo data
			// page numbers and dotter total may vary
			expect(res.body.pageInfo).toEqual(expect.objectContaining(pageInfo));
			// contains an array of dotters of at least
			// if not more than the seeded dotter data
			expect(res.body.data).toEqual(expect.arrayContaining(data));
		});
	});
});
