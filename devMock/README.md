# Mock 数据文件说明

## 目录结构

Mock 数据文件采用**扁平结构**，移除 API 前缀（`dev-api`、`prod-api`），URL 路径中的 `/` 替换为 `-`：

```
mock/
├── README.md
├── login.json                    # POST /dev-api/login
├── getInfo.json                  # GET /dev-api/getInfo
├── getRouters.json               # GET /dev-api/getRouters
├── captchaImage.json             # GET /dev-api/captchaImage
├── auth-logout.delete.json       # DELETE /dev-api/auth/logout
├── auth-logout.post.json         # POST /dev-api/auth/logout
├── system-user-list.json         # GET /dev-api/system/user/list
├── system-user-_id.json          # GET /dev-api/system/user/123
├── system-user-_id.delete.json   # DELETE /dev-api/system/user/123
└── system-user-add.json          # POST /dev-api/system/user/add
```

**命名规则：**
1. 移除 API 前缀（`dev-api/`、`prod-api/`、`api/`）
2. 将路径中的 `/` 替换为 `-`
3. 可选添加 HTTP 方法后缀（如 `.delete.json`、`.post.json`）

**示例：**
- `/dev-api/login` → `login.json`
- `/dev-api/auth/logout` → `auth-logout.json`
- `DELETE /dev-api/auth/logout` → `auth-logout.delete.json`
- `/dev-api/system/user/list` → `system-user-list.json`

## 文件格式

### 简单格式

直接返回响应数据：

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "id": 1,
    "name": "张三"
  }
}
```

### 完整格式

包含完整的 HTTP 响应信息：

```json
{
  "status": 200,
  "statusText": "OK",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer mock-token"
  },
  "data": {
    "code": 200,
    "msg": "操作成功",
    "data": {
      "id": 1,
      "name": "张三"
    }
  }
}
```

## URL 映射规则

### 静态路径

URL: `GET /dev-api/system/user/list`
→ Mock 文件: `system-user-list.json`

### HTTP 方法区分（推荐）

同一个 URL 的不同 HTTP 方法可以使用不同的 Mock 文件：

| 请求 | Mock 文件 | 说明 |
|------|----------|------|
| `DELETE /dev-api/auth/logout` | `auth-logout.delete.json` | 优先匹配 |
| `POST /dev-api/auth/logout` | `auth-logout.post.json` | 优先匹配 |
| `GET /dev-api/auth/logout` | `auth-logout.json` | 回退匹配（无方法后缀） |

**匹配优先级：**
1. 优先：带 HTTP 方法后缀的文件（如 `.delete.json`）
2. 回退：不带方法后缀的文件（如 `.json`）

**支持的方法后缀：**
- `.get.json` - GET 请求
- `.post.json` - POST 请求
- `.put.json` - PUT 请求
- `.delete.json` - DELETE 请求
- `.patch.json` - PATCH 请求

### 动态参数（数字 ID）

URL: `GET /dev-api/system/user/123`
→ 尝试: `system-user-123.json`
→ 回退: `system-user-_id.json`

也可以带方法后缀：
→ 优先: `system-user-_id.get.json`
→ 回退: `system-user-_id.json`

### 动态参数（UUID）

URL: `GET /dev-api/system/user/abc-123`
→ 尝试: `system-user-abc-123.json`
→ 回退: `system-user-_uuid.json`

## 使用说明

1. **创建 Mock 文件**：在 `mock/` 目录下创建 `.json` 文件
2. **填写响应数据**：使用简单格式或完整格式
3. **启动应用**：`npm run dev:mock`
4. **查看效果**：打开 Network 面板，查看请求和响应

## 注意事项

1. **文件必须是有效的 JSON 格式**，否则会加载失败
2. **如果 Mock 文件不存在**，请求会自动转发到真实后端
3. **Mock 文件路径区分大小写**（取决于操作系统）
4. **动态参数优先匹配具体值**，然后才回退到通配符（如 `_id.json`）

## 快速开始

1. 复制示例文件作为模板
2. 根据实际接口修改响应数据
3. 刷新页面测试

## 调试技巧

- 查看服务端控制台（终端），查看 `[Mock]` 日志
- 检查 Mock 文件路径是否正确
- 验证 JSON 格式是否有效
- 确认环境变量 `VUE_APP_NETWORK_MOCK=true`

