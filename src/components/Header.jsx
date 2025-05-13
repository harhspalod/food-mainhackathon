import './header.css'
import Image1 from '../images/plate.png'
import Image2 from '../images/robot.png'

export default function Header() {
  return (
    <header className="main_header">
      <div className="container main_header-container">
        <div className="main_header-left">
          <p className="introducing">Introducing...</p>
          <h1 className="food-scan">FOOD SCAN</h1>
          <p className="description">
            Compare any two food products! Scan packaged items or natural foods to see their nutritional values and make healthier choices.
          </p>  
        </div>
      
        <div className="main_header-right">
          <div className="main_header-image">
            <img className="robot" src={Image2} alt="Robot"/>
          </div>
          <div className="main_header-plate">
            <img className="plate" src={Image1} alt="Plate"/>
          </div>
        </div>
      </div>
    </header>
  )
}