const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
/* 
* Helper function for updating SQL queries partially.
*
* @param dataToUpdate {Object} {field1: newValue, field2: newValue, ...}
*
* @param jsToSql {Object} maps js-style keys of the obj to database column name format with values 
* equal to idx+1 to be passed in as VALUES later.
* ex: {firstName: "first_name", age: "age"}
* 
* @returns {Object} {sqlSetCols, dataToUpdate}
* @example {firstName: 'Aliya', age: 32} => 
* {setCols : '"first_name"=$1', '"age"=$2', 
* values: ['Aliya', 32]}
*/


function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
