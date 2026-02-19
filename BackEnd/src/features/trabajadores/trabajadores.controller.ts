import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Crear trabajadores 
export const createTrabajador = async (req: Request, res: Response): Promise<void> => {
  const { nombre, rol, seniority } = req.body;

  try {
    const trabajador = await prisma.trabajador.create({
      data: { nombre, rol, seniority },
    });

    res.status(201).json(trabajador);
  } catch (error) {
    console.error('Error creando trabajador:', error);
    res.status(500).json({ error: 'Error creando trabajador' });
  }
};

// Obtener trabajadores con sus proyectos 
export const getTrabajadores = async (req: Request, res: Response): Promise<void> => {
  try {
    const trabajadores = await prisma.trabajador.findMany({
      include: {
        proyectos: {
          include: { proyecto: true },
        },
      },
    });

    res.json(trabajadores);
  } catch (error) {
    console.error('Error listando trabajadores:', error);
    res.status(500).json({ error: 'Error listando trabajadores' });
  }
};