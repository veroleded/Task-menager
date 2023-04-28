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
      labels: {
        create: {
          success: 'Метка успешно создана',
          error: 'Не удалось создать метку',
        },
        delete: {
          success: 'Метка удалена',
          error: 'Не удалось удалить',
        },
        edit: {
          success: 'Метка изменена',
          error: 'Не удалось изменить',
        },
      },
      tasks: {
        create: {
          success: 'Задача успешно создана',
          error: 'Не удалось создать задачу',
        },
        delete: {
          success: 'Задача удалена',
          error: 'Не удалось удалить',
        },
        edit: {
          success: 'Задача изменена',
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
        labels: 'Метки',
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
      labels: {
        label: 'Метки',
        id: 'ID',
        name: 'Наименование',
        edit: 'Редактировать',
        create: 'Создать метку',
        delete: 'Удалить',
        new: {
          create: 'Создать',
          label: 'Новая метка',
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
        edit: 'Редактировать',
        new: {
          create: 'Создать',
          label: 'Новая задача',
        },
      },
    },
  },
};
