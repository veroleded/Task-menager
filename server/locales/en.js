// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      accessRightErr: "You don't have the rights to do that",
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        edit: {
          error: 'Failed to change user',
          success: 'User changed',
        },
        delete: {
          error: 'Failed to delete user',
          success: 'User deleted',
        },
      },
      statuses: {
        create: {
          error: 'Failed to create status',
          success: 'Status created successfully',
        },
        edit: {
          error: 'Failed to change status',
          success: 'Status changed',
        },
        delete: {
          error: 'Failed to delete status',
          success: 'Status deleted',
        },
      },
      label: {
        create: {
          error: 'Failed to create label',
          success: 'Label created successfully',
        },
        edit: {
          error: 'Failed to change label',
          success: 'Label changed',
        },
        delete: {
          error: 'Failed to delete label',
          success: 'label deleted',
        },
      },
      task: {
        create: {
          error: 'Failed to create task',
          success: 'Task created successfully',
        },
        edit: {
          error: 'Failed to change task',
          success: 'Task changed',
        },
        delete: {
          error: 'Failed to delete task',
          success: 'Task deleted',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        statuses: 'Statuses',
        tags: 'Labels',
        tasks: 'Tasks',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      users: {
        id: 'ID',
        email: 'Email',
        createdAt: 'Created at',
        firstName: 'Fitst name',
        lastName: 'Last name',
        new: {
          submit: 'Register',
          signUp: 'Register',
        },
        edit: {
          editUser: 'Settings',
          submit: 'Save',
          delete: 'Delete',
        },
      },
      task: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        creator: 'Author',
        executor: 'Executor',
        labels: 'Labels',
        status: 'Status',
        onlyMy: 'Only my tasks',
        show: 'Show',
        new: {
          add: 'New task',
          sibmit: 'Save',
        },
        edit: {
          editTask: 'Settings',
          submit: 'Save',
          delete: 'Delete',
        },
      },
      statuses: {
        id: 'ID',
        createdAt: 'Created at',
        name: 'Name',
        new: {
          add: 'New status',
          submit: 'Save',
        },
        edit: {
          editStatus: 'Settings',
          submit: 'Save',
          delete: 'Delete',
        },
      },
      label: {
        id: 'ID',
        createdAt: 'Created at',
        name: 'Name',
        new: {
          add: 'New label',
          submit: 'Save',
        },
        edit: {
          editLabel: 'Settings',
          submit: 'Save',
          delete: 'Delete',
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Veroled!',
          description: 'Check out my task manager',
          more: 'Github',
        },
      },
      usersList: 'User List',
      statusesList: 'Status List',
      labelList: 'Label list',
      taskList: 'Task list',
    },
  },
};
