package com.zqf.advance;

/**
 * Created by james on 6/6/17.
 */
public class GraphiQL_interface {
    public static void main(String[] args) {
/*
        //定义接口类型
        GraphQLInterfaceType animalInterface = newInterface()
                .name("Animal")
                .description("动物接口")
                .field(newFieldDefinition()
                        .name("name")
                        .type(GraphQLString))
                .typeResolver(new TypeResolver() {
                    @Override
                    public GraphQLObjectType getType(TypeResolutionEnvironment env) {
                        if(env.getObject() instanceof Dog){
                            return dogType;
                        }if(env.getObject() instanceof Fish){
                            return fishType;
                        }
                        return  null;
                    }
                })
                .build();


        //定义Dog实体
        GraphQLObjectType dogType = newObject()
                .name("Dog")
                .withInterface(animalInterface)
                .field(newFieldDefinition().name("name").type(GraphQLString))
                .field(newFieldDefinition().name("legs").type(GraphQLInt))
                .build();

        //定义Fish实体
        GraphQLObjectType fishType = newObject()
                .name("Fish")
                .withInterface(animalInterface)
                .field(newFieldDefinition().name("name").type(GraphQLString))
                .field(newFieldDefinition().name("tailColor").type(GraphQLString))
                .build();

        DataFetcher<User> userByIdDataFetcher = environment -> {
            int id=environment.getArgument("id");
            return users[id];
        };
        DataFetcher<animalInterface[]> animalsDataFetcher = environment -> {
            return users;
        };
        //定义查询query
        GraphQLObjectType queryType = newObject()
                .name("animalQuery")
                .field(newFieldDefinition()
                        .type(new GraphQLList(animalInterface))
                        .name("animals")
                        .dataFetcher(usersDataFetcher))
                .build();

        GraphQLSchema schema = GraphQLSchema.newSchema()
                .query(queryType)
                .build();

        GraphQL graphQL = GraphQL.newGraphQL(schema).build();

        //查询用户列表
        result = graphQL.execute("{users{name,sex,intro}}").getData();
        System.out.println(result);*/
    }
}
