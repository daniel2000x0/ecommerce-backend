<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción

Backend API para una tienda e-commerce construida con NestJS. Este repositorio contiene módulos para usuarios, autenticación, pagos, facturación, carrito de compras y más.

## Preparar el proyecto (rápido)

Instala dependencias:

```bash
npm install
```

Copiar variables de entorno:

```bash
cp .env.example .env
# editar .env con credenciales reales
```

## Ejecutar la aplicación

En desarrollo (watch):

```bash
npm run start:dev
```

En producción (build + run):

```bash
npm run build
npm run start:prod
```

Por defecto la app usa el puerto definido en `PORT` del `.env` (por defecto 3000).

## Tests y CI

Unit tests (Jest):

```bash
npm run test
```

La carpeta `.github/workflows/ci.yml` contiene un workflow básico que ejecuta un test focal para mantener CI verde. Para ejecutar la suite completa en CI es recomendable mejorar los mocks de TypeORM/DataSource.

## Despliegue

Recomendaciones básicas para producción:

- Usar `npm run build` y ejecutar `npm run start:prod`.
- Configurar variables sensibles en el entorno (no en el repositorio).
- Usar Docker para contenerizar la aplicación y facilitar despliegues.

Si quieres, puedo añadir un `Dockerfile` y un `docker-compose.yml` para levantar la app y una base de datos Postgres.

## Recursos

- Documentación NestJS: https://docs.nestjs.com
- Swagger está habilitado en `/api` cuando la app corre en modo development.

## Notas importantes

- Asegúrate de configurar `MAIL_USER` y `MAIL_PASS` en `.env` para que el envío de correos funcione.
- Para reducir vulnerabilidades ejecuta `npm audit` y revisa `DEPENDENCY_UPGRADE_PLAN.md`.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
