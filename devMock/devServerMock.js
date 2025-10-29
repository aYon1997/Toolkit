/**
 * DevServer Mock 中间件
 * 在 webpack-dev-server 层面拦截请求并返回 Mock 数据
 */

const fs = require('fs')
const path = require('path')

// 配置
const config = {
  // Mock 文件根目录
  mockRoot: path.join(__dirname, '../../mock'),
  
  // URL 匹配规则（只有匹配的 URL 才会尝试使用 Mock）
  urlPatterns: [
    /^\/dev-api\//,
    /^\/prod-api\//,
    /^\/api\//
  ],
  
  // 路径映射规则（动态参数）
  pathMappings: [
    { pattern: /\/(\d+)$/, replacement: '/_id' },
    { pattern: /\/(\d+)\//, replacement: '/_id/' },
    { pattern: /\/([a-f0-9-]{36})$/, replacement: '/_uuid' },
    { pattern: /\/([a-f0-9-]{36})\//, replacement: '/_uuid/' }
  ],
  
  // 日志配置
  log: {
    enabled: true,
    prefix: '[Mock]'
  }
}

/**
 * 检查是否应该使用 Mock
 */
function shouldMock(url) {
  // 检查环境变量
  const enableMock = process.env.VUE_APP_NETWORK_MOCK === 'true'
  if (!enableMock) {
    return false
  }
  
  if (config.urlPatterns.length === 0) {
    return true
  }
  return config.urlPatterns.some(pattern => pattern.test(url))
}

/**
 * 将 URL 转换为 Mock 文件路径
 * 支持 HTTP 方法后缀，例如：
 * - GET /dev-api/auth/logout -> auth-logout.json 或 auth-logout.get.json
 * - DELETE /dev-api/auth/logout -> auth-logout.delete.json
 */
function urlToMockPath(url, method = 'GET') {
  // 移除查询参数
  let path = url.split('?')[0]
  
  // 移除开头的斜杠
  if (path.startsWith('/')) {
    path = path.substring(1)
  }
  
  // 移除 API 前缀（dev-api, prod-api 等）
  path = path.replace(/^(dev-api|prod-api|api)\//, '')
  
  // 将路径中的斜杠替换为短横线
  path = path.replace(/\//g, '-')
  
  // 应用路径映射规则（动态参数替换）
  config.pathMappings.forEach(({ pattern, replacement }) => {
    path = path.replace(pattern, replacement)
  })
  
  // 返回多个可能的路径（按优先级）
  const methodLower = method.toLowerCase()
  const paths = []
  
  // 1. 优先：带 HTTP 方法后缀的文件（如 auth-logout.delete.json）
  paths.push(`${path}.${methodLower}.json`)
  
  // 2. 回退：不带方法后缀的文件（如 auth-logout.json）
  paths.push(`${path}.json`)
  
  return paths
}

/**
 * 读取 Mock 文件
 * @param {string|string[]} mockPath - Mock 文件路径或路径数组
 * @returns {object|null} - Mock 数据和使用的路径
 */
function readMockFile(mockPath) {
  const paths = Array.isArray(mockPath) ? mockPath : [mockPath]
  
  for (const p of paths) {
    const fullPath = path.join(config.mockRoot, p)
    
    try {
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        const data = JSON.parse(content)
        return { data, path: p }
      }
    } catch (error) {
      console.error(`${config.log.prefix} 读取 Mock 文件失败: ${p}`, error.message)
    }
  }
  
  return null
}

/**
 * 日志输出
 */
function log(message, color = '\x1b[36m') {
  if (config.log.enabled) {
    const reset = '\x1b[0m'
    console.log(`${color}${config.log.prefix}${reset} ${message}`)
  }
}

/**
 * DevServer Mock 中间件
 */
function mockMiddleware(app) {
  // 检查是否启用 Mock
  const enableMock = process.env.VUE_APP_NETWORK_MOCK === 'true'
  
  if (!enableMock) {
    log('Mock 未启用 (VUE_APP_NETWORK_MOCK !== true)', '\x1b[33m')
    return
  }
  
  log('Mock 系统已启用', '\x1b[32m')
  log(`Mock 文件根目录: ${config.mockRoot}`, '\x1b[36m')
  
  // 拦截所有请求
  app.use((req, res, next) => {
    const url = req.url.split('?')[0] // 移除查询参数用于匹配
    const method = req.method
    
    // 检查是否应该使用 Mock
    if (!shouldMock(url)) {
      return next()
    }
    
    // 获取 Mock 文件路径（可能有多个候选）
    const mockPaths = urlToMockPath(url, method)
    
    // 读取 Mock 文件
    const result = readMockFile(mockPaths)
    
    if (result) {
      // 找到 Mock 数据
      log(`${method} ${req.url} → ${result.path}`, '\x1b[32m')
      
      // 返回 Mock 数据
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('X-Mock-By', 'DevServer')
      res.setHeader('X-Mock-File', result.path)
      res.status(200).json(result.data)
    } else {
      // 没有找到 Mock 文件，继续到真实后端
      log(`${method} ${req.url} → 未找到 Mock（尝试: ${mockPaths.join(', ')}），使用真实接口`, '\x1b[33m')
      next()
    }
  })
}

module.exports = mockMiddleware

