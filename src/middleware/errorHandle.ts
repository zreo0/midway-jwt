import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';

@Provide()
export class ErrorHandleMiddleware implements IWebMiddleware {
    resolve() {
        return async (ctx: Context, next: IMidwayWebNext) => {
            try {
                await next();
            } catch (err) {
                console.log('Error:', err);
                if (err.name === 'UnauthorizedError') {
                    ctx.body = {
                        code: 401,
                        message: '登录失效，请重新登录。'
                    };
                } else {
                    ctx.body = {
                        code: 500,
                        message: '系统异常'
                    };
                }
            }
        };
    }
}
