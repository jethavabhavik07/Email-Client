var count=1;
function openMails(){
  count=1;
  // alert(count);
// Step 1: Include required modules
var Imap = require('imap'),
inspect = require('util').inspect; 
var fs = require('fs'), fileStream; 

const simpleParser = require('mailparser').simpleParser;

// Step 2: Declaring new imap object
var imap = new Imap({
user: 'mayur.icon2019@gmail.com', 
password: 'cinematicon', 
host: 'imap.gmail.com', 
port: 993,
tls: true
});

// Step 3: Program to receive emails. 
/* This pretty much contains receiving emails, deciding which parts of email to receive,
and what do display on console after execution of program */
function openInbox(cb) {
imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {

openInbox(function(err, box) {
if (err) throw err;
var totalmessages = box.messages.total;
console.log(box.messages.total + ' message(s) found!');
console.log(imap.serverSupports('SORT'))
var f = imap.seq.fetch('*:1', {
bodies: ''
});
f.on('message', function(msg, seqno) {
console.log('Message #%d', seqno);//advait: ye sirf number dia hai msg ko iski jarrorat nahiye
var prefix = '(#' + seqno + ') ';//advait: ye bhi
msg.on('body', function(stream, info) {
  simpleParser(stream, (err, mail) => {
    var new_div = document.createElement("div");
    new_div.setAttribute('id','mail'+count);
    // new_div.style.position="relative";
    
    console.log(prefix+"from Emaild : "+mail.from['value'][0].address);
    console.log(prefix +'Subject: ' +mail.subject);
    console.log(prefix + 'Text body: '+mail.text);

    new_div.innerHTML = "<b>From: "+mail.from['value'][0].address+"</b><br>"+
                        "<i>Subject: "+mail.subject+"<br>"+
                        "<p style='display:none;' id='mail_text'"+count+">"+mail.text+"</p>";
    new_div.style.background="white";
    new_div.style.marginBottom="2%";
    new_div.style.padding="1% 0 1% 0";
    new_div.style.cursor="pointer";
    // alert(new_div.getAttribute('id'));
    
    var mail_data = document.createElement("div");
    mail_data.setAttribute('id','mail_d'+count);
    mail_data.innerHTML = "<b>From: "+mail.from['value'][0].address+"<br>"+
                          "<i>Subject: "+mail.subject+"<br><hr>"+
                          "<p>Mail text: "+mail.text+"</p>";
    
    document.getElementById("mails-display").innerHTML=mail_data.innerHTML;
    
    new_div.setAttribute('onclick','display_mail(this.id)');
    document.getElementById("mails").appendChild(new_div);
    count++;
    // alert(document.getElementById('mail%d',seqno).textContent);
  });
});
imap.end();
});
});

});

imap.once('error', function(err) {
console.log(err);
});

imap.once('end', function() {
console.log('Connection ended');
});

imap.connect(); 
}
function display_mail(id){
  var mail_content = document.getElementById(id);
  mail_content.style.background="yellow";
  document.getElementById("mails-display").innerHTML=""+mail_content.textContent+"<br><hr>";
}