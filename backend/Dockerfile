# Step 1: Base image (OS & Python)
FROM python:3.12-slim

# Step 2: Working directory
WORKDIR /app

# Step 3: Create and activate Python virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Step 4: Copy dependency list and install dependencies inside venv
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Step 5: Copy rest of app into container
COPY . .

# Step 6: Expose port
EXPOSE 5000

# Step 7: Environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Step 8: Command to run the application
#CMD ["flask", "run"]
CMD ["python", "app.py"]
