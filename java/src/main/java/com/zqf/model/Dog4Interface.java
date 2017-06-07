package com.zqf.model;

/**
 * Created by james on 6/7/17.
 * 为演示GraphQL interface创建的实现实体
 *
 * blog: www.zhaiqianfeng.com
 */
public class Dog4Interface implements IAnimal {
    private String name;
    private int legs;

    public int getLegs() {
        return legs;
    }

    public void setLegs(int legs) {
        this.legs = legs;
    }

    @Override
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
