import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// toast.configure();

class SimuladorCredito extends React.Component {
    constructor() {
        super();
        this.state = {

            id_solicitud: '0',
            correo: '',
            valor_prestamo: '',
            tipo_prestamo: '',
            numero_cuotas: '',
            solicitud: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addSolicitud = this.addSolicitud.bind(this);
    }

    // mÈtodos
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    addSolicitud(e) {
        e.preventDefault();
        // console.log(this.state.correo);
        fetch(`http://localhost/apimomentotres/InsertCredito.php`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(this.correo);
                toast.success("Solicitud guardada correctamente ...", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                })
                this.setState({ correo: '', valor_prestamo: '', tipo_prestamo: '', numero_cuotas: '', total_deuda: '', tasa_interes: '', valor_cuotas: '' });
                this.refreshSolicitud();
            });

    }

    refreshSolicitud() {
        const apiUrl = 'http://localhost/apimomentotres/ShowCredito.php';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ solicitud: data });
                console.log(this.state.solicitud);
            })

    }
    componentDidMount() { // cuando carguen sus componentes
        this.refreshSolicitud();
    }
    // renderizar
    render() {
        return (
            <div className="container">
                <h3>Solicitud de Crédito</h3>
                
                <form onSubmit={this.addSolicitud}>
                    <div className="mb-3">
                        Valor Préstamo
                        <input

                            type="number"
                            className="form-control my-2"
                            placeholder="Ingrese Valor del Préstamo"

                            name="valor_prestamo"
                            onChange={this.handleChange} value={this.state.valor_prestamo}

                        />

                    </div>
                    <div className="mb-3">
                        Tipo de Préstamo


                        <select

                            name="tipo_prestamo"
                            className="form-control my-2"
                            onChange={this.handleChange} value={this.state.tipo_prestamo}
                        >
                            <option value="" >Seleccione tipo de prestamo</option>
                            <option value="vivienda">Vivienda</option>
                            <option value="educacion">Educación</option>
                            <option value="libre_inversion">Libre Inversión</option>

                        </select>

                    </div>
                    <div className="mb-3">
                        Número de cuotas
                        <select

                            id=""


                            name="numero_cuotas" className="form-control"
                            onChange={this.handleChange} value={this.state.numero_cuotas}
                        >

                            <option value="">Seleccione la cantidad de cuotas</option>
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="36">36</option>
                            <option value="48">48</option>
                            <option value="60">60</option>
                            <option value="72">72</option>

                        </select>



                    </div>
                    <div className="mb-3">
                        Correo Electrónico
                        <input



                            className="form-control my-2"
                            placeholder="Ingrese Email"

                            type="email" name="correo"
                            onChange={this.handleChange} value={this.state.correo}
                        ></input>


                    </div>
                    <button type="submit" className="btn btn-primary">Calcular</button>
                </form>
                {/* Fin formulario*/}

                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Correo</th>
                            <th>Valor prestamo</th>
                            <th>Tipo prestamo</th>
                            <th>Numero de cuotas</th>
                            <th>Total deuda</th>
                            <th>Tasa de interes</th>
                            <th>Valor de la cuota</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.solicitud.map(solicitud => {
                                return (
                                    <tr key={solicitud.id_solicitud}>
                                        <td>{solicitud.id_solicitud}</td>
                                        <td>{solicitud.correo}</td>
                                        <td>{solicitud.valor_prestamo}</td>
                                        <td>{solicitud.tipo_prestamo}</td>
                                        <td>{solicitud.numero_cuotas}</td>
                                        <td>{solicitud.total_deuda}</td>
                                        <td>{solicitud.tasa_interes}</td>
                                        <td>{solicitud.valor_cuotas}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <ToastContainer />
            </div>
        )
    }

}


export default SimuladorCredito;