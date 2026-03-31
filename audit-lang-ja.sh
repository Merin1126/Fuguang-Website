#!/usr/bin/env bash
set -euo pipefail

# ==========================================================
# 日文 lang="ja" 语义标注审计脚本
# 作用：
# 1) 扫描 HTML 中出现平假名/片假名的行
# 2) 输出“疑似漏标 lang=ja”的行，便于人工复核
#
# 用法：
#   ./audit-lang-ja.sh
#   ./audit-lang-ja.sh /path/to/project
#   ./audit-lang-ja.sh --strict
#   ./audit-lang-ja.sh --strict /path/to/project
# ==========================================================

STRICT_MODE=0
TARGET_DIR="."

for arg in "$@"; do
    case "$arg" in
        --strict)
            STRICT_MODE=1
            ;;
        *)
            TARGET_DIR="$arg"
            ;;
    esac
done

if [[ ! -d "$TARGET_DIR" ]]; then
    echo "错误：目录不存在 -> $TARGET_DIR"
    exit 1
fi

# 日文假名范围（平假名 + 片假名 + 长音符）
JA_KANA_PATTERN='[ぁ-んァ-ンー]'

# 只扫描 html，忽略常见依赖目录和 git 目录
# 自动选择扫描引擎：优先 rg，缺失时降级到 grep
SEARCH_ENGINE="grep"
if command -v rg >/dev/null 2>&1; then
    SEARCH_ENGINE="rg"
fi

scan_all_matches() {
    if [[ "$SEARCH_ENGINE" == "rg" ]]; then
        rg -n --no-heading \
            --glob '*.html' \
            --glob '!**/.git/**' \
            --glob '!**/node_modules/**' \
            --glob '!**/dist/**' \
            --glob '!**/build/**' \
            "$JA_KANA_PATTERN" "$TARGET_DIR" || true
    else
        grep -R -n -I -E \
            --include='*.html' \
            --exclude-dir='.git' \
            --exclude-dir='node_modules' \
            --exclude-dir='dist' \
            --exclude-dir='build' \
            "$JA_KANA_PATTERN" "$TARGET_DIR" || true
    fi
}

# 1) 全部命中：所有含日文假名的 HTML 行
ALL_MATCHES="$(scan_all_matches)"

# 2) 疑似漏标：
#    从全部命中中排除这些“已处理或非目标”的行：
#    - 已有 lang="ja"
#    - ruby / rt 标签（你项目里 ruby 已单独处理）
#    - HTML 注释行
SUSPECTED="$(printf '%s\n' "$ALL_MATCHES" | grep -E -v 'lang="ja"|<ruby|<rt>|<!--' || true)"

count_lines() {
    local content="$1"
    if [[ -z "$content" ]]; then
        echo 0
    else
        printf '%s\n' "$content" | wc -l | tr -d ' '
    fi
}

ALL_COUNT="$(count_lines "$ALL_MATCHES")"
SUSPECTED_COUNT="$(count_lines "$SUSPECTED")"

echo "========================================="
echo "lang=ja 审计报告"
echo "目标目录: $TARGET_DIR"
echo "扫描引擎: $SEARCH_ENGINE"
echo "========================================="
echo
echo "【全部日文命中】共 $ALL_COUNT 条"
if [[ -n "$ALL_MATCHES" ]]; then
    printf '%s\n' "$ALL_MATCHES"
else
    echo "(无)"
fi

echo
echo "-----------------------------------------"
echo "【疑似漏标 lang=\"ja\"】共 $SUSPECTED_COUNT 条"
echo "说明：此区为启发式结果，请人工最终确认。"
echo "-----------------------------------------"
if [[ -n "$SUSPECTED" ]]; then
    printf '%s\n' "$SUSPECTED"
else
    echo "(无)"
fi

echo
if [[ "$STRICT_MODE" -eq 1 && "$SUSPECTED_COUNT" -gt 0 ]]; then
    echo "严格模式：检测到疑似漏标，返回非 0 退出码。"
    exit 2
fi

echo "审计完成。"
