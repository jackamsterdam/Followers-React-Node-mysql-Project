import "./Logo.css";
import logoSource from '../../../Assets/Images/logo-vacation.jpg'

function Logo(): JSX.Element {
    return (
        <div className="Logo">
			<img src={logoSource} />
        </div>
    );
}

export default Logo;
