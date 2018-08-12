const Queue = require('bee-queue');
const mailQueue = new Queue('email_send', {
  redis: {
    host: 'localhost'
  },
  isWorker: false
});

function sendMail(email) {
  const job = mailQueue.createJob(email)
  job
  .timeout(3000)
  .retries(2)
  .save()
  .then((job) => {
    console.log('after save', job.id)
    // process.exit()
  })
  .catch(e => console.log(e.message))

}
const mailOptions = {
    from: 'tester@lolobyte.com', // sender address
    to: 'uzzolatwork@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>' // plain text body
};
sendMail(mailOptions)


