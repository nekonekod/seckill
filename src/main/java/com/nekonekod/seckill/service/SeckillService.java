package com.nekonekod.seckill.service;

import com.nekonekod.seckill.dto.Exposer;
import com.nekonekod.seckill.dto.SeckillExecution;
import com.nekonekod.seckill.entity.Seckill;
import com.nekonekod.seckill.exception.RepeatKillException;
import com.nekonekod.seckill.exception.SeckillCloseException;
import com.nekonekod.seckill.exception.SeckillException;

import java.util.List;

/**
 * 业务接口：站在"使用者"角度设计接口
 * 三个方面：方法定义粒度，参数，返回类型（return 类型/异常）
 * Created by Nekonekod on 2016/8/8.
 */
public interface SeckillService {

    /**
     * 查询所有秒杀记录
     *
     * @return
     */
    List<Seckill> getSeckillList();

    /**
     * 查询单个秒杀记录
     *
     * @param seckillId
     * @return
     */
    Seckill getById(long seckillId);

    /**
     * 秒杀开启是输出秒杀接口地址
     * 否则输出系统时间和秒杀时间
     *
     * @param seckillId
     */
    Exposer exportSeckillUrl(long seckillId);

    /**
     * 执行秒杀
     * @param seckillId
     * @param userPhone
     * @param md5
     */
    SeckillExecution executeSeckill(long seckillId, long userPhone, String md5)
        throws RepeatKillException,SeckillCloseException,SeckillException;

}
