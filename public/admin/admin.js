var admin = new Vue({
    el: '#admin',
    data: {
        apiurl: "http://" + window.location.hostname + ":" + window.location.port + "/capturepointapi",
        loading: false,
        result: "",
        view: null
    },
    methods: {
        apiRequest: function(target,method,callback,body){
            //set "View Model" (vm) as our parent app, allows xmlhttp functions to change our app variables
            var vm = this;
            //set a debug callback if one isn't specified
            callback = callback || function(response){
                vm.result = response;
            }
            //send our webrequest and run the callback on success
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    callback(this.responseText);
                }
                vm.loading = false;
            };
            xmlhttp.open("GET", target, true);
            if (body == null){
                xmlhttp.send();
            }
            else{
                body = JSON.stringify(body);
                xmlhttp.send(body);
            }
            this.loading = true;
        },
        getScore: function(){
            var vm = this;
            target = this.apiurl + "/score";
            method = "GET";
            this.view = "score";

            callback = function(response){
                let rawScore = JSON.parse(response);
                var score = {};
                for (var key in rawScore) {
                    if (rawScore.hasOwnProperty(key)) {
                        var element = rawScore[key];
                        let seconds = Math.floor((element/1000)%60);
                        let minutes = Math.floor((element/(1000*60)) % 60);
                        let hours = Math.floor((element/(1000*60*60)) % 24);
                        score[key] = {
                            hours: hours,
                            minutes: minutes,
                            seconds: seconds
                        }
                    }
                }
                vm.result = score;
            }
            this.apiRequest(target,method,callback);
        },
        getCaptures: function(){
            target = this.apiurl + "/captures";
            method = "Get";
            this.view = "captures";
            this.apiRequest(target,method);
        }
    }
})