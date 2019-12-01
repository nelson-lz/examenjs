const empleadoController = {};
const EmpleadoModel = require('../models/empleado');
const moment = require('moment');
moment.locale('es');

empleadoController.getEmpleado = async (req,res) => {
    try {
        const empleado = await EmpleadoModel.findOne({_id:req.params.id});
        res.json(empleado);
    } catch (error) {
        res.json({
            success:false,
            message:"ha ocurrido un error al obtener el empleado"
        });
    }
};
empleadoController.getEmpleados = async (req,res) => {
    try {
        const empleados = await EmpleadoModel.find();
        res.json(empleados);
    } catch (error) {
        res.json({
            success:false,
            message:"ha ocurrido un error al obtener los empleados"
        })
    }
};
empleadoController.createEmpleado = async (req,res) => {
    const {nombre,cedula,domicilio,telefono,salariobasico,cargo,tipoempleado,fechaingreso} = req.body;
    if(!nombre){
        return res.json({
            success:false,
            message:"el nombre no puede ser vacio"
        })
    }
    if(!cedula){
        return res.json({
            success:false,
            message:"cedula no puede ser vacio"
        })
    }
    if(salariobasico<1){
        return res.json({
            success:false,
            message:"salario no puede ser 0"
        })
    }
    if(!cargo){
        return res.json({
            success:false,
            message:"cargo no puede ser vacio"
        })
    }
    if(!tipoempleado){
        return res.json({
            success:false,
            message:"Tipo empleado no puede ser vacio"
        })
    }
    if(tipoempleado!="M" && tipoempleado!="J" && tipoempleado!="C"){
        return res.json({
            success:false,
            message:"Solo se puede seleccionar M mensualero, J jornalero y C changarin"
        });
    }
    //fechaingreso = moment().format('L');
    const salariodia = salariobasico/30;
    const salariohora = salariodia/8;
    const newEmpleado = new EmpleadoModel({
        nombre,
        cedula,
        domicilio,
        telefono,
        fechaingreso,
        tipoempleado,
        cargo,
        salariobasico,
        salariodia,
        salariohora
    });
    try {
        await newEmpleado.save();
        res.json({
            success:true,
            message:"se ha creado el empleado"
        })
    } catch (error) {
        res.json({
            success:false,
            message:"ha ocurrido un error CreateEmpleado"
        })
    }
};
empleadoController.updateEmpleado = async (req,res) => {
    try {
       await EmpleadoModel.findByIdAndUpdate({_id: req.params.id},req.body);
       res.json({
           success:true,
           message:"Se ha actualizado.!"
       });
    } catch (error) {
        res.json({
            success:false,
            message:"ha ocurrido un error"
        });
    }
};
empleadoController.deleteEmpleado = async (req,res) => {
    try {
       const empleado = await EmpleadoModel.findOne({_id:req.params.id});
       console.log("estado:"+empleado.estado);
       if(empleado.estado){
           res.json({
                success:false,
                message:"No se puede eliminar un empleado con estado activo(true) debe cambiar el estado a false."
           });
       }else {
            await EmpleadoModel.findByIdAndDelete(req.params.id);
            res.json({
                success:true,
                message:"se ha eliminado con exito"
            });
       }
    } catch (error) {
        res.json({
            success:false,
            message:"ha ocurrido un error delete"
        });
    }
};

module.exports = empleadoController;