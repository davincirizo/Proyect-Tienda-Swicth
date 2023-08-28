import logo from '../../public/lupa_no_found.jpg';

function NotFound() {
  return (
    <div  style={{left: 230}}>
        <div>
            <img src={logo} style={{width: '10px', height: 'auto'}}/>
        </div>
        <span>
            NotFound
        </span>
    </div>
  )
}

export default NotFound