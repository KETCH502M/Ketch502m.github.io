#!/data/data/com.termux/files/usr/bin/bash

# Ruta de tu repo
cd /storage/emulated/0/ketch502m.github.io || exit

# Pregunta por el mensaje de commit (con espacios)
read -p "Mensaje del commit: " -r mensaje

# Agrega todo, hace commit y push
git add .
git commit -m "$mensaje"
git push origin main