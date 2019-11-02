const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;

describe('/api/director tests',()=> {
    before((done)=>{
        chai.request(server)
            .post('/authenticate')
            .send({username:'testuser', password:'12345'})
            .end((err,res)=>{
                token = res.body.token;
                done();
            });
    });
    describe('/GET directors', ()=> {
        it('Burada Tüm Yönetmenler Gösterilecek', (done)=>{
            chai.request(server)
                .get('/api/directors/directors')
                .set('x-access-token', token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/POST director', ()=>{
        it('Burada Yönetmen Eklenecek', (done)=> {
            const director = {
                bio: 'this is great director',
                nameandsurname: 'Cristopher Nolan',
            };
            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token',token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nameandsurname');
                    res.body.should.have.property('bio');
                    directorId = res.body._id;
                    done();
                });
        });
    });
    describe('/GET director', ()=>{
        it('Burada id ile yönetmen aranacak', (done)=> {
            chai.request(server)
                .get('/api/directors/'+ directorId)
                .set('x-access-token',token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe('PUT/: director_id', ()=>{
        it('Burada Yönetmen güncellenecek', (done)=> {
            const director = {
                bio: 'asdawd',
                nameandsurname: 'tarantino',
            };
            chai.request(server)
                .put('/api/directors/' + directorId)
                .send(director)
                .set('x-access-token',token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nameandsurname').eql(director.nameandsurname);
                    res.body.should.have.property('bio').eql(director.bio);
                    done();
                    directorId = res.body._id;
                });
        });
    });
    describe('/DELETE/:director_id', () => {
		it('Buradan director Silinecek', (done) => {
			chai.request(server)
				.delete('/api/directors/'+ directorId)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('Yönetmen Silindi'); //dönen datada status adında property olmalı ve değeri 1 olmalı
					done();
				});
		});
    });
});