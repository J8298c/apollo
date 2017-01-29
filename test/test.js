const chai = require('chai');
const should = chair.should();
const mongoose = require('mongoose');



//========================================//
/* Get Route Testing */

it('should return all existings users', function(){
    let res;
    return chai.request(app)
        .get('/users')
        .then(function(_res){
            res = res;
            res.should.have.status(200);

            res.body.users.should.have.length.of.at.least(1);
            return Users.count();
        })
        .then(function(count){
        res.body.users.should.have.length.of(count)
        });
});
