import { Request, Response } from "express";
import { CarByPerson } from "../models";

class CarByPersonController {
	async create(req: Request, res: Response) {
		try {
			const { idcar, idpeople } = req.body;

			if (!idcar || !idpeople)
				return res.status(400).json({ message: "idcar e idpeople são obrigatórios" });

			const record = await CarByPerson.create({ idcar, idpeople });

			return res.status(201).json(record);
		} catch (error: any) {
			if (error && error.name === "ValidationError") {
				const errors = Object.values(error.errors).map((e: any) => e.message);
				return res.status(400).json({ message: errors.join("; ") });
			}

			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const list = await CarByPerson.find().populate("idcar").populate("idpeople");
			return res.json(list);
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const record = await CarByPerson.findById(id).populate("idcar").populate("idpeople");

			if (!record) return res.status(404).json({ message: "Registro não encontrado" });

			return res.json(record);
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { idcar, idpeople } = req.body;

			if (!idcar || !idpeople)
				return res.status(400).json({ message: "idcar e idpeople são obrigatórios" });

			const updated = await CarByPerson.findByIdAndUpdate(
				id,
				{ idcar, idpeople },
				{ new: true, runValidators: true }
			).populate("idcar").populate("idpeople");

			if (!updated) return res.status(404).json({ message: "Registro não encontrado" });

			return res.json(updated);
		} catch (error: any) {
			if (error && error.name === "ValidationError") {
				const errors = Object.values(error.errors).map((e: any) => e.message);
				return res.status(400).json({ message: errors.join("; ") });
			}

			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const deleted = await CarByPerson.findByIdAndDelete(id);

			if (!deleted) return res.status(404).json({ message: "Registro não encontrado" });

			return res.status(204).send();
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}
}

export default new CarByPersonController();
