export class vehiculo{
    constructor(tipo,marca){
        this.tipo=tipo;
        this.marca=marca;
    }
    imprimirVehiculo(){
        console.log(`es un ${this.tipo} de marca ${this.marca}`);
        
    }
};

export class avion extend vehiculo{
    constructor(){
        super('boeing 747','Boeing');
    }
};
export class burro extend vehiculo{
    constructor(){
        super('burrito de sherk','Burrito');
    }
};
// ya no puedo mandar solo 1 clase, exportare is dos o mas clases en un OBJ
// Propiedad: Clase
module.exports={
    vehiculo:vehiculo,
    avion:avion
}


// module.exports=vehiculo;
// IMPORTANDO POR DEFAUL
import vehiculo from './vehiculo.mjs';
