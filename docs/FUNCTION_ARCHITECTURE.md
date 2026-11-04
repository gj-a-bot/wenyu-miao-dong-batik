# 功能架构

## 路由结构

```
/                 首页
/patterns         纹样博物馆（筛选 + 搜索）
/patterns/[id]    纹样详情（收藏、工艺关联、相关作品）
/craft            工艺课堂索引
/craft/[id]       工艺步骤详情（前后步骤）
/studio           数字共创实验室（Canvas）
/gallery          作品展厅
/gallery/[id]     作品详情
/about            关于纹语
```

## 数据层

| 来源 | 文件 | 用途 |
|------|------|------|
| 纹样 | `src/data/patterns.json` | 博物馆列表与详情 |
| 工艺 | `src/data/craft.json` | 课堂步骤 |
| 展厅 | `src/data/gallery.json` | 演示作品 |
| 共创素材 | `src/data/studio-assets.ts` | SVG path 与预设 |

## 客户端存储

- `wenyu_pattern_favorites`：纹样 ID 列表
- `wenyu_studio_works`：共创保存记录（含 config 与可选 preview Data URL）

扩展点：`src/lib/storage.ts` → `storageApiExtension`

## 组件分层

- `components/layout`：全局 Header / Footer
- `components/home`：首页区块
- `components/patterns|craft|gallery|studio`：模块 UI
- `components/ui`：Button 等基础件

## 共创渲染管线

1. 用户调整 `StudioConfig`
2. `useEffect` 触发 `drawStudio`
3. 动态生成 SVG Blob → Image → Canvas 2D 平铺绘制
4. `toDataURL` 导出 PNG / 保存 localStorage

## AI 说明

规则预设：配色方案、排列方案。AI 按钮仅提示接口未配置，不伪造模型输出。
