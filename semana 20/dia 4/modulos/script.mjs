// const vehiculo=require('./vehiculo');
// const{vehiculo, avion} = require('./vehiculo');

// const camioneta=new vehiculo("camioneta 4x4","Toyota");
// const avionComercial=new avion()
// camioneta.imprimirVehiculo();
// avionComercial.imprimirVehiculo();

// UTILIZANNDO ECMASCRIPT
import { avion, burro, vehiculo} from './vehiculo.mjs';
// const{vehiculo, avion} = impo('./vehiculo');

const camioneta=new vehiculo("camioneta 4x4","Toyota");
const avionComercial=new avion();
const burrito=new burro();
camioneta.imprimirVehiculo();
avionComercial.imprimirVehiculo();
burrito.imprimirVehiculo();
