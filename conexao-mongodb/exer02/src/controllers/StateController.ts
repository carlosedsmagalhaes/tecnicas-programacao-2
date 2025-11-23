import { Request, Response } from "express";
import { State } from "../models";

class StateController {
	async create(req: Request, res: Response) {
		try {
			const { name } = req.body;
			if (!name) return res.status(400).json({ message: "O nome do estado é obrigatório" });

			const state = await State.create({ name });
			return res.status(201).json(state);
		} catch (error: any) {
			if (error && error.name === "ValidationError") {
				const errors = Object.values(error.errors).map((e: any) => e.message);
				return res.status(400).json({ message: errors.join("; ") });
			}

			if (error && error.code === 11000) {
				return res.status(409).json({ message: "Estado já existe" });
			}

			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const states = await State.find();
			return res.json(states);
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const state = await State.findById(id);
			if (!state) return res.status(404).json({ message: "Estado não encontrado" });
			return res.json(state);
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { name } = req.body;

			if (!name) return res.status(400).json({ message: "O nome do estado é obrigatório" });

			const updated = await State.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });
			if (!updated) return res.status(404).json({ message: "Estado não encontrado" });
			return res.json(updated);
		} catch (error: any) {
			if (error && error.name === "ValidationError") {
				const errors = Object.values(error.errors).map((e: any) => e.message);
				return res.status(400).json({ message: errors.join("; ") });
			}

			if (error && error.code === 11000) {
				return res.status(409).json({ message: "Estado já existe" });
			}

			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const deleted = await State.findByIdAndDelete(id);
			if (!deleted) return res.status(404).json({ message: "Estado não encontrado" });
			return res.status(204).send();
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}
}

export default new StateController();
