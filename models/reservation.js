/** Reservation for Lunchly */
const moment = require("moment");
const db = require("../db");

/** A reservation for a party */
class Reservation {
  constructor({ id, customerId, numGuests, startAt, notes }) {
    this.id = id;
    this.customerId = customerId;
    this.numGuests = numGuests;
    this.startAt = startAt;
    this.notes = notes;
  }

  /** formatter for startAt */
  getformattedStartAt() {
    return moment(this.startAt).format("MMMM Do YYYY, h:mm a");
  }

  async save() {
    //Validate Data
    if (!this.customerId ||
      isNaN(this.customerId) ||
      !isFinite(this.customerId))
      throw new Error("Customer ID must be a number.");
    if (!this.startAt)
      throw new Error("Start at must have an input.");
    if (!this.numGuests ||
      isNaN(this.numGuests) ||
      !isFinite(this.numGuests))
      throw new Error("Guests must be a number.");
    if (!this.notes)
      this.notes = '';

    if (!this.id ||
      isNaN(this.id) ||
      !isFinite(this.id)) {
      const result = await db.query(`
        INSERT INTO
          reservations
          (customer_id, start_at, num_guests, notes)
        VALUES
          ($1, $2 ,$3 ,$4)
        RETURNING
          id`,
        [this.customerId,
        this.startAt,
        this.numGuests,
        this.notes]);
      if (result.rows.length === 0)
        throw new Error("Cannot insert into rervations.");

      this.id = result.rows[0].id;
    } else {
      const result = await db.query(`
        UPDATE
          reservations
        SET
          customer_id=$1,
          start_at=$2,
          num_guests=$3,
          notes=$4
        WHERE
          id=$5
        RETURNING
          id`,
        [this.customerId,
        this.startAt,
        this.numGuests,
        this.notes,
        this.id])
      if (result.rows.length === 0)
        throw new Error("Reservation update did not complete successfully.");
    }
  }

  /** given a customer id, find their reservations. */
  static async getReservationsForCustomer(customerId) {
    const results = await db.query(
      `SELECT 
        id, 
        customer_id AS "customerId", 
        num_guests AS "numGuests", 
        start_at AS "startAt", 
        notes AS "notes"
      FROM 
        reservations 
      WHERE 
        customer_id = $1`,
      [customerId]
    );
    return results.rows.map((row) => new Reservation(row));
  }

  /** given a customer id, find their reservations. */
  static async getReservationsForCustomer(customerId) {
    const results = await db.query(
      `SELECT 
        id, 
        customer_id AS "customerId", 
        num_guests AS "numGuests", 
        start_at AS "startAt", 
        notes AS "notes"
      FROM 
        reservations 
      WHERE 
        customer_id = $1`,
      [customerId]
    );
    return results.rows.map((row) => new Reservation(row));
  }
}

module.exports = Reservation;
