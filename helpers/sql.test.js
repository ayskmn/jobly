const { BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("./sql");

process.env.NODE_ENV === "test"

describe("sqlForPartialUpdate", function() {
	test("testing 1 key/value pair",function () {
		const result = sqlForPartialUpdate(
			//dataToUpdate 
			{f1: "v1"},
			//jsToSql
			{f1: "f1", f2: "f2"});
		expect(result).toEqual({
			setCols: "\"f1\" = $1",
			values: ["v1"],
		});
		
	});
	test("works: 2 items", function () {
		const result = sqlForPartialUpdate(
		    { f1: "v1", jsF2: "v2" },
		    { jsF2: "f2" });
		expect(result).toEqual({
		  setCols: "\"f1\"=$1, \"f2\"=$2",
		  values: ["v1", "v2"],
		});
	});
})