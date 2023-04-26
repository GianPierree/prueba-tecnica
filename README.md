
# Prueba técnica CSTI

Se pidió deplegar un solución que permita crear un token, almacenarlo en una BD y después se pueda buscar el ticket creado. 



## Tecnologías

**Backend:** TypeScript

**BD no relacional:** Redis

**Test:** Jest



## Instalación

Primero hay que clonar el repositorio de GitHub

```bash
  git clone git@github.com:GianPierree/prueba-tecnica.git
  cd prueba-tecnica
```
Después hay que instalar todas las dependencias

```bash
  npm i
```
Para probar el proyecto, debemos ejecutar el siguiente comando

```bash
  npm run dev
```
Localmente, se van a mostrar estás dos rutas

```bash
  POST | http://localhost:3000/tokens
  POST | http://localhost:3000/token 
```

## API

#### Crear token

```http
  POST /tokens
```
Body:
| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `email  ` | `string` | **Requerido**. Solo email validos y que sean de los dominios @gmail.com, @hotmail.com o @yahoo.es |
| `card_number  ` | `number` | **Requerido**. La tarjeta debe tener más de 13 carácteres y menos de 16 carácteres. La validación se realizó según el algoritmo de LUHN |
| `cvv  ` | `number` | **Requerido**. El código no debe tener más de 4 carácteres y no debe ser menor a 3 carácteres. |
| `expiration_year  ` | `string` | **Requerido**. El año debe tener 4 carácteres y el rango debe ser no menor que el año actual y no mayor que 5 años. |
| `expiration_month  ` | `string` | **Requerido**. El mes debe tener 2 carácteres y no debe ver menor de 1 o mayor que 12 |

Headers
| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `authorization  ` | `string` | **Requerido**. Debe contener 20 carácteres y tener la palabra test |

* Ejemplo: ```pk_test_Rscc1245wErT```

#### Mostrar datos del token

```http
  POST /token
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Requerido**. Se debe enviar un token valido para mostrar los datos de la tarjeta  |




## Despliegue en AWS Lambda

Antes de continuar, vamos a necesitar que se agregue las variables de entorno de su cuenta de AWS. En el repositorio hay un archivo .env.example

```bash
  AWS_ACCESS_KEY_ID=
  AWS_SECRET_ACCESS_KEY=
```
Después ejecutamos el siguiente comando

```bash
  npm run deploy
```
Después de esperar un momemto se creo estos endpoints:
```
    POST - https://99i0ppx9af.execute-api.us-east-1.amazonaws.com/tokens
    POST - https://99i0ppx9af.execute-api.us-east-1.amazonaws.com/token 
```

## Ejemplos

Crear token

Handler local:
```
    POST | http://localhost:3000/tokens 
```
Handler AWS Lambda:
```
    POST - https://99i0ppx9af.execute-api.us-east-1.amazonaws.com/tokens
```

Body:
```json
{
    "email": "gian0291@gmail.com",
    "card_number": 4111111111111111,
    "cvv": 123,
    "expiration_year": "2024",
    "expiration_month": "09" 
}
```
Header:
```json
Bearer pk_test_Rscc1245wErT
```

Resultado:
```json
{
    "code": "SUCCESS",
    "message": "Token creado correctamente",
    "token": "6535d216-1abf-4"
}
```

Buscar token
Handler local:
```
    POST | http://localhost:3000/token 
```
Handler AWS Lambda:
```
    POST - https://99i0ppx9af.execute-api.us-east-1.amazonaws.com/token 
```

Body:
```json
{
    "token": "6535d216-1abf-4"
}
```

Resultado:
```json
{
    "code": "SUCCESS",
    "email": "gian0291@gmail.com",
    "card_number": 4111111111111111,
    "expiration_year": "2024",
    "expiration_month": "09"
}
```
## Pruebas unitarias (jest)

Antes de ejecutar el test se tiene que levantar el entorno local.

```bash
  npm run dev
```

Después se puede ejecuta el test sin problemas. 

```bash
  npm run test
```

