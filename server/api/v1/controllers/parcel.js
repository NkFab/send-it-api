import Parcel from '../models/parcel';

const getAllParcels = (req, res, next) => {
    res.status(200).json({ message: "All parcels" });
};

const getParcelById = (req, res, next) => {
    res.status(200).json({ message: "A parcel by id" })
};

const getParcelOrderByUser = (req, res, next) => {
    res.status(200).json({ message: "These were ordered by a user" });
};

const cancelParcelOrder = (req, res, next) => {
    res.status(200).json({ message: "these were canceled" });
};

const createParcelOrder = (req, res, next) => {
    res.status(200).json({ message: "These were created" });
}

export { getAllParcels, getParcelById, getParcelOrderByUser, cancelParcelOrder, createParcelOrder };