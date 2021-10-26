import React  from "react"

export const themes = {
    light : {
        bg : 'white' ,
        color : 'black',
        dark : false
    },
    dark : {
        bg : 'rgb(90,90, 90)' ,
        color : 'white' ,
        dark : true
    }
}

export const ModeContext = React.createContext(themes.light)