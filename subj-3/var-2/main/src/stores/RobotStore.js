import {EventEmitter} from 'fbemitter'

class RobotStore{
	constructor(){
		this.robots = [{
			id : 1,
			type : 'worker',
			name : 'tim',
			mass : 1000
		},{
			id : 2,
			type : 'worker',
			name : 'tom',
			mass : 1500
		}]
		this.emitter = new EventEmitter()
	}
	addRobot(r){
		this.robots.push(r)
		this.emitter.emit('UPDATE')
	}
	getRobots(){
		return this.robots
	}
	saveRobot(id, robot){
		let index = this.robots.findIndex((e) => e.id === id)
		if (index !== -1){
			Object.assign(this.robots[index],robot) 
		}
		this.emitter.emit('UPDATE')
	}
}

export default RobotStore