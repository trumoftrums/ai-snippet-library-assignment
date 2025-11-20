## How to install app

### 1. Step 1: Preparation informations
+ Local MongoDB server or Mongo Atlas
+ OpenAI secrect key

### 2. Step 2: Copy env.example to .env and fill in the required environment variables:

```bash
MONGODB_URI=mongodb_uri
OPENAI_API_KEY="sk-proj-xxxxxx"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Step 3: Install dependences:
Run the below command
```bash
npm install
```
### 4. Step 4: Run the development server:

```bash
npm run dev
```

## Additional Features(If I has more time)
- Streaming AI responses
- Global loading overlay when calling api
- Implement the ai-transform endpoint as a Cloudflare Worker