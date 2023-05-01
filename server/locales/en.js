// @ts-check

export default {
  translation: {
    appName: 'Task Menager',
    flash: {
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
        delete: {
          success: 'User deleted',
          error: 'Failed to delete',
        },
        edit: {
          success: 'User edited',
          error: 'Failed to edit',
        },
        authError: 'You cannot change or delete this user',
      },
      status: {
        create: {
          success: 'Status successfully created',
          error: 'Failed to create status',
        },
        delete: {
          success: 'Status deleted',
          error: 'Failed to delete',
        },
        edit: {
          success: 'Status edited',
          error: 'Failed to edit',
        },
      },
      labels: {
        create: {
          success: 'Label successfully created',
          error: 'Failed to create label',
        },
        delete: {
          success: 'Label deleted',
          error: 'Failed to delete',
        },
        edit: {
          success: 'Label edited',
          error: 'Failed to edit',
        },
      },
      tasks: {
        create: {
          success: 'Task successfully created',
          error: 'Failed to create task',
        },
        delete: {
          success: 'Task deleted',
          error: 'Failed to delete',
        },
        edit: {
          success: 'Task edited',
          error: 'Failed to edit',
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
        tasks: 'Tasks',
        statuses: 'Statuses',
        labels: 'Labels',
      },
    },
    views: {
      filters: {
        status: 'Status',
        executor: 'Executor',
        label: 'Labels',
        onlyMy: 'Only my task',
        show: 'Show',
      },
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      users: {
        label: 'Users',
        id: 'ID',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        createdAt: 'Created at',
        edit: 'Edit',
        settings: 'Settings',
        delete: 'delete',
        new: {
          submit: 'Register',
          signUp: 'Register',
        },
      },
      welcome: {
        index: {
          hello: 'Welcome to the Task menager!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
      status: {
        label: 'Statuses',
        id: 'ID',
        name: 'Name',
        createdAt: 'Creation date',
        edit: 'Edit',
        delete: 'Delete',
        create: 'Create status',
        new: {
          create: 'Create',
          newStatus: 'New status',
        },
      },
      labels: {
        label: 'Labels',
        id: 'ID',
        name: 'Name',
        edit: 'Edit',
        create: 'Create label',
        delete: 'Delete',
        new: {
          create: 'Create',
          label: 'New label',
        },
      },
      tasks: {
        label: 'Tasks',
        id: 'ID',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        createdAt: 'Creation date',
        creator: 'Creator',
        executor: 'Executor',
        create: 'Create tasks',
        delete: 'Delete',
        edit: 'Edit',
        editTask: 'Edit task',
        new: {
          create: 'Create',
          label: 'New Tasks',
        },
        info: {
          creator: 'Creator',
          executor: 'Executor',
          createdAt: 'Created at',
        },
      },
    },
  },
};
