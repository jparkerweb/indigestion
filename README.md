### ***Send messages to PAC for ingestion before test validation via TAPTAP***

---

![Indigestion](./docs/indigestion.png)

---

## Goal
**Indigestion**'s goal is to provide an interface that allows users a quick and easy method for sending `test messages` for ingestion into `PAC` in preparation for `TAPTAP` execution.

---

## Installation
**Indigestion** runs in [Node](https://nodejs.org).

* Install [NodeJS](https://nodejs.org)

* Install Indigestion node_module dependencies:
  `npm install`

---

## Run Indigestion
* `npm run indigestion`

---

## Initial Configuration

`Indigestion` creates a `userconfig.json` file the first time it is run.  This file holds your SMTP server and authentication values for sending test emails.  Make sure to edit the file before sending any messages.

---

## Indigestion Message Structure

* `Idigestion`'s source data for email messages are stored in `json` format (one file per message).  All `json` files in the `emails` directory are parsed for common data fields (from, to, subject, body, etc.) that are used to create and send email messages.

* example email `json` file:  
  ```json
  {
    "from": "\"Justin Parker\" <justin.parker@smarsh.com>",
    "to": "fred@acmecorp.com",
    "cc": "sue@acmecorp.com",
    "subject": "Example email for docs",
    "html": "<div style='color:red;'> Embedded Image: <img src='cid:my-fire-picture-id'/> </div>",
    "attachments": [
       {
         "filename": "fire.png",
         "path": "./attachments/fire.png",
         "cid": "my-fire-picture-id"
       }
    ]
  }
  ```

* Emails are sent using `nodemailer`.  for more info on message structure reference the docs here: https://nodemailer.com/message/

* Local files you want to attach to test emails should be stored in the `./attachments` folder.  For more info on the various ways to attach files, read the docs here: https://nodemailer.com/message/attachments/

* Embedded image documentation is here: https://nodemailer.com/message/embedded-images/

---

## Ethereal email

* You can setup and test new email messages for tests before using them by creating an etherreal.email account here: https://ethereal.email/.  This will allow you to preview and even download `.eml` files from your test messages for verification beforehand.

---

## Example Run

![Indigestion](./docs/indigestion-run.gif)
