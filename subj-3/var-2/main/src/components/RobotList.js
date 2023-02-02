import React, { Component } from 'react'
import RobotStore from '../stores/RobotStore'
import Robot from './Robot'

class RobotList extends Component {
	constructor(){
		super()
		this.state = {
			robots : []
		}
		this.saveRobot = (id, robot) => {
			this.store.saveRobot(id, robot)
		}
	}
	componentDidMount(){
		this.store = new RobotStore()
		this.setState({
			robots : this.store.getRobots()
		})
		this.store.emitter.addListener('UPDATE', () => {
			this.setState({
				robots : this.store.getRobots()
			})			
		})
	}
  render() {
  	// a robot component should show a robot and allow editing a robot
    return (
      <div>
      	 
      	{
      		this.state.robots.map((e, i) => 
      			<Robot item={e} key={i} onSave={this.saveRobot} />
      		)
      	}
      </div>
    )
  }
}

export default RobotList
