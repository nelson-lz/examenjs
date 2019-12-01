const {Router} = require('express');
const router = Router();
const {getEmpleado,getEmpleados,createEmpleado,updateEmpleado,
       deleteEmpleado} = require('../controllers/empleados.controller');

//rest API servicios
router.get('/', getEmpleados);
router.get('/:id', getEmpleado);
router.post('/', createEmpleado);
router.put('/:id', updateEmpleado);
router.delete('/:id', deleteEmpleado);



module.exports = router;