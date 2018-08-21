const response = require('koa2-response');
const bodyparser = require('koa-bodyparser');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const cors = require('koa2-cors');

module.exports = (app) => {
    app.use(response);

    app.use(bodyparser({
        enableTypes: ['json', 'form', 'text'],
        multipart: true,
    }));

    app.use(session({
        store: redisStore({
            host: "redis-test",
            port: 6379,
        })
    }));

    //cors解决跨域
    app.use(cors({
        origin: ctx => ctx.request.header.origin,
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }));

    //统一未捕获错误的处理
    app.use(async (ctx, next) => {
        try {
            ctx.set('Access-Control-Allow-Credentials', true);
            ctx.set('Access-Control-Allow-Origin', '*');
            await next();
        } catch (err) {
            console.error(new Date() + 'utc');
            console.error(err);

            logger.error(err.message, JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))));

            ctx.body = Object.assign(
                ctx.body || {},
                { data: {}, status: { code: 3001, message: err.message } },
            );
            ctx.status = err.status || 500;
        }
    });

    return async (ctx, next) => {
        await next();
    }
}