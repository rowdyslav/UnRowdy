FROM python:3.13

WORKDIR /app

COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 80

# CMD ["flet", "run", "--web", "-p", "80", "-d", "-r", "main.py"]
CMD ["fastapi", "dev", "--host", "0.0.0.0", "--port", "80", "--reload"]
