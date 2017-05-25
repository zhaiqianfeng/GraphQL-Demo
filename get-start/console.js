// get-start/console.js

var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
    user:User
  },
  type User{
    name:String
    intro:String
  }
`);

var root = {
    hello: 'Hello world!',
    user:{
        name:'james',
        intro:'This is a intro!'
    }
};

graphql(schema, '{ hello,user{name} }', root).then((response) => {
    console.log(response);
});