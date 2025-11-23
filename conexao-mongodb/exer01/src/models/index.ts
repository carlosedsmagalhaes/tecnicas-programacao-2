import mongoose from "mongoose";

const { Schema } = mongoose;

const PeopleSchema = new Schema({
    name: {
        type: String,
        maxLength: [30, "O nome pode ter no máximo 30 caracteres"],
        unique: true,
        required: [true, "O nome é obrigatório"],
    },
});

const CarSchema = new Schema({
    model: {
        type: String,
        maxLength: [15, "O modelo pode ter no máximo 15 caracteres"],
        unique: true,
        required: [true, "O modelo é obrigatório"],
    },
});

// Registra os modelos base primeiro para que os validators possam consultá-los
const PeopleModel = mongoose.model("People", PeopleSchema);
const CarModel = mongoose.model("Car", CarSchema);

const PhoneSchema = new Schema({
    idpeople: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
        required: [true, "O id da pessoa é obrigatório"],
        validate: {
            validator: async function (id: string) {
                const people = await PeopleModel.findById(id);
                return !!people;
            },
            message: "A pessoa fornecida não existe",
        },
    },
    number: {
        type: String,
        required: [true, "O número é obrigatório"],
        match: [/^[0-9]{11}$/, "O número de telefone deve ter exatamente 11 dígitos numéricos"],
    },
});

const CarByPersonSchema = new Schema({
    idcar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: [true, "O id do carro é obrigatório"],
        validate: {
            validator: async function (id: string) {
                const car = await CarModel.findById(id);
                return !!car;
            },
            message: "O carro fornecido não existe",
        },
    },
    idpeople: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
        required: [true, "O id da pessoa é obrigatório"],
        validate: {
            validator: async function (id: string) {
                const people = await PeopleModel.findById(id);
                return !!people;
            },
            message: "A pessoa fornecida não existe",
        },
    },
});

const PhoneModel = mongoose.model("Phone", PhoneSchema);
const CarByPersonModel = mongoose.model("CarByPerson", CarByPersonSchema);

export { PeopleModel as People, PhoneModel as Phone, CarModel as Car, CarByPersonModel as CarByPerson };