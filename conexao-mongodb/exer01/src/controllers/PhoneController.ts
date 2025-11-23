import { Request, Response } from "express";
import { Phone } from "../models";

class PhoneController {
	async create(req: Request, res: Response) {
		try {
			const { idpeople, number } = req.body;

			if (!idpeople || !number)
				return res.status(400).json({ message: "idpeople e number são obrigatórios" });

			const phone = await Phone.create({ idpeople, number });
			return res.status(201).json(phone);
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
			const phones = await Phone.find().populate("idpeople");
			return res.json(phones);
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const phone = await Phone.findById(id).populate("idpeople");

			if (!phone) return res.status(404).json({ message: "Telefone não encontrado" });

			return res.json(phone);
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { idpeople, number } = req.body;

			if (!idpeople || !number)
				return res.status(400).json({ message: "idpeople e number são obrigatórios" });

			const updated = await Phone.findByIdAndUpdate(
				id,
				{ idpeople, number },
				{ new: true, runValidators: true }
			).populate("idpeople");

			if (!updated) return res.status(404).json({ message: "Telefone não encontrado" });

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
			const deleted = await Phone.findByIdAndDelete(id);

			if (!deleted) return res.status(404).json({ message: "Telefone não encontrado" });

			return res.status(204).send();
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}
}

export default new PhoneController();

