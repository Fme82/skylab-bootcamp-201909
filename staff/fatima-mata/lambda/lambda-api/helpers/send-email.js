const { env: { userEmail, passwordEmail } } = process
var nodemailer = require('nodemailer');

module.exports = async function(toStudent, dateEmail, time, studentName) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: userEmail,
      pass: passwordEmail
    }
  });

  var emailStudent = {
    from: userEmail,
    to: toStudent,
    subject: 'INFOCLASSROOM',
    html: `<h3>Hello ${studentName},</h3>
          <p>This is a quick email to say we have received your reservation. Here the details: <p>
          <p><b>Date: </b>${dateEmail}</p>
          <p><b>Time: </b>${time}</p>
          <p>[info]<p>
          <p>Tanks!</p>
             `
  }

  await transporter.sendMail(emailStudent, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })

}