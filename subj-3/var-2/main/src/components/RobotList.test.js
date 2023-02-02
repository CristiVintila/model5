import React from 'react'
import ReactDOM from 'react-dom'
import RobotList from './RobotList'
import Robot from './Robot'
import { shallow, mount, render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

it ('renders a list of robots with edit buttons', () => {
	const component = mount(<RobotList />)
	let robot = component.find(Robot).first()
	let button = robot.find('[value="edit"]').first()
	expect(button.length).toEqual(1)	
})

it ('goes to edit mode upon clicking', () => {
	const component = mount(<RobotList />)
	let robot = component.find(Robot).first()
	let button = robot.find('[value="edit"]').first()
	button.simulate('click')
	let inputs = component.find('[type="text"]')
	expect(inputs.length).toEqual(3)	
})

it ('can return to view mode', () => {
	const component = mount(<RobotList />)
	let robot = component.find(Robot).first()
	let button = robot.find('[value="edit"]').first()
	button.simulate('click')
	button = component.find('[value="cancel"]').first()
	button.simulate('click')	
	let inputs = component.find('[type="text"]')
	expect(inputs.length).toEqual(0)	
})

it ('can save a robot', () => {
	const component = mount(<RobotList />)
	let robot = component.find(Robot).first()
	let button = robot.find('[value="edit"]').first()
	button.simulate('click')
	let nameInput = component.find('#name').first()
	nameInput.simulate('focus')
	nameInput.simulate('change', { target: { name : 'name', value: 'test_name' } })
	let typeInput = component.find('#type').first()
	typeInput.simulate('focus')
	typeInput.simulate('change', { target: {name : 'type', value: 'test_type' } })
	let massInput = component.find('#mass').first()
	massInput.simulate('focus')
	massInput.simulate('change', { target: { name : 'mass', value: 'test_mass' } })
	button = component.find('[value="save"]').first()
	button.simulate('click')
	robot = component.find(Robot).first()
	expect(robot.props().item).toEqual({id: 1, name : 'test_name', type : 'test_type', mass: 'test_mass'})	
})


