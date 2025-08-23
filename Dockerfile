FROM node:22-alpine

RUN apk update && apk upgrade && apk add --no-cache libc6-compat && apk cache clean
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
EXPOSE 3000

ENV NODE_ENV=development
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

CMD ["npm", "run", "dev"]
