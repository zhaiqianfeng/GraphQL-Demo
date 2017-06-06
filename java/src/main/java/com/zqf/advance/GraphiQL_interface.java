package com.zqf.advance;

/**
 * Created by james on 6/6/17.
 */
public class GraphiQL_interface {
    public static void main(String[] args) {
        /*Dog4Interface dog=new Dog4Interface();
        dog.setName("dog");
        dog.setLegs(4);

        Fish4Interface fish=new Fish4Interface();
        fish.setName("fish");
        fish.setTailColor("red");

        Animal[] anmials={dog,fish};


        //定义接口类型
        GraphQLInterfaceType animalInterface = newInterface()
                .name("Animal")
                .description("动物接口")
                .field(newFieldDefinition()
                        .name("name")
                        .type(GraphQLString))
                .typeResolver(env -> {
                    if(env.getObject() instanceof Dog4Interface){
                        return dogType;
                    }if(env.getObject() instanceof Fish4Interface){
                        return fishType;
                    }
                    return  null;
                })
                .build();


        //定义Dog实体
        GraphQLObjectType dogType = newObject()
                .name("Dog4Union")
                .withInterface(animalInterface)
                .field(newFieldDefinition().name("name").type(GraphQLString))
                .field(newFieldDefinition().name("legs").type(GraphQLInt))
                .build();

        //定义Fish实体
        GraphQLObjectType fishType = newObject()
                .name("Fish4Union")
                .withInterface(animalInterface)
                .field(newFieldDefinition().name("name").type(GraphQLString))
                .field(newFieldDefinition().name("tailColor").type(GraphQLString))
                .build();

        DataFetcher<Animal[]> animalsDataFetcher = environment -> {
            return anmials;
        };
        //定义查询query
        GraphQLObjectType queryType = newObject()
                .name("animalQuery")
                .field(newFieldDefinition()
                        .type(new GraphQLList(animalInterface))
                        .name("animals")
                        .dataFetcher(animalsDataFetcher))
                .build();

        GraphQLSchema schema = GraphQLSchema.newSchema()
                .query(queryType)
                .build();

        GraphQL graphQL = GraphQL.newGraphQL(schema).build();

        //查询用户列表
        Map<String, Object> result = graphQL.execute("{users{name,sex,intro}}").getData();
        System.out.println(result);*/
    }
}
