// advance/GraphiQL.js

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

//定义schema
var schema = buildSchema(`
    interface Animal{
        name: String!
    }
    type Dog implements Animal{
        name: String!
        legs: Int!
    }
    type Fish implements Animal{
        name: String!
        tailColor: String!
    }
    
    type Query {
        animal:Animal
    }
`);

var animals=[
    {
        name: 'dog',
        legs: 4
    },
    {
        name: 'fish',
        tailColor:'red'
    },
];

//定义服务端数据
var root= {
    animal: function () {
        return animals;
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, //启用GraphiQL
}));

app.listen(4000, () => console.log('请在浏览器中打开地址：localhost:4000/graphql'));