const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    // listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    //obter UM registro
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      // 404 - Not Found
      return response.status(404).json({ error: 'User not found!' });
    }

    response.json(contact);
  }

  async store(request, response) {
    //criar novo registro
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return response
        .status(400)
        .json({ error: 'this e-mail is already in use' });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    //deletar um registro
    const { id } = request.params;

    await ContactRepository.delete(id);
    // 204 - No Content
    response.sendStatus(204);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      // 404 - Not Found
      return response.status(404).json({ error: 'User not found!' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactEmailExists = await ContactRepository.findByEmail(email);

    if (contactEmailExists && contactEmailExists.id !== id) {
      return response
        .status(400)
        .json({ error: 'this e-mail is already in use' });
    }

    const contact = await ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }
}

// pattern Singleton
module.exports = new ContactController();
