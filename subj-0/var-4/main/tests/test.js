// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.use(require('chai-json-schema'));
chai.should();

let schema = {
    title: 'Student schema',
    type: 'object',
    required: ['name', 'year', 'credits', 'superpowers', 'grades'],
    properties: {
        name: {
            type: 'string'
        },
        year: {
            type: 'number'
        },
        credits: {
            type: 'number'
        },
        superpowers: {
            type: 'array',
            minItems: 3,
            items: {
                type: "string"
            }
        },
        grades: {
            type: 'array',
            minItems: 2,
            items: {
                type: 'object',
                required: ['class', 'homeworkSubmitted', 'examGrade'],
                properties: {
                    class: {
                        type: 'string'
                    },
                    homeworkSubmitted: {
                        type: 'boolean'
                    },
                    examGrade: {
                        type: 'number'
                    }
                }
            }
        }
    }
}

describe("JSON", () => {
    describe("GET /student.json", () => {
        it('should return a valid json', (done) => {
            chai.request(app)
                 .get('/student.json')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     chai.assert.jsonSchema(res.body, schema)
                     done();
                  });
        })
    })
});