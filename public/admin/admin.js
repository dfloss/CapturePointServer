var admin = new Vue({
    el: '#admin',
    data: {
        apiurl: "http://localhost:8080/capturepointapi",
        loading: false,
        result: "",
        view: null
    },
    methods: {
        apiRequest: function(target,method,body){
            //set "View Model" (vm) as our parent app, allows xmlhttp functions to change our app variables
            var vm = this;

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    vm.result = this.responseText;
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
            this.url = target;
        },
        getScore: function(){
            target = this.apiurl + "/score";
            method = "GET";
            this.view = "score";
            this.apiRequest(target,method);
        },
        getCaptures: function(){
            target = this.apiurl + "/captures";
            method = "Get";
            this.view = "captures";
            this.apiRequest(target,method);
        }
    }
})