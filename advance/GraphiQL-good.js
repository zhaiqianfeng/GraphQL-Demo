// get-start/GraphiQL.js

var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
    GraphQLList,
    GraphQLObjectType,
    buildSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLInterfaceType
} = require('graphql');

var users=[
    {
        name: 'zhaiqianfeng',
        sex: '男',
        intro: '博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3',
        skills: ['Linux','Java','nodeJs','前端']
    },
    {
        name: 'James',
        sex: '男',
        intro: 'zhaiqianfeng的英文名',
        skills: ['Linux','Java','nodeJs','前端']
    },
];

//定义schema
const User=new GraphQLObjectType({
    name:'User',
    description:"用户信息实体",
    fields:()=>({
        name:{type:new GraphQLNonNull(GraphQLString)},
        sex:{type:new GraphQLNonNull(GraphQLString)},
        intro:{type:new GraphQLNonNull(GraphQLString)},
        skills:{type:new GraphQLNonNull(new GraphQLList(GraphQLString))},
    }),
});
const Query=new GraphQLObjectType({
    name:'UserQuery',
    description:'用户信息查询',
    fields:()=>({
        user:{
            type:User,
            description:'根据id查询单个用户',
            resolve:function (source,{id}) {
                return users[id];
            }
        },
        users:{
            type:[User],
            description:'查询全部用户列表',
            resolve:function () {
                return users;
            }
        }
    }),
});
const Mutation=new GraphQLObjectType({
    name:'UserMutation',
    description:'用户信息维护',
    fields:()=>({
        addUser:{
            type:User,
            description:'添加用户',
            resolve:function (source,{name,sex,intro,skills}) {
                var user={
                    name:name,
                    sex:sex,
                    intro:intro,
                    skills:skills
                };
                users.push(user);
                return user;
            }
        }
    }),
});
var schema = buildSchema({
    query:Query,
    mutation:Mutation
});

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, //启用GraphiQL
}));

app.listen(4000, () => console.log('请在浏览器中打开地址：localhost:4000/graphql'));