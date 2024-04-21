# 第一阶段：构建环境
# 使用带有 Node.js 的官方 Node 基础镜像
FROM node:14 as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json (如果可用)
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建应用，输出到 dist/
RUN npm run build

# 第二阶段：运行环境
# 使用 Nginx 官方镜像作为生产服务器
FROM nginx:stable-alpine as production-stage

# 从构建阶段复制构建好的代码到 Nginx 服务器目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 当容器启动时运行 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]
