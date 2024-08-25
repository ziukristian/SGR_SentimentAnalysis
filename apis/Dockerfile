FROM python:3.9-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

ENV DATABASE_URL=postgresql://user:password@db:5432/dbname

CMD ["python", "api.py"]
