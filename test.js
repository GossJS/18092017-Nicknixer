process.env.NODE_ENV = 'test';

const chai = require('chai'),
      chaiHttp = require('chai-http'),
      server = require('./server'),
      should = chai.should();

chai.use(chaiHttp);

let operations = ['add', 'substract', 'multiply', 'divide', 'pow'];

operations.forEach((item)=>{
    describe(`${item} operations`, () => {
        for(let i = -3; i < 3; ++i) {
            let symbol = '';
            let result = 0;

            switch (item) {
                case 'add':
                    symbol = '+';
                    result = i + i;
                    break;
                case 'subtract':
                    symbol = '-';
                    result = i - i;
                    break;
                case 'multiply':
                    symbol = '*';
                    result = i * i;
                    break;
                case 'divide':
                    symbol = '/';
                    result = i / i;
                    break;
                case 'pow':
                    symbol = '**';
                    result = i ** i;
                    break;
            }
    
            let resultString = `${i} ${symbol} ${i} = ${result}`;

            it(`${i} ${symbol} ${i} operation`, done => {
                chai.request(server)
                .get(`/${item}/${i}/${i}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.be.eql(resultString);
                    done();
                });  
            });    
        }
    });
});
