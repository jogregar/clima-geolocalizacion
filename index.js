
require('dotenv').config();
const {
    leerInput,
    inquirerMenu,
    pausa,
    listarLugares
} = require("./helpers/inquirer");
const Busquedas = require("./modelos/busquedas");

const main = async() => {

    const busquedas = new Busquedas();
    let op;
    do {
        // Se muestra el menu
        opt = await inquirerMenu();
        
        switch (opt){
            case 1:
                // Pedimos el Pais o la ciudad
                const buscar = await leerInput('Ciudad: ');

                // Buscamos los lugares que conincidan
                const lugares = await busquedas.ciudad(buscar);

                // Mostramos las Coincidencias y seleccionamos 
                const id = await listarLugares(lugares);
                if (id === '0') continue;

                const lugarSeleccionado = lugares.find( l => l.id === id);
                busquedas.agregarHistorial(lugarSeleccionado.nombre);

                // Obtenemos el clima y mostramos resultados
                const clima = await busquedas.climaLugar (lugarSeleccionado.lat, lugarSeleccionado.lng);
                console.clear();
                console.log("\nInformación de la ciudad\n".green);
                console.log('Ciudad:', lugarSeleccionado.nombre.green);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Lng:', lugarSeleccionado.lng);
                console.log('Temperatura:', clima.temp );
                console.log('Minima:', clima.min);
                console.log('Maxima:', clima.max);
                console.log('Descripcion:', clima.desc.green);
                break;

            case 2:
                busquedas.historialCapitalizado.forEach( (lugar , i) => {
                     const idx = `${i + 1}.`.green;
                     console.log(`${idx} ${lugar}`);
                })
                break;
        }
        
        if (op != 0) await pausa();

    }while ( opt !== 0);
}

main();