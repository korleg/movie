const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');


chai.use(chaiHttp);
 
let token, movieId;

describe('/api/movies tests', ()=>{
    before((done)=>{
        chai.request(server)
            .post('/authenticate')
            .send({ username:'testuser', password: '12345'})
            .end((err,res)=>{
                token = res.body.token;
                done();
            });
    });
    describe('/GET movies', () => {
		it('it should GET all the movies', (done) => {
			chai.request(server)
				.get('/api/movies')
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
    });
    describe('/POST movie', () => {
		it('Buradan Film Eklenecek', (done) => {
			const movie = {
				title: 'Udemy',
				director_id: '5a34e1afb8523a78631f8540',
				category: 'Komedi',
				country: 'Türkiye',
				year: 1950,
                imdb: 8,
                URI:'sfawds'
			};

			chai.request(server)
				.post('/api/movies')
				.send(movie)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('title');
					res.body.should.have.property('director_id');
					res.body.should.have.property('category');
					res.body.should.have.property('country');
					res.body.should.have.property('year');
					res.body.should.have.property('imdb');
					movieId = res.body._id;
					done();
				});
		});
    });
    describe('/GET/:movie_id movie', () => {
		it('it should GET a movie by the given id', (done) => {
			chai.request(server)
				.get('/api/movies/' + movieId)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('title');
					res.body.should.have.property('director_id');
					res.body.should.have.property('category');
					res.body.should.have.property('country');
					res.body.should.have.property('year');
					res.body.should.have.property('imdb');
					res.body.should.have.property('_id').eql(movieId);
					done();
				});
		});
    });
    describe('/PUT/:movie_id', () => {
		it('Buradan Film Güncellenecek', (done) => {
			const movie = {
				title: '93 creative',
				director_id: '5a34e1afb8523a78631f8542',
				category: 'suç',
				country: 'fransa',
				year: 1970,
                imdb: 9,
                URI:'www.google.com'
			};

			chai.request(server)
				.put('/api/movies/'+ movieId)
				.send(movie)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('title').eql(movie.title);
					res.body.should.have.property('director_id').eql(movie.director_id);
					res.body.should.have.property('category').eql(movie.category);
					res.body.should.have.property('country').eql(movie.country);
					res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb').eql(movie.imdb);
                    
					done();
				});
		});
    });
    describe('/DELETE/:movie_id', () => {
		it('Buradan Film Silinecek', (done) => {
			chai.request(server)
				.delete('/api/movies/'+ movieId)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql(1); //dönen datada status adında property olmalı ve değeri 1 olmalı
					done();
				});
		});
    });
});

