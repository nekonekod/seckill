package com.nekonekod.seckill.exception;

/**
 * 秒杀相关异常
 * Created by Nekonekod on 2016/8/8.
 */
public class SeckillException extends RuntimeException{

    public SeckillException(String message) {
        super(message);
    }

    public SeckillException(String message, Throwable cause) {
        super(message, cause);
    }
}
