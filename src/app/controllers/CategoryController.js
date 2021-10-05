const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepository.findAll();
    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      response.status(400).json({ error: 'Does not exists this category' });
    }

    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const category = await CategoryRepository.create({ name });
    response.status(201).json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoryRepository.delete(id);

    response.sendStatus(204);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      response.status(400).json({ error: 'Does not exists this category' });
    }

    if (!name) {
      response.status(400).json({ error: 'Name is Required!' });
    }

    const updatedCategory = await CategoryRepository.update(id, name);

    response.json(updatedCategory);
  }
}

module.exports = new CategoryController();
