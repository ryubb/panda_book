# ベースイメージを指定
FROM node:10.12

# 環境変数設定
ENV NODE_ENV="development"

# 作業ディレクトリ作成&設定
WORKDIR /src
# COPY package.json ./
# COPY yarn.lock ./
# COPY node_modules ./
# RUN npm install
# CMD ["npm", "start"]
