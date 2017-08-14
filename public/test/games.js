Vue.component('game',{
    props: ['game'],
    data: {
    },
    template: `<tr>
    <td>{{game.TeamId}}</td>
    <td>{{capture.time}}</td>
    <td>{{capture.deviceId}}</td>
  </tr>`
})
Vue.component('games',{
    props: ['data'],
    data: {
        startTime: new Date(),
        endTime: new Date(),
        dateconfig: {
            enableTime: true,
            defaultDate: new Date(),
            mode: "multiple"
        },
    },
    computed: {
        games: ()=>{return data}
    },
    template: `
    <div class="games">
        <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Settings</th>
            </tr>
        </thead>
        <tbody>
            <game v-for="game of games" :key="game" v-bind:game="game"></game>
        </tbody>
        </table>
    </div>
    `
})