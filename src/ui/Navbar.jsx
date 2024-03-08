

export default function Navbar ({children}) {
    return (
      <div className="navbar bg-light border-bottom">
        <div className="container-fluid">
          {children}
        </div>
      </div>
    )
}