define(['a.js'], function(a) {
    'use strict';
    const name = 'Lichee'
    const age = 16

    console.log(a.name)
    console.log(a.getAge())

    return {
        name,
        getAge: () => age    
    }
});