import React, { Component } from 'react'

// TODO : adăugați posibilitatea de a edita un robot 
// editarea se face prin intermediul unui robot cu 2 stări, una de vizualizare și una de editare

// TODO : add the posibility to edit a robot 
// editing is done via 2 states a view state and an edit state

class Robot extends Component {
	constructor(props){
		super(props)
	}
	render() {
		let {item} = this.props
		return (
			<div>
				Hello, my name is {item.name}. I am a {item.type} and weigh {item.mass}
			</div>
		)
	}
}

export default Robot
