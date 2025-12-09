# FashionAI Backend (Django) - Ready-to-run

This repository contains a minimal Django backend with:
- User registration (email + password)
- Token-based login (DRF TokenAuthentication)
- Simple protected endpoint example

## Quick start (local)

1. Create virtualenv and install
```bash
python -m venv env
source env/bin/activate    # or env\Scripts\activate on Windows
pip install -r requirements.txt
```

2. Run migrations and create superuser (optional)
```bash
python manage.py migrate
python manage.py createsuperuser
```

3. Run server
```bash
python manage.py runserver
```

4. API endpoints
- `POST /api/auth/register/` — register (email, username, password)
- `POST /api/auth/login/` — obtain token (username, password)
- `POST /api/auth/logout/` — revoke token (requires Token header)
- `GET /api/protected/` — sample protected view (requires Token)

## Git
This repo is already a git repo locally. To push to GitHub:

```bash
# create repo on GitHub, then:
git remote add origin https://github.com/<you>/<repo>.git
git branch -M main
git push -u origin main
```

Good luck at your hackathon — adapt and extend as needed!
