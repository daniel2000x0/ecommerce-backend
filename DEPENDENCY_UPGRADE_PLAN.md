Dependency upgrade plan
======================

Resumen:
- `npm audit fix` no pudo resolver todas las vulnerabilidades automáticamente.
- `npm audit fix --force` se intentó pero terminó sin aplicar todos los cambios (puede requerir revisión manual). 72 vulnerabilidades detectadas (5 critical, 40 high, 27 moderate).

Prioridades (ordenadas):
1. `class-validator` (critical) — se usa por `@nestjs/swagger`/`@nestjs/mapped-types`.
2. `form-data`, `qs`, `tough-cookie`, `uuid` — transitivas por `request`/`jsdom`/`jest`.
3. `lodash`, `js-yaml`, `path-to-regexp`, `glob`, `braces` — varias dependencias.

Strategy:
1. Crear rama dedicada `chore/deps-upgrade`.
2. Actualizar dependencias top-level cuidadosamente:
   - `@nestjs/core`, `@nestjs/platform-express`, `@nestjs/typeorm`, `@nestjs/swagger` → actualizar a la última v11 estable (o v12 si se desea migrar) y probar.
   - `class-validator` → actualizar a >=0.14.0.
   - `jest` / `ts-jest` si es necesario (puede requerir cambios en tests).
3. Ejecutar `npm install` y ejecutar la app y los tests.
4. Si hay breaking changes, ir archivo por archivo corrigiendo (tests, providers, cambios en API de NestJS).
5. Repetir hasta que `npm audit` reporte cero o aceptable número de vulnerabilidades.

Commands sugeridos (ejecutar en la rama nueva):
```
git checkout -b chore/deps-upgrade
# Attempt safe upgrades first
npm update
# Then attempt targeted upgrades
npm install @nestjs/core@latest @nestjs/platform-express@latest @nestjs/typeorm@latest @nestjs/swagger@latest class-validator@^0.14.0
# Run tests and app
npm ci
npm test
npm start
# Re-run audit
npm audit
```

Notas de mitigación:
- Algunas vulnerabilidades sólo están en dependencias transitorias; actualizar top-level puede resolverlas.
- `npm audit fix --force` puede aplicar cambios rompientes; preferir pruebas en CI y revisión manual antes de merge.
- Para paquetes sin corrección disponible, considerar reemplazo o mitigación (ej. evitar `request` o `mjml` si posible).

Si quieres, puedo:
- intentar aplicar las actualizaciones top-level automáticamente (haré commits y pruebas), o
- preparar PR con cambios mínimos y un resumen de riesgos para revisión.
