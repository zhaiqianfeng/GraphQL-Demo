package com.zqf.model;

/**
 * Created by james on 6/6/17.
 * 为演示GraphQL union创建的实体
 *
 * blog: www.zhaiqianfeng.com
 */
public class Dog4Union {
    private String name;
    private int legs;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLegs() {
        return legs;
    }

    public void setLegs(int legs) {
        this.legs = legs;
    }
}
