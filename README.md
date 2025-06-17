
Sistema de Gestión Hospitalaria (HIS)
## Resumen del Proyecto

Este proyecto es una aplicación web desarrollada con Node.js y Express.js que simula un Sistema de Información Hospitalaria (HIS). El enfoque principal es la gestión del ciclo de vida del paciente desde su ingreso, ya sea por admisión programada, derivación o emergencia, hasta su registro completo en el sistema.

## Instalacion
1-Prerrequisitos
Asegúrate de tener instalado lo siguiente:

Node.js
Un servidor de base de datos MySQL
2- Clonar el Repositorio
Abre tu terminal y clona este repositorio:
git clone https://github.com/maticorvalan/Proyecto---Hospital.git
cd Proyecto---Hospital

3- Instalar las dependencias
npm install

4- Configurar la Base de Datos
Abre tu cliente MySQL y crea una base de datos para el proyecto
Por ejemplo: CREATE DATABASE hospitalhis;
y luego importa la base de datos llamada bd.sql

5- Configurar Variables de Entorno
Crea un archivo llamado .env y copia el siguiente contenido

DB_NAME="Nombre de la base de datos que colocaste"
DB_USER="Usuario de tu base de datos"
DB_PASSWORD="Contraseña en la base de datos"
DB_HOST="Direccion ip o localhost por defecto"
DB_PORT="Puerto de la base de datos 3306 por defecto"
SESSION_SECRET=qwrz8sA$93$^4gJdlPZ@8gDSLKwe03
PORT=3000

##### 6- Ejecuta el proyecto
Para ejecutarlo utiliza
npm run dev

7- Inicia sesion
con el correo mati@gmail.com y la contraseña: 1234
