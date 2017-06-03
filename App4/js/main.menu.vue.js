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
        user:{}
    },
    created: function () {
        let modal = document.getElementById('modal');
        modal.style.display = "block";

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

        }
    }
});

