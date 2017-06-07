package com.zqf.advance;

import com.zqf.model.User;
import graphql.GraphQL;
import graphql.schema.*;

import java.util.Map;

import static graphql.Scalars.GraphQLInt;
import static graphql.Scalars.GraphQLString;
import static graphql.schema.GraphQLArgument.newArgument;
import static graphql.schema.GraphQLFieldDefinition.newFieldDefinition;
import static graphql.schema.GraphQLInputObjectField.newInputObjectField;
import static graphql.schema.GraphQLInputObjectType.newInputObject;
import static graphql.schema.GraphQLObjectType.newObject;

/**
 * Created by zhaiqianfeng on 6/7/17.
 * 演示如何传参数(argument)来调用GraphQL api
 *
 * blog: www.zhaiqianfeng.com
 */
public class GraphQL_argument {
    public static void main(String[] args) {
        //服务端示例数据
        User user0=new User();
        user0.setName("zhaiqianfeng");
        user0.setSex("男");
        user0.setIntro("博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3");

        User user1=new User();
        user1.setName("zhaiqianfeng");
        user1.setSex("男");
        user1.setIntro("博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3");

        User[] users={user0,user1};

        //定义GraphQL类型
        GraphQLObjectType userType = newObject()//定义User类型
                .name("User")
                .field(newFieldDefinition().name("name").type(GraphQLString))
                .field(newFieldDefinition().name("sex").type(GraphQLString))
                .field(newFieldDefinition().name("intro").type(GraphQLString))
                .field(newFieldDefinition().name("skills").type(new GraphQLList(GraphQLString)))
                .build();

        GraphQLInputType userInput = newInputObject()//定于输入类型
                .name("UserInput")
                .field(newInputObjectField().name("name").type(GraphQLString))
                .field(newInputObjectField().name("sex").type(GraphQLString))
                .field(newInputObjectField().name("intro").type(GraphQLString))
                .field(newInputObjectField().name("skills").type(new GraphQLList(GraphQLString)))
                .build();

        GraphQLObjectType queryType = newObject()//定义暴露给客户端的查询query api
                .name("userQuery")
                .field(newFieldDefinition()
                        .type(userType)
                        .name("user")
                        .argument(newArgument()
                                .name("id")
                                .type(new GraphQLNonNull(GraphQLInt)))
                        .dataFetcher(environment -> {
                            int id=environment.getArgument("id");
                            return users[id];
                        }))
                .field(newFieldDefinition()
                        .type(new GraphQLList(userType))
                        .name("users")
                        .dataFetcher(evn -> {
                            return users;
                        }))
                .build();

        //创建Schema
        GraphQLSchema schema = GraphQLSchema.newSchema()
                .query(queryType)
                .build();

        //测试输出
        GraphQL graphQL = GraphQL.newGraphQL(schema).build();

        //根据Id查询用户
        Map<String, Object> result = graphQL.execute("{user(id:0){name,sex,intro}}").getData();
        System.out.println(result);

        //查询用户列表
        result = graphQL.execute("{users{name,sex,intro}}").getData();
        System.out.println(result);
    }
}
