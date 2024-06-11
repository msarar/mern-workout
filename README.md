Create .env file: backend/.env
add the following:
```
PORT=4000
MONGO_URL=<mongo_url_from_atlas>
JSW_SECRET=<random_secret>
```

To run using docker:
from root directory of repo run ``` docker compose up --build -d ```

to run without docker (from root of repo):
```
cd backend
npm install
npm run dev
```

```
cd frontend
npm install
npm start
```
