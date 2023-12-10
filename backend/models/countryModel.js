import mongoose from "mongoose";

const countrySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        population: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Country = mongoose.model('Country',countrySchema);