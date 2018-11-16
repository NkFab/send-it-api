import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";
import Parcel from "../models/parcel";

chai.use(chaiHttp);
const should = chai.should();
const parcel_dummy = {
    origin: "Kimironko",
    destination: "Kicukiro",
    weight: 30,
    status: "In transit"
};

describe('parcels', () => {
    beforeEach(async () => await Parcel.create(parcel_dummy));
    afterEach(async () => await Parcel.clean());
    describe('GET all parcels', () => {
        it('it should return an empty array', (done) => {
            chai
                .request(server)
                .get('/api/v1/parcels')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.parcels.should.be.a('array');
                    res.body.parcels.length.should.be.eql(1);
                    done();
                });
        });
    });

});