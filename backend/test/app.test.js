import chai from 'chai';
import chaiHttp from 'chai-http';
import { faker } from '@faker-js/faker';
import endpoints from '../src/routers/endpoints.js';
import app from '../src/index.js';

chai.use(chaiHttp);
chai.should();

const data = {}

let num = 1;

describe('Testing user signup/login', () => {

    it(`Test case ${num++}: User signup should pass`, async () => {

        data.email = faker.internet.email();
        data.name = faker.name.fullName();
        data.password=  faker.internet.password(8);

        const response = await chai.request(app)
                                .post(endpoints.signupUser)
                                .send(data);
        response.should.have.status(200);
        response.body.message.should.equal('User created');

    });


    it(`Test case ${num++}: User signup again with the same email should fail`, async () => {

        const response = await chai.request(app)
                                .post(endpoints.signupUser)
                                .send(data);
        response.should.have.status(400);
        response.text.should.equal('User already exists');

    });

    it(`Test case ${num++}: User login should pass`, async () => {

        const response = await chai.request(app)
                                .post(endpoints.loginUser)
                                .send(data);        
        response.should.have.status(200);
        response.body.should.be.an('object').that.has.property('authToken')

        data.authToken = response.body.authToken;

    });

    it(`Test case ${num++}: Authentication token on each user login should be different`, async () => {

        const response = await chai.request(app)
                                .post(endpoints.loginUser)
                                .send(data);        
        response.should.have.status(200);
        response.body.should.be.an('object').that.has.property('authToken')
        response.body.authToken.should.not.equal(data.authToken);

        data.authToken = response.body.authToken;

    });

});

describe('Testing access to the authenticated routes', () => {

    it(`Test case ${num++}: Updating the user password without an authentication token should fail`, async () => {

        data.password=  faker.internet.password(8);

        const response = await chai.request(app)
                                .put(endpoints.updatePassword)
                                .send(data);
        response.should.have.status(401);
        response.text.should.equal('Authorization header is missing');
    });

    it(`Test case ${num++}: Updating the user password with an invalid authentication token should fail`, async () => {

        data.password=  faker.internet.password(8);

        const response = await chai.request(app)
                                .put(endpoints.updatePassword)
                                .set({ "Authorization": `Bearer ${faker.random.alpha(10)}` })
                                .send(data);
        response.should.have.status(401);
        response.text.should.equal('Invalid authentication token');
    });

    it(`Test case ${num++}: Updating the user password with a valid authentication token should pass`, async () => {

        data.password =  faker.internet.password(8);

        const response = await chai.request(app)
                                .put(endpoints.updatePassword)
                                .set({ "Authorization": `Bearer ${data.authToken}` })
                                .send({password: data.password});
        response.should.have.status(200);
        response.text.should.equal(`Password of the account with email ${data.email} has been updated`);
    });

    it(`Test case ${num++}: User login with the updated password should pass`, async () => {

        const response = await chai.request(app)
                                .post(endpoints.loginUser)
                                .send(data);        
        response.should.have.status(200);
        response.body.should.be.an('object').that.has.property('authToken')

        data.authToken = response.body.authToken;

    });

    it(`Test case ${num++}: Deleting the user account with a valid authentication token should pass`, async () => {

        const response = await chai.request(app)
                                .delete(endpoints.deleteAccount)
                                .set({ "Authorization": `Bearer ${data.authToken}` });
        response.should.have.status(200);
        response.text.should.equal(`Account with email ${data.email} has been deleted`);
    });

    it(`Test case ${num++}: User login after deleting the account should fail`, async () => {

        const response = await chai.request(app)
                                .post(endpoints.loginUser)
                                .send(data);        
        response.should.have.status(404);
        response.text.should.equal('User not found')

    });

});