FROM node:22-slim

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

# ARG PORT
# ARG MONGO_URI
# ARG JWT_SECRET

# ENV PORT=$PORT
# ENV MONGO_URI=$MONGO_URI
# ENV JWT_SECRET=$JWT_SECRET

EXPOSE 4000

CMD ["npm", "run", "dev"]
