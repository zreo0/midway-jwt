/** service方法响应 */
export interface ServiceResponse<T> {
    /** 是否返回正确逻辑 */
    success: boolean;
    /** 解释信息 */
    message?: string;
    /** 需要返回的数据 */
    data?: T;
}

/** api响应 */
export interface ApiResponse<T> {
    /** 状态码，成功为200 */
    code: number;
    /** 相应主体 */
    body?: T | any;
    /** 提示信息 */
    message?: string;
}
