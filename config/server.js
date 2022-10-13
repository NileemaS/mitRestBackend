module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
   app: {
   keys: [ 'hoZg7SWPAzROtlm4h0LQaA==',
           '6xaJFUt3M8vLUrUjSd49Pg==',
           'tXIcX65oY7jhnazXuodGkg==',
           'fqH/QhhYnkACpWnhnlBsuA==' ]
 },
});
