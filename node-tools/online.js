const { NodeSSH } = require("node-ssh");
const path = require("path");
const config = require("../online.config");
const serverConfig = config.server;
const Client = new NodeSSH();
const args = process.argv.slice(2)[0];

const ERROR_LEVEL = {
    'client-authentication': '密码错误',
    'client-timeout': '连接超时啦'
}

async function uploadFile() {
    Client.connect({
        host: serverConfig.host,
        username: serverConfig.user,
        password: serverConfig.password,
        port: serverConfig.port
    })
    .then(async () => {
        console.log('连接成功！');
        await Client.execCommand(`cd .. && rm -rf dist_bak`, {
            cwd: serverConfig.path
        });
        console.log('删除老备份文件...');
        await Client.execCommand(`cd .. && cp rf ${serverConfig.path} dist_bak`, {
            cwd: serverConfig.path
        });
        console.log('制作一个备份...');
        await Client.putDirectory(
            path.resolve(__dirname, `../${serverConfig.local}`),
            `${serverConfig.path}`,
            {
                recursive: true
            }
        )
        console.log('替换文件成功!');
        process.exit(0);
    })
    .catch(err=> {
        console.log('操作失败：', ERROR_LEVEL[err.level]);
        process.exit(1);
    })
}

function main() {
    if (args === 'upload') {
        uploadFile();
        return;
    }
}
main();