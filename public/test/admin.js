var admin = new Vue({
    el: '#admin',
    data: {
        apiurl: "http://" + window.location.hostname + ":" + window.location.port + "/capturepointapi",
        loading: false,
        loadstart: 0,
        loadfinish: 0,
        result: "",
        view: null,
        http: axios.create({
            baseURL: "http://" + window.location.hostname + ":" + window.location.port + "/capturepointapi",
        }),
        score: {
            totalScores: null,
            gameScores: null,
            captures: null
        },
        apiData: null
    },
    computed:{
        isLoaded: function(){return (this.view == "score" || this.view == "captures") ? true:false;},
        isGames: function(){return this.view == "games" ? true:false;},
        doneLoading: function(){return !(this.loading);},
        loadTime: function(){return (this.loadfinish) - this.loadstart;}
    },
    created: function(){
        var vm = this;
        this.http.interceptors.response.use(function(response){
            vm.loadfinish = performance.now();
            vm.Loading = false;
            return(response);
        })
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
        apiAxios: function(target,method,callback,data){
            this.loadstart = performance.now();
            this.http({
                method: method,
                url: target,
                data: data
            }).then(callback);
        },
        getScore: function(){
            vm = this;
            target = this.apiurl + "/score";
            method = "GET";
            callback = function(response){
                vm.apiData = response.data;
                //vm.score = response.data;
                vm.result = response;
                vm.view = "score";
            };
            this.apiAxios(target,method, callback);
        },
        getCaptures: function(){
            vm = this;
            target = this.apiurl + "/captures";
            method = "Get";
            callback = (response) =>{
                vm.apiData = response.data;
                vm.result = response;
                vm.view = "captures";
            }
            this.apiAxios(target,method,callback);
        },
        getGames: function(){
            target = this.apiurl + "/games";
            method = "Get";
            callback = (response)=>{
                vm.apiData = response.data;
                vm.result = response;
                vm.view = "games";
            }
            this.apiAxios(target,method,callback);
        },
        sendCapture: function(){
            target = this.apiurl + "/capture";
            method = "Post";
            body = {TeamId:2};
            callback = (response)=>{
                vm.result = response;
            }
            this.apiAxios(target,method,callback,body);
        }
    }
})
