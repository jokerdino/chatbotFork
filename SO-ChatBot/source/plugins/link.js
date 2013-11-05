var links = {
    blackscreen: "http://askubuntu.com/questions/162075/my-computer-boots-to-a-black-screen-what-options-do-i-have-to-fix-it",
    broadcom: "http://askubuntu.com/questions/55868/how-to-install-broadcom-wireless-drivers",
    dependencies: "http://askubuntu.com/questions/140246/how-do-i-resolve-unmet-dependencies"
};

var sendLink = function( args ) {
    if (args in links) {

        return links[args];
       
    }
    
}

bot.addCommand({  

        name : 'link',
        fun : sendLink,
        permissions : {
                del : 'NONE'
        }
        });
        
