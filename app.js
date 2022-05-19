require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async () =>{

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ) { // Cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // Imprime el menu
        opt = await inquirerMenu();
        
        switch ( opt ) {

            case  '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea( desc );
            break

            case '2':
                tareas.listadoCompleto();
            break

            case '3': // Listar completadas
                tareas.listarPendientesCompletadas();
            break;

            case '4': // Listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '6': // Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar( '¿Está seguro?' ) 
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada')
                    }
                }
                    
                console.log();
            break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while ( opt !== '0');
    
}

main();