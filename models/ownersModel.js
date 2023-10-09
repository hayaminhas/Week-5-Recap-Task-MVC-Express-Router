// OWNERS TABLE HELPER FUNCTIONS

//________________________IMPORTS__________________________
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "../db/index.js";

// _______________________ HELPER FUNCTION: GET owners REQUEST HELPER _______________________
export async function getOwners() {
  // Query the database and return all owners

  // Define the SQL query to fetch all owners from the owners table
  const queryText = "SELECT * FROM owners";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // return the retrieved records
  return result.rows;
}

// _______________________ HELPER FUNCTION: GET ownerbyID REQUEST HELPER _________________
export async function getOwnerById(id) {
  // Fetch owner by id
  const queryText = "SELECT * FROM owners WHERE id = $1";

  const result = await pool.query(queryText, [id]);

  return result.rows[0] || null;
}

// _______________________ HELPER FUNCTION:  POST createOwner REQUEST HELPER _______________
export async function createOwner(owner) {
  const queryText = `
INSERT INTO owners
(first_name, last_name)
VALUES ($1, $2)
RETURNING *
`;
 
const result = await pool.query(queryText, [
    owner.first_name,
    owner.last_name
]);

return result.rows[0] || null;
}

// _______________________ HELPER FUNCTION: PATCH updateOwnerById REQUEST HELPER ___________


export async function updateOwnerById(id, updates){
  const {first_name,last_name} = updates;
  // sql query 
  // $1 protects the query data through paramaterisation
  const queryText = `
  UPDATE owners
  SET first_name= $1, last_name = $2 
  WHERE id = $3 
  RETURNING *
  `;
  // Use the pool object to update the query to the database
  const result = await pool.query(queryText,[first_name,last_name,id]);
  // returning the updated data
  return result.rows[0] || null;
}
// _______________________ HELPER FUNCTION: DELETE deleteOwnerById REQUEST HELPER ___________
// NOTE: not only need to delete the owner, also need to return the deleted owner

export async function deleteOwnerById(id) {
    // Query the database to delete an author and return the deleted author or null
    
    //const queryUpdateText = `UPDATE owners SET id = NULL WHERE id = $1`;
    //await pool.query(queryUpdateText, [id]);
  
    // Delete the owner
    const queryDeleteText = 'DELETE FROM owners WHERE id = $1';
    await pool.query(queryDeleteText, [id]);
    return queryDeleteText || null;
  }
  
   
   
   
   
   
   