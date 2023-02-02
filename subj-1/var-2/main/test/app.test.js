let assert = require('assert')

describe('distance', function(){
	let Bird = require('../app').Bird
	let Penguin = require('../app').Penguin
	it('creates a penguin and it inherits bird', function(){
		let p1 = new Penguin('peng')
		assert.equal(p1 instanceof Penguin && p1 instanceof Bird, true)
	})
	it('creates a penguin and it makes a nest', function(){
		let p1 = new Penguin('peng')
		assert.equal(p1.makeNest(), 'peng makes a nest')
	})
	it('throws an exception', function(){
		assert.throws(() => new Penguin(), {message : 'CreationError'})
	})
	it('creates a penguin and it swims', function(){
		let p1 = new Penguin('peng')
		assert.equal(p1.swim(100), 'peng swims 100')
	})
	it('creates a penguin and it does not fly', function(){
		let p1 = new Penguin('peng')
		assert.equal(p1.fly(100), 'peng is a penguin and cannot fly')
	})
})