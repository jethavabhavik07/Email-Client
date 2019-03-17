const electron = require('electron');
const url = require('url');
const path = require('path');
const{app,BrowserWindow,Menu,ipcMain} = electron;

let mainWindow;
let composeWindow;
var count=1;
var check_array =new Array();

//listen for app to be ready
app.on('ready',function(){
    //create new window
    mainWindow = new BrowserWindow({});
    //load html into window
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'mainwindow.html'),
        protocol:'file:',
        slashes:true
    }));

    mainWindow.on('closed',function(){
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    count=1;
});

ipcMain.on('mail:send', function(e, item){
    console.log(item);
    mainWindow.webContents.send('mail:send',item);
    composeWindow.close();
});

/*
function showMessage(){
    // console.log("123");
    
    var new_div = document.createElement("div");
    new_div.setAttribute('id','mail'+count);
    new_div.style.position="relative";
    new_div.innerHTML = " text "+count+"<br>text123";
    new_div.style.background="white";
    new_div.style.marginBottom="2%";
    new_div.style.padding="1% 0 1% 0";
    new_div.style.cursor="pointer";
    // alert(new_div.getAttribute('id'));
    
    new_div.setAttribute('onclick','display_mail(this.id)');
    document.getElementById("mails").appendChild(new_div);
    count++;
}

function display_mail(id){
    var mail_content = document.getElementById(id);
    mail_content.style.background="yellow";
    // alert(check_array.size);
    document.getElementById("mails-display").innerHTML=""+mail_content.textContent+"<br>";
    // for(var i=0; i<check_array.size; i++)
    //     alert(check_array[i]+"<br>");
}
*/

function composeMessage(){
    //create new window
    composeWindow = new BrowserWindow({
        title:'Compose Mail'
    });
    //load html into window
    composeWindow.loadURL(url.format({
        pathname:path.join(__dirname,'compose.html'),
        protocol:'file:',
        slashes:true
    }));
    composeWindow.on('close',function(){
        composeWindow = null;
    });
}

const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Compose',
                accelerator:process.platform == 'drawin' ? 'Command+N' : 'ctrl+N',
                click(){
                    composeMessage();
                }
            },
            {
                label:'Sync',
                role:'reload'
            },
            {
                label:'Quit',
                accelerator:process.platform == 'drawin' ? 'Command+Q' : 'ctrl+Q',
                click(){
                    app.quit();
                }
            },
            {
                label:'Developer tools',
                accelerator:process.platform == 'drawin' ? 'Command+Q' : 'ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            
        ]
 
    }
]