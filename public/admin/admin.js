var admin = new Vue({
    el: '#admin',
    data: {
        apiurl: "http://" + window.location.hostname + ":" + window.location.port + "/capturepointapi",
        loading: false,
        loadstart: 0,
        loadfinish: 0,
        result: "",
        view: null,
        score: {
            totalScores: null,
            gameScores: null,
            captures: null
        }
    },
    computed:{
        isScore: function(){return this.view == "score" ? true:false;},
        isCaptures: function(){return this.view == "captures" ? true:false;},
        isGames: function(){return this.view == "games" ? true:false;},
        doneLoading: function(){return !(this.loading);},
        loadTime: function(){return (this.loadfinish) - this.loadstart;}
    },
    methods: {
        apiRequest: function(target,method,callback,body){
            //set "View Model" (vm) as our parent app, allows xmlhttp functions to change our app variables
            var vm = this;
            //set a debug callback if one isn't specified
            callback = callback || function(response){
                vm.result = response;
            }
            if (method.toLowerCase() == "post"){}
            //send our webrequest and run the callback on success
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    callback(this.responseText);
                }
                vm.loadfinish = performance.now();
                vm.loading = false;
                
            };
            xmlhttp.open(method.toUpperCase(), target, true);
            if (method.toLowerCase() == "post"){xmlhttp.setRequestHeader('Content-Type','application/json; charset=utf-8');}
            if (body == null){
                xmlhttp.send();
            }
            else{
                body = JSON.stringify(body);
                xmlhttp.send(body);
            }
            this.loadstart = performance.now();
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
            this.view = "games";
            this.apiRequest(target,method);
        },
        sendCapture: function(){
            target = this.apiurl + "/capture";
            method = "Post";
            body = {team:"team2"};
            this.apiRequest(target,method,null,body);
        },
        sendCaptureNoArp: function(){
            target = this.apiurl + "/capturetest";
            method = "Post";
            body = {team:"team2"};
            this.apiRequest(target,method,null,body);
        }
    }
})