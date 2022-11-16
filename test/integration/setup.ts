process.env.DEFAULT_PERMISSIONS = JSON.stringify({
  product: {
    Product: ['read'],
    Line: ['read'],
    Category: ['read'],
    Collection: ['read'],
    Group: ['read'],
    Inventory: ['read'],
  },
});
process.env.AUTH_DEFAULT_PERMISSIONS = JSON.stringify({
  Profile: ['read', 'update', 'delete'],
  SignIn: ['create', 'read', 'update'],
});
jest.setTimeout(30000);
export {};
