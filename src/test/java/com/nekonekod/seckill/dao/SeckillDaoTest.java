package com.nekonekod.seckill.dao;

import com.nekonekod.seckill.entity.Seckill;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

import java.util.Date;
import java.util.List;

/**
 * Created by Nekonekod on 2016/8/8.
 * 配置spring和junit的整合，junit启动时加载spring的ioc容器
 * spring-test,junit
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class SeckillDaoTest {

    @Resource
    private SeckillDao seckillDao;

    @Test
    public void reduceNumber() throws Exception {
        Date date = new Date();
        int i = seckillDao.reduceNumber(1000, date);
        System.out.println(i);
    }

    @Test
    public void queryById() throws Exception {
        long id = 1000 ;
        System.out.println(seckillDao);
        Seckill seckill = seckillDao.queryById(id);
        System.out.println(seckill.getName());
        System.out.println(seckill);
    }

    @Test
    public void queryAll() throws Exception {
        List<Seckill> seckills = seckillDao.queryAll(1, 100);
        for (Seckill seckill:seckills) {
            System.out.println(seckill);
        }
    }

}