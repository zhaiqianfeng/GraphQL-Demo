package com.zqf.advance;

import com.zqf.model.Dog;
import com.zqf.model.Fish;
import graphql.GraphQL;
import graphql.schema.GraphQLList;
import graphql.schema.GraphQLObjectType;
import graphql.schema.GraphQLSchema;
import graphql.schema.GraphQLUnionType;

import java.util.Map;

import static graphql.Scalars.GraphQLInt;
import static graphql.Scalars.GraphQLString;
import static graphql.schema.GraphQLFieldDefinition.newFieldDefinition;
import static graphql.schema.GraphQLObjectType.newObject;
import static graphql.schema.GraphQLUnionType.newUnionType;

/**
 * Created by james on 6/6/17.
 */
public class GraphiQL_union {
    public static void main(String[] args) {
        Dog dog=new Dog();
        dog.setName("dog");
        dog.setLegs(4);

        Fish fish=new Fish();
        fish.setName("fish");
        fish.setTailColor("red");

        Object[] anmials={dog,fish};

        //定义Dog实体
        GraphQLObjectType dogType = newObject()
                .name("Dog")
                .field(newFieldDefinition().name("name").type(GraphQLString))
                .field(newFieldDefinition().name("legs").type(GraphQLInt))
                .build();

        //定义Fish实体
        GraphQLObjectType fishType = newObject()
                .name("Fish")
                .field(newFieldDefinition().name("name").type(GraphQLString))
                .field(newFieldDefinition().name("tailColor").type(GraphQLString))
                .build();

        //定义接口类型
        GraphQLUnionType animalUnion = newUnionType()
                .name("Animal")
                .possibleType(dogType)
                .possibleType(fishType)
                .description("动物联合")
                .typeResolver(env -> {
                    if(env.getObject() instanceof Dog){
                        return dogType;
                    }if(env.getObject() instanceof Fish){
                        return fishType;
                    }
                    return  null;
                })
                .build();


        //定义查询query
        GraphQLObjectType queryType = newObject()
                .name("animalQuery")
                .field(newFieldDefinition()
                        .type(new GraphQLList(animalUnion))
                        .name("animals")
                        .dataFetcher(evn -> {
                            return anmials;
                        }))
                .build();

        GraphQLSchema schema = GraphQLSchema.newSchema()
                .query(queryType)
                .build();

        GraphQL graphQL = GraphQL.newGraphQL(schema).build();

        //查询动物列表
        Map<String, Object> result = graphQL.execute("{animals{... on Dog{name,legs} ... on Fish{name,tailColor}}}").getData();
        System.out.println(result);
    }
}
