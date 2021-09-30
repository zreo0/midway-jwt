import { Provide } from '@midwayjs/decorator';
import { ServiceResponse } from '../interface';

/** 用户信息 */
export interface userInfo {
    /** 登录账号 */
    userName: string;
    /** 登录密码 */
    password: string;
    /** 用户昵称 */
    userNick: string;
    /** 用户身份id */
    userId: string;
}

@Provide()
export class UserService {
    /**
     * 获取用户信息
     * @author friday
     * @date 2021-09-30 22:11:14
     * @param {string} userName 用户名
     * @returns {*}  {Promise<ServiceResponse<userInfo>>}
     * @memberof UserService
     */
    async getUserLoginInfo(userName: string): Promise<ServiceResponse<userInfo>> {
        const userInfo: userInfo = {
            userName: 'name',
            password: 'pwd',
            userNick: 'hello',
            userId: '1',
        };
        return {
            success: true,
            data: userInfo,
        };
    }
}
