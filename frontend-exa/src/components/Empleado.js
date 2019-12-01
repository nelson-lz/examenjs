import React, {Component} from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default class Empleado extends Component{
    constructor(props){
        super(props);
        this.state = {
            nombre:'',
            cedula:'',
            domicilio:'',
            telefono:'',
            salariobasico:'',
            cargo:'',
            tipoempleado:'',
            fechaingreso:'',
            estado:'',
            axios:  this.props.axios,
            empleados: [],
            socket: this.props.socket,
            _id:'',
            editing:false
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const empleado = {
                nombre:this.state.nombre,
                cedula:this.state.cedula,
                domicilio:this.state.domicilio,
                telefono:this.state.telefono,
                salariobasico:this.state.salariobasico,
                cargo:this.state.cargo,
                tipoempleado:this.state.tipoempleado,
                fechaingreso:this.state.fechaingreso,
                estado:this.state.estado
            }
        if(this.state.editing){
            try {
               const res = await this.state.axios.put('/api/empleado/'+this.state._id, empleado);
               if(res.data.success){
                    NotificationManager.success(res.data.message,"Empleado");
                    this.setState({
                        nombre:'',
                        cedula:'',
                        domicilio:'',
                        telefono:'',
                        salariobasico:'',
                        cargo:'',
                        tipoempleado:'',
                        fechaingreso:'',
                        editing:false
                    });
                    this.fetchEmpleados();
                    //document.getElementById('form').reset();
               } else {
                    NotificationManager.error(res.data.message,"Empleado");
               }
            } catch (error) {
                NotificationManager.error("Error!","Ha ocurrido un error");
            }
        }else{
            try {
               const res = await this.state.axios.post('/api/empleado', empleado);
               if(res.data.success){
                    NotificationManager.success(res.data.message,"Empleado");
                    this.setState({
                        nombre:'',
                        cedula:'',
                        domicilio:'',
                        telefono:'',
                        salariobasico:'',
                        cargo:'',
                        tipoempleado:'',
                        fechaingreso:'',
                        editing:false
                    });
                    this.fetchEmpleados();
                   // document.getElementById('form').reset();
               } else {
                    NotificationManager.error(res.data.message,"Empleado");
               }
            } catch (error) {
                NotificationManager.error("Error!","Ha ocurrido un error");
            }
        }
        
    }
    componentDidMount(){
        this.fetchEmpleados();
    }
    async fetchEmpleados(){
        try {
          await this.state.socket.emit('fetchEmpleados');
          await this.state.socket.on('Empleados', (data) => {
              this.setState({ empleados:data })
          });
        } catch (error) {
            NotificationManager.error("No se pudo recuperar datos", "Error :(");
        }
    }
    async editEmpleado(id){
        console.log(id);
        try {
            const res = await this.state.axios.get('/api/empleado/'+id);
            console.log(res);
            this.setState({
                nombre:res.data.nombre,
                cedula:res.data.cedula,
                domicilio:res.data.domicilio,
                telefono:res.data.telefono,
                salariobasico:res.data.salariobasico,
                cargo:res.data.cargo,
                tipoempleado:res.data.tipoempleado,
                fechaingreso:res.data.fechaingreso,
                estado:res.data.estado,
                _id:res.data._id,
                editing:true

            });
        } catch (error) {
            console.log(error);
        }
    }
    async deleteEmpleado(id){
        try {
           const res = await this.state.axios.delete('/api/empleado/'+id); 
           if(res.success){
               NotificationManager.success(res.data.message,"Empleado");
               this.fetchEmpleados();
           }else {
                NotificationManager.error(res.data.message,"Empleado");
               this.fetchEmpleados();
           }
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        return(
            <div className="container py-5">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Formulario del empleado</h5>
                                <form id="form" onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="form-group col-sm-12">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text" name="nombre" id="nombre" className="form-control form-control-sm"
                                             required autoComplete="off" onChange={this.handleChange} value={this.state.nombre}/>
                                        </div>
                                        <div className="form-group col-sm-12">
                                            <label htmlFor="domicilio">Domicilio</label>
                                            <input type="text" name="domicilio" id="domicilio" className="form-control form-control-sm" 
                                            autoComplete="off" onChange={this.handleChange} value={this.state.domicilio}/>
                                        </div>
                                        <div className="form-group col-sm-12">
                                            <label htmlFor="telefono">Telefono</label>
                                            <input type="text" name="telefono" id="telefono" className="form-control form-control-sm" 
                                              autoComplete="off" onChange={this.handleChange} value={this.state.telefono}/>
                                        </div>
                                        <div className="form-group col-sm-12">
                                            <label htmlFor="cedula">Cedula</label>
                                            <input type="text" name="cedula" id="cedula" className="form-control form-control-sm" 
                                                required autoComplete="off" onChange={this.handleChange} value={this.state.cedula}/>
                                        </div>
                                        <div className="form-group col-sm-12">
                                            <label htmlFor="salariobasico">Salario Básico</label>
                                            <input type="number" name="salariobasico" id="salariobasico" className="form-control form-control-sm" 
                                                required autoComplete="off" onChange={this.handleChange} value={this.state.salariobasico}/>
                                        </div>
                                        <div className="form-group col-sm-12">
                                            <label htmlFor="cargo">Cargo</label>
                                            <input type="text" name="cargo" id="cargo" className="form-control form-control-sm" 
                                                required autoComplete="off" onChange={this.handleChange} value={this.state.cargo}/>
                                        </div>
                                        <div className="form-group col-sm-12">
                                            <label htmlFor="tipoempleado">Tipo</label>
                                            <input type="text" name="tipoempleado" id="tipoempleado" className="form-control form-control-sm" 
                                                required autoComplete="off" placeholder="M, J o C" onChange={this.handleChange} value={this.state.tipoempleado}/>
                                        </div>
                                        <div className="form-group col-sm-12">
                                            <label htmlFor="fechaingreso">Fecha Ingreso</label>
                                            <input type="date" name="fechaingreso" id="fechaingreso" className="form-control form-control-sm" 
                                                required autoComplete="off" onChange={this.handleChange} value={this.state.fechaingreso}/>
                                        </div>
                                        <div className="form-group col-sm-12">
                                            <label htmlFor="estado">Estado</label>
                                            <input type="text" name="estado" id="estado" className="form-control form-control-sm" 
                                                required autoComplete="off" onChange={this.handleChange} value={this.state.estado} placeholder="true activo, false inactivo"/>
                                        </div>
                                        <div className="form-group col-sm-12">
                                            <button className="btn-primary btn btn-sm" type="submit">Guardar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Dashboard</h5>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Salario Básico</th>
                                            <th scope="col">Normal</th>
                                            <th scope="col">50%</th>
                                            <th scope="col">100%</th>
                                            <th scope="col">30%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.empleados.map(empleado => {
                                                return(
                                                    <tr key={empleado._id}>
                                                        <td>
                                                            <button className="btn btn-primary btn-sm" >
                                                                <i className="material-icon" onClick={()=>this.editEmpleado(empleado._id)}>edit</i>
                                                            </button>
                                                            <button className="btn btn-danger btn-sm" >
                                                                <i className="material-icon" onClick={()=>this.deleteEmpleado(empleado._id)}>delete</i>
                                                            </button>
                                                        </td>
                                                        <td>{empleado.nombre}</td>
                                                        <td>{empleado.salariobasico}</td>
                                                        <td>{empleado.salariohora}</td>
                                                        <td>{(empleado.tipoempleado==="J" ? empleado.salariohora*1.5:0)}</td>
                                                        <td>{(empleado.tipoempleado==="J" ? empleado.salariohora*2:0)}</td>
                                                        <td>{(empleado.tipoempleado==="J" ? empleado.salariohora*1.3:0)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}