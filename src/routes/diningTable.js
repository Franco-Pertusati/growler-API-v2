const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// GET /dining-tables
router.get('/', async (req, res) => {
  try {
    const tables = await prisma.dinigTable.findMany();
    res.json(tables);
  } catch (error) {
    console.error('Error fetching dining tables:', error);
    res.status(500).json({ error: 'Error fetching dining tables' });
  }
});

// POST /dining-tables
router.post('/', async (req, res) => {
  const { name, position, state, round } = req.body;

  if (!name || position === undefined || state === undefined || round === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newTable = await prisma.dinigTable.create({
      data: { name, position, state, round },
    });

    res.status(201).json(newTable);
  } catch (error) {
    console.error('Error creating dining table:', error);
    res.status(500).json({ error: 'Error creating dining table' });
  }
});

// DELETE /dining-tables/:id
router.delete('/:id', async (req, res) => {
  const tableId = parseInt(req.params.id);

  if (isNaN(tableId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    await prisma.dinigTable.delete({
      where: { id: tableId },
    });

    res.status(200).json({ message: 'Dining table deleted successfully' });
  } catch (error) {
    console.error('Error deleting dining table:', error);
    res.status(500).json({ error: 'Error deleting dining table' });
  }
});

// PUT /dining-tables/:id
router.put('/:id', async (req, res) => {
  const tableId = parseInt(req.params.id);
  const { name, position, state, round } = req.body;

  if (isNaN(tableId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const updatedTable = await prisma.dinigTable.update({
      where: { id: tableId },
      data: {
        ...(name !== undefined && { name }),
        ...(position !== undefined && { position }),
        ...(state !== undefined && { state }),
        ...(round !== undefined && { round }),
      },
    });

    res.json(updatedTable);
  } catch (error) {
    console.error('Error updating dining table:', error);
    res.status(500).json({ error: 'Error updating dining table' });
  }
});


module.exports = router;
