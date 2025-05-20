const IdConfirm = () => {
    return (
      <div className="fondo body">
        <div>
          <div className="text-center">
            <img
              src="/templates/Logo.png"
              alt="GameStore Logo"
              className="img-fluid"
              style={{ maxWidth: "150px" }}
            />
          </div>
          <h3 className="text-center mb-4">Please confirm your identity</h3>
          <div className="container">
            <p>
              To confirm your identity, we have sent you an email with an information code that you must enter in the text box below.
            </p>
            <form>
              <div className="mb-3 text-start">
                <label>Enter the confirmation code:</label>
                <input type="text" id="code" className="form-control" required />
              </div>
              <button type="submit" className="btn btn-custom w-100">Verify confirmation</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  
  export default IdConfirm
    