import imaplib
import email
from email.header import decode_header
import webbrowser
import os
import sys
# account credentials
username = "autotek078@gmail.com"
password = "tbxmdgftetkjgbof" 
def clean(text):
    # clean text for creating a foldercls
    return "".join(c if c.isalnum() else "_" for c in text)
# create an IMAP4 class with SSL 
imap = imaplib.IMAP4_SSL("imap.gmail.com")
# authenticate
imap.login(username, password)
status, messages = imap.select("INBOX")
# number of top emails to fetch
N = 5
# total number of emails
messages = int(messages[0])

for i in range(messages, messages-N, -1):
    # fetch the email message by ID
    res, msg = imap.fetch(str(i), "(RFC822)")
    for response in msg:
        if isinstance(response, tuple):
            # parse a bytes email into a message object
            msg = email.message_from_bytes(response[1])
            # decode the email subject
            subject, encoding = decode_header(msg["Subject"])[0]
            if isinstance(subject, bytes):
                # if it's a bytes, decode to str
                subject = subject.decode(encoding)
            # decode email sender
            From, encoding = decode_header(msg.get("From"))[0]
            if isinstance(From, bytes):
                From = From.decode(encoding)
            #print("Subject:", subject)
            #print("From:", From)
            # if the email message is multipart
            if msg.is_multipart():
                # iterate over email parts
                for part in msg.walk():
                    # extract content type of email
                    content_type = part.get_content_type()
                    content_disposition = str(part.get("Content-Disposition"))
                    try:
                        # get the email body
                        body = part.get_payload(decode=True).decode()
                    except:
                        pass
                    if content_type == "text/plain" and "attachment" not in content_disposition:
                        # print text/plain emails and skip attachments
                        res = body.split()
                        try:
                            if sys.argv[1]==res[3] and sys.argv[2]==res[10] and From=="baridimob@poste.dz":
                                print(True)
                        except IndexError:
                            pass
# close the connection and logout
imap.close()
imap.logout()