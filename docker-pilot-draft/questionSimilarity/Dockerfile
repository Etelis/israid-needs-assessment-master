# Use the official AWS Lambda base image for Python 3.11
FROM huggingface/transformers-pytorch-cpu

# Set the working directory inside the Lambda function container
WORKDIR /var/task

# Copy the app.py and requirements.txt from the outer folder into the container
COPY . ./

# Install the required Python modules
RUN pip install -r requirements.txt

# Set runtime interface client as default command for the container runtime
ENTRYPOINT [ "python3", "-m", "awslambdaric" ]