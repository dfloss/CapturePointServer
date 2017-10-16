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
        apidata: null,
        showError: false
    },
    computed:{
        isLoaded: function(){return (this.view == "score" || this.view == "captures" || this.view == "games") ? true:false;},
        isGames: function(){return this.view == "games" ? true:false;},
        doneLoading: function(){return !(this.loading);},
        loadTime: function(){return (this.loadfinish) - this.loadstart;},
        apiaxios: () => {return this.apiAxios}
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
        apiAxios: function(target,method,callback,data){
            this.loadstart = performance.now();
            this.http({
                method: method,
                url: target,
                data: data
            }).then(callback)
            .catch((error) => {
                this.showError = true;
                this.result = error.response.data
                console.log(error.response);
            });
        },
        getScore: function(){
            vm = this;
            target = this.apiurl + "/score";
            method = "GET";
            callback = function(response){
                vm.apidata = response.data;
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
                vm.apidata = response.data;
                vm.result = response;
                vm.view = "captures";
            }
            this.apiAxios(target,method,callback);
        },
        getGames: function(){
            vm = this;
            target = this.apiurl + "/games";
            method = "Get";
            callback = (response)=>{
                vm.apidata = response.data;
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
});
Vue.component('modal', {
    template: `
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
  
            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>
  
            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>
  
            <div class="modal-footer">
              <slot name="footer">
                default footer
                <button class="modal-default-button" @click="$emit('close')">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    `
  })
