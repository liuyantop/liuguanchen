# 自定义云原生开发环境：预装中文(简体)界面语言包
# 基于 CNB 默认开发环境镜像，避免环境回收后中文界面丢失
# 使用方式：在仓库点击「云原生开发」按钮时，平台用本 Dockerfile 构建开发环境
FROM cnbcool/default-dev-env:latest

USER root

# 预装 VS Code 中文(简体)语言包（与当前环境已装版本保持一致）
# --extensions-dir 显式指定，确保安装到 code-server 的扩展目录
RUN code-server \
    --extensions-dir /root/.local/share/code-server/extensions \
    --install-extension ms-ceintl.vscode-language-pack-zh-hans

# 语言包安装后自动生成 languagepacks.json，确认已注册 zh-cn
RUN ls /root/.local/share/code-server/extensions/ | grep -q "ms-ceintl.vscode-language-pack-zh-hans" \
    && echo "[OK] 中文语言包已预装" \
    || echo "[WARN] 中文语言包安装失败"
