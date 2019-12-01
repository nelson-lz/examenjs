const {Schema, model} = require('mongoose');


const EmpleadoSchema = new Schema({
    nombre:{
        type: String,
        required:true,
    },
    cedula:{
        type:String,
        required:true
    },
    domicilio:{
        type:String,
        required:false
    },
    telefono:{
        type:String,
        required:false
    },
    salariobasico:{
        type: Number,
        required:true,
        default:2192839
    },
    cargo: {
        type:String,
        required:true
    },
    tipoempleado: {
        type:String,
        required:true,
        uppercase:true
    },
    fechaingreso:{
        type:String,
        required:true
    },
    salariodia:{
        type:Number,
    },
    salariohora:{
        type:Number,
    },
    estado:{
        type:Boolean,
        default:true
    }

}, {
    timestamps:false
});


module.exports = model('Empleado', EmpleadoSchema);

