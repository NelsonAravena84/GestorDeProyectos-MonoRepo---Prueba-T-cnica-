import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


interface CreateProyectoInput {
  nombre: string;
  cliente: string;
  fechaInicio: string;
  fechaTermino?: string;
  trabajadorIds?: number[];
}


//Crear proyectos
export const createProyecto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nombre, cliente, fechaInicio, fechaTermino, trabajadorIds }: CreateProyectoInput = req.body;

  try {
    const proyecto = await prisma.proyecto.create({
      data: {
        nombre,
        cliente,
        fechaInicio: new Date(fechaInicio),
        fechaTermino: fechaTermino ? new Date(fechaTermino) : undefined,
        trabajadores: trabajadorIds?.length ? {
          create: trabajadorIds.map(id => ({
            trabajador: {
              connect: { id }
            }
          }))
        } : undefined,
      },
      include: {
        trabajadores: {
          include: { trabajador: true }
        }
      }
    });

    res.status(201).json(proyecto);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error creando proyecto' });
  }
};


//Listar proyectos
export const getProyectos = async (req: Request, res: Response): Promise<void> => {
  try {
    const proyectos = await prisma.proyecto.findMany({
      include: {
        trabajadores: {
          include: {
            trabajador: true
          }
        }
      }
    });
    res.json(proyectos);
  } catch (error) {
    console.error('Error listando proyectos:', error);
    res.status(500).json({ error: 'Error listando proyectos' });
  }
};


//Actualizar proyectos
export const editarProyectos = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, cliente, fechaInicio, fechaTermino, trabajadores } = req.body;

  try {
    const proyectoActualizado = await prisma.proyecto.update({
      where: { id: Number(id) },
      data: {
        nombre,
        cliente,
        fechaInicio: new Date(fechaInicio),
        fechaTermino: fechaTermino ? new Date(fechaTermino) : null,
        trabajadores: {
          deleteMany: {}, // borra relaciones actuales
          create: trabajadores.map((trabajadorId: number) => ({
            trabajador: {
              connect: { id: trabajadorId },
            },
          })),
        },
      },
      include: {
        trabajadores: {
          include: {
            trabajador: true,
          },
        },
      },
    });

    res.json(proyectoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando proyecto" });
  }
};