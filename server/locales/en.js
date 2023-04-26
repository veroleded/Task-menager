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
        authError: 'Access denied! Please login',
      },
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        tasks: 'Tasks',
        statuses: 'Statuses',
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
    },
  },
};
