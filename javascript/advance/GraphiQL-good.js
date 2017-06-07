/**
 * Created by zhaiqianfeng on 6/5/17.
 * 演示如何传参数(argument)来调用GraphQL api
 *
 * blog: www.zhaiqianfeng.com
 */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql');

//服务端示例数据
var users=[
    {
        name: "zhaiqiafneng",
        sex: '男',
        intro: '博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3',
        skills: ['Linux','Java','nodeJs','前端'],
        stature:180
    },
    {
        name: 'James',
        sex: '男',
        intro: 'zhaiqianfeng的英文名',
        skills: ['Linux','Java','nodeJs','前端'],
        stature:180
    },
];

//定义schema及resolver
const Unit=new GraphQLEnumType({
    name:'Unit',
    description:"单位",
    values: {
        MM: {value: 'MM'},
        cm: {value: 'cm'},
        mm: {value: 'mm'},
    }
});

const User=new GraphQLObjectType({
    name:'User',
    description:"用户信息实体",
    fields: () => {
        return ({
            name: {type: new GraphQLNonNull(GraphQLString)},
            sex: {type: new GraphQLNonNull(GraphQLString)},
            intro: {type: new GraphQLNonNull(GraphQLString)},
            skills: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))},
            stature: {
                type: GraphQLFloat,
                args: {
                    unit: {type: Unit}
                },
                resolve: function (user, {unit}) {
                    if (unit == 'MM') {
                        return user.stature/100;
                    } if (unit == 'cm') {
                        return user.stature;
                    }else if (unit == 'mm') {
                        return user.stature*10;
                    }
                }
            },
        });
    },
});
const  UserInput=new GraphQLInputObjectType({
    name:'UserInput',
    description:"用户信息Input实体",
    fields:()=>({
        name:{type:new GraphQLNonNull(GraphQLString)},
        sex:{type:new GraphQLNonNull(GraphQLString)},
        intro:{type:new GraphQLNonNull(GraphQLString)},
        skills:{type:new GraphQLNonNull(new GraphQLList(GraphQLString))},
        stature:{type:Unit},
    }),
});
const Query=new GraphQLObjectType({
    name:'UserQuery',
    description:'用户信息查询',
    fields:()=>({
        user:{
            type:User,
            description:'根据id查询单个用户',
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve:function (source,{id}) {
                return users[id];
            }
        },
        users:{
            type:new GraphQLList(User),
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
            args: {
                name:{type: new GraphQLNonNull(GraphQLString)},
                sex:{type: new GraphQLNonNull(GraphQLString)},
                intro:{type: new GraphQLNonNull(GraphQLString)},
                skills:{type:new GraphQLList(new GraphQLNonNull(GraphQLString))}
            },
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
        },
        addUserByInput:{
            type:User,
            description:'通过Input添加用户',
            args: {
                userInfo:{type: UserInput},
            },
            resolve:function (source,{userInfo}) {
                console.log(userInfo);
                var user={
                    name:userInfo.name,
                    sex:userInfo.sex,
                    intro:userInfo.intro,
                    skills:userInfo.skills
                };
                users.push(user);
                return user;
            }
        }
    }),
});
const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, //启用GraphiQL
}));

app.listen(4000, () => console.log('请在浏览器中打开地址：localhost:4000/graphql'));