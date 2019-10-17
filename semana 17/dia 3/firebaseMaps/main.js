// window.onload=()=>
window.onload=function(){
    var mapGoogle;
    var divMapa=document.getElementById("mapa");

    function iniciarFirebase(){
        var firebaseConfig = {
            apiKey: "AIzaSyDIIDbHB62BRNtz_0IfhGT1Ibr4q5PS4xI",
            authDomain: "parking-db403.firebaseapp.com",
            databaseURL: "https://parking-db403.firebaseio.com",
            projectId: "parking-db403",
            storageBucket: "",
            messagingSenderId: "956466903380",
            appId: "1:956466903380:web:eb914391ebf94b7db6b0c1"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
    }
    iniciarFirebase();

    function configurarMaps(){
        mapGoogle=new google.maps.Map(divMapa,{
            center:{
                lat:-17,
                lng:-71
            },
            zoom:9
        });
        listenerMaps();
    }
    let crearNuevoParqueo=(lat,lng)=>{
        $('#modal').modal('show');
        let inputNombre=$('#inputNombre').val();
        let inputDireccion=$('#inputDireccion').val();
        let inputDescripcion=$('#inputDescripcion').val();
        let btnCrear=$('#btnCrear');
        btnCrear.click(()=>{
            let referencia=firebase.database().ref("Parking");
            const NUEVO_ID=referencia.push().key;
            referencia.child(NUEVO_ID).set(
                {
                    nombre:inputNombre,
                    descripcion:inputDescripcion,
                    direccion:inputDireccion,
                    lat:lat,
                    lng:lng
                },error=>{
                    if(error){
                        console.log(error);                        
                    }
                }
            )
        })
    }
    let listenerMaps=()=>{
        mapGoogle.addListener("click",coords=>{
            let lat=coords.latLng.lat();
            let lng=coords.latLng.lng();
            console.log(lat,lng);
            crearNuevoParqueo(lat,lng);
        })
    }
    function imprimirMarcadores(arregloMarcadores){
        arregloMarcadores.forEach(({nombre,direccion,descripcion,lat,lng}) => {
            miLatLng={
                lat:lat,
                lng:lng
            }
            let marcador=new google.maps.Marker({
                position:miLatLng,
                icon:{
                    url:'./parking.png',
                    scaledSize:new google.maps.Size(50,50)
                },
                title:nombre
            });
            let info=new google.maps.InfoWindow({
                content:`<h4>${nombre}</h4>
                <br>
                <strong>Direccion:</strong>${direccion}
                <br>
                <strong>Descripcion:</strong>${descripcion}`
            });
            marcador.addListener("click",()=>{
                //open recibe 2 el mapa y el marcador
                info.open(mapGoogle,marcador);
            })
            marcador.setMap(mapGoogle);
        });
    }
    function obtenerParking(){
        let referencia=firebase.database().ref("parking");
        referencia.on("value",data=>{
            console.log(data);
            let arregloData=[];
            data.forEach(espacio => {
                let objTemporal={
                    nombre:espacio.val().nombre,
                    direccion:espacio.val().direccion,
                    descripcion:espacio.val().descripcion,
                    lat:espacio.val().lat,
                    lng:espacio.val().lng
                }
                arregloData.push(objTemporal);   
                imprimirMarcadores(arregloData);             
            });
        })
    }
    obtenerParking();
    configurarMaps();
}
