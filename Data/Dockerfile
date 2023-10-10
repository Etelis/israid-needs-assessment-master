# Install the app dependencies in a full Node docker image
FROM python:3.9-slim
USER root
WORKDIR /application

EXPOSE 8080/tcp
COPY requirements.txt .
RUN pip install -r requirements.txt
# Copy package.json, and optionally package-lock.json if it exists
COPY . .


CMD ["python", "run_api.py"]