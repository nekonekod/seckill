package com.nekonekod.seckill.exception;

/**
 * 秒杀关闭异常
 * Created by Nekonekod on 2016/8/8.
 */
public class SeckillCloseException extends SeckillException {

    public SeckillCloseException(String message) {
        super(message);
    }

    public SeckillCloseException(String message, Throwable cause) {
        super(message, cause);
    }
}
