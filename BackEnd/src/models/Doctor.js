/*
    Coleccion: Doctor

    Campos: 
        name
        specialism
        email
        password
*/

import {Schema, model} from "mongoose";

const doctorSchema = new Schema (
    {
        name: {
            type: String,
            required : true
        },
        specialism: {
            type: String,
            required : true
        },
        email: {
            type: String,
            required : true,
            unique : true
        },
        password: {
            type: String,
            required : true
        }
    }, {
        timestamps: true,
        strict: false
    }
)

export default model ("Doctor", doctorSchema)