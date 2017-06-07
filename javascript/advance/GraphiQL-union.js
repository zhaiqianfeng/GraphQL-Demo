/**
 * Created by zhaiqianfeng on 6/5/17.
 * 演示GraphQL api如何使用联合(union)
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
    GraphQLInputObjectType,
    GraphQLUnionType
} = require('graphql');

//服务端示例数据
var animals=[
    {
        chinaName: '狗狗',
        legs: 4
    },
    {
        englishName: 'fish',
        tailColor:'red'
    },
];

//定义schema及resolver
const Dog = new GraphQLObjectType({
    name: 'Dog',
    description: '狗狗实体',
    fields: () => ({
        chinaName: {type: new GraphQLNonNull(GraphQLString)},
        legs: {type: new GraphQLNonNull(GraphQLInt)},
    }),
    isTypeOf:obj=>obj.legs,
});

const Fish=new GraphQLObjectType({
    name:'Fish',
    description:"鱼儿实体",
    fields: () => {
        return ({
            englishName: {type: new GraphQLNonNull(GraphQLString)},
            tailColor: {type: new GraphQLNonNull(GraphQLString)},
        });
    },
    isTypeOf:obj=>obj.tailColor,
});

const Animal = new GraphQLUnionType({
    name: 'Animal',
    description: 'Union',
    types:[Dog,Fish],
   resolveType:function (obj) {
        if(obj.legs) {
            return Dog;
        }else if(obj.tailColor){
            return Fish;
        }else{
            return null;
        }
    }
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