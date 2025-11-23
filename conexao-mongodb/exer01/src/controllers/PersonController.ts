import { Request, Response } from "express";
import { People } from "../models";

class PersonController {
    async create(req: Request, res: Response) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ message: "O nome é obrigatório" });
            }

            const person = await People.create({ name });

            return res.status(201).json(person);
        } catch (error: any) {
            if (error && error.name === "ValidationError") {
                const errors = Object.values(error.errors).map((e: any) => e.message);
                return res.status(400).json({ message: errors.join("; ") });
            }

            if (error && error.code === 11000) {
                return res.status(409).json({ message: "Nome já existe" });
            }

            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const people = await People.find();
            return res.json(people);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const person = await People.findById(id);

            if (!person) return res.status(404).json({ message: "Pessoa não encontrada" });

            return res.json(person);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name) return res.status(400).json({ message: "O nome é obrigatório" });

            const person = await People.findByIdAndUpdate(
                id,
                { name },
                { new: true, runValidators: true }
            );

            if (!person) return res.status(404).json({ message: "Pessoa não encontrada" });

            return res.json(person);
        } catch (error: any) {
            if (error && error.name === "ValidationError") {
                const errors = Object.values(error.errors).map((e: any) => e.message);
                return res.status(400).json({ message: errors.join("; ") });
            }

            if (error && error.code === 11000) {
                return res.status(409).json({ message: "Nome já existe" });
            }

            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const person = await People.findByIdAndDelete(id);

            if (!person) return res.status(404).json({ message: "Pessoa não encontrada" });

            return res.status(204).send();
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

export default new PersonController();