# Proyecto Módulo 4(M4): Backend

Este es el proyecto integrador desarrollado clase a clase en la carrera de fullstack del bootcamp: [Soy Henry](https://www.soyhenry.com/webfullstack). Consiste en programar el backend para un ecommerce utilizando el framework [Nest](https://github.com/nestjs/nest), [TypeScript](https://www.typescriptlang.org/), [JWT](https://jwt.io/), [Jest](https://jestjs.io/), [TypeORM](https://typeorm.io/), PostgreSQL, Docker.

Estudiante: [Jeroham Sanchez](https://github.com/lordjnux)

## Requisitos - HW01: Backend Architecture

Al finalizar este hito deberás tener la estructura básica del proyecto individual de e-commerce y una idea teórica de las entidades de la base de datos así como sus relaciones.

- [ :white_check_mark: ] [HW01 - DER](./HW01-DER-SOLUTION/HW01-DER.svg)

## Requisitos - HW02: Fundamentals

- [ :white_check_mark: ] Al finalizar este hito deberás tener un proyecto de node con la estructura básica del proyecto individual de e-commerce. Los endpoints principales del proyecto deberán ser capaces de recibir solicitudes desde el cliente y activar un middleware que nos permita identificar mediante un log en la terminal la ruta invocada.

## Requisitos - HW03: Fundamentals II

- [ :white_check_mark: ] Al finalizar este hito, el alumno deberá implementar de manera satisfactoria un repositorio para cada entidad del proyecto.
- [ :white_check_mark: ] Los endpoints de la aplicación deben funcionar de manera correcta y devolver la información provista por cada repositorio.

## Requisitos - HW04: Routing

- [ :white_check_mark: ] Al finalizar este hito el proyecto debe contar con una ruta para cada una de las acciones correspondientes al CRUD de cada entidad.
- [ :white_check_mark: ] La lógica de estas tareas deberá estar encapsulada en el repositorio correspondiente.
- [ :white_check_mark: ] Los endpoints deberán ser validados para asegurar la integridad de la información recibida en la solicitud.
- [ :white_check_mark: ] Las rutas deberán ser protegidas por una guarda.

## Requisitos - HW05: TypeORM

- [ :white_check_mark: ] Al terminar el hito el alumno debe haber realizado la correcta configuración de la base de datos en el proyecto.
- [ :white_check_mark: ] Los servicios deben trabajar con los repositorios de cada entidad para gestionar la información en la base de datos.
- [ :white_check_mark: ] Las relaciones entre tablas deben funcionar correctamente al realizar el proceso de compra.
- [ :white_check_mark: ] Debe estar configurada la implementación de migraciones para monitorear futuros cambios en la base de datos.

## Requisitos - HW06: Pipes

- [ :white_check_mark: ] Al terminar el hito el alumno debe haber implementado correctamente la validación de solicitudes HTTP por medio de Pipes.
- [ :white_check_mark: ] Las validaciones deben ser implementadas en aquellos endpoints que utilicen información proveniente de la solicitud según corresponda.

## Requisitos - HW07: File Upload

- [ :white_check_mark: ] Al terminar este hito el alumno debe haber implementado la actualización de productos para utilizar la carga de imágenes al servicio de cloudinary.
- [ :white_check_mark: ] Las imágenes deben tener una validación de tamaño y tipo antes de ser cargadas en el servicio de Cloudinary

## Requisitos - HW08: Auth

- [ :white_check_mark: ] Al finalizar el alumno tendrá que haber implementado un sistema de autenticación por medio de la encriptación de contraseñas y la validación por medio de la gestión de tokens de JWT
- [ :white_check_mark: ] El proyecto deberá contar con rutas protegidas particulares y rutas públicas accesibles sin la necesidad de un token.

## Requisitos - HW09: Auth II

- [ :white_check_mark: ] Al terminar este hito la aplicación deberá contar con rutas protegidas por medio del Control de acceso basado en roles.