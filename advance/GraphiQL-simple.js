// get-start/GraphiQL.js

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

//定义schema
var schema = buildSchema(`
    type User{
        name: String!
        sex: String
        intro: String
        skills: [String]!
    }
    input UserInput {
        name: String!
        sex: String
        intro: String
        skills: [String]!
    }
    type Query {
        user(id:Int!):User
        users:[User]
    }
    type Mutation{
        addUser(name:String!,sex:String,intro:String,skills:[String]!):User
        addUserByInput(userInfo:UserInput!):User
    }
`);

var users=[
    {
        name: 'zhaiqianfeng',
        sex: '男',
        intro: '博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3',
        skills: ['Linux','Java','nodeJs','前端'],
    },
    {
        name: 'James',
        sex: '男',
        intro: 'zhaiqianfeng的英文名',
        skills: ['Linux','Java','nodeJs','前端'],
    },
];

//定义服务端数据
var root= {
    user: function ({id}) {
        return users[id];
    },
    users: function () {
        return users;
    },
    addUser:function({name,sex,intro,skills}){
        var user={
            name:name,
            sex:sex,
            intro:intro,
            skills:skills
        };
        users.push(user);
        return user;
    },
    addUserByInput:function({userInfo}){
        var user={
            name:userInfo.name,
            sex:userInfo.sex,
            intro:userInfo.intro,
            skills:userInfo.skills
        };
        users.push(user);
        return user;
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, //启用GraphiQL
}));

app.listen(4000, () => console.log('请在浏览器中打开地址：localhost:4000/graphql'));