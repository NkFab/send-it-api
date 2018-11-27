import pool from "../database/db_con";
import env from "../config/environment"


export default class ParcelCont {

    static getAllParcels(req, res) {
        const query = {
            text: 'SELECT * FROM orders',
        }
        pool(env.development, query)
            .then(orders => {
                res.status(200).json({ ...orders.rows });
            })
            .catch(err => res.status(500).json({ ...err }))
    };

    static getParcelById(req, res) {
        const { id } = req.params;
        const query = {
            text: "SELECT * FROM orders WHERE order_ref = $1",
            values: [id]
        }
        pool(env.development, query)
            .then(order => {
                order.rows[0] ?
                    res.status(200).json({ ...order.rows[0] })
                    :
                    res.status(404).json({ message: `Parcel order ${id} doesn't exist` })
            })
            .catch(err => res.status(500).json({ ...err }))
    };

    static getParcelOrderByUser(req, res) {
        const { id } = req.params;
        const query = {
            text: `SELECT * FROM orders WHERE order_id = $1`,
            values: [id]
        }
        pool(env.development, query)
            .then(orders => {
                orders.rows ?
                    res.status(200).json({ ...orders.rows })
                    :
                    res.status(404).json({ message: `You did not place any orders` })
            })
            .catch(err => res.status(500).json({ ...err }))
    };

    static cancelParcelOrder(req, res) {
        const { id } = req.params;
        const status = "Canceled";
        const query = {
            text: `UPDATE orders 
                    SET status=$1
                    WHERE order_ref=$2`,
            values: [status, id]
        }
        pool(env.development, query)
            .then(order => {
                order.rows[0] ?
                    res.status(201).json({ order })
                    :
                    res.status(404).json({ ...err })
            })
            .catch(err => res.status(500).json({ ...err }))
    };

    static createParcelOrder(req, res) {
        const unitaryPrice = 1000;
        const status = "On the go";
        const now = new Date();
        const { origin, destination, beneficiary, pick_date, parcel, weight, description, user } = req.body;
        const price = unitaryPrice * weight;
        const query = {
            text: `INSERT INTO orders 
                    (origin, destination, beneficiary, pick_date, price, name_parcel, weight, description, status, created_at, user_id)
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
            values: [origin, destination, beneficiary, pick_date, price, parcel, weight, description, status, now, user]
        };
        pool(env.development, query)
            .then(order => {
                res.status(201).json({ message: 'The parcel order was placed', order })
            })
            .catch(err => res.status(500).json({ message: 'The parcel order was not placed an error occured', ...err }))
    }
}