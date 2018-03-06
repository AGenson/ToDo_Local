import React from 'react';
import '../App.css';



const CheckToDo = (props) => {
	return (
		<div className="div_check">
			<input
				type="checkbox"
				id={"check-"+props.id}
				name={"check-"+props.id}
				disabled
			/>
			<label
				className="check"
				onClick={() => {
					if (props.status_edit === false){
						props.changeStateToDo();
					}
				}}
			>
				<span>
				</span>
			</label>
		</div>
	);
}



export default CheckToDo;
