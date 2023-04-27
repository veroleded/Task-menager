// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        delete: {
          success: 'Пользователь удалён',
          error: 'Не удалось удалить',
        },
        edit: {
          success: 'Пользователь изменён',
          error: 'Не удалось изменить',
        },
        authError: 'Вы не можете изменять или удалять этого пользователя',
      },
      status: {
        create: {
          success: 'Статус успешно создан',
          error: 'Не удалось создать статус',
        },
        delete: {
          success: 'Статус удален',
          error: 'Не удалось удалить',
        },
        edit: {
          success: 'Статус изменён',
          error: 'Не удалось изменить',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        tasks: 'Задачи',
        statuses: 'Статусы',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Email',
        createdAt: 'Дата создания',
        edit: 'Редактировать',
        settings: 'Настройки',
        delete: 'Удалить',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
      },
      welcome: {
        index: {
          hello: 'Добро пожаловать в Менеджер задач!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
      status: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        edit: 'Редактировать',
        delete: 'Удалить',
        create: 'Создать статус',
        new: {
          create: 'Создать',
          newStatus: 'Новый статус',
        },
      },
      tasks: {
        label: 'Задачи',
        id: 'ID',
        name: 'Название',
        description: 'Описание',
        status: 'Статус',
        createdAt: 'Дата создания',
        creator: 'Автор',
        executor: 'Исполнитель',
        create: 'Создать задачу',
        delete: 'Удалить',
        new: {
          create: 'Создать',
          label: 'Новая задача',
        },
      },
    },
  },
};
