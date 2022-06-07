function actualitzar(){
    getSelector();
}

//querys y unión con metodos de buscar de .js
function getSelector(){
    var http;
    http = new XMLHttpRequest;

    http.onreadystatechange = function(){
        if (http.readyState==4 && http.status==200){
          
        }
    }

    http.open("GET","http://localhost:8080/Urbex/UsuarioServlet",true);
    http.send();
}

//Busca usuarios de la BD
function buscarUsuario(){
    var http;
    http = new XMLHttpRequest;

    http.onreadystatechange = function(){
        if (http.readyState==4 && http.status==200){
            document.getElementById("divTaula").innerHTML=http.responseText;
        }
    }

    http.open("GET","http://localhost:8080/Urbex/UsuarioServlet="+document.getElementById("selector").value, true);
    http.send();
}

//Busca publicaciones de la BD
function buscarPost(){
    var http;
    http = new XMLHttpRequest;

    http.onreadystatechange = function(){
        if (http.readyState==4 && http.status==200){
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(http.response,"text/xml");
            pintarListaLugares(xmlDoc);
        }
    }

    http.open("GET","http://localhost:8080/Urbex/PostServlet", true);
    http.send();
}

function eliminarUsuario(){
    var http;
    http = new XMLHttpRequest;

    http.onreadystatechange = function(){
        if (http.readyState==4 && http.status==200){
        }

    }
    http.open("POST","http://localhost:8080/Urbex/EliminarUsuario", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.send("usuario="+document.getElementById("usuario").value);
}

//Funcion que envia el usuario a la base de datos y los guarda
function enviarUsuario(){
    var http;
    http = new XMLHttpRequest;

    http.onreadystatechange = function(){
        if (http.readyState==4 && http.status==200){
            getSelector();
            //location.replace("../html/login.html");
        }

    }
    http.open("POST","http://localhost:8080/Urbex/UsuarioServlet", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.send("usuario="+document.getElementById("usuario").value+"&&email="+document.getElementById("email").value+"&&contrasena="+document.getElementById("contraseña1").value);

    //location.replace("login.html");

}
//Comprueba usuario y conraseña para hacer el login
function comprobarUsuario(){
    var http;
    http = new XMLHttpRequest;

    http.onreadystatechange = function(){
        if (http.readyState==4 && http.status==200){
            getSelector();
            alert(http.responseText);
        }

    }
    http.open("POST","http://localhost:8080/Urbex/ComprobarUsuario", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.send("usuario="+document.getElementById("usuario").value+"&&contrasena="+document.getElementById("contrasena").value);

    
}

function funcionesRegistro(){
    if (repetirContra()){
    enviarUsuario()};
  
}

/*SUBIR PUBLICACIÓN*/
function subirPost(){
    var http;
    http = new XMLHttpRequest;
    
    http.onreadystatechange = function(){
        if (http.readyState==4 && http.status==200){
           
        }
    }
    http.open("POST","http://localhost:8080/Urbex/PostServlet", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    
    http.send("title="+document.getElementById("titulo").value+"&&description="+document.getElementById("descripcion").value+"&&lat="+document.getElementById("latitud").value+"&&lon="+document.getElementById("longitud").value);
    
    alert(document.getElementById("titulo").value);

}

function eliminarPost(){
    var http;
    http = new XMLHttpRequest;

    http.onreadystatechange = function(){
        if (http.readyState==4 && http.status==200){
        }
    }
    http.open("POST","http://localhost:8080/Urbex/EliminarPost", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.send("id="+document.getElementById("idPost").value);
}


function repetirContra(obj){
    contraseña1 = document.getElementById("contraseña1").value;
    contraseña2 = document.getElementById("contraseña2").value;

    if (contraseña1 == contraseña2){
        alert("si")
        return true;
    } else {
        alert("no");
        return false;
    }
}

//A partir de aquí no he tocado nada
// Variables
const baseDeDatos = [
    {
        id: 1,
        title: 'Uno',
        description: 'Asdasdasdbalblablabal',
        localization_id: 'asdsad'
    },
    {
        id: 2,
        title: 'Dos',
        description: 'eeeeeeeeeeeeee',
        localization_id: 'asdsad'
    },
    {
        id: 3,
        title: 'Tres',
        description: 'iiiiiiiiiiiiiiii',
        localization_id: 'asdsad'
    },
    {
        id: 4,
        title: 'Cuatro',
        description: 'pppppppppppppp',
        localization_id: 'asdsad'
    }

];

//Extraer lista lugares

//RENDERIZAR INDFORMACION
function pintarListaLugares(baseDeDatos){
    //extraer cantidad de lugares
    console.log(Object.values(baseDeDatos))
    var lugares = baseDeDatos.getElementsByTagName('tr')
    for(var i = 1; i < lugares.length; i++) {
        var lugar = lugares[i]

        // Estructura
        const nodo = document.createElement('div');
        //nodo.innerHTML="Object.values(baseDeDatos[i])"

        // Titulo
        const nodoTitle = document.createElement('h5');
        nodoTitle.classList.add('title');
        nodoTitle.textContent = lugar.children[1].innerHTML ;

        // Id
        const nodoId = document.createElement('h1');
        nodoId.classList.add('id');
        nodoId.textContent = lugar.children[0].innerHTML ;

        // Descripcion
        const nodoDesc = document.createElement('h5');
        nodoDesc.classList.add('description');
        nodoDesc.textContent = lugar.children[2].innerHTML ;

        // Localizacion
        const nodoLoc = document.createElement('h5');
        nodoLoc.classList.add('localization');
        nodoLoc.textContent = lugar.children[3].innerHTML + ',' + lugar.children[4].innerHTML ;
        
        // Insertamos
        nodo.appendChild(nodoTitle);
        nodo.appendChild(nodoId);
        nodo.appendChild(nodoDesc);
        nodo.appendChild(nodoLoc);

        listaLugares = document.getElementById("listaLugares");
        listaLugares.appendChild(nodo);
    }
    
 
}


