export function debounce( callee: Function, timeout: number = 300 ) {
    
    let timer: number | null = null

    return ( ...args: any ) => {
        if( timer ) { clearTimeout( timer ) }
        timer = setTimeout( () => {
            callee( ...args )
            clearTimeout( timer as number )
            timer = null
        }, timeout )
    }

}