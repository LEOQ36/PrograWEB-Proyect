
const SignUp = () => {
    return <div className="">
    <div>
        <div className="row">
            
            <div className="body fondo col-md-6 p-4">
                <div className="mb-4">
                    <div className="Logo">Logo</div>
                    <span className="fw-semibold">GameStore</span> 
                </div>
                <h4>Create your free account</h4>
                <p>Explore your favorite game and play without restrictions</p>
                <p>back ground image</p>
            </div>

            <div className=" fondo2 col md-6">
                <div>
                    <h3>Sign up to GameStore</h3>
                    <form>
                        <div className="mb-3">
                            <label>Username or email:</label>
                            <input type="email" className="form-control" required/>
                        </div>

                        <div className="mb-3">
                            <label>Password:</label>
                            <input type="password" className="form-control" required/>
                            <div className="form-text"> 
                                Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label>Username:</label>
                            <input type="text" className="form-control" required/>
                        </div>

                        <div className="mb-3">
                            <label>Your Country/Region</label>
                            <select className="form-select">
                                <option>United States</option>
                                <option>Argentina</option>
                                <option>Spain</option>
                                <option>Peru</option>
                                <option>Others</option>
                            </select>
                            <div className="form-text">For compliance reasons, we re required to collect country information to send occasional updates and announcements.</div>
                        </div>

                        <button type="submit" className="btn btn-custom w-100 mb-3">Continue →</button>
                    </form>
                </div>
            </div>



        </div>
    </div>
</div>

           


}

export default SignUp