FROM node:16-alpine as builder
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm i -g pnpm 
RUN pnpm i
COPY . .
RUN pnpm run frontendmentor:build

FROM nginx:stable-alpine
COPY --from=builder /app/dist/apps/frontendmentor /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
