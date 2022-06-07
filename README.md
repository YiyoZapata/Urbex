

# TFG-Urbex despliegue en docker

Primero descargamos nuestro código de nuestro repositorio de github.

Creamos el archico docker-compose.yaml y lo configuramos con los requirimientos que necesita nuestra app

![Captura de pantalla de 2022-06-05 11-55-45](https://user-images.githubusercontent.com/100800688/172046045-6f590a3f-32d7-4792-964f-b4d1424cfe8e.png)
![Captura de pantalla de 2022-06-05 11-55-56](https://user-images.githubusercontent.com/100800688/172046048-9ecc2b6f-60b4-49f1-b5f7-8be8419cdaa7.png)

También creamos nuestro dockerfile.

![Captura de pantalla de 2022-06-05 12-25-47](https://user-images.githubusercontent.com/100800688/172046131-107e3b8c-ecd4-4705-9321-08d86c877f83.png)

(Antes de tener todos estos requisitos hay que eliminar los archivos de nuestro código que no sean necesarios)

Una vez tengamos todos los requitos para el despligue  ejecutamos el docker-compose up -d

![Captura de pantalla de 2022-06-05 12-00-06](https://user-images.githubusercontent.com/100800688/172046256-67ff5323-f5e4-444f-922e-b1a48de7c62b.png)

Comprobamos ccon docker ps

![Captura de pantalla de 2022-06-05 12-02-00](https://user-images.githubusercontent.com/100800688/172046268-74dbba92-c5de-44e3-92d4-31a54b329d57.png)
