import { Request, Response } from "express";
import { State } from "../models";

class DistrictController {
	async create(req: Request, res: Response) {
		try {
			const { stateId, cityId, name } = req.body;
			if (!stateId || !cityId || !name) return res.status(400).json({ message: "stateId, cityId e name são obrigatórios" });

			const state = await State.findById(stateId);
			if (!state) return res.status(404).json({ message: "Estado não encontrado" });

			const city = state.cities.id(cityId);
			if (!city) return res.status(404).json({ message: "Cidade não encontrada" });

			city.districts.push({ name });
			await state.save();

			const district = city.districts[city.districts.length - 1];
			return res.status(201).json({ ...district.toObject(), cityId: city._id, stateId: state._id });
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
			const districts: any[] = [];
			states.forEach((s: any) => {
				s.cities.forEach((c: any) => {
					c.districts.forEach((d: any) => districts.push({ ...d.toObject(), cityId: c._id, stateId: s._id }));
				});
			});
			return res.json(districts);
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const states = await State.find();
			for (const s of states) {
				for (const c of s.cities) {
					const d = c.districts.id(id);
					if (d) return res.json({ ...d.toObject(), cityId: c._id, stateId: s._id });
				}
			}
			return res.status(404).json({ message: "Distrito não encontrado" });
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { name } = req.body;
			if (!name) return res.status(400).json({ message: "O nome do distrito é obrigatório" });

			const states = await State.find();
			for (const s of states) {
				for (const c of s.cities) {
					const d = c.districts.id(id);
					if (d) {
						d.name = name;
						await s.save();
						return res.json({ ...d.toObject(), cityId: c._id, stateId: s._id });
					}
				}
			}

			return res.status(404).json({ message: "Distrito não encontrado" });
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
			const states = await State.find();
			for (const s of states) {
				for (const c of s.cities) {
					const d = c.districts.id(id);
					if (d) {
						(c as any).districts = (c as any).districts.filter((dist: any) => dist._id.toString() !== id);
						await s.save();
						return res.status(204).send();
					}
				}
			}
			return res.status(404).json({ message: "Distrito não encontrado" });
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}
}

export default new DistrictController();
