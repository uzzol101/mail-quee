const config = require('dotenv').config
config()
const Queue = require('bee-queue');
const queue = new Queue('email_send', {
  redis: {
    host: 'localhost'
  }
});
const sendMail = require('./mailer');


// Process jobs from as many servers or processes as you like
queue.process('email_send', function (job, done) {
  console.log(`Processing job ${job.id}`);
  sendMail(job.data)
  return done(null, job.data);
});
