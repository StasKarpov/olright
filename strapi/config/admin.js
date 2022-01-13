module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4408145962df9782ad09b189ce9cca66'),
  },
});
