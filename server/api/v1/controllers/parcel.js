import Parcel from '../models/parcel';

const getAllParcels = (req, res, next) => {
    Parcel.search({})
        .then(parcels => {
            res.status(200).json({ parcels });
        })
        .catch(err => res.status(500).json({ ...err }));
};

const getParcelById = (req, res, next) => {
    const { id } = req.params;
    Parcel.searchById(id)
        .then(parcel => {
            if (parcel) {
                res.status(200).json({ ...parcel });
            } else {
                res.status(204).json({ message: `Parcel ${id} not found` });
            }
        })
        .catch(err => res.status(500).json({ ...err }));
};

const getParcelOrderByUser = (req, res, next) => {
    res.status(200).json({ message: "These were ordered by a user" });
};

const cancelParcelOrder = (req, res, next) => {
    const { id } = req.params;
    Parcel.update(id, { ...req.body })
        .then(parcels => {
            if (parcels) {
                res.status(200).json({ message: 'success', parcels });
            } else {
                res.status(204).json({ message: `Parcel ${id} not found` });
            }
        })
        .catch(err => res.status(500).json({ ...err }));
};

const createParcelOrder = (req, res, next) => {
    const { recipient, ...rest } = req.body;
    Parcel.create({ recipient, ...rest })
        .then(parcels => {
            res.status(201).json({ message: 'success', parcels });
        })
        .catch(err => res.status(500).json({ ...err }));
}

export { getAllParcels, getParcelById, getParcelOrderByUser, cancelParcelOrder, createParcelOrder };


