FROM python:3-alpine3.17

# RUN addgroup app && adduser -S -G app app

# USER app

WORKDIR /app

COPY package*.json ./
COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8080

CMD python ./main.py