window.onload=function(){

    let btnCrearRestaurante=$('#crearRestaurantes');
    let btnObtenerRestaurante=$('#obtenerRestaurantes');
    function inicializandoFireBase(){
        var firebaseConfig = {
            apiKey: "AIzaSyD74kKJiJjC6Ycb9SLa_ojXHmp2Qne3xDs",
            authDomain: "restaurantes-7f5ac.firebaseapp.com",
            databaseURL: "https://restaurantes-7f5ac.firebaseio.com",
            projectId: "restaurantes-7f5ac",
            storageBucket: "",
            messagingSenderId: "256118247095",
            appId: "1:256118247095:web:80e5808d283b62cddb0732"
          };
          // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }
    inicializandoFireBase();
    function getRestaurantes(){
        // nos conectaremos a la base de datos y le pasaremos a que nodo queremos conectarnos
        var referencia=firebase.database().ref("restaurantes");
        referencia.once("value",data=>{
            //console.log(data);
            data.forEach(fila => {
                console.log(fila.key);
                console.log(fila.val().nombre);
                console.log(fila.val().direccion);                
            });
        });
    }
    let crearRestaurantes=()=>{
        let nombre="Cevichelas 2";
        let direccion="no se camino a laas alas peruanas";
        let referencia=firebase.database().ref("restaurantes");
        const NUEVOKEY=referencia.push().key;
        referencia.child(NUEVOKEY).set(
        {
            nombre:nombre,
            direccion:direccion
        },
        error=>{
            if (error){
                console.log(error);
                
            }
        })
    }
    btnCrearRestaurante.click(crearRestaurantes);
    getRestaurantes();
}