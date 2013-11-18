var links = {
    blackscreen: "http://askubuntu.com/questions/162075/my-computer-boots-to-a-black-screen-what-options-do-i-have-to-fix-it",
    broadcom: "http://askubuntu.com/questions/55868/how-to-install-broadcom-wireless-drivers",
    dependencies: "http://askubuntu.com/questions/140246/how-do-i-resolve-unmet-dependencies",
    reportbug: "http://askubuntu.com/questions/5121/how-do-i-report-a-bug"
    dpkglock: "http://askubuntu.com/questions/15433/how-do-i-fix-a-could-not-get-lock-var-lib-dpkg-lock-problem",
    hibernation: "http://askubuntu.com/questions/94754/how-to-enable-hibernation",
    mergelist: "http://askubuntu.com/questions/30072/how-do-i-fix-a-problem-with-mergelist-or-status-file-could-not-be-parsed-err",
    unitydisappear: "http://askubuntu.com/questions/17381/unity-doesnt-load-no-launcher-no-dash-appears",
    resetunity: "http://askubuntu.com/questions/17610/how-do-i-reset-my-unity-configuration",
    ppa: "http://askubuntu.com/questions/4983/what-are-ppas-and-how-do-i-use-them",
    freeze: "http://askubuntu.com/questions/4408/what-should-i-do-when-ubuntu-freezes",
    improveperformance: "http://askubuntu.com/questions/2194/how-can-i-improve-overall-system-performance",
    unityterminology: "http://askubuntu.com/questions/10228/whats-the-right-terminology-for-unitys-ui-elements",
    noamazon: "http://askubuntu.com/questions/192269/how-can-i-remove-amazon-search-results-from-the-dash-or-disable-the-feature",
    ubuntu1: "http://askubuntu.com/questions/18641/theres-an-issue-with-an-alpha-beta-release-of-ubuntu-what-should-i-do",
    cron: "http://askubuntu.com/questions/2368/how-do-i-set-up-a-cron-job",
    apport: "http://askubuntu.com/questions/93457/how-do-i-enable-or-disable-apport",
    wubi: "http://askubuntu.com/questions/330085/can-i-use-wubi-to-manually-install-13-04"
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
        
