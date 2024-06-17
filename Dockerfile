FROM python:latest
LABEL authors="intron014"
LABEL version="1.0.0"
LABEL description="Check dat well-known"

COPY requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app

EXPOSE 8009

CMD ["gunicorn", "--bind", "0.0.0.0:8009", "--log-level", "DEBUG", "-w", "4", "app:app"]