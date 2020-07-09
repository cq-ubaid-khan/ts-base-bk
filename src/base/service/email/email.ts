import {
  EMAIL_BODY_TYPE_HTML,
  EMAIL_SERVICE_MAIL_GUN,
  EMAIL_SERVICE_SEND_GRID,
} from "./emailConstants";
import { otherConfigs } from "../../../../configs/config";

const emailTransportServiceName: string = otherConfigs.emailService.transport();
const emailTransportServiceConfig = otherConfigs.emailService.mailgun;
const emailConfig = emailTransportServiceConfig.email;

interface IEmailConfig {
  subject: string,
  from: string,
  "h:Reply-To": string,
  to?: string,
  html?: string,
}

const defaultEmailConfig: IEmailConfig = {
  subject: emailConfig.subject(),
  from: emailConfig.from(),
  "h:Reply-To": emailConfig.replyTo(),
};

// eslint-disable-next-line import/prefer-default-export
export const sendEmail = (
  recipient: string, body: string, emailResponseCallback?: () => void | null,
  bodyType = EMAIL_BODY_TYPE_HTML,
): void => {
  const emailBody: IEmailConfig = { ...defaultEmailConfig };
  if (emailTransportServiceName === EMAIL_SERVICE_MAIL_GUN) {
    // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
    const sendMail = require("./mailgun");
    emailBody.html = "html"; // TODO: emailBody[bodyType || EMAIL_BODY_TYPE_HTML] = body;
    emailBody.to = recipient;
    sendMail(emailTransportServiceConfig, emailBody, emailResponseCallback);
  } else if (emailTransportServiceName === EMAIL_SERVICE_SEND_GRID) { /* other transport */ }
};
