import { EggPlugin } from 'egg';

const plugins: EggPlugin = {
    logrotator: false, // disable when use @midwayjs/logger
    static: false,
    jwt: {
        enable: true,
        package: 'egg-jwt',
    },
};

export default plugins;
