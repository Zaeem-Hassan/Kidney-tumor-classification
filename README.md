# 🔬 Kidney Tumor Classification using Deep Learning

An end-to-end deep learning project for classifying kidney CT scan images as **Normal** or **Tumor** using VGG16 CNN architecture. The project includes a complete MLOps pipeline with DVC, MLflow experiment tracking, and CI/CD deployment on AWS.

---

## 🏗️ Project Architecture

```
Kidney-tumor-classification/
├── src/cnnClassifier/
│   ├── components/          # Core ML components
│   │   ├── data_ingestion.py
│   │   ├── prepare_base_model.py
│   │   ├── model_training.py
│   │   └── model_evaluation_mlflow.py
│   ├── config/              # Configuration manager
│   ├── entity/              # Data classes for configs
│   ├── pipeline/            # Training & prediction pipelines
│   │   ├── stage_01_data_ingestion.py
│   │   ├── stage_02_prepare_base_model.py
│   │   ├── stage_03_model_training.py
│   │   ├── stage_04_model_evaluation.py
│   │   └── prediction.py
│   ├── constants/           # Path constants
│   └── utils/               # Utility functions
├── config/config.yaml       # Project configuration
├── params.yaml              # Model hyperparameters
├── dvc.yaml                 # DVC pipeline definition
├── main.py                  # Full pipeline execution
├── app.py                   # Flask web application
├── Dockerfile               # Container configuration
├── .github/workflows/       # CI/CD pipeline
├── templates/               # Frontend HTML
├── static/                  # CSS & JavaScript
└── research/                # Jupyter notebooks
```

---

## 🧠 Model Details

| Parameter | Value |
|-----------|-------|
| **Architecture** | VGG16 (Transfer Learning) |
| **Input Size** | 224 × 224 × 3 |
| **Classes** | 2 (Normal, Tumor) |
| **Pre-trained Weights** | ImageNet |
| **Optimizer** | SGD (LR: 0.01) |
| **Batch Size** | 16 |
| **Augmentation** | Rotation, Flip, Shift, Shear, Zoom |

---

## 🔧 Tech Stack

- **Deep Learning**: TensorFlow / Keras
- **Experiment Tracking**: MLflow + DagsHub
- **Pipeline Orchestration**: DVC
- **Web Framework**: Flask
- **Frontend**: HTML, CSS, JavaScript
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Cloud**: AWS (ECR + EC2)

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Git
- Docker (optional, for containerized deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/Zaeem-Hassan/Kidney-tumor-classification.git
cd Kidney-tumor-classification

# Create virtual environment
python -m venv env
env\Scripts\activate  # Windows
# source env/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt
```

### Run the Pipeline

```bash
# Run full training pipeline
python main.py

# Or run individual stages with DVC
dvc repro
```

### Run the Web App

```bash
python app.py
```
Open `http://localhost:8080` in your browser.

---

## 🌐 Web Application Features

- 📤 **Upload CT Scan** — Drag & drop or browse kidney CT scan images
- 🔍 **AI Analysis** — Get instant Normal/Tumor classification
- ⚙️ **Retrain Model** — Trigger model retraining from the UI
- 📱 **Responsive Design** — Works on desktop and mobile

---

## 📊 MLflow Experiment Tracking

Experiments are tracked on DagsHub:

```bash
# Set environment variables
set MLFLOW_TRACKING_URI=https://dagshub.com/Zaeem-Hassan/Kidney-tumor-classification.mlflow
set MLFLOW_TRACKING_USERNAME=Zaeem-Hassan
set MLFLOW_TRACKING_PASSWORD=<your_dagshub_token>
```

---

## 🔄 DVC Pipeline

The ML pipeline is managed with DVC:

```
data_ingestion → prepare_base_model → training → evaluation
```

```bash
# Reproduce the pipeline
dvc repro

# Visualize the DAG
dvc dag
```

---

## 🐳 Docker Deployment

```bash
# Build the Docker image
docker build -t kidney-tumor-classifier .

# Run the container
docker run -d -p 8080:8080 kidney-tumor-classifier
```

---

## ☁️ AWS CI/CD Deployment

The project uses GitHub Actions for automated CI/CD:

1. **Continuous Integration** — Code linting and tests
2. **Continuous Delivery** — Docker build & push to AWS ECR
3. **Continuous Deployment** — Pull & run on EC2 (self-hosted runner)

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS IAM access key |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key |
| `AWS_REGION` | AWS region (e.g., `us-east-1`) |
| `ECR_REPOSITORY_NAME` | ECR repository name |
| `AWS_ECR_LOGIN_URI` | ECR login URI |

### AWS Setup

1. **ECR** — Create a repository for Docker images
2. **EC2** — Launch an Ubuntu instance with Docker installed
3. **Self-hosted Runner** — Configure GitHub Actions runner on EC2
4. **IAM** — Create user with ECR access permissions

---

## 📁 Configuration

### `config/config.yaml`
Defines paths for data ingestion, model storage, and training artifacts.

### `params.yaml`
```yaml
AUGMENTATION: True
IMAGE_SIZE: [224, 224, 3]
BATCH_SIZE: 16
INCLUDE_TOP: False
EPOCHS: 1
CLASSES: 2
WEIGHTS: imagenet
LEARNING_RATE: 0.01
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Zaeem Hassan**
- GitHub: [@Zaeem-Hassan](https://github.com/Zaeem-Hassan)
- Email: zaeemhassan2004@gmail.com