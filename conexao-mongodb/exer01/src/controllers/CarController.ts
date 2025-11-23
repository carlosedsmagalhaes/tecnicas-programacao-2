import { Request, Response } from "express";
import { Car } from "../models";

class CarController {
  async create(req: Request, res: Response) {
    try {
      const { model } = req.body;

      if (!model) return res.status(400).json({ message: "O modelo é obrigatório" });

      const car = await Car.create({ model });
      return res.status(201).json(car);
    } catch (error: any) {
      if (error && error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((e: any) => e.message);
        return res.status(400).json({ message: errors.join("; ") });
      }

      if (error && error.code === 11000) {
        return res.status(409).json({ message: "Modelo já existe" });
      }

      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const cars = await Car.find();
      return res.json(cars);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const car = await Car.findById(id);

      if (!car) return res.status(404).json({ message: "Carro não encontrado" });

      return res.json(car);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { model } = req.body;

      if (!model) return res.status(400).json({ message: "O modelo é obrigatório" });

      const car = await Car.findByIdAndUpdate(id, { model }, { new: true, runValidators: true });

      if (!car) return res.status(404).json({ message: "Carro não encontrado" });

      return res.json(car);
    } catch (error: any) {
      if (error && error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((e: any) => e.message);
        return res.status(400).json({ message: errors.join("; ") });
      }

      if (error && error.code === 11000) {
        return res.status(409).json({ message: "Modelo já existe" });
      }

      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const car = await Car.findByIdAndDelete(id);

      if (!car) return res.status(404).json({ message: "Carro não encontrado" });

      return res.status(204).send();
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default new CarController();
