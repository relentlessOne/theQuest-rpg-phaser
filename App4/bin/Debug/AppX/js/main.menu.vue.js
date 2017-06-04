var config = {
    apiKey: "AIzaSyDLv3eB_IgCTaZ4JbK-tDK60qAzxtB4Yiw",
    authDomain: "thequest-afa85.firebaseapp.com",
    databaseURL: "https://thequest-afa85.firebaseio.com",
    projectId: "thequest-afa85",
    storageBucket: "thequest-afa85.appspot.com",
    messagingSenderId: "82704437538"
};
firebase.initializeApp(config);


let vm = new Vue({
    el: '#gameMenu',
    data: {
        error: '',
        email: '',
        password: '',
        user: {}
    },
    created: function () {
        let modal = document.getElementById('modal');
        let modalpause = document.getElementById('modalpause');
       // modal.style.display = "block";
        let buttons = document.getElementById('buttons'); pause
        let pause = document.getElementById('pause');
        let title = document.getElementById('title');
        let pausetxt = document.getElementById('pausetxt');
        let backMenu = document.getElementById('backMenu');
        let currentLvl = {};

    },
    methods: {
        login: function()  {
            this.error = "";
            var vm = this;
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(function (user) {
                    modal.style.display = "none";
                    let usernameanim = document.getElementById('user-name-animate')
                    usernameanim.className += " user-name-animation";
                    setTimeout(function () {
                        usernameanim.className += " user-name-animation-out";
                    },5000);
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
                    .then(function () {
                        modal.style.display = "none";
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
            setTimeout(function () {
                currentLvl = new Lvl1();
            }, 1200);
          
        },
        backMenuClick: function () {
            currentLvl.endLevel();
            buttons.className = 'showButtons';
            title.className = ' downTitle'
            backMenu.className = 'back-to-menu backHide';
            pause.className = 'pause-btn backHide';
        },
        pauseClick: function () {
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
    }
});

