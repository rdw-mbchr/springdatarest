# Magasin de Voitures - Full Stack
## Spring Boot + React.js + PostgreSQL + Spring AI + Docker

### Prérequis
- Docker Desktop installé et démarré
- Git installé

---

### Lancer le projet (3 commandes seulement)

#### 1. Cloner le projet
```bash
git clone https://github.com/rdw-mbchr/springdatarest.git
cd springdatarest
```

#### 2. Lancer tous les services
```bash
docker-compose up -d --build
```

#### 3. Installer le modèle IA (une seule fois)
```bash
docker exec ollama ollama pull mistral
```

---

### URLs d'accès

| Service | URL |
|---------|-----|
| Frontend React | http://localhost:3001 |
| Backend API | http://localhost:8081 |
| Swagger UI | http://localhost:8081/swagger-ui.html |
| Spring Data REST | http://localhost:8081/api |

---

### Identifiants de test

| Champ | Valeur |
|-------|--------|
| Username | admin |
| Password | admin123 |

---

### Fonctionnalités

- Gestion complète des voitures (CRUD)
- Authentification JWT (login/register)
- Authentification Google OAuth2
- Assistant IA conseiller (Mistral via Ollama)
- Description automatique des voitures par IA
- Recommandation par budget via IA
- Analyse du stock pour la direction
- Documentation Swagger UI
- Base de données PostgreSQL dans Docker

---

### Arrêter le projet

```bash
docker-compose down
```

---

## Déploiement Kubernetes (Lab 2)

### Architecture
- 1 Pod PostgreSQL (1 replica) avec PersistentVolume
- 1 Pod Spring Boot (3 replicas)
- 1 Service NodePort pour exposer l'application
- ConfigMap et Secrets pour la configuration

### Prérequis
- Docker Desktop
- Minikube
- kubectl

### Lancer l'environnement

#### 1. Démarrer Minikube
```bash
minikube start
minikube docker-env | Invoke-Expression  # Windows PowerShell
```

#### 2. Builder l'image Docker
```bash
cd SpringDataRest
.\mvnw.cmd clean install -DskipTests
docker build -t springdatarest:1.0 .
```

#### 3. Déployer sur Kubernetes
```bash
cd k8s
kubectl apply -f postgres-secrets.yaml
kubectl apply -f postgres-configmap.yaml
kubectl apply -f db-deployment.yaml
# Attendre que PostgreSQL soit Running
kubectl apply -f app-deployment.yaml
```

#### 4. Vérifier les déploiements
```bash
kubectl get deployments
kubectl get pods
kubectl get svc
```

#### 5. Accéder à l'application
```bash
minikube service voiture-app-svc --url
```
⚠️ Garder ce terminal ouvert pour maintenir le tunnel.

#### 6. Tester l'API
- Login : `POST http://127.0.0.1:PORT/auth/login`
- Voitures : `GET http://127.0.0.1:PORT/voitures` (avec token JWT)
- Swagger : `http://127.0.0.1:PORT/swagger-ui.html`

### Fichiers Kubernetes
| Fichier | Description |
|---------|-------------|
| `postgres-secrets.yaml` | Credentials PostgreSQL encodés en base64 |
| `postgres-configmap.yaml` | Configuration host et nom de la base |
| `db-deployment.yaml` | Déploiement PostgreSQL + PVC + Service |
| `app-deployment.yaml` | Déploiement Spring Boot (3 replicas) + Service NodePort |

### Arrêter l'environnement
```bash
minikube stop
```

