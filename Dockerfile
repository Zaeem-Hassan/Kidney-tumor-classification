FROM python:3.10-slim

RUN apt update -y && apt install -y \
    awscli \
    gcc \
    g++ \
    gfortran \
    libopenblas-dev \
    liblapack-dev \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY requirements.txt /app/
COPY setup.py /app/
COPY README.md /app/
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . /app

CMD ["python3", "app.py"]