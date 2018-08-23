const response = require('koa2-response');
const bodyparser = require('koa-bodyparser');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const cors = require('koa2-cors');
const { redisConf } = require('../config/database')

module.exports = ({ app, redisConfig: { host: redisHost, port: redisPort } = redisConf, serviceName, port }) => {

    if (!serviceName || !port) throw new Error("parameter serviceName and port are required.");

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

    app.use(response);

    app.use(bodyparser({
        enableTypes: ['json', 'form', 'text'],
        multipart: true,
    }));

    app.use(session({
        store: redisStore({
            host: redisHost,
            port: redisPort,
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

    //uac认证
    app.use(async (ctx, next) => {
        if ([`${serviceName}:${port}`, 'localhost:3014', '127.0.0.1:3014'].includes(ctx.host) || (ctx.session && ctx.session.user)) {
            await next();
        } else {
            ctx.error(3002, "UAC");
        }
    });

    app.on('error', (err, ctx) => {
        console.error('server error', err, ctx);
    });

    return async (ctx, next) => {
        await next();
    }
}