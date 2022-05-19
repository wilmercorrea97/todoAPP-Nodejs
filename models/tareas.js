const Tarea = require("./tarea");
/**
 * _listado : 
 *          { 'uuid:123712-1231223-2': { id: 12, desc: asdasdasd, completadoEn: 19042022 } }
 * 
 */


class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });


        return listado;
    };

    constructor () {
        this._listado = {};
    }

    borrarTarea( id ) {
        if( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea( desc );
        this._listado[ tarea.id ] = tarea;
    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach( (tarea, indice) => {

            const idx = `${indice +1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                    ? 'Completada'.green
                                    : 'Pendiente'.red;
            
            console.log(`${idx} ${desc} :: ${estado}`)
        });                         
        console.log();
     };

     listarPendientesCompletadas( completadas = true ) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach( ( tarea ) => {

            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                    ? 'Completada'.green
                                    : 'Pendiente'.red;
            
            if( completadas ){
                // Mostrar completadas
                if ( completadoEn ) {
                    contador +=1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
                }
            } else {
                if ( !completadoEn ) {
                    contador +=1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
                }
            }

        });                         
        console.log();
    }


};

module.exports = Tareas;