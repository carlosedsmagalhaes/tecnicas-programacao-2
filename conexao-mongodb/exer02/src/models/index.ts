import mongoose from "mongoose";

const { Schema } = mongoose;

const DistrictSchema = new Schema({
    name: {
        type: String,
        maxLength: [30, "O nome do distrito pode ter no máximo 30 caracteres"],
        required: [true, "O nome do distrito é obrigatório"],
    },
});

const CitySchema = new Schema({
    name: {
        type: String,
        maxLength: [30, "O nome da cidade pode ter no máximo 30 caracteres"],
        required: [true, "O nome da cidade é obrigatório"],
    },
    districts: [DistrictSchema],
});

const StateSchema = new Schema({
    name: {
        type: String,
        maxLength: [20, "O nome do estado pode ter no máximo 20 caracteres"],
        unique: true, // Única validação de unicidade no exercício 
        required: [true, "O nome do estado é obrigatório"],
    },
    cities: [CitySchema],
});

const StateModel = mongoose.model("State", StateSchema); 

export { StateModel as State };
