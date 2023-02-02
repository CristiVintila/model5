let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('authors', () => {
	describe('/POST authors', () => {
		before((done) => {
			chai.request(server)
				.get('/create')
				.send()
				.end((err, res) => {
					res.should.have.status(201)
					should.exist(res.body)
					res.body.should.have.property('message').eql('created')
					done()
				})			
		})
		it('it should get all authors listing', (done) => {
			chai.request(server)
				.get('/authors')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(10)
					done()
				})
		})
		// it('it should get authors on page 1', (done) => {
		// 	chai.request(server)
		// 		.get('/authors?pageNo=1')
		// 		.end((err, res) => {
		// 			res.should.have.status(200)
		// 			should.exist(res.body)
		// 			res.body.should.be.a('array')
		// 			res.body.length.should.be.eql(5)
		// 			done()
		// 		})
		// })
		it('first author on page 1 should be the 6th record', (done) => {
			chai.request(server)
				.get('/authors?pageNo=1')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					res.body.should.be.a('array')
					res.body[0].id.should.be.eql(6)
					done()
				})
		})
		it('it should get authors on page 2 with a pageSize of 3', (done) => {
			chai.request(server)
				.get('/authors?pageNo=2&pageSize=3')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(3)
					res.body[0].id.should.be.eql(7)					
					done()
				})
		})
		it('it should return the list of all authors for invalid pages and page sizes', (done) => {
			chai.request(server)
				.get('/authors?pageNo=a&pageSize=n')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(10)
					done()
				})
		})
		it('it should return an empty list for too large pages and page sizes', (done) => {
			chai.request(server)
				.get('/authors?pageNo=1000&pageSize=1000')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(0)
					done()
				})
		})
	})
})

