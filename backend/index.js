const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./database");
const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 5000;

// testapi
app.get("/test", async (req, res) => {
  try {
    const connection = await db.getConnection();
    connection.release();
    res.send("Server is running!");
  } catch (error) {
    console.error("Error connecting to database:", error);
    res.status(500).send("Error connecting to database");
  }
});

// get all ticket
app.get("/tickets", async (req, res) => {
  try {
    // Retrieve all tickets from the database
    const [rows, fields] = await db.execute(`
      SELECT * 
      FROM tickets 
      WHERE status != 'deleted';
    `);
    // Send the retrieved data back to the client
    res.json(rows);
  } catch (error) {
    console.error("Error getting tickets:", error);
    res.status(500).send("Error getting tickets");
  }
});

// insert a ticket
app.post("/ticket", async (req, res) => {
  try {
    const { title, description, contact_info } = req.body;

    // Insert the new ticket into the database
    await db.execute(
      "INSERT INTO tickets (title, description, contact_info) VALUES (?, ?, ?)",
      [title, description, contact_info]
    );

    res.status(201).send("Ticket created successfully");
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).send("Error creating ticket");
  }
});

// Update a ticket
app.put("/ticket/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { title, description, contact_info, status } = req.body;

    // Update the ticket information in the database
    await db.execute(
      "UPDATE tickets SET title=?, description=?, contact_info=?, status=? WHERE id=?",
      [title, description, contact_info, status, ticketId]
    );

    res.send("Ticket updated successfully " + ticketId);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).send("Error updating ticket");
  }
});

app.delete("/ticket/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;

    // Update the ticket satatus to deleted
    await db.execute("UPDATE tickets SET status=? WHERE id=?", [
      "deleted",
      ticketId,
    ]);

    res.send("Ticket deleted successfully");
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).send("Error deleting ticket");
  }
});

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}/`);
});
