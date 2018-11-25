import Parcel from '../models/parcel';

export default class ParcelCont {

    static getAllParcels(req, res, next) {
        Parcel.search({})
            .then(parcels => {
                res.status(200).json({ parcels });
            })
            .catch(err => res.status(500).json({ ...err }));
    };

    static getParcelById(req, res, next) {
        const { id } = req.params;
        Parcel.searchById(id)
            .then(parcel => {
                if (parcel) {
                    res.status(200).json({ ...parcel });
                } else {
                    res.status(404).json({ message: `Parcel ${id} is not found` });
                }
            })
            .catch(err => res.status(500).json({ ...err }));
    };

    static getParcelOrderByUser(req, res, next) {
        res.status(200).json({ message: "These were ordered by a user" });
    };

    static cancelParcelOrder(req, res) {
        const { id } = req.params;
        Parcel.update(id, { ...req.body })
            .then(parcels => {
                if (parcels) {
                    res.status(200).json({ parcels });
                } else {
                    res.status(404).json({ message: `Parcel ${id} is not found` });
                }
            })
            .catch(err => res.status(500).json({ ...err }));
    };

    static createParcelOrder(req, res, next) {
        const { recipient, ...rest } = req.body;
        Parcel.create({ recipient, ...rest })
            .then(parcels => {
                res.status(201).json({ message: 'The parcel order was created', parcels });
            })
            .catch(err => res.status(500).json({ ...err }));
    }
}

