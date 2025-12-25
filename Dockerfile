# Use Node.js LTS image
FROM node:18-alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

WORKDIR /app

# Install dependencies
COPY package*.json ./

ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm ci; \
        else npm ci --only=production; \
        fi

# Copy app source
COPY . ./

# Expose the port your server runs on
ENV PORT=7000
EXPOSE $PORT

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:$PORT/ || exit 1

# Start the server
CMD ["npm", "start"]