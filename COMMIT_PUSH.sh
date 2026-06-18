#!/bin/bash
# Script para hacer commit y push de los cambios

echo "🔄 Verificando estado del repositorio..."
git status

echo ""
echo "📝 Agregando todos los cambios..."
git add .

echo ""
echo "✅ Archivos preparados para commit"
git status

echo ""
echo "💾 Haciendo commit de los cambios..."
git commit -m "feat: Complete CRUD modules for ecommerce backend

- Add controllers and services for all simple CRUD modules (categories, color, country, gender, manufactures, product-color, product-image, product-size, size)
- Create DTOs (Create/Update) for all new modules
- Complete orders service with full CRUD implementation
- Improve products service with pagination and error handling
- Update all modules to register controllers and services
- All 22 modules now have complete structure

Changes:
- 10 new controllers
- 10 new services
- 20 new DTOs
- 9 updated modules
- 2 improved services"

echo ""
echo "🚀 Empujando cambios al repositorio..."
git push origin master

echo ""
echo "✨ ¡Cambios enviados exitosamente!"
