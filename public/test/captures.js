Vue.component('capture',{
  name: 'capture',
  props: ['capture','captureDuration'],
  template: `<tr>
    <td>{{capture.TeamId}}</td>
    <td>{{capture.time}}</td>
    <td>{{capture.deviceId}}</td>
  </tr>`
})
Vue.component('captures',{
  name: 'captures',
  props: ['apidata'],
  template: `
    <div class="captures">
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Time</th>
              <th>Player</th>
            </tr>
          </thead>
          <tbody>
          <capture v-for="capture of apidata" :key="capture" v-bind:capture="capture"></capture>
          </tbody>
        </table>
    </div>
  `
})
