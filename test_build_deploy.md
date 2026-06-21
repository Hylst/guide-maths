# 🚀 Guide de Test, de Compilation et de Déploiement (test_build_deploy.md)

Ce guide explique étape par étape comment tester l'application localement sur Windows, la compiler pour la production, et la déployer sur votre nom de domaine `hylst.fr` sous le sous-dossier `/guide_maths/` (URL finale : `https://hylst.fr/guide_maths/`).

---

## 💻 1. Test en Local (Windows)

Puisque le projet est configuré avec un chemin de base `/guide_maths/`, l'application en développement sera servie sous ce sous-dossier.

### Étapes préliminaires :
1. Ouvrez votre terminal (PowerShell ou Invite de commandes) dans le dossier du projet : `d:\0CODE\AntiGravity\guide-mathématiques-interactif`.
2. Installez les paquets (si ce n'est pas déjà fait) :
   ```bash
   npm install
   ```

### Lancement du serveur de développement :
3. Démarrez le serveur local :
   ```bash
   npm run dev
   ```
4. Ouvrez votre navigateur et accédez à l'URL affichée, typiquement :
   ```
   http://localhost:5173/guide_maths/
   ```
   *Note : Si vous essayez d'accéder à `http://localhost:5173/` sans le sous-dossier, vous obtiendrez une page vide ou une erreur 404, ce qui est normal.*

---

## 🛠️ 2. Compilation pour la Production

Avant de déployer, vous devez compiler l'application pour générer des fichiers HTML, CSS et JS statiques optimisés.

1. Lancez la commande de build :
   ```bash
   npm run build
   ```
   *Cette commande exécute d'abord le linter TypeScript (`npm run lint`), puis génère les fichiers dans le dossier **`dist/`**.*

2. Le dossier `dist/` créé à la racine du projet contient l'ensemble du site prêt à être hébergé.

---

## ☁️ 3. Déploiement chez un Hébergeur Cloud Mutualisé (o2switch, OVH, Hostinger Mutualisé)

Sur un hébergement mutualisé, vous déposez simplement vos fichiers statiques via FTP.

### Configuration du Routage Single Page App (SPA) et Gestion du Slash de fin :
Étant donné que l'application gère son routage côté client (React Router), si un utilisateur rafraîchit la page sur un sous-dossier ou accède directement à l'URL sans slash final (`https://hylst.fr/guide_maths`), il faut s'assurer que le serveur redirige correctement et serve `index.html`.

### Procédure de déploiement :
1. Connectez-vous à votre client FTP (FileZilla par exemple) ou au gestionnaire de fichiers cPanel.
2. Créez un dossier nommé `guide_maths` à la racine publique de votre site (généralement dans le dossier `public_html/` ou `www/`).
3. Téléversez l'intégralité du contenu du dossier local `dist/` dans ce dossier distant `guide_maths/`.
4. Créez un fichier nommé **`.htaccess`** directement à l'intérieur du dossier distant `guide_maths/` et collez-y le code suivant :
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /guide_maths/
     
     # Rediriger /guide_maths sans slash vers /guide_maths/ avec slash
     RewriteCond %{REQUEST_URI} ^/guide_maths$
     RewriteRule ^(.*)$ /guide_maths/ [R=301,L]
     
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /guide_maths/index.html [L]
   </IfModule>
   ```

---

## 🐳 4. Déploiement sur votre VPS Hostinger géré par Coolify

Coolify est un gestionnaire d'applications Docker très puissant. Pour déployer ce projet statique, nous utiliserons un conteneur **Nginx**.

### Étape 1 : Créer une nouvelle ressource dans Coolify
1. Sur votre tableau de bord Coolify, allez dans votre Projet et cliquez sur **Add Resource** > **Public Repository** (ou connectez votre compte GitHub).
2. Entrez l'URL de votre dépôt Git contenant le projet.

### Étape 2 : Configuration du Build et du Serveur
Dans les paramètres de l'application sur Coolify, configurez comme suit :
* **Build Pack** : `Static` (Coolify va automatiquement créer un conteneur Nginx pour servir les fichiers).
* **Build Command** : `npm run build`
* **Output Directory** : `dist`
* **Base Directory** : `/`
* **Domains** : Entrez `https://hylst.fr/guide_maths/` (Coolify gérera automatiquement le certificat SSL Let's Encrypt et le reverse proxy).

### Étape 3 : Configuration du Routage Nginx (SPA) dans Coolify
Pour s'assurer que l'application soit accessible aussi bien avec que sans le slash de fin (`https://hylst.fr/guide_maths` et `https://hylst.fr/guide_maths/`), et pour éviter les erreurs 404 lors du rafraîchissement des pages, configurez Nginx.

Dans l'onglet **Configuration** de votre application Coolify, recherchez la section **Custom Nginx Configuration** (Configuration Nginx personnalisée) et utilisez la configuration suivante :

```nginx
server {
    listen 80;
    server_name localhost;

    # Rediriger l'URL sans slash final vers la version canonique avec slash
    location = /guide_maths {
        return 301 $scheme://$http_host/guide_maths/;
    }

    # Servir l'application sur le chemin avec slash
    location /guide_maths/ {
        alias /usr/share/nginx/html/;
        index index.html;
        try_files $uri $uri/ /guide_maths/index.html;
    }

    # Fallback par défaut si nécessaire
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```
Cette configuration Nginx assure une redirection propre en code HTTP 301, ce qui permet à l'application React et au routeur de s'initialiser correctement avec le bon contexte d'URL.
