To run the app, first clone the repository

```
git clone https://github.com/ziukristian/SGR_SentimentAnalysis.git
```

enter the directory 

```
cd SGR_SentimentAnalysis
```

open Docker Desktop

use docker-compose to build and run the app

```
docker-compose up --build
```

then browse to the app's [URL](http://localhost:3000)

```
http://localhost:3000
```

> [!IMPORTANT]  
> Sometimes the apis might run before the db and thus turn off, if that happens you can simply restart them manually from the docker desktop interface. A healthcheck in the compose file could be a possible fix to this.

> [!NOTE]  
> If I were to host this app on AWS I would use an ECS2 instance, it looked simple enough from what I've seen and the free tier is not that bad
