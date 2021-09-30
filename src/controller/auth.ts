import {
    Body,
    Controller,
    Post,
    Provide,
    Inject,
    Plugin,
    Config,
    Headers,
} from '@midwayjs/decorator';

import { UserService } from '../service/user';

@Provide()
@Controller('/auth')
export class AuthController {
    @Config('jwt')
    jwtConfig;
    @Plugin()
    jwt: any;

    @Inject()
    userService: UserService;

    @Post('/login')
    /**
     * 登录方法，获取 token
     * @author friday
     * @date 2021-09-30 22:13:14
     * @param {string} userName 用户名
     * @param {string} password 用户密码
     * @returns {*}
     * @memberof AuthController
     */
    async login(@Body() userName: string, @Body() password: string) {
        const { success, data: userInfo } =
            await this.userService.getUserLoginInfo(userName);
        if (success) {
            // 检查登录信息
            if (password === userInfo.password) {
                // 生成token
                const token = this.jwt.sign(
                    { userName },
                    this.jwtConfig.secret
                );
                return {
                    code: 200,
                    message: '登录成功',
                    body: {
                        token: token,
                    },
                };
            } else {
                return {
                    code: 403,
                    message: '登录失败，密码错误。',
                };
            }
        } else {
            return {
                code: 403,
                message: '用户不存在',
            };
        }
    }

    @Post('/user')
    /**
     * 获取用户信息
     * @author friday
     * @date 2021-09-30 22:14:17
     * @param {string} headerAuth Header 中的 Authorization 信息
     * @returns {*}
     * @memberof AuthController
     */
    async getUserInfo(@Headers('Authorization') headerAuth: string) {
        const token = headerAuth?.replace('Bearer ', '') || '';
        // 从token解析userName
        const { userName } = this.jwt.verify(token);
        // 获取用户信息
        const userInfo = await this.userService.getUserLoginInfo(userName);
        return {
            code: 200,
            body: userInfo,
        };
    }
}
