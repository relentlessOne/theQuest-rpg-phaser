var config = {
    apiKey: "AIzaSyDLv3eB_IgCTaZ4JbK-tDK60qAzxtB4Yiw",
    authDomain: "thequest-afa85.firebaseapp.com",
    databaseURL: "https://thequest-afa85.firebaseio.com",
    projectId: "thequest-afa85",
    storageBucket: "thequest-afa85.appspot.com",
    messagingSenderId: "82704437538"
};
firebase.initializeApp(config);




let playerInfo = {
    maxNumOfFireballs: 100,
    manaRefreshRate: 2000,
    speed: 100,
    bulletSpeed: 100,
    maxBulletDistance: 300,
    maxHp: 1000,
    maxMana: 100,
    lvl: 1,
    exp: 0,
    expToNextLvl: 200,
}


let vm = new Vue({
    el: '#gameMenu',
    data: {
        error: '',
        email: '',
        password: '',
        user: {},
        disablePause: false,
        disableBack: false,
        playerInfo: {}
    },
    created: function () {
        let modalDeath = document.getElementById('modalDeath');
        let modal = document.getElementById('modal');
        //modal.style.display = "block";
        let modalpause = document.getElementById('modalpause');
        let buttons = document.getElementById('buttons'); pause
        let pause = document.getElementById('pause');
        let title = document.getElementById('title');
        let pausetxt = document.getElementById('pausetxt');
        let backMenu = document.getElementById('backMenu');
        let modalWin = document.getElementById('modalWin');
        let currentLvl = {};




    },
    methods: {
        login: function () {
            this.error = "";
            var vm = this;
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(function (user) {
                    modal.style.display = "none";
                    let usernameanim = document.getElementById('user-name-animate')
                    usernameanim.className += " user-name-animation";
                    setTimeout(function () {
                        usernameanim.className += " user-name-animation-out";
                    }, 5000);
                    vm.user = user;




                })
                .catch(function (error) {
                    vm.error = "Wrong username or password";
                });
        },
        register: function () {

            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            this.error = "";
            let fail = false;
            if (!regex.test(this.email)) {
                this.error = "Email is invalid";
                fail = true;
            }

            if (this.password < 6) {
                this.error += "<br>Password is too short";
                fail = true;
            }

            if (!fail) {
                this.error = "";
                var vm = this;
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(function (user) {
                        modal.style.display = "none";
                        let usernameanim = document.getElementById('user-name-animate')
                        usernameanim.className += " user-name-animation";
                        setTimeout(function () {
                            usernameanim.className += " user-name-animation-out";
                        }, 5000);
                        vm.user = user;
                    })
                    .catch(function (error) {
                        vm.error = "Email exists";
                    });
            }
        },
        loadUserData: function () {

        },
        lvl1Click: function () {
            buttons.className = 'fadeOut';
            title.className = 'moveUp';
            backMenu.className = 'back-to-menu showBackMenu';
            pause.className = 'pause-btn showBackMenu';
            pausetxt.innerText = "Pause";
            setTimeout(() => {
                currentLvl = new Lvl(1,playerInfo);
            }, 1200);

        },
        lvl2Click: function () {
            buttons.className = 'fadeOut';
            title.className = 'moveUp';
            backMenu.className = 'back-to-menu showBackMenu';
            pause.className = 'pause-btn showBackMenu';
            pausetxt.innerText = "Pause";
            setTimeout(() => {
                currentLvl = new Lvl(2);
            }, 1200);
        },
        lvl3Click: function () {
            buttons.className = 'fadeOut';
            title.className = 'moveUp';
            backMenu.className = 'back-to-menu showBackMenu';
            pause.className = 'pause-btn showBackMenu';
            pausetxt.innerText = "Pause";
            setTimeout(() => {
                currentLvl = new Lvl(3);
            }, 1200);
        },
        backMenuClick: function () {
            if (!this.disableBack) {
                currentLvl.endLevel();
                buttons.className = 'showButtons';
                title.className = ' downTitle'
                backMenu.className = 'back-to-menu backHide';
                pause.className = 'pause-btn backHide';
                modalDeath.style.display = "none";
                modalpause.style.display = "none";
                modalWin.style.display = "none";
                this.disablePause = false;
            }
        },
        pauseClick: function () {
            if (!this.disablePause) {
                if (pausetxt.innerText === 'Pause') {
                    pausetxt.innerText = 'Unpause';
                    currentLvl.pauseGame();
                    modalpause.style.display = "block";
                } else {
                    pausetxt.innerText = 'Pause';
                    modalpause.style.display = "none";
                    currentLvl.unpauseGame();
                }
            }
        },
        prepareLvlButtons() {
            if (!this.playerInfo.availableLvls[0]) {
                $('#btnLvl1').attr("disabled", true);
                $('#btnLvl1').css({ 'opacity': '0.6' });
            } else {
                $('#btnLvl1').attr("disabled", false);
                $('#btnLvl1').css({ 'opacity': '1' });
            }

            if (!this.playerInfo.availableLvls[1]) {
                $('#btnLvl2').attr("disabled", true);
                $('#btnLvl2').css({ 'opacity': '0.6' });
            } else {
                $('#btnLvl2').attr("disabled", false);
                $('#btnLvl2').css({ 'opacity': '1' });
            }

            if (!this.playerInfo.availableLvls[2]) {
                $('#btnLvl3').attr("disabled", true);
                $('#btnLvl3').css({ 'opacity': '0.6' });
            } else {
                $('#btnLvl3').attr("disabled", false);
                $('#btnLvl3').css({ 'opacity': '1' });
            }


        },
        playerDead: function () {
            currentLvl.pauseGame();
            modalDeath.style.display = "block";
            this.disablePause = true;
        },
        deathAgain: function () {
            currentLvl.endLevel();


            if (currentLvl.getLvlID() === 1) {
                currentLvl = new Lvl(1);
            }

            if (currentLvl.getLvlID() === 2) {
                currentLvl = new Lvl(2);
            }

            if (currentLvl.getLvlID() === 3) {
                currentLvl = new Lvl(3);
            }



            modalDeath.style.display = "none";
        },
        levelCompleted() {
            this.disablePause = true;
            this.disableBack = true
            currentLvl.pauseGame();
            modalWin.style.display = "block";
            setTimeout(function () {
                vm.disableBack = false;
                vm.backMenuClick();
            }, 5000);
        }
    }
});



vm.playerInfo = {
    availableLvls: [true, true, true],
    currentLvl: 1,
    exp: 0
}

vm.prepareLvlButtons();

window.addEventListener('playerDead', function (e) {
    vm.playerDead();
});

window.addEventListener('levelCompleted', function (e) {
    vm.levelCompleted();
});