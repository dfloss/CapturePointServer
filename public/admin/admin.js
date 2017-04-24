var admin = new Vue({
    el: '#admin',
    data: {
        apiurl: "http://" + window.location.hostname + ":" + window.location.port + "/capturepointapi",
        loading: false,
        result: "",
        view: null,
        score: {
            totalScores: null,
            gameScores: null,
            captures: null
        }
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
                score = JSON.parse(response);
                vm.score = score;
                vm.result = score;
            }
            this.apiRequest(target,method, callback);
        },
        getCaptures: function(){
            target = this.apiurl + "/captures";
            method = "Get";
            this.view = "captures";
            this.apiRequest(target,method);
        },
        getGames: function(){
            target = this.apiurl + "/games";
            method = "Get";
            this.apiRequest(target,method);
        }
    }
})