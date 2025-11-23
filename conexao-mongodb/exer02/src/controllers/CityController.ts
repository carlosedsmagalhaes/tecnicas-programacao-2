import { Request, Response } from "express";
import { State } from "../models";

class CityController {
	async create(req: Request, res: Response) {
		try {
			const { stateId, name } = req.body;
			if (!stateId || !name) return res.status(400).json({ message: "stateId e name são obrigatórios" });

			const state = await State.findById(stateId);
			if (!state) return res.status(404).json({ message: "Estado não encontrado" });

			state.cities.push({ name });
			await state.save();

			const city = state.cities[state.cities.length - 1];
			return res.status(201).json({ ...city.toObject(), stateId: state._id });
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
			const states = await State.find().select("cities");
			const cities: any[] = [];
			states.forEach((s: any) => {
				s.cities.forEach((c: any) => cities.push({ ...c.toObject(), stateId: s._id }));
			});
			return res.json(cities);
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const state = await State.findOne({ "cities._id": id }, { "cities.$": 1 });
			if (!state || !state.cities || state.cities.length === 0) return res.status(404).json({ message: "Cidade não encontrada" });
			const city = state.cities[0];
			return res.json({ ...city.toObject(), stateId: state._id });
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { name } = req.body;
			if (!name) return res.status(400).json({ message: "O nome da cidade é obrigatório" });

			const state = await State.findOne({ "cities._id": id });
			if (!state) return res.status(404).json({ message: "Cidade não encontrada" });

			const city = state.cities.id(id);
			if (!city) return res.status(404).json({ message: "Cidade não encontrada" });
			city.name = name;
			await state.save();

			return res.json({ ...city.toObject(), stateId: state._id });
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
			const state = await State.findOne({ "cities._id": id });
			if (!state) return res.status(404).json({ message: "Cidade não encontrada" });

			const city = state.cities.id(id);
			if (!city) return res.status(404).json({ message: "Cidade não encontrada" });
			state.cities.pull(id);
			await state.save();

			return res.status(204).send();
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}
}

export default new CityController();

