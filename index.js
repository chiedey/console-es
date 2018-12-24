/**
 * Dependencies: elasticsearch
 * Quick start:
 *   require('/path/to/es.js')({
 *     host: 'es上报地址',
 *     application: '应用名称',
 *     index: '日志"文件"名称'
 *   })
 *
 *   console.es({'Type': 'Error', 'Code': '502', 'Details': 'Node.js heap out of memory'})
 *
 * PS:
 *   0. 引用此库后，请用console.es代替console.log，console.es会将日志内容上报到es平台
 *   1. console.es参数请传入json类型，kibana会智能解析所有上报的字段
 *   2. 初始化时的host参数请向管理员咨询
 *   3. 本库支持向多个es节点上报，落地到代码就是用hosts代替host且hosts是一个数组类型
 *
 * Author: Mason(wengqidi@wps.cn)
 *   Date: 2018-12-24
 */

// 引入ES依赖
const es = require('elasticsearch')

// 抛出构造函数
module.exports = (opts = {}) => {
  // 参数准备
  const hosts = opts.hosts || [opts.host || 'localhost:9200']
  const defaults = {
    application: opts.application || process.env.npm_package_name,
    environment: opts.environment || process.env.NODE_ENV || 'local'
  }

  // 实例化ES
  const client = new es.Client({hosts})

  // 往console注入es
  console.__proto__.es = log => {
    // 日志标准输出到控制台
    console.log(JSON.stringify(log))

    const body = Object.assign({date: new Date().toISOString()}, defaults, log)

    client.index({
      index: opts.index || 'wps4intl',
      type: 'info',
      body
    }, err => {
      if (err) console.log(err)
    })
  }
}
