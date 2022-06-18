/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*=======================================================*/

class SimuladorCredito extends React.Component {
    constructor() {
        super();
        this.state = {
            correo: '',
            valor_prestamo: '',
            tipo_prestamo: '',
            numero_cuotas: '',
            total_deuda:'',
            tasa_interes:'',
            valor_cuotas:'',
            solicitud: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addSolicitud = this.addSolicitud.bind(this);
    }

    /*=======================================================*/
    // Métodos
    handleChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }
    /*=======================================================*/

    addSolicitud(e) {
        e.preventDefault();

        let interes = 0;
        this.state.tasa_interes = 0;
        this.state.total_deuda = 0;
        this.state.valor_cuotas = 0;

        if (this.state.tipo_prestamo === "vivienda") {
            console.log("enta vivienda");
            interes = 0.01; // en porcentaje
            this.state.tasa_interes = parseFloat(this.state.valor_prestamo * interes); // en pesos 
            this.state.total_deuda = parseFloat((this.state.valor_prestamo * interes * this.state.numero_cuotas) + parseInt(this.state.valor_prestamo));
            this.state.valor_cuotas = parseInt(this.state.total_deuda / this.state.numero_cuotas);
           
        }
        if(this.state.tipo_prestamo === "educacion") {
            console.log("enta educacion");
            interes = 0.05; // en porcentaje
            this.state.tasa_interes = parseFloat(this.state.valor_prestamo * interes); // en pesos 
            this.state.total_deuda = parseFloat((this.state.valor_prestamo * interes * this.state.numero_cuotas) +  parseInt(this.state.valor_prestamo));
            this.state.valor_cuotas = parseInt(this.state.total_deuda / this.state.numero_cuotas);
        }
        if (this.state.tipo_prestamo === "libre_inversion") {
            console.log("enta libre inversion");
            interes = 0.015; // en porcentaje
            this.state.tasa_interes = parseFloat(this.state.valor_prestamo * interes); // en pesos 
            this.state.total_deuda = parseFloat((this.state.valor_prestamo * interes * this.state.numero_cuotas) +  parseInt(this.state.valor_prestamo));
            this.state.valor_cuotas =parseInt(this.state.total_deuda / this.state.numero_cuotas);
        }

        console.log(this.state.tasa_interes);
        console.log(this.state.total_deuda);
        console.log(this.state.valor_cuotas);

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
    /*=======================================================*/
    componentDidMount() { // cuando carguen sus componentes
        this.refreshSolicitud();
    }

    /*=======================================================*/
    /*=======================================================*/
    /*=======================================================*/

    // renderizar
    render() {function conversor(number){
        return new Intl.NumberFormat("ES-MX",{
        style:'currency',
        currency: 'MXN'}).format(number)
    }
        return (
            <div className="container">
                <h3>Solicitud de Crédito</h3>
                {/* Formulario*/}
                <form onSubmit={this.addSolicitud}>
                    <div className="mb-3">
                        Correo Electrónico
                        <input
                            className="form-control my-2"
                            placeholder="Ingrese Email"

                            type="email" name="correo"
                            onChange={this.handleChange} value={this.state.correo}
                        ></input>
                    </div>
                    {/*=======================================================*/}
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
                    {/*=======================================================*/}
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
                    {/*=======================================================*/}
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
                    {/*=======================================================*/}
                    
                    <button type="submit" className="btn btn-success btn-lg">Calcular</button>
                    <button type="submit" className="btn btn-warning btn-lg">Limpiar</button>
                </form>
                {/* Fin formulario*/}

                {/*=======================================================*/}

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
                    {/*=======================================================*/}
                    <tbody>
                        {
                            this.state.solicitud.map(solicitud => {
                                return (
                                    <tr key={solicitud.id_solicitud}>
                                        <td>{solicitud.id_solicitud}</td>
                                        <td>{solicitud.correo}</td>
                                        <td>{conversor(solicitud.valor_prestamo)}</td>
                                        <td>{solicitud.tipo_prestamo}</td>
                                        <td>{solicitud.numero_cuotas}</td>
                                        <td>{conversor(solicitud.total_deuda)}</td>
                                        <td>{conversor(solicitud.tasa_interes)}</td>
                                        <td>{conversor(solicitud.valor_cuotas)}</td>
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