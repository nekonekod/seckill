package com.nekonekod.seckill.dao;

import com.nekonekod.seckill.entity.SuccessKilled;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

/**
 * Created by Nekonekod on 2016/8/8.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class SuccessKillDaoTest {

    @Resource
    private SuccessKillDao successKillDao;

    @Test
    public void insertSuccessKilled() throws Exception {
        long id = 1000 ;
        long userPhone = 1245678901 ;
        SuccessKilled successKilled = successKillDao.queryByIdWithSeckill(id, userPhone);
        System.out.println(successKilled);
        System.out.println(successKilled.getSeckill());
    }

    @Test
    public void queryByIdWithSeckill() throws Exception {
        int affect = successKillDao.insertSuccessKilled(1001L, 12345678901L);
        System.out.println(affect);
    }

}