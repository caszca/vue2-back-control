//情感分析

const { default: Client, GetSaChGeneralRequest } = require('@alicloud/alinlp20200629');
const { Config } = require('@alicloud/openapi-client');

async function main() {

    let config = new Config({
        // 您的AccessKey ID
        accessKeyId: 'LTAI5tLnk5WgVHpzsjSehket',
        // 您的AccessKey Secret
        accessKeySecret: 'your AccessKey Secret',
        // 访问的区域
        regionId: 'cn-hangzhou',
        endpoint: 'alinlp.cn-hangzhou.aliyuncs.com'
    });
    const client = new Client(config);
    const request = new GetSaChGeneralRequest({
        serviceCode: "alinlp",
        text: '今天心情不好'
    });
    const resp = await client.getSaChGeneral(request);
    console.log(resp.body)
}

main()
