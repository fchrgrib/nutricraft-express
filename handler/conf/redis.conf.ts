export  const RedisConf = ()=>{
    const _redis = require('redis')
    return _redis.createClient({
        url: process.env.DATABASE_URL_REDIS
    })
}