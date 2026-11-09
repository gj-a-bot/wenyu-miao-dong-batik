# 纹语 WENYU — 原始材料与审核清单

> 机器可读明细：`research/materials/exports/materials_manifest.csv`（SHA256）  
> 迁移摘要：`research/materials/exports/migration_summary.json`

## 一、原始资料存放位置

| 区域 | 路径 | Git |
|------|------|-----|
| 归档原件 | `research/materials/raw/{excel,docx,images,videos,svg}/` | **禁止提交**（`.gitignore`） |
| 本地历史副本 | `public/收集材料/`（若仍存在） | **禁止提交** |
| 审核台账 | `research/materials/media-review/` | 可提交（不含二进制） |
| 导出清单 | `research/materials/exports/` | 可提交 |
| 文化档案草案 | `src/data/patterns.archive.json` | 可提交 |
| 十二工序草案 | `src/data/craft.miao-12.json` | 可提交 |

## 二、公开 vs 研究用途

### 仅供研究、禁止公开推送

- 纹样 Excel、工艺 Word/txt、非遗汇编、工具图集、工艺 MP4  
- `research/materials/raw/` 下全部 PNG/SVG（含「获授权」标注者，须先过审）  
- `public/收集材料/` 内任何文件（脱 Git 跟踪后亦不得再 push）

### 网站当前公开素材（与本清单关系）

- 现站纹样/工艺/展厅使用 `public/images/`、`public/videos/`、`src/data/patterns.json`（9 条实验纹样）等**既有资源**，与 `patterns.archive.json` **未挂钩**。  
- **未经审核的档案图、SVG、网络搜集 PNG 不得放入 public。**

### 待审核后可择优公开

| 类别 | 数量 | 台账 |
|------|------|------|
| 团队整理蜡染 PNG | 23 | `pattern-image-review.csv` |
| 网络搜集纹样 PNG | 45 | 同上（统一暂不公开） |
| 文件夹标注获授权 SVG | 8 | `svg-review.csv` |

## 三、图片审核状态（PNG）

- 台账：`research/materials/media-review/pattern-image-review.csv`（68 行）  
- 档案配图字段：`patterns.archive.json` 中 `image: null`，`imageStatus` 均为 `image_pending`（凤凰纹备注含百度检索时为 `restricted`）  
- **禁止**仅凭文件名绑定 15 条文化档案

## 四、SVG 授权状态

- 台账：`research/materials/media-review/svg-review.csv`（8 行）  
- 来源目录名：`网站收集获授权的SVG纹样素材` — **仅文件夹标注**，无随附授权文书  
- 授权范围、改作、商用、署名：**留空 / 待确认**  
- **未审核前不得**复制到 `public/` 或 Studio 线上资源

## 五、数据草案与原始资料对应

| 数据文件 | 主要依据（raw 内） |
|----------|---------------------|
| `patterns.archive.json`（15 条） | `raw/excel/苗侗蜡染纹样资料表 (1).xlsx` |
| `craft.miao-12.json`（12 工序） | `raw/docx/…分步操作说明书.docx`（审计摘录 `research/_audit_*.txt`）；参数来自说明书表2 |
| `pattern-image-review.csv` | `raw/images/*.png` |
| `svg-review.csv` | `raw/svg/*.svg` |

### 纹样核验字段（整改后）

- `sourceStatus`：文化来源（`needs_review` / `source_pending` 等，**无 automatic `verified`**）  
- `imageStatus`：配图（`image_pending` / `restricted` 等）  
- `verificationStatus`：**兼容旧字段**，由上述二者派生  
- 「豆」标记 → `needsReviewMarkers` + `notes`，不升级为 `verified`

## 六、SHA256 与迁移

- 84 个文件自 `public/收集材料` 复制至 `raw/`，`all_sha256_match: true`（见 `migration_summary.json`）

## 七、Git 与历史清理（方案 A，已执行）

- 已使用 `git filter-repo --path public/收集材料 --invert-paths` 自**本地重写的 main 历史**中移除该目录全部 blob。  
- 原 commit `6d3bd65`（收集材料）等已不在当前历史中。  
- **远程**须配合 `git push origin main --force-with-lease` 后，新克隆方才不会从 GitHub 拉取旧二进制（fork/缓存可能仍短期保留旧对象）。  
- 协作者须 **重新 clone** 或在确认无未推送工作后 `git fetch && git reset --hard origin/main`。

## 八、更新记录

- 2026-11-09：首批迁移与清单  
- 2026-11-09：验收整改 — 分离 `sourceStatus`/`imageStatus`、工序表2参数、SVG 台账、本文档扩写
