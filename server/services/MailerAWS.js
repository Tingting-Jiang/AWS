const aws = require("aws-sdk");
const keys = require('../config/keys');
const Mailer = require("./Mailer");
const surveyTemplate = require("./emailTemplates/surveyTemplate");
const bodyParser = require('body-parser')
const ses = new aws.SES({
    accessKeyId: "AKIA37R6MPLKLB2KGXTH",
    secretAccessKey: "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",
    region: "us-east-1"
});

function MailerAWS({subject, recipients}, emailBody, sender) {
    //extract address from recipients.
    const toAddress = new Array();
    recipients.forEach(({email}) => toAddress.push(email));
    for (var index = 0; index < toAddress.length; index++) {
        var arr = [toAddress[index]];
        const params = {
            ConfigurationSetName: "SurveyEmail",
            Destination: {
                ToAddresses: arr
            },
            Message: {
                Body: {
                    Html: {
                        Data: emailBody
                    }
                },
                Subject: {
                    Data: subject
                }
            },
            Source: sender
        };
        ses.sendEmail(params, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log(data);
        });
    }
}

module.exports = MailerAWS;


