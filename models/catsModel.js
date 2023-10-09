import { pool } from "../index.js";

// ---------SQL DATABASE INTERACTION FUNCTIONS


export async function getCats() {
// FUNCTION AIM: 
    // Query the database and return all cats


 //do a query to fetch all cats from the table: 
const queryText = "SELECT * FROM cats";

// use the pool object to send the query up to the database
const result = await pool.query(queryText);

// return the retrieved records
return result.rows;
}


//----------- Get cat by id

export async function getCatById(id) {
const tableQuery = `SELECT * FROM cats WHERE id = $1`;
const result = await pool.query(tableQuery, [id]);
return result.rows[0]||null;
}


//----------- create cat and insert into the cat table

export async function createCat(cats) {
const tableQuery = 
`INSERT INTO cats 
(cat_name, breed, owner_id)
VALUES ($1, $2, $3)
RETURNING *`
;
const result = await pool.query(tableQuery, [
    cats.cat_name,
    cats.breed,
    cats.owner_id
]);

return result.rows[0] || null;
}


//----------- update cat by id

export async function updateCatById(id, updates){
    const {cat_name,breed, owner_id} = updates;
    // sql query 
    // $1 protects the query data through paramaterisation
    const queryText = `
    UPDATE cats
    SET cat_name = $1, breed = $2, owner_id = $3 
    WHERE id = $4 
    RETURNING *
    `;
    // Use the pool object to update the query to the database
    const result = await pool.query(queryText,[cat_name, breed, owner_id, id]);
    // returning the updated data
    return result.rows[0] || null;
  }
  

//----------- delete cat by id

export async function deleteCatById(id) {
    // Query the database to delete an cat and return the cat or null
    // Update the cat id to null
    const queryUpdateText = 'UPDATE cats SET owner_id = NULL WHERE owner_id = $1';
    await pool.query(queryUpdateText, [id]);
  
    // Find the deleted cat
    const deletedQuery = `SELECT cat_name, breed, owner_id FROM cats WHERE id = $1`;
    const deleted = await pool.query(deletedQuery, [id]);
    const deletedT = deleted.rows;
  
    // Delete the cat
    const queryDeleteText = 'DELETE FROM cats WHERE id = $1';
    await pool.query(queryDeleteText, [id]);
  
    // Return the deleted author or null
    return deletedT || null;
  }