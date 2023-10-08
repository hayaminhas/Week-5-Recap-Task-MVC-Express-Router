import { pool } from "../index.js";

async function resetDatabase() {
try {
    //CLEAN SLATE Drop tables if they still exist
    await pool.query(`
    DROP TABLE IF EXISTS owners CASCADE;
    DROP TABLE IF EXISTS cats CASCADE;
    `);

   // Create the owners table
   await pool.query(`
   CREATE TABLE owners (
     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     first_name VARCHAR(255) NOT NULL,
     last_name VARCHAR(255) NOT NULL
   );
 `);

 // Create the cats table with a foreign key to the owners table
 await pool.query(`
   CREATE TABLE cats (
     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     cat_name VARCHAR(255) NOT NULL,
     breed VARCHAR(255) NOT NULL,
     owner_id INT REFERENCES owners(id)
   );
 `);

 // Seed the owners table
 await pool.query(`
   INSERT INTO owners (first_name, last_name)
   VALUES 
     ('Haya', 'Minhas'),
     ('James', 'Cooke'),
     ('Siyu', 'Duan');
 `);

 // Seed the cats table
 await pool.query(`
   INSERT INTO cats (cat_name, breed, owner_id)
   VALUES 
     ('Wellington', 'Ragdoll', 1),
     ('Luna', 'Maine Coon', 2),
     ('Mew', 'Persian', 3),
     ('Jonh', 'Bristish Shorthair', 1),
     ('Kevin', 'Scottish Fold', 3);
 `);

 console.log("Database reset successful");
} catch (error) {
 console.error("Database reset failed: ", error);
} finally {
 // End the pool
 await pool.end();
}
}

await resetDatabase();
