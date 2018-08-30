## nodejs各服务的一些重复代码封装

### 暴露对象 {CommonMiddleware,EurekaClient,API,services}
- `CommonMiddleware`:KOA中间件，封装使用了一些项目中通用的中间件
- `EurekaClient` : 用于注册服务中心和获取服务中心句柄的对象
- `API`: 提供业务服务的overlay网络调用地址(修改注册Eureka后抛弃)
- `services`:提供业务服务的名称和信息键值对

### CommonMiddleware
调用方式：`CommonMiddleware(options object)`，将会自动添加公用中间件

options配置：
- app:koa对象，必传
- serviceName:服务名,可以理解为appName，必传

### EurekaClient
EurekaClient对象包含两部分
```
module.exports = {
    registrEureka,
    client
}
```
`client`:object,提供一个getServerByAppName获取其它服务的实例，此操作应发生在registrEureka之后，具体见registrEureka说明
`registrEureka(serviceName,port)`:function，向注册中心注册服务，serviceName是服务名，port是服务端口。registrEureka为异步操作，完成后才会对client对象赋值，故使用client.getServerByAppName方法需要在实际操作发生时。

### API
略

### services
略

