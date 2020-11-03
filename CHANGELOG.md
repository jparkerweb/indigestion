# Change Log
All notable changes to  `Indigestion` are documented in this file.

## v1.2.0 | 2020-11-2 | Create Emails & Command Line Send
- Create Emails
  - 🔥 New menu option to create new email json files from the UI
  - 🔥 Added and array of sample files to `./attachments` folder

- Send All Emails from command line
  - 🔥 Pass the `--email` option to `node app` to send emails without using the UI.  
       run one of the following:  
      - `node app --email`
      - `npm run indigestion-email`
      - `bash indigestion-email.sh`
      - `indigestion.cmd` (windows)

## v1.1.0 | 2020-10-30 | Create/Update SMTP transport settings from UI
### Features
- New menu item: Update Userconfig.json
  - 🔥 In-app prompts for setting up and editing SMTP transport settings (`host`, `port`, `secure`, `user`, `pass`)

---

## v1.0.0 | 2020-10-29 | Initial Relase
### Features
- PCWEB-2036: Initial publication of `Indigestion`
  - 🔥 Send all emails found in the `./emails` folder (one email per `.json` file)
  - 🔥 Construct email messages from `.json` files
  - 🔥 Send emails with all expected fields (`from`, `to`, `cc`, `bcc`, `subject`, `text`, `html`, `attachments`)
  - 🔥 Send emails with attachments
  - 🔥 Configurable SMTP/Auth creds via a userconfig.json file (created in project directory the 1st time indigestion is run)

---
