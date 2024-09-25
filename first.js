

// Класс User для отдельного контакта
class User {
    constructor(obj) {
        this.data = obj;
    }

    edit(obj) {
        this.data = { ...this.data, ...obj };
    }

    get() {
        return this.data;
    }
}

// Класс Contacts для управления всеми контактами
class Contacts {
    constructor() {
        this.data = [];
    }

    add(contactData) {
        const newUser = new User(contactData);
        this.data.push(newUser);
    }

    edit(id, obj) {
        const user = this.data.find(contact => contact.get().id === id);
        if (user) {
            user.edit(obj);
        }
    }

    remove(id) {
        this.data = this.data.filter(contact => contact.get().id !== id);
    }

    get() {
        return this.data.map(contact => contact.get());
    }
}


class ContactsApp extends Contacts{
    constructor() {
      // Создаем главный контейнер приложения и добавляем его в DOM
      super()
      this.app = document.createElement('div');
      this.app.className = 'contacts';
      document.body.append(this.app);
      // Создаем интерфейс приложения
      this.createInterface();
    }
  
    createInterface() {
      // Создаем форму для добавления и редактирования контактов
      const form = document.createElement('form');
      form.innerHTML = `
        <input type="text" id="name" placeholder="Имя" required>
        <input type="text" id="phone" placeholder="Телефон" required>
        <button type="button" id="addBtn">Добавить</button>
        <button type="button" id="editBtn">Редактировать</button>
      `;
      this.app.append(form);
  
      // Создаем контейнер для списка контактов
      this.contactsList = document.createElement('div');
      this.contactsList.className = 'contacts-list';
      this.app.append(this.contactsList);
  
      // Добавляем обработчики событий для кнопок
      document.getElementById('addBtn').addEventListener('click', () => this.onAdd());
      document.getElementById('editBtn').addEventListener('click', () => this.onEdit());
    }

    // add(contact){
    //     super.add(contact)
    // }
  
    onAdd() {
      // Логика добавления контакта
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      if (name && phone) {
        const contact = { name, phone };
        super.add(contact);
        this.get();
      }
    }
  
    onEdit() {
      // Логика редактирования контакта
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      if (name && phone) {
        const contact = { name, phone };
        super.edit(contact);
        this.get();
      }
    }
  
    onRemove(contact) {
      // Логика удаления контакта
      super.remove(contact);
      this.get();
    }
  
    get() {
      // Получение и обновление списка контактов
      const contacts = super.get();
      this.contactsList.innerHTML = '';
      contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        contactItem.innerHTML = `
          <span style = "display: inline-block; margin-top: 10px;">${contact.name}</span>
          <span>${contact.phone}</span>
          <button onclick="app.onRemove(${contact.id})">Удалить</button>
        `;
        this.contactsList.appendChild(contactItem);
      });
    }
  }
    
const app = new ContactsApp();
app.add({ id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St', phone: '555-1234' });
app.add({ id: 2, name: 'Jane Smith', email: 'jane@example.com', address: '456 Elm St', phone: '555-5678' });

console.log(app.get()); // Получение всех контактов
app.edit(1, { phone: '555-4321' }); // Редактирование контакта с id 1
console.log(app.get()); // Получение всех контактов после редактирования
app.remove(2); // Удаление контакта с id 2
console.log(app.get()); // Получение всех контактов после удаления
