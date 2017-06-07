package com.zqf.model;

/**
 * Created by james on 6/7/17.
 * 为演示GraphQL interface创建的实现实体
 *
 * blog: www.zhaiqianfeng.com
 */
public class Fish4Interface implements IAnimal {
    private String tailColor;
    private String name;

    public String getTailColor() {
        return tailColor;
    }

    public void setTailColor(String tailColor) {
        this.tailColor = tailColor;
    }

    @Override
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}