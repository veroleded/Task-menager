// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      accessRightErr: 'У вас нет прав для этих действий',
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
        edit: {
          error: 'Не удалось изменить пользователя',
          success: 'Пользователь изменен',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователь удален',
        },
      },
      statuses: {
        create: {
          error: 'Не удалось создать статус',
          success: 'Статус успешно создан',
        },
        edit: {
          error: 'Не удалось изменить статус',
          success: 'Статус изменен',
        },
        delete: {
          error: 'Не удалось удалить статус',
          success: 'Статус удален',
        },
      },
      label: {
        create: {
          error: 'Не удалось создать метку',
          success: 'Метка успешно создана',
        },
        edit: {
          error: 'Не удалось изменить метку',
          success: 'Метка изменена',
        },
        delete: {
          error: 'Не удалось удалить метку',
          success: 'Метка удалена',
        },
      },
      task: {
        create: {
          error: 'Не удалось создать задачу',
          success: 'Задача успешно создана',
        },
        edit: {
          error: 'Не удалось изменить задачу',
          success: 'Задача изменена',
        },
        delete: {
          error: 'Не удалось удалить задачу',
          success: 'Задача удалена',
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
        statuses: 'Статусы',
        tags: 'Метки',
        tasks: 'Задачи',
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
        email: 'Email',
        createdAt: 'Дата создания',
        firstName: 'Имя',
        lastName: 'Фамилия',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        edit: {
          editUser: 'Настройки',
          submit: 'Сохранить',
          delete: 'Удалить',
        },
      },
      task: {
        id: 'ID',
        name: 'Название',
        createdAt: 'Дата создания',
        creator: 'Автор',
        executor: 'Исполнитель',
        status: 'Статус',
        new: {
          add: 'Новая задача',
          sabmit: 'Сохранить',
        },
        edit: {
          editTask: 'Настройки',
          submit: 'Сохранить',
          delete: 'Удалить',
        },
      },
      statuses: {
        id: 'ID',
        createdAt: 'Дата создания',
        name: 'Название',
        new: {
          add: 'Новый статус',
          submit: 'Сохранить',
        },
        edit: {
          editStatus: 'Настройки',
          submit: 'Сохранить',
          delete: 'Удалить',
        },
      },
      label: {
        id: 'ID',
        createdAt: 'Дата создания',
        name: 'Название',
        new: {
          add: 'Новая метка',
          submit: 'Сохранить',
        },
        edit: {
          editLabel: 'Настройки',
          submit: 'Сохранить',
          delete: 'Удалить',
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Veroled!',
          description: 'Ознакомтесь с моим менеджером задач',
          more: 'Github',
        },
      },
      usersList: 'Список пользователей',
      statusesList: 'Список статусов',
      labelList: 'Список меток',
      taskList: 'Список задач',
    },
  },
};
