const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

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
        <input type="text" id="address" placeholder="Адрес" required>
        <input type="text" id="email" placeholder="Электронная почта" required>
        <button type="button" id="addBtn">Добавить</button>
      `;
      this.app.append(form);
  
      // Создаем контейнер для списка контактов
      this.contactsList = document.createElement('div');
      this.contactsList.className = 'contacts-list';
      this.app.append(this.contactsList);
  
      // Добавляем обработчики событий для кнопок
      document.getElementById('addBtn').addEventListener('click', () => this.onAdd());
    }
  
    onAdd() {
      // Логика добавления контакта
      const id = this.get()[this.get().length - 1].id + 1;
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      const email = document.getElementById('email').value;
      
      if(!EMAIL_REGEXP.test(email)) alert('Введите корректный адрес почты')
      else if (name && phone && address && email) {
        const contact = {id: id, name: name, email: email, address: address, phone: phone};
        super.add(contact);
        this.get();
        document.getElementById('name').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('address').value = "";
        document.getElementById('email').value = "";
      }
    }
  
    onEdit(id) {
      // Логика редактирования контакта
      let name = document.getElementById('name').value;
      let phone = document.getElementById('phone').value;
      let address = document.getElementById('address').value;
      let email = document.getElementById('email').value;
      name = prompt("Введите новое имя", name);
      phone = prompt("Введите новый номер телефона", phone);
      address = prompt("Введите новый адресс", address);
      email = prompt("Введите новую почту", email);
      if(!EMAIL_REGEXP.test(email)) alert('Введите корректный адрес почты')
      else if (name && phone && address && email) {
        const contact = {id: id, name: name, email: email, address: address, phone: phone};
        super.edit(id, contact);
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
        <div class = "contact">
          <span class = "contact">${contact.name}</span>
          <span class = "contact">${contact.phone}</span>
          <span class = "contact">${contact.address}</span>
          <span class = "contact">${contact.email}</span>
          <button onclick="app.onRemove(${contact.id})">Удалить</button>
          <button onclick="app.onEdit(${contact.id})">Изменить</button>
          </div>
        `;
        this.contactsList.appendChild(contactItem);
      });
      return contacts;
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
