/**
 * Created by zhaiqianfeng on 6/5/17.
 * 演示GraphQL api如何使用接口(interface)
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

//定义schema及resolver
const Animal = new GraphQLInterfaceType({
    name: 'Animal',
    description: '接口',
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
    }),
   /* resolveType:function (obj) {
        if(obj.legs) {
            return Dog;
        }else if(obj.tailColor){
            return Fish;
        }else{
            return null;
        }
    }*/
});

const Dog = new GraphQLObjectType({
    name: 'Dog',
    interfaces: [Animal],
    description: '狗狗实体',
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        legs: {type: new GraphQLNonNull(GraphQLInt)},
    }),
    isTypeOf:obj=>obj.legs,
});

const Fish=new GraphQLObjectType({
    name:'Fish',
    interfaces:[Animal],
    description:"鱼儿实体",
    fields: () => {
        return ({
            name: {type: new GraphQLNonNull(GraphQLString)},
            tailColor: {type: new GraphQLNonNull(GraphQLString)},
        });
    },
    isTypeOf:obj=>obj.tailColor,
});
const Query=new GraphQLObjectType({
    name:'AnimalQuery',
    description:'动物信息查询',
    fields:()=>({
        animals:{
            type:new GraphQLList(Animal),
            description:'查询全部动物列表',
            resolve:function () {
                return animals;
            }
        },
        animalSearch:{
            type:Animal,
            args: {
                text: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve:function (source,{text}) {
                if (text == 'dog') {
                    return animals[0];
                }else{
                    return animals[1];
                }
            }
        }
    }),
});
const schema = new GraphQLSchema({
    types: [Dog, Fish,Animal],
    query: Query
});

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, //启用GraphiQL
}));

app.listen(4000, () => console.log('请在浏览器中打开地址：localhost:4000/graphql'));