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

