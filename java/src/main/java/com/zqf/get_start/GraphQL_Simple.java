package com.zqf.get_start;

import com.zqf.model.User;
import graphql.GraphQL;
import graphql.schema.GraphQLObjectType;
import graphql.schema.GraphQLSchema;

import java.util.Map;

import static graphql.Scalars.GraphQLString;
import static graphql.schema.GraphQLFieldDefinition.newFieldDefinition;
import static graphql.schema.GraphQLObjectType.newObject;

/**
 * Created by zhaiqianfeng on 6/7/17.
 * 使用resolver简单演示GraphQL api
 *
 * blog: www.zhaiqianfeng.com
 */
public class GraphQL_Simple {

    public static void main(String[] args) {
        //服务端示例数据
        User user=new User();
        user.setName("zhaiqianfeng");
        user.setSex("男");
        user.setIntro("博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3");

        //定义GraphQL类型
        GraphQLObjectType userType = newObject()
                .name("User")
                .field(newFieldDefinition().name("name").type(GraphQLString))
                .field(newFieldDefinition().name("sex").type(GraphQLString))
                .field(newFieldDefinition().name("intro").type(GraphQLString))
                .build();

        //定义暴露给客户端的查询query api
        GraphQLObjectType queryType = newObject()
                .name("userQuery")
                .field(newFieldDefinition().type(userType).name("user").staticValue(user))
                .build();

        //创建Schema
        GraphQLSchema schema = GraphQLSchema.newSchema()
                .query(queryType)
                .build();

        //测试输出
        GraphQL graphQL = GraphQL.newGraphQL(schema).build();
        Map<String, Object> result = graphQL.execute("{user{name,sex,intro}}").getData();
        System.out.println(result);
    }
}
