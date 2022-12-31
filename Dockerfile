# Pull Docker Hub base image
FROM node:16-alpine
# Set working directory
WORKDIR /app
RUN npm install -g http-server
# Install app dependencies
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
# Run the "dev" script in package.json
CMD ["http-server", "dist"]