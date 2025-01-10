// Задание 3

export namespace UserManagement {
  export namespace Admin {
    export class AdminUser {
      // Свойства для имени, email и прав доступа
      private name: string;
      private email: string;
      private isSuperAdmin: boolean;

      // Конструктор для инициализации свойств
      constructor(name: string, email: string, isSuperAdmin: boolean) {
        this.name = name;
        this.email = email;
        this.isSuperAdmin = isSuperAdmin;
      }

      // Метод для получения информации о пользователе
      getInfo(): string {
        return `Admin Name: ${this.name}, Email: ${this.email}, Super Admin: ${this.isSuperAdmin}`;
      }

      // Метод для изменения прав доступа
      setSuperAdminStatus(status: boolean): void {
        this.isSuperAdmin = status;
      }
    }
  }
}
const adminUser = new UserManagement.Admin.AdminUser(
  "John Doe",
  "johndoe123@example.com",
  true
);
console.log(adminUser.getInfo());
adminUser.setSuperAdminStatus(false);
console.log(adminUser.getInfo());
