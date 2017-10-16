Vue.component('game',{
    props: ['game'],
    computed: {
        start: () =>{
            var context = this;
            return "Test";
            //return moment(this.game.start).format("M-D-YYYY kk:mm");
        },
        end: ()=>{
            return "game";
            //return moment(this.game.end).format("M-D-YYYY kk:mm");
        }   
    },
    template: `<tr>
    <td>{{game.name}}</td>
    <td>{{start}}</td>
    <td>{{end}}</td>
    <td>
        Retain Control: {{game.persistTeam}}</br>
        <div v-if="game.TeamID != null"> Starting Team: {{game.TeamId} </div>
    </td>
  </tr>`
})
Vue.component('games',{
    props: ['apidata','apiaxios'],
    data: () => {return {
        apiurl: "http://" + window.location.hostname + ":" + window.location.port + "/capturepointapi",
        newStart: new Date(),
        newEnd: new Date(),
        newName: "",
        dateconfig: {
            enableTime: true,
            defaultDate: new Date(),
            mode: 'single',
            dateFormat: 'YYYY-MM-DDTHH:MM:SSZ'
        },
    }},
    methods: {
        newGame: (name,start,end) => {
            target = this.admin.apiurl + "/games";
            method = "Post";
            body = {
                name: name,
                start: start,
                end: end
            };
            console.log(body);
            callback = (response)=>{
                vm.result = response;
            }
            console.log(this);
            this.admin.apiAxios(target,method,callback,body);
        }
    },
    template: `
    <div class="games">
        <div class="newgame">
            <h2>New Game</h2>
            <p>Game Name: <input v-model="newName" placeholder="new game"></input></p>
                <label>Start: </label>
                <el-date-picker
                    v-model="newStart"
                    type="datetime"
                    placeholder="Select date and time">
                </el-date-picker>
                <br />
                <label>End: </label>
                <el-date-picker
                    v-model="newEnd"
                    type="datetime"
                    placeholder="Select date and time">
                </el-date-picker>
            <button v-on:click="newGame(newName,newStart,newEnd)">New Game</button>
        </div>
        <table class="gametable">
        <thead>
            <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Settings</th>
            </tr>
        </thead>
        <tbody>
            <game v-for="game of apidata" :key="game" v-bind:game="game"></game>
        </tbody>
        </table>
    </div>
    `
})