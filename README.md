# Console ES

## Quick start:
```javascript
require('console-es')({
  host: 'es上报地址',
  application: '应用名称',
  index: '日志"文件"名称'
})

console.es({'Type': 'Error', 'Code': '502', 'Details': 'Node.js heap out of memory'})
```

## PS
0. 引用此库后，请用console.es代替console.log，console.es会将日志内容上报到es平台
1. console.es参数请传入json类型，kibana会智能解析所有上报的字段
2. 初始化时的host参数请向管理员咨询
3. 本库支持向多个es节点上报，落地到代码就是用hosts代替host且hosts是一个数组类型