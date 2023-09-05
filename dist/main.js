"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require("dotenv/config");
const redis_1 = require("./redis");
const http_exceptions_filter_1 = require("./common/exceptions/http.exceptions.filter");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.urlencoded)({ extended: true }));
    app.useGlobalFilters(new http_exceptions_filter_1.HttpExceptionFilter());
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    redis_1.redis.init();
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map