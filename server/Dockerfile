FROM python:3.11.4
WORKDIR /app
# COPY package*.json ./
COPY requirements.txt /app
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8080
CMD python ./main.py